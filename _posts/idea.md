---
layout:     post
title:      idea
date:       2016-04-21
summary:    idea about pentest
categories: idea
tags:
 - web
 - idea
 - thoughts
---

#### 渗透导图:

```
line1> 不断探索目标全面情报------> 找出漏洞
    a.joomla所有旁站过一篇
    b.扫目录+扫管理目录下的页面(eg.https://xxx.../manage)
    c.找sqli和上传
    d.找其他漏洞(命令执行,xss,代码执行等)
    e.黑盒fuzz
        1>密码爆破
            1>管理登录页面爆破
            2>webshell爆破
        2>awvs中页面input参数fuzz(fuzzdb)|burpsuite->intruder->fuzz
    f.找同一web程序的其他站点,拿下后找公共代码中漏洞
    g.社工
        1>发信
            1)说挂广告
                https://forum.90sec.org/forum.php?mod=viewthread&tid=10262#lastpost
            2)发马
        2>域名劫持
            1)域名劫持渗透实例
                https://www.secpulse.com/archives/50971.html
            2)搭建高仿真钓鱼站
                https://forum.90sec.org/forum.php?mod=viewthread&tid=10251
            
line2> 不断提升自己核心单点打击力------> 如针对一个应用挖洞,让它成为自己的武器
    a.强挖web应用如cms(wordpress)0day等
    b.强挖web应用之外的(如hackteam中嵌入式设备)0day
    c.强挖php等更底层(如通用php反序列化)的0day
line3> 渗透是一个"fuzz爆破"过程,找到漏洞才是成功,成功找到漏洞的关键在于"fuzz"的字典足够大
    a>脑中有足够多的渗透思路,eg.扩充line1中的5个思路,思路越多越好,需要自己灵感的善于思考和多看别人的渗透实例
    b>脑中有足够多的漏洞库,eg.joomla,wordpress等的各个漏洞学习及exp,需要积累最新爆发出的关键漏洞
    c>要想"fuzz"的字典足够大,要学习掌握大量的知识,文献
        1>google:渗透思路
```


#### 高阶成事导图:

```
                    放弃 (eg.比较好玩的方向,诱惑)
                     |
                     |
                     |
                  决定方向(挖洞牛中的渗透牛and核心竞争力是在渗透中挖洞)
                     |
                     |
                     |
                  进步飞快
                     |
                     |
                     |
    "他到底承受了多少,才能到这个水平"<博人传>
        "吃得苦中苦,方为人上人"<欢乐颂>
                     |
                     |
                     |
                  进步飞快
                     |
                     |
                     |
                   peak
```

#### 瓶颈|目标:

```
        代码能力(可写自动化渗透工具)
           |
           |
           |
        逆向能力(0day2,漏洞战争技能汲取)
           |
           |
           |
        cve获取(x)
           |
           |
           |
         漏赏(eg.hackerone)榜首(x)
           |
           |
           |
      赏金猎人日记
```

when feel puzzled,read these to find what you are and where you want to go:

```
 1.https://drops.wooyun.org/pentesting/15117
 2.https://www.zhihu.com/question/31905047
 3.https://pan.baidu.com/s/1kUUmxWN
 4.http://www.freebuf.com/news/special/105758.html
 5.http://devco.re/blog/2016/04/21/how-I-hacked-facebook-and-found-someones-backdoor-script/
 6.https://www.2cto.com/Article/201204/127836.html
 7.http://www.freebuf.com/vuls/110110.html
 8.http://www.freebuf.com/articles/web/111139.html
 9.https://www.quora.com/How-do-I-become-a-successful-Bug-bounty-hunter
 10.http://www.freebuf.com/articles/neopoints/116064.html
 11.http://mp.weixin.qq.com/s?__biz=MzA4ODUxNjIwMg==&mid=2654323681&idx=1&sn=c888ec542a219acb5165ff816339894f
 12.http://bobao.360.cn/activity/detail/392.html
 13.http://www.cnblogs.com/xzzzh/p/6786617.html
```


#### tombkeeper:

```
https://weibo.com/1401527553/DBskbziBf?type=comment#_rnd1466685094077
```


#### good habit:

```
1.闲时挖洞(可刷cve等)
2.6 items in cellphone dock:
    知乎 feedly ihour 新浪微博 twitter English_words
```

#### words

```
[+] 没有什么难事是训练10000次不能熟练掌握的,如果不能,那就20000次,但是,一生当中没有那么多10000次的时间可以花费,必须有所舍弃,没有舍弃,便没有未来
[+] 君子性非异也,善假于物也,与其自己研究,不如把时间全部花在学习别人的研究成果上,事半功倍,站在巨人的肩膀上
[+] 悟饭:"然后,醒了以后再继续修炼对吧?" 悟空:"那当然了,修炼可是很苦的事情哦!你怕了吗?" "怎么会呢?出去以后,
我一定要打败沙鲁"
```

#### 灵魂契约

```
[+] 放弃是痛苦的,但不放弃只能在生命的最后痛苦,此生放弃再花任何时间调首页3xp10it文字logo
[+] 放弃再花时间在windows的bat学习折腾上,用python实现对应功能,再转成exe
[+] 放弃在linux mint18上安装l2tp-ipsec-vpn,花了约2个小时没有成功,如果需要,在vm中开代理实现l2tp的连接
```
