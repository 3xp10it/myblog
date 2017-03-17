---
layout:     post
title:      python tips
date:       2017-03-17
summary:    python tips
categories: python
tags:
- tips
- python
---

### 0x00 About

```
About python tips on "bugs"
```

### 0x01 Detail

```
1.python2/3在os.path.exists("~/...")时,无法自动识别当前系统的~目录,eg.macOS下的~为/var/root,ubuntu下的~为
/root,os.path.exists("~/1.txt")不认识~.

后来发现这不是bug,os.path.expanduser("~")可以认识~,http://www.cnblogs.com/xupeizhi/archive/2013/02/20/2918243.html

2.python以"a+"模式读文件读出的内容为空,要将文件指针移到开关再读,f=open("..","a+") && f.seek(0) && f.read()
http://stackoverflow.com/questions/14639936/how-to-read-from-file-opened-in-a-mode
```

