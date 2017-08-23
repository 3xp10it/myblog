---
layout:     post
title:      sqlmap以加载请求文件方式检测https服务器时存在的bug
date:       2017-08-23
summary:    sqlmap以加载请求文件方式检测https服务器时存在的bug
categories: web
tags:
 - sqlmap
 - https
---

### About

sqlmap在扫描https类型的注入点的时候,当通过使用-r参数加载请求文件来检测有没有sql注入漏洞时,不能较好处理是否用ssl
通信,导致无法通过使用-r参数通过加载请求文件的方式自动检测是否是https协议,并因此无法检测出存在的注入点(需要人工添
加`--force-ssl`)

### Detail

1.当requestFile(-r加载的请求文件)中有Referer参数且Referer的值中的hostname部分及port部分与requestFile中的Host参数的值
中的hostname与port部分相同,且Referer的值是https开头,认为这个requestFile的测试应该走ssl(也即走https通信)

```
eg:[requestFile]

POST /xxx/xxx/xxx/x.jsp?x=a HTTP/1.1
Host: www.google.com:6666
...
Referer: https://www.google.com:6666/xxxooo/xxoo/xxx.jsp
...

xx=xxx&ooo=ooo
```


2.当requestFile(-r加载的请求文件)中的port值不为80且requestFile中有Referer参数且Referer的值是`https://.*cdn.*`的格式,这种情况也认为要走https通信

```
eg:[requestFile]

POST /xxx/xxx/xxx/x.jsp?x=a HTTP/1.1
Host: www.google.com:6666
...
Referer: https://www.google-cdn.com/lllllllllllxxoo/xxx.jsp
...

xx=xxx&ooo=ooo
```

上面这种情况认为测试要走https通信,对应修改sqlmap中的lib/core/option.py中相关代码,已提交pull request到sqlmap,对应下面的与conf.forceSSL相关的部分代码  
<a href="https://github.com/sqlmapproject/sqlmap/pull/2663">follow</a>
