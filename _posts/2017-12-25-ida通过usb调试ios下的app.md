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

ida调试ios app有两种方法

+ 方法一:ida设置使用remote gdb debug server
    + 可通过wifi或usb调试,使用usb更快
    + 通过附加(attach)到已经运行的ios app来调试
    + 调试前需人工rebase program
+ 方法二:ida设置使用remote ios debug server
    + 通过usb调试
    + 通过加载(app未运行时)未运行的ios app来调试
    + 调试前需人工rebase program

#### 方法一

```
手机上运行目标app:PALxxx
ssh root@iphone
Cluth -i
Cluth -d target_app_index
scp xxx.ipa user@macOS
ps aux | grep PAL*
vmmap target_app_pid
    2771: /private/var/mobile/Containers/Bundle/Application/08C3D11A-82ED-42AA-A975-089E825B7E29/PALifeApp.app/PALifeApp
    DYLD all image info: 0000000120034000+130 format=1
    read_from_task(0x16fd3bc78, 0x401): kr=1
    00000001000c4000-00000001000c8000 [    16K ] r-x/r-x SM=COW
        (offset 3190000) /private/var/mobile/Containers/Bundle/Application/08C3D11A-82ED-42AA-A975-089E825B7E29/PALifeApp.app/PALifeApp

    由此得出PALxxx的加载基址为0x1000c4000

macOS
ida加载ipa中的可执行文件PALxxx
    ida需要分析一段时间,大概10分钟(不分析完时很多函数无法找到)
在ida|edit|segments|program rebase中重新设置加载基址为0x1000c8000
    rebase需要一段时间,大概10分钟,如果考虑等的时间太长可尝试去除app的aslr属性,然后重新安装到手机上再调试,去除aslr属性未尝试
iphone连接电脑上的usb
    如果因为连接了usb导致下面无法用gdb server调试(有时连接上usb后ida只会有使用remote ios debuger的选项)则需要先拔掉usb,等选择完设置gdb server调试后再连接上usb
iproxy 2222 2008

ssh root@iphone
debugserver *:2008 -a PALxxx

ida设置远程gdb server(对应ios中的debugserver)调试,参数如下图
```

![远程gdb server设置](7)
![远程gdb server设置](8)

```
开始在ida中调试
在setIntegratedSteps函数上下断点
运行
命中断点后设置trace functions
在手机上点击上传步数
```

#### 方法二

```
iphone连上macOS的usb
ida加载PALxxx
在ida中选择remote ios debugger,并设置好symbols和iphone中的app可执行文件的路径
    symbols可在~/ Library / Developer / Xcode / iOS DeviceSupport / <iOS version> / Symbols或通过ios_deploy获得
    app可执行文件路径可在iphone中通过find / -name "PALxxx"获得
开始在ida中调试

在setIntegratedSteps函数上下断点
运行
命中断点后设置trace functions
在手机上点击上传步数
```

上面2种方法trace到关键函数如下:

```
000611FC	__text:-[PARSPedometerInfo setIntegratedSteps:]+C	RET	-[PARSPedometerInfo setIntegratedSteps:] returned to -[PARSPedometerInfo setIntegratedSteps:]-[PARSHealthKitHandler parseStepCountStatistics:]+33C
000611FC	__text:-[PARSHealthKitHandler parseStepCountStatistics:]+340	BL              _objc_release	-[PARSHealthKitHandler parseStepCountStatistics:] call -[PARSHealthKitHandler parseStepCountStatistics:]_objc_release
000611FC	__text:-[PARSHealthKitHandler parseStepCountStatistics:]+348	BL              _objc_release	-[PARSHealthKitHandler parseStepCountStatistics:] call -[PARSHealthKitHandler parseStepCountStatistics:]_objc_release
000611FC	__text:-[PARSHealthKitHandler parseStepCountStatistics:]+358	BL              _objc_msgSend	-[PARSHealthKitHandler parseStepCountStatistics:] call -[PARSHealthKitHandler parseStepCountStatistics:]_objc_msgSend
000611FC	__text:-[PARSHealthKitHandler parseStepCountStatistics:]+360	BL              _objc_retainAutoreleasedReturnValue	-[PARSHealthKitHandler parseStepCountStatistics:] call -[PARSHealthKitHandler parseStepCountStatistics:]_objc_retainAutoreleasedReturnValue
000611FC	__text:-[PARSHealthKitHandler parseStepCountStatistics:]+378	BL              _objc_msgSend	-[PARSHealthKitHandler parseStepCountStatistics:] call -[PARSHealthKitHandler parseStepCountStatistics:]_objc_msgSend
000611FC	__text:-[PARSHealthKitHandler parseStepCountStatistics:]+380	BL              _objc_release	-[PARSHealthKitHandler parseStepCountStatistics:] call -[PARSHealthKitHandler parseStepCountStatistics:]_objc_release
000611FC	__text:-[PARSHealthKitHandler parseStepCountStatistics:]+388	BL              _objc_release	-[PARSHealthKitHandler parseStepCountStatistics:] call -[PARSHealthKitHandler parseStepCountStatistics:]_objc_release
```


[1]: http://www.newosxbook.com/src.jl?tree=listings&file=12-1-vmmap.c
[2]: https://github.com/comex/myvmmap/blob/master/myvmmap.c
[3]: http://zhoulingyu.com/2016/07/11/iOS攻防——(一)ssh登陆与交叉编译/
[4]: http://blog.csdn.net/proteas/article/details/78083512
[5]: http://blog.csdn.net/u011661836/article/details/61921308
[6]: https://github.com/3xp10it/mytools/vmmap
[7]: https://raw.githubusercontent.com/3xp10it/pic/master/remote_gdb1.png
[8]: https://raw.githubusercontent.com/3xp10it/pic/master/remote_gdb2.png
