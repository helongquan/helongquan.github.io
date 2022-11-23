---
title: express中间件
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-11-23 18:13:29
categories:
- express
tags:
- express
- 中间件
password: 1011
---

概念：就是匹配路由完成之前或者匹配路由完成之后想要继续进行下面的操作；

### express框架里面的中间件包含以下：

- 应用级中间件
- 路由级中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件

语法：

```javascript
app.use(app.use((req,res,next)=>{

   next();

});
```

##### 1，应用级中间件(用于权限判断)

```javascript
/*

  res:请求

  req:响应

  next：下一步

*/
```

eg:在匹配路由之间打印当前时间

```javascript
app.use((req,res,next)=>{

  let data=new Date();

  console.log(data)

  next(); //执行下面的操作,如果不写的话下面就不会执行

})

app.get("/",(req,res)=>{

  res.send("我操作了");

})
```

##### 2，路由级中间件

如果有两个相同的路由，其中一个没有传值，匹配到第一个之后如果不加next,他就不会在匹配第二个

```javascript
app.get("/details",(req,res,next)=>{

  res.send("执行了");

  next();

})

app.get("/details:id",(req,res)=>{

  res.send("动态操作了");

})
```



##### 3，错误处理中间件

/*

  应用场景：如果上面的路由都没有匹配到的话它就会匹配到这个

*/

```javascript
app.use((req,res,next)=>{

  res.status(404).send("404页面");

})
```

##### 4，内置中间件

```javascript
app.use(express.static("static"))
```

##### 5，第三方中间件

作用：获取post传过来的数据

安装： `cnpm install body-parser --save`

使用：

```javascript
const bodyParser=require("body-parser");
```

设置中间件：  

```javascript
app.use(bodyParser.urlencoded({extended:false}));  //解析form传过来的值

app.use(bodyParser.json()); //解析传过来的json数据
```

接收:

```javascript
app.post("/login",(req,res)=>{

  //req.body 接收传过来的值

  res.send("执行了post请求");

})
```
