# 杭州链家二手房爬虫

+ https://github.com/XuefengHuang/lianjia-scrawler
+ https://github.com/jumper2014/lianjia-beike-spider

## Prerequisites
+ bash
```
git clone git@github.com:ChrisLinn/lianjia-scrawler.git
cd lianjia-scrawler # If you'd like not to use [virtualenv](https://virtualenv.pypa.io/en/stable/), please skip step 3 and 4.
virtualenv lianjia
source lianjia/bin/activate
sudo apt-get install libmysqlclient-dev
pip install -r requirements.txt
```

+ MySQL
```
CREATE DATABASE `ershoufang` DEFAULT CHARACTER SET utf8;
CREATE USER 'hz-house'@'localhost' IDENTIFIED BY 'lianjia';
GRANT ALL PRIVILEGES ON ershoufang.* TO 'hz-house'@'localhost';
```

## Settings.py
```
CITY = 'hz'  # only one, shanghai=sh shenzhen=sh......
REGIONLIST = [u'xihu', u'xiacheng', u'jianggan', u'gongshu', u'shangcheng', u'binjiang']  # only pinyin support
```

## Run
```
python scrawl.py 
```

## Todo
+ 先爬。
    * 爬租房比较麻烦
        - 分为 apartment 和 zufang
            + apartment 自有ID, href 可能相同
            + zufang href 不同
+ 以后重新跑呢？16 行？first time？
    * 历史信息
+ GetHouseByRegionlist 100 pages?
+ 小区信息
+ 可视化
    * https://github.com/XuefengHuang/lianjia-scrawler/blob/master/data/lianjia.ipynb