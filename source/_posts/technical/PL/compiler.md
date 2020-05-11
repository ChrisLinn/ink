# Compiler

## TODOS
+ https://www.itcodemonkey.com/article/3521.html
+ [Learning Parser Combinators With Rust](https://www.reddit.com/r/rust/comments/bepi63/learning_parser_combinators_with_rust/)
+ C compiler in Rust., https://github.com/onehr/crust
+ https://bodil.lol/parser-combinators/
+ [Writing A Compiler In Go](https://compilerbook.com)
+ [Writing An Interpreter In Go](https://interpreterbook.com/)
+ http://davidchristiansen.dk/tutorials/nbe/
    * https://github.com/xieyuheng/cicada
 


# Notes
+ [klee](https://github.com/klee/klee)
    * KLEE is a symbolic virtual machine built on top of the LLVM compiler infrastructure. 
+ Tokens
+ lexer
    * The lexer function repeatedly
        - reads input characters until it has built up the longest string of those characters that matches one of the patterns, 
        - and executes the action of the ﬁrst pattern matching that string.
+ A regular deﬁnition gives a name to a regular expression
+ pattern
+ A scanner generator
    * like lex or ocamllex
    * takes a language deﬁnition as input, in the form of regular deﬁnitions
    * As output it produces a program—a scanner for the regular language specified
+ NFA
    * if a state is allowed to have more than one transition on a given input symbol
    * NFAs are also allowed to move from one state to another without consuming input
    + If N has k states, then D may have up to $2^k$ states
+ NFA -> DFA
    + Subset Construction
        - ǫ-closure
        - move
+ DFA Minimization
    * partitioning
        * indistinguishable
    + double-reversal
        * doesn’t just distinguish accept states from non-accept states; it also distinguishes accept states with diﬀerent actions from each other
- Reserved Words
    - If the language has many keywords, then using a separate pattern for each keyword will cause lex to generate a large DFA
    + reduce the size of the DFA is to load all the reserved words into the string table at the start, and associate each with their corresponding kind of token
- Start Conditions
    + In some languages, diﬀerent parts of a program have diﬀerent notions of what tokens are.
        * One example is lex itself
- sentential form
    + S 出来的
- sentence
    + a sentential form containing no nonterminals
-  Error Recovery Strategies
    + Panic mode
        + discard tokens until we ﬁnd a synchronizer, a token that programmers rarely misplace (e.g., a semicolon in C)
    + Phrase level recovery
        + modify the program so parsing can continue (e.g., add a right parenthesis). 
    + Error productions
        + augment grammar with extra productions to handle common errors
+ attribute
    * Attributes can be for example
        - the type of an expression
        - a table mapping the local variables of a function to their current locations
+ attribute grammar
    * An attribute grammar extends a context-free grammar with
        - rules for assigning values to attributes of nodes in a parse tree
        - conditions on the attribute values whose violations represent errors
+ syntax-directed definition
    * Syntax-directed definitions are the general case: a context-free grammar, augmented with attributes for each symbol and rules to assign values to attributes.
    * Attribute grammars are the restricted class of syntax-directed definitions where the rules must not have side effects.
    * So yacc/ocamlyacc scripts are syntax-directed definitions, but not attribute grammars.
+ Dependency graphs, evaluation order
+ Abstract syntax trees, their construction
+ Bottom-up evaluation of S-attributed definitions
+ L-attributed definitions
+ Type checking
+ ocamllex
+ ocamlyacc
+ Context-free grammars and languages
+ recursive descent
+ Storage allocation
    + alignment
+ The heap
+ The run-time stack, activation records
    + access link
    + It is natural to use astackto handle function activations, which is why activation records are also called stack frames
    + Runtime Space
    ![runtime-space](/img\compiler\runtime-space.png)
    + Activation Record
    ![activation-record](/img\compiler\atv-record.png)
    + Creating and Destroying Activation Records
    ![update-activation-record](/img\compiler\update-atv-record.png)
+ Parameter passing
+ Symbol tables
+ Intermediate representation
* LLVM, low-level virtual machine
    - a compiler construction kit with many reusable technologies
    - Universal Computer-Oriented Languages
* target languages
    - Some compilers for high level languages (e.g., C++, Haskell, Mercury) generate C code instead of assembler or machine code. This eﬀectively avoids having to repeat all the work done on C compilers to generate good code, and to generate code for many platforms.
+ Translating declarations, assignments, boolean expressions
+ Translating control flow constructs
+ Function and procedure calls
+ Call by Value/Value-Result/Reference/Name/Need
+ Caller Save vs Callee Save Registers
+ Design issues, including instruction selection
+ Run-time storage management
+ Basic blocks, control-flow graphs
+ Simple code generation
+ Peephole optimisation
+ Liveness analysis, register allocation
+ Various kinds of optimisation
    + Common subexpression elimination
    + copy propagation
        * share
    + dead code elimination
        * liveness analysis
    + strength reduction
    + code hoisting
    + goto reduction
- 龙书重基础，鲸书重优化，虎书重实践

## Cross
+ MinGW
    * https://nuwen.net/mingw.html
+  build the code on `--build`, run it on `--host` with `--target` architecture environment
    * [What's the difference of “./configure” option “--build”, “--host” and “--target”?](https://stackoverflow.com/a/15901574)
    * build
        - the machine you are building on
    * host
        - the machine you are building for
    * target
        - the machine for the binary on the host to IO/process on
    * If build, host, and target are all the same, this is called a __native__. 
    * If build and host are the same but target is different, this is called a __cross__. 
    * If build, host, and target are all different this is called a __canadian__ (for obscure reasons dealing with Canada's political party and the background of the person working on the build at that time). 
    * If host and target are the same, but build is different, you are using a cross-compiler to build a native for a different system. Some people call this a host-x-host, __crossed native__, or cross-built native. 
    * If build and target are the same, but host is different, you are using a cross compiler to build a cross compiler that produces code for the machine you're building on. This is rare, so there is no common way of describing it. There is a proposal to call this a crossback.
+ [crosstool-NG](https://www.crifan.com/files/doc/docbook/crosstool_ng/release/html/crosstool_ng.html#download_install_crosstool_ng)
    ```bash
    sudo apt install git make autoconf gcc g++ gperf sed gawk bison flex texinfo unzip help2man libtool-bin libncurses5-dev
    git clone https://github.com/crosstool-ng/crosstool-ng
    cd crosstool-ng
    ./bootstrap
    ./configure
    make
    sudo make install

    ct-ng list-samples
    ct-ng x86_64-w64-mingw32
    ct-ng menuconfig
    ct-ng build
    ```
+ Makefile
    * 一些选项: `-O3`, `-shared`, `-c`, `-fPIC` 

```makefile
ifndef GOOS
...
endif


...


ifeq ($(OS),Windows_NT)
    CCFLAGS += -D WIN32
    ifeq ($(PROCESSOR_ARCHITEW6432),AMD64)
        CCFLAGS += -D AMD64
    else
        ifeq ($(PROCESSOR_ARCHITECTURE),AMD64)
            CCFLAGS += -D AMD64
        endif
        ifeq ($(PROCESSOR_ARCHITECTURE),x86)
            CCFLAGS += -D IA32
        endif
    endif
else
    UNAME_S := $(shell uname -s)
    ifeq ($(UNAME_S),Linux)
        CCFLAGS += -D LINUX
    endif
    ifeq ($(UNAME_S),Darwin)
        CCFLAGS += -D OSX
    endif
    UNAME_P := $(shell uname -p)
    ifneq ($(filter arm%,$(UNAME_P)),)
        CCFLAGS += -D ARM
    endif
    UNAME_M := $(shell uname -m)
    ifeq ($(UNAME_M),x86_64)
        CCFLAGS += -D AMD64
    endif
    ifneq ($(filter %86,$(UNAME_M)),)
        CCFLAGS += -D IA32
    endif
endif


...



$(TARGET): $(TARGET).cpp
    $(CC) -o $@.o -c $^ $(CCFLAGS)


...


libfoo.a: foo.o cfoo.o
    ar r $@ $^

%.o: %.cpp
    g++ -O2 -o $@ -c $^
```

## Garbage Collection
+ 内存泄露检测工具
    + 静态代码扫描
+ 智能指针
    + 通过拥有自动内存管理功能的指针对象来引用对象
    + 非语言层面的原生支持
+ 语言层面的自动内存管理 (java, python, php)
    + 只用关注内存的申请而不必关心内存的释放
    + 由虚拟机（virtual machine）或运行时（runtime）来自动进行管理
    + 对不再使用的内存资源进行自动回收的行为就被称为 __垃圾回收__ 。
+ 常见的垃圾回收方法
    + 引用计数（reference counting）
        + 频繁更新引用计数降低了性能
        + 循环引用问题
    + 标记-清除（mark and sweep）???
        + 三色标记法
    + 分代收集（generation）

## Link 

+ ldd
+ nm -g