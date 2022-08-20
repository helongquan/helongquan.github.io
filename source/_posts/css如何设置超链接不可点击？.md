---
title: css如何设置超链接不可点击?
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-08-20 12:08:21
categories:
- 大前端
- css
tags:
- 链接
- pointer-events
password:
---

css可以通过`pointer-events、color、cursor`属性设置超链接颜色、鼠标样式和链接失效实现超链接不可点击效果。

设置超链接不可点击的css样式：

```css
a{ 
    pointer-events:none; 
    color:#afafaf; 
    cursor:default;
}
```

上述样式详解：

> pointer-events:none;设置链接失效，pointer-events属性指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的target。
>
> color:#afafaf;样式设置链接颜色为灰色。
>
> cursor:default设置鼠标在链接上的样式。

示例

```html
<!DOCTYPE html> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<title>设置超链接不可点击实例</title> 
<style> 
    a{ 
        pointer-events:none; 
        color:#afafaf; 
        cursor:default;
    } 
</style>
</head> 
<body> 
	<a href="https://www.html.cn/">HTML中文网</a>
</body> 
</html>
```

