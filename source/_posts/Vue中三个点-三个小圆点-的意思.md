---
title: Vue中三个点(三个小圆点)的意思
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-10-24 23:15:56
categories:
- vue
tags:
- 三个点
- 三个小圆点
password: 1011
---

**这三个点：`...`是扩展运算符。**

对数组和对象而言，就是将运算符后面的变量里东西每一项拆下来。

### 一，操作数组

```javascript
// 1.把数组中的元素孤立起来
let iArray = ['1', '2', '3'];
console.log(...iArray);
// 打印结果  1 2 3

      
// 2.在数组中添加元素
let iArray = ['1', '2', '3'];
console.log(['0', ...iArray, '4']);
// 打印结果  ["0", "1", "2", "3", "4"]

      
// 3.在数组中删除元素（取出一个元素）
// 与结构赋值的结合
// 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first);　　// 打印结果 1
console.log([...rest]);　　// 打印结果 [2, 3, 4, 5]

const [one, ...last] = ["foo"];
console.log(one);　　// 打印结果 foo
console.log([...last]);　　// 打印结果 []

      
// 4.数组的合并
// ES6 的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);
console.log(arr1); // 打印结果 [0, 1, 2, 3, 4, 5]
// 推荐使用写法
console.log([...arr1, ...arr2]); // 打印结果 [0, 1, 2, 3, 4, 5]

// 5.将字符串转成数组
let iString = 'zhongguoren';
console.log([...iString]); // 打印结果 ["z", "h", "o", "n", "g", "g", "u", "o", "r", "e", "n"]

// 6.Map 和 Set 结构， Generator 函数
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
let arr = [...map.keys()];
console.log(arr);
// 打印结果 [1, 2, 3]
 
// 7.当做参数传递和直接传数组的区别
iClick4() {
    let iArray = ['1', '2', '3'];
    //注意传的时候，就要三个点
    this.hanshu(...iArray);
},
hanshu(...iArray) {
    let ooo = 1;
    console.log(...iArray);
    // 打印结果 1 2 3
},
        
// 8.求出最大值
let iArray = [1, 2, 3, 99, 44, 66, 21, 85, 77];
let ooo = Math.max(...iArray);
console.log(ooo);
// 打印结果 99

// 9.如果对没有iterator接口的对象，使用扩展运算符，将会报错。
let obj = {
  name: 'zhh',
  age: '20'
}
console.log([...obj]);
```



### 二，操作对象

```javascript
// 1.添加一个属性
let a = {age: 18, id: 10};
let c = {name: 'zhh', ...a};
console.log(c);    
// 打印结果  {name: "zhh", age: 18, id: 10}

// 2.修改一个属性
let a = {name: 'zhh', age: 18, id: 10};
let c = {...a, name: 'zhh1'};
console.log(c);    
// 打印结果  {name: "zhh1", age: 18, id: 10}

// 3.删除一个属性（拿出属性或者对象）
let a = {name: 'zhh', age: 18, id: 10};
let {name, ...c} = a;
console.log(name, c);    
// 打印结果 zhh {age: 18, id: 10}
```



---



扩展说明：（更新时间2022年10月24日）

##### 1，含义

扩展[运算符](https://so.csdn.net/so/search?q=运算符&spm=1001.2101.3001.7020)（ spread ）是三个点（`...`）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```javascript
console.log(...[1, 2, 3])
// 1 2 3
console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5
[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```

该运算符主要用于函数调用。

```javascript
function push(array, ...items) {
array.push(...items);
}
function add(x, y) {
return x + y;
}
var numbers = [4, 38];
add(...numbers) // 42
```

上面代码中，`array.push(...items)`和`add(...numbers)`这两行，都是函数的调用，它们的都使用了扩展运算符。该运算符将一个数组，变为参数序列。

扩展运算符与正常的函数参数可以结合使用，非常灵活。

```javascript
function f(v, w, x, y, z) { }
var args = [0, 1];
f(-1, ...args, 2, ...[3]);
```

##### 2，替代[数组](https://so.csdn.net/so/search?q=数组&spm=1001.2101.3001.7020)的 apply 方法

由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。

```javascript
// ES5 的写法
function f(x, y, z) {
// ...
}
var args = [0, 1, 2];
f.apply(null, args);
// ES6 的写法
function f(x, y, z) {
// ...
}
var args = [0, 1, 2];
f(...args);
```

下面是扩展运算符取代apply方法的一个实际的例子，应用`Math.max`方法，简化求出一个数组最大元素的写法。

```javascript
// ES5 的写法
Math.max.apply(null, [14, 3, 77])
// ES6 的写法
Math.max(...[14, 3, 77])
//  等同于
Math.max(14, 3, 77);
```

上面代码表示，由于 JavaScript 不提供求数组最大元素的函数，所以只能套用`Math.max`函数，将数组转为一个参数序列，然后求最大值。有了扩展运算符以后，就可以直接用`Math.max`了。

另一个例子是通过push函数，将一个数组添加到另一个数组的尾部。

```javascript
// ES5 的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);
// ES6 的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);
```

上面代码的 ES5 写法中，push方法的参数不能是数组，所以只好通过apply方法变通使用push方法。有了扩展运算符，就可以直接将数组传入push方法。

下面是另外一个例子。

```javascript
// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);
```



##### 3，扩展运算符的应用

###### 1，合并数组

扩展运算符提供了数组合并的新写法。

```javascript
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];
// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]
// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```

###### 2，与解构赋值结合

扩展运算符可以与解构赋值结合起来，用于生成数组。

```javascript
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
下面是另外一些例子。
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest // [2, 3, 4, 5]
const [first, ...rest] = [];
first // undefined
rest // []:
const [first, ...rest] = ["foo"];
first // "foo"
rest // []
```

如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

```javascript
const [...butLast, last] = [1, 2, 3, 4, 5];
//  报错
const [first, ...middle, last] = [1, 2, 3, 4, 5];
//  报错
```

###### 3，函数的返回值

JavaScript 的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。

```javascript
var dateFields = readDateFields(database);
var d = new Date(...dateFields);
```

上面代码从数据库取出一行数据，通过扩展运算符，直接将其传入构造函数Date。



###### 4，字符串

扩展运算符还可以将字符串转为真正的数组。

```json
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

上面的写法，有一个重要的好处，那就是能够正确识别 32 位的 Unicode 字符。

```javascript
'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3
```

上面代码的第一种写法， JavaScript 会将 32 位 Unicode 字符，识别为 2 个字符，采用扩展运算符就没有这个问题。因此，正确返回字符串长度的函数，可以像下面这样写。

```javascript
function length(str) {
return [...str].length;
}
length('x\uD83D\uDE80y') // 3
```

凡是涉及到操作 32 位 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写。

```javascript
let str = 'x\uD83D\uDE80y';
str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'
[...str].reverse().join('')
// 'y\uD83D\uDE80x'
```

上面代码中，如果不用扩展运算符，字符串的reverse操作就不正确。



###### 5，实现了 Iterator 接口的对象

任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组。

```javascript
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
```

上面代码中，querySelectorAll方法返回的是一个nodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了 Iterator 接口。

对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。

```javascript
let arrayLike = {
'0': 'a',
'1': 'b',
'2': 'c',
length: 3
};
// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
```

上面代码中，arrayLike是一个类似数组的对象，但是没有部署 Iterator 接口，扩展运算符就会报错。这时，可以改为使用Array.from方法将arrayLike转为真正的数组。



###### 6，Map 和 Set 结构， Generator 函数

扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。

```javascript
let map = new Map([
[1, 'one'],
[2, 'two'],
[3, 'three'],
]);
let arr = [...map.keys()]; // [1, 2, 3]
```

Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。

```javascript
var go = function*(){
yield 1;
yield 2;
yield 3;
};
[...go()] // [1, 2, 3]
```

上面代码中，变量go是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。

如果对没有iterator接口的对象，使用扩展运算符，将会报错。

```javascript
var obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: Cannot spread non-iterable object
```



##### 备注：

参考过的原文链接：

https://blog.csdn.net/qq_30100043/article/details/53391308

https://www.cnblogs.com/Yan3399/p/14868123.html
