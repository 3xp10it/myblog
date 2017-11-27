---
layout:     post
title:      kali linux安装源的问题
date:       2017-11-27
summary:    kali linux安装源的问题
categories: linux
tags:
 - kali
 - debain
 - sources.list
---

### About

新下载的kali linux 3在安装pd的paralles tools时需要安装`linux-headers-$(uname -r)`,于是apt-get update,出现了经典的
基于debain的系统的安装源的问题,如下图

<img src="https://raw.githubusercontent.com/3xp10it/pic/master/kali3.png">

### 必读link

debain安装源地址语法[理解][1]

`apt-get update` Hash 校验和不符等错误的原因
[1][2]
[2][3]

[1]: http://www.cnblogs.com/beanmoon/p/3387652.html
[2]: http://www.kali.org.cn/thread-23272-1-1.html
[3]: http://forum.ubuntu.org.cn/viewtopic.php?t=473765

### 解决方法

1.理解debain安装源地址格式语法后,设置正确的源后用后面3种方法之一即可

```
kali官方debain源:
http://http.kali.org/

需要在sources.list文件中如下设置:
deb http://http.kali.org/ kali-rolling main contrib non-free
其中main contrib non-free的顺序可变
```

2.手机开个热点后重新`apt-get update`

3.换个wifi后重新`apt-get update`

4.挂vpn,开代理后重新`apt-get update`
