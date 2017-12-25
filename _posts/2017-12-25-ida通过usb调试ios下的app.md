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

### 0x0 About

#### 实验环境
+ iphone6s
+ ios9.0
+ macOS sierra
+ ida7.0

#### why
+ 对于ida来说,lldb不怎么样(lldb用户体验笔者认为极差)
+ wifi调试很慢,ida通过wifi调试不现实
+ ios9以上的[这个vmmap][1]不工作

#### 准备

+ 可用的vmmap

### 0x1 Detail

[1]: http://www.newosxbook.com/src.jl?tree=listings&file=12-1-vmmap.c
