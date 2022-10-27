---
title: Vue中获取input输入框值的两种方式
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-10-27 15:54:28
categories:
- vue
tags:
- vue
- 获取vue输入框的值
- input
password: 1011
---

在使用Vue开发中，我们会常常获取input框的值，在这跟大家总结一下我常用的两种方式。

#### 使用ref获取input框的值

```html
<template>
   <div>
       <div class="logininfor">
           <input type="text" placeholder="手机号码" ref="userphone">
           <input type="text" placeholder="密码" ref="userpass">
           <span @click="register()">注册</span>
       </div>
       <p>已有账号？去<span class="zhuce" @click="login()">登录</span></p>
   </div>
   <script>
 
export default {
    methods: {
            register(){
                window.console.log(this.$refs.userphone.value)
                window.console.log(this.$refs.userpass.value)
            }
        },
    }
</script>
</template>
```



#### 通过v-model双向绑定，完成input框值获取

```html
<template>
   <div>
       <div class="logininfor">
           <input type="text" placeholder="手机号码" v-model="userphone">
           <input type="text" placeholder="密码" v-model="userpass">
           <span @click="register()">注册</span>
       </div>
       <p>已有账号？去<span class="zhuce" @click="login()">登录</span></p>
   </div>
</template>
<script>
 
export default {
     data(){
        return{
            userphone:"",
            userpass:""
        }
    },
    methods: {
            register(){
                window.console.log(this.userphone,this.userpass)
            }
        },
    }
</script>
```

