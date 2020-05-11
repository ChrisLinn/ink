# Interpreter in Python

<!-- ex_nolevel -->

这是我学习

+ http://aosabook.org/en/500L/a-python-interpreter-written-in-python.html
+ http://aosabook.org/en/500L/static-analysis.html

的笔记.

## A Python Interpreter Written in Python

+ Most interpreted languages, including Python, do involve a compilation step. The reason Python is called "interpreted" is that the compilation step does relatively less work (and the interpreter does relatively more) than in a compiled language.
+ Frame
    * A frame is a collection of information and context for a chunk of code.
        - Each frame on the call stack has its own data stack and block stack.
            + call stack
            + data stack
            + block stack
        - ![callstack](/img/py-interpreter/interpreter-callstack.png)
    * Blocks are used for certain kinds of control flow, particularly looping and exception handling.
        - The block is reponsible for making sure that the data stack is in the appropriate state when the operation is finished. For example, in a loop, a special iterator object remains on the stack while the loop is running, but is popped off when it is finished. The interpreter must keep track of whether the loop is continuing or is finished.
        - To keep track of this extra piece of information, the interpreter sets a flag to indicate its state. We implement this flag as a variable called `why`, which can be None or one of the strings `"continue"`, `"break"`, `"exception"`, or `"return"`. This indicates what kind of manipulation of the block stack and data stack should happen. To return to the iterator example, if the top of the block stack is a `loop` block and the `why` code is `continue`, the iterator object should remain on the data stack, but if the `why` code is `break`, it should be popped off.
        - The `Block` Class
            ```
            Block = collections.namedtuple("Block", "type, handler, stack_height")

            class VirtualMachine(object):
                [... snip ...]

                # Block stack manipulation
                def push_block(self, b_type, handler=None):
                    stack_height = len(self.frame.stack)
                    self.frame.block_stack.append(Block(b_type, handler, stack_height))

                def pop_block(self):
                    return self.frame.block_stack.pop()

                def unwind_block(self, block):
                    """Unwind the values on the data stack corresponding to a given block."""
                    if block.type == 'except-handler':
                        # The exception itself is on the stack as type, value, and traceback.
                        offset = 3  
                    else:
                        offset = 0

                    while len(self.frame.stack) > block.level + offset:
                        self.pop()

                    if block.type == 'except-handler':
                        traceback, value, exctype = self.popn(3)
                        self.last_exception = exctype, value, traceback

                def manage_block_stack(self, why):
                    """ """
                    frame = self.frame
                    block = frame.block_stack[-1]
                    if block.type == 'loop' and why == 'continue':
                        self.jump(self.return_value)
                        why = None
                        return why

                    self.pop_block()
                    self.unwind_block(block)

                    if block.type == 'loop' and why == 'break':
                        why = None
                        self.jump(block.handler)
                        return why

                    if (block.type in ['setup-except', 'finally'] and why == 'exception'):
                        self.push_block('except-handler')
                        exctype, value, tb = self.last_exception
                        self.push(tb, value, exctype)
                        self.push(tb, value, exctype) # yes, twice
                        why = None
                        self.jump(block.handler)
                        return why

                    elif block.type == 'finally':
                        if why in ('return', 'continue'):
                            self.push(self.return_value)

                        self.push(why)

                        why = None
                        self.jump(block.handler)
                        return why
                    return why
            ```
+ local_names won't be passed to the sub-frame, because of a new scope
+ Dynamic Typing
    * you don't know the types of the arguments to this function until you actually run it.
    * It's up to the interpreter to determine the type of the object that BINARY_MODULO is operating on and do the right thing for that type.
    * "In the general absence of type information, each instruction must be treated as `INVOKE_ARBITRARY_METHOD`."

### Misc
+ generator
+ `dis`
+ The `Function` Class
    ```
    class Function(object):
        """
        Create a realistic function object, defining the things the interpreter expects.
        """
        __slots__ = [
            'func_code', 'func_name', 'func_defaults', 'func_globals',
            'func_locals', 'func_dict', 'func_closure',
            '__name__', '__dict__', '__doc__',
            '_vm', '_func',
        ]

        def __init__(self, name, code, globs, defaults, closure, vm):
            """You don't need to follow this closely to understand the interpreter."""
            self._vm = vm
            self.func_code = code
            self.func_name = self.__name__ = name or code.co_name
            self.func_defaults = tuple(defaults)
            self.func_globals = globs
            self.func_locals = self._vm.frame.f_locals
            self.__dict__ = {}
            self.func_closure = closure
            self.__doc__ = code.co_consts[0] if code.co_consts else None

            # Sometimes, we need a real Python function.  This is for that.
            kw = {
                'argdefs': self.func_defaults,
            }
            if closure:
                kw['closure'] = tuple(make_cell(0) for _ in closure)
            self._func = types.FunctionType(code, globs, **kw)

        def __call__(self, *args, **kwargs):
            """When calling a Function, make a new frame and run it."""
            callargs = inspect.getcallargs(self._func, *args, **kwargs)
            # Use callargs to provide a mapping of arguments: values to pass into the new 
            # frame.
            frame = self._vm.make_frame(
                self.func_code, callargs, self.func_globals, {}
            )
            return self._vm.run_frame(frame)

    def make_cell(value):
        """Create a real Python closure and grab a cell."""
        # Thanks to Alex Gaynor for help with this bit of twistiness.
        fn = (lambda x: lambda: x)(value)
        return fn.__closure__[0]
    ```
+ `dispatch` 
    * Each bytecode method will return either None or a string, called why, which is an extra piece of state the interpreter needs in some cases. These return values of the individual instruction methods are used only as internal indicators of interpreter state—don't confuse these with return values from executing frames.
    ```
    class VirtualMachine(object):
        [... snip ...]

        def dispatch(self, byte_name, argument):
            """ Dispatch by bytename to the corresponding methods.
            Exceptions are caught and set on the virtual machine."""

            # When later unwinding the block stack,
            # we need to keep track of why we are doing it.
            why = None
            try:
                bytecode_fn = getattr(self, 'byte_%s' % byte_name, None)
                if bytecode_fn is None:
                    if byte_name.startswith('UNARY_'):
                        self.unaryOperator(byte_name[6:])
                    elif byte_name.startswith('BINARY_'):
                        self.binaryOperator(byte_name[7:])
                    else:
                        raise VirtualMachineError(
                            "unsupported bytecode type: %s" % byte_name
                        )
                else:
                    why = bytecode_fn(*argument)
            except:
                # deal with exceptions encountered while executing the op.
                self.last_exception = sys.exc_info()[:2] + (None,)
                why = 'exception'

            return why

        def run_frame(self, frame):
            """Run a frame until it returns (somehow).
            Exceptions are raised, the return value is returned.
            """
            self.push_frame(frame)
            while True:
                byte_name, arguments = self.parse_byte_and_args()

                why = self.dispatch(byte_name, arguments)

                # Deal with any block management we need to do
                while why and frame.block_stack:
                    why = self.manage_block_stack(why)

                if why:
                    break

            self.pop_frame()

            if why == 'exception':
                exc, val, tb = self.last_exception
                e = exc(val)
                e.__traceback__ = tb
                raise e

            return self.return_value
    ```
+ Main
    ```
    class VirtualMachine(object):
        [... snip ...]

        ## Stack manipulation

        def byte_LOAD_CONST(self, const):
            self.push(const)

        def byte_POP_TOP(self):
            self.pop()

        ## Names
        def byte_LOAD_NAME(self, name):
            frame = self.frame
            if name in frame.f_locals:
                val = frame.f_locals[name]
            elif name in frame.f_globals:
                val = frame.f_globals[name]
            elif name in frame.f_builtins:
                val = frame.f_builtins[name]
            else:
                raise NameError("name '%s' is not defined" % name)
            self.push(val)

        def byte_STORE_NAME(self, name):
            self.frame.f_locals[name] = self.pop()

        def byte_LOAD_FAST(self, name):
            if name in self.frame.f_locals:
                val = self.frame.f_locals[name]
            else:
                raise UnboundLocalError(
                    "local variable '%s' referenced before assignment" % name
                )
            self.push(val)

        def byte_STORE_FAST(self, name):
            self.frame.f_locals[name] = self.pop()

        def byte_LOAD_GLOBAL(self, name):
            f = self.frame
            if name in f.f_globals:
                val = f.f_globals[name]
            elif name in f.f_builtins:
                val = f.f_builtins[name]
            else:
                raise NameError("global name '%s' is not defined" % name)
            self.push(val)

        ## Operators

        BINARY_OPERATORS = {
            'POWER':    pow,
            'MULTIPLY': operator.mul,
            'FLOOR_DIVIDE': operator.floordiv,
            'TRUE_DIVIDE':  operator.truediv,
            'MODULO':   operator.mod,
            'ADD':      operator.add,
            'SUBTRACT': operator.sub,
            'SUBSCR':   operator.getitem,
            'LSHIFT':   operator.lshift,
            'RSHIFT':   operator.rshift,
            'AND':      operator.and_,
            'XOR':      operator.xor,
            'OR':       operator.or_,
        }

        def binaryOperator(self, op):
            x, y = self.popn(2)
            self.push(self.BINARY_OPERATORS[op](x, y))

        COMPARE_OPERATORS = [
            operator.lt,
            operator.le,
            operator.eq,
            operator.ne,
            operator.gt,
            operator.ge,
            lambda x, y: x in y,
            lambda x, y: x not in y,
            lambda x, y: x is y,
            lambda x, y: x is not y,
            lambda x, y: issubclass(x, Exception) and issubclass(x, y),
        ]

        def byte_COMPARE_OP(self, opnum):
            x, y = self.popn(2)
            self.push(self.COMPARE_OPERATORS[opnum](x, y))

        ## Attributes and indexing

        def byte_LOAD_ATTR(self, attr):
            obj = self.pop()
            val = getattr(obj, attr)
            self.push(val)

        def byte_STORE_ATTR(self, name):
            val, obj = self.popn(2)
            setattr(obj, name, val)

        ## Building

        def byte_BUILD_LIST(self, count):
            elts = self.popn(count)
            self.push(elts)

        def byte_BUILD_MAP(self, size):
            self.push({})

        def byte_STORE_MAP(self):
            the_map, val, key = self.popn(3)
            the_map[key] = val
            self.push(the_map)

        def byte_LIST_APPEND(self, count):
            val = self.pop()
            the_list = self.frame.stack[-count] # peek
            the_list.append(val)

        ## Jumps

        def byte_JUMP_FORWARD(self, jump):
            self.jump(jump)

        def byte_JUMP_ABSOLUTE(self, jump):
            self.jump(jump)

        def byte_POP_JUMP_IF_TRUE(self, jump):
            val = self.pop()
            if val:
                self.jump(jump)

        def byte_POP_JUMP_IF_FALSE(self, jump):
            val = self.pop()
            if not val:
                self.jump(jump)

        ## Blocks

        def byte_SETUP_LOOP(self, dest):
            self.push_block('loop', dest)

        def byte_GET_ITER(self):
            self.push(iter(self.pop()))

        def byte_FOR_ITER(self, jump):
            iterobj = self.top()
            try:
                v = next(iterobj)
                self.push(v)
            except StopIteration:
                self.pop()
                self.jump(jump)

        def byte_BREAK_LOOP(self):
            return 'break'

        def byte_POP_BLOCK(self):
            self.pop_block()

        ## Functions

        def byte_MAKE_FUNCTION(self, argc):
            name = self.pop()
            code = self.pop()
            defaults = self.popn(argc)
            globs = self.frame.f_globals
            fn = Function(name, code, globs, defaults, None, self)
            self.push(fn)

        def byte_CALL_FUNCTION(self, arg):
            lenKw, lenPos = divmod(arg, 256) # KWargs not supported here
            posargs = self.popn(lenPos)

            func = self.pop()
            frame = self.frame
            retval = func(*posargs)
            self.push(retval)

        def byte_RETURN_VALUE(self):
            self.return_value = self.pop()
            return "return"
    ```