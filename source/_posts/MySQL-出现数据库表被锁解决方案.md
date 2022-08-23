---
title: MySQL出现了数据库的表被锁定的解决办法
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-08-23 10:06:37
categories:
tags:
password: 1011
---

### 一、出现的现象

页面出现502错误，数据库CPU持续飙升，大量事务堆积未提交成功（事务一直处于阻塞阶段）

查看阻塞事务列表，发现其中有锁表现象。

还有一种情况就是网站被大量发起请求，或者攻击的时候，网站出现403报错。会出现网站页面打不开的情况，登录数据库管理系统里面，比如`phpadmin`里面就会看到有些表提示的是`in use`状态。这个情况就是说明数据库被锁定了，需要解锁。

### 二、排查与解决思路

1）查看数据库中是否有表被锁

```mysql
show open tables where in_use > 0;
```

如果上述返回有结果，说明有表正在被使用，返回字段如下

```mysql
| Database | Table | In_use | Name_locked |
```

2）查看进程（只会显示当前用户的进程，除非是root用户）

```mysql
show processlist;
```

3）查看当前运行所有事务

```mysql
SELECT * FROM information_schema.INNODB_TRX;
```

4）查看当前出现的所有锁

```mysql
SELECT * FROM information_schema.INNODB_LOCKs;
```

5）查询锁等待的对应关系

```mysql
SELECT * FROM information_schema.INNODB_LOCK_waits;
```

查看事务表 `INNODB_TRX`中 是否有正在锁定的事务线程

确认 ID 是否在 `show processlist` 的 `sleep` 线程中：如果在，说明这个sleep的线程事务一直没有commit 或者 rollback，而是卡住了，需要手动kill掉。

搜索的结果中，如果在事务表发现了很多任务，最好都 kill 掉。

6）清理事务指定的线程 ID

```
kill ID号;
```

