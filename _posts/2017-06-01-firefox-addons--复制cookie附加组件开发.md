---
layout:     post
title:      firefox addons--复制cookie附加组件开发
date:       2017-06-01
summary:    firefox addons--复制cookie附加组件开发
categories: auxilary
tags:
 - addons
 - firefox
 - cookie
---

### 0x00 About

```
目的:制作一个火狐附加组件
用途:用于在跑sqlmap或其他场景中时方便地提供cookie
```

### 0x01 Refer

```
1.入门
https://developer.mozilla.org/zh-CN/Add-onso
2.api
https://developer.mozilla.org/zh-CN/Add-ons/WebExtensions
3.示例
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Examples
4.发布
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Publishing_your_WebExtension
```

### 0x02 Detail

```
1.最后代码如下:
https://github.com/3xp10it/xcookie

2.关键代码如下,用于获取当前标签页面中的所有cookie

--------------cookie.js----------------
function showCookiesForTab(tabs) {
  //get the first tab object in the array
  tab = tabs.pop();

  //get all cookies in the domain
  var gettingAllCookies = browser.cookies.getAll({url: tab.url});
  gettingAllCookies.then((cookies) => {
    if (cookies.length > 0) {
      var returnCookie="";
      for (cookie of cookies) {
        var content = cookie.name + "="+ cookie.value+";";
        returnCookie=returnCookie+content;
      }
      returnCookie=returnCookie.substr(0,returnCookie.length-1);
       //alert(returnCookie);
        document.getElementById("output").innerHTML=returnCookie;
        var copyText=document.querySelector('#output');
        copyText.select();

        function copy1(){
        document.getElementById("output").innerHTML=returnCookie;
        var copyText=document.querySelector('#output');
        copyText.select();
        //console.log(copyText.value);
        var res=document.execCommand("copy");
        //console.log(res);
        //alert("copyed to clipboard");
        }        

        function copy2(){
        document.getElementById("output").innerHTML="--cookie='"+returnCookie+"'";
        var copyText=document.querySelector('#output');
        copyText.select();
        //console.log(copyText.value);
        var res=document.execCommand("copy");
        //console.log(res);
        //alert("copyed to clipboard");
        }        

        document.querySelector("#pureCookie").addEventListener("click",copy1);
        document.querySelector("#sqlmapCookie").addEventListener("click",copy2);
    } else {
      var p = document.createElement("p");
      var content = document.createTextNode("No cookies in this tab.");
      var parent = cookieList.parentNode;

      p.appendChild(content);
      parent.appendChild(p);
    }
  });
};

//get active tab to run an callback function.
//it sends to our callback an array of tab objects
function getActiveTab() {
  return browser.tabs.query({currentWindow: true, active: true});
}
getActiveTab().then(showCookiesForTab);
--------------cookie.js----------------

3.可用于复制cookie和sqlmap中要用到的cooie参数形式的cookie

4.安装本附加组件方法
    在firefox的附加组件搜索xcookie,安装即可
```

### 0x03 Attention

```
1.上面的用于复制数据到系统剪切板的代码如果没有通过人工点击事件触发则无法成功复制数据到剪切板
2.专门用于操作剪切板的强大js,上面代码中暂时没有用到.
    https://github.com/zenorocha/clipboard.js
```
