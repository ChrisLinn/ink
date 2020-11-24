# Concurrent & Parallel

+ https://paul.pub/cpp-concurrency/

## 设计模式

### 创建型
#### [单例（Singleton）](https://github.com/CyC2018/Interview-Notebook/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F.md#1-%E5%8D%95%E4%BE%8Bsingleton)
- 双重校验锁-线程安全
    + .
        ```
        public class Singleton {

            private volatile static Singleton uniqueInstance;

            private Singleton() {
            }

            public static Singleton getUniqueInstance() {
                if (uniqueInstance == null) {
                    synchronized (Singleton.class) {
                        if (uniqueInstance == null) {
                            uniqueInstance = new Singleton();
                        }
                    }
                }
                return uniqueInstance;
            }
        }
        ```
- 静态内部类实现
    + 延迟初始化，且由虚拟机提供了对线程安全的支持
        ```
        public class Singleton {

            private Singleton() {
            }

            private static class SingletonHolder {
                private static final Singleton INSTANCE = new Singleton();
            }

            public static Singleton getUniqueInstance() {
                return SingletonHolder.INSTANCE;
            }
        }
        ```
    + 只有当调用 `getUniqueInstance()` 方法从而触发 SingletonHolder.INSTANCE 时 SingletonHolder 才会被加载，此时初始化 INSTANCE 实例。
- __枚举实现__
    + 单例模式的 __最佳__ 实践，它实现简单，并且在面对复杂的序列化或者反射攻击的时候，能够防止实例化多次。
        ```
        public enum Singleton {
            uniqueInstance;
        }
        ```





## Technique
+ Shared Memory
+ Mutex & Semaphore
    * https://www.zhihu.com/question/47704079
    * 恐龙书
+ MapReduce
    * https://www.google.com.au/search?q=mapreduce&ei=0X6SWYiEC8Wk8QW1-JuYDg&start=10&sa=N&biw=1600&bih=744
    * https://baike.baidu.com/item/MapReduce
    * https://hadoop.apache.org/docs/r1.2.1/mapred_tutorial.html
    * http://hadoop.apache.org/docs/r1.0.4/cn/mapred_tutorial.html
    * https://www.ibm.com/analytics/us/en/technology/hadoop/mapreduce/
    * https://en.wikipedia.org/wiki/MapReduce
+ distributed
    * [《分布式系统设计》，来自微软](https://azure.microsoft.com/en-us/resources/designing-distributed-systems/en-us/)
    * [谈谈分布式系统](https://mp.weixin.qq.com/s/J11Us4RE37fthUxsoDzW5Q)
    * [decentralized-research](https://github.com/nicola/decentralized-research)
    * https://github.com/asatarin/testing-distributed-systems
    * https://github.com/aphyr/distsys-class
    * P2P
        - [DNA](https://github.com/DNAProject/DNA)
    * [phxpaxos](https://github.com/letiantian/tencent-open-source)
+ SIMD
+ [OpenMP](https://bisqwit.iki.fi/story/howto/openmp/)
    * usage
        - `#include <omp.h>`
        - `#pragma omp parallel for`
        - `-fopenmp` in compling and linking
            + the flag actually makes it link to when linking
        - wrap-up
            + parrallel
            + for
            + parrallel for
            + atomic
            + critical
            + reduction
            + simd
    * OpenMP vs OpenCL
        - OpenMP 和 OpenCL 都是用于高性能计算机，但前者主要是基于 __CPU__ 的并行，后者主攻 __GPU__ 并行。
            + OpenMP (Open Multi-Processing)
                * 跨平台共享内存方式的多线程并发的编程API，使用C,C++和Fortran语言
                * CPU擅长处理不规则数据结构和不可预测的存取模式，以及递归算法、分支密集型代码和单线程程序。这类程序任务拥有复杂的指令调度、循环、分支、逻辑判断以及执行等步骤。例如，操作系统、文字处理、交互性应用的除错、通用计算、系统控制和虚拟化技术等系统软件和通用应用程序等等。
                    - 逻辑运算
            + OpenCL (Open Computing Language)
                * OpenCL是一个为异构平台编写程序的框架，此异构平台可由CPU、GPU、DSP、FPGA或其他类型的处理器与硬件加速器所组成。
                * GPU擅于处理规则数据结构和可预测存取模式。例如，光影处理、3D 坐标变换、油气勘探、金融分析、医疗成像、有限元、基因分析和地理信息系统以及科学计算等方面的应用。
                    - 简单暴力运算
                        + GPU芯片中有几百甚至更多数量的物理计算单元
    * OpenCV vs OpenGL
        - OpenCV, Open Source Computer Vision Library
            + 图像处理和计算机视觉库
            + 解析图片
            + 图像到数据
        - OpenGL, Open Graphics Library
            + 图形程序接口
            + 渲染
            + 数据到图像
    * C++ AMP
        - Windows + all D3D11 graphics card
    * Vulkan里的compute shader
+ Hyper Threading
    * 物理多线程, 非完全物理并行，只对不同时使用的资源实现物理并行
+ matrix
    * [How does Eigen compare to BLAS/LAPACK?](http://eigen.tuxfamily.org/index.php?title=FAQ#How_does_Eigen_compare_to_BLAS.2FLAPACK.3F)
    * [BLAS vs LAPACK vs ATLAS](https://stackoverflow.com/questions/17858104/what-is-the-relation-between-blas-lapack-and-atlas)
        - matlab的矩阵计算脱胎于mkl
            + Intel自己出的Math kernel library（MKL）,这个库远比其他的blas/lapack库要快
            + 不使用GPU加速的MATLAB版本采用的是BLAS中的General Matrix Multiplication[1]。学术界有各种矩阵乘法算法将其复杂度降低到O(n^2.x)，例如Strassen和Winograd算法，在BLAS中应该已经使用了Strassen算法。
            + 如果你的MATLAB是安装了Parallel Computing Toolbox的话，那么很可能它已经在使用GPU进行计算了。这种情况下采用的是MAGMA[2]。我没有使用过MAGMA，但我猜测它应该使用了cuBLAS来计算矩阵乘法。
            + 宏观角度上对矩阵乘法的优化包括对局部内存使用的优化(Blocked/Tiled)以及对中间运算步骤的优化(Strassen/Winograd)，实现细节上的优化就非常繁多了。比如loop unrolling，多级的tiling，指令级并行等等。其中会牵扯到一些编译器和体系结构的知识，似乎对仅仅希望使用矩阵乘法函数的用户来讲没有什么太大必要去探究
            + 同样算法 gpu 快是因为硬件
        - python，其矩阵计算速度虽然微微落后于MATLAB，但是在很多其他地方是可以大大强于MATLAB的。例如绘制大规模三维点云，以及轻松调用gpu之类的
            + 。因此python在矩阵计算的微小速度劣势完全可以忽略，可以考虑用于科学计算。关于NumPy链接MKL，我之前写过一篇博文：[Numpy使用MKL库提升计算性能](http://unifius.wordpress.com.cn/archives/5)。
    * [eigen vs mkl](https://stackoverflow.com/questions/10366054/c-performance-in-eigen-library)
        - [Using Intel® MKL from Eigen](https://eigen.tuxfamily.org/dox/TopicUsingIntelMKL.html)

## Implementation
### Python
#### `map` 
```
import urllib2
from multiprocessing.dummy import Pool as ThreadPool
 
urls = [
'http://www.python.org',
'http://www.python.org/about/',
# etc..
]
 
# Make the Pool of workers
pool = ThreadPool(4)
# Open the urls in their own threads
# and return the results
results = pool.map(urllib2.urlopen, urls)
#close the pool and wait for the work to finish
pool.close()
pool.join()
```

### [GoLang](/technical/golang.md)
#### `sync`
+ need to keep main thread running
    * `WaitGroup`
+ By default, the Go runtime allocates a single logical processor, bound to a single operating system thread, to execute all the goroutines. 当正在运行的 G0 阻塞的时候, 会再创建一个线程
    - not recommended to add more that one logical processor
        + Though if you configure the runtime to use more than one logical processor, the scheduler will distribute goroutines between these logical processors which will result in goroutines running on different operating system threads.
    * It's concurrent but not parallel
    * If wanna make it parallel
        - `GOMAXPROCS`
            + set to the number of cores available
                * physical processors
+ Concurrency Example1
    * only one thread is used
    * code
        ```
        package main

        import (
            "fmt"
            "runtime"
            "sync"
        )

        func main() {
            runtime.GOMAXPROCS(1)

            var wg sync.WaitGroup
            wg.Add(2)

            fmt.Println("Starting Go Routines")
            go func() {
                defer wg.Done()

                for char := ‘a’; char < ‘a’+26; char++ {
                    fmt.Printf("%c ", char)
                }
            }()

            go func() {
                defer wg.Done()

                for number := 1; number < 27; number++ {
                    fmt.Printf("%d ", number)
                }
            }()

            fmt.Println("Waiting To Finish")
            wg.Wait()

            fmt.Println("\nTerminating Program")
        }
        ```
    * result
        ```
        Starting Go Routines
        Waiting To Finish
        a b c d e f g h i j k l m n o p q r s t u v w x y z 1 2 3 4 5 6 7 8 9 10 11
        12 13 14 15 16 17 18 19 20 21 22 23 24 25 26
        Terminating Program
        ```
+ Concurrency Example2
    * Calling sleep causes the scheduler to swap the two goroutines
    * code
        ```
        package main

        import (
            "fmt"
            "runtime"
            "sync"
            "time"
        )

        func main() {
            runtime.GOMAXPROCS(1)

            var wg sync.WaitGroup
            wg.Add(2)

            fmt.Println("Starting Go Routines")
            go func() {
                defer wg.Done()

                time.Sleep(1 * time.Microsecond)
                for char := ‘a’; char < ‘a’+26; char++ {
                    fmt.Printf("%c ", char)
                }
            }()

            go func() {
                defer wg.Done()

                for number := 1; number < 27; number++ {
                    fmt.Printf("%d ", number)
                }
            }()

            fmt.Println("Waiting To Finish")
            wg.Wait()

            fmt.Println("\nTerminating Program")
        }
        ```
    * result
        ```
        Starting Go Routines
        Waiting To Finish
        1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 a
        b c d e f g h i j k l m n o p q r s t u v w x y z
        Terminating Program
        ```
+ Parallel Example
    * code
        ```
        package main

        import (
            "fmt"
            "runtime"
            "sync"
        )

        func main() {
            runtime.GOMAXPROCS(2)

            var wg sync.WaitGroup
            wg.Add(2)

            fmt.Println("Starting Go Routines")
            go func() {
                defer wg.Done()

                for char := ‘a’; char < ‘a’+26; char++ {
                    fmt.Printf("%c ", char)
                }
            }()

            go func() {
                defer wg.Done()

                for number := 1; number < 27; number++ {
                    fmt.Printf("%d ", number)
                }
            }()

            fmt.Println("Waiting To Finish")
            wg.Wait()

            fmt.Println("\nTerminating Program")
        }
        ```
    * result
        ```
        Starting Go Routines
        Waiting To Finish
        a b 1 2 3 4 c d e f 5 g h 6 i 7 j 8 k 9 10 11 12 l m n o p q 13 r s 14
        t 15 u v 16 w 17 x y 18 z 19 20 21 22 23 24 25 26
        Terminating Program
        ```

#### CSP 
- Gosched
    + 这个函数的作用是让当前 `goroutine` 让出 CPU, 当一个 `goroutine` 发生阻塞, Go 会自动地把与该 `goroutine` 处于同一系统线程的其他 `goroutine` 转移到另一个系统线程上去, 以使这些 `goroutine` 不阻塞
        * code
            ```
            package main

            import (
                "fmt"
                "runtime"
            )

            func init() {
                runtime.GOMAXPROCS(1)  //使用单核
            }

            func main() {
                exit := make(chan int)
                go func() {
                    defer close(exit)
                    go func() {
                        fmt.Println("b")
                    }()
                }()

                for i := 0; i < 4; i++ {
                    fmt.Println("a:", i)

                    if i == 1 {
                        runtime.Gosched()  //切换任务
                    }
                }
                <-exit

            }
            ```
        * result
            ```
            a: 0
            a: 1
            b
            a: 2
            a: 3
            ```

##### CSP vs actor model

+ http://www.usingcsp.com/cspbook.pdf
+ 最基本，也是每个人都需要掌握的并发模型是 threading / multiprocessing，也就是 lock-based concurrency
+ CSP
    * CSP 是 occam 第一个引入到语言的，但让 CSP 变得流行要归功于 golang，随后 clojure 又在其 core.async 也把 CSP 引入语言的核心库。
+ 之后是 actor model，自从 erlang 将其从学术界引入到工业界，actor model 开始受到重视，尤其是最近几年，随着分布式系统地流行，actor model 开始大放异彩，开始渗透到其他主流语言。actor model 和 CSP 某些地方很像
+ STM (software transaction memory) 稍微冷门一些，目前使用 STM 的主流语言只有 clojure。它从数据库吸取了很多灵感。
+ 最后介绍的是 future。主要谈了 Promise 和 Observable。这是两个非常重要的概念，在 javascript 应用广泛，但其概念也可以应用于任何语言（Observable 有多个语言的实现）。


#### `context`
+ 应用场景主要是在API中
    * goroutine往往要衍生出许多额外的goroutine去处理操作, 如
        - 链接database
        - 请求rpc请求
    * 衍生的goroutine和主goroutine有很多公用数据的
        - 同一个请求生命周期、用户认证信息、token等
    * 当这个请求超时或者被取消的时候，这里所有的goroutine都应该结束


## Popular distributed services frameworks
+ [Hadoop](https://www.google.com.au/search?q=hadoop&oq=hadoop&aqs=chrome..69i57j0l5.3599j0j7&sourceid=chrome&ie=UTF-8)
+ [Spark](https://www.google.com.au/search?q=spark&oq=spark&aqs=chrome..69i57j0l5.7501j0j7&sourceid=chrome&ie=UTF-8)
+ ZooKeeper
    * zookeeper实际使用了paxos的简化版算法。想搞明白比特币(成于区块链技术)的算法，应先弄明白paxos算法（便于对比）
+ Dubbo
+ Kite 


## High Concurrency 高并发
+ [关于高并发](https://zhuanlan.zhihu.com/p/38636111)
    * ? [如何获得高并发经验](https://zhuanlan.zhihu.com/p/38552590)
    * [手把手教你构建一个高性能、高可用的大型分布式网站](https://www.toutiao.com/a6573634116791566851/)
        - 分层
            + 应用层
                * 无状态
                * 负载均衡
                * Session 同步
            + 服务层
                * 服务化
                    - 垂直拆分
                        + 分级
                            * 突发流量/发生问题, 服务降级
                                - 自动切换到备用程序上，如访问redis失败改访问DB等。
                    - 限流
                        + 对每个IP、每个token进行限制，通过令牌桶算法，每个时间段只允许指定数量的服务通过
                    - 断路器
                        + 如果发现该断路器访问服务端在10秒内访问超过50次且失败率高于50%，则中断该断路器的访问10秒钟，以保护下游系统。
                            * hystrix
                * 消息队列
                * 幂等设计
            + 数据层
                * 海量数据 NoSQL 数据库加上搜索引擎可以达到更好的性能。并不是所有的数据都要放在关系型数据中。
                    - Elasticsearch
            + 管理层
            + 分析层
        - 资源复用
            + 对象池
            + 线程池
        - CDN 加速
            + 将数据内容缓存到运营商的机房，用户访问时先从最近的运营商获取数据
        - 反向代理
            + 部署在网站的机房，当用户请求达到时首先访问反向代理服务器，反向代理服务器将缓存的数据返回给用户。
            + 如果没有缓存数据才会继续访问应用服务器获取，这样做减少了获取数据的成本。
                * 缓存要善于做分级（本地/分布）
            + Squid、Nginx
+ [究竟啥才是互联网架构“高并发”](https://zhuanlan.zhihu.com/p/24830094)  
    * 垂直扩展
        - 增强单机硬件性能
        - 提升单机架构性能
            + 使用Cache来减少IO次数
            + 使用异步来增加单服务吞吐量
            + 使用无锁数据结构来减少响应时间
    * 水平扩展
+ [电商网站中，50W-100W高并发，秒杀功能是怎么实现的？](https://www.zhihu.com/question/20978066/answer/56149380)
    * CDN或反向代理
    * 负载均衡器中，负载均衡器分配到web服务器中，web服务器在进入队列
    * 之后进入一个统一的缓存计数器中
    * 大流量系统想要保证数据库中与前台与缓存的一致性几乎不可能，只要保证最终落表的数据正确
+ [高并发网络架构解决方案分析](https://zhuanlan.zhihu.com/p/27817343)
    * HTML 静态化
        - cms
    * 文件
        - 图片服务器分离
        - 镜像分流
        - 禁止盗链
        - 控制大文件下载/专用下载服务器
    * 数据库集群&库表散列
    * 缓存
    * 镜像
    * 负载均衡
        - 硬件
            + F5
        - 软件
            + DNS
            + LVS
                * 四层负载均衡，根据目标地址和端口选择内部服务器
                * 分发路径优于 Nginx，性能要高些
            + Nginx
                * 七层负载均衡，可以根据报文内容选择内部服务器
                * 更具配置性，如可以用来做动静分离（根据请求报文特征，选择静态资源服务器还是应用服务器）
+ [傻瓜都能看懂的高并发量服务器架构](https://zhuanlan.zhihu.com/p/27289476)

### 压力测试 pressure test
+ 识别核心业务链路
    * 漏斗模型
+ 压测不应该污染生产数据
    * 压测流量识别
        - 协议（如http头）
    * 数据隔离
        - proxy 路由
            + 影子数据库/表
            + 数据偏移


## SQL
+ [MySQL数据库](https://zhuanlan.zhihu.com/p/43031084)
+ 隔离级别
+ 索引
    * mysql 索引原理 B+ 树
    * 频繁 查询的加索引，但 如果表频繁 insert update就别加了，会重建索引
+ 数字型字段比字符型快，因为查询和连接会逐个比较字符串每一个字符，而字符型只需比较一次
+ 避免 `select * from` 
+ where 
    * `is null` 将导致放弃索引、全表扫描
    * 应该 `not null` & `= 0`
    * where 应该 尽量确定
        - 避免 等号左边 使用 函数、算数运算或其它表达式运算
        - 避免 `like`
+ in 
    * 尽量避免吧、如果能用 `between`/`exists`


## [Cache](https://github.com/superhj1987/pragmatic-java-engineer/blob/master/book/chapter5-datastore/cache.md)

### Misc
+ LRU

### 本地缓存
......

### 分布式缓存
#### Memcached?
* 支持的数据结构太少

#### Redis
* 丰富的数据结构
* 基于事件驱动的单线程非阻塞IO
    - 使用List的pop和push功能可以作为阻塞队列/非阻塞队列
    - 使用SUBSCRIBE和PUBLISH可以实现发布订阅模型
* 实时分析(累加统计...)
* 使用Set做去重的计数统计
    - 使用getbit、setbit、bitcount做大数据量的去重统计，允许误差的情况下可使用HyperLogLog
* 使用SortedSet可以做排行榜等排序场景

##### 内存压缩
+ key越短越好
+ value越小越好
    * 存储序列化后的字节时，选择最节省内存的序列化方式, 如Kryo、Protobuf

##### 数据失效和淘汰
......

##### 持久化
+ 如果想要保证数据的安全性，建议同时开启AOF和RDB
    * RDB有可能丢失文件
        - 基于二进制快照
        - 默认触发策略是60秒内改了1万次或300秒内改了10次或900秒内改了1次
    * AOF
        - 基于日志
            + restoring can be slow & log can be big
        - 默认是每隔1秒进行一次fsync（将日志写入磁盘），因此与RDB相比，其最多丢失1秒钟的数据 

##### 分布式架构
+ Master-Slave
+ Redis Cluster
    * 没有中心节点
    * 成员管理 通过节点之间两两通讯, 基于Gossip协议定期交换并更新
    * 比较重的集群方案
+ 客户端分片

##### 注意
+ 尽量减少字符串频繁修改操作如append，setrange, 改为直接使用set修改字符串，可以降低预分配带来的内存浪费和内存碎片化。
+ 缓存的失效时间不要集中在同一时刻，会导致缓存占满内存触发内存淘汰（占用CPU）或者直接导致缓存雪崩。
+ String类型在1KB（Redis官方测试）是一个吞吐量性能拐点，因此String类型的大小以1KB以内为宜（局域网环境下，1KB以内吞吐性能基本一致），最大不超过10KB。
+ 尽量使用mset、hmset等做批量操作，以节省网络IO消耗
+ 使用List做队列时，如果需要ack, 可以考虑再使用一个SortedSet，每次队列中pop出一个元素则按照访问时间将其存储到SortedSet中，消费完后进行删除。
+ 控制集合键数据（list、set、zset、hash）的元素个数在5000以内，防止造成大key的查询阻塞其他请求的处理。可以使用zsan、hsan、sscan进行渐进操作或者分拆key来处理。
+ 当无法避免对大集合键数据（元素非常多）进行全量读取时，可以通过搭建多个slave来提升性能，也可以使用Memcached作为Redis前面全量读取的缓存，从而利用MC的多线程实现方式以及对二进制KV的高效读取来获得性能的提升。
+ 对大集合键数据的删除避免使用del，会造成Redis阻塞。
    * hash: 通过hscan命令，每次获取一部分字段，再用hdel命令，每次删除1个字段。
    * list： 使用ltrim命令每次删除少量元素。
    * set: 使用sscan命令，每次扫描集合中一部分元素，再用srem命令每次删除一个键。
    * zset: 使用zremrangebyrank命令,每次删除top 100个元素。

##### 配置
+ 设置Redis最大内存，以防内存用爆。
+ Redis的最大连接数默认为10000
+ 单点Redis的性能一般能够达到10万QPS左右


#####  缓存设计 (缓存失效时的处理和如何更新缓存)

常用的解决缓存穿透问题的方案:

+ 在底层存储系统之上加一层布隆过滤器，将所有可能存在的数据哈希到一个足够大的BitMap中，一个一定不存在的数据会被这个BitMap拦截掉，从而避免了对底层存储系统的查询压力。
+ 如果数据在存储层查询也为空，那么对此空结果也进行缓存，但要设置合适的失效时间。


解决缓存穿透的问题和缓存更新机制相关。缓存更新的常用三种模式：

+ Cache Aside Pattern: 应用程序以数据库为准，失效则从底层存储更新，更新数据先写入数据库再更新缓存。是最常用的缓存更新模式。
+ Read/Write Through Pattern: 以缓存为准，应用只读写缓存，但是需要保证数据同步更新到了数据库中。
+ Write Behind Caching Pattern: 以缓存为准，应用只读写缓存，数据异步更新到数据库，不保证数据正确写回，会丢数据。可以采用Write Ahead Logging等机制避免丢数据。

更为细化的更新机制(一开始设计缓存结构的时候注意切分粒度，把缓存力度划分的细一点，那么缓存命中率相对会越高，也能在一定程度上避免缓存穿透的问题): 

+ 缓存失效时，用加锁或者队列的方式单线程/进程去更更新缓存并等待结果。
+ 缓存失效时，先使用旧值，同时异步（控制为同时只有一个线程/进程）更新缓存，缓存更新失败则抛出异常。
+ 缓存失效时，先使用旧值，同时异步（控制为同时只有一个线程/进程）更新缓存，缓存更新失败延续旧值的有效期。
+ 数据写入或者修改时，更新数据存储后再更新缓存。缓存失效时即认为数据不存在。
+ 数据写入或者修改时，只更新缓存，使用单独线程周期批量刷新缓存到底层存储。缓存失效时即认为数据不存在。此种方案不能保障数据的安全性，有可能会丢数据。
+ 采用单独线程/进程周期将数据从底层存储放到缓存中（MySQL可以基于binlog增量更新缓存）。缓存失效时即认为数据不存在。此种方案无法保证缓存数据和底层存储的数据强一致性。

此外，还可以在后端做流量控制、服务降级或者动态扩展，以应对缓存穿透带来的访问压力。

## 互联网软件系统架构设计框架

+ 业务架构
    * 内部模块
        - 功能
        - 接口
        - 数据模型
    * 中间件 
    + 业务流量流程图
        * 模块通信通信
    + 性能
        * 高可用/横向拓展, etc.
+ 迭代规划
    + 已实现
    + 后续开发
