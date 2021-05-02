---
title: Crypto Coding
---

# Crypto Coding

总结自: https://github.com/veorq/cryptocoding (介绍了一些 side channel attack)

+ 传统方式 比较字符串是否相等，为了快，逐位比较一有不同就返回
    * 但这样可以通过 函数执行的时间来猜测 前多少位相等
    * 防止这种攻击的方式是无论如何（字符串是否相等，多少位相等）都固定时间（每一位都比完）才返回
    * [介绍了一些如何 实现/使用 constant-time comparison 的例子](https://github.com/veorq/cryptocoding#compare-secret-strings-in-constant-time)
+ 条件执行语句判断不应和 secret 有关 (avoid branching controlled by secret data)
    * 不同 branch 执行时间不同，那么可利用执行时间来猜测 condition, 从而猜测 secret
        - 比如 RSA 快速幂取余算法, [在密码硬件中使用会被攻击](https://wiki.x10sec.org/crypto/asymmetric/rsa/rsa_side_channel/)
            ```c
            int PowerMod(int a, int b, int c)
            {
                int ans = 1;
                a = a % c;
                while(b>0) {
                    if(b % 2 == 1) // 当b为奇数时会多执行下面的指令
                        ans = (ans * a) % c;
                    b = b/2;
                    a = (a * a) % c;
                }
                return ans;
            }
            ```
            * 保护方式是一般会 [加信号干扰](https://www.zhihu.com/question/22325815) , 防止被猜测
        - 再比如 椭圆曲线  中的 [double-and-add point multiplication algorithm](https://crypto.stackexchange.com/questions/48790/wikipedias-double-and-add-point-multiplication-algorithm-for-elliptical-curves)
        ```
        N ← P
        Q ← 0
        for i from 0 to m do
           if d[i] = 1 then
               Q ← point_add(Q, N)
           N ← point_double(N)
        return Q
        ```
+ 同理 loop bounds 也不应该和 secret 有关
+ avoids table look-ups indexed by secret data
    + 没细研究.......
+ 注意编译器是否优化掉了不该优化的代码, 比如本来要清除内存中的secret，结果被编译器一优化，不清除了
    + 解决办法：对比真正生成的汇编代码
+ 记得可靠地(!)清空 secect
    + 不幸的是以下两种语言无法保证一定能清空
        * 带GC的语言
            - Go, Java, JS...
        * 使用immutable strings的语言
            - Swift, Obj-C...
+ 避免 secure 和 insecure 的 API 的混淆
    + 不同平台函数的安全性不一样
        * 不要假设平台安全
        * 如果 override 掉 不安全的 func？
            - override 失败则仍会跑不安全的 func
            - 移植到别的平台后可能会跑不安全的 func
+ Avoid mixing security and abstraction levels of cryptographic primitives in the same API layer
    + 调用 API 时有不同的 参数，混用不同 安全级别的 参数会影响安全性
    + 解决办法
        * 提供 high-level APIs
        * 尽量避免 low-level APIs
            - 比如其实用户一般都用不到 unpadded RSA, or to use a block cipher in ECB mode, or to perform a DSA signature with a user-selected nonce
        * low-level APIs 和 high-level APIs 之间要拎的清
            - safe/unsafe 的不要放在同一个 packages/headers 中
            - subtyping 的语言，safe crypto 应有单独的 type
+ 应该用 unsigned bytes 来表示 binary data (bytestrings)
    + C 中 char 类型的正负是 implementation-defined 的, 那么比如对于这段代码
        ```c
        int decrypt_data(const char *key, char *bytes, size_t len);

        void fn(...) {
            //...
            char *name;
            char buf[257];
            decrypt_data(key, buf, 257);

            int name_len = buf[0];
            name = malloc(name_len + 1);
            memcpy(name, buf+1, name_len);
            name[name_len] = 0;
            //...
        }
        ```
        + 如果 char 是 signed 型的，`buf[0]` 可能为负
            + `malloc` 和 `memcpy` 的范围可能很大
            + `name[name_len] = 0;` 语句存在 heap corruption 的危险
            + 如果 `buf[0]` 为 `255`, `name_len` 则会为 `-1`, 
                + 那么就造成了 allocate a 0-byte buffer, 然后 memcpy (size_t)-1 这么大(过大)的数据进该 buffer 中, 造成 [非法堆内存访问](https://stackoverflow.com/questions/13669329/what-is-a-memory-stomp)
+ 保证强随机性
    + 为什么
        * DSA 中就算只泄漏一比特也会导致私钥立马泄漏
    + 不要怎样
        * 不要使用可预测的熵，比如 时间戳、PIDs、温度传感器
        * 不要依赖于 general-purpose 的伪随机函数 (`stdlib`'s `rand()`, `srand()`, `random()`, or Python's `random` module)
        * 不要使用 [Mersenne Twister](http://crypto.di.uoa.gr/CRYPTO.SEC/Randomness_Attacks.html)
        * 不要使用 http://www.random.org/ 等工具
            * 因为，你怎么知道这个随机数会不会被别人知道或者与别人共用...
        * 不要自己设计 PRNG
        * 不要(跨应用)重用 randomness
        * 不要以为一个 PRNG 过了 Diehard tests or NIST's tests 就是安全的了
        * 不要假设一个 cryptographically secure 的 PRNG 一定会提供 forward or backward secrecy (aka [backtracking resistance and prediction resistance](http://csrc.nist.gov/publications/nistpubs/800-90A/SP800-90A.pdf)), 不然可能会泄漏 internal state
        * 不要直接使用 "熵" 来作为伪随机数据
            * 模拟信号源的熵往往是 biased 的
                * N bits from an entropy pool often provide less than N bits of entropy
    + 应该怎样
        * 减少用 randomness 的需求
            - 比如 Ed25519 签名就是 deterministical 的
        + 文中也给出了 Linux、OpenBSD、Windows 等平台下获取随机数
        + `/dev/urandom` vs `/dev/random`
            * `/dev/random` 更好，但 `/dev/random` 是 blocking 的，如果发现 熵池 的 熵 不足则不会返回
                - 现在好像 `/dev/random` 初始化好就不会 block 了
            * `/dev/urandom` 也不是不行，但要学 LibreSSL 中的 `getentropy_urandom` 加一下 error checks
            * 不行就 adding analog sources of noise and mixing them well
        + RDRAND/RDSEED instructions
        + Do [check the return values](http://jbp.io/2014/01/16/openssl-rand-api) of your RNG, to make sure that the random bytes are as strong as they should be, and they have been written successfully.
        + Follow the recommendations from Nadia Heninger et al. in Section 7 of their [Mining Your Ps and Qs](https://factorable.net/weakkeys12.extended.pdf) paper.
+ Always typecast shifted values
    + 比如说 SHA-1、SHA-2 家族中，哈希前先将 bytes 组成 "word-sized" 整数，再进行处理。在 `c` 中通常通过 `<<` 左位移操作符来实现。
    + 但如果 位移完之后的值是 signed 的，left-shift 完的结果如何就不好说了
        * 出于 integer promotion rule，unsigned operand like `uint8_t` may be promoted to `signed int`，并导致问题

---

另外 [<<白帽子讲 web 安全>>](https://book.douban.com/subject/10546925/) 中提到：

+ 不要使用 ECB 模式
    * (会带有明文的统计特征)
    * (尤其当 要加密的明文多于一个分组的长度时)
+ 不要使用流密码（比如 RC4）
+ 使用 HMAC-SHA1 代替 MD5（甚至是代替 SHA1）
+ 不要多次使用同一个密钥进行加解密
+ salts 和 IV 需要随机产生
    * rand() 不一定随机，或者范围太小
    * (CBC 模式的 padding oracle attack)
+ 密钥管理
    * 密码系统的安全性 应该 依赖于 密钥的复杂性而不是算法的保密性， 选择 足够安全的加密算法其实不难
    * 对于web应用来说，常见做法是将密钥/密码保存在配置文件或者数据库中，在使用时 有程序读出密钥并加载进内存，密钥所在的配置文件或数据库需要严格的控制访问权限
        - 或可将  所有密钥&配置敏感文件集中保存在一个服务器（集群）上，并通过 web service 的方式 提供 获取密钥的 api。每个web 应用在需要使用密钥时通过带认证信息的 api 请求密钥管理系统，动态获取密钥
    * 生产测试环境使用的密钥应不同
    * 定期更换密钥
+ 不要自己实现加密算法，尽量使用安全专家已经实现好的库
+ 不要依赖系统的保密性


当你不知道如何选择时，建议:

+ 使用 CBC 模式 的 AES256 用于加密
+ 使用 HMAC-SHA512 用于完整性验证
+ 使用带有 salt 的SHA-256 或 SHA-512 用于 hashing

---

MPC secure channel:

+ transport
    * encryption
        * TLS with an (AEAD) cipher
    * channel
        - a broadcast channel
            * reliable broadcasts
                * 每人接收到消息相同
                    * sharing and comparing hashes of received messages
        - point-to-point channels
    * session ID
        - 用另外的方式商定
        - 只有双方知道
    * timeouts and errors

---
__TODO:__

+ https://github.com/SalusaSecondus/CryptoGotchas

---
__TODO:__

+ [How I'm learning to build secure systems](https://github.com/veeral-patel/learn-security-engineering)
+ https://www.chosenplaintext.ca/articles/beginners-guide-constant-time-cryptography.html
+ [The state of tooling for verifying constant-timeness of cryptographic implementations](https://neuromancer.sk/article/26)
+ https://github.com/mratsim/constantine/blob/master/docs/optimizations.md
+ https://github.com/pornin/CTTK

---
__TODO:__

+ go语言安全编码规范
    * https://checkmarx.gitbooks.io/go-scp/content/
    + https://bloodzer0.github.io/ossa/application-security/sdl/go-scp/

+ [PacktPublishing/Security-with-Go 的 Cryptography 章节代码](https://github.com/PacktPublishing/Security-with-Go/tree/master/Chapter06)
    * [目录](https://www.packtpub.com/networking-and-servers/security-go)

---

## git 存储 credentials
+ https://opensource.com/article/19/2/secrets-management-tools-git
+ https://stackoverflow.com/questions/48330742/file-encryption-in-git-repository
+ https://superuser.com/questions/1162907/setting-up-an-encrypted-git-repository
+ https://github.com/sobolevn/git-secret
+ https://github.com/AGWA/git-crypt
+ https://github.com/StackExchange/blackbox
+ https://embeddedartistry.com/blog/2018/03/15/safely-storing-secrets-in-git/
+ 