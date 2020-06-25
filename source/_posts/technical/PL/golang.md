# GoLang

## 性能
重性能的 api 别用反射

## framework
+ https://github.com/TarsCloud/TarsGo
+ bilibili / kratos
+ Terry-Mao / goim
+ panjf2000 / ants
+ GoCollaborate / src

## list
+ https://github.com/golang/talks
+ https://github.com/jakescript/go-bible
+ https://github.com/dgryski/go-perfbook
+ __https://github.com/yangwenmai/learning-golang__
+ https://github.com/inancgumus/learngo
+ https://github.com/hantmac/Mastering_Go_Second_Edition_Zh_CN
+ https://github.com/hoanhan101/ultimate-go
+ https://github.com/GoesToEleven/GolangTraining
+ https://github.com/quii/learn-go-with-tests
+ https://github.com/qichengzx/gopher-reading-list-zh_CN
+ https://github.com/golang/go/wiki/
    * https://github.com/golang/go/wiki/SliceTricks
+ https://github.com/aclements/go-misc
    * Miscellaneous Go hacks
+ https://github.com/golang/go/wiki/CodeReviewComments
+ https://github.com/dariubs/GoBooks
+ https://github.com/ardanlabs/gotraining
+ https://github.com/developer-learning/reading-go
+ https://github.com/qcrao/Go-Questions
+ https://github.com/gopherdata/gophernotes
+ [Effective Go](https://golang.org/doc/effective_go.html)
    * https://github.com/bingohuang/effective-go-zh-en
+ https://github.com/tmrts/go-patterns
+ https://github.com/bvwells/go-patterns
+ https://github.com/senghoo/golang-design-pattern
+ https://github.com/sevenelevenlee/go-patterns
+ https://github.com/gustavocd/dao-pattern-in-go
+ https://github.com/chai2010/go2-book/blob/master/README.md
+ https://github.com/cch123/golang-notes
    * Go runtime source code analysis(zh-cn)
+ sheepbao / golang_runtime_reading
    + golang 1.10.2 runtime code reading - golang runtime源码分析
+ golang-china / gopl-zh (Go语言圣经中文版)
+ go  perfbook
+ 《The Way to Go》中文译本，中文正式名《Go 入门指南》
    + https://github.com/Unknwon/the-way-to-go_ZH_CN ?
    + https://github.com/Unknwon/go-fundamental-programming
+ hantmac / Mastering_Go_ZH_CN
    * 《Mastering GO》中文译本，暂时命名为《玩转 GO》。阅读本书之前，您应该阅读有关Go的介绍性书籍，或者已经完成了Go By Example。本书的内容包括但不限于并发、网络编程、垃圾回收、组合、GO UNIX系统编程、基本数据类型（Array,Slice,Map）、GO源码、反射，接口，类型方法等高级概念。阅读本书需要一定的编程经验。如果你在工作中使用Go或者业余时间爱好GO，那…
+ https://github.com/smallnest/dive-to-gosync-workshop
+ https://github.com/masnun/golang-distributed-task-processing
+ https://github.com/sasha-s/go-deadlock
+ https://github.com/chai2010/advanced-go-programming-book
+ polaris1119 / The-Golang-Standard-Library-by-Example
    * Golang标准库。对于程序员而言，标准库与语言本身同样重要，它好比一个百宝箱，能为各种常见的任务提供完美的解决方案。以示例驱动的方式讲解Golang的标准库。
+ https://github.com/achilleasa/gopher-os
    * A proof of concept OS kernel written in Go
+ sausheong / gwp
    * Go Web Programming code repository
- https://bloodzer0.github.io/ossa/application-security/sdl/go-scp/
    + go语言安全编码规范（中文版）
- PacktPublishing / Security-with-Go
- [go-concurrent-quiz](https://github.com/smallnest/go-concurrent-quiz)
+ quii / learn-go-with-tests
+ eranyanay / 1m-go-websockets
+ https://github.com/smallnest/1m-go-tcp-server
    * https://colobu.com/2019/02/23/1m-go-tcp-connection/
    * https://colobu.com/2019/02/27/1m-go-tcp-connection-2/
    * https://colobu.com/2019/02/28/1m-go-tcp-connection-3/
+ https://blog.51cto.com/youerning/2089930
+ teivah / golang-good-code-bad-code
+ https://github.com/coldnight/go-memory-allocator-visual-guide
+ https://github.com/Workiva/go-datastructures
+ https://github.com/avelino/awesome-go
+ https://github.com/jobbole/awesome-go-cn
+ https://github.com/astaxie/build-web-application-with-golang
+ https://github.com/avelino/awesome-go
+ https://github.com/a8m/go-lang-cheat-sheet
+ https://github.com/skywind3000/awesome-cheatsheets/blob/master/languages/golang.go
+ gRPC 的四种数据交互模式
    * https://github.com/wuYin/grpc-modes
+ https://draveness.me/golang-101
+ https://github.com/cristaloleg/go-advices
+ https://github.com/a8m/golang-cheat-sheet
+ https://github.com/xmge/gonote
+ https://github.com/teh-cmc/go-internals
+ https://github.com/changkun/go-under-the-hood
+ https://github.com/chai2010/go-ast-book
+ https://github.com/gobyexample-cn/gobyexample
+ https://github.com/geektutu/7days-golang
+ http://github.com/shomali11/go-interview


## CSP 并发模型, communicating sequential processes
不同于传统的多线程通过共享内存来通信，CSP讲究的是以通信的方式来共享内存。

+ 传统
    * 线程间通信都是通过共享内存。
    * 非常典型的方式是锁，因此，衍生出一种方便操作的“线程安全的数据结构”。
    * go 也有
        - 临界区(critical section), 每次只允许一个goroutine进入某个代码块
            + 互斥锁
            + 条件变量 Cond
                * Wait
                * Signal
                * Broadcast 
        - 原子操作(atomicity)
            + Add
            + CAS, compare and swap 交换并比较
            + store value & load value
            + swap

### Don't communicate by sharing memory; share memory by communicating

+ [Share Memory By Communicating](https://blog.golang.org/share-memory-by-communicating)
+ [Explain: Don't communicate by sharing memory; share memory by communicating](https://stackoverflow.com/questions/36391421/explain-dont-communicate-by-sharing-memory-share-memory-by-communicating):
    + Instead of explicitly using locks to mediate access to shared data, Go encourages the use of channels to pass references to data between goroutines. 
    + an [interesting history](https://swtch.com/~rsc/thread/) that begins with C. A. R. Hoare's [Communicating Sequential Processes](http://www.usingcsp.com/).
+ [Codewalk: Share Memory By Communicating](https://golang.org/doc/codewalk/sharemem/):
    + [Channels](#channel) allow you to pass references to data structures between goroutines. If you consider this as passing around ownership of the data (the ability to read and write it), they become a powerful and expressive synchronization mechanism.
    + the convention is that sending a Resource pointer on a channel __passes ownership__ of the underlying data from the sender to the receiver. Because of this convention, we know that no two goroutines will access this Resource at the same time. This means we __don't have to worry about locking__ to prevent concurrent access to these data structures. 

### channel

## pprof

## Mem leak & GC
+ 减少对象分配
    * 尽量做到对象的重用
+ goroutine channel leak
    * 绝对不能由消费者关channel
        - 因为向关闭的channel写数据会panic。
        - 正确的姿势是生产者写完所有数据后，关闭channel，消费者负责消费完channel里面的全部数据
            ```
            func produce(ch chan<- T) {
                defer close(ch) // 生产者写完数据关闭channel
                ch <- T{}
            }
            func consume(ch <-chan T) {
                for _ = range ch { // 消费者用for-range读完里面所有数据
                }
            }
            ch := make(chan T)
            go produce(ch)
            consume(ch)
            ```
            + 为什么consume要读完channel里面所有数据？
                * 因为 `go produce()`可能有多个，这样可以确定所有 produce 的 goroutine 都退出了，不会泄漏。
    * 利用关闭channel来广播取消动作
        - 对于每个长连接请求各开了一个读取和写入协程，全部采用endless for loop不停地处理收发数据。当连接被远端关闭后，如果不对这两个协程做处理，他们依然会一直运行，并且占用的channel也不会被释放…这里就必须十 分注意，在不使用协程后一定要把他依赖的channel close并通过再协程中判断channel是否关闭以保证其退出。
+ 不要光盯着top上面的数字
    * 因为Go向系统申请的内存不使用后，也不会立刻归还给系统。
        - 只是告诉系统这些内存可以回收；操作系统并不是立即回收，等 到系统内存紧张时才会开始回收
+ gc stop the world, gc 过多会抢占程序的正常执行时间
+ go的 垃圾回收有个触发阈值，这个阈值会随着每次内存使用变大而逐渐增大（如初始阈值是10MB则下一次就是20MB，再下一次就成为了40MB…），如果长时 间没有触发gc go会主动触发一次（2min）。
+ 关注(从系统申请的内存会在Go的内存池管理，整块的内存页，长时间不被访问并满足一定条件后，才归还给操作系统。又因为有GC，堆内存也不能代表内存占用，清理过之后剩下的，才是实际使用的内存。)
    * 程序占用的系统内存
    * Go的堆内存
    * 实际使用到的内存
+ 使用
    * `runtime.ReadMemStats`: Go 内存使用信息
    * pprof
+ 考虑到程序中为了更好地做抽象，使用了反射操作，而 `reflect.Value` 会将对象拷贝并分配到堆上，程序中的对象都是消息体，有的消息体会超大，因此会分配较多的堆内存。对程序做了一版优化，去掉这个反射逻辑，改为 `switch case`
+ `fmt.Sprint`, 这个函数会把对象分配到堆上


## pool
+ https://golang.org/pkg/sync/#Pool
+ https://www.reddit.com/r/golang/comments/2ap67l/when_to_use_syncpool_and_when_not_to/
+ https://www.reddit.com/r/golang/comments/6ng0aq/correct_use_of_syncpool/
+ http://www.akshaydeo.com/blog/2017/12/23/How-did-I-improve-latency-by-700-percent-using-syncPool/
+ https://stackoverflow.com/questions/50851421/sync-pool-is-much-slower-than-using-channel-so-why-should-we-use-sync-pool


## 百万长连接

### 前言
最近在看 golang 如何建立百万 tcp 连接 https://github.com/smallnest/1m-go-tcp-server , 觉得会对 blockcenter 有帮助 这里是我的一些总结

[A Million WebSockets and Go](https://medium.freecodecamp.org/million-websockets-and-go-cc58418460bb) 2017 Sergey Kamardin 就已经介绍过 golang 如何实现百万 WebSocket 连接. 介绍了epoll的使用 (https://github.com/mailru/easygo)

2019 2月 Eran Yanay 也进行了一个 百万 websocket 链接的分享, 对epoll的处理做了简化，而且提供了docker测试的脚本，很方便的在单机上进行百万连接的测试。

这篇文章 则是探讨了 更通用的 tcp 连接，而非 websocket

### 动机
go 常见处理连接的方式是一个连接一个goroutine. goroutine 虽然开销便宜，但如果上到一百万的连接, 一百万个goroutine 锁使用的栈大小(gostack) 就要花费十几G内存，如果在每个goroutine中在分配byte buffer用以从连接中读写数据，
内存开销就要几十G。

典型场景: 消息推送、IOT、页游等场景，追求的是大量连接，并发量相对不大的场景

当然，当上到百万连接时也可以 多服务器负载均衡 但如果能垂直扩展，则能有效降低成本.

### 对比
Eran Yanay使用epoll的方式代替goroutine-per-connection, 显然这个单goroutine处理的模式不适合耗时较长的业务处理, 对于并发量很大，延迟要求比较低的场景，可能存在问题。

1. 多 epoller vs 单 epoller 
多 epoller 吞吐率大幅增加，而延迟略微增加。

2. prefork vs 多 epoller
prefork的服务器客户端吞吐率大幅增加，而延迟比多poller翻倍。

3. workerpool
Reactor的方式，将I/O goroutine和业务goroutine分离， I/O goroutine采用单goroutine的方式，监听的消息交给一个goroutine池 (workerpool)去处理，这样可以并行的处理业务消息，而不会阻塞I/O goroutine。

吞吐率 (tps)   延迟 (latency)
goroutine-per-conn  202830  4.9s
单epoller    42402   0.8s
多epoller    197814  0.9s
prefork 444415  1.5s
workerpool  190022  0.3s

从测试结果来看, 在百万并发的情况下， workerpool既能达到很高的吞吐率, 延迟也很低
prefork可以大幅提高吞吐率，但是延迟要稍微长一些。

### 正常连接数量情况下 多epoller服务器 vs goroutine-per-conn

I/O密集型: 吞吐率会和连接数相关，但不是线性，随着连接数的增加，，连接数的增加带来的吞吐率的增加将变得很小。连接数比较小的情况下，正统的goroutine-per-connection可以取得很好的延迟，并且为了提高吞吐率，可以适当增加连接数。

计算密集型: 两种方式的性能差别不大。


### 其他
[今日头条Go建千亿级微服务的实践](https://zhuanlan.zhihu.com/p/26695984)中提到
> 尽量避免反射，在高性能服务中杜绝反射的使用
> 
> 

## Checklist

### project structure
+ https://golang.org/doc/code.html#Organization
+ https://stackoverflow.com/questions/14867452/what-is-a-sensible-way-to-layout-a-go-project
+ https://github.com/golang-standards/project-layout

### styleguide
+ https://github.com/uber-go/guide
+ https://github.com/golang/go/wiki/CodeReviewComments
+ https://dave.cheney.net/practical-go/presentations/qcon-china.html#_dont_name_your_variables_for_their_types
+ https://github.com/unknwon/go-code-convention
+ https://github.com/davecheney/the-zen-of-go

### goreportcard
+ https://goreportcard.com/
+ https://xz.aliyun.com/t/3040
    * deadcode
    * dupl
    * errcheck
    * gochecknoglobals
    * gochecknoinits
    * goconst
    * gocyclo
    * goimports
    * golint
    * gosec
    * gotype
    * gotypex
    * ineffassign
    * interfacer
    * lll
    * maligned
    * misspell
    * nakedret
    * safesql
    * staticcheck
    * structcheck
    * unconvert
    * unparam
    * varcheck
+ https://medium.com/@arshamshirvani/lint-your-golang-code-like-a-pro-668dc6637b39
    * gofmt
    * gocyclo
    * interfacer
    * deadcode
    * gotype
    * misspell
    * staticcheck
    * gosimple
    * goconst

### pitfalls
+ https://github.com/chai2010/advanced-go-programming-book/blob/master/appendix/appendix-a-trap.md
+ copy by value
+ sync/atomic
    * lock?
    * map mutex

### go-critic

#### casting check
uint 转 int 要检查会不会 变成负数

尤其是 存在 用户输入的  p2p交换 和 合约


#### avoid copying arrays in loops
https://github.com/ethereum/go-ethereum/pull/17265/

https://go-critic.github.io/overview.html#rangeexprcopy


#### rangeValCopy
Avoid copying big objects during each iteration.

Use index access or take address and make use pointer instead.

https://go-critic.github.io/overview.html#rangevalcopy

#### builtinshadow
变量名不要和关键字重复， 比如 `len`, `error`

https://go-critic.github.io/overview.html#builtinshadow

### Mics

#### submodule 
+ Delete the relevant section from the .gitmodules file.
+ Stage the .gitmodules changes git add .gitmodules
+ Delete the relevant section from .git/config.
+ Run git rm --cached path_to_submodule (no trailing slash).
+ Run rm -rf .git/modules/path_to_submodule (no trailing slash).
+ ~~Commit git commit -m "Removed submodule "~~
+ ~~Delete the now untracked submodule files rm -rf path_to_submodule~~

#### append

https://stackoverflow.com/questions/27622083/performance-slices-of-structs-vs-slices-of-pointers-to-structs

AppendingStructs is faster than AppendingPointers
