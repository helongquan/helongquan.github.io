---
title: nodejs+Ajax访问路由,返回json数据
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-08-25 23:41:16
categories:
- 大前端
- nodejs
tags:
- nodejs
- 路由
password:
---

以用户登录为例，直接上代码。

```javascript
//js操作 Ajax请求代码
$("#login-submit").click(function(){
        //do something
        var loginData={};
        loginData.userName=$("#userName").val();
        loginData.userPassword=$("#userPassword").val();
        console.log(loginData);
        $.ajax({
            data: loginData,
            url: '/login',
            type:"post",
            dataType: 'JSON',
            success: function(data){
                console.log(data);
                location.reload()
            },
            error: function(textStatus){
                console.log('error ' + textStatus );
            }
        });
})
```

node路由代码，如下：

```javascript
app.post('/login', function (req, res) {
        //生成密码的 md5 值
        var md5 = crypto.createHash('md5'),
            password =         md5.update(req.body.userPassword).digest('hex');
        //检查用户是否存在
        User.get(req.body.userName, function (err, user) {
            if (!user) {
                console.log('error', '用户不存在!');
                req.flash('error', '用户不存在!');
                return res.redirect('/login');//用户不存在则跳转到登录页
            }
            //检查密码是否一致
            if (user.password != password) {
                console.log('error', '密码错误!');
                req.flash('error', '密码错误!');
                return res.redirect('/login');//密码错误则跳转到登录页
            }
            //用户名密码都匹配后，将用户信息存入 session
            req.session.user = user;
            console.log(user);
            req.flash('success', '登陆成功!');
            res.json({"result":{message:"success"}});
        });
});
```

