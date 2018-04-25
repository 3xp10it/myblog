---
layout:     post
title:      caps键按住时映射为ctrl,按下一次时映射为esc
date:       2018-04-25
summary:    caps键按住时映射为ctrl,按下一次时映射为esc
categories: vim
tags:
 - caps
 - ctrl
 - esc
 - vim
---

### 0x1 About

使用vim和使用常用快捷键时这样设置会带来极大的便利:

**caps键按住时映射为ctrl,按下一次时映射为esc

### 0x2 Detail

#### macOS

参考[这里][1]

#### linux

参考[这里][2]

1.Under System Preferences > Keyboard Layout > Options... > Ctrl key position, I checked 'Caps Lock as Ctrl'.
2.`xcape -e 'Control_L=Escape'`
或
`setxkbmap -option 'caps:ctrl_modifier'  xcape -e 'Caps_Lock=Escape'`

#### windows

参考[这里][3]

[1]: http://3xp10it.cc/linux/2017/03/11/%E5%AE%89%E8%A3%85macOS-sierra%E8%A6%81%E5%81%9A%E7%9A%84%E4%BA%8B/
[2]: https://askubuntu.com/questions/177824/remapping-caps-lock-to-control-and-escape-not-the-usual-way/228379
[3]: http://vim.wikia.com/wiki/Map_caps_lock_to_escape_in_Windows
