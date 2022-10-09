---
title: express添加mysql配置
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-10-09 23:20:25
categories:
- mysql
- express
tags:
- 数据库
- mysql
password:
---

##### 一、安装MySQL模块：

```shell
npm install mysql
```



##### 二、配置数据库连接参数（dbconfig.js）

```javascript
//mysql配置文件
var mysql = {
    host: "xx.xxx.xx.xxx", //这是数据库的地址
    user: "xxx", //需要用户的名字
    password: "xxx", //用户密码 ，如果你没有密码，直接双引号就是
    database: "xxx" //数据库名字
} 
module.exports = mysql; //用module.exports暴露出这个接口
```



##### 三、连接数据库（index.js）

###### 1、查询 

```javascript
var mysql = require('mysql')
var dbConfig = require('../config/dbconfig')
router.get('/db',function(req,res){
   var conn =mysql.createConnection(dbConfig)//连接数据库
   conn.query("select * from student",function(err,results,fields){
     if(err){
       throw err
     }
     console.log(results)
   })
   conn.end((err)=>{ //关闭数据库
     if(err){
       console.error(err.stack)
       return 
     }
   })
})
```

######    2、插入数据

```javascript
router.post('/insert',function(req,res){
   var data = {s_id:'09',s_name:'杨洋',s_birth:new Date(),s_gender:'男'}
   var conn =mysql.createConnection(dbConfig)//连接数据库
   conn.query("insert into student set ?",data,function(err,results,fields){
     if(err){
       throw err
     }
     console.log(results)
   })
   conn.end((err)=>{ //关闭数据库
     if(err){
       console.error(err.stack)
       return 
     }
   })
})
```

###### 3、删除数据

```javascript
router.post('/delete',function(req,res){
   var conn =mysql.createConnection(dbConfig)//连接数据库
   conn.query("delete from student where s_id = ?",'09',function(err,results,fields){
     if(err){
       throw err
     }
     console.log(results)
   })
   conn.end((err)=>{ //关闭数据库
     if(err){
       console.error(err.stack)
       return 
     }
   })
})
```

###### 4、更新数据

```javascript
router.post('/update',function(req,res){
  var conn =mysql.createConnection(dbConfig)//连接数据库
  conn.query("update student set s_name = ?,s_gender=? where s_id=?",['张三','男','02'],function(err,results,fields){
    if(err){
      throw err
    }
    console.log(results)
  })
  conn.end((err)=>{ //关闭数据库
    if(err){
      console.error(err.stack)
      return 
    }
  })
})
```
