---
layout:     post
title:      Use github and jekyll start github pages
date:       2016-04-09
summary:    how to use github and jekyll to start github pages in my blog
categories: jekyll
thumbnail: jekyll
tags:
 - html
---

# 0x01 useful links to learn 

```
https://www.zhihu.com/question/20223939
https://github.com/jacobtomlinson/carte-noire
https://www.tuicool.com/articles/RZbEV3
https://help.github.com/articles/configuring-jekyll/
https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/
https://jekyllrb.com/docs/github-pages/#project-page-url-structure
https://jekyllcn.com/
https://learnetto.com/blog/tutorial-how-to-host-your-websites-for-free-using-github-pages
https://www.jimmylauzau.com/blog/2016/03/23/the-awesomeness-that-is-github-pages
https://pikipity.github.io/blog/kramdown-syntax-chinese-1.html   kramdown语法
https://pikipity.github.io/blog/kramdown-syntax-chinese-2.html   kramdown语法
https://platinhom.gitcafe.io/2015/11/06/Kramdown-note/           kramdown语法
https://ruby-china.org/topics/14005                     web中文字体应用指南(i use 文泉驿等宽正黑 )
https://platinhom.github.io/2015/06/06/Markdown-note/    kramdown-note
```

From those links,I learned those steps(assume with jekyll installed): 

# 0x02 Steps

#### 1>gem install github-pages(very important)

#### 2>jekyll new myblog

#### 3>git clone https://github.com/jacobtomlinson/carte-noire.git

#### 4>cp carte-noire/\*/ myblog

#### 5>vim myblog/css/style.scss(my modified style.scss file in the below)
```
https://raw.githubusercontent.com/3xp10it/blog_backup/master/css/style.scss
>however,I do not know how to change highlight code block's font,I tried to make it by modifying css file,it did not work,till now the font of code block looks ugly.  
```

#### 6>vim myblog/\_posts/2016-04-09-github-jekyll-blog.md

#### 7>jekyll serve --watch(this command will build a \_site folder)

#### 8>create a new repository in github:3xp10it.github.io

#### 9>cd myblog/\_sites && git init && git add . && git commit -a -m "my blog v1"

#### 10>git remote add origin https://github.com/3xp10it/3xp10it.github.io.git

#### 11>push -u origin master

#### 12>succeed-->http://3xp10it.github.io

# 0x03 Update articles

*Notice*,we need not to checkout \--orphan gh-pages like some blogs telled us to ,a master branch is enough to do it.There is a .gitignore file in myblog/.gitignore (copied from carte-noire) which ignores \_sites folder when git myblog/ to github as a blog_backup
(https://github.com/3xp10it/blog_backup).From then on,when I update new articles,I could only update 3xp10it.github.io repository,and take blog_badkup repository as a backup on github.So,later if I need add new article to 3xp10it.github.io,I will do:


```
vim myblog/_posts/newarticle.md(file name in 201x-0x-0x-xxx-xxx.md format)
cd myblog
rm -r _site
jekyll serve --watch(or jekyll build,jekyll serve contains jekyll build function)
mkdir ../tmp
cd ../tmp
git init
git pull https://github.com/3xp10it/3xp10it.github.io.git
cp -r ../myblog/_site/* .
git status
git add .
git commit -a -m "update articles"
git remote add origin https://github.com/3xp10it/3xp10it.github.io.git
git push -u origin master
rm -r ../tmp
```

# 0x04 Update
<h2>16-04-13</h2>
<h4>>>>finally I find how to change the font-family in the code block to make code block looks beautiful,not ugly any longer. 1,2,3 arrows in below pic show the process to find how to change the code block font.Firstly,move mouse's arrow to any code block like arrow 1 in below pic,and right click mouse to chose "use firebug to view elements".Secondly,left click mouse on the words like arrow 2 in below pic,and move mouse on "font-family",then I find it's "monospace",and the source css file is from "\_includes\head.html",the value is href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bbbbootstrap.min.css",download it to local css directory and rename it my_code.css,change \_includes\head.html to set the value to "../../../../../css/my_code.css".Finally,change monospace to "文泉驿等宽正黑" where needed in my_code.css </h4>
<img src='../../../../../pic/jekyll/code_block_font.png'>
<br>
<h2>16-04-13</h2>
<h4>>>>when I finished till this moment,I try to use my cell phone to visit http://3xp10it.github.io,find my cell phone without vpn can not open http://3xp10it.github.io.Later,I search the blog file to figure out the wrong source,get style.scss has three "@import url(https://googleapi....)",then I download the three css file from https://googleapi... ,rename them and change it to "@import url("1.css")",then I tried to visit http://3xp10it.github.io again with my cell phone,the result was fantastic! Very fast to browse it without vpn!</h4>
<h2>16-04-15</h2>
<h4>>>>finally I find how to change the html's templet to make the htmls be my own style,analyse the templet like below pic:</h4>
<img src="https://raw.githubusercontent.com/3xp10it/pic/master/jekyll/default.png">
<h4>tips:</h4><br>
1>@media:

```
in css/style.scss file,when my screen is large screen,if there is no lg attribute in @media parameters but has sm(small) attribute or other attribute belongs to @media,the result will follow sm value or other attribute of @media  
```
<br>
2>css/style.scss: 

```
 .index -> 1000px -> decide index.html's width
 .article -> @media -> width:50% margin-left:25%   -> decide post.html's width
```
3>to modify html:

```
the best way is: use firebug to view element and find css file belongs to the html,then modify it  
```

4>col-md-12,col-md-6 col-md-6,col-md-1 col-md-11
<h2>16-04-17</h2>
<h4>1>添加背景音乐并实现切换页面时音乐连续不重播</h4>

```
to achieve this function:
cd myblog
cp index.html index_bak.html
jekyll serve --watch
cp _\_site/index.html index2.html
vi bgmusic.html
--------------content--------------
   <html>
   <embed src="list.m3u" autostart="true" volume="50" loop="true" height="1" width="1"></embed> 
   </html>
--------------content-------------
vi list.m3u
--------------content-------------
https://raw.githubusercontent.com/3xp10it/music/master/my%20will.mp3
https://raw.githubusercontent.com/3xp10it/music/master/%E5%B7%B4%E8%B5%AB%E6%97%A7%E7%BA%A6.mp3
https://raw.githubusercontent.com/3xp10it/music/master/with%20you.mp3
https://raw.githubusercontent.com/3xp10it/music/master/every%20heart.mp3
https://raw.githubusercontent.com/3xp10it/music/master/%E4%B8%8D%E5%88%86%E6%89%8B%E7%9A%84%E6%81%8B%E7%88%B1.mp3
https://raw.githubusercontent.com/3xp10it/music/master/%E9%A3%8E%E5%BA%A6.mp3
https://raw.githubusercontent.com/3xp10it/music/master/%E6%A1%83%E8%8A%B1%E6%89%87.mp3
https://raw.githubusercontent.com/3xp10it/music/master/%E4%B8%89%E5%9B%BD%E6%9D%80.mp3

--------------content-------------
vi index.html
--------------content-------------
   <html>
   <frameset rows="100%,*">
    <frame src="index2.html"></frame>
    <frame src="bgmusic.html"></frame>
   </frameset>
   </html>
--------------content-------------

```

<h4>2>update blog command</h4>

```
cd myblog
vi _posts/newblog.md(filename format eg.2016-01-01-xx.md)
mv index.html tmp.html
cp index_bak.html index.html
------open another terminal------
rm -r _site/
jekyll serve --watch
------above in the terminal------
cp _site/index.html index2.html
mv tmp.html index.html

or just:("ifconfig &" means let command "ifconfig" running in background)

cd myblog
vi _posts/newblog.md(filename format eg.2016-01-01-xx.md)
pkill jekyll
cp index.html tmp.html && cp index_bak.html index.html && sh -c "rm -r _site/ & jekyll serve --watch & sleep 3 && exit" && cp _site/index.html index2.html && cp tmp.html index.html
```

*notice*:

```
main command:
cp index.html tmp.html && cp index_bak.html index.html && sh -c "rm -r _site/ & jekyll serve --watch & sleep 3 && exit" && cp _site/index.html index2.html && cp tmp.html index.html
in main command start a sh subcommond: 
sh -c "rm -r _site/ & jekyll serve --watch & sleep 3 && exit" 
1.this subcommond is started by the main commond in the gnome-terminal,"exit" only means exit the main command from a gnome-terminal
2.though the gnome-terminal is closed,the "jekyll serve --watch" in the subcommand still works.This may be caused by the special command of jekyll,jekyll command may start a system background commnad.So after the main commnd,there is always a "jekyll serve --watch" running in the background
3.if I need to update some articles,I should exucete "pkill jekyll" and then execute the main command again,otherwise I will get a address and port bind twice error
```

so the final update comannds are:

```
cd myblog
vi _posts/newblog.md

A plan:
pkill jekyll
cp index.html tmp.html && cp index_bak.html index.html && sh -c "rm -r _site/ & jekyll serve --watch & sleep 3 && exit" && cp _site/index.html index2.html && cp tmp.html index.html && echo congratulations! commands execute ok to here!
B plan!!!:
pkill jekyll && cp index.html tmp.html && cp index_bak.html index.html && sh -c "rm -r _site/ & jekyll serve --watch & sleep 3 && exit" && cp _site/index.html index2.html && cp tmp.html index.html && echo congratulations! commands execute ok to here!

A plan:
    mkdir ../tmp
    cd ../tmp
    git init
    git pull https://github.com/3xp10it/3xp10it.github.io.git
    cp -r ../myblog/_site/* .
    git status
    git add .
    git status
    git commit -a -m "update articles"
    git remote add origin https://github.com/3xp10it/3xp10it.github.io.git
    git push -u origin master
    rm -r ../tmp
B plan!!!:
mkdir ../tmp && cd ../tmp && git init && git pull https://github.com/3xp10it/3xp10it.github.io.git && cp -r ../myblog/_site/* . && git status && git add . && git status && git commit -a -m "update articles" && git remote add origin https://github.com/3xp10it/3xp10it.github.io.git && git push -u origin master && rm -r ../tmp && echo ok

```

<h2>16-04-19</h2>
<h4 style="color:red">实现每次进入主页后循环随机播放背景音乐</h4>
1>原来bgmusic.html代码如下:

```html
<html>
<embed src="list.m3u" autostart="true" volume="50" loop="true" height="1" width="1">
</html>
```

2>换成如下代码,将原bgmusic.html废弃,另存为bgmusic.html.version1,同目录下list.m3u文件也废弃

```html
<html>
<audio id="myaudio"></audio>
<script language="javascript">
var list=new Array()
list[0]="https://raw.githubusercontent.com/3xp10it/music/master/my%20will.mp3";
list[1]="https://raw.githubusercontent.com/3xp10it/music/master/%E5%B7%B4%E8%B5%AB%E6%97%A7%E7%BA%A6.mp3";
list[2]="https://raw.githubusercontent.com/3xp10it/music/master/with%20you.mp3";
list[3]="https://raw.githubusercontent.com/3xp10it/music/master/every%20heart.mp3";
list[4]="https://raw.githubusercontent.com/3xp10it/music/master/%E4%B8%8D%E5%88%86%E6%89%8B%E7%9A%84%E6%81%8B%E7%88%B1.mp3";
list[5]="https://raw.githubusercontent.com/3xp10it/music/master/%E9%A3%8E%E5%BA%A6.mp3";
list[6]="https://raw.githubusercontent.com/3xp10it/music/master/%E6%A1%83%E8%8A%B1%E6%89%87.mp3";
list[7]="https://raw.githubusercontent.com/3xp10it/music/master/%E4%B8%89%E5%9B%BD%E6%9D%80.mp3";
list[8]="https://raw.githubusercontent.com/3xp10it/music/master/%E6%88%90%E9%BE%99%E3%80%81%E9%87%91%E5%96%9C%E5%96%84%20-%20%E7%BE%8E%E4%B8%BD%E7%9A%84%E7%A5%9E%E8%AF%9D.mp3";
list[9]="https://raw.githubusercontent.com/3xp10it/music/master/%E9%A3%8E%E4%BA%91%20-%20%E9%9B%84%E9%9C%B8%E5%A4%A9%E4%B8%8B%20-%20%E6%B0%B8%E8%BF%9C%E6%B0%B8%E8%BF%9C.mp3";
list[10]="https://raw.githubusercontent.com/3xp10it/music/master/%E5%8F%A4%E5%A4%A9%E4%B9%90%20-%20%E7%A5%9E%E9%9B%95%E4%BE%A0%E4%BE%A3%E4%B8%BB%E9%A2%98%E6%9B%B2.mp3";
list[11]="https://raw.githubusercontent.com/3xp10it/music/master/%E9%AC%BC%E6%9D%9F%E5%8D%83%E5%AF%BB%20-%20%E6%9C%88%E5%85%89%20-%20%E6%97%A5%E6%9C%AC%E7%BB%8F%E5%85%B8%E7%88%B1%E6%83%85%E7%94%B5%E8%A7%86%E5%89%A7%E4%B8%BB%E9%A2%98%E6%9B%B2.mp3";
list[12]="https://raw.githubusercontent.com/3xp10it/music/master/%E5%81%87%E5%A6%82%E7%88%B1%E6%9C%89%E5%A4%A9%E6%84%8F%20More%20Than%20Love.mp3";
list[13]="https://raw.githubusercontent.com/3xp10it/music/master/%E9%87%91%E8%8E%8E%20-%20%E6%98%9F%E6%9C%88%E7%A5%9E%E8%AF%9D.mp3";
list[14]="https://raw.githubusercontent.com/3xp10it/music/master/%E6%9D%8E%E6%85%A7%E7%8F%8D%20-%20%E7%88%B1%E6%AD%BB%E4%BA%86%E6%98%A8%E5%A4%A9.mp3";
list[15]="https://raw.githubusercontent.com/3xp10it/music/master/%E5%88%98%E6%AC%A2%20-%20%E6%88%91%E6%AC%B2%E6%88%90%E4%BB%99.mp3";
list[16]="https://raw.githubusercontent.com/3xp10it/music/master/%E6%AF%9B%E9%98%BF%E6%95%8F%20-%20%E7%9B%B8%E6%80%9D.mp3";
list[17]="https://raw.githubusercontent.com/3xp10it/music/master/%E9%9D%92%E9%B8%9F%E9%A3%9E%E9%B1%BC-%E6%AD%A4%E7%94%9F%E4%B8%8D%E6%8D%A2.mp3";
list[18]="https://raw.githubusercontent.com/3xp10it/music/master/%E5%AD%99%E6%A5%A0%E9%9F%A9%E7%BA%A2%E7%BE%8E%E4%B8%BD%E7%9A%84%E7%A5%9E%E8%AF%9D.mp3";
list[19]="https://raw.githubusercontent.com/3xp10it/music/master/%E5%90%B4%E5%A5%87%E9%9A%86%20-%20%E8%BD%AC%E5%BC%AF.mp3";
list[20]="https://raw.githubusercontent.com/3xp10it/music/master/%E5%90%B4%E9%9B%A8%E9%9C%8F%20-%20%E7%94%9F%E7%94%9F%E4%B8%96%E4%B8%96%E7%88%B1.mp3";
list[22]="https://raw.githubusercontent.com/3xp10it/music/master/%E6%9C%88%E5%85%89.mp3";
list[23]="https://raw.githubusercontent.com/3xp10it/music/master/%E5%BC%A0%E5%85%8B%E5%B8%86%20-%20%E7%BB%9D%E4%B8%96.mp3";
list[24]="https://raw.githubusercontent.com/3xp10it/music/master/%E5%AD%99%E6%A5%A0%E9%9F%A9%E7%BA%A2%E7%BE%8E%E4%B8%BD%E7%9A%84%E7%A5%9E%E8%AF%9D.mp3";
var currentFile=list[parseInt(Math.random()*24)];
/*document.write("<html><br>"+'<audio src=' + '"' + list[a] + '"' + ' controls="controls" autoplay="autoplay"' + '>'+'</audio><br></html>');*/
var oAudio = document.getElementById('myaudio');
oAudio.src = currentFile;
oAudio.play();
oAudio.onended = function() {
currentFile=list[parseInt(Math.random()*24)];
oAudio.src = currentFile;
oAudio.play();
}
</script>
</html>
```

3>*Notice*

```
 1>>经过试验发现:上面的javascript中只能用<audio>标签,不能用<embed>标签
 2>>document.write方法似乎只能用一次,所以最后不用document.write的代码(上面/*...*/中的代码)
 3>>上面的javascript中可firefox,chrome都实现播放音乐列表功能,且可以实现随机播放,原来的<embed>标签加m3u文件的代码只能firefox下播音乐列表,且不能随机播放
```

<h2>16-05-21</h2>
<h4 style="color:red">简化每次更新操作</h4>
1>在本地myblog目录下新建updatelocal.sh实现本地文件更新:

```
pkill jekyll;sleep 3 && cp index.html tmp.html && cp index_bak.html index.html && sh -c "rm -r _site/ & jekyll serve --watch & sleep 3 && exit" && cp _site/index.html index2.html && cp tmp.html index.html && echo congratulations! commands execute ok to here!
```

2>在本地myblog目录下新建updateremote.sh实现git远程文件文件更新:

```
mkdir ../tmp && cd ../tmp && git init && git pull https://github.com/3xp10it/3xp10it.github.io.git && cp -r ../myblog/_site/* . && git status && git add . && git status && git commit -a -m "update articles" && git remote add origin https://github.com/3xp10it/3xp10it.github.io.git && git push -u origin master && rm -r ../tmp && echo congratulations! commands execute ok to here!
```

3>在本地myblog目录下新建updateall.sh实现本地和远程的文件更新

```
pkill jekyll;sleep 3 && cp index.html tmp.html && cp index_bak.html index.html && sh -c "rm -r _site/ & jekyll serve --watch & sleep 3 && exit" && cp _site/index.html index2.html && cp tmp.html index.html && echo congratulations! commands execute ok to here!
mkdir ../tmp && cd ../tmp && git init && git pull https://github.com/3xp10it/3xp10it.github.io.git && cp -r ../myblog/_site/* . && git status && git add . && git status && git commit -a -m "update articles" && git remote add origin https://github.com/3xp10it/3xp10it.github.io.git && git push -u origin master && rm -r ../tmp && echo congratulations! commands execute ok to here!
```

<h2>16-07-28</h2>
<h4 style="color:red">简化每次更新操作</h4>
4>在本地myblog目录下新建updatebak.sh实现远程博客备份

```
mkdir ../tmp && cd ../tmp && git init && git pull https://github.com/3xp10it/blog_backup.git && cp -r ../myblog/* . && git status && git add . && git status && git commit -a -m "update blog_backup" && git remote add origin https://github.com/3xp10it/blog_backup.git && git push -u origin master && rm -r ../tmp && echo congratulations! commands execute ok to here!
```

<h2>16-07-30</h2>
<h4 style="color:red">简化每次更新操作</h4>
5>简化以上所有更新操作并实现换电脑快速还原github上博客至本地

```
最新更新方法见下面文章链接
```
<a href="http://3xp10it.github.io/jekyll/2016/07/30/update-blog-update-script/">文章链接</a>

