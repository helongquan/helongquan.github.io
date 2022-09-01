---
title: Nodejs,express和websocket实现即时通讯
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2021-09-01 14:37:16
categories:
- 大前端
- nodejs
- websocket
tags:
- websocket
password: 1011
---

1，创建一个空文件夹, 安装包 

```shell
npm init -y
npm i nodejs-websocket --save
```

2，服务端代码, 在node.js当前目录创建 `app.js` 文件.

```javascript
// 安装express
const express = require('express');
const app = express();

// 在app文件夹下开启静态化服务
app.use('/',express.static('../app'));

var ws = require("nodejs-websocket");
console.log("开始建立连接...");

const socketPool = [];

const socket = ws.createServer(function (conn) {
  conn.on("text", function (str) {
    console.log(str);
    const params = JSON.parse(str);
    console.log(params);
    const { type, from, to, message } = params;
    // 创建连接通知
    if (type === 1) {
      const s = {
        name: from,
        conn,
      };
      socketPool.push(s);
      console.log(socketPool);
    } else if (type === 2) {
      const index = socketPool.findIndex((i) => i.name === to);
      if (index >= 0) {
        socketPool[index].conn.sendText(
          JSON.stringify({
            from: to,
            to: from,
            message,
          })
        );
      }
    }
  });
  conn.on("close", function (code, reason) {
    console.log("关闭连接", reason);
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭");
  });
});

socket.listen(8001, () => {
  console.log("WebSocket建立完毕");
});

// 这里我们再开一个web服务端口用来打开前端页面
app.listen(8002, function () {
  console.log("访问地址为 localhost:8002")
})
```

3，用户端我们命名为zhangsan, 在任意位置创建`zhangsan.html`，为了更好的规范，我把这个放在了`node.js`项目里面的app目录里面。页面代码如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>user-张三</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .message_box {
        width: 600px;
        height: 100vh;
        background-color: pink;
        display: flex;
        flex-direction: column;
      }

      .msg_list {
        flex: 1;
        overflow-y: auto;
      }

      .btn_box {
        flex: 0 0 40px;
        background-color: red;
        display: flex;
      }

      .btn_box input {
        width: 540px;
        height: 100%;
      }

      .btn_box .btn {
        flex: 1;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <div class="message_box">
      <div class="msg_list"></div>
      <div class="btn_box">
        <input type="text" id="ipt" />
        <div class="btn" id="btn">发送</div>
      </div>
    </div>

    <script>
      const btn = document.querySelector("#btn");
      const msgList = document.querySelector(".msg_list");
      let ws;
      if (window.WebSocket) {
        ws = new WebSocket("ws://127.0.0.1:8001");

        ws.onopen = function (e) {
          ws.send(
            JSON.stringify({
              type: 1,
              from: "zs",
            })
          );
        };
        ws.onclose = function (e) {
          console.log("服务器关闭");
        };
        ws.onerror = function () {
          console.log("连接出错");
        };

        ws.onmessage = function (e) {
          data = JSON.parse(e.data);
          const div = document.createElement("div");
          div.innerText = `收到${data.from}的消息 ---------- ${data.message}`;
          msgList.append(div);
        };

        btn.addEventListener("click", (ev) => {
          const ipt = document.querySelector("#ipt");
          const v = ipt.value;
          ws.send(
            JSON.stringify({
              from: "zs",
              to: "ls",
              type: 2,
              message: v,
            })
          );
          ipt.value = "";
        });
      }
    </script>
  </body>
</html>
```

4，在任意位置创建`lisi.html`，为了更好的规范，我把这个放在了node.js项目里面的app目录里面。页面代码如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>user-李四</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .message_box {
        width: 600px;
        height: 100vh;
        background-color: pink;
        display: flex;
        flex-direction: column;
      }

      .msg_list {
        flex: 1;
        overflow-y: auto;
      }

      .btn_box {
        flex: 0 0 40px;
        background-color: red;
        display: flex;
      }

      .btn_box input {
        width: 540px;
        height: 100%;
      }

      .btn_box .btn {
        flex: 1;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <div class="message_box">
      <div class="msg_list"></div>
      <div class="btn_box">
        <input type="text" id="ipt" />
        <div class="btn" id="btn">发送</div>
      </div>
    </div>

    <script>
      const btn = document.querySelector("#btn");
      const msgList = document.querySelector(".msg_list");
      let ws;
      if (window.WebSocket) {
        ws = new WebSocket("ws://127.0.0.1:8001");

        ws.onopen = function (e) {
          ws.send(
            JSON.stringify({
              type: 1,
              from: "ls",
            })
          );
        };
        ws.onclose = function (e) {
          console.log("服务器关闭");
        };
        ws.onerror = function () {
          console.log("连接出错");
        };

        ws.onmessage = function (e) {
          data = JSON.parse(e.data);
          const div = document.createElement("div");
          div.innerText = `收到${data.from}的消息 ---------- ${data.message}`;
          msgList.append(div);
        };

        btn.addEventListener("click", (ev) => {
          const ipt = document.querySelector("#ipt");
          const v = ipt.value;
          ws.send(
            JSON.stringify({
              from: "ls",
              to: "zs",
              type: 2,
              message: v,
            })
          );
          ipt.value = "";
        });
      }
    </script>
  </body>
</html>
```

##### 5，启动流程

在`app.js`目录, `cmd` 运行 `node app.js` 提示 

WebSocket建立完毕

说明长连接创建完成

用不同的浏览器分别打开

`zhangsan.html` 和 `lisi.html`页面。链接地址：

```
// 用浏览器A打开zhagnsan.html页面
http://localhost:8002/zhangsan.html

// 用浏览器B打开lisi.html页面
http://localhost:8002/lisi.html
```

这样就能愉快的发送消息了。
