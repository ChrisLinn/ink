---
layout:     post
title:      "[杂乱笔记] 《汇编语言》（王爽）笔记"
date:       2017-06-23 10:00:00
author:     "LiqueurTofu"
header-img: "img/home-bg-art.jpg"
catalog:    true
tags:
    - 杂乱笔记
---

<br>

# 1. 基础知识
+ 1 bytes = 8 bits (= 2 个 hex ...)
+ 汇编语言
    1. __汇编指令__
    2. 伪指令
        - 无机器码，编译器执行，计算机不执行
    3. 其他指令
+ 指令和数据是应用上的概念，在存储上没有区别
    * CS:IP 指向的被看作指令
+ bus
    * control bus
    * address bus
    * data bus
        - 8088
            + 宽度为8
        - 8086
            + 宽度16
+ 内存地址空间
    * CPU 不直接控制外设
        - 通过 bus 控制接口卡来控制
    * CPU 把各存储器看做一个总的逻辑存储器

# 2. Registers and RAM
+ 8086
    * all are 16-bit
    * 14 个
        - 通用寄存器
            + AX
                * 累加寄存器，常用于运算
                * AH
                * AL
                    - AL 可做独立 8-bit 寄存器使用，和 AH 没有关系，`add al,93h` 是8位运算，若进位，进位不会储存在 AH 中
                    - 若 `add ax,93h`，则是16位运算，有进位则进位 __会__ 储存在 AH 中
                    - 若 AX 被加完有进位，那么也不会真正丢弃
                        + 放到标志寄存器
                    - 要注意操作对象的位数一致
                        + 以下不对
                          ```
                          mov ax,bl
                          mov bh,ax
                          mov al,20000
                          add al,100h
                          ```
            + BX
                * 基址寄存器，常用于地址索引
            + CX
                * 计数寄存器，常用于计数
            + DX
                * 数据寄存器，常用于数据传递
        - 段寄存器
            + 物理地址 = 段地址 * 16 + 偏移地址
                * 因为地址线宽度有限
                * 移4位
                    - 2个16位地址合成20位地址
                * 段地址不是说内存被划分为一个个段
                    - 内存没有分段
                    - 但 CPU 可以通过分段方式来管理内存
            + CS
                * 代码段寄存器
            + DS
            + SS
            + ES, Extra Segment
        - IP
            + 指令指针寄存器
            + CS:IP
        - SI & DI
            + si, di 与 bx 功能相近，但 bx 可拆成2个8-bit来使用
            + si, Source Index
            + di, Destination Index
        - SP
            + stack pointer, 指向栈顶, 变
            + SS:SP
        - BP
            + base pointer, 指向栈底, 一般不变
            + SS:BP
        + flag 标志寄存器
            * 受 add sub mul div inc or and ... 影响
            * 不受 mov push pop ... 影响 
            * 程序状态字 PSW
                - CF
                    + `adc`
                    + `sbb`
                    + 注意 `shl` `shr` 逻辑左右移也会影响 CF (最后一个被移出的bit会被写到 CF)
                - OF
                    + CF 和 OF 表示的进位和溢出是 __分别对无符号数和有符号数运算而言的，它们之间没有任何联系__
                - PF
                    + 奇偶
                - AF
                    + 辅助进位
                    + 低4bit(最低那个hex)运算的进位
                    + 80x86没有针对AF的转移指令，除了对bcd有用外还有别的用处
                - ZF
                - SF
                    + (负)符号
                    + 有符号数还是无符号数?
                        * 数就是这么算，运算法则本身是不受符号影响的，算之前和算之后怎么看待
                        * SF 经运算就可能受影响，但进行无符号看待时，SF的值没有意义
                    + 感觉是不是就是等于结果的最高位?
                - TF
                    + Trap Flag
                    + 单步追踪标志位
                    + 所以进中断前 TF 要清零，否则一直循环进单步中断没停了
                - IF
                    + 中断 flag
                    + `cli`/`sti`
                - DF
                    + 方向标志位。串处理指令中(如movsb movsw)控制每次操作后 si di 的增减。
                        * df=0 增
                        * df=1 减
                        * movsb movsw 干的是 ds:[si] -> es:[di]
                            - 一般和 rep 配合，如 `rep movsb` 根据 cx 重复执行串传送
                    + 可与 `cld`/`std` 清除/设置方向标志配合
            * pushf popf 来直接操作/访问标志寄存器
    * CS:IP
        - cs, ip -> 地址加法器 -> 物理地址 -> 输入输出控制电路 -> 地址总线 -> 机器指令通过数据总线送入 CPU 中的指令缓冲器 -> 执行控制器 -> ip 自动 __增加__ 所读取指令的长度
        - 上电/复位
            + CS = FFFFH
            + IP = 0000H
        - 修改 cs, ip
            + `jmp 3:0B16`
                * 除非 debug 直接修改
        - 修改 ip
            + `jmp ax` 或bx等
                * 除非 debug 直接修改
    * DS 等段寄存器无法直接赋值，需要
        - 比如
        ```
        mov bx,1000h
        mov ds,bx
        ```
    * 内存单元的表示
        - [偏移地址]
    * 内存中字的存储
        - 字单元
            + 高地址内存单元存字型数据高位字节
        - 小心字型数据操作
            + 比如 `add cx, [1]` 是 cx = cx + (高ds:2 低ds:1)
    * 可将一段内存当作栈来使用
        - ss:sp 指向栈顶
        - 以字为单位
            + `push` / `pop`, `sp` __减__ 2
        - debug 的 `T` 单步命令在执行修改寄存器ss的指令时，下一条命令也会紧接着被执行
            + 涉及到中断机制
            + 
        - 小心 sp 超出自己安排的栈空间
            + 栈空间是自己安排、预设安全的不影响别的数据哒，并不是说是 sp 范围那么大，不过对于固定 ss, 最大只有 sp 范围那么大
            
# 3. Debug
- 模式
    + 实模式
        * 真 DOS
    + 虚拟 8086 模式
        * 命令行
    + 保护模式
        * windows (多任务)
- 命令
    + R
        * 查看改变寄存器
    + D
        * 查看内存
    + E
        * 改写内存
    + U
        * 内存中机器指令转汇编
    + T
        * 单步 CS:IP
    + A
        * 以汇编指令的格式在内存中写入一条机器指令
    + P
        * 执行中断语句

# 4. Coding
+ compiler: `masm`
    * `.asm` -> `.obj`
    * `.lst`
        - source listing
        - output, ignore
    * `.crf`
        - cross-reference
        - output, ignore
+ linker: `link`
    * `.obj` -> `.exe`
    * `.map`
        - list file
        - output, ignore
    * `.lib`
        - libraries
        - input, ignore
+ sample code
```
assume cs:codesg, ds:datasg, ss:stacksg //将有特用途的段和相关的段寄存器关联起来
//
//如果在代码段想直接用数据标号访问数据则需要assume否则编译器在编译时无法确定标号的段地址在哪个寄存器中，但这是编译器需要的，代码中还要对段寄存器进行真正设置
//数据标号参见下面的 直接定址表 section
datasg segment
    dw 0123h, 0456h, 0789h, 0abch, 0defh, 0fedh, 0cbah, 00987h // dw 表示 define word, 另亦有 db dd
    // 善用dup: db/dd/dw 次数 dup (数据)
datasg ends
//
stacksg segment
    dw 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 一般来说暂存数据首先考虑用 stack
stacksg ends
//
codesg segment //成对使用，定义段，codesg 可更名
    // 以下设置 ss 和 ds, 虽然有 assume 了但是实际还是要人工设 ds & ss
    // 其实当然也可以不分段，也就是只有 codesg 没有 datasg stacksg, 数据都放到codesg, 然后设 ds 和 ss 为 codesg, 注意 sp 要设置好对应地址
    mov ax, stacksg // label 表地址
    mov ss, ax
    mov sp, 20h // 可改?
    //
    mov ax, datasg
    mov ds, ax
    //
    ...
    //
    //以下用于返回
    mov ax, 4c00h
    int 21h
codesg ends
//
end //整个程序的结束，但如果有1或多个 label 的话，用 'end label名' 来指明程序入口
```
+ 数据和代码都是取决于自己怎么看待，所以这样可以编译成功
    ```
    ...
    jmp short s
    db 8 dup (0 0)
    s: mov ax, 0ffffh
    ...
    ```
+ `[bx]` 是 debug 和 masm 都认的，但是 `[idata]` debug 认 masm不认 (masm 直接当作 idata), masm 需要显式指明段地址寄存器，如 `[0]` -> `ds:[0]`
+ 安全空间
    * 一般 DOS 和其他合法程序不使用 0:200 ~ 0:2ff (00200h ~ 002ffh)
+ 程序加载在内存中情况
    * 假设空闲内存: SA:0
    * PSP区: SA:0
        - 程序段前缀，DOS 用来和被加载的程序进行通讯
    * 程序区: SA+10H:0
        - PSP 区和程序区虽物理地址连续，却有不同的段地址
+ source code 中数据不能以字母开头，`A000h` 应写作 `0A000h`
+ `mul`
    * 8-bit multiplication
        - 一个乘数在 AL, 一个在 8-bit reg/ram
        - 结果存在 AX
    * 16-bit multiplication
        - 一个乘数在 AX, 一个在 16-bit reg/ram
        - 结果存在 高DX低AX
+ `div`
    * 除数
        - 8-bit/16-bit
        - reg 或 内存单元中
    * 被除数
        - 除数 8-bit
            + 被除数 16-bit
                * in AX
        - 除数 16-bit
            + 被除数 32-bit
                * DX concat AX
    * 结果
        - 除数 8-bit
            + 商 in AL
            + 余 in AH
        - 除数 16-bit
            + 商 in AX
            + 余 in DX
+ `cmp`
    * 相当于不保存结果但影响flag的减法指令
    * 综合考虑 SF 和 OF 来确定实际结果的正负
    * 可用于配合 je jne jb(below) jnb ja(above) jna
+ 转移指令
    * 段内转移
        - ip变
        - 又分
            + 8-bit 短转移
                * ip: -128~127
            + 16-bit 近转移
                * ip: -32768~32767
    * 段间转移
        - cs ip 都变
    * 用 `offset` 来取得 label 的偏移地址
    * `jmp`
        - compiler 会有 error-detection 和 optimization
        - label
            + 段内转移
                * `jmp short label`
                * `jmp near ptr label`
                * 查看机器码可知，用的不是目的地址而是相对位移
            + 段间转移
                * `jmp far ptr label`
                * 这时机器码就会有对应段地址和偏移地址
                    - 注意顺序: (偏移地址低字节)(偏移地址高字节)(段地址低字节)(段地址高字节)
        - jmp 16-bit reg
        - jmp word ptr ds:[0] or [bx]
            + 段内转移
        - jmp dword ptr ds:[0] or [bx]
            + 段间转移
    * `jcxz`
        - cx==0 时跳相对位移
        - 所有有条件转移指令都是短转移
    * `loop`
        - cx -= 1
        - `cx` 不为 0 则跳 label
        - 短转移
    * `call`
        - change ip
            + call label
            + call 16-bit reg
            + call word ptr ds:[0] or [bx]
        - change cs ip
            + call far ptr label
            + call dword ptr ds:[0] or [bx]
    * `ret`
        - 短转移
            ```
            pop ip
            ```
    * `retf`
        - 远转移
            ```
            pop ip
            pop cs
            ```

# 5. 数据处理
+ 寻址方式
    ![addressing](/img\assembly\addressing.jpg)
    其中 _相对基址变址寻址_ `[bx+si+200]` 又可以写作
    * `200[bx][si]`
    * `[bx].200[si]`
    * `[bx][si].200`
    * si,di 不能同时用, bx, bp 不能同时用
        - SI源变址寄存器，DI目地变址寄存器，既然是变址寄存器，那么他们肯定是在某个地址的基础上进行偏移变化，即基址寄存器。 要是把这两个寄存器同时使用，那你地址变化的基址都没有，该怎么变化呢？在谁的基础上变化（也就是地址偏移）？ 
        - 通常用mov ,add ,sub 等指令时，用si,di寻址是一样的，都默认与DS搭配（除非明确指定与ES等来组合）来寻址。但遇到块移动、块比较等块操作指令时，SI，DI的源和目的特征就表现出来了，默认情况下，SI与DS搭配，DI与ES搭配来寻址。这些指令有一个比较突出的特点，通常都有rep前缀。详见 cmps、 cmpsb、 cmpsd、 cmpsw、 ins、 insb、 insd、 insw、 lods、 lodsb、 lodsd、 lodsw、 movs、 movsb、 movsd、 movsw、 outs、 outsb、 outsd、 outsw、 stos、 stosb、 stosd、 stosw 、 scas scasb scasd scasw 等指令的用法。
+ 数据长度
    * 寄存器名暗示数据尺寸
    * `add`, `inc` 等操作不带寄存器名时，在内存单元前加 `word ptr` or `byte ptr` 指明访问的是字单元还是字节单元。
    * 有的指令默认指定操作的是字单元还是字节单元，如 `push` 只进行字操作。

# 6. 中断
+ 中断源
    * 除法错误
        - 中断类型码: 0
    * 单步
        - 中断类型码: 1
    * into
        - 中断类型码: 4
    * int n
        - 中断类型码: n
+ 中断向量表
    * 8086 中存在 0000:0000 ~ 0000:03FF
        - 一般 0000:0200 ~ 0000:02ff 可自用
    * 用以定位中断处理程序
    * 一个 entry 占 2 个字，高地址字存段地址，低地址字存偏移地址
+ 中断过程
    * 取中断类型码N
    * pushf
    * TF=0, IF=0
    * push CS
    * push IP
    * (IP)=(N*4), (CS)=(N*4+2)
+ `iret` 中断返回
    * 相当于
        ```
        pop IP
        pop CS
        popf
        ```
+ 若要改写中断
    * 安装中断处理程序 (其实就是复制数据到指定地址 可用 rep movsb, cx 设为 offset end - offset start)
    * 改写中断向量
    * 要用的数据要放在不会被释放/覆盖的空间，比如就可以放在中断程序中，jmp 到真正的程序，jmp 后紧跟数据
+ 设置 ss 后，设好 sp 前，不会响应任何中断
    * 因为如果响应会 flag cs ip 压栈，ss 变了 sp 没变，不是指向正确的栈顶
+ BIOS 和 DOS 亦提供了一些中断例程
+ 外中断
    * 可屏蔽中断
        - IF=0 时不响应可屏蔽中断
        - 几乎所有由外设引发的外中断都是可屏蔽中断
    * 不可屏蔽中断
        - 类型码固定为2
        - 故对于不可屏蔽中断终端过程中不需要取中断类型码

# 7. 端口
+ `in` `out`
    * 数据只能放在 al / ax
    * 0~255 端口号直接写，256~65535 端口号放 dx
+ 读写 CMOS RAM 中的信息
+ 接口卡和主板上装有各种接口芯片，内部有寄存器，CPU 将这些寄存器当作端口来访问
    * 外设输入利用外中断

# 8. 直接定址表
+ db/dw/dd 前加一个别名就好啦，注意没有 `:`, `:` 这种 label 相关的只能用在代码段
    ```
    data segment
        a db 1,2,3,4,5,6,7,8
        b dw 0
    data ends
    ```
    后面代码中可以很方便用
    ```
    mov al, a[si]
    add b,ax
    ```
    而且这种相当于同时描述了地址和单元长度
    `mov b,2` 相当于 `mov word ptr ds:[8], 2`
+ 用途
    * 数据查表
    * 地址表，如
        ```
        table dw ag0, ag30, ag60, ...   // 字符串偏移地址表
        ag0 db '0', 0                   // sin(0) 对应字符串 "0"
        ...
        ```

# 9. 指令系统总结
+ 数据传送
    * mov
    * push
    * pop
    * pushf
    * popf
    * xchg
+ 算术运算
    * add
    * sub
    * adc
    * sbb
    * inc
    * dec
    * cmp
    * imul
    * idiv
    * aaa
+ 逻辑
    * and
    * or
    * not
    * xor
    * test
    * shl
    * shr
    * sal
    * sar
    * rol
    * ror
    * rcl
    * rcr
+ 转移
    * jmp
    * jcxz
    * je
    * jb
    * ja
    * jnb
    * jna
    * loop
    * call
    * ret
    * retf
    * int
    * iret
+ 处理机控制
    * cld
    * std
    * cli
    * sti
    * nop
    * clc
    * cmc
    * stc
    * hlt
    * wait
    * esc
    * lock
+ 串处理 (与 rep repe repne 配合)
    * movsb
    * movsw
    * cmps
    * scas
    * lods
    * stos

# 10. 综合研究
+ 研究试验4 不使用main函数编程
    * 对于 turboc 是可行的，tc 把 c0s.obj 和 用户 .obj 一同连接生成 exe
        - c0s.obj 对应代码先运行，进行相关初始化如申请资源、设置 ds ss 等
        - c0s.obj 对应代码调用用户 main
        - 用户 main 返回，释放资源恢复环境
        - c0s.obj 对应代码调用 DOS 21h 例程 4ch 号功能返回
    * 所以改写 c0s.obj 让他调用别的函数即可
        ```
        assume cs:code
        //
        data segment
        db 128 dup (0)
        data ends
        //
        code segment
        start:
            mov ax, data
            mov ds, ax
            mov ss, ax
            mov sp, 128
            //
            call s
            //
            mov ax, 4c00h
            int 21h
            //
        s:
            //
        code ends
        //
        end start
        ```


