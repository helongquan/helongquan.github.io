---
title: e.target.value理解
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-11-26 10:41:01
categories:
tags:
password:
---

每次触发DOM事件时会产生一个事件对象（也称event对象），此处的参数e接收事件对象。而事件对象也有很多属性和方法，其中target属性是获取触发事件对象的目标，也就是绑定事件的元素，e.target表示该DOM元素，然后在获取其相应的属性值。

```javascript
$('.target1').change(function(e) {
    $("#result").html(e.target.value)
});
```

e.target就等价于 `$('target1')`，故e.target.value就等价于`$('target1').val()`



----

