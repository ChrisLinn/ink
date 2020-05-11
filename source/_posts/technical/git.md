# Git

https://github.com/tyrchen/book_next/blob/master/src/2019/w48/1-git-pub.md

https://github.com/tyrchen/book_next/blob/master/src/2019/w48/2-git-stash-pub.md

+ TODO
    + packfile 差分编码
    + ...
+ 对比 cvs/svn
    * 去中心化
    * cvs/svn 以 diff 为基础，git 认为每个对象 immutable 每次都会生成新对象 （id 为其 sha1 hash）
        - 这样的好处是，回滚和切分支 很方便
        - 有点像在 状态管理中使用 immutable 的思想，每次修改都会形成一个新的文件
+ 对象
    * 分类
        - blob （文件对象）
            + 被组织成 merkle tree
        - merkle tree
            + git 关心的是项目的 snapshot，并不关心单个文件
                * 文件的文件名并没有存在 blob 对象中，而是存储在 tree 里。
                    - 相同内容的文件，即便拷贝多份，依然只存储一份数据
                    - 更改文件名只是生成一个新的 tree，并不需要生成新的 blob
        - commit
            + 每次 commit 就是根据更改的文件的信息生成新 tree 的过程
            + 新树和老树共享相同的子树，只有变化的部分才会分叉
            + 长此以往，对象数据库(objects 文件夹)中有无数棵树，一起构成了一个 merkle DAG。
                * git 的 对象数据库 中用了两层目录结构，在有很多对象的时候不至于目录内容太多而过载
                    * nginx cache 等等很多系统也是这种设计模式
            + 通过使用引用（ref），比如 HEAD, heads/master，tags/v0.1， 可以很方便地追踪每一棵树的确切状态
                * ![git_revision](https://github.com/tyrchen/book_next/raw/master/src/2019/w48/assets/git_revision.png)
        - ...
+ git stash
    * 未完成的工作也会塞到不可修改的对象数据库中，新增 commit
        - 如果经常到处 git stash，势必要记录 parent commit，要为 stash 生成一颗树来保存目录结构，要把修改的文件存入某处
            + 而所有这一切，其实 commit 的代码已经很好地实现了，用一套代码解决两个问题，简单中透着美
        - 生成的 commit 虽然最后没有用，但中间的树和子树很大机会可以被复用
        - git stash pop 时会 GC 把孤儿子树回收

