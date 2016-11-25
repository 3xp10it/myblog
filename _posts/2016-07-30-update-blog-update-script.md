---
layout:     post
title:      修正博客更新脚本
date:       2016-07-30
summary:    修正博客更新脚本
categories: jekyll
tags:
 - jekyll
 - github
 - shell

---

### 0x00 about

```
目的:简化所有更新操作并实现换电脑快速还原github上博客至本地

本文针对"Use github and jekyll start github pages"文中的更新脚本作最终修改,原文链接如下
```
<a href="https://3xp10it.github.io/jekyll/2016/04/09/github-jekyll-blog/">原文链接</a>

### 0x01 更新最终博客更新脚本指令如下

#### a>bash脚本 <a href="https://raw.githubusercontent.com/3xp10it/mytools/master/up.sh"><small><font color="green">up.sh</font></small></a>

```bash

if [ -d /root/myblog ] && [ -d /root/3xp10it.github.io ]
then
    cd /root/myblog && pkill jekyll;sleep 3 && cp index.html tmp.html && cp index_bak.html index.html && sh -c "rm -r _site/ & jekyll serve --watch & sleep 3 && exit" && cp _site/index.html index2.html && cp tmp.html index.html && echo congratulations! commands execute ok to here!
    cd /root/3xp10it.github.io && cp -r ../myblog/_site/* . && cp ../myblog/index2.html . && cp ../myblog/index.html . && git status && git add . && git status && git commit -a -m "update" && git push -u origin master && echo congratulations! commands execute ok to here!
    cd /root/myblog && git status && git add . && git status && git commit -a -m "update backup" && git push -u origin master && echo all is well,and all is done!
else
    echo "this is the first time you use me,I will download myblog from https://github.com/3xp10it/myblog.git"
    mkdir /root/myblog && cd /root/myblog && git init && git pull https://github.com/3xp10it/myblog.git && git remote add origin https://github.com/3xp10it/myblog.git
    echo "this is the first time you use me,I will download 3xp10it.github.io from https://github.com/3xp10it/3xp10it.github.io.git"
    mkdir /root/3xp10it.github.io && cd /root/3xp10it.github.io && git init && git pull https://github.com/3xp10it/3xp10it.github.io.git && git remote add origin https://github.com/3xp10it/3xp10it.github.io.git
fi
```

#### b>python脚本 <a href="https://raw.githubusercontent.com/3xp10it/mytools/master/up.py"><small><font color="green">up.py</font></small></a>


```python
import os
if os.path.exists('/root/myblog') is False and os.path.exists('/root/3xp10it.github.io') is False:
    print "this is the first time you use me,I will download myblog from https://github.com/3xp10it/myblog.git"
    os.system("mkdir /root/myblog && cd /root/myblog && git init && git pull https://github.com/3xp10it/myblog.git && git remote add origin https://github.com/3xp10it/myblog.git")
    print "this is the first time you use me,I will download 3xp10it.github.io from https://github.com/3xp10it/3xp10it.github.io.git"
    os.system("mkdir /root/3xp10it.github.io && cd /root/3xp10it.github.io && git init && git pull https://github.com/3xp10it/3xp10it.github.io.git && git remote add origin https://github.com/3xp10it/3xp10it.github.io.git")
else:
    os.system('''cd /root/myblog && pkill jekyll;sleep 3 && cp index.html tmp.html && cp index_bak.html index.html && sh -c "rm -r _site/ & jekyll serve --watch & sleep 3 && exit" && cp _site/index.html index2.html && cp tmp.html index.html && echo congratulations! commands execute ok to here!''')
    os.system('''cd /root/3xp10it.github.io && cp -r ../myblog/_site/* . && cp ../myblog/index2.html . && cp ../myblog/index.html . && git status && git add . && git status && git commit -a -m "update" && git push -u origin master && echo congratulations! commands execute ok to here!''')
    os.system('''cd /root/myblog && git status && git add . && git status && git commit -a -m "update backup" && git push -u origin master && echo all is well,and all is done!''')
```

### 0x02 attention

```
1>关键指令改变
这里的远程博客更新指令串较原来的updateall.sh有改变
cd /root/3xp10it.github.io && cp -r ../myblog/_site/* . && cp ../myblog/index2.html . && cp ../myblog/index.html . && git status && git add . && git status && git commit -a -m "update" && git push -u origin master && echo congratulations! commands execute ok to here!

原来的updateall.sh中对应代码是:
cd /root/3xp10it.github.io && cp -r ../myblog/_site/* . && git status && git add . && git status && git commit -a -m "update" && git push -u origin master && echo congratulations! commands execute ok to here!
其中的"cp -r ../myblog/_site/* ."有问题,因为/root/myblog/_site目录下面对应的index.html为本地jekyll --serve生成的正常的主页,而我需要将最终的主页内嵌这个正常的主页和播放音乐页面,所以需要在执行完cp -r ../myblog/_site/* .后再多两条命令:

cp ../myblog/index2.html .
cp ../myblog/index.html .

这两条语句可以达到效果是因为:

对应的上一个本地更新命令串:
cd /root/myblog && pkill jekyll;sleep 3 && cp index.html tmp.html && cp index_bak.html index.html && sh -c "rm -r _site/ & jekyll serve --watch & sleep 3 && exit" && cp _site/index.html index2.html && cp tmp.html index.html && echo congratulations! commands execute ok to here!
中已经将index.html变成最终内嵌两个html页面的需要的页面,且已经将index2.html变成正常情况下生成的页面,也即执行完本地更新命令串后,/root/myblog下的index.html和index2.html正是所需要拷贝到本地/root/3xp10it.github.io目录的两个文件


2>本地远程博客对应关系
本地/root/myblog对应github远程的myblog,本地的127.0.0.1:4000对应的是本地/root/myblog目录由本地执行jekyll --serve产生的网页效果
本地/root/3xp10it.github.io对应github远程的3xp10it.github.io,https://3xp10it.github.io对应的是github远程3xp10it.github.io由github服务器jekyll --serve产生的网页效果


3>快捷方式
vi ~/.bashrc
+alias upa="python /usr/share/up.py"
vi ~/.zshrc
+alias upa="sh /usr/shrae/up.sh"
```
