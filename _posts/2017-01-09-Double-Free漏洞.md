---
layout:     post
title:      Double Free漏洞
date:       2017-01-09
summary:    Double Free漏洞
categories: 二进制
tags:
 - 漏洞战争
---

### 0x00 Link

```
1.Double Free浅析
http://php.ph/wydrops/drops/Double%20Free%E6%B5%85%E6%9E%90.pdf
2.freenote_x64堆漏洞double free利用
http://fanrong1992.github.io/2016/05/26/freenote-x64%E5%A0%86%E6%BC%8F%E6%B4%9Edouble-free%E5%88%A9%E7%94%A8/
3.freebuf CVE-2014-0502分析
http://www.freebuf.com/articles/network/27118.html
4.上面3中内含的Corelan ROPdb[基于单个dll收集通用rop链]
https://www.corelan.be/index.php/security/corelan-ropdb/    
5.目前认为:
    alloc(HeapAlloc,malloc)对应unlink
    free对应link
```

### 0x01 free对应link  

<a href="https://github.com/shellphish/how2heap/blob/master/fastbin_dup.c">一个doble free的例子</a>

```
-----------------start of fastbin_dup.c-----------------
#include <stdio.h>
#include <stdlib.h>

int main()
{
	printf("This file demonstrates a simple double-free attack with fastbins.\n");

	printf("Allocating 3 buffers.\n");
	int *a = malloc(8);
	int *b = malloc(8);
	int *c = malloc(8);

	printf("1st malloc(8): %p\n", a);
	printf("2nd malloc(8): %p\n", b);
	printf("3rd malloc(8): %p\n", c);

	printf("Freeing the first one...\n");
	free(a);

	printf("If we free %p again, things will crash because %p is at the top of the free list.\n", a, a);
	// free(a);

	printf("So, instead, we'll free %p.\n", b);
	free(b);

	printf("Now, we can free %p again, since it's not the head of the free list.\n", a);
	free(a);

	printf("Now the free list has [ %p, %p, %p ]. If we malloc 3 times, we'll get %p twice!\n", a, b, a, a);
	printf("1st malloc(8): %p\n", malloc(8));
	printf("2nd malloc(8): %p\n", malloc(8));
	printf("3rd malloc(8): %p\n", malloc(8));
}
-------------------end of fastbin_dup.c-----------------

gcc -o 1 fastbin_dup.c
./1
----------------output---------------
This file demonstrates a simple double-free attack with fastbins.
Allocating 3 buffers.
1st malloc(8): 0x2209420
2nd malloc(8): 0x2209440
3rd malloc(8): 0x2209460
Freeing the first one...
If we free 0x2209420 again, things will crash because 0x2209420 is at the top of the free list.
So, instead, we'll free 0x2209440.
Now, we can free 0x2209420 again, since it's not the head of the free list.
Now the free list has [ 0x2209420, 0x2209440, 0x2209420 ]. If we malloc 3 times, we'll get 0x2209420 twice!
1st malloc(8): 0x2209420    (markA)
2nd malloc(8): 0x2209440    (markB)
3rd malloc(8): 0x2209420    (markC)
-------------end of output-----------

由结果分析如下:

1.如果连续free(a),也即对应上面注释掉的变成不注释,这样会出错,因为在执行free函数时,free对应空闲堆块的link,也即对
  应空闲堆块链入空表,在第2次free动作时,检测到空表中的相邻空闲堆块是自己(同一个空闲堆块),于是系统报错
  (double free error)
2.按照上面的代码中的再次free动作[free对应link,将空闲堆块链入空表],第2次free(a)完成后空表如下:
  [freelist是头进尾出]
  freelist[2]=========a[第2次free(a),markC]=========b[markB]========a[第1次free(a),markA]
     |______________________________________________________________|
  在第2次free(a)的时候系统看了下最近的在空表上的空闲堆块不是自己,所以情况正常,不会是Double Free,所以第2次
  free(a)正常没有出错
```

上面这个例子放在这里是要说明free对应link,以及野指针的用处,malloc后再free,而free之后没有置Null的指针是野指针,详情可见下面链接,这里
的代码并没有直观的看出Double Free是如何被利用在控制代码执行流程的
<a href="https://zhidao.baidu.com/question/6536098.html">野指针</a>

下面分析wooyun文章中的Double Free浅析,这才是Double Free用以控制代码执行的一种直观的利用方法
<a href="http://php.ph/wydrops/drops/Double%20Free浅析.pdf">Double Free栈析</a>

### 0x02 Double Free漏洞的利用方法

```
上面Doubl Free栈析链接中对应如下操作:

1.malloc(504)分配第1个堆块,实际分配504+8=512B大小的堆块,在下面标记为504堆块
2.p=malloc(512)分配第2个堆块,实际分配512+8=520大小的堆块,在下面标记为512堆块
    |xxxxxxxx504xxxxxxxxx|xxx(p)xxxxxx512xxxxxxxxxxx|
    第2个堆块malloc得到的指针为p,p在距离第1个堆块块首504+8+8=512+8=0x200+8偏移位置处
3.free504大小的堆块
    freelist[64]=============504堆块
4.free512大小的堆块,也即free(p),第1次free(p)
    freelist[64]=============504堆块

    freelist[65]=============512堆块
        
    此时p指针被释放,p指针成为野指针
    由于504堆块和512堆块现在都是空闲堆块,而且在内存空间中相邻,于是堆管理器将这两个堆块合并成一个新的堆块,大小为
    512+520=1032,1032>1024,于是这个合并的新的堆块将被链入freelist[0]所在的双向链表中
5.malloc(768),768+8=776<1024,776=97x8
    按理这时malloc(768)会从freelist[97]所在链表中分配出一个空闲堆块,不过可能是90%以上的情况下,这时候的
    freelist[97]所在的链表中并没有其他空闲堆块,这样就从freelist[0]中分配得到刚才合并的新堆块[1032>776]
    0x300=768
6.在malloc(768)得到的新内存空间中布置如下数据:

  chunk chunk的指针ptr                                                        chunk尾         野指针p 
    |      |                                                                     |              |
    +----------------------------------------------------------------------------------------------------+
    0x0    +   0x1f9   +   0x0804bfc0-0xc  +  0x0804bfc0-0x8  +  'a'x(0x200-24)  +  0x000001f8  +  0x108
    |head  |fake head  |fake fd            |fake bk           |data              |fake head     |        |
    +----------------------------------------------------------------------------------------------------+
           |<---------------------------------0x1f8----------------------------->|<-------0x108--------->|
7.上面布置数据后相当于将chunk堆块伪造成空闲堆块,而野指针p所在堆块没有伪造成空闲堆块,是占用态堆块
    chunk堆块被伪造成空闲堆块后将链入freelist[64](0x200=512=64x8),伪造的关键在于如下动作:
    a)将堆块的self size和pre chunk size字段伪造为对应内存长度
    b)将决定当前堆块是否是空闲态或占用态对应的字段伪造好
    c)pre chunk size为0代表前一个堆块是占用态堆块,不是空闲堆块
    d)堆块的flag标志位有3位,最低位表示前一个堆块是否是占用态,c)和d)共同决定前一个堆块是否是空闲堆块

8.free(p),第2次free[Double Free],这时由于系统认为p前面的堆块是空闲堆块,于是两个堆块发生合并
    对应freelist[64]所在的链表中的chunk堆块要unlink下来,而一个空闲堆块的unlink对应一个DWORD SHOOT机会,也即对应
    这里的[fake fd]=fake bk,也即将0x0804bfc0-0x8写入到0x0804bfc0-0xc所在内存中
    

小结:
    Double Free的利用关键是要通过第2次的free动作制造出一个unlink的结果,这里采用的方法是通过在第2次的free动作前
    伪造即将进行第2次free动作的堆块的相邻(前一个)的堆块为空闲堆块,这样再进行第2次free动作时就会制造出两个空闲堆
    块合并而产生一个堆块的unlink,而一个unlink对应一次DWORD SHOOT,由此看出无论是怎么变化,关键是要出现unlink,而
    free对应link,这里在free(第2次p的free)后先unlink再link,所以free是有机会产生unlik的,只要这个free的堆块旁边有
    空闲的堆块

    Double Free可以利用的根源来自于野指针,可以将Double Free看作一种UAF,UAF可以利用的根源也是野指针
```
