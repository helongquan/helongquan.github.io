---
title: background-position实现background-image背景图片偏移
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-09-13 12:08:59
categories:
- css
- background-position
tags:
- background
- 背景偏移
password: 1011
---



准备工作

这里需要准备好一张图片，图片里面有各种小图标，便于后面做图片位移使用，笔者这里使用的是一个垂直排列的图片，这张图片里面有五张小图标，每张图片之间的距离是6px，左右边距是5px，为什么要知道这些数据呢？因为后面要做位移的时候需要用到，如果觉得这样计算挺麻烦的，完全可以通过媒体编辑工具，比如photoshop来对这张图片里面的小图标做一个排位，然后只要确保每张图片的位置数据就可以定位到了。

这就上面代码里面有9.75px这种数据的原因。主要我们要知道原理就行了。当然还有其他方法定位好位置，比如用标尺工具定好坐标，或者是通过百分比的方式进行定位都可以。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>鼠标悬浮的时候背景位移示例</title>
    <style>
		.picture{
			display: flex;
			align-items: center;
		}
		.picture .tup{
			width: 50px;
			height: 50px;
			background-image: url(./t.png);
			background-repeat: no-repeat;
			transition: 0.8s ease;
			margin:15px;
			background-position:left calc(0px) top calc(0% - 0px);
		}
		.picture:hover .tup{
			/* background-position:left calc(0px) top calc(calc(100%/4)); */
			/* 这里就是可以通过倍数来进行计算到悬浮之后位移到那个图标，因为每一张小图标的尺寸是一致的，如果 */
			background-position:left calc(0px) top calc(2*calc(100%/5 - 9.75px));
		}
		/* 以下是通过伪类元素进行实现的一个示例 */
		.qianmian{
			position: relative;
			margin-left: 60px;
		}
		.qianmian:before{
			content: "";
			position: absolute;
			height: 50px;
			width: 50px;
			background-position:left calc(0px) top calc(100%/5 - 9.75px);
			background-image: url(./t.png);
			background-repeat: no-repeat;
			left: -55px;
			top:calc(50% - 25.55px);
			z-index: 99999;
			transition: 0.8s ease;
		}
		.picture:hover .qianmian:before{
			background-position:left calc(0px) top calc(0*calc(100%/5 - 9.75px));
		}
    </style>
</head>
<body>
    <div>
		<div class="picture">
			<span class="qianmian">世界，你好啊</span>
			<span class="tup"></span>
		</div>
    </div>
</body>
</html>
```

这里用了两个方式做一个演示：

- 直接通过背景图片的方式。
- 第二种方法就是通过伪类的方式。

其实效果一样的，只不过`css`的写法不一样，因为有些时候我们可能没有创建`DOM`的条件，就可以使用伪类的方式来实现了。

值得说明的是这里还是用了一个`calc()`这个方法来对定位有一个更加方便的实现方式。比如：

```css
...
background-position:left calc(0px) top calc(2*calc(100%/5 - 9.75px));
...
```

这里就是使用了一个倍数。

因为大图片里面有五张小图，每张图片尺寸一致，那么就意味着5张图平分`100%`，还有一个地方就是图片之间是有距离的，所以这里就使用`100%/5 - 9.75px`，这个距离是根据实例里面的情况设定的，大概就是`9.75px`，自己测试要根据自己情况来调整。

我们继续解读，`top calc(2*calc(100%/5 - 9.75px))`，就是说从顶部作为起始点，偏移的距离就是两倍，初始点不是以1作为其实点的，而是以0作为起始点的。所以标准算法就是：

```css
top calc(N*calc(100%/5 - 9.75px))
```

这里的N就是倍数，如果不偏移就是`N=0`，如果偏移一个图标的距离就是`N=1`，以此类推。
