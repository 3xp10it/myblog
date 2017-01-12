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

上面这个例子放在这里是要说明野指针的用处,malloc后再free,而free之后没有置Null的指针是野指针,详情可见下面链接,这里
的代码并没有直观的看出Double Free是如何被利用在控制代码执行流程的
<a href="https://zhidao.baidu.com/question/6536098.html">野指针</a>

下面分析wooyun文章中的Double Free浅析,这才是Double Free用以控制代码执行的一种直观的利用方法
<a href="http://php.ph/wydrops/drops/Double%20Free浅析.pdf">Double Free栈析</a>

### 0x02 Double Free漏洞的利用方法

```
1.malloc(504)分配第1个堆块,实际分配504+8=512B大小的堆块,在下面标记为504堆块
2.p=malloc(512)分配第2个堆块,实际分配1024B大小的堆块(512+8=520,512<520<2014),在下面标记为512堆块
    |xxxxxxxx504xxxxxxxx|xxxxx(p)xxxxxx512xxxxxxxxxxx|
    第2个堆块的引用指针为p,p在距离第1个堆块块首504+8=512=0x200偏移位置处
3.free504大小的堆块
    freelist[8]=============504堆块
4.free512大小的堆块,也即free(p)
    freelist[8]=============504堆块

    freelist[9]=============512堆块
        
    此时p指针被释放,p指针成为野指针
5.malloc(768),768+8=776<1024
    0x300=768
    此时freelist[9]中指向的512堆块被分配
    
```
