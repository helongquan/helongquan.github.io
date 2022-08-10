---
title: 16个实用JavaScript代码片段DOM,Cookie,数组,对象
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-08-10 21:35:12
categories:
- 大前端
- web端
tags: JavaScript
password: 802
---

在 JavaScript 的世界里，简洁的代码 `==` 更好，本文将通过项目开发设计的知识点整理一些可能涉及的 16 个JavaScript代码片段。

### DOM

> DOM，即文档对象模型，是前端开发必须要掌握的基础之一，将 web 页面与到脚本或编程语言连接起来，通常是指 JavaScript，但将 HTML、SVG 或 XML 文档建模为对象并不是 JavaScript 语言的一部分。

##### 元素是否被聚焦

```javascript
const hasFocus = (ele) => ele === document.activeElement;
```

##### 获取元素所有兄弟

```javascript
const elemSiblings = (ele) =>  [].slice.call(ele.parentNode.children).filter((child) => child !== ele);
```

##### 获取选定文本

```javascript
const getSelectedText = () => window.getSelection().toString();
```

##### 返回上一页

```javascript
history.back();
// 或者
history.go(-1);
```

> 如果页面存在数据刷新，如新增完数据返回上一页并需要更新数据就不可以使用上述代码。

##### cookie

> HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。是WEB项目开发需要涉及的内容。

##### 设置 cookie

```javascript
const setCookie = (name, value, options = { days: 30, path: "/" }) => {
    const exp = new Date();
    const strExpires = exp
        .setTime(exp.getTime() + options.days * 24 * 60 * 60 * 1000)
        .toGMTString();
    const cValue = escape(value);
    document.cookie = `${name}=${cValue};expires=${strExpires};path=${options.path}}`;
};
```

##### 获取 cookie

```javascript
const getCookie = (name) => {
    let arr;
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
    } else {
        return null;
    }
};
```

##### 清除所有 cookie

```javascript
const clearCookies = () =>
    document.cookie
        .split(";")
        .forEach(
            (cookie) =>
                (document.cookie = cookie
                    .replace(/^ +/, "")
                    .replace(
                        /=.*/,
                        `=;expires=${new Date().toUTCString()};path=/`
                    ))
        );
```

##### 将 cookie 值转为对象

```js
const getCookiesToObject = () => document.cookie
    .split(";")
    .map((item) => item.split("="))
    .reduce((acc, [k, v]) => (acc[k.trim().replace('"', "")] = v) && acc, {});
```

执行上述方法获取的 cookie 值如下：

```js
{
    "_ga": "GA1.2.819625059.1595074",
    "UM_distinctid": "17ad89255d847c-0555b2aae93c4-35637203-4b9600-17ad892",
    "NTES_P_UTID": "V49vEqFIeNsfT42uWYetvS3MW|1627641003",
    "CNZZDATA5664324": "cnzz_eid%3D298304137-1627126536-https%253A%252F%25",
    "CNZZDATA1257114097": "1974355"
}
```

##### 数组

JavaScript 中常用的数组方法大概是 10 个左右，方法的使用可以参阅《[JavaScript 数组操作必须熟练运用的 10 个方法](https://zhuanlan.zhihu.com/p/435807760)》。

##### 数组比较

```js
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
// 或者
const isEqual = (a, b) =>
    a.length === b.length && a.every((v, i) => v === b[i]);
// 实例
console.log(isEqual([5, 3], [5, 3])); // true
console.log(isEqual([5, 3], [5, "3"])); // false
console.log(isEqual([5, 3], [3, 5])); // false
```

##### 对象数组转对象

```js
const toObject = (arr, key) =>
    arr.reduce((acc, current) => ({ ...acc, [current[key]]: current }), {});
或者;
const toObject = (arr, key) =>
    Object.fromEntries(arr.map((it) => [it[key], it]));
const arrayTest = [
    {
        id: 1,
        title: "数组方法for",
    },
    {
        id: 2,
        title: "数组方法forEach",
    },
];
console.log(toObject(arrayTest, "id"));

/*
{
  '1': { id: 1, title: '数组方法for' },
  '2': { id: 2, title: '数组方法forEach' }
}
*/
```

##### 对象数组按照属性值计数

```js
const countBy = (arr, prop) =>
    arr.reduce(
        (prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev),
        {}
    );
// 实例

const arrayTest = [
    { branch: "huawei", model: "p30" },
    { branch: "huawei", model: "nova 8" },
    { branch: "xiaomi", model: "Redmi 9A" },
    { branch: "xiaomi", model: "Redmi Note 9" },
    { branch: "oppo", model: "Reno6" },
];
console.log(countBy(arrayTest, "branch"));
// { huawei: 2, xiaomi: 2, oppo: 1 }
```

##### 检查数组是否为空

```js
const isNotEmpty = (arr) => Array.isArray(arr) && Object.keys(arr).length > 0;
// 实例
console.log(isNotEmpty([])); // false
console.log(isNotEmpty([1, 3])); // true
```

##### 对象

对象在JavaScript中是一种非常重要的数据类型，它们有很多有用的方法，在平常项目开发中可以使用这些方法容易地处理对象。关于对象推荐阅读《[JavaScript 中优雅处理对象的6个方法](https://zhuanlan.zhihu.com/p/438267610)》和《[JavaScript对象创建模式](https://zhuanlan.zhihu.com/p/469643800)》。

##### 对象是否相等

```js
const isEqual = (...objects) =>
    objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));
// 实例
console.log(isEqual({ title: "js", desc: "js" }, { desc: "js", title: "js" })); // false
console.log(isEqual({ title: "js", desc: "js" }, { title: "js", desc: "js" })); // true
```

##### 从对象数组中提取属性值

```js
const pluck = (objs, property) => objs.map((obj) => obj[property]);
// 实例
const arrayTest = [
    {
        title: "for",
    },
    {
        title: "forEach",
    },
    {
        title: "for...of",
    },
];
console.log(pluck(arrayTest, "title")); // [ 'for', 'forEach', 'for...of' ]
```

##### 从对象中删除所有空和未定义的属性

```js
const removeNullUndefined = (obj) =>
    Object.entries(obj).reduce(
        (acc, [k, v]) => (v == null ? acc : ((acc[k] = v), acc)),
        {}
    );
// 或者
const removeNullUndefined = (obj) =>
    Object.entries(obj)
        .filter(([_, v]) => v != null)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
const testObj = {
    title: "js",
    desc: null,
    view: undefined,
};

console.log(removeNullUndefined(testObj)); // {title:'js'}
```

##### 对象是否为空

```js
const isEmpty = (obj) => Object.keys(obj).length === 0;
console.log(isEmpty({})); // true
console.log(isEmpty({ title: "js" })); // false
```

原文链接：https://zhuanlan.zhihu.com/p/474950712
