---
title: 浅谈vue cli2 与 vue cli3
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-09-03 18:52:07
categories:
- web端
- vue
tags:
- vue cli2
- vue cli3
password: 1011
---

本来打算自己尝试学学做npm包时，遇到了下面的问题。

```shell
PS F:\demo> vue create mynpmdemo

  vue create is a Vue CLI 3 only command and you are using Vue CLI 2.9.6.
  You may want to run the following to upgrade to Vue CLI 3:

  npm uninstall -g vue-cli
  npm install -g @vue/cli
```

这段的意思是要先卸载`vue cli2`，然后重新安装`vue cli3`。那么究竟`vue cli2` 与 `vue cli3`有什么区别呢？

首先先查看下我们本地的vue版本

```javascript
vue -V
```



##### 1，创建文件（创建项目方式）

```javascript
2.0的安装：vue init webpack projectname
 
3.0的安装：vue create projectname
```



##### 2，启动项目

```javascript
npm run serve  //3.0启动
// 启动流程：https://blog.csdn.net/luckybeggar/article/details/103716708

npm run dev  //2.0启动
//因为package.json中的"scripts"对象中的名字变了,所以启动命令也就变了,如果不习惯也可以手动改回去
```



##### 3，目录结构不一致

`vue-cli3`比`vue-cli2`少了build、config、[static](https://so.csdn.net/so/search?q=static&spm=1001.2101.3001.7020)目录，多了public目录。

![](https://img-blog.csdnimg.cn/20210623132743455.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lpZ3VhbmdfODIw,size_16,color_FFFFFF,t_70)

vue-cli3移除了static文件夹，新增了public文件夹，并且将index.html移动到public中。



##### 4，配置端口号

```javascript
//2.0中在/config/index.js中设置
//3.0中需要在根目录下创建一个vue.config.js文件.
module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : '/',
    // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
    // outputDir: 'dist',
    // pages:{ type:Object,Default:undfind } 
    devServer: {
        port: 8888, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/api': {
                target: '<url>',
                ws: true,
                changeOrigin: true
            },
            '/foo': {
                target: '<other_url>'
            }
        },  // 配置多个代理
    }
```



##### 5，vue-cli2.x项目向3.x迁移

只需要把[static](https://so.csdn.net/so/search?q=static&spm=1001.2101.3001.7020)目录复制到public目录下，老项目的src目录覆盖3.x的src目录(如果修改了配置，可以查看文档，用cli3的方法进行配置)



##### 6，static文件夹

原来放在static下的文件，现在应该放在public文件夹下。



##### 7，vue cli2升级到vue cli3

```shell
先升级npm的版本：npm install -g npm     参数-g：全局安装
卸载之前的vue cli 2.9.6：npm uninstall vue-cli -g
下载最新的vue cli版本：npm install -g @vue/cli版本号
注意，这个版本号一定要跟，如果不跟，那么就是安装vue-cli 的最新版本。 目前 （2018-08-19） 其最新版本是 3.0.1。
例：npm install -g @vue/cli@3.0.1
```

