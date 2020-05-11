# Programming Language Picked

<!-- ex_nolevel -->

> 那个时候我还很年轻，还一心只想成为地表最强 coder

## low-level
* assembly
* C
    - [The Definitive C++ Book Guide and List](https://stackoverflow.com/questions/388242/the-definitive-c-book-guide-and-list)
    - The C Preprocessor
        + https://gcc.gnu.org/onlinedocs/cpp/index.html
* Rust
    - memroy safe
    - mid dev
* C++
    - mid dev
    - 万能头文件 `#include <bits/stdc++.h>`
    - compilation options
        + `g++ -march=native -m32 ... -Q --help=target`
    - SIMD
        + https://mirrors.edge.kernel.org/pub/linux/kernel/people/geoff/cell/ps3-linux-docs/CellProgrammingTutorial/BasicsOfSIMDProgramming.html
        + https://enigmahuang.github.io/2017/09/29/AVX-SIMD/
        + http://www.cs.uu.nl/docs/vakken/magr/2017-2018/files/SIMD%20Tutorial.pdf
        + https://www.inf.ethz.ch/personal/markusp/teaching/263-2300-ETH-spring12/slides/class15.pdf
        + https://www.moreno.marzolla.name/teaching/high-performance-computing/2017-2018/L08-SIMD.pdf
    - OpenMP
        + https://bisqwit.iki.fi/story/howto/openmp/

## concurrency
* GoLang
* OCaml
* Haskell
* PHP(X)
    - [php存在的问题](https://zhuanlan.zhihu.com/p/28490854)
        + FPM每个请求结束的时候，在PHP代码里创建的对象都被清理了，你执行过的代码，就跟没执行过一样，不留痕迹。
            * 在hello world那样的微型应用中，好像问题不大，稍微大一点的项目，我们为了DRY，为了少做重复劳动，为了提高开发效率，不得不使用框架，然后问题就来了，用PHP写的PHP框架，由于FPM的健忘，框架从init开始，到读取配置文件，到初始化各个组件，这种工作在每个请求到来的时候，都要重复的做一次，如果你需要读一个100M的元数据，那么每个HTTP请求来时，你都要读一次并解析一次，当你HTTP请求结束返回时，你解析过的100M元数据，又被销毁了，下一个请求来时，你依然要重复做。
            * 本来PHP 5.6已经可以吊打Python 3.6的性能了，PHP 7.1都不屑于跟Python比性能了，快几倍了。但是一旦引入同体量的框架，比如PHP用Laravel，Python用Django，剧情就反转了，Django竟然可以吊打PHP7加持的Laravel了。一个百米运动员就算跑的再快，每次枪响后都要先穿鞋带，穿好鞋带再穿鞋，然后再跑，跑完了把鞋脱下，再把鞋带抽出。就算它100米只要1秒就能跑完，光穿鞋的时间就够别的选手跑个来回了。
            * FPM这种方式并非PHP首创，在fastcgi出现之前，CGI都是这么干的，而且还是每个请求新开一个进程，比FPM还要开销大。然而到了21世纪，还在用FPM这种健忘型运行模式的，常见语言里就只剩PHP了。可能再过十年，FPM也渐渐被Swoole这样的不健忘的给取代了。
        + 这里不讨论Apache的MPM是否支持多线程，也不讨论PHP的扩展是否支持多线程，更不讨论PHP到底能不能利用多线程或者多核，这里只讨论纯粹的PHP代码，能否创建和管理线程。
            * PHP是完全不支持多线程，现在有了pthreads
                - 只能用在CLI下面
                - 只支持PHP 7.2+
            * 数据共享不方便

## quick dev
* GoLang
    - basic
        + [For continued](https://tour.golang.org/flowcontrol/2), [For is Go's "while"](https://tour.golang.org/flowcontrol/3), [Forever](https://tour.golang.org/flowcontrol/4)
        + [If with a short statement](https://tour.golang.org/flowcontrol/6)
        + [Pointers to structs](https://tour.golang.org/moretypes/4)
        + [Mutating Maps](https://tour.golang.org/moretypes/22)
        + [Function values](https://tour.golang.org/moretypes/24), [Function closures](https://tour.golang.org/moretypes/25)
        + [Switch with no condition](https://tour.golang.org/flowcontrol/11), [Switch evaluation order](https://tour.golang.org/flowcontrol/10), [Select](https://tour.golang.org/concurrency/5), [Default Selection](https://tour.golang.org/concurrency/6)
        + [Channels](https://tour.golang.org/concurrency/2), [Buffered Channels](https://tour.golang.org/concurrency/3), [Range and Close](https://tour.golang.org/concurrency/4), [sync.Mutex](https://tour.golang.org/concurrency/9)
        + [Interfaces](https://tour.golang.org/methods/9), [The empty interface](https://tour.golang.org/methods/14)
        + [Type switches](https://tour.golang.org/methods/16), [Type assertions](https://tour.golang.org/methods/15)
        + [Errors](https://tour.golang.org/methods/19)
    - profiling
		+ [google/pprof](https://github.com/google/pprof)
            * `go get github.com/google/pprof`
            * `pprof -top cpu.pprof`
            * `pprof -pdf cpu.pprof > 1.pdf`
		+ [pkg/profile](https://github.com/pkg/profile)
            + `import "github.com/pkg/profile"`
            + `defer profile.Start().Stop()`
            + .
                ```go
                start := time.Now()
                ...
                end := time.Now()
                log.Println("time: ", end.Sub(start))
                ```
    * platform-related
        - .
            ```go
            // +build windows

            package main

            import (
                "fmt"
                "syscall"
                "unsafe"
                "runtime"
            )

            func main() {
                if runtime.GOOS == "windows" {
                    var mod = syscall.NewLazyDLL("user32.dll")
                    var proc = mod.NewProc("MessageBoxW")
                    var MB_YESNOCANCEL = 0x00000003

                    ret, _, _ := proc.Call(0,
                        uintptr(unsafe.Pointer(syscall.StringToUTF16Ptr("This test is Done."))),
                        uintptr(unsafe.Pointer(syscall.StringToUTF16Ptr("Done Title"))),
                        uintptr(MB_YESNOCANCEL))
                    fmt.Printf("Return: %d\n", ret)
                }
            }
            ```
    * CGO
        - Makefile
            ```makefile
            CGO_ENABLED=1 GOOS=windows GOARCH=386   CC=i686-w64-mingw32-gcc-posix   CXX=i686-w64-mingw32-g++-posix   go build -ldflags "-X github.com/bytom/version.GitCommit=`git rev-parse HEAD`" -o <exec> <source>
            CGO_ENABLED=1 GOOS=windows GOARCH=amd64 CC=x86_64-w64-mingw32-gcc-posix CXX=x86_64-w64-mingw32-g++-posix go build -ldflags "-X github.com/bytom/version.GitCommit=`git rev-parse HEAD`" -o <exec> <source>
            CGO_ENABLED=1 GOOS=linux   GOARCH=386   CC=i686-linux-gnu-gcc           CXX=i686-linux-gnu-g++           go build -ldflags "-X github.com/bytom/version.GitCommit=`git rev-parse HEAD`" -o <exec> <source>
            CGO_ENABLED=1 GOOS=linux   GOARCH=amd64 CC=x86_64-linux-gnu-gcc         CXX=x86_64-linux-gnu-g++         go build -ldflags "-X github.com/bytom/version.GitCommit=`git rev-parse HEAD`" -o <exec> <source>
            ```
        + go file
            * `import "C"` 前面要紧跟, 后面要空行
            * CGO CGO 逗号表示与，空格表示或
                ```go
                // #cgo windows,amd64 linux CFLAGS: -I.
                // #cgo windows,amd64 linux LDFLAGS: -L./lib/ -l:cSimdTs_win32.o -lstdc++ -lgomp -lpthread
                // #cgo darwin,amd64 CFLAGS: -I. -I/usr/local/opt/llvm/include
                // #cgo darwin,amd64 LDFLAGS: -L./lib/ -lcSimdTs_darwin64.o -lstdc++ -lomp -L/usr/local/opt/llvm/lib
                // #include "./lib/cSimdTs.h"
                import "C"

                import (
                )
                ```
* Pyhton
* Node.js
    - nvm
    - npm
    - naturally async
    - promise