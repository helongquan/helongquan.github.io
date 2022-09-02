---
title: node.js关于一个js文件引用另一个js文件里面的函数或者数组变量
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-09-02 16:58:09
categories:
- 大前端
- nodejs
tags:
- 函数和变量
- 引入
password:
---

很多时候我们在写一个主文件或者其他文件的时候难免需要写一些函数，可能有些时候这些函数会很长，那么如果写在一起会导致整个文件很长，可维护性和可读性都不太好，所以我们需要拆分来引入，这样可以大大降低我们的文件代码量。

### node.js中跨文件的数据使用目前知道的有以下两种方式：

#### global变量

例：`1.js` 中有

```javascript
function debug(){
   console.log('debug');
}

global.debug = debug;
```

`2.js`中require `1.js`之后就可以直接调用函数`debug`了 如下：

```javascript
require('1.js');

debug();
```



#### exports方式

`1.js`中有

```javascript
var array = 'this is debug';

module.exports.array = array;
```

`2.js`中require `1.js`但是要使用一个对象接它， 例子如下：

```javascript
var t= require('1.js');

console.log(t.array);
```

原文链接：https://blog.csdn.net/rocky0503/article/details/78834715
