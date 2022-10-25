---
title: express next()的作用
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-10-25 10:49:43
categories:
- express
tags:
- next()
- express参数
password: 1011
---

#### Next()的作用

我们在定义express中间件函数的时候都会将第三个参数定义为next，这个next就是我们今天的主角，next函数主要负责将控制权交给下一个中间件，如果当前中间件没有终结请求，并且next没有被调用，那么请求将被挂起，后边定义的中间件将得不到被执行的机会。`next()`的作用就是通过放行允许程序执行多个中间件。

#### 何时使用Next()

从上边的描述我们已经知道，next函数主要是用来确保所有注册的中间件被一个接一个的执行，那么我们就应该在所有的中间件中调用next函数，但有一个特例，如果我们定义的中间件终结了本次请求，那就不应该再调用next函数，否则就可能会出问题，我们来看段代码：

```javascript
let express=require('express')
let app=new express()
app.use('/',function(req,res,next){
    res.send('Hello World');
    console.log('第一个')
    next()
  })
  app.use('/',function(req,res,next){
    console.log('第二个')
    res.send('rld');
    next()
  })
  app.use('/',function(req,res,next){
    console.log('第三个')
    res.send('Herld');
    next()
  })
  app.use('/',function(req,res,next){
    console.log('第四个')
    res.send('Helld');
  })
app.listen(8888,function(){
    console.log('running.....')
})
```

执行上面的代码我们在控制台可以得到4条数据打印如下：

>    第一个
>    第二个
>    第三个
>    第四个 

而当我们将next()去掉时只会打印第一个。

> 第一个

从而我们就知道了`next()`的作用就是执行完当前的中间件后，放行允许下一个中间件执行。
