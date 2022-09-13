---
title: css里面的var变量的使用方式示例演示
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-09-13 16:39:28
categories:
- css
tags:
- var()变量
password: 1011
---





### 示例代码如下：

```css
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			:root {
			  --themeq-bg: #222;
			  --default-background: #683728;
			  --background-demo: #efefef;
			  --h2-font-size:28px;
			  --h3-font-size:22px;
			  --h4-font-size:18px;
			  --button-black-font-color:#fff;
			  --button-light-font-color:#222;
			  --default-nco_padding: 15px 30px;
			  --default-margin-value:15px auto;
			  --default-font-size:16px;
			  --border-radius-default:5px;
			}
			.box{
			    color: var(--theme-bg);
			}
			.contiane{
				background: var(--background-demo);
				padding:20% 10%;
				border-radius: var(--border-radius-default);
			}
			.mweng{
				position: relative;
				margin-right: 20px;
				/* color: #135792; */
				color: var(--themeq-bg);
			}
			.wegv{
				margin:var(--default-margin-value);
				border: 0px solid;
				background: var(--default-background);
			}
			.wegv a{
				text-decoration: none;
				font-size:var(--default-font-size);
				padding: var(--default-nco_padding);
				display: inline-block;
				color: var(--button-black-font-color);
			}
		</style>
	</head>
	<body>
		<div class="contiane">
			<h2>悬浮这里的售后，图标会变化</h2>
			<div class="mweng">
				这里是文字说明区域。
			</div>
			<button class="wegv"><a href="#">点击这里</a></button>
		</div>
	</body>
</html>
```

使用`var()`方法的好处就是，可以批量进行管理，直接修改变量的值就可以直接批量替换页面中很多样式。这样可以非常方便的对样式进行一键控制，特别是在页面皮肤管理方面是很有帮助的。
