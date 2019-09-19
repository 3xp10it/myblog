---
layout:     post
title:      frida开启ios app签名服务
date:       2019-08-13
summary:    frida开启ios app签名服务
categories: 二进制
tags:
 - frida
 - ios
 - rpc
 - sign
---

### 0x0 About

一般情况下,app因为安全性会有签名机制,大多数服务器上重要的接口都需要签名算法验证通过后才可访问,一般情况下,服务器上的验证算法是通过校验客户端请求时间戳达到防重放的目的(签名机制也可用于提升攻击难度),校验算法示例可参考[这里][1],简单的校验伪代码如下:

```
客户端请求如下:

POST /jiekou HTTP/1.1
Host: www.baidu.com
content: text/html; charset=UTF-8
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Accept-Encoding: gzip, deflate
Accept: */*
User-Agent: xxx/5.4.7 (iPhone; iOS 11.1.1; Scale/2.00)
Accept-Language: zh-Hans-CN;q=1
Content-Length: 376
Connection: close

a=1&b=2&reqTime=20190813160148620&sign_value=Q980XOWEJ7658799ZX90876876O

其中reqTime是客户端请求携带的请求时间戳,sign_value是客户端签名算法的签名结果


服务端校验如下:

if request_value.reqTime+60s < serverTime:
    deny
if get_sign_value(request_value)!=request_value.sign_value:
    deny
normal_response()

其中request_value是客户端提交的请求包数据,request_value.reqTime是请求包中的reqTime参数的值,serverTime是服务器接收到请求的时间戳,request_value.sign_value是请求包中的sign_value参数的值
```

本文记录通过frida开启ios app客户端的签名算法的rpc调用服务

### 0x1 分析签名函数

ios app通过Cluth脱壳后通过ida反编译,正常测试时抓包发现大多请求都带有`openapi_sign=xxxxxxxxxxxxx`,推断app的签名结果会赋值到openapi_sign参数中,在ida中搜索openapi_sign,结果如下

<img src="https://raw.githubusercontent.com/3xp10it/pic/master/goldsun1.png" data-action="zoom">

在汇编区中按f5得到object-c风格的代码,显示是`signRequestUrlWithParameters:secret:signMethod:`函数实现的签名,在ida的函数窗口区搜索这个函数,如下

<img src="https://raw.githubusercontent.com/3xp10it/pic/master/goldsun2.png" data-action="zoom">
<img src="https://raw.githubusercontent.com/3xp10it/pic/master/goldsun3.png" data-action="zoom">

其中`signRequestUrlWithParameters:secret:signMethod:`代码如下:

```
id __cdecl +[GSNetworkUtils signRequestUrlWithParameters:secret:signMethod:](GSNetworkUtils_meta *self, SEL a2, id a3, id a4, id a5)
{
  id v5; // x20
  id v6; // x21
  void *v7; // x19
  __int64 v8; // x1
  void *v9; // x22
  __int64 v10; // x1
  __int64 v11; // x1
  void *v12; // x26
  void *v13; // x21
  void *v14; // x24
  void *v15; // x21
  __int64 v16; // x20
  void *v17; // x0
  __int64 v18; // x21
  int v19; // w25
  __int64 v20; // x1
  void *v21; // x27
  __int64 v22; // x24
  unsigned __int64 v23; // x22
  void *v24; // x26
  __int64 v25; // x19
  void *v26; // x25
  void *v27; // x19
  const __CFString *v28; // x20
  id result; // x0
  void *v30; // [xsp+10h] [xbp-150h]
  void *v31; // [xsp+18h] [xbp-148h]
  struct objc_object *v32; // [xsp+28h] [xbp-138h]
  void *v33; // [xsp+30h] [xbp-130h]
  GSNetworkUtils_meta *v34; // [xsp+38h] [xbp-128h]
  void *v35; // [xsp+40h] [xbp-120h]
  __int128 v36; // [xsp+48h] [xbp-118h]
  __int128 v37; // [xsp+58h] [xbp-108h]
  __int128 v38; // [xsp+68h] [xbp-F8h]
  __int128 v39; // [xsp+78h] [xbp-E8h]
  char v40; // [xsp+88h] [xbp-D8h]
  __int64 v41; // [xsp+108h] [xbp-58h]

  v5 = a5;
  v6 = a4;
  v34 = self;
  v7 = (void *)objc_retain(a3, a2);
  v9 = (void *)objc_retain(v6, v8);
  v12 = (void *)objc_retain(v5, v10);
  v35 = v7;
  if ( !v7 )
    goto LABEL_19;
  objc_msgSend(v7, "allKeys");
  v13 = (void *)objc_retainAutoreleasedReturnValue();
  if ( !objc_msgSend(v13, "count") )
  {
    objc_release(v13);
    goto LABEL_19;
  }
  v14 = objc_msgSend(v9, "length");
  objc_release(v13);
  if ( !v14 )
  {
LABEL_19:
    v28 = &stru_1020C2DD0;
    objc_retain(&stru_1020C2DD0, v11);
    goto LABEL_20;
  }
  objc_msgSend(v7, "allKeys");
  v15 = (void *)objc_retainAutoreleasedReturnValue();
  objc_msgSend(v15, "sortedArrayUsingSelector:", "compare:");
  v16 = objc_retainAutoreleasedReturnValue();
  objc_release(v15);
  v17 = objc_msgSend(&OBJC_CLASS___NSMutableString, "alloc");
  v32 = (struct objc_object *)objc_msgSend(v17, "init");
  if ( !objc_msgSend(v12, "length")
    || (objc_msgSend(v12, "lowercaseString"),
        v18 = objc_retainAutoreleasedReturnValue(),
        v19 = (unsigned __int64)objc_msgSend(CFSTR("md5"), "isEqualToString:", v18),
        objc_release(v18),
        v19) )
  {
    objc_msgSend(v32, "appendString:", v9);
  }
  v30 = v12;
  v31 = v9;
  v39 = 0u;
  v38 = 0u;
  v37 = 0u;
  v36 = 0u;
  v33 = (void *)objc_retain(v16, v20);
  v21 = objc_msgSend(v33, "countByEnumeratingWithState:objects:count:", &v36, &v40, 16LL);
  if ( v21 )
  {
    v22 = *(_QWORD *)v37;
    do
    {
      v23 = 0LL;
      do
      {
        if ( *(_QWORD *)v37 != v22 )
          objc_enumerationMutation(v33);
        v24 = *(void **)(*((_QWORD *)&v36 + 1) + 8 * v23);
        objc_msgSend(v35, "objectForKey:", *(_QWORD *)(*((_QWORD *)&v36 + 1) + 8 * v23));
        v25 = objc_retainAutoreleasedReturnValue();
        objc_msgSend(v34, "urlDecodedString:", v25);
        v26 = (void *)objc_retainAutoreleasedReturnValue();
        objc_release(v25);
        if ( objc_msgSend(v24, "length") && objc_msgSend(v26, "length") )
        {
          objc_msgSend(v32, "appendString:", v24);
          objc_msgSend(v32, "appendString:", v26);
        }
        objc_release(v26);
        ++v23;
      }
      while ( v23 < (unsigned __int64)v21 );
      v21 = objc_msgSend(v33, "countByEnumeratingWithState:objects:count:", &v36, &v40, 16LL);
    }
    while ( v21 );
  }
  objc_release(v33);
  v9 = v31;
  objc_msgSend(v32, "appendString:", v31);
  ((void (__cdecl *)(GSNetworkUtils_meta *, SEL, id))objc_msgSend)(
    (GSNetworkUtils_meta *)&OBJC_CLASS___GSNetworkUtils,
    "md5:",
    v32);
  v27 = (void *)objc_retainAutoreleasedReturnValue();
  objc_msgSend(v27, "uppercaseString");
  v28 = (const __CFString *)objc_retainAutoreleasedReturnValue();
  objc_release(v27);
  objc_release(v32);
  objc_release(v33);
  v12 = v30;
LABEL_20:
  objc_release(v12);
  objc_release(v9);
  result = (id)objc_release(v35);
  if ( __stack_chk_guard == v41 )
    result = (id)objc_autoreleaseReturnValue(v28);
  return result;
}
```

暂不确定这个函数的参数是怎么用的,从上面objec-c代码中可以看出这个函数总共有3个参数,最后一个参数是字符串"md5",前两个参数还不确定分别是什么,于是通过frida hook这个函数的调用,注入代码如下:

```
if (ObjC.available)
{
    try
    {
        var className = "GSNetworkUtils";
        var funcName = "+ signRequestUrlWithParameters:secret:signMethod:";
        var hook = eval('ObjC.classes.' + className + '["' + funcName + '"]');
        console.log("[*] Class Name: " + className);
        console.log("[*] Method Name: " + funcName);
        Interceptor.attach(hook.implementation, {
          onEnter: function(args) {
            console.log("param:"+args[2]+" type:"+typeof args[2]);
			console.log("param:"+ObjC.classes.NSString.stringWithString_(args[3])+" type:"+typeof args[3]);
			console.log("param:"+ObjC.classes.NSString.stringWithString_(args[4])+" type:"+typeof args[4]);
          },
          onLeave: function(retval) {
            console.log("Return value-> (type:"+typeof retval+",value:"+retval+")");
          }
        });
    }
    catch(err)
    {
        console.log("[!] Exception2: " + err.message);
    }
}
else
{
    console.log("Objective-C Runtime is not available!");
}
```
结果如下:
```
[*] Class Name: GSNetworkUtils
[*] Method Name: + signRequestUrlWithParameters:secret:signMethod:
param:0x1c462af00 type:object
param:96UI5F7H9W9N46FFA7196D109C2768UI type:object
param:md5 type:object
Return value-> (type:object,value:0x1c0845970)
```

通过frida hook这个函数的调用和上面的object-c代码分析得出这个函数的第1个参数应该是与请求包参数相关的变量,猜测是字典形式,第2个参数应该是加密算法里的一个固定密钥值,尝试以字典形式打印第1个参数,注入代码如下:

```
if (ObjC.available)
{
    try
    {
        var className = "GSNetworkUtils";
        var funcName = "+ signRequestUrlWithParameters:secret:signMethod:";
        var hook = eval('ObjC.classes.' + className + '["' + funcName + '"]');
        console.log("[*] Class Name: " + className);
        console.log("[*] Method Name: " + funcName);
        Interceptor.attach(hook.implementation, {
          onEnter: function(args) {
            //console.log("param:"+args[2]+" type:"+typeof args[2]);
			var arg2 = new ObjC.Object(args[2]);
			console.log(arg2.allKeys());
			console.log(arg2.allValues());
			console.log("param:"+ObjC.classes.NSString.stringWithString_(args[3])+" type:"+typeof args[3]);
			console.log("param:"+ObjC.classes.NSString.stringWithString_(args[4])+" type:"+typeof args[4]);
          },
          onLeave: function(retval) {
            console.log("Return value-> (type:"+typeof retval+",value:"+retval+")");
          }
        });
    }
    catch(err)
    {
        console.log("[!] Exception2: " + err.message);
    }
}
else
{
    console.log("Objective-C Runtime is not available!");
}
```
结果如下:

```
(
    "conn_style",
    imsi,
    "device_model"
)
(
    "1.460.01..",
    46001,
    "iPhone7,2"
)
param:96UI5F7H9W9N46FFA7196D109C2768UI type:object
param:md5 type:object
```

说明第1个参数`args[2]`的确是字典的形式,且字典的内容就是http请求包里的参数值(frida js里面的`args[0]`和`args[1]`分别对应object-c代码里面的`GSNetworkUtils_meta *self, SEL a2`,它们不是这个函数的调用参数,相当于self指针),也即这个函数的三个参数分别是:请求包参数构成的字典,签名算法密钥,字符串"md5".

### 0x2 开启rpc签名服务

经过上面对这个函数的分析,可通过frida js构造rpc函数提供签名算法服务给python调用,代码如下:

```
import frida
import sys
import urllib.parse
import re
import pdb

session = frida.get_usb_device().attach("应用名")
script_string = """
if (ObjC.available)
{
    rpc.exports = {
        signrequesturlwithparameters: function (param_string,secret,signMethod) {			
/*
		尝试python中的dict类型传入js代码的rpc函数中(string->dict),没成功
		var param_dict_nsstring=ObjC.classes.NSString.stringWithString_(param_dict)
		var jsonData=param_dict_nsstring.dataUsingEncoding_(4)
		var err=ptr(ObjC.classes.NSError.alloc())
		//下面这个函数最终没调用成功
		var dic=ObjC.classes.NSJSONSerialization.JSONObjectWithData_options_error_(jsonData,0,err)
		console.log(dic)
		console.log(err.localizedDescription())
*/
		
		//console.log(param_string)
		var param_dict = ObjC.classes.NSMutableDictionary.alloc().init(); 
		var param_list=param_string.split("&")
		for (var i = 0; i < param_list.length; i++) { 
			var param=param_list[i].split("=")[0]
			var param_value=param_list[i].substr(param.length+1,param_list[i].length)
			if (param!="openapi_sign") {
				param_dict.setObject_forKey_(param_value,param);
				} 				
		}
		var result=ObjC.classes.GSNetworkUtils.signRequestUrlWithParameters_secret_signMethod_(param_dict,secret,signMethod);
		return String(ObjC.classes.NSString.stringWithString_(result));
        }
    };

	
}
else
{
    console.log("Objective-C Runtime is not available!");
}
"""


script = session.create_script(script_string)


def on_message(message, data):
    if message['type'] == 'error':
        print("[!] " + message['stack'])
    elif message['type'] == 'send':
        print("[!] " + message['payload'])
    else:
        print(message)



script.on('message', on_message)
script.load()
signrequesturlwithparameters= getattr(script.exports, 'signrequesturlwithparameters')
secret="96UI5F7H9W9N46FFA7196D109C2768UI"; 
signMethod="md5";


def start_transfer_server():
    from http.server import BaseHTTPRequestHandler, HTTPServer

    class S(BaseHTTPRequestHandler):
        def _set_headers(self):
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()

        def do_GET(self):
            try:
                param_string=re.search(r"param_string=([\s\S]*)",self.path).group(1)
                param_string=urllib.parse.unquote(param_string)
                return_value=signrequesturlwithparameters(param_string,secret,signMethod)
                self._set_headers()
                self.wfile.write(bytes(return_value, "utf-8"))
            except:
                pass

    def run(server_class=HTTPServer, handler_class=S, port=8888):
        server_address = ('', port)
        httpd = server_class(server_address, handler_class)
        print('Starting httpd...')
        httpd.serve_forever()

    run()


start_transfer_server()
```

其中`session = frida.get_usb_device().attach("应用名")`这里的应用名需要在连接手机的电脑上运行`frida-ps -U`得到,在windows上运行时如果手机运行的进程名中有中文字符则会有个编码的bug,如下:

```
[C:\~]$ frida-ps -U
 PID  Name
----  -----------------------------------------------
 446  InCallService
Exception in thread Thread-1:
Traceback (most recent call last):
  File "c:\python37\lib\threading.py", line 917, in _bootstrap_inner
    self.run()
  File "c:\python37\lib\threading.py", line 865, in run
    self._target(*self._args, **self._kwargs)
  File "c:\python37\lib\site-packages\frida_tools\application.py", line 428, in _run
    work()
  File "c:\python37\lib\site-packages\frida_tools\application.py", line 277, in _try_start
    self._start()
  File "c:\python37\lib\site-packages\frida_tools\ps.py", line 69, in _start
    self._print(line_format % (process.pid, process.name))
  File "c:\python37\lib\site-packages\frida_tools\application.py", line 343, in _print
    print(*encoded_args, **kwargs)
  File "c:\python37\lib\site-packages\colorama\ansitowin32.py", line 41, in write
    self.__convertor.write(text)
  File "c:\python37\lib\site-packages\colorama\ansitowin32.py", line 162, in write
    self.write_and_convert(text)
  File "c:\python37\lib\site-packages\colorama\ansitowin32.py", line 190, in write_and_convert
    self.write_plain_text(text, cursor, len(text))
  File "c:\python37\lib\site-packages\colorama\ansitowin32.py", line 195, in write_plain_text
    self.wrapped.write(text[start:end])
UnicodeEncodeError: 'gbk' codec can't encode character '\xd0' in position 6: illegal multibyte sequence
```

根据报错信息可以看出是由于ps.py的`self._print`出了问题:

```
  File "c:\python37\lib\site-packages\frida_tools\ps.py", line 69, in _start
    self._print(line_format % (process.pid, process.name))
```

将这行代码修改下可正常运行`frida-ps -U`来得到进程名

```
#self._print(line_format % (process.pid, process.name))
print(line_format % (process.pid, process.name))
```


### 0x3 后记

通过上面的分析,容易联想到ios app里的签名函数大多用的是同一个类的同一个函数(因为开发都习惯直接用市面上已有的代码),变量在于不同app在使用这个签名函数时会有不同的第2个参数和第3个参数,也即密钥值和加密算法(对应上面的96UI5F7H9W9N46FFA7196D109C2768UI和"md5"),分析其他ios app时估计可同样直接分析出密钥值(可通过hook内存)和第3个参数值(本例是"md5",ida静态分析可得到),然后直接构造rpc函数就可以用了.此外,也可通过把这个签名函数封装成其他语言(如python,php)来得到更稳定的rpc服务,也即不用hook app即可提供rpc签名服务.

### 0x4 参考

[frida js打印字典内容][5]  
[在rpc调用时怎样将python函数的字典传递到frida js的函数中][6]

[1]: https://blog.csdn.net/koastal/article/details/53456696
[5]: https://github.com/frida/frida-core/issues/7
[6]: https://stackoverflow.com/questions/57458375/how-to-pass-a-dict-parameter-from-python-to-frida-rpc-javascript-function
