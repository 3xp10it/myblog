---
layout:     post
title:      quick start sulley
date:       2016-07-28
summary:    快速开始学习sulley
categories: 漏洞挖掘
tags:
 - sulley
---

```markdown
0.sulley api doc
    https://www.fuzzing.org/wp-content/SulleyEpyDoc/private/sulley-module.html

1.a good vedio on youtube about basic fuzz knowledge:
    https://www.youtube.com/watch?v=q0Bg2PBxXNA
    or
    https://www.dfate.de/public/index.php
  four file linked to upon vedio:
    https://github.com/StefanMolls/Blog-related-Files/tree/master/Video1-Fuzzing%20Basics%20with%20Sulley%20
    include these:
        crashbin_explorer.py
            (crashbin_explorer.py create a app_relevant_cases.txt,this crashbin_explorer.py is
            different from the origin utils\crashbin_explorer.py)
        filter_cases.py
        pcmanftp.py
        pcmanftp_simple.py
        
2.a very good script to install sulley quickly from the same vedio author like upon
    https://github.com/reider-roque/sulley-win-installer

3.chinese sulley doc translation from pediy
    https://bbs.pediy.com/archive/index.php?t-135764.html

4.defcon23 a vedio about fuzz,about wadi
    https://www.youtube.com/watch?v=jnBhb6DiP2k

5.example
    192.168.3.77(fuzzer machine,installed sulley)
    192.168.3.177(been fuzzed machine with pcmanftpd2.exe,installed sulley)
    
    on 192.168.3.177's sulley root directory:
        process_monitor.py -c audit\pcmanftpd_crashbin -p "PCManFTPD2.exe"

    on 192.168.3.77's sulley root directory:
        copy https://github.com/xinghuacai/mysulleycases/crashbin_explorer.py .
        copy https://github.com/xinghuacai/mysulleycases/filter_cases.py .
        copy https://github.com/xinghuacai/mysulleycases/pcmanftpd2.py .
        network_monitor.py -d 0 -f "src or dst port 21" -P audit
        pcmanftpd2.py(run twice)
            select debug mode first(generate a pcman_all_cases.txt)
            select not debug mode second(start the real fuzz)

    running fuzz...
    finished fuzz

    on 192.168.3.77's sulley root directory:
        copy 192.168.3.177\sulley\audit\pcmanftpd_crashbin .
        crashbin_explorer.py(generage a pcman_relevant_cases.txt,and show the numbers of the crashed ones)
            crashbin_explorer.py -t num
            (this command can show the detail of the num crash,this command is not necessary)
        utils\pcap_cleaner.py pcmanftpd_crashbin audit(delete the useless .pcap files in audit)
        filter_cases.py(generate pcman_relevant.txt from pcman_all_cases.txt and pcman_relevant_cases.txt)

6.important files about sulley can be download from:
    https://github.com/3xp10it/mysulleycases
```
