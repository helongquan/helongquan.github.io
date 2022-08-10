---
title: javascript中添加数据到数组中,以及点击某一项数据从数组中删除方法
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-07-03 13:42:02
categories:
- 大前端
- javascript
tags: 数组
password: 802
---



javascript中添加数据到数组中,以及点击某一项数据从数组中删除方法

示例代码：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>数据添加和删除示例</title>
	</head>
	<body>
		<h2>购物清单</h2>
		<div>
			输入购物物品：<input type="text" name="wuping" value="" id="wupname">
			<input type="button" value="添加" onclick="addinto(this);">
		</div>
		<div id="result"></div>

		<script>
			// 实例化一个数组专门放数据
			var shoplist = new Array();
			var resutl = document.getElementById("result");
			
			// 添加数据
			function addinto(){
				var wup = document.getElementById("wupname").value;
				if(wup == "" | wup == null){
					alert("请输入物品名称");
					return;
				}
				shoplist.push(wup);
				
				// 重置input表单，设置为空值
				document.getElementById("wupname").value = "";
				getshoplist();
			}
			
			// 获取数据显示到页面上
			function getshoplist(){
				var list = '<ul>';
				for (let i = 0; i < shoplist.length; i++) {
					list += '<li>'+shoplist[i]+'<span onclick="Deelete(this);" index="'+[i]+'">删除</span></li>';
				}
				list += '</ul>';
				resutl.innerHTML = list;
				// console.log(shoplist);
			}
			
			// 从数组中删除点击的那一项的数据
			function Deelete(data){
			
				// 获取点击的dom的下标
				var currentIndex = data.getAttribute('index');
				// console.log(currentIndex);
				for (let j = 0; j < shoplist.length; j++) {
					// 获取当前数据的下标，然后跟整个数组进行匹配
					if(j == currentIndex){
						// 删除下标对应的数组项，删除一项，更多请参考splice函数
						shoplist.splice(currentIndex, 1);
					}
				}
				// 更新数组中数据在前台
				getshoplist();
			}	
			
		</script>
	</body>
</html>
```

##### 效果：

添加了一个页面，然后添加内容，然后显示到页面，然后点击删除就可以删除数据。



##### 重要说明：

javascript里面有一些是可以删除数组数据的，比如点击删除最前面的一项或者点击删除最后的一项，但是没有点击删除任意一项，这里就需要说明一个方法：`splice();`，这个方法就是指定数组下标，然后第二个参数就是删除的个数。默认是1.

根据上面的函数来说：

```javascript
...
shoplist.splice(currentIndex, 1);
...
```

这里就是数组shoplist，然后笔者点击了某一项，这一项我们要获取到点击的那一项的索引值，也就是数组的下标。我们可以在编码的时候预留到dom里面，这里就是：`<span onclick="Deelete(this);" index="'+[i]+'">删除</span>`这里的`[i]`便于我们获取。

更多请参考：https://www.cnblogs.com/lihongyun/p/15902747.html



