---
title: css3中的animation属性
date: 2022-05-13 17:17:43
categories:
tags:
---

```html
<!DOCTYPE html>
<html>
    <head>
        <style> 
          div{width:100px;height:100px;background:red;animation:my 5s;}
          @keyframes my
         {
              0%{background:red;width:100px;}
              100%{background:blue;width:200px;}
         }
        </style>
    </head>
    <body>
        <div></div>
    </body>
</html>
```

#### 最常用的几种属性有以下几种：

1、animation-name(动画名称)

animation-name属性是必须存在的，因为animation-name的值默认是none，没有动画。

2、animation-duration(动画执行一次所需时间)

animation-duration属性也是必须存在的，因为animation-duration的值默认是0，没有动画。

3、animation-delay(动画在开始前的延迟时间)

animation-delay的值可以是秒（s）或者是毫秒（ms）,默认值是0，没有延迟。

4、animation-timing-function(动画以何种运行轨迹完成一个周期)

animation-timing-function的值是贝塞尔曲线，默认值是ease,表示动画以低速开始，然后加速，最后在结束前变慢。 最常用的值有以下几个：

- linear:表示动画从头到尾的速度都是相同的。

- ease-in:表示动画以低速开始。

- ease-out:表示动画以低速结束。

- ease-in-out:表示动画以低速开始和结束。

如果没有想用的值，也可以直接使用三次贝塞尔函数，使用网站是http://cubic-bezier.com，可直接调试出自己想要的值；也可以在浏览器中直接调试，现在浏览器调试工具中都支持贝塞尔函数可视化调试。

5、animation-iteration-count(动画播放次数)

animation-iteration-count属性值有两种：

- 直接写数字，自定义想要播放动画的次数。

- infinite：设置动画无线循环播放。

6、animation-fill-mode(定义元素动画结束以后或者未开始的元素样式) 

 默认值为none，标示，不会在动画结束或者未开始时给元素 添加样式 

常用属性值为：

- forwards:表示动画结束后，元素直接接使用当前样式。

- backwards:表示在动画延迟时间元素使用关键帧中from的属性值或者to属性值（当animation-direction为reverse或者alternate-reverse时）  

7、animation-direction(是否轮流反向播放动画)

默认值是normal，动画正常播放。如果动画只播放一次，则该属性无效。

常用的属性值为：

- reverse:表示动画反向播放。

- alternate:表示动画在奇数次播放时为正向播放，为偶数次播放时为反向播放。

- alternate-reverse: :表示动画在奇数次播放时为反向播放，为偶数次播放时为正向播放。        

animation属性在书写通常合并在一起，除非需要单独设置的属性值，animation属性的简写形式为：animation:code 2s 2s linear infinite alternate forwards;