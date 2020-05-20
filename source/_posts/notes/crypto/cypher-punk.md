# 也体验一把密码朋克

<!-- TODO
+ https://www.google.com/search?q=pgp%E6%8C%87%E7%BA%B9&oq=pgp%E6%8C%87%E7%BA%B9&aqs=chrome..69i57.746j0j7&sourceid=chrome&ie=UTF-8
+ https://jin-yang.github.io/post/security-pgp-introduce.html
+ https://tomli.blog/pgp
+ http://www.ruanyifeng.com/blog/2013/07/gpg.html
+ https://www.jianshu.com/p/0e1e66423055
+ https://zh.moegirl.org/zh-hant/Help:PGP%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95
+ https://nova.moe/openpgp-best-practices-keyserver-and-configuration/
+ https://wiki.debian.org/Keysigning#Step_5:_Hand_out_your_key.27s_fingerprint
+ https://www.debian.org/events/keysigning
+ http://www.queen.clara.net/pgp/art4.html
+ RSA? egima?
 -->

区块链将 密码朋克 这个词带进了普通网民的视线，这篇文章带你也体验一把 密码朋克 (cyber punk) 过过瘾，随便复习一下密码学知识。

最近 Victor Gevers 关于中国政府明文记录民众消息记录在分布式数据库中的新闻在安全圈内炒得火热，使用微信的时候，我们可能会有被监听的顾虑。这时候，PGP 就可以派上用场。


## PGP 是什么
PGP (Pretty Good Privacy, "优良保密协议") 本身是用于签名和加解密商业应用程序；OpenPGP 是由 PGP 衍生出的开源规范（RFC 4880），而 GnuPG（简称 GPG）就是遵循 OpenPGP 规范的 GNU 实现。

## 原理流程

PGP 实现加解密的原理流程图：

![PGP](/img/pgp/PGP_diagram.png)


## 体验

### 加密

简单的 PGP 体验可以使用 Chrome 插件 PGP ANYWHERE，现在有的邮箱 (Secure Email, https://securegroup.com/secure-email/) 和邮箱插件 (如支持 Gmail 的 FlowCrypt) 也继承了 PGP 功能，邮件加解密、签名更加方便。

进入 PGP Anywhere 插件，在 Options 标签页中 Generate Keys 可以生成一对公私钥，将这把公钥发给别人别人就可以进行加密（从别人那里获取一把公钥就可以加密消息并发给别人）。类似的，也可以使用 https://webencrypt.org/openpgpjs/ 或者 https://sela.io/pgp/ 这样的在线工具生成密钥对和加解密。

在 PGP Anywhere 插件的 Editor 标签页中 选择一把 pubkey（从别人那里获得并 import），填写好你的文本，然后 进行 Decrypt，发送给对方。对方收到后，用他自己的 private key 解密，就可以还原出原本的文本。

整个过程中，别人 不知道你们的 private key，只知道 pubkey （假如在传输过程中泄露）和 加密后的文本，所以无法知道消息的内容是什么。


### 签名

上述的场景其实还存在另外一个问题。用户能加密一个文本，但是这个 pubkey 第三方也是获取的，如果微信用这个 pubkey 加密了一个文本，在我和你的聊天窗中给你发了一个消息，你可以解密出原文，但是我并不能证明我没有说过这句话，那真是百口莫辩。

你们可能也注意到了，在 PGP Anywhere 的 Editor 标签页中，选择 private key 后不仅可以 Decrypt，还有一个 Sign 的功能。这个就是为了解决上述的问题。

我的 private key 是不透露给别人的，我在签名之后，发给你原文和原文对应的签名，你使用我的 pubkey 进行验证。微信如果冒用我的名义给你发送一条消息，因为微信无法提供一条正确使用过我的  private key 进行签名的信息，你用的我的 pubkey 无法验证成功，那么就知道这不是真的我发出来的信息。

当然了，实际使用中，往往会将签名和加密结合使用。我将原文用我的私钥签名，使用你的公钥签名，再发送给你，你收到后使用自己的私钥解密，再用我的公钥验证签名。这样就可以达到加密传输并且确认消息确实是我发出来的效果。

读书的时候，带我的 PhD 喜欢每封邮件都带上签名，我一直觉得这是一件很酷炫的事情。读完这篇文章以后，相信你也会懂得 如何给邮件加上签名，可以说是很朋克了。


## 使用 GPG

上面的例子中，双方需要知道对方的 pubkey，换台设备又要重新问一遍或者导出导入很麻烦。如果忘了又要重新生成密钥并告知对方，更麻烦。

现实生活中，其实有 pgp key server 相应解决这个问题。比如中科大的 https://pgp.ustc.edu.cn/ ，mit 的 https://pgp.mit.edu/ 。别的知名的还有 [keys.gnupg.net](keys.gnupg.net) , [keyserver.ubuntu.com](keyserver.ubuntu.com) 等。用户的 pubkey 可以登记在 key server 上被查询和下载。

我们来通过 GPG 来举例子。

__TODO__


<!-- 
+ asc
+ email
+ revoke
+ key server
 -->

### 信任传递

__TODO__


### 扩展阅读

#### 为什么还每次会话生成一个（对称）密钥
可以看到，OpenPGP 发送方产生一串随机数，作为对称加密密钥，这一随机数 __只对__ 该信息或该会话有效。使用接受者的公钥加密上述的随机数 (密钥)，放置到需要发送消息的开头。然后通过上述产生的随机数加密需要加密的信息（通常会先对信息进行压缩）。[这是为什么呢，为什么不直接用 已经交换好的对称公私钥呢，会有什么坏处？](https://security.stackexchange.com/questions/64399/pgp-encryption-whats-the-need-to-encrypt-using-random-one-time-key)

+ Asymmetric encryption algorithms like RSA or ElGamal are very limited in the size of messages that they can process.
    * There is no currently known, clear, fully specified and heavily reviewed method by which a longer message could be somehow "split" into individual elements, each small enough to be RSA-encrypted, then reassembled.
        - it is not that easy to do securely, and nobody quite knows how to do a secure mode of operation for RSA.
+ Even if we knew how to securely perform an only-RSA asymmetric encryption for bulk data, overhead can be considerable (multiplicative factor....)
+ Asymmetric encryption algorithms poorer performance
+ efficient multi-recipient data
    * You symmetrically encrypt the data with a key K, then you encrypt K with the RSA key of each recipient. When you send a 3 MB file to 10 people, you would prefer to compute and send an encrypted email of size 3.01 MB, rather than ten 3 MB emails...


#### 注意

##### 不要依靠 Key ID
Key ID （无论长短）已经 被证明 可以 被碰撞。为了安全应该使用全指纹而非 Key ID。应该在 GPG 配置文件中写上 `keyid-format 0xlong` 和 `with-fingerprint` 来保证所有密钥都是显示 64 位长的 ID 且显示指纹。


##### 不要盲目地相信来自密钥服务器的密钥

所有人都可以把自己的密钥上传到密钥服务器上，所以把你不应该仅仅是下载下密钥就盲目地认为就是你需要的那个。

通过线下或者电话的方式向对方确认其密钥的指纹信息后，你可以通过如下指令下载对方的公钥：

```
gpg --recv-key '<fingerprint>'
```

但服务器 还是可能给你一个其他密钥，所以你还是需要确认你下载你的密钥就是你需要的那个，应该在 __导入前验证密钥指纹__ 。（如果你的 GnuPG 版本小于 2.1，那你就需要手动确认你下载到的 Key，如果你的 GnuPG 版本大于 2.1 的话它会自动拒绝来自密钥服务器的不正确的密钥。）

你可以用两种方式来确认密钥指纹：

1. 直接检查密钥指纹
```
gpg --fingerprint '<fingerprint>'
```
2. 尝试在本地用那个指纹给一个密钥签名，`lsign-key` 的 `l` 表示 `local`
```
gpg --lsign-key '<fingerprint>'
```

如果你确定你拿到了那个人的正确的密钥，比较建议的是在本地给那个密钥签名，如果你希望公开的表明你和那个人的联系的话，你可以通过 `--sign-key` 公开给那个密钥签名，并发送出去（比如）。


对于一般的情况（比如在一个网站上面下载了一个密钥），你可以这样在导入前验证密钥指纹：

```
gpg --with-fingerprint <keyfile>
```
