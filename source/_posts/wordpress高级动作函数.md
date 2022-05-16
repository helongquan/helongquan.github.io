---
title: wordpress高级动作函数
date: 2022-05-13 16:05:09
categories:
- wordpress专栏
tags: 动作
---



部分介绍的都是与WordPress查询（决定该显示哪一篇日志）、WordPress主循环、激活插件以及WordPress基础代码相关的动作函数。

**admin_menu**

控制板中的菜单结构显示无误后，执行此动作函数。

**admin_notices**

管理菜单显示在页面上时执行此动作函数。

**blog_privacy_selector**

博客默认隐私选项显示在页面上时，执行此动作函数。

**check_admin_referer**

系统出于安全考虑检查随机数后在默认函数check_admin_referrer中执行check_admin_referer动作钩子，使插件因安全原因而强制WordPress停止运行。注意：check_admin_referrer也是一个“插入式”函数，即插件可以改写该函数；参见插件API。

**check_ajax_referer**

系统从cookies中成功验证用户的登录名和密码后，在默认函数 check_ajax_referer（这是在有AJAX请求进入wp-admin/admin-ajax.php脚本时所调用的函数）中执行此动作函数，使插件能够因安全原因强制WordPress停止运行。注意： check_ajax_referer函数也是一个“插入式”函数，即插件可以改写该函数；参见插件API。

**generate_rewrite_rules**

重写规则生成后，执行此动作函数。函数接收的参数：WP_Rewrite类变量列表。注意：在修改重写规则时，使用rewrite_rules_array过滤器函数比使用该动作函数更加方便。

**init**

WordPress加载完毕但尚未发送页眉信息时执行该动作函数。函数适用于解析$_GET or $_POST 触发器。

**oop_end**

WordPress主循环最后一篇日志执行完毕后，执行此动作函数。

**loop_start**

执行WordPress主循环第一篇日志前，执行此动作函数。

**parse_query**

在主查询或WP_Query 的任何实例（如 query_posts，get_posts或get_children）中查询解析结束时，执行此动作函数。函数接收的参数：$wp_query 对象内容列表。

**parse_request**

在主WordPress函数wp中解析查询请求后，执行该动作函数。函数接收的参数：引用全局变量$wp对象的数组。

**pre_get_posts**

在get_posts函数开始操作查询前执行此动作函数。函数接收的参数：$wp_query对象的内容列表。

**sanitize_comment_cookies**

HTTP请求读取cookies后执行此动作函数。

**send_headers**

在WordPress主函数wp中发送基本HTTP页眉后执行此动作函数。函数接收的参数：引用全局变量$wp对象的数组。

**shutdown**

页面内容输出完毕后执行此动作函数。

**wp**

在WordPress主函数wp中解析查询、页面加载完毕后，执行模板前，执行此动作函数。函数接收的参数：引用全局变量$wp对象的数组。
