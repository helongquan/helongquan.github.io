---
title: javascript删除数组和添加数组数据元素的几个方法
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-07-03 12:24:16
categories:
- 大前端
- javascript
tags: 数组
password:
---

在JavaScript中，除了Object之外，Array类型（数组）恐怕就是最常用的类型了。与其他语言的数组相比，JavaScript中的Array非常灵活。这种灵活性有利有弊，好处是其富有创造性，可以提供各种灵活的解决方案；坏处是容易脑子不够用，因为事实上，它太灵活了，灵活到无法控制的抓狂。

前面调侃了几句，回归正题，这里要总结几个在JavaScript中删除Array元素的方法，分别是利用length属性、delete关键字、pop()栈方法、shift()队列方法、splice()操作方法、forEach()或filter()迭代方法和prototype原型方法。

> length属性

JavaScript中Array的length属性非常有特点一一它不是只读的。因此，可以通过设置这个属性来达到从数组的末尾移除项或添加新项的目的。

```javascript
var colors = ["red", "blue", "grey"]; // 创建一个包含3个字符串的数组
colors.length = 2;

console.log(colors[2]); // undefined
```

> delete关键字

JavaScript提供了一个delete关键字用来删除（清除）数组元素。

```javascript
var colors = ["red", "blue", "grey", "green"];
delete colors[0];

console.log(colors); // [undefined, "blue", "grey", "green"]
```

要注意的是，使用delete删除元素之后数组长度不变，只是被删除元素被置为undefined了。

> pop()栈方法

JavaScript中的Array对象提供了一个pop()栈方法用于弹出并返回数组中的最后一项，某种程度上可以当做删除用。

栈数据结构的访问规则是FILO（First In Last Out，先进后出），栈操作在栈顶添加项，从栈顶移除项，使用pop()方法，它能移除数组中的最后一项并返回该项，并且数组的长度减1。

```javascript
var colors = ["red", "blue", "grey"];
var color = colors.pop();

console.log(color); // "grey"
console.log(colors.length); // 2
```

可以看出，在调用pop()方法时，数组返回最后一项，即”grey”，数组的元素也仅剩两项。

> shift()队列方法

JavaScript中的Array对象提供了一个shift()队列方法用于弹出并返回数组中的第一项，某种程度上也可以当做删除用。

队列数据结构的访问规则是FIFO（First In First Out，先进先出），队列在列表的末端添加项，从列表的前端移除项，使用shift()方法，它能够移除数组中的第一个项并返回该项，并且数组的长度减1。

```javascript
var colors = ["red", "blue", "grey"];
var color = colors.shift();

console.log(color); // "red"
console.log(colors.length); // 2
```

可以看出，在调用shift()方法时，数组返回第一项，即”red”，数组的元素也仅剩两项。

> splice()操作方法

在JavaScript的Array对象中提供了一个splice()方法用于对数组进行特定的操作。splice()恐怕要算最强大的数组方法了，他的用法有很多种，在此只介绍删除数组元素的方法。在删除数组元素的时候，它可以删除任意数量的项，只需要指定2个参数：要删除的第一项的位置和要删除的项数。

```javascript
var colors = ["red", "blue", "grey"];
var color = colors.splice(0, 1);

console.log(color); // "red"
console.log(colors); // ["blue", "grey"]
```

可以看出，在调用了splice(0, 1)方法时，数组从第一项开始，删除了一项。

> 迭代方法

所谓的迭代方法就是用循环迭代数组元素，发现符合要删除的项则删除。用的最多的地方，可能是当数组中的元素为对象的时候，可以根据对象的某个属性（例如ID）来删除数组元素。

第一种用最常见的ForEach循环来对比元素找到之后将其删除。



```
var colors = ["red", "blue", "grey"];

colors.forEach(function(item, index, arr) {
    if(item === "red") {
        arr.splice(index, 1);
    }
});
```

可以看到这里还要配合splice()方法去实现删除，循环只是为了找到特定的元素。另外一种思路是循环将不需要删除的元素推入到新的数组中，也能达到假性删除特定元素的目的。

第二种我们用循环中的filter方法。

```javascript
var colors = ["red", "blue", "grey"];

colors = colors.filter(function(item) {
    return item != "red"
});
 
console.log(colors); // ["blue", "grey"]
```

代码很简单，找出元素不是red的项数返回给colors（其实是得到了一个新的数组，并不是在原数组上进行删除操作），一定程度上也算是达到了删除特定元素的目的。

> prototype原型方法

可以通过在Array的原型上添加方法来达到删除的目的。

```javascript
Array.prototype.remove = function(dx) {
　　if(isNaN(dx) || dx > this.length){
　　　　return false;
　　}

　　for(var i = 0, n = 0; i < this.length; i++) {
　　　　if(this[i] != this[dx]) {
　　　　　　this[n++] = this[i];
　　　　}
　　}
　　this.length -= 1;
};

var colors = ["red", "blue", "grey"];
colors.remove(1);

console.log(colors); // ["red", "grey"]
```

这种方法其实就是自己实现一个删除的逻辑，然后把删除方法添加给了Array的原型对象，则在此环境中的所有Array对象都可以使用该方法。尽管可以这么做，但是不推荐在产品化的程序中修改原生对象的原型。道理很简单，如果只是某个实现中缺少某个方法，就在原生对象的原型中添加这个方法，那么当在另一个支持该方法的实现中运行代码时，就可能导致命名冲突。而且这样做可能会意外地导致原生方法被重写。

原文链接：https://www.cnblogs.com/lihongyun/p/15902747.html
