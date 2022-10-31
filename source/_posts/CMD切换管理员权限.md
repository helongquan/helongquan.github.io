---
title: CMD切换管理员权限
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-10-31 12:00:14
categories:
- 服务器
- 
tags:
- cmd
- CMD
password: 1011
---

**方法一：鼠标右键**

这个方法比较比较普通，点开开始找到cmd，右击鼠标“以管理员身份运行（A）”这样调用就是管理员的权限；

**方法二：快捷模式**

在点开win+R后，选择“以管理员身份运行”，然后确定；可以这还是会调出UAC的提示界面，选择“是”即可；

**方法三：纯键盘模式**

点开开始，在开始的输入框中输入cmd，这个时候出现cmd的快捷方式，可以采用方法一的方法启用管理员调用，但这里我们不用鼠标，直接按住`CTRL+SHIFT+ENTER`三个键就可以直接调用管理员权限的cmd了，同时摁这三个键，然后摁enter键就可以了。

**方法四：命令模式**

我们可以直接进入非管理员模式的cmd，然后输入：

```shell
runas /user:administrator cmd
```

但是这里你得知道administrator的密码。

而这里不用administrator这个用户也可以，可以用同在一个管理组中的其他用户来启动cmd也是可以的，权限同样是管理员，比如administrators中还有一个用户叫：`abc` 那么可以用命令：`runas /user:abc cmd`。

这个时候只要输入abc用户的登录密码即可。
