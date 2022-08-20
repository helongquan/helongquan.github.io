---
title: NodeJs 项目基础架构搭建
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-08-20 13:47:22
categories:
- 大前端
- nodejs
tags:
- nodejs
password:
---

##### 第一步：创建项目存储路径(C:\node_workspace),创建NodeJs 项目(mongodb_desk) 并初始化

```shell
C:\>mkdir node_workspace

C:\>cd node_workspace

C:\node_workspace>mkdir mongodb_desk

C:\node_workspace>cd mongodb_desk

C:\node_workspace\mongodb_desk>cnpm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (mongodb_desk)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to C:\node_workspace\mongodb_desk\package.json:

{
  "name": "mongodb_desk",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes) yes
```

##### 第二步：mongodb_desk 项目目录结构：

建立三个文件夹：`public、routes、views`

mongodb_desk 项目目录结构:

![](https://img-blog.csdnimg.cn/20190329143309671.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3pob3V6aGl3ZW5nYW5n,size_16,color_FFFFFF,t_70)

对应文件及其文件夹说明:

> models 存放操作数据库的文件
>
> public 存放静态文件，如 css、图片等
>
> routes 存放路由文件
>
> views 存放模板文件
>
> app.js 程序主文件
>
> package.json 存储项目的信息，比如项目名、描述、作者、依赖等
>

至此一个nodejs 项目的基础框架搭建完毕。
