---
layout:     post
title:      安装macOS sierra要做的事
date:       2017-03-11
summary:    安装macOS sierra要做的事
categories: linux
tags:
- macOS
- sierra
---

### 0x00 About

```
实际操作系统:
    macOS sierra 10.12.3

关于本文:
    记录新安装macOS sierra配置合适工作环境所遇到的坑与解决办法
```

### 0x01 Detail

```
1.apple store下载安装xcode

2.安装howebrew,https://brew.sh/,如果无法安装,尝试连VPN后再安装,更多homebrew安装失败的问题可参考
https://www.zhihu.com/question/35928898

3.设置root用户可登录,https://support.apple.com/zh-cn/HT204012,以后用root登录(但是brew安装工具不让用root安装),需要
用brew安装工具时su - 普通用户 再安装

4.用root用户登录进行操作后发现root用户登录下mac app store无法打开(siri和ibooks也无法打开,这应该是macos的bug),如果
要安装常用的mac app store下的软件,可注销root用户,用普通用户登录后使用mac app store安装相关软件(eg.wechat)

5.mac apple store下载star vpn

6.安装须鼠管输入法,可完美解决vim的中英文自动切换的问题
    http://3xp10it.cc/vim/2017/05/19/vim中英文输入法自动切换完美方案/

7.下载keyboard maestro,设置打开terminal.app快捷键为command+r,要注意的是安装了keyboard maestro之后不要安装 
Karabiner-Elements,否则Karabiner-Elements会影响系统按键导致系统键盘修饰设置无效与keyboard maestro设置失效.
在Automator中新建一个服务,在文件夹上可以右键打开终端,关于终端的两个选项都可勾选上
keyboard maestro序列号http://www.orsoon.com/Mac/78329.html
如果曾经安装过keyboard maestro可导出配置再导入到新设备

8.tmux+zsh+MacVim
1)安装zsh
注意,安装zsh不能用brew安装,因为brew安装工具现在不支持用root用户来安装,如果要用brew来安装zsh,这样安装好的zsh一般位
于/usr/local/bin/zsh,这样的zsh的tab在root用户登录系统后无法补全,因为zsh是非root用户安装的,
用非root用户登录时tab才有补全的功能,但是习惯用root用户登录,这样tab没有补全功能,于是不用brew安装zsh,用系统自带的
/bin/zsh就好了
chsh -s /bin/zsh
https://github.com/robbyrussell/oh-my-zsh安装oh-my-zsh
https://github.com/3xp10it/.zshrc安装我的配置

2)安装tmux
https://github.com/tmux/tmux/releases下载最新release版本后安装,安装方法一般为:
./configure
make
make install
rm -r ~/tmux
https://github.com/3xp10it/.tmux安装我的配置

3)安装MacVim
安装MacVim是因为在macOS上安装vim有无法使用系统剪切板的问题
a)https://github.com/macvim-dev/macvim/releases/下载最新release版
b)在~/.zshrc中加入:
alias mvim='/Applications/MacVim.app/Contents/MacOS/Vim'
alias vim='mvim'
c)解决MacVim无法使用系统剪切板的问题
http://stackoverflow.com/questions/39645253/clipboard-failure-in-tmux-vim-after-upgrading-to-macos-sierra
Attention:
vim8下不用加set clipboard=unnamed
在.tmux.conf更新后要执行tmux kill-server,否则就算重启也没用
也即,要解决这个问题要做下面三步:
第一步:brew install reattach-to-user-namespace
第二步:在.tmux.conf中加入:
set -g default-shell $SHELL 
set -g default-command "reattach-to-user-namespace -l ${SHELL}"
第三步:tmux kill-server
d)https://github.com/3xp10it/.vimrc安装我的配置
e)让配置生效
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
:PlugInstall(!)[other cmds are like:PluginUpdate,PlugeinClean,PluginList]
f)安装YouCompleteMe
g)macOS caps键处理,将caps映射为按一下为esc,按住为ctrl,具体如下:
http://longhua.io/how-to-map-caps-lock-to-both-control-and-escape-in-macos-sierra.html
[https://imciel.com/2016/09/09/macos-sierra-capslock-escape/这个方法好像更好]

9.brew install wget

10.安装firefox,在firefox中:
1)恢复书签https://github.com/3xp10it/firefoxBookmarks
2)安装vimperator,并安装我的配置文件
  要将https://raw.githubusercontent.com/macvim-dev/macvim/master/src/MacVim/mvim文件存放到本地/usr/shrae/mvim,
  chmod +x /usr/share/mvim[如果不能放则要关闭macOS sierra的SIP]
  这样.vimperatorrc中的设置vimperator的编辑器为/usr/share/mvim才有效(这里的mvim与~/.zshrc中的mvim效果不同
  ,~/.zshrc中的mvim是为了在终端下用macvim,这里的/usr/share/mvim是为了在vimperator中ctrl+i时用MacVim作为Editor以
  gui形式出现)
  macvim因为macOS的原因,要在macvim的偏好设置中设置关闭最后一个macvim窗口时关闭macvim这个app,这样才能让
  vimperator在macvim编辑完firefox中的文本后回到firefox
3)安装插件:
s3 google translator
hackbar
...

11.让finder标题显示当前路径
defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES 
killall Finder

12.其他文件的恢复,git密码配置文件,pypi配置文件,jekyll博客环境等

13.设置快捷键
keyboard maestro设置:
打开finder快捷键为command+e
打开快速搜索快捷键为ctrl+s
打开终端iterm2为command+r
跳转到桌面设置为command+d
设置command+shift+h为command+up,可在finder中跳转到上一级目录
设置command+shitf+l为command+down,可在finder中跳转到下一级目录(这里不设置成command+l为command+down是因为
command+l是firefox中的跳转到url定位栏快捷键)
设置command+control+j为down,设置command+control+k为up,设置command+control+h为left,设置command+control+l为right
设置magnet的快捷键:
https://sspai.com/post/36983
shift+control+ikjl分别为上下左右,左上左下右上右下暂不设置,用得少
设置alfred的呼出键为double command

14.关闭macOS的SIP
https://www.igeeksblog.com/how-to-disable-system-integrity-protection-on-mac/
也即在恢复模式下终端运行:csrutil disable,然后重启

15.git命令error: RPC failed; curl 56 SSLRead() return error错误的解决办法:
--------------来自网上的可靠解决方法-----------
http://stackoverflow.com/questions/30385939/git-clone-fails-with-sslread-error-on-os-x-yosemite
也即:
brew remove git
brew remove curl
brew install openssl
brew install --with-openssl curl
brew install --with-brewed-curl --with-brewed-openssl git

error: RPC failed; curl 56 SSL read: error:00000000:lib(0):func(0):reason(0), errno54错误解决方法:
http://www.jianshu.com/p/4edd496229d5
也即:
1)在新mac系统上配置新ssh key
2)git config --global http.postBuffer 524288000
----------------end-----------------
试了上面的方法,遇到障碍,要解决升级openssl的问题,由于macOS默认的openssl在/usr/bin/openssl下,macOS系统中其他工具依
赖的openssl的路径为系统默认的/usr/bin/openssl,而brew安装的新版本的openssl的路径为/usr/local/bin/openssl[实际路径
为/usr/local/Cellar/openssl/1.0.2k/bin/openssl],于是执行以下操作:
-----------------my final solution:---------------
brew remove git
brew remove curl
brew install openssl[如果失败则--force]
mv /usr/bin/openssl /usr/bin/openssl_old[备份原来的openssl]
ln -s /usr/local/Cellar/openssl/1.0.2k/bin/openssl[这个实际路径有可能会随着时间变化] /usr/bin/openssl
brew install --with-openssl curl
brew install --with-brewed-curl --with-brewed-openssl git
到这里应该会发现git clone没有出现RPC failed,curl...的错误了,如果还有错误,则继续完成这里的操作http://www.jianshu.com/p/4edd496229d5
--------------------end-----------------------

16.安装Alfred,Go2Shell,1Password,cd to,appzapper
其中appzapper序列号如下:
Name: apple-go
Serial: APZP-103-97-215-111

17.设置一个备份计划任务,macOS用launchctl实现:
    cd /Library/LaunchDaemons
    vi macosbak.plist:
    ----------macosbak.plist---------
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
      <key>Label</key>
      <string>macosbak.plist</string>
      <key>ProgramArguments</key>
      <array>
          <string>/usr/share/mytools/macosbak.sh</string>
      </array>
      <key>StartCalendarInterval</key>
      <dict>
            <key>Minute</key>
            <integer>15</integer>
            <key>Hour</key>
            <integer>22</integer>
      </dict>
      <key>StandardOutPath</key>
    <string>/private/var/root/Documents/AutoMakeLog.log</string>
    <key>StandardErrorPath</key>
    <string>/private/var/root//Documents/AutoMakeLog.err</string>
    </dict>
    </plist>
    -------------end---------------
    launchctl load macosbak.plist

    表示每天22:15备份系统文件,有两个要注意的地方:
    1.运行脚本的地方不能直接写命令,不能写/bin/bash/usr/share/mytools/macosbak.sh,
    要写文件路径(也即/usr/shrae/mytools/macosbak.sh)
    2.这个文件事先要:
    chmod +x /usr/share/mytools/macosbak.sh
    3.更多细节可参考:
    http://honglu.me/2014/09/20/OSX系统添加定时任务/

    macosbak.sh可见:
    https://raw.githubusercontent.com/3xp10it/mytools/master/macosbak.sh

18.设置iterm2为终端,在iterm2的偏好设置中设置添加按键映射:
    command+shift+control+h为:send esc + [1;5D   实现左移一个单词功能
    command+shift+control+l为:send esc + [1;5C   实现右移一个单词功能
    可参考:
    http://apple.stackexchange.com/questions/154292/iterm-going-one-word-backwards-and-forwards

19.添加快速切换用户方法为(option+l)
    https://apple.stackexchange.com/questions/38390/is-there-a-shortcut-which-invokes-the-login-window-fast-user-switching-comm
    最后用的是:
    在keyboard maestro中添加一个快捷键(ctrl+shift+l)触发一个shell脚本,内容如下:
    /System/Library/CoreServices/Menu\ Extras/User.menu/Contents/Resources/CGSession -suspend

20.添加burpsuite到dock栏
    https://www.mattandreko.com/2014/08/01/burp-icon-in-osx/ 

21.安装https://github.com/ghawkgu/isHUD/blob/master/README_chs.md

22.https://github.com/3xp10it/AutoIM 解决在vim中英文输入法自动切换的问题

23.安装https://draculatheme.com/主题

24.使用fish(已在xPre.py中集成安装)

25.安装fzf(fzf的安装需要从github里面看,不能只在vimrc中BundleInstall)

26.安装autojump
```

### 0x02 快捷键

```
上面的配置得到可用的快捷键汇总如下:

常规:
command+r:打开终端
command+e:打开finder
command+s:快速打开搜索
option+l:打开登录窗口
command+control+h/j/k/l:分别对应左下上右键


终端下:
control|esc+b:左移一个单词(需要先按下control再释放control,再按下b)
control|esc+f:右移一个单词(需要先按下control再释放control,再按下f)
command+shift+control+h:左移一个单词
command+shift+control+l:右移一个单词
control+a:移到行首
control+e:移到行尾
control+h:向前删除一个字符
control+d:del光标后的一个字符 
control+w:剪切光标前一个单词
control+u:剪切光标前的内容
control+k:剪切光标后的内容
control+p:上一个命令
control+n:下一个命令
control+&:恢复被快捷键删除的内容
control+r:向前搜索运行过的命令
control+s:向后搜索运行过的命令
control+y:粘贴快捷键删除的内容
control+t:将当前光标下的字符与前一个字符互换

find中:
command+shift+h:上一层目录
command+shift+l:下一层目录
command+control+hjkl:箭头键

magnet:
shift+control+hjkl:屏幕放置

alfred:
呼出:double command

firefox:
J:打开左边的标签窗口
K:打开右边的标签窗口
ctrl+h:后退网页
ctrl+l:前进网页
mm:保存当前打开的页面并关闭firefox
ctrl+i:在文本框中打开vim编辑
```
