# 爬虫抓代理

+ 有 star 很多的框架，[IPProxyTool](https://github.com/awolfly9/IPProxyTool), [proxy_pool](https://github.com/jhao104/proxy_pool), [IPProxyPool](https://github.com/qiyeboy/IPProxyPool).
+ 要是仅仅短期使用的话其实用不着这么麻烦，在访问的 `http request` 里添加 `x-forward-for` 标签， `client` 随机生成，宣称自己是一台透明代理服务器，代理其他人的访问就能绕过许多限制了，一般服务商不会限制透明代理。([source](https://www.zhihu.com/question/47464143/answer/124181011))
+ `urllib` 模块使用代理 ([source](http://gohom.win/2016/01/21/proxy-py/))
    * `urllib/urllib2` 使用代理比较麻烦, 需要先构建一个 `ProxyHandler` 的类, 随后将该类用于构建网页打开的 `opener` 的类,再在 `request` 中安装该 `opener`.
    * 代理格式是 `http://112.25.41.136:80` ,如果要账号密码是 `http://user:password@112.25.41.136:80`.
    ```
    proxy="http://112.25.41.136:80"
    # Build ProxyHandler object by given proxy
    proxy_support=urllib.request.ProxyHandler({'http':proxy})
    # Build opener with ProxyHandler object
    opener = urllib.request.build_opener(proxy_support)
    # Install opener to request
    urllib.request.install_opener(opener)
    # Open url
    r = urllib.request.urlopen('http://icanhazip.com',timeout = 1000)
    ```
+ `requests` 模块 使用代理 ([source](http://gohom.win/2016/01/21/proxy-py/))
    * requests 使用代理要比 urllib 简单多了...这里以单次代理为例. 多次的话可以用 session 一类构建
    * 如果需要使用代理，你可以通过为任意请求方法提供 proxies 参数来配置单个请求
        ```
        import requests

        proxies = {
          "http": "http://10.10.1.10:3128",
          "https": "http://10.10.1.10:1080",
        }

        r=requests.get("http://icanhazip.com", proxies=proxies)
        print r.text
        ```
    * 你也可以通过环境变量 HTTP_PROXY 和 HTTPS_PROXY 来配置代理
        ```
        export HTTP_PROXY="http://10.10.1.10:3128"
        export HTTPS_PROXY="http://10.10.1.10:1080"
        python
        >>> import requests
        >>> r=requests.get("http://icanhazip.com")
        >>> print r.text
        ```
    * 若你的代理需要使用 `HTTP Basic Auth`，可以使用 `http://user:password@host/`
+ `urlopen` 这个函数，设定了一个全局对象 `opener` ，所以如果你使用了多个线程， 每个线程使用一个代理，那么，不能使用 `urlopen` 这个函数，而应该使用 `opener.open`