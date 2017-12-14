---
layout:     post
title:      pycharm调试包含scrapy框架的项目
date:       2017-12-14
summary:    pycharm调试包含scrapy框架的项目
categories: python
tags:
 - pycharm
 - scrapy
---

### 0x00 About

```
pdb调试python文件方法:
import pdb
pdb.set_trace()

pdb调试好处很多,但是不支持多线程调试和远程调试
于是通过pycharm调试scrapy中的爬虫脚本
```

refer:

http://www.jianshu.com/p/eda047ac5c89

### 0x01 项目结构

在pycharm中新建项目时默认会为新建的项目新建一个python虚拟环境

```
/root/PycharmProjects为pycharm默认存放项目的目录
scanner为新建的项目的项目名
venv是pycharm新建的python虚拟环境目录

/root/PycharmProjects
└── scanner
    └── venv
        ├── bin
        ├── include
        ├── lib
        ├── pip-selfcheck.json
        └── selenium

项目包含两个文件夹,分别为/root/3xp10it和/root/mypypi

其中/root/3xp10it目录如下,其中/root/3xp10it/3xp10it.py为项目启动文件,项目通过python3 3xp10it.py运行

/root/3xp10it
├── 3xp10it.py
├── debug.py
├── develop.md
├── ghostdriver.log
├── ipproxypool_scrapysplash_server.py
├── pannel
│   ├── manage.py
│   ├── models.py
│   ├── pages
│   └── pannel
├── readme.md
├── targets.py
├── uninstall.py
└── web.py


/root/mypypi中的爬虫模块相关目录如下,其中/root/mypypi/crawler/crawler/spiders/exp10it_spider.py为scrapy爬虫脚本,单独启动爬虫的命令为cd /root/mypypi/crawler && python3 -m scrapy crawl exp10it

├── crawler                 
│   ├── crawler                  
│   │   ├── ghostdriver.log
│   │   ├── __init__.py   
│   │   ├── items.py    
│   │   ├── middlewares.py    
│   │   ├── pipelines.py                 
│   │   ├── settings.py    
│   │   └── spiders       
│   │       ├── exp10it_spider.py
│   │       ├── __init__.py
│   ├── ghostdriver.log        
│   ├── scrapy.cfg                     
│   └── start.py                 
├── xxx
├── dicts           

其中exp10it_spider.py内容大致如下:

class Exp10itSpider(scrapy.Spider):
    name = "exp10it"
    collected_urls = []
    domain = ""
    start_url = ""

    def add_url_templet_to_collected_urls(self, url):
        url=re.sub(r"(#[^\?]*)$","",url)
        parsed = urlparse(url)
        if len(parsed)<4:


三个文件夹的关系:
/root/3xp10it/3xp10it.py中的funcA调用了/root/mypypi/exp10it.py中的funcB
/root/mypypi/exp10it.py中的funcB调用了/root/PycharmProject/scanner/venv/lib/site-packages/scrapy模块进行爬虫
,funcB相关代码如下(funB为下面的scrapy_splash_crawl_url):

def scrapy_splash_crawl_url(url):
    # replace crawl_url method
    url=re.sub(r"\s+$","",url)
    spider_file=ModulePath+"/crawler/crawler/spiders/exp10it_spider.py"
    parsed=urlparse(url)
    if re.search(r"/\S+\.\S{1,4}$",parsed.path):
        path=re.sub(r"(?<=/)[^/\s\.]+\.\S{1,4}","",parsed.path)
    else:
        if parsed.path=="" or parsed.path[-1]!="/":
            path=parsed.path+"/"
        else:
            path=parsed.path
    modify_url=parsed.scheme+"://"+parsed.netloc+path
    cmd='''sed -i 's#target_url_to_crawl=".*"#target_url_to_crawl="%s"#g' %s''' % (modify_url,spider_file)
    os.system(cmd)
    from scrapy import cmdline
    cmdline.execute('scrapy crawl exp10it'.split())

上面funB中调用scrapy关键代码为:
    cmdline.execute('scrapy crawl exp10it'.split())

```

### 0x02 解决办法

设置/root/3xp10it/3xp10it.py(项目运行文件)的工作目录为与爬虫目录中的scrapy.cfg文件同目录的/root/mypypi/crawler,如下图

<img src="https://raw.githubusercontent.com/3xp10it/pic/master/pycharm_scrapy.png">
