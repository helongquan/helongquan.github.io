---
title: 不同类型的请求及其作用,API的分类
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-08-13 15:52:35
categories:
- 大前端
tags: 
- api
- http
password:
---

### 不同类型的请求及其作用：

- GET：从服务器端读取数据
- POST：向服务器端添加新数据
- PUT：更新服务器端已经存在的数据
- DELETE：删除服务器端数据

##### REST API: restful

- 发送请求进行CRUD哪个操作由请求方式来决定

- 同一个请求路径可以进行多个操作

- 请求方式会用到GE/POST/ PUT/DELETE

  

##### 2.非 REST API: restless

- 请求方式不決定请求的CRUD操作
- 一个请求路径只对应一个操作
- 一般只有GET/POsi



##### 提示：

1，REST API 又叫 `restful`，非 REST API 又叫 `restless`；
2，CRUD：代表着增删改查操作；
3，REST 和 非REST 的区别就是一个接口请求方式的不同，后台数据库可以进行不同的操作；

##### 推荐一个假的rest api：

链接地址：https://github.com/typicode/json-server

##### 使用简单说明：

1，首先下载（成功）；

2，点开readme.md，找到Getting started（入门指南）

3，打开控制编辑器的终端控制台（我用的是VScode：ctrl + ~）,

##### 依次输入：

```javascript
npm install -g json-server
json-server --watch db.json
```

4.步骤全部都对会出现，终端控制台会出现下图：

![](https://img-blog.csdnimg.cn/20191125091758802.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0pFRkZfbHV5aWR1YW4=,size_16,color_FFFFFF,t_70)

原文链接：https://blog.csdn.net/JEFF_luyiduan/article/details/103226648
