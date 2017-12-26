---
layout:     post
title:      ida通过usb调试ios下的app
date:       2017-12-25
summary:    ida通过usb调试ios下的app
categories: 二进制
tags:
 - ida
 - ipa
 - usbmuxd
---

### 0x0 必读
+ [macOS上编译ios程序][3]
+ [使用IDA调试iOS程序的步骤][4]
+ [ios usb调试][5]

### 0x1 About

#### 实验环境
+ iphone6s
+ ios9.0
+ macOS sierra
+ ida7.0

#### why
+ 对于ida来说,lldb不怎么样(lldb用户体验很一般)
+ wifi调试很慢,ida通过wifi调试不现实
+ ios9以上的[这个vmmap][1]不工作

#### 准备

+ [可用的vmmap][2]

>用上面这个链接中的源文件通过`xcrun -sdk iphoneos clang -arch armv7 -o [目标文件名] [源文件名]`生成iphone下可执行文件vmmap,编译后文件可在[这里][6]下载

+ usbmuxd

>`brew install usbmuxd`

#### 目的

使用ida调试一个ios下的app,找到关键上传步数的函数

### 0x2 Detail

```
手机上运行目标app:PALxxx
ssh root@iphone
Cluth -i
Cluth -d target_app_index
scp xxx.ipa user@macOS
ps aux | grep PAL*
vmmap target_app_pid
    iPhone:/share root# vmmap 2331
    2331: /private/var/mobile/Containers/Bundle/Application/08C3D11A-82ED-42AA-A975-089E825B7E29/PALifeApp.app/PALifeApp
    DYLD all image info: 0000000120098000+130 format=1
    read_from_task(0x16fdfbc78, 0x401): kr=1
    0000000100004000-0000000100008000 [    16K ] r-x/r-x SM=COW
        (offset 3190000) /private/var/mobile/Containers/Bundle/Application/08C3D11A-82ED-42AA-A975-089E825B7E29/PALifeApp.app/PALifeApp

    由此得出PALxxx的加载基址为0x100040000

macOS
ida加载ipa中的可执行文件PALxxx
    ida需要分析一段时间,大概10分钟(不分析完时很多函数无法找到)
在ida|edit|segments|program rebase中重新设置加载基址为0x1000c8000
    rebase需要一段时间,大概10分钟
iproxy 2222 2008

ssh root@iphone
debugserver *:2008 -a PALxxx
iphone连接电脑上的usb

ida设置远程gdb server(对应ios中的debugserver)调试,参数如下图
```

![远程gdb server设置](7)
![远程gdb server设置](8)

```
开始在ida中调试
在setIntegratedSteps函数上下断点
运行
```




[1]: http://www.newosxbook.com/src.jl?tree=listings&file=12-1-vmmap.c
[2]: https://github.com/comex/myvmmap/blob/master/myvmmap.c
[3]: http://zhoulingyu.com/2016/07/11/iOS攻防——（一）ssh登陆与交叉编译/
[4]: http://blog.csdn.net/proteas/article/details/78083512
[5]: http://blog.csdn.net/u011661836/article/details/61921308
[6]: https://github.com/3xp10it/mytools/vmmap
[7]: https://raw.githubusercontent.com/3xp10it/pic/master/remote_gdb1.png
[8]: https://raw.githubusercontent.com/3xp10it/pic/master/remote_gdb2.png
