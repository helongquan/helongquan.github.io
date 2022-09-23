---
title: Express 配置HTML页面访问
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-09-21 22:52:51
categories:
- nodejs
tags:
- express
- html
password: 1011
---

#### 配置模板引擎

```
Express`默认的模板引擎是`pug（jade）`，想要渲染`html`页面必须要导入对应的模板引擎`ejs
npm install ejs
```

安装完成在`app.js`文件中完成模板引擎的引入

```javascript
var ejs = require('ejs');
// 配置Express 视图引擎
app.engine('html', ejs.__express);
app.set('view engine', 'html');
```

#### 配置页面路由

如果页面不是放在`public`目录下，那么就必须要通过配置路由来进行访问。

假设我的文件目录如下

```
|-views(在根目录下)
|--mplat
|---pages
|----console.html
|---index.html
```

在`app.js`中配置全局变量

```javascript
// 配置 mplat 渲染页面
app.set('mplat',path.join(__dirname,'views/mplat'))
```

这样子在别处使用的`mplat`等同于`path.join(__dirname,'views/mplat')`

在`routers`目录下新建`mplat.js`，把两个`html`文件加入映射

```javascript
var express = require('express');
var router = express.Router();/* GET mplat page. */
router.get('/', function(req, res, next) {
    res.render('mplat/index.html', { title: 'DisCloudDisk' });
});

router.get('/console',function (req,res,next) {
    res.render('mplat/pages/console.html', { title: 'Console' });
})

module.exports = router;
```

在`app.js`中引入文件路由

```javascript
app.use('/mplat',require('./routes/mplat'));
```

温馨提示：当时测试好像有点不对，笔者这样编写是可以的，如下：

```javascript
var mplatRouter = require('./routes/mplat');

app.use('/mplat',mplatRouter);
```

这样子配置完成后，只需要访问 `http://$host/mplat`即可返回`index.html`

#### 修改静态文件引入

在`app.js`中定义静态文件目录，这个就是针对引入外部文件，比如图片，css样式表，前端交互需要的文件。

```javascript
app.use(express.static(path.join(__dirname, 'public')));
```

在页面引入`css`和`js`文件只需要默认在前面加上`public`即可，写法如下

```html
<script src="/lib/layui/layui.js"></script>
```

实际目录为`public/lib/layui/layui.js`

#### 页面路由

`html`页面的跳转也有变化，需要在路由中注册对应的界面，比如我在`index`访问`console`，路径和在路由中注册的保持一致。

```html
<iframe src="/mplat/console" frameborder="0" scrolling="yes" width="100%" height="100%"></iframe>
```

这里简单的说就是我们访问console.html这个页面的时候是这样访问的：

http://localhost/mplat/console

为什么呢？是因为我们我们的主路由口是/mplat，这个由app.js里面的这个决定：

```javascript
app.use('/mplat',mplatRouter);
```

然后，进入这里之后再相对主目录作为当前路由的/console，所以这里需要注意。

那么就是：

```javascript
router.get('/console',function (req,res,next) {
    res.render('mplat/pages/console.html', { title: 'Console' });
})
```

也就是`/mplat`+`/console`
