---
title: mysql create database 指定utf-8编码
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-05-17 23:48:40
categories: 数据库
tags: mysql
password:
---

如下脚本创建数据库yourdbname，并制定默认的字符集是utf8。

```mysql
CREATE DATABASE IF NOT EXISTS yourdbname DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
```

如果要创建默认gbk字符集的数据库可以用下面的sql:

```mysql
create database yourdb DEFAULT CHARACTER SET gbk COLLATE gbk_chinese_ci;
```
