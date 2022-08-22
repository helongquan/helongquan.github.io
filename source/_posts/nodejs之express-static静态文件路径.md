---
title: nodejs之express.static静态文件路径
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-08-22 23:27:34
categories:
- 大前端
- express
tags:
- nodejs
- express
password:
---

为了提供对静态资源文件(`图片、csss文件、javascript文件`)的服务，请使用Express内置的中间函数 `express.static` 。


传递一个包含静态资源的目录给 `express.static` 中间件用于立刻开始提供文件。比如用以下代码来提供public目录下的图片、css文件和javascript文件：

```javascript
app.use(express.static('public'));
```


现在，你可以加载 public目录下的文件了：

```
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```


Express 会在静态资源目录下查找文件，所以不需要把静态目录作为URL的一部分。


 通过多次使用 `express.static` 中间件来添加多个静态资源目录：

```javascript
app.use(express.static('public'));
app.use(express.static('files'));
```


Express 将会按照你设置静态资源目录的顺序来查找静态资源文件。


为了给静态资源文件创建一个虚拟的文件前缀(实际上文件系统中并不存在) ，可以使用 `express.static` 函数指定一个虚拟的静态目录，就像下面这样：

```javascript
app.use('/static', express.static('public'));
```


现在你可以使用 `/static` 作为前缀来加载 public 文件夹下的文件了。

```
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```


然而，你提供给 `express.static` 函数的路径是一个相对node进程启动位置的相对路径。如果你在其他的文件夹中启动express app，更稳妥的方式是使用静态资源文件夹的绝对路径： 

```javascript
app.use('/static', express.static(__dirname + '/public'));
```


