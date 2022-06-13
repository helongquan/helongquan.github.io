---
title: flex布局
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-06-13 15:10:02
categories:
- 大前端
- css3
tags: flex
password:
---

flex（Flexible Box）布局（弹性布局）是W3C在2009年提出的一种新的布局方案。

当你设置了flex布局之后 子元素的float、clear和vertical-align属性将失去作用。

相对于传统的display属性 + position属性 + float属性布局，更容易实现一些功能。

可以简便的完整的响应式的支持g各种页面布局。

```css
div{
	display:flex;
}
```

**flex的几个属性：**

### 一、flex-direction

1、row（默认值）：主轴为水平方向，起点在左端。
2、row-reverse：主轴为水平方向，起点在右端。
3、column：主轴为垂直方向，起点在上沿。
4、column-reverse：主轴为垂直方向，起点在下沿。

```css
flex-direction:row;
flex-direction:row-reverse;
flex-direction:column;
flex-direction:column-reverse;
```

### 二、flex-wrap

1、nowrap（默认）：不换行。
2、wrap：换行，第一行在上方。
3、wrap-reverse：换行，第一行在下方。

```css
flex-wrap:nowarp;
flex-wrap:warp;
flex-wrap:warp-reverse;
```

### 三、justify-content

1、flex-start（默认值）：左对齐
2、flex-end：右对齐
3、center： 居中
4、space-between：两端对齐，项目之间的间隔都相等。
5、space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

```css
justify-content:flex-start;
justify-content:flex-end;
justify-content:center;
justify-content:space-between;
justify-content:space-around;
```

### 四、align-items

1、flex-start：交叉轴的起点对齐。
2、flex-end：交叉轴的终点对齐。
3、center：交叉轴的中点对齐。
4、baseline: 项目的第一行文字的基线对齐。
5、stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

```css
align-items:flex-start;
align-items:flex-end;
align-items:center;
align-items:baseline;
align-items:stretch;
```

### 五、align-content

1、flex-start：与交叉轴的起点对齐。
2、flex-end：与交叉轴的终点对齐。
3、center：与交叉轴的中点对齐。
4、space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
5、space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
6、stretch（默认值）：轴线占满整个交叉轴。

```css
align-content:flex-start;
align-content:flex-end;
align-content:center;
align-content:span-between;
align-content:space-around;
align-content:stretch;
```
