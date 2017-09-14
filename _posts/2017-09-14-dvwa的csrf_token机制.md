---
layout:     post
title:      dvwa的csrf_token机制
date:       2017-09-14
summary:    dvwa的csrf_token机制
categories: web
tags:
 - csrf
 - token
---

dvwa的csrf_token在设置level为impossible(除low外未验证)时起作用,有了csrf_token后可防csrf漏洞的利用,同时也给自动化漏洞
检测带来了麻烦,客户端扫描漏洞时需要每次重新设置新的csrf_token来发送get/post请求,如果没有带上新的token参数值服务器
会校验不通过

dvwa设置level为impossible后服务端验证(由form action中的地址对应的页面进行验证)客户端传来的csrf_token的过程如下:(以xss[reflected]和login页面为例,dvwa中的login.php和xss_r中的form action中的url都是当前页面)

```
<html>
<body>
    加载impossible.php
    impossible.php执行内容流程:
        1.验证csrf_token
        2.刷新服务器端存储的csrf_token

    取出新的csrf_token到html的body
</body>
</html>
```

其中刷新服务器存储的csrf_token的代码如下:

```
function generateSessionToken() {  # Generate a brand new (CSRF) token                                                                                    
     if( isset( $_SESSION[ 'session_token'  ]  )  ) {                                                                                                         
         destroySessionToken();                                                                                                                            
     }                                                                                                                                                     
     $_SESSION[ 'session_token'  ] = md5( uniqid()  );                                                                                                       
} 
```

在上面的验证csrf_token中,xss[reflected]是先判断是否传入name参数,也即如果
在url中出现name参数,无论是否为空都将进行csrf_token验证(服务器中用的isset($_POST['name'])来判断)
eg.  
访问`http://192.168.83.11/dvwa/vulnerabilities/xss_r/?name=1`时验证csrf_token  
访问`http://192.168.83.11/dvwa/vulnerabilities/xss_r/?name=`时验证csrf_token  
访问`http://192.168.83.11/dvwa/vulnerabilities/xss_r/`时不验证csrf_token  

从上面服务器校验客户端传入的csrf_token参数的过程可以看出:

a.服务器判断客户端是同一个`人`的方法是通过cookie中的sessionid来判断的,判断客户端是同一个`人`正常合法地通过浏览器
访问的通过cookie中的sessionid+传入的csrf_token=服务器保存的csrf_token来判断的  

b.这种带csrf_token验证的情况会对暴力破解产生阻碍,导致暴力破解相当于只能单线程进行(需要每次等待返回的新的
csrf_token),且暴力破解时需要每次在请求时更新请求参数中的csrf_token的值为从服务器返回的新的csrf_token值  

c.在自动化漏洞检测时需要先判断要检测的页面是否有csrf_token(有些页面是没有的),如果有则要在请求前更新csrf_token参数
的值(sql注入和xss检测中可能会有)    

d.这里的csrf_token的验证和[这里][1]说的验证码验证机制几乎相同,只不过链接里的form action页面与登录页面不同,也即只
要登录页面中的form action值不是登录页面则很可能存在验证码绕过的问题(只要人工输入一次验证码即可)  

[1]: http://3xp10it.cc/web/2016/11/10/%E8%87%AA%E5%8A%A8%E8%AF%86%E5%88%AB%E9%AA%8C%E8%AF%81%E7%A0%81%E6%9A%B4%E5%8A%9B%E7%A0%B4%E8%A7%A3/#0x02-about
