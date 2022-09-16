---
title: 使用Python快速监控网站状态
abstract: 该部分被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
date: 2022-09-15 19:14:33
categories:
- python
tags:
- 网站
- 监控
password: 1011
---

有朋友问怎么样监控自己的网站运行情况，这里分享一个方法给大家，使用Python运行哦。自己先安装python，笔者用的是python3.x.

新建一个python文件，名一个名称，比如`monitor.py`，python代码如下：

```python
# -*- coding: utf8 -*-
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)) + "/..")

import logging
import json
import requests
from email.mime.text import MIMEText
from email.header import Header
import smtplib

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# Third-party SMTP service for sending alert emails. 第三方 SMTP 服务，用于发送告警邮件
mail_host = "smtp.qq.com" #SMTP服务器,如QQ邮箱，需要在账户里开启SMTP服务
mail_user = "***@hipyt.cn"  # Username 用户名
mail_pass = "****"  # Password, SMTP service password. 口令，SMTP服务密码
mail_port = 465  # SMTP service port. SMTP服务端口

# The URL address need to dial test. 需要拨测的URL地址
test_url_list = [
    "https://www.hipyt.cn",
    "https://***",
    "https://tebk.cn",
    "https://***"
]

# The notification list of alert emails. 告警邮件通知列表
email_notify_list = {
    "**@**.cn",
    "***@gmail.com"
}


def sendEmail(fromAddr, toAddr, subject, content):
    sender = fromAddr
    receivers = [toAddr]
    message = MIMEText(content, 'plain', 'utf-8')
    message['From'] = Header(fromAddr, 'utf-8')
    message['To'] = Header(toAddr, 'utf-8')
    message['Subject'] = Header(subject, 'utf-8')
    try:
        smtpObj = smtplib.SMTP_SSL(mail_host, mail_port)
        smtpObj.login(mail_user, mail_pass)
        smtpObj.sendmail(sender, receivers, message.as_string())
        print("send email success")
        return True
    except smtplib.SMTPException as e:
        print(e)
        print("Error: send email fail")
        return False


def test_url(url_list):
    errorinfo = []
    for url in url_list:
        resp = None
        try:
            resp = requests.get(url, timeout=3)
            print (resp)
        except (
        requests.exceptions.Timeout, requests.exceptions.ConnectionError, requests.exceptions.ConnectTimeout) as e:
            logger.warn("request exceptions:" + str(e))
            errorinfo.append("Access " + url + " timeout")
        else:
            if resp.status_code >= 400:
                logger.warn("response status code fail:" + str(resp.status_code))
                errorinfo.append("Access " + url + " fail, status code:" + str(resp.status_code))
    if len(errorinfo) != 0:
        body = "\r\n".join(errorinfo)
        subject = "Please note: PlayCheck Error"
        for toAddr in email_notify_list:
            print ("send message [%s] to [%s]" % (body, toAddr))
            sendEmail(mail_user, toAddr, subject, body)


def main_handler(event, context):
    test_url(test_url_list)


if __name__ == '__main__':
    main_handler("", "")
```

然后用python直接运行这个文件即可。

说明：

- 开启一下QQ的SMTP服务，然后获取授权码，也就是SMTP服务密码，到时候需要填写在里面的。
- 设置一下自己的收件邮箱，可以使用另外一个QQ邮箱，当然也可以使用其他邮箱地址，能够收到电邮的就行了。
- Username 用户名，其实就是开启SMTP的邮箱用户名。

把这些准备好了之后，然后安装必要的python包，只要不报错，就可以看到哪些域名打不开的错误信息然后被发送到邮箱里面去了。

原文链接：https://cloud.tencent.com/developer/article/1866120
