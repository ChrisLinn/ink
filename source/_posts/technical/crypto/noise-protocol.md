# Noise Protocol

## Noise Protocol Framework
+ https://github.com/tyrchen/book_next/blob/master/src/2019/w46/1-noise-protocol-pub.md
+ 是一个框架
    * 想开发一些直接基于 TCP 或者 UDP 的私有协议时
    * TLS 颇为笨重
    * 自己开发的安全协议不一定靠谱
    * 没有规定使用什么样的通讯协议
        - TCP/UDP 甚至是任何满足 read/write 接口的子系统，比如文件，管道（pipe）都可以
+ 对比 TLS 1.3
    * same
        - 协议栈清爽 (放弃老旧算法)
        - 握手只需要 1-RTT（甚至 0-RTT）
    * diff
        - TLS 需要 PKI, 协议栈复杂，很难应用到非中心化的 p2p 网络中
+ 安全信道建立的基石是 DH 算法
    * ECDH
* Noise 把协议变量设计为静态而非协商出来的
    - 而从用户的角度，用户写出来的使用 Noise 的应用往往是自己的节点跟自己的节点通讯，因而无需协商
    - `Noise_<握手的模式>_<公钥算法>_<对称加密算法>_<哈希算法>`
        * https://noiseexplorer.com/patterns/
* 协议的状态机
    - chaining key
    - HandshakeState
    - CipherState
- 用户接口 (简洁、易用、不易出错)
    + build
        * 根据协议变量和固定私钥，初始化 HandshakeState
    + write(msg, buf)
    + read(buf, msg)
    + into_transport_mode
        * 将 HandshakeState 转为 CipherState
    + rekey
- 应用
    + WireGuard
    + 闪电网络
    + rust-libp2p
        * polkadot
        * substrate
        * libra
- lib
    + rust 下的 snow crate
        * 很容易和其它模块如底层的 tokio/async-std，以及上层的 yamux 结合使用

## Wireguard

> 如果懂得合理取舍，简化各种繁文缛节，复杂如 VPN 协议，也可以如此清丽脱俗；简单的，考虑周到的用户接口（配置）意味着易用的产品和大智若愚的设计；由此带来的简洁会让很多接下来随之发生的很多事情变得简单：因为接口简单清晰，所以几乎一切数据结构都可以预先生成，因为协议本身简单（1-RTT），所以任意一段发起重新协商也很简单；握手过程丢包？丢就丢吧，反正握手很快很方便；最终，因为简单，所以代码量少，没有那些个弯弯绕绕，一个对 C 和 linux 开发比较熟悉的工程师，随便花上一个下午就能把主流程看个明白 —— 这也就意味着代码更容易审核，写测试代码花费的时间更少还更容易做到更高的测试覆盖率，更难出错，bug 更少，解 bug 的时间更少


+ https://github.com/tyrchen/book_next/blob/master/src/2019/w45/1-wireguard-pub.md
* IPSec VPN
    - 网络层
+ SSL/TLS/OpenVPN
    * 会话层
+ 精巧
    * 代码&配置简洁方便、易于理解
    * 没有没完没了的证书的配置/设置 CA
        - IPSec VPN & OpenVPN 则比较麻烦
+ WGI, WireGuard Interface
    + 有一个自己的私钥（curve25519）
    + 有一个用于监听数据的 UDP 端口
    + 有一堆 peer
        * 发起者（initiator）/ 接收者（responder）是对等的
        * 没有一般 VPN 的客户端/服务器端或者 spoke/hub 的区别
        * 配置也是对等的
    + 数据结构
        * wgi 下面有  peer 的哈希 & 密钥索引（key_index）的哈希表
            - 通过接收到的数据报文中的 key_index，可以定位到 peer
                + 每个 peer 下面存储
                    * endpoint 的状态
                    * 协议握手的状态
                    * keypairs (接收和发送双方)
                        - 当前正在使用的密钥
                        - 上一次 rekey 前使用过的密钥
                        - rekey 后下一次即将要用的密钥
            + ![wg_routing](https://github.com/tyrchen/book_next/raw/master/src/2019/w45/assets/wg_routing.jpg)
        * `wg-quick up wg0`
            - wgi 会被初始化，创建相关的 peers
        * `wg-quick down wg0`
            - wgi 会被停止，删除相关的 peers
    + 网络的两端都配置了对方的公钥，因而它可以仅仅使用 1-RTT（一组来回的报文），2 个报文，就完成隧道的 **建立**。
        * IPSec 使用的 IKE 协议，main mode 下 3-RTT，aggressive mode 下 2-RTT
        * **服务器不必为了客户端的握手请求而特定做些什么(不需要状态表存储之前协议进行到哪里)，也不用考虑丢包（丢包就重新握手好了，反正就 1-RTT），不用起定时器管理连接表中的半开连接（因为压根没有）等等。**
            - 一般有连接的协议需要有个状态表存储之前协议进行到哪里了。这个状态表是动态生成的，很容易成为 DoS 的标的。
                +  TCP 从诞生之初就饱受 SYN-flood 之苦
        * 另亦有隐蔽性
            - 收到不合法的握手直接丢弃
            - 无法探测到接收端的存在
- WG 使用了 Noise_IKpsk2_25519_ChaChaPoly_BLAKE2s
    + 选取 curve 25519 做 ECDH，ChaChaPoly 做对称加密，Blake2s 做哈希
    + 在 IKE/SSL/TLS 协议中，这些算法都是两端协商出来的，WG 觉得没必要，直接将其固定在协议中
+ __TODO:__ 建立 对称密钥&验证的流程 (包括 HKDF timestamp MAC 等等)
