---
layout:     post
title:      cookie和session
date:       2017-09-19
summary:    cookie和session
categories: web
tags:
 - cookie
 - session
---

0x00 set-cookie

第一次访问页面后,Server可将Cookie信息加入HTTP Header返回给浏览器(set-cookie),浏览器会自动将这些信息保存在本地;
当再次访问相同域名时,浏览器将对应Cookie信息随请求一起发送,Server端可读取这些信息进行处理.

0x01 session_start()

session_start()做了哪些初始化工作
1.读取名为PHPSESSID(如果没有改变默认值)的cookie值,假使为abc123
2.若读取到PHPSESSID这个COOKIE,创建$_SESSION变量,并从相应的目录中(可以再php.ini中设置)读取SESS_abc123(默认
是这种命名方式)文件,将字符装在入$_SESSION变量中; 若没有读取到PHPSESSID这个COOKIE,也会创建$_SESSION变量,同时创
建一个sess_abc321(名称为随机值)的session文件,同时将abc321作为PHPSESSID的cookie值返回给浏览器端.

0x02 sessionID

在用户登录前后,客户端的cookie不会变,只是如果登录成功,这个cookie对应的服务器中的session变成可以访问后台内容的权限,
所以如果sessionID值放在数据库中,可遍历这些sesionID,将客户端中cookie中的对应的sessioID值替换成数据库中的sessionID,
如果有一个sessionID是管理员身份的session,那么可用这个cookie进后台

登录后的用户人为logout后,客户端cookie依然不变,除非时间过期了,这样浏览器就不会再用这个cookie了(dvwa中如此,其他未测
)

0x03 python处理cookie

[python中自动处理cookie的方法][1]

```
with requests.Session() as s:
    r = s.get(URL1)
    r = s.post(URL2, data="username and password data payload")
```

[1]: https://stackoverflow.com/questions/21736970/using-requests-module-how-to-handle-set-cookie-in-request-response
