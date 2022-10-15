---
title: vue组件的几种写法
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-10-15 11:15:06
categories:
- vue
tags:
- vue
- 组件
password: 1011
---

数据驱动和组件化是vue.js两个最重要的特点。组件化是为了方便代码复用，提高开发效率。常见的vue组件写法有四种，各有特色，适用于不同的场景。

### 1.全局组件

##### 结构：

```javascript
// 组件的注册
Vue.component( 'componentName', {
    template:  // 组件的html结构,
    data(){
        return{
            // 组件中的属性
        }
    },
    method: {
        // 组件中的方法
    }
    ...... // 组件其他的属性和方法
})
 
// 组件的使用
new Vue({
    el: '#app'
})

```

在script标签内通过Vue.[component](https://so.csdn.net/so/search?q=component&spm=1001.2101.3001.7020)()定义一个全局组件，并通过new Vue()实例将组件应用到html文件中id为app的标签内。

##### 特点:

- 可以直接在html文件中的script标签内直接定义与使用；

- 通过该方法定义的组件是全局组件，在任何Vue实例下都可以使用，适合项目比较简单的场景；

- 每次定义组件时都要重新使用Vue.component()，且组件名不能相同；

### 2.局部组件

##### 结构：

```javascript
// 构造组件对象
const componentName = {
    template:  // 组件的html结构,
    data(){
        return{
            // 组件中的属性
        }
    },
    method: {
        // 组件中的方法
    }
    ...... // 组件其他的属性和方法
}
// 组件的使用
new Vue({
    el: '#app',
    components: {
        // 组件注册、调用
        componentName
    }
})

```

在script标签中通过定义一个组件对象，并通过Vue实例中components属性将该组件注册调用。

##### 特点：

- 与全局方式定义的组件相似，都可以直接在html文件中的script标签中直接书写组件与使用；

- 只有在注册过的Vue实例中才能使用该组件；

### 3、使用template标签

##### 结构：

```html
<template id="componnet">
    // 组件的html结构
</template>
```

```javascript
// 全局组件的注册与使用
Vue.component( 'componentName', {
    template:  '#component',
    data(){
        return{
            // 组件中的属性
        }
    },
    method: {
        // 组件中的方法
    }
    ...... // 组件其他的属性和方法
})
 
new Vue({
    el: '#app'
})
```

```javascript
// 局部组件的注册与使用
const componentName = {
    template:  '#component',
    data(){
        return{
            // 组件中的属性
        }
    },
    method: {
        // 组件中的方法
    }
    ...... // 组件其他的属性和方法
}
 
new Vue({
    el: '#app',
    components: {
        // 组件注册、调用
        componentName
    }
})

```

使用template标签将组件中的html结构写在body标签内部，在script标签内按照全局组件和局部组件的方式注册与使用。不同之处在于组件中template属性是通过id引用。

##### 特点:

- js文件中不包含html结构内容，实现结构与逻辑分离；

### 4、单文件组件

##### 结构：

```html
<template lang="html">
    // 组件中的html结构
</template>

<script>
    //组件的逻辑
    export default {
        // 组件的属性和方法
    }
</script>

<style lang="css" scoped>
    // 组件的样式
</style>

```

创建一个尾缀为vue的文件，文件名即为组件名。组件内包含三部分内容：html结构、js逻辑、css样式，分别对应于不同的标签。使用时组件时，通过import引入即可使用。

##### 特点：

- 组件与组件之间互不影响，复用性高，其html、css、js均可复用；

- 组件的结构、逻辑清晰；

- 适用于大型复杂项目，适合多人开发；
