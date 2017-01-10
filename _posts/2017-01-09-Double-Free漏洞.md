---
layout:     post
title:      Double Free漏洞
date:       2017-01-09
summary:    Double Free漏洞
categories: 二进制
tags:
 - 漏洞战争
---

### 0x00 Link

```
1.Double Free浅析
http://php.ph/wydrops/drops/Double%20Free%E6%B5%85%E6%9E%90.pdf
2.freenote_x64堆漏洞double free利用
http://fanrong1992.github.io/2016/05/26/freenote-x64%E5%A0%86%E6%BC%8F%E6%B4%9Edouble-free%E5%88%A9%E7%94%A8/
3.freebuf CVE-2014-0502分析
http://www.freebuf.com/articles/network/27118.html
4.上面3中内含的Corelan ROPdb[基于单个dll收集通用rop链]
https://www.corelan.be/index.php/security/corelan-ropdb/    
```

### 0x01 
