---
title: vue组件引入及使用的几种方式
abstract: 该部分被加密了, 请输入密码才能查看.
message: 
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-10-15 11:51:55
categories:
- vue
tags:
- vue组件引入
password: 1011
---

在vue的项目开发过程中，基本都是基于组件化开发项目，总结下使用组件的几个点：

##### 一、@符号的使用

在vue项目中 @ 符号代表的是[根目录](https://so.csdn.net/so/search?q=根目录&spm=1001.2101.3001.7020)，即 src 目录。



##### 二、组件的放置位置

在项目中，公用的组件放置在 components 目录下，项目组件新建 views 目录来存放：

![](https://img-blog.csdnimg.cn/img_convert/ee05602d78c5645aece8f478df05967c.png)



##### 三、组件的引和使用方法

1、第一种引入和使用方法：

```javascript
import navs from '@/views/nav/index'
```

使用组件：

```javascript
components:{
  'v-nav':navs
}
```

模板中使用组件：

```javascript
<v-nav></v-nav>
```

2、第二种引入和使用方法

```javascript
import navs from '@/views/nav/index'
import indexList from './index-list'
```

使用组件：

```javascript
components: { navs,indexList },
```

模板中使用：

```javascript
<index-list></index-list>
<navs></navs>
```

3、第三种使用方法

组件目录：

![](https://img-blog.csdnimg.cn/img_convert/aa3d322fe9ee59ce8b43e82e45442fcb.png)

引入方式：

```javascript
import BackToTop from '@/components/BackToTop'
```

使用组件：

```javascript
components: { BackToTop },
```

使用组件：

```javascript
<el-tooltip placement="top" content="tooltip">
  <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
</el-tooltip>
```

其实没什么，只是要注意下组件大小写命名的写法。
