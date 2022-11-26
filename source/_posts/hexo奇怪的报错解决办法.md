---
title: hexo奇怪的报错解决办法
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-11-26 15:55:30
categories: hexo
tags: 加密
password: 1011
---

一直以来heox运行得好好得，今天输入域名的时候发现居然报错了。

说一个前提，就是我的博客里面有一些敏感信息，其实算不上，为了不惹麻烦，就做了一个加密，也就是输入密码菜访问，可是今天居然不行了，密码是没有问题的，一直都是这个。

### 报错信息如下：

`Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'importKey')
    at getKeyMaterial (hbe.js:98:29)`

google，百度查了一下，发现都没有类似问题，后来检查了一下这个加密插件是否安装，以及是否做好配置。检查完了，还是一样报错。

看了一下地址栏上面提示不安全，估摸着应该就是协议的问题了，后面把访问的域名的协议从`http`换成了`https`，再次测试发现居然可以了。

说明这个报错是因为这个协议的原因，我的仓库里面的page使用的必须要用加密协议才行，不加密不是不行，而是某些板块就是需要依赖这个协议必须是ssl才行的。

