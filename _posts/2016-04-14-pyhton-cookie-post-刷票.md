---
layout: post
title:
categories: python
tags:
 - https
 - code
---
<i class="fa fa-apple" aria-hidden="true"></i>
记一次刷票代码

```python
import urllib
import urllib2
import time
url = 'https://panshi.qq.com/v2/vote/10583890/submit'
i=0
while i<20:
	j=str(i)
	#cook='pgv_info=ssid=s'+str(i+4607539873)+'; pgv_pvi='+str(8520475648+i)+'; pgv_pvid='+str(5279007010+i)+'; sd_cookie_crttime='+str(1460508371298+i)+'; sd_userid='+str(31421460508371298+i)+'; touch ='+j
	cook='pgv_info=ssid=s'+str(i+1)+'; pgv_pvi='+str(1+i)+'; pgv_pvid='+str(1+i)+'; sd_cookie_crttime='+str(1460508371298+i)+'; sd_userid='+str(31421460508371298+i)+'; touch ='+j
	print cook
	headers = {
	'Accept-Language': 'zh-cn',
	'Accept-Encoding': 'gzip, deflate',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Origin': 'https://hn.qq.com',
	'Content-Length': '163',
	'Connection': 'close',
	'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12B436 MicroMessenger/6.3.'+j+' NetType/WIFI Language/zh_CN',
	'Referer': 'https://hn.qq.com/zt2016/terminal/cxcyds.htm?from=groupmessage&isappinstalled=0',
	}
	#data='''answer=%7B%22639226%22%3A%7B%22selected%22%3A%5B1488426%5D%7D%7D&login=1&source=1&g_tk=2013&format=script&callback=parent.AppPlatform.Survey.Digg.ReceiveDiggResult'''
	data={'answer':'''{"639226":{"selected":[1488426]}}''',
	'login':'1',
	'source':'1',
	'g_tk':'2013',
	'format':'script',
	'callback':'parent.AppPlatform.Survey.Digg.ReceiveDiggResult'}


	opener = urllib2.build_opener()
	opener.addheaders.append(('Cookie', cook))

	request = urllib2.Request(
	url=url,
	headers=headers,
	data=urllib.urlencode(data))
	
	f = opener.open(request)
	i+=1
	time.sleep(2)
```
