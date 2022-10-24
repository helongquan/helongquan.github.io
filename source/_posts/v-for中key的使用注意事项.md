---
title: v-for中key的使用注意事项
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-10-24 22:24:05
categories:
- vue
tags:
- key
- v-for
- 循环
password: 1011
---

##### 必须在使用 `v-for` 的同时，指定唯一的`字符串/数字` 类型 `:key` 值

```html
<p v-for="item in list" :key="item.id">
```

示例数据如下：

```
  list: [
    { id: 1, name: '李斯' },
    { id: 2, name: '嬴政' },
    { id: 3, name: '赵高' },
    { id: 4, name: '韩非' },
    { id: 5, name: '荀子' }
  ]
```

##### 1、v-for循环普通数组？

使用方法：

```html
<p v-for="(item, i) in list">索引值：{{i}} --- 每一项：{{item}}</p>
```

示例数据：

```javascript
list: [1, 2, 3, 4, 5, 6]
```



##### 2、v-for循环对象数组？

使用方法：

```html
<p v-for="(user, i) in list">Id：{{ user.id }} --- 名字：{{ user.name }} --- 索引：{{i}}</p>
```

示例数据：

```json
list: [
    { id: 1, name: 'zs1' },
    { id: 2, name: 'zs2' },
    { id: 3, name: 'zs3' },
    { id: 4, name: 'zs4' }
]
```



##### 3、v-for循环对象？

使用方法：

```html
<p v-for="(val, key, i) in user">值是： {{ val }} --- 键是： {{key}} -- 索引： {{i}}</p>
```

注意：在遍历对象身上的键值对的时候，除了有 `val` ，`key` ，在第三个位置还有一个索引。

```json
user: {
  id: 1,
  name: '托尼·屎大颗',
  gender: '男'
}
```



##### 4、v-for迭代数字？

使用方法：

```html
<p v-for="count in 10">这是第 {{ count }} 次循环</p>
```

**注意：**如果使用 `v-for` 迭代数字的话，前面的 `count` 值从 `1` 开始。
