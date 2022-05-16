---
title: 使用hexo theme Butterfly 报错
date: 2022-05-13 15:33:12
categories: Hexo专栏
tags: hexo
---

直接用github上作者提供的代码

```shell
git clone -b master [https://github.com/jerryc127/hexo-theme-butterfly.git](https://github.com/jerryc127/hexo-theme-butterfly.git) themes/Butterfly
```

结果是页面根本无法正常渲染，只有一行字：

```shell
extends includes/layout.pug block content include ./includes/mixins/post-ui.pug #recent-posts.recent-posts +postUI include includes/pagination.pug
```

##### 问题解决

参照原作者提供的文章[Butterfly](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.jerryc.me%2F%23%2Fconfig%2Fquestion)

按照方法安装`npm install hexo-renderer-pug hexo-renderer-stylus --save`然后打开
