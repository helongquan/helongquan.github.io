---
title: 前端性能优化之WebP图片
date: 2022-05-13 19:23:24
categories:
- 性能优化
- webp
tags: webp,图片
password: 552
---

#### 前言

前端性能涉及方方面面， 根据优化角度切入点的不同可以分为页面工程优化和代码细节优化两大方向。

页面工程优化： 从页面请求开始， 涉及网络协议、 资源配置、 浏览器性能、 缓存等；
代码细节优化： JavaScript 对 DOM 操作等。
今天要介绍的是一种叫WebP格式的图片。

#### WebP介绍

WebP 是由Google开发的一种新的图片格式，它支持有损压缩、无损压缩和透明度，压缩后的文件大小比JPEG、PNG等都要小。诸多的好处使它成为了当下前端性能优化的重要切入点之一。

#### 使用WebP

由于之前的一个项目中大量的使用了图片，这就让图片资源的优化成为了整个项目性能优化的瓶颈。虽然图片懒加载对性能有一定的提升，但是为了让性能得到更大的提升，我调研并应用了 WebP 格式图片进行替换。

WebP 的兼容性还不是很好，不过好在它兼容 Chrome，以及 Android 的 webview。
因为不是所有浏览器都支持 WebP 格式，为了解决问题，我进行了多种尝试

要么确保在支持 WebP 格式的浏览器中使用，要么让不支持 WebP 的浏览器支持这种格式。

为了让 WebP 可以应用到支持它的浏览器，并且在不支持的浏览器中依然使用传统的图片格式，

##### 解决方案1：

使用`<picture>`标签，`<picture>`是 H5 中的一个新标签，类似`<video>`它也可以指定多个格式的资源，由浏览器选择自己支持的格式进行加载。

```html
<picture class="picture">
  <source type="image/webp" srcset="image.webp">
  <img class="image" src="image.jpg">
</picture>
```

如果浏览器不支持 WebP 格式，那么会自动使用 img 标签，如果支持就会使用 WebP 图片。并且当浏览器不支持 `<picture>`标签时，也会默认使用 img 标签，图片仍然会正常展示。只不过 css 无法选取 `<picture>`标签，但是仍然会选取到 img 标签。
这种方式兼容性还算不错，不过依然有很大的局限性，如不能作用于 css 中的图片、背景图片。

##### 解决方案2：

使用JS替换图片的URL，类似图片懒加载的原理，根据浏览器是否支持 WebP 格式，给 img 的 src 赋不同的值。
具体的操作就是给浏览器一个 WebP 格式的图片，看浏览器是否能正确渲染，在这个异步的方法中根据渲染的成功与否，执行回调函数，然后将结果存储在localstorage中，避免重复检查。代码如下：

```javascript
function checkWebp(callback) {
  var img = new Image();
  img.onload = function () {
    var result = (img.width > 0) && (img.height > 0);
    callback(result);
  };
  img.onerror = function () {
    callback(false);
  };
  img.src = 'data:image/webp;base64,lAABSoBAQVXD+JaQAUkRAQCA4ADsJAAdAIBYAUAAlGRAwAA3AAEAA';
}
```

然后根据 checkWebp 的回调函数参数判断是否支持webp格式来决定是否替换src

```javascript
function showImage(supWebp){
  var imgs = Array.from(document.querySelectorAll('img'));

  imgs.forEach(function(i){
    var src = i.attributes['data-src'].value;

    // 如果支持则替换
    if (supWebp){
      src = src.replace(/\.jpg$/, '.webp');
    }

	i.src = src;
  });
}

checkWebp(showImage);
```

此种方式较为常用，也是社区里最为推荐的一种方式，可以很好的弥补方案1的缺陷。

##### 解决方案3：

让不支持 WebP 的浏览器支持 WebP 并不是不可能，但是根据目前的情况来看，很多项目没有必要这么做。因为虽然 WebP 的解码器是开源的，并且已经有用 js 写的比较成熟的 WebP 解码器，引入库按照说明即可进行解码成 base64，就可以让不支持 WebP 的浏览器支持 WebP ，不过由于 js 解码能力有限，速度比较慢，对性能有一定的影响，所以不是特别推荐，也不是目前主流的做法，需要自行根据项目实际情况选择使用。

##### 结语

以上就是目前比较常见的支持 WebP 的做法，经过各种流量测试，全站替换 WebP 后性能提升25%左右，虽然没有达到官方统计的30%以上，但提升还是非常大的。如果项目中大量的使用图片，那么 WebP 绝对是不可忽视的性能优化点。
