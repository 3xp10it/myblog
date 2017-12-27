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

    由此得出PALxxx此次加载基址为0x1000c4000

macOS
ida加载ipa中的可执行文件PALxxx
    ida需要分析一段时间,大概10分钟(不分析完时很多函数无法找到),如果想尝试加速分析过程,可参考:https://reverseengineering.stackexchange.com/questions/12485/ida-slow-on-70mb-executable,也即将所有窗口关闭,只保留output窗口
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
ssh root@iphone_ip
ps aux | grep PAL*
vmmap target_app_pid
找到加载基址后在ida|edit|segments|program rebase中重新设置加载基址
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

尝试用[funcap][9]插件获得parseStepCountStatistics函数的参数及返回值,发现funcap不支持arm的64位的cpu,ios设备cpu类型在[这里][10]于是用theos来记录,发现theos没有成功记录到parseStepCountStatistics函数的运行函数及返回值,说明关键函数不是这个函数,也即ida没有成功记录到关键的上传步数的函数,目前不理解为什么ida的trace功能为什么没有记录到这个关键函数.现在只好通过flex_injected来通过UI来分析出关键函数

flex_injected查看关键上传按钮对应的UI类,如下图依次找到对应按钮的类(PARSHealthPedometer10thHomeViewController)与点击按钮对应的函数(walkUploadBtnClick)

![上传按钮](11)
![按钮对应类](12)
![按钮对应函数](13)

从ida中查看walkUploadBtnClick函数的具体实现,内容如下:

```
void __cdecl -[PARSHealthPedmoterHomeViewController walkUploadBtnClick:](PARSHealthPedmoterHomeViewController *self, SEL a2, id a3)
{
  PARSHealthPedmoterHomeViewController *v3; // x28
  PARSActivityDetailModel *v4; // x0
  void *v5; // x0
  void *v6; // x19
  void *v7; // x0
  __int64 v8; // x20
  void *v9; // x0
  __int64 v10; // x21
  void *v11; // x0
  __int64 v12; // x25
  struct objc_object *v13; // x0
  void *v14; // x0
  void *v15; // x19
  void *v16; // x0
  void *v17; // x0
  void *v18; // x26
  void *v19; // x0
  __int64 v20; // x21
  struct objc_object *v21; // x0
  void *v22; // x26
  PARSActivityDetailModel *v23; // x0
  void *v24; // x0
  void *v25; // x27
  void *v26; // x0
  __int64 v27; // x0
  __int64 v28; // x23
  void *v29; // x0
  __int64 v30; // x0
  __int64 v31; // x19
  void *v32; // x0
  void *v33; // x22
  struct objc_object *v34; // x0
  void *v35; // x0
  void *v36; // x19
  void *v37; // x0
  void *v38; // x23
  void *v39; // x0
  void *v40; // x24
  void *v41; // x0
  void *v42; // x25
  struct objc_object *v43; // x0
  void *v44; // x19
  int v45; // w28
  int v46; // w27
  unsigned int v47; // w0
  PARSHealthPedmoterHomeViewController *v48; // [xsp+18h] [xbp-58h]

  v3 = self;
  +[PARSDataAnalyticTrackTouch cacheCurrentPoint](&OBJC_CLASS___PARSDataAnalyticTrackTouch, "cacheCurrentPoint", a3);
  v4 = -[PARSHealthPedmoterHomeViewController activity](v3, "activity");
  v5 = (void *)objc_retainAutoreleasedReturnValue(v4);
  v6 = v5;
  v7 = objc_msgSend(v5, "activityId");
  v8 = objc_retainAutoreleasedReturnValue(v7);
  objc_release(v6);
  v9 = objc_msgSend(&OBJC_CLASS___NSString, "stringWithFormat:", CFSTR("49902-%@"), v8);
  v10 = objc_retainAutoreleasedReturnValue(v9);
  v11 = objc_msgSend(&OBJC_CLASS___NSString, "stringWithFormat:", CFSTR("4990201-%@"), v8);
  v12 = objc_retainAutoreleasedReturnValue(v11);
  +[PADataAnalytic trackEvent:label:](&OBJC_CLASS___PADataAnalytic, "trackEvent:label:", v10, v12);
  objc_release(v12);
  objc_release(v10);
  v13 = +[PARSUserManager sharedManager](&OBJC_CLASS___PARSUserManager, "sharedManager");
  v14 = (void *)objc_retainAutoreleasedReturnValue(v13);
  v15 = v14;
  v16 = objc_msgSend(v14, "currUserInfo");
  v17 = (void *)objc_retainAutoreleasedReturnValue(v16);
  v18 = v17;
  v19 = objc_msgSend(v17, "userId");
  v20 = objc_retainAutoreleasedReturnValue(v19);
  objc_release(v18);
  objc_release(v15);
  v21 = +[PARSUserDefaults sharedDefaultsOfUser:](&OBJC_CLASS___PARSUserDefaults, "sharedDefaultsOfUser:", v20);
  v22 = (void *)objc_retainAutoreleasedReturnValue(v21);
  v48 = v3;
  v23 = -[PARSHealthPedmoterHomeViewController activity](v3, "activity");
  v24 = (void *)objc_retainAutoreleasedReturnValue(v23);
  v25 = v24;
  v26 = objc_msgSend(v24, "activityId");
  v27 = objc_retainAutoreleasedReturnValue(v26);
  v28 = v27;
  v29 = objc_msgSend(&OBJC_CLASS___NSString, "stringWithFormat:", CFSTR("%@%@%@"), CFSTR("selectValue"), v20, v27);
  v30 = objc_retainAutoreleasedReturnValue(v29);
  v31 = v30;
  v32 = objc_msgSend(v22, "objectForKey:", v30);
  v33 = (void *)objc_retainAutoreleasedReturnValue(v32);
  objc_release(v31);
  objc_release(v28);
  objc_release(v25);
  objc_release(v22);
  v34 = +[PARSHealthCircleWalkingManager sharedManager](&OBJC_CLASS___PARSHealthCircleWalkingManager, "sharedManager");
  v35 = (void *)objc_retainAutoreleasedReturnValue(v34);
  v36 = v35;
  v37 = objc_msgSend(v35, "resultDict");
  v38 = (void *)objc_retainAutoreleasedReturnValue(v37);
  objc_release(v36);
  v39 = objc_msgSend(v38, "objectForKeyedSubscript:", CFSTR("raiseFlag"));
  v40 = (void *)objc_retainAutoreleasedReturnValue(v39);
  v41 = objc_msgSend(v38, "objectForKeyedSubscript:", CFSTR("baseDonateStep"));
  v42 = (void *)objc_retainAutoreleasedReturnValue(v41);
  v43 = +[PARSConfDefaults shareDefaults](&OBJC_CLASS___PARSConfDefaults, "shareDefaults");
  v44 = (void *)objc_retainAutoreleasedReturnValue(v43);
  v45 = (unsigned __int64)objc_msgSend(v44, "showDonateBook");
  objc_release(v44);
  v46 = (unsigned __int64)objc_msgSend(v40, "isEqualToString:", CFSTR("Y"));
  if ( !(unsigned int)objc_msgSend(v38, "isNotEmpty")
    || (v46 | (objc_msgSend(v42, "length") == 0LL)) & 1
    || (v45 ^ 1) & 1
    || objc_msgSend(v33, "length") )
  {
    v47 = (unsigned __int64)objc_msgSend(v33, "isEqualToString:", CFSTR("1"));
    -[PARSHealthPedmoterHomeViewController requestUploadWithSure:](v48, "requestUploadWithSure:", v46 | v47);
  }
  else
  {
    -[PARSHealthPedmoterHomeViewController showFirstDonatabookAlert](v48, "showFirstDonatabookAlert");
  }
  objc_release(v42);
  objc_release(v40);
  objc_release(v38);
  objc_release(v33);
  objc_release(v20);
  objc_release(v8);
}
```

发现关键函数是`-[PARSHealthPedmoterHomeViewController requestUploadWithSure:](v48, "requestUploadWithSure:", v46 | v47);`这里的`requestUploadWithSure`函数,在ida中查看如下:

```
void __cdecl -[PARSHealthPedometer10thHomeViewController requestUploadWithSure:](PARSHealthPedometer10thHomeViewController *self, SEL a2, bool a3)
{
  bool v3; // w19
  PARSHealthPedometer10thHomeViewController *v4; // x20
  PARSHWPedometerUploadView *v5; // x0
  void *v6; // x0
  void *v7; // x21
  void *v8; // x0
  void *v9; // x24
  char v10; // w25
  PARSActivityDetailModel *v11; // x0
  void *v12; // x0
  void *v13; // x24
  void *v14; // x0
  __int64 v15; // ST08_8
  struct objc_object *v16; // x0
  void *v17; // x0
  void *v18; // x24
  void *v19; // x0
  void *v20; // x0
  void *v21; // x27
  void *v22; // x0
  __int64 v23; // x0
  __int64 v24; // x21
  struct objc_object *v25; // x0
  void *v26; // x28
  PARSActivityDetailModel *v27; // x0
  void *v28; // x0
  void *v29; // x25
  void *v30; // x0
  __int64 v31; // x26
  PARSHWPedometerUploadView *v32; // x0
  void *v33; // x0
  void *v34; // x23
  void *v35; // x0
  void *v36; // x24
  struct objc_object *v37; // x0
  __int64 v38; // x1
  void *v39; // x24
  __int64 v40; // x1
  __int64 v41; // x1
  __int64 v42; // x20
  void **v43; // [xsp+10h] [xbp-D0h]
  __int64 v44; // [xsp+18h] [xbp-C8h]
  __int64 (__fastcall *v45)(); // [xsp+20h] [xbp-C0h]
  void *v46; // [xsp+28h] [xbp-B8h]
  __int64 v47; // [xsp+30h] [xbp-B0h]
  __int64 v48; // [xsp+38h] [xbp-A8h]
  __int64 v49; // [xsp+40h] [xbp-A0h]
  bool v50; // [xsp+48h] [xbp-98h]
  void **v51; // [xsp+50h] [xbp-90h]
  __int64 v52; // [xsp+58h] [xbp-88h]
  __int64 (__fastcall *v53)(); // [xsp+60h] [xbp-80h]
  void *v54; // [xsp+68h] [xbp-78h]
  __int64 v55; // [xsp+70h] [xbp-70h]
  char v56; // [xsp+78h] [xbp-68h]

  v3 = a3;
  v4 = self;
  v5 = -[PARSHealthPedometer10thHomeViewController uploadView](self, "uploadView");
  v6 = (void *)objc_retainAutoreleasedReturnValue(v5);
  v7 = v6;
  v8 = objc_msgSend(v6, "walkUploadBtn");
  v9 = (void *)objc_retainAutoreleasedReturnValue(v8);
  v10 = (unsigned __int64)objc_msgSend(v9, "isCircleLoadingAnimating");
  objc_release(v9);
  objc_release(v7);
  if ( !(v10 & 1) )
  {
    v11 = -[PARSHealthPedometer10thHomeViewController activity](v4, "activity");
    v12 = (void *)objc_retainAutoreleasedReturnValue(v11);
    v13 = v12;
    v14 = objc_msgSend(v12, "activityId");
    v15 = objc_retainAutoreleasedReturnValue(v14);
    objc_release(v13);
    v16 = +[PARSUserManager sharedManager](&OBJC_CLASS___PARSUserManager, "sharedManager");
    v17 = (void *)objc_retainAutoreleasedReturnValue(v16);
    v18 = v17;
    v19 = objc_msgSend(v17, "currUserInfo");
    v20 = (void *)objc_retainAutoreleasedReturnValue(v19);
    v21 = v20;
    v22 = objc_msgSend(v20, "userId");
    v23 = objc_retainAutoreleasedReturnValue(v22);
    v24 = v23;
    v25 = +[PARSUserDefaults sharedDefaultsOfUser:](&OBJC_CLASS___PARSUserDefaults, "sharedDefaultsOfUser:", v23);
    v26 = (void *)objc_retainAutoreleasedReturnValue(v25);
    v27 = -[PARSHealthPedometer10thHomeViewController activity](v4, "activity");
    v28 = (void *)objc_retainAutoreleasedReturnValue(v27);
    v29 = v28;
    v30 = objc_msgSend(v28, "activityId");
    v31 = objc_retainAutoreleasedReturnValue(v30);
    objc_msgSend(v26, "setObject:forKey:", v31, CFSTR("localActivityId"));
    objc_release(v31);
    objc_release(v29);
    objc_release(v26);
    objc_release(v24);
    objc_release(v21);
    objc_release(v18);
    objc_initWeak(&v56, v4);
    v32 = -[PARSHealthPedometer10thHomeViewController uploadView](v4, "uploadView");
    v33 = (void *)objc_retainAutoreleasedReturnValue(v32);
    v34 = v33;
    v35 = objc_msgSend(v33, "walkUploadBtn");
    v36 = (void *)objc_retainAutoreleasedReturnValue(v35);
    v51 = _NSConcreteStackBlock;
    v52 = 3254779904LL;
    v53 = sub_100BC9B58;
    v54 = &unk_10311DDE8;
    objc_copyWeak(&v55, &v56);
    objc_msgSend(v36, "startCircleLoadingAnimateWithClockwise:completion:", 0LL, &v51);
    objc_release(v36);
    objc_release(v34);
    v37 = +[PARSPedometerService sharedService](&OBJC_CLASS___PARSPedometerService, "sharedService");
    v39 = (void *)objc_retain(v37, v38);
    v43 = _NSConcreteStackBlock;
    v44 = 3254779904LL;
    v45 = sub_100BC9EDC;
    v46 = &unk_10311DF08;
    v47 = objc_retain(v4, v40);
    objc_copyWeak(&v49, &v56);
    v42 = objc_retain(v15, v41);
    v48 = v42;
    v50 = v3;
    objc_msgSend(v39, "healthWalkUploadTodayPedometer:", &v43);
    objc_release(v39);
    objc_release(v48);
    objc_destroyWeak(&v49);
    objc_release(v47);
    objc_destroyWeak(&v55);
    objc_destroyWeak(&v56);
    objc_release(v42);
  }
}
```

从这里看出这个函数的参数是传入0或1,也可发现这个函数的进一步调用的函数是`healthWalkUploadTodayPedometer`,但由于`healthWalkUploadTodayPedometer`函数的参数是一个内存地址,需要动态设置,而requestUploadWithSure函数的参数传入"1"即可,用requestUploadWithSure函数更方法用cycript测试,于是直接在cycript中测试requestUploadWithSure(1),验证是否是关键函数,操作如下:

```
ssh root@iphone_ip
cycript -p PALxxx
choose(PARSEPedometerInfo)
    cy# choose(PARSPedometerInfo)
    [#"PARSPedometerInfo<0x12f22cd60>: \n integration=1541 \n iPhone=1541 \n watch=0 \n heartRat=0\n at:2017-12-26 16:00:00 +0000",#"PARSPedometerInfo<0x12f406c90>: \n integration=1541 \n iPhone=1541 \n watch=0 \n heartRat=0\n at:2017-12-26 16:00:00 +0000"]
    也即找到两个PARSPedometerInfo类的对象,随便用其中一个即可
[#0x12f22cd60 setIntegratedSteps:66666]
    这里设置上传步数为66666,但是还没有上传
tmp=[PARSHealthPedometer10thHomeViewController alloc]
    生成关键上传函数requestUploadWithSure所在类的一个对象
[tmp requestUploadWithSure:1]
    执行上传步数函数,参数为1
```

执行完上面的函数后在app中成功弹窗,提示上传成功,说明这个函数是关键上传函数



[1]: http://www.newosxbook.com/src.jl?tree=listings&file=12-1-vmmap.c
[2]: https://github.com/comex/myvmmap/blob/master/myvmmap.c
[3]: http://zhoulingyu.com/2016/07/11/iOS攻防——(一)ssh登陆与交叉编译/
[4]: http://blog.csdn.net/proteas/article/details/78083512
[5]: http://blog.csdn.net/u011661836/article/details/61921308
[6]: https://github.com/3xp10it/mytools/vmmap
[7]: https://raw.githubusercontent.com/3xp10it/pic/master/remote_gdb1.png
[8]: https://raw.githubusercontent.com/3xp10it/pic/master/remote_gdb2.png
[9]: https://github.com/deresz/funcap
[10]: http://blakespot.com/ios_device_specifications_grid.html
[11]: https://raw.githubusercontent.com/3xp10it/pic/master/ida_usb_flex1.jpg
[12]: https://raw.githubusercontent.com/3xp10it/pic/master/ida_usb_flex2.jpg
[13]: https://raw.githubusercontent.com/3xp10it/pic/master/ida_usb_flex3.jpg
