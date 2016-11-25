---
layout:     post
title:      一道ctf训练营的web题writeup
date:       2016-03-07
summary:    一道ctf训练营的web题writeup---不难不易的js加密
categories: js
thumbnail: cogs
tags:
 - js
 - ctf
---
## 0x01 uri  
https://ctf.idf.cn/index.php?g=game&m=article&a=index&id=28

<img src="../../../../../pic/ctf-js/图片1.png">

## 0x02 求flag过程

1>打开firebug中script:
![2][2]

2>具体内容:

```html
<html>
<head>
<script src="/tpl/wctf/Public/js/lib/jquery.js"></script>
<script src="/tpl/wctf/Public/js/lib/md5.js"></script>
</head>
<body>
<script type="text/javascript">
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('4 a=1d("\\T\\Q\\Z\\10\\5\\Y\\n\\S\\X\\L\\W\\V\\x","");4 b="\\5\\j\\j\\0\\j\\h\\j\\k\\11\\k\\0\\0\\0\\3\\2\\0\\0\\C\\5\\3\\p\\2\\i\\5\\5\\0\\q\\q\\3\\u\\j\\h";4 c=/.+w.+w.+/P;4 d=t;4 e=a.1(O,y);9($.A(e)==b.B(/7/D,++d).B(/8/D,d*z)){4 f=a.1(t/d,R);9(f.1(y,z)=="\\1b\\M"&&$.A(f.1(t/d,d+E))=="\\p\\2\\6\\3\\i\\p\\3\\2\\i\\q\\u\\3\\n\\3\\h\\u\\6\\2\\h\\5\\6\\k\\i\\k\\i\\2\\2\\0\\6\\C\\5\\6"){r=a.1(15);9(r.m(d)-o==r.m(++d)-o&&r.m(--d)-o==r.m(--d)){4 g=l.H(1e);g=g.v()+g.v();9(r.1((++d)*E,1c)==g.19("\\h\\n\\M\\18")&&c.16(a)){d=l(s)+l(a.17)}}}};9(a.1(F,s)!=l.H(d)||a.1(F,s)=="\\12"){K("\\13\\L\\14\\1a\\N\\N\\J\\J")}U{K("\\I\\G\\I\\G\\x")}',62,77,'x37|substr|x30|x35|var|x66|x31|||if||||||||x65|x34|x33|x36|String|charCodeAt|x61|0x19|x64|x38||0x1|0x0|x62|toLowerCase|_|uff01|0x5|0x2|md5|replace|x39|ig|0x3|0x4|u559c|fromCharCode|u606d|u3002|alert|uff0c|x73|u60f3|0x8|gi|u5165|0x7|x67|u8f93|else|u5e74|u5c11|u5427|x6c|u4f60|u7684|x63|x7a|u989d|u518d|0xd|test|length|x79|concat|u53bb|x6a|0x6|prompt|0x4f'.split('|'),0,{}))
</script>
</body>
</html>>)}})
</body>
</head>
</html>
```

3>本地新建一个html页面

#### 内容为上述内容,其中由于存在:

```
<script src="/tpl/wctf/Public/js/lib/jquery.js"></script>
<script src="/tpl/wctf/Public/js/lib/md5.js"></script>
```

#### 需要本地建立相应文件夹并将两个js文件下载到目录:
<img src="../../../../../pic/ctf-js/图片3.png" width='1000' height='400' border='5'><br>
4>2中js代码转换成易看代码:<br>
<small>用sublime text打开,安装JsFormat插件,可通过快捷键ctrl+alt+f,实现javascript代码自动对齐,js代码转换后变成:</small>

```js
var a = prompt("\\u8f93\\u5165\\u4f60\\u7684\\x66\\x6c\\x61\\x67\\u5427\\uff0c\\u5c11\\u5e74\\uff01", "");
var b = "\\x66\\x33\\x33\\x37\\x33\\x65\\x33\\x36\\x63\\x36\\x37\\x37\\x37\\x35\\x30\\x37\\x37\\x39\\x66\\x35\\x64\\x30\\x34\\x66\\x66\\x37\\x38\\x38\\x35\\x62\\x33\\x65";
var c = /.+_.+_.+/gi;
var d = 0x0;
var e = a.substr(0x8, 0x5);
if ($.md5(e) == b.replace(/7/ig, ++d).replace(/8/ig, d * 0x2)) {
var f = a.substr(0x0 / d, 0x7);
if (f.substr(0x5, 0x2) == "\\x6a\\x73" && $.md5(f.substr(0x0 / d, d + 0x3)) == "\\x64\\x30\\x31\\x35\\x34\\x64\\x35\\x30\\x34\\x38\\x62\\x35\\x61\\x35\\x65\\x62\\x31\\x30\\x65\\x66\\x31\\x36\\x34\\x36\\x34\\x30\\x30\\x37\\x31\\x39\\x66\\x31") {
r = a.substr(0xd);
if (r.charCodeAt(d) - 0x19 == r.charCodeAt(++d) - 0x19 && r.charCodeAt(--d) - 0x19 == r.charCodeAt(--d)) {
var g = String.fromCharCode(0x4f);
g = g.toLowerCase() + g.toLowerCase();
if (r.substr((++d) * 0x3, 0x6) == g.concat("\\x65\\x61\\x73\\x79") && c.test(a)) {
d = String(0x1) + String(a.length)
}
}
}
};
if (.substr(0x4, 0x1) != String.fromCharCode(d) || a.substr(0x4, 0x1) == "\\x7a") {
alert("\\u989d\\uff0c\\u518d\\u53bb\\u60f3\\u60f3\\u3002\\u3002")
} else {
alert("\\u606d\\u559c\\u606d\\u559c\\uff01")
}
```

<small>后将该js放进本地新建的html中,其中html内嵌js格式为:</small>

```html
<html>
<head>
<script src="/tpl/wctf/Public/js/lib/jquery.js"></script>
<script src="/tpl/wctf/Public/js/lib/md5.js"></script>
</head>
<body>
<Script Language="JavaScript">
Put　your script code here ...
</script>
</body>
</html>
```

#### 加入转换后js效果:
```html
<html>
<body>
<Script Language="JavaScript">
var a = prompt("\u8f93\u5165\u4f60\u7684\x66\x6c\x61\x67\u5427\uff0c\u5c11\u5e74\uff01", "");
var b = "\x66\x33\x33\x37\x33\x65\x33\x36\x63\x36\x37\x37\x37\x35\x30\x37\x37\x39\x66\x35\x64\x30\x34\x66\x66\x37\x38\x38\x35\x62\x33\x65";
var c = /.+_.+_.+/gi;
var d = 0x0;
var e = a.substr(0x8, 0x5);
if ($.md5(e) == b.replace(/7/ig, ++d).replace(/8/ig, d * 0x2)) {
var f = a.substr(0x0 / d, 0x7);
if (f.substr(0x5, 0x2) == "\x6a\x73" && $.md5(f.substr(0x0 / d, d + 0x3)) == "\x64\x30\x31\x35\x34\x64\x35\x30\x34\x38\x62\x35\x61\x35\x65\x62\x31\x30\x65\x66\x31\x36\x34\x36\x34\x30\x30\x37\x31\x39\x66\x31") {
r = a.substr(0xd);
if (r.charCodeAt(d) - 0x19 == r.charCodeAt(++d) - 0x19 && r.charCodeAt(--d) - 0x19 == r.charCodeAt(--d)) {
var g = String.fromCharCode(0x4f);
g = g.toLowerCase() + g.toLowerCase();
if (r.substr((++d) * 0x3, 0x6) == g.concat("\x65\x61\x73\x79") && c.test(a)) {
d = String(0x1) + String(a.length)
}
}
}
};
if (a.substr(0x4, 0x1) != String.fromCharCode(d) || a.substr(0x4, 0x1) == "\x7a") {
alert("\u989d\uff0c\u518d\u53bb\u60f3\u60f3\u3002\u3002")
} else {
alert("\u606d\u559c\u606d\u559c\uff01")
}
</script>
</body>
</html>
```
5>chrome访问本地html,并用开发者工具调试js:
![skd][4]

#### 调试过程中发现,４中被转换后的js中的字符表示形式:
```js
var b = "\x66\x33\x33\x37\x33\x65\x33\x36\x63\x36\x37\x37\x37\x35\x30\x37\x37\x39\x66\x35\x64\x30\x34\x66\x66\x37\x38\x38\x35\x62\x33\x65";
if (f.substr(0x5, 0x2) == "\x6a\x73" && $.md5(f.substr(0x0 / d, d + 0x3)) == "\x64\x30\x31\x35\x34\x64\x35\x30\x34\x38\x62\x35\x61\x35\x65\x62\x31\x30\x65\x66\x31\x36\x34\x36\x34\x30\x30\x37\x31\x39\x66\x31") 
if (r.substr((++d) * 0x3, 0x6) == g.concat("\x65\x61\x73\x79") && c.test(a))
if (a.substr(0x4, 0x1) != String.fromCharCode(d) || a.substr(0x4, 0x1) == "\x7a")
```

#### 以上４处无法满足调试成立关系,这有可能是js转换插件JsFormat引起的,将上面的十六进制形式转换成正常字符形式,用js代码实现:
```js
var b = ["0x66","0x33","0x33","0x37","0x33","0x65","0x33","0x36","0x63","0x36","0x37","0x37","0x37","0x35","0x30","0x37","0x37","0x39","0x66","0x35","0x64","0x30","0x34","0x66","0x66","0x37","0x38","0x38","0x35","0x62","0x33","0x65"];
var B="";
for(i=0;i<b.length;i++)
{
B+=String.fromCharCode(b[i])
}
b=B;
if (f.substr(0x5, 0x2) == "js" && $.md5(f.substr(0x0 / d, d + 0x3)) == "d0154d5048b5a5eb10ef1646400719f1")
if (r.substr((++d) * 0x3, 0x6) == g.concat("easy") && c.test(a))
if (a.substr(0x4, 0x1) != String.fromCharCode(d) || a.substr(0x4, 0x1) == "z")
```
6>最后html内嵌js的完整可调试代码为:

```html
<html>
<head>
<script src="/tpl/wctf/Public/js/lib/jquery.js"></script>
<script src="/tpl/wctf/Public/js/lib/md5.js"></script>
</head>
<body>
<script type="text/javascript">
var b = ["0x66","0x33","0x33","0x37","0x33","0x65","0x33","0x36","0x63","0x36","0x37","0x37","0x37","0x35","0x30","0x37","0x37","0x39","0x66","0x35","0x64","0x30","0x34","0x66","0x66","0x37","0x38","0x38","0x35","0x62","0x33","0x65"];
var B="";
for(i=0;i<b.length;i++)
{
B+=String.fromCharCode(b[i])
}
b=B;
var a = prompt("\\u8f93\\u5165\\u4f60\\u7684\\x66\\x6c\\x61\\x67\\u5427\\uff0c\\u5c11\\u5e74\\uff01", "");
var c = /.+_.+_.+/gi;
var d = 0x0;
var e = a.substr(0x8, 0x5);
if ($.md5(e) == b.replace(/7/ig, ++d).replace(/8/ig, d * 0x2)) {
var f = a.substr(0x0 / d, 0x7);
if (f.substr(0x5, 0x2) == "js" && $.md5(f.substr(0x0 / d, d + 0x3)) == "d0154d5048b5a5eb10ef1646400719f1") {
r = a.substr(0xd);
if (r.charCodeAt(d) - 0x19 == r.charCodeAt(++d) - 0x19 && r.charCodeAt(--d) - 0x19 == r.charCodeAt(--d)) {
var g = String.fromCharCode(0x4f);
g = g.toLowerCase() + g.toLowerCase();
if (r.substr((++d) * 0x3, 0x6) == g.concat("easy") && c.test(a)) {
d = String(0x1) + String(a.length)
}
}
}
};
if (a.substr(0x4, 0x1) != String.fromCharCode(d) || a.substr(0x4, 0x1) == "z") {
alert("\\u989d\\uff0c\\u518d\\u53bb\\u60f3\\u60f3\\u3002\\u3002")
} else {
alert("congratuations!")
}
</script>
</body>
</html>
```
7>本地调试

#### 在watch这里可以加各种表达式用来实时查看变量的值:
![s][5]

#### 其中要注意的是,由于开始的时候一直监控了:
    b.replace(/7/ig, ++d).replace(/8/ig, d * 0x2)
    r.charCodeAt(++d) - 0x19 && r.charCodeAt(--d) - 0x19 == r.charCodeAt(--d)

#### 导致一直算不出正确的答案,后来发现监控中加了++d,\--d等的值会随着调试过程动态改变d的值,而这将改变d在调试代码中的本来应有的值,从而无法正确调试到答案,解决方法,去掉这两个表达式的监控,在调试过程中计算d的值,可将这两个监控表达式改成:  
```
b.replace(/7/ig,1).replace(/8/ig,1 \* 0x2):  
r.charCodeAt(1) - 0x19: 95  
r.charCodeAt(2) - 0x19: 95  
r.charCodeAt(1) - 0x19: 95  
r.charCodeAt(0): 95  
```

#### 然后动态调试,其中有两个md5解密分别为:
```
wctf
jiami
```

#### 算出最后的答案应该是:
```
wctf{js_jiami_xxooeasy
```

#### 但是提交显示不正确,尝试在最后加了个}符号,答案正确.

[1]: https://raw.githubusercontent.com/3xp10it/pic/master/ctf-js/%E5%9B%BE%E7%89%871.png
[2]: https://raw.githubusercontent.com/3xp10it/pic/master/ctf-js/%E5%9B%BE%E7%89%872.png
[3]: https://raw.githubusercontent.com/3xp10it/pic/master/ctf-js/%E5%9B%BE%E7%89%873.png
[4]: https://raw.githubusercontent.com/3xp10it/pic/master/ctf-js/%E5%9B%BE%E7%89%874.png
[5]: https://raw.githubusercontent.com/3xp10it/pic/master/ctf-js/%E5%9B%BE%E7%89%875.png

