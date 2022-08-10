---
title: centos7操作系统环境采用nodejs-websocket搭建websocket服务器
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-06-23 11:42:21
categories:
- 大前端
- websocket
tags: node.js,websocket
password: 802
---



#### 先把操作系统的防火墙关了（firwall和selinux）

为了避免不必要的问题，我们先把防火墙关了，当然也可以不关防火墙，把端口打开也行。

##### 一、环境准备

###### 1.1 查看系统环境

```shell
[root@localhost ~]#  cat /etc/redhat-release 
CentOS Linux release 7.5.1804 (Core) 
[root@localhost ~]# uname -m
x86_64
[root@localhost ~]# uname -r
3.10.0-862.el7.x86_64
```

###### 1.2 关闭防火墙和selinux

1.2.1 关闭防火墙

```shell
#停止防火墙
systemctl stop firewalld
#开机禁止启动防火墙
systemctl disable firewalld
```

1.2.2 关闭selinux

```shell
[root@mysql-5 ~]# getenforce                 #查看selinux是否开启
Enforcing                                         #enforcing表示selinux开启的，
[root@mysql-5 ~]# sed -i 's/SELINUX=enforcing/SELINUX=disabled/g'  /etc/selinux/config      #修改配置文件，需要重启才后永久关闭
[root@mysql-5 ~]# setenforce 0      #临时关闭selinx
[root@mysql-5 ~]# getenforce      #查看是否关闭
Disabled
```

修改完了之后，如果是测试环境可以考虑重启一下服务器。



#### 先安装node.js到centos系统（如果失败可以先删除干净重新安装）

##### 如果以前安装过node.js，那么可以删除旧的 nodejs 版本用新版本来替代，如果没必须要卸载，请忽略这一步

```csharp
yum remove nodejs
```

##### 添加Node.js Yum存储库

最新版发布：

```ruby
$ yum clean all && yum makecache fast
$ yum install -y gcc-c++ make
$ curl -sL https://rpm.nodesource.com/setup_12.x | sudo -E bash -
```

稳定版发布：

```ruby
$ yum clean all && yum makecache fast
$ yum install -y gcc-c++ make
$ curl -sL https://rpm.nodesource.com/setup_10.x | sudo -E bash -
```

##### 在CentOS7上安装Node.js和安装npm

```undefined
yum install nodejs
```

检查Node.js和NPM版本，**补充一下**：https://registry.npmmirror.com/binary.html?path=node/latest-v18.x/这个是node.js的下载地址。

```undefined
#查看node.js版本
node -v

#查看npm版本
npm -v
```

如果输入npm有问题，比如：`-bash: npm: command not found`，网上很多用户说这个是配置问题，软连接问题，其实都测试过不是，那么还是不能解决怎么办？根据如下操作试一下：

```shell
#估计是找不到源，先试试这个
sudo yum install epel-release
#然后安装npm
sudo yum install npm
```

这样就把npm给安装好了。

原文链接：https://github.com/MCSManager/MCSManager/issues/162

当然，也可能会出现的报错：`npm WARN saveError ENOENT: no such file or directory`

安装完成`node.js`后使用`npm`也可能出现这样的报错。

```javascript
...
npm WARN saveError ENOENT: no such file or directory, open '...\package.json'
npm WARN enoent ENOENT: no such file or directory, open '...\package.json'
npm WARN lxz No description
npm WARN lxz No repository field.
npm WARN lxz No README data
npm WARN lxz No license field.

up to date in 0.765s
```


根据错误提示，是系统没有`package.json`这个文件导致。这个文件的作用就是管理你本地安装的npm包，一个package.json文件可以做如下事情：

展示项目所依赖的npm包 

允许你指定一个包的版本[范围] 

让你建立起稳定，意味着你可以更好的与其他开发者共享

此刻我们需要执行命令：

```
npm init
```

创建package.json文件，系统会提示相关配置，也可以使用命令：

```
npm init -y
```

直接创建package.json文件，这样创建好处是必填项已经帮你填好，执行完命令后可以看到用户路径下多了一个package.json文件。

参考链接：https://blog.csdn.net/qq_32068809/article/details/79512709

##### 如果想要卸载node.js呢？

###### 1，使用 yum 先删除一次node

```shell
yum remove nodejs npm -y
```

###### 2，手动删除残留npm

- 进入 /usr/local/lib 删除全部 node 和 node_modules文件夹

- 进入 /usr/local/include 删除全部 node 和 node_modules 文件夹

- 检查 ~ 文件夹里面的"local" "lib" "include" 文件夹，而后删除里面的全部 "node" 和 "node_modules" 文件夹

- 可使用如下命令查找

  ```shell
  find ~/ -name node
  find ~/ -name node_modules
  ```

###### 3，进入 /usr/local/bin 删除 node 的可执行文件

- 删除: /usr/local/bin/npm
- 删除: /usr/local/share/man/man1/node.1
- 删除: /usr/local/lib/dtrace/node.d
- 删除: rm -rf /home/[homedir]/.npm
- 删除: rm -rf /home/root/.npm



#### 在安装了node.js环境的目录下编写一个服务端的websocket程序

##### 1，安装模块

```shell
npm install nodejs-websocket
```

##### 2，搭建websocket服务端

这个是一个js文件，我们暂且命名为`websocket.js`，，这个文件就是放在node.js安装的目录下：

```shell
[root@localhost ~]# ls
anaconda-ks.cfg  node_modules  package.json  package-lock.json  websocet.js
```

另外，`websocket.js`代码如下：

```javascript
//websocket.js
// 搭建websocket服务器
const ws = require("nodejs-websocket");
var _server = ws.createServer(conn => {
	// 接收客户端返回的数据
	conn.on("text", function(str) {
		console.log(str, "接收客户端传过来的值");
		
	});

    //客户端关闭连接
	conn.on("close", function() {
		
	});

	conn.on("error", function(err) {
		//error
		console.log(err, "连接报错");
	});
});
// 定义端口为2002【端口自己随意定义】
const port = 2002;
_server.listen(port, function() {
	
	console.log("连接成功")
	console.log('listening on websocketServer');
})
```

##### 3，搭建websocket客户端

写个简单的客户端，这个是页面写的内容，代码如下：

```javascript
<script>
    //建立连接
    var ws = new WebSocket("ws://localhost:2002");

    ws.onopen = function(evt) {
        console.log("Connection open ...");
        let sendobj={
            id:"0001",
            name:"你好吗？我是鸟蛋"
        }
        console.log(sendobj);
        // ws.send(sendobj);
        ws.send(sendobj.name);
    };

    ws.onmessage = function(e) {
        console.log(typeof e.data);
        console.log(e);
        ws.close()
    };


    ws.onclose = function(evt) {
        console.log("Connection closed.");
    };
    
    ws.onerror = function(err){
        console.log(err);
    }

</script>
```



##### 4，启动上面写好的js

在服务器端（centos7系统）执行命令行运行这个js文件，启动websocket服务器

> [node](https://so.csdn.net/so/search?q=node&spm=1001.2101.3001.7020) websocket.js

启动结束以后显示一下画面，如下：

```shell
[root@localhost ~]# node websocet.js
连接成功
listening on websocketServer

```

我们在客户端启动一个本地http服务，然后访问一下这个客户端页面，然后设置一个值传送给服务端就行。

```shell
12:01:50.416 {"id":"0001","name":"你好吗？我是鸟蛋"} at websocket/index2.html:18
14:17:04.464 Connection closed. at websocket/index2.html:31
```

这样就把前端的消息发送到服务端了。服务端就可以收到来自前端的消息，如果通信是正常的话，会看这样的消息：

```shell
[root@localhost ~]# node websocet.js
连接成功
listening on websocketServer
你好吗？我是鸟蛋 接收客户端传过来的值
```

```json
Request URL: ws://192.168.100.22:2002/
Request Method: GET
Status Code: 101 Switching Protocols
Connection: Upgrade
Sec-WebSocket-Accept: 9EhTkREsL6mP2wc+sHQpt3ZYLqk=
Upgrade: websocket
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: no-cache
Connection: Upgrade
Host: 192.168.100.22:2002
Origin: http://192.168.100.8:8848
Pragma: no-cache
```

很明显这里使用的就是websocket那边的协议进行通信的。

原文链接：https://blog.csdn.net/qq_35779070/article/details/109531390



值得补充的内容，我们可以测试从服务端如何获取来自客户端的消息进行显示出来，然后从服务端符合发消息给客户端等等，本文后续补充，敬请期待。

