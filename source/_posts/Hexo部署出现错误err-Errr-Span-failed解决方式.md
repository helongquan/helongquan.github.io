---
title: 'Hexo部署出现错误err: Errr: Span failed解决方式'
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-05-18 00:05:19
categories: hexo
tags: hexo
password:
---

**部署过程中可能会出现错误**

```ruby
fatal: unable to access 'https://github.com/a956551943/a956551943.github.io/': Encountered end of file
FATAL {
  err: Error: Spawn failed
      at ChildProcess.<anonymous> (/usr/local/src/hexo/hanyubolg/node_modules/hexo-util/lib/spawn.js:51:21)
      at ChildProcess.emit (events.js:376:20)
      at Process.ChildProcess._handle.onexit (internal/child_process.js:277:12) {
    code: 128
  }
} Something's wrong. Maybe you can find the solution here: %s https://hexo.io/docs/troubleshooting.html
```

#### 解决方式一：

```bash
##进入站点根目录
cd /usr/local/src/hexo/hanyubolg/

##删除git提交内容文件夹
rm -rf .deploy_git/

##执行
git config --global core.autocrlf false

##最后
hexo clean && hexo g && hexo d
```

#### 解决方式二：有可能是你的git repo配置地址不正确,可以将http方式变更为ssh方式

```bash
##进入站点根目录
cd /usr/local/src/hexo/hanyubolg/

##删除git提交内容文件夹
vim _config.yml

##修改
deploy:

type: git

repo: https://github.com/yourname/yourname.github.io.git -> git@github.com:a956551943/weixiaohui.github.io.git

branch: master

##最后
hexo clean && hexo g && hexo d
```

#### 解决方式三：不建议

```bash
##进入站点根目录
cd /usr/local/src/hexo/hanyubolg/

##进入depoly文件夹
cd .deploy_git/

##强制推送
git push -f
```
