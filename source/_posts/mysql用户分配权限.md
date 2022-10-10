---
title: mysql用户分配权限
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-10-10 13:52:47
categories:
- mysql
tags:
- mysql
- 数据库
- 权限
- 授权
password: 1011
---

在`mysql`中用户权限是一个很重析 参数，因为台`mysql`服务器中会有大量的用户，每个用户的权限需要不一样的，下面我来介绍如何给`mysql`用户分配权限吧，有需要了解的朋友可参考。

#### mysql创建用户

语法：

`create user 用户名 identified by '密码';`

例：

```mysql
create user xiaogang identified by '123456';
```

新创建的用户，默认情况下是没有任何权限的。



#### 如何给用户分配权限

语法：

`grant 权限 on 数据库.数据表 to '用户' @ '主机名';`

例：给 xiaogang 分配所有的权限

```mysql
grant all on *.* to 'xiaogang'@'%';
```

这个时候 xiaogang 就拥有了所有权限了。



#### 如何更精准的控制用户的权限呢？

语法：

`grant 权限 on 数据库.数据表 to '用户' @ '主机名';`

例：让 xiaogang 有查询 temp 数据库 temp1 表的权限；

```mysql
grant select on temp.temp1 to 'xiaogang'@'%';  //这个时候 xiaogang 就具有查询temp数据库的temp1表的权限了。
```

例如：

```mssql
mysql>grant select,insert,update,delete,create,drop on vtdc.employee to joe@10.163.225.87 identified by '123';
```

给来自`10.163.225.87`服务器的用户joe分配可对`数据库vtdc`的`employee表`进行`select,insert,update,delete,create,drop`等操作的权限，并设定口令为123。

```mysql
mysql>grant all privileges on vtdc.* to joe@10.163.225.87 identified by '123';
```

给来自10.163.225.87的用户joe分配可对`数据库vtdc所有表`进行`所有操作的权限`，并设定口令为123。

```mysql
mysql>grant all privileges on *.* to joe@10.163.225.87 identified by '123';
```

给来自10.163.225.87的用户joe分配可对`所有数据库的所有表`进行`所有操作的权限`，并设定口令为123。

```mysql
mysql>grant all privileges on *.* to joe@localhost identified by '123';
```

给本机用户joe分配可对所有数据库的所有表进行所有操作的权限，并设定口令为123。



#### 如何收回权限,一般指有root用户才具有该权限

语法：

`revoke 权限 on 数据库.数据表 from '用户'@'主机名';`

例：收回 xiaogang的所有权限

```mysql
revoke all on *.* from 'xiaogang' @'%';
```

好了，下面我把步骤总结一下很具体的一个过程

##### 第一步：[mysql启动](http://www.dbbull.com/tab/44.html)和停止

这里要先去看下自己的电脑上面是否有安装mysql这个数据库软件。

```mysql
net stop MySQL80     #这个去services.msc里面看下数据库这个服务的名称叫啥，我电脑上安装的这个是MySQL80,也许你的不是这个版本的，如果是其他版本的名称可能不一样，自己更换一下这个即可。

net start MySQL80
```

这里可能有MySQL无服务以及服务无法启动的终极解决办法

`win+R`打开运行窗口，输入 `services.msc`

在里面找到mysql的服务名，比如我的服务名就是`MySQL80`

以管理员身份打开`cmd`，输入命令 `net start MySQL80`

就可以再次操作启动服务了，可能由于电脑有点慢，不要着急，等会儿应该就可以的。我当初就是重启这个服务之后，启动不来，然后就用上面这个方法再次运行命令解决了这个问题的。

更多，请参考如下链接：https://blog.csdn.net/cooper_wx/article/details/123433481



##### 第二步：直接登陆mysql

语法如下： 

`mysql -u用户名 -p用户密码`

键入命令`mysql -uroot -p`， 回车后提示你输入密码，比如输入`123456`，然后回车即可进入到`mysql`中了，`mysql`的提示符是：

```mysql
mysql>
```

注意，如果是连接到另外的机器上，则需要加入一个参数`-h机器IP`



##### 第三步：增加新用户

格式：

`grant 权限 on 数据库.* to 用户名@登录主机 identified by "密码"`

如，增加一个用户`user1`密码为`password1`，让其可以在本机上登录， 并对所有数据库有`查询、插入、修改、删除的权限`。首先用以root用户连入mysql，然后键入以下命令：

```mysql
grant select,insert,update,delete on *.* to user1@localhost Identified by "password1";
```

如果希望该用户能够`在任何机器上登陆mysql`，则`将localhost改为"%"`。

如果你`不想user1有密码`，可以再打一个命令将密码去掉。

```mysql
grant select,insert,update,delete on mydb.* to user1@localhost identified by "";    #这里的mydb就是你要操作的数据库，自己更换一下，如果默认所有的数据库，那么把mydb这个换成*号
```



##### 第四步： 操作数据库

登录到mysql中，然后在mysql的提示符下运行下列命令，每个命令以分号结束

上面的方法本人已验证确实可行，下面方法摘自网上内容，大家有兴趣可以继续阅读。

MySql中添加用户,新建数据库,用户授权,删除用户,修改密码(注意每行后边都跟个;表示一个命令语句结束):

##### 1.新建用户

**1.1 登录MYSQL：**

```mysql
@>mysql -u root -p

@>密码
```

##### 1.2 创建用户：

```mysql
mysql> insert into mysql.user(Host,User,Password) values("localhost","test",password("1234"));
```

这样就创建了一个名为：`test` ，密码为：`1234` 的用户。

注意：此处的"`localhost`"，是指该用户只能在本地登录，不能在另外一台机器上远程登录。如果想远程登录的话，将"localhost"改为"%"，表示在任何一台电脑上都可以登录。也可以指定某台机器可以远程登录。

##### 1.3 然后登录一下：

```mysql
mysql>exit;

@>mysql -u test -p

@>输入密码

mysql>登录成功
```

 

##### 2.为用户授权

授权格式：

`grant 权限 on 数据库.* to 用户名@登录主机 identified by "密码";`

###### 2.1 登录MYSQL（有ROOT权限），这里以ROOT身份登录：

```mysql
@>mysql -u root -p

@>密码
```

###### 2.2 首先为用户创建一个数据库(testDB)：

```mysql
mysql>create database testDB;
```

###### 2.3 授权test用户拥有testDB数据库的所有权限（某个数据库的所有权限）：

```mysql
mysql>grant all privileges on testDB.* to test@localhost identified by '1234';   #对testDB这个数据库拥有所有权限

mysql>flush privileges;//刷新系统权限表
```

格式：

`grant 权限 on 数据库.* to 用户名@登录主机 identified by "密码";`

###### 2.4 如果想指定部分权限给一用户，可以这样来写:

```mysql
mysql>grant select,update on testDB.* to test@localhost identified by '1234';  #仅开放查询、更新两个权限

mysql>flush privileges; //刷新系统权限表
```

###### 2.5 授权test用户拥有所有数据库的某些权限：  

```mysql
mysql>grant select,delete,update,create,drop on *.* to test@"%" identified by "1234";

//test用户对所有数据库都有select,delete,update,create,drop 权限。

//@"%" 表示对所有非本地主机授权，不包括localhost。（localhost地址设为127.0.0.1，如果设为真实的本地地址，不知道是否可以，没有验证。）

//对localhost授权：加上一句grant all privileges on testDB.* to test@localhost identified by '1234';即可。
```



##### 3、删除用户

```mysql
@>mysql -u root -p

@>密码

mysql>Delete FROM user Where User='test' and Host='localhost';

mysql>flush privileges;

mysql>drop database testDB; //删除用户的数据库
```

删除账户及权限：

```
>drop user 用户名@'%';

>drop user 用户名@localhost; 
```

 

##### 4. 修改指定用户密码

```mysql
@>mysql -u root -p

@>密码

mysql>update mysql.user set password=password('新密码') where User="test" and Host="localhost";

mysql>flush privileges;
```

 

**5. 列出所有数据库**

```mysql
mysql>show database;
```

 

**6. 切换数据库**

```mysql
mysql>use '数据库名';
```

 

**7. 列出所有表**

```mysql
mysql>show tables;
```

 

**8. 显示数据表结构**

```mysql
mysql>describe 表名;
```

 

**9. 删除数据库和数据表**

```mysql
mysql>drop database 数据库名;

mysql>drop table 数据表名;
```

