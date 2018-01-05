---
layout:     post
title:      backup files
date:       2016-04-15
summary:    backup some setup files:firebug bookmark,vimrc file,sublime text setup file
categories: backup
tags:
 - firefox
 - backup
 - vim
 - sublime
---
1>firefox extensions list
![extension](https://raw.githubusercontent.com/3xp10it/pic/master/backup/extension.png)

2>sublime text setup file  

```
https://pan.baidu.com/s/1o7Tyha6
```

3>firefox bookmarks

```
[2017-02-25]
https://github.com/3xp10it/firefoxBookmarks

history:
https://pan.baidu.com/s/1jHCBs6y
```

4>vimrc and bundles of vim

```
https://pan.baidu.com/s/1slFveFF
update:2016-06-07

update:16-08-02
two steps
a>do as github's vim do
b>add my special vimrcbak file below to ~/.vimrc 's first head lines
    https://pan.baidu.com/s/1gfG1bm7
   https://pan.baidu.com/s/1hsbKyUS

----------------lines add to .vimrc-----------------
let g:spf13_edit_config_mapping='<Leader>ev'
let g:spf13_apply_config_mapping='<Leader>sv'
set rtp+=/root/.local/lib/python2.7/site-packages/powerline/bindings/vim
au InsertLeave * write
au BufLeave * write
if exists("&autoread")
    set autoread
endif

set viminfo='10,\"100,:20,%,n~/.viminfo
au BufReadPost * if line("'\"") > 0|if line("'\"") <= line("$")|exe("norm '\"")|else|exe "norm $"|endif|endif


set ruler
imap fj <esc>
cmap fj <esc>
cmap jf <esc>
imap jf <esc>
map ; :
map <s-;> ;
map sy "+y
map sp "+p
map mm ZZ

nnoremap <buffer> <F9> :exec '!python' shellescape(@%, 1)<cr>
function CheckPythonSyntax()
    let mp = &makeprg
    let ef = &errorformat
    let exeFile = expand("%:t")
    setlocal makeprg=python\ -u
    set efm=%C\ %.%#,%A\ \ File\ \"%f\"\\,\ line\ %l%.%#,%Z%[%^\ ]%\\@=%m
    silent make %
    copen
    let &makeprg     = mp
    let &errorformat = ef
endfunctio

map <F5> :call CheckPythonSyntax()<CR>



au BufRead *.md call Biaodian() <CR>

map <F2> :call Biaodian() <CR>
function Biaodian()
    %s/"/"/g
    %s/"/"/g
    %s/,/,/g
    %s/././g
    %s/?/?/g
    %s/</</g
    %s/>/>/g
    %s/(/(/g
    %s/)/)/g
    %s/:/:/g
    %s/;/;/g
    %s/'/'/g
    %s/'/'/g
    %s/!/!/g
    endfunction
------------------------end-------------------------

```

5>zshrc

```
update:16-08-02
do as notes do and then copy the .zshrc file below:
https://pan.baidu.com/s/1mi0HKYO

---------------.zshrc-----------------
export ZSH=$HOME/.oh-my-zsh
ZSH_THEME="random"
plugins=(git)
export PATH=$HOME/bin:/usr/local/bin:$PATH
source $ZSH/oh-my-zsh.sh

alias ll='ls -al'
alias la='ls -A'
alias l='ls -CF'
alias vi='vim'
alias 2sqlmap='cd /usr/share/sqlmap'
alias 2tamper='nautilus /usr/share/sqlmap/tamper'
alias pg='ping www.google.com.hk'
alias pb='ping www.baidu.com'
alias 2output='nautilus /root/.sqlmap/output' 
alias 2images='nautilus /usr/share/images'
alias 2tamper1='cd /usr/share/sqlmap/tamper'
alias Cknife='java -jar /usr/share/Cknife/Cknife.jar'
alias vs='vim /root/myblog/_posts/2016-04-15-My-notes.md'
alias z='cd /root/桌面'
alias d='cd /root/Desktop'
export WORKON_HOME=~/.virtualenvs
export PATH="$PATH:/phpstudy/mysql"
alias v="vim /root/tmp.txt"
alias c="rm ~/.vimswap/tmp.txt.swp"
alias b='cd /root/myblog'
alias p='cd /root/myblog/_posts && ls -lh'
alias 2tamper="cd /usr/share/sqlmap/tamper && ls -al"
echo "ifconfig" | /usr/bin/zsh | head -n 10 | awk '{print $2}' | awk '{print $0}' | head -n 2 | tail -n 1
alias mt="cd ~/mytools && ls -al"
alias jt="python ~/mytools/mysnippingtool.py"
alias upa="bash ~/mytools/up.sh"
alias ubuntubak="bash ~/mytools/ubuntubak.sh"
alias bl="python ~/mytools/blog.py"
alias sm="sqlmap --smart --threads 4 --random-agent -v 3 --batch -u "
alias smt="sqlmap --smart --threads 4 --random-agent -v 3 --batch --tamper='randomcase,between,space2dash' -u "
alias smc="sqlmap --smart --threads 4 --random-agent -v 3 --batch --crawl=3 -u "
alias smct="sqlmap --smart --threads 4 --random-agent -v 3 --batch --crawl=3 --tamper='randomcase,between,space2dash' -u "
alias ns="python ~/mytools/newscript.py"
#alias upl="b && sh updatelocal.sh"
#alias upr="b && sh updateremote.sh"
#alias upb="b && sh updatebak.sh"
eval $(thefuck --alias)

tmux
alias od='echo "anything" | (tmux splitw -h -p 38 && tmux splitw -v -p 30 && tmux selectp -L && tmux splitw -v -p 30 && tmux selectp -U) && ranger'
-----------------end------------------

```

6>tmux

```
old:https://pan.baidu.com/s/1kVyETT1

new:update at 16-08-02

apt-get install tmux
do as notes do to download some good conf file,then add the below my own special setting to conf file

set-window-option -g mode-keys vi #可以设置为vi或emacs
set-window-option -g utf8 on #开启窗口的UTF-8支持
set-option -g status-utf8 on
set -g default-shell /bin/zsh
set -g default-command /bin/zsh
unbind-key 0
unbind-key 1
unbind-key 2
unbind-key 3
unbind-key 4
bind 1 select-pane -t:.1
bind 2 select-pane -t:.2
bind 3 select-pane -t:.3
bind 4 select-pane -t:.4
```

7>vim+zshrc+tmux

```
https://pan.baidu.com/s/1o8QZdqi
```
