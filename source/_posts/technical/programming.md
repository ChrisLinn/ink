# 如何学习编程

## 一些资源
+ [hack-an-engineer](https://github.com/nemild/hack-an-engineer)
+ [open-funding](https://github.com/ralphtheninja/open-funding)

## 学习路线的重要性

没打好基础，学习时容易云里雾里、一知半解，功倍事半。

就好像如果理解了调用约定和参数传递的实现，那么有些代码的简化、栈空间的变化等就好理解很多。

如果学习中遇到不懂的概念就去查阅也是极好的，这样知道这个知识为何有用，反复遇到的知识也说明这个知识相对比较有用。

每个知识都查阅容易疲于奔命，理解消化查阅到的知识也可能 distract 或至少影响先尽快建立大体知识体系的进度，但惰于查阅则万万不可。

但如果一上来就是在啃枯燥高深的理论，不知道这知识有何应用有何价值，又容易丧失学习的兴趣以及动力。

于是乎学习的线路就很重要，应寻求前辈的建议，少走些弯路。

## 多阅读

[多阅读别人的代码。](https://github.com/tuvtran/project-based-learning)

编程其实也 __和写作相似__ 。写作需要多学习别人的文章，编程也要多阅读优秀的代码－－他们的架构、他们的规范、他们的技巧。

也可以上 Twitch 平台观看大牛直播编程。


## 复习 Revising

+ Can you solve it by yourself, after reading the solution?
+ Can you solve it in another (more efficiently) way?
+ Can you use this strategy to solve another problem?


### 不要对记忆抱有偏见

学习编程其实和学习基础数学很像，如果不想成为脚本小子 script kids，不想完全离不开 google 和 stackoverflow，（别误会！ google 和 stackoverflow 很重要，但你不应该过分依赖于它们而荒废了自己的思考）那么就是知识点的记忆以及分析解决问题的能力。

之所以说到基础数学，是因为有些数学，尤其是那些高深猜想的论证，确实不是那么直接，而比较高深，甚至拐弯抹角依赖一些精辟的技巧（奇技淫巧）。

那么让我们回忆一下，我们如何学习数学。我们学习他人的解法，观察相似之处（条件或者目标），并尝试类比，模仿添加辅助元素的办法，在自己的解题过程中加以应用。

所以不要害怕一开始接触编程想不出来，不要害怕去阅读理解甚至记忆别人的代码，不要什么东西都想着要自己想出来，对于一门新的东西，尤其是像函数式语言这种思维方式和传统编程语言不一样的语言，更应该努力学习甚至记忆别人怎么实现，这样才能比较好地在自己解题过程中进行类比。

再一次，不要误会，__我不是在鼓吹机械地记忆：我们应该理解别人的思路，并适当的记忆。__ 这里的记忆指的是消化、理解总结变成自己的东西，为什么这么编，需要用到什么，思路是怎么样的，遇到同样或者相似的题目自己可以编的出来。毕竟所谓学习，不应该在脑袋里面什么知识点都不留。

事实上，一些比较有用的函数，还是应该有个印象。又比如模板的使用、异步同步的处理方式、回调的使用、闭包的使用、经典架构……学习编程，完全脱离记忆其实并不靠谱。

## 应用很重要

接下来最重要的就是去应用，这样才能确保巩固自己的能力。用自己学到的东西，当然其中你往往会遇到别的更多的问题，在解决他们的过程中要能进一步提高自己。

初学者经常会被一句话毒害：

>“不要重复造轮子。”

但是事实上，这句话的原话是：

>“不要重复发明轮子。”

对于现成的工具，为了效率，不应该浪费时间重新从无构建。而应该合理利用，尤其是利用那些优秀的工具。

但是在提升自己的能力的过程中， __重复造轮子__ 还是很重要的。

不然要一个初学者突然想出一个又好玩又新颖的点子实在不太简单。何况既然是轮子是新的，初学者怎么知道能不能实现、自己水平是否足够？初学者可能会信心不足。

在这过程中，自己解决问题的能力得以锻炼，并且重复造轮子的过程中很重要的一点就是对比和学习别人的代码：别人的思路、别的架构、别人的风格。

除了重复造轮子，自己 __实现自己的 idea__ 也有利于锻炼、检视自己的能力，而又是一个很有趣很有成就感的事情。

甚至可以在前面提到的 Twitch 上直播自己编程的过程，参见 [我在 Twitch 平台直播编程的经验](https://mp.weixin.qq.com/s/ZrVHgAxgKJaP4IwDG2gZ9A)，这样的输出方式，促使自己认真准备，回答别人的问题也是一个查漏补缺自我交流提升的过程。

## Code review checklist
+ https://github.com/joho/awesome-code-review
+ [代码的注释适量，不多不少](https://zhuanlan.zhihu.com/p/20789488)
    * 要为函数名或者变量名额外注释说明?
        - 名字起得不好
    * 注释明显是在罗列你在一个函数里干的几件事情?
        * 可能把太多功能塞在了一个函数里
    * 写下了大段的注释才能解释一段代码如何运作的
        * 这段代码基本上写得有问题，需要重构
    * 对于弱类型语言，注释还起到 type hint 的作用，而强类型语言用注释来说明类型则是画蛇添足
+ 代码安全
    * 尽可能控制副作用 (改变值)
        - 与 memoize 无益，对 concurrency 有害， test 费劲，破坏程序的美感
        - 只有在和 IO 打交道时，才应该允许副作用
            + 屏幕显示
            + 读取文件
            + 使用网络
            + 数据库
            + ...
    * error 的判断&处理是否正确
        - if nil?
        - return nil?
        - ...
    + 原子性
        * db 事务
        - 锁
            + 是否需要加锁
            + 是否可能死锁
        - 并发 map read/write
    * 全局变量
    * 宏定义 magic 
    * 资源的关闭
    * 资源的上限
        - 产消模型，消费者挂掉了，队列一直堆积
        - 线程、连接、channel...
    * corner case
+ 代码风格
    * [lint](https://mp.weixin.qq.com/s?__biz=MzA3NDM0ODQwMw==&mid=402269704&idx=1&sn=40667c18a3b8d10f7b5df6188587fba5), 逼迫对要写的代码做更多的思考，把更多的代码逻辑转化成数据。代码到数据的转化是抽象思维的很重要一步. 将代码和代码进一步解耦，用数据（一些 rule）串联起来。
        - [airbnb 的 javascript style](http://mmbiz.qpic.cn/mmbiz/SER9L29WQ0icEibnsKnTs5TUvzzcN5ySJaY9VibayPyBSy98qoM5Num5Ca49biamEpMiaw6H8qLibwgOMXMcTX2LhRxQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
            + and...
                * 一个函数最多有 50 行代码。超过 50 行要么拆分之，要么精简之。
                    - 50 lines? 80 char?
                        * 注意是不是 参数名太长、或者参数个数太多
                        + too dogmatic. readability matters.
                            * https://github.com/golang/go/wiki/CodeReviewComments#line-length
                        + 算是一个参造，可以用来反思是不是改进
                * 一个函数的嵌套不能超过 5 层。
                    - 多个 for 循环，深层的 if-else，都是罪恶之源。
                    - 如果超过这个限制，只能拆分，或者使用函数式编程：map/filter/reduce。
                * 一个函数的复杂性不超过 10。
                    - 所有分支，循环，回调等等统统加在一起，在一个函数里不超过 10 个（注意不是嵌套）。
                * 代码中不能有任何形式的 console.xxx 出现。为此，我不惜定义 print 函数为 cli 使用。这是逼着程序员好好考虑如何 log，用什么样的 **log level** 合适。
                * 一个函数最多有 3 层 callback。这是逼着程序员不要误用 callback，尽量多用 Promise。
    * 清晰简洁，没有反人类的逻辑或者刻意为之的 trick
        - 既要清晰(好懂)，也要简洁(简化) 
    * 缺乏设计，流水帐过程式，不可扩展
    * helper util 过于宽泛，什么都往里面塞
    * (业务)逻辑代码与数据库代码是否分离
    * 消灭 goto (易给后续留坑)
+ 代码效率
    * 循环中的冗余。循环中的操作是否在前几次循环中已经执行过了？
+ 代码精简
    * 代码的中间变更是否清理了？(变来变去过程中，中途曾经有用但最后其实没用了)
    * 不用的函数是否清理了
+ 当涉及设计 API
    * https://cloud.google.com/apis/design/
        * and ...
            - https://microservices.io/patterns/apigateway.html
    * 什么是合理的接口
        - 合理的名称
        - 合理的输入输出
            + 不要期待过于复杂的输入（比如函数的参数不宜超过五个）
            + 如无必要，不要依赖输入以外的数据
            + 输入参数不要传入无关紧要的数据
        - 符合惯例（convention）
        - 很难误用或滥用
            + 对输入做 validation
                * Make interfaces easy to use correctly, and hard to use incorrectly
    * 是否参考了标准
        - 场景考虑是否全面
        - 是否便于别人理解、上手
    * https://github.com/shieldfy/API-Security-Checklist
    * [API 杂谈](https://mp.weixin.qq.com/s?__biz=MzA4ODgwNjk1MQ==&mid=2653788337&idx=1&sn=96f41ec3de2a622e7bb1746f744a1305&chksm=8bfdbbf9bc8a32ef4b86b23fe8ca77a3ed8dbbd73501a2f2dd4783347bd664a084778cb0378e)
        - 有时候我们为了支持某一个功能，似乎不得不增加一个很违反设计的接口；而有时候我们为了保证 API 绝对规范，似乎又不得不放弃对某一些功能的直接支持，因此功能只能通过迭代调用或 client 端预处理来实现。
            + 这种设计上的取舍，通常只有列出所有可行的方案，从简单的设计到繁杂的设计，然后通过分析各种使用实例的频率和使用某种设计时的复杂度，从实际的系统需求入手，尽可能让常用的功能得到最简单直接的支持，而一定程度上 “牺牲” 一些极少用到的功能。反复推敲系统场景，尽可能取得一个合理的折衷。
        - 基本原则
            + 保证 API 100% RESTful
                * everything is a “resource”
                * https://github.com/aisuhua/restful-api-design-references
            + 在 request 和 response 中，都应该尽可能的保持参数的结构化。
                * 如果是一个 hash，就传一个 hash（不要传 hash.to_string）。
                    - 在 serialization / deserialization 中完成不同语言间类型的转换。
            + Authentication 和 Security 的考虑，应该始终放在首位。
                * Authentication 可能是使用证书和白名单，也可能是通过用户登陆的 credentials 生成的验证 token，或者 session / cookie 等方式来处理。
                    * 对特定的用户永远只 expose 相关的接口和权限
                * 所有的 API 层的 logging，应该保证不要 log 任何 sensitive 的信息
            + API 本身应该是 client 无关的
                * 避免对 client 是 mobile 还是 web 等的考虑client 无关的计算和处理，又应该尽可能的在 server 端统一处理。以提高性能和一致性。
            + 尽可能让 API 是 Idempotent（幂等）的。
+ https://github.com/google/eng-practices
+ golang
    * https://draveness.me/golang-101
    * https://github.com/google/styleguide
    * https://github.com/uber-go/guide
    * https://github.com/dominikh/go-tools
    * https://github.com/go-critic/go-critic
    * https://dave.cheney.net/practical-go/presentations/qcon-china.html#_dont_name_your_variables_for_their_types
    * https://github.com/golang/go/wiki/CodeReviewComments
    * https://github.com/unknwon/go-code-convention
    * https://github.com/cristaloleg/go-advices
    * https://github.com/davecheney/the-zen-of-go
+ python
    * https://www.tangkin.com/index.php/archives/pylint.html
    * https://wiki.geany.org/howtos/check_python_code
    * https://stackoverflow.com/questions/4284313/how-can-i-check-the-syntax-of-python-script-without-executing-it
    * https://mypy.readthedocs.io/en/latest/existing_code.html
    * https://www.bookstack.cn/read/awesome-python-cn/%E4%BB%A3%E7%A0%81%E5%88%86%E6%9E%90%E5%92%8C%20Lint%20%E5%B7%A5%E5%85%B7
    * https://www.jianshu.com/p/7aa056c1d57f
    * https://www.jianshu.com/p/e485c82dcff9
    * https://juejin.im/post/5a3f8d8d51882512d822ef10
    * https://www.ibm.com/developerworks/cn/linux/l-cn-pylint/index.html
    * https://blog.csdn.net/yidangui/article/details/8544009
    * https://zhuanlan.zhihu.com/p/40669834
    * http://pychecker.sourceforge.net/
+ commit message
    * https://github.com/conventional-changelog/commitlint
    * https://gist.github.com/robertpainsi/b632364184e70900af4ab688decf6f53
    * http://karma-runner.github.io/4.0/dev/git-commit-msg.html
    * description
        - https://chris.beams.io/posts/git-commit/
+ replies
    * https://github.com/bitcoin/bitcoin/issues/6100
    * https://www.freecodecamp.org/news/what-do-cryptic-github-comments-mean-9c1912bcc0a4/

## project lead
+ git flow
    * https://github.com/dedis/Coding
+ https://littleblah.com/post/2019-09-01-senior-engineer-checklist/
+ 写不写代码，做不做 code review 不是关键
    * 有可信赖的资深工程师code review 的话
* 必须对系统设计了如指掌
    * 知道一个新功能, 需要现有框架如何改动，整体实现大概需要多少时间
    * 以作出正确的决定
+ 利用人力资源高质量完成项目
    * 定义项目，决定要怎么样做什么（包括架构、选型）
        - 选型, 评估一个框架
            + 对访问权限的统一控制
            + 自动测试的支持
            + 对 request 和 response 的 formatting，以及 serialization 和 deseialization 的支持
            + 对 logging 和 logging filtering 的支持
            + 对自动文档生成的支持
            + 实际实现的架构以及性能的考虑
        - 选型, 更清晰地考虑系统的设计，从而做出更好的选择( [拥抱约束](https://mp.weixin.qq.com/s?__biz=MzA3NDM0ODQwMw==&mid=208859872&idx=1&sn=0b3efde37aefc57d9603bd214b9a76f0) ). **trade-off**
            + CAP 只能三选二
            + 被牺牲掉的，就是它们的约束条件
                * 真正明白一个产品的内在约束条件，才能使你更好地考虑产品设计和工具的选择。
                * 否则在设计里打个补丁，继续前行，这样的补丁会越来越多. 越来越复杂的结构只是为了应对越来越多的 "exception"，最终变成一个臃肿的夹杂着各种 corner case 的怪胎，从而不得不推倒重来。
            + hash-key 的限制条件严苛，使用不方便, dynamodb 让人各种施展不开?
                * 在什么场景下使用，是否真的必要，可否用其他技术?
                * 真的避无可避，而且是非常重要的功能，则考虑换用其他
    * 调动工程师潜力
        - 擅长什么
        - 积极性
    * 帮组员清路障
        - 提前清楚项目可能遇到的障碍
        - 外组间需要进行的沟通和协作
        - 技术难点需要寻求解决方案
        - 挡一些产品上的不合理要求
+ plan
    * 确定需求（功能）
    * 选型
    * 文档
        - api
        - db
    * 链路
    - task、人员、进度

## architect
+ 经验，正确的方法和项目数量
    * https://github.com/captn3m0/google-sre-ebook
    * 一个框架师需要大量的项目经验，超级长的编码时间。坚持正确的方法和一个融洽配合的团队。国外的架构师都是大胡子，而国内程序员到30岁，老婆就催着要去做管理岗位了。和研发工作拼智商不同，架构师就拼的是经验，没大胡子没五六十岁很难成为xx之父这个级别。
+ **service interfaces**
    * All teams must expose their **data and functionality** through service interfaces
    * [no interprocess communication](https://mp.weixin.qq.com/s?__biz=MzA3NDM0ODQwMw==&mid=208859872&idx=1&sn=0b3efde37aefc57d9603bd214b9a76f0)
        - no direct linking
        - no direct reads of another team’s data store
        - no shared-memory model
        - no back-doors
    * Teams must communicate with each other through these interfaces
        - The **only** communication allowed is via service interface calls over the network.
+ 强壮且易扩展
    * 测试驱动
    * **重构**
        - 分层
        - 正确的依赖关系
        - 精简美丽的命名
        - [<<重构>>](https://book.douban.com/subject/1229923/)
            + 先写(自动化)测试
            + 太长，功能杂糅
                * software entities should be open for extension, but closed for modification 代码对扩展开放，对修改封闭, [Open-close Principle](https://mp.weixin.qq.com/s/hwyfe31dG9SXt65YX4kJkg)
                    * 拆解，功能专一
                    - 易于适应业务逻辑变化(接口保持不变)
                + 复用代码
                + 看是否属于正确的类
                    * 如果同时属于多个类？
                        - 看业务更贴近哪个，将来与哪个业务的逻辑升级更相关
        * [**什么时候？不舒服的时候**](https://mp.weixin.qq.com/s?__biz=MzA3NDM0ODQwMw==&mid=402269704&idx=1&sn=40667c18a3b8d10f7b5df6188587fba5)
            - 当你写一段代码时，不得不从别处拷贝粘贴代码
                + DRY, Don't repeat yourself
            - 当你修改已有代码添加新功能时，发现已有代码总感觉哪里不对
                + 逻辑写得太绕，太复杂，太难以理解
                + 循环太多
                + 分支太多
                + 状态太多
            - 当你调用已有的代码时（函数，类），不得不阅读被调用的代码才能确定怎么调用时. (代码用户体验的重构: 代码是一个程序员为另一个程序员精心打造的产品！函数（或者类）的 signature，以及对 signature 的说明是这个产品的 UI。)
                + 接口定义的不好，比如说，一个函数有十多个参数
                + 文档写的不好，比如说，关键性的函数没有对接口提供足够的说明
            - 当你写一段代码时，连带着要改很多代码
                + 意味着不仅代码本身有问题，相关代码的设计甚至架构也有很大的问题
    * 持续集成
    * h/v scalability, load balancing, redirecting, logging, metrics....
- 技术债
    + the good, 适当引入技术债
        * 销售要某个产品和别人对标打单，市场要编制一个美丽的五彩缤纷的故事来应付发布，客户要求在限期之内完成某个他们自己也不知道什么时候才使用的功能
            - 完不成，产品卖不出去，市场推广不开，客户和你一拍两散
            - 这种时刻引入技术债是不得已的聪明的做法。
        * MVP, minimal viable product
            * examples
                - M$
                    + basic
                    + DOS
                - mongodb vs rethinkdb
                    + mongodb
                        * call me maybe mongodb
                            - 一个数据库竟然靠 mmap 来提高效率，通过 fsync 来保证持久化（如果你不打开 oplog 的话，就只能听天由命了），然后还好意思发布 1.0 一路到 2.x
                            - mongodb 在购买了 wiredtiger 引擎后，基本解决了最让人诟病的技术债，在软件服务的路上走得还算顺畅。
                    +  rethinkdb 错失了 NoSQL 的红利期，赚不到也筹不到足够的钱维持其运营，不得不解散团队
    + the bad
        * 针对其做了无数优化, 仍然挂/不稳定
        * 债务的叠加
        * backward compatibility
            - 接口设计上的缺陷被使用者当成了功能去使用，使用的范围之广以至于开发者在新版本中无法还债，只能被动地一路保有这样的债务
            - **对外的接口（API，SDK等）一定要小心设计**
    + the TAO
        * 拥抱 MVP。先解决温饱问题，再考虑还债。
        * 把技术债外包出去 **给更合适的团队**
        * 雇佣你所能获得的最优秀的人
        * 拥抱匡威定律。组织架构决定了你的代码结构。
            - 快速交付 -> 拥有直接决策权的端到端的功能团队, 而不是开发，测试，运维等彼此独立
            - micro service -> 组织结构上就要打造彼此平行的 service team
        * 在实现上可以多些负债，在接口上尽量减少负债
        * 意识到软件本来就要不断修改、新增、删除
        * 健全的监控和测试