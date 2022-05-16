---
layout: wordpress开发api之钩子大全
title: wordpress开发api之钩子大全
date: 2022-05-11 17:35:37
tags: wordpress
---

> 本文着重介绍了“钩子”的应用程序接口，这里的钩子又被称为“过滤器”和“动作”。WordPress通过钩子来运行插件。这些钩子也可以用在主题中，WordPress中插件开发人员可以使用的API（应用程序接口）钩子（hook）进行扩展开发

#### 钩子，动作与过滤器

> WordPress用钩子将插件“勾进”WordPress系统中，让插件与WordPress相连接。也就是说，通过钩子，WordPress能够在特定时间内调用插件中的函数，让插件开始运行。下面是钩子的两种形式：

> 1. 动作（Actions）：在系统运行的某些特定时间点或发生特定事件时，WordPress核心程序会调用一些钩子。这里WordPress所调用的钩子被称为“动作”。插件用动作API来指定在上述特定时间点内需要执行的PHP函数。

> 1. 过滤器（Filters）：WordPress将不同类型文本添加到数据库或发送给浏览器窗口前，需要调用一些钩子来修改上述不同类型文本。这里WordPress所调用的钩子被称为“过滤器”。通过使用滤器API，插件可以执行一个或多个PHP函数以修改上述不同类型文本。

> 有时我们可以直接通过动作或过滤器实现以上效果。例如，如果我们希望用插件来改变某篇日志内容，可以为publish_post添加一个动作函数（保存到数据库时修改日志），也可以为the_content添加一个过滤器函数（显示到浏览器窗口时修改日志）。

#### 函数引用

**过滤器函数**

- has_filters
- add_filter()
- apply_filters()
- current_filter
- merge_filters()
- remove_filter()
- remove_all_filters

**动作函数**

- has_action
- add_action
- do_action
- do_action_ref_array
- did_action
- remove_action
- remove_all_actions

**动作**

动作由发生在WordPress中的特定事件触发，如发表日志、更改主题、显示控制板页面等。插件以执行PHP函数的方式来响应该事件，函数的作用可能是：

更改数据库资料
发送电子邮件消息
更改浏览器窗口上显示的信息（网站管理员或终端用户）
基本步骤如下（下文中有详细介绍）：

1. 在插件文件中创建一个可以在事件发生时执行的PHP函数
2. 调用add_action，将动作函数勾入WordPress
3. 将创建的PHP函数存放在插件文件中，激活该函数

**创建动作函数**

要在插件中新建一个动作函数，首先要用插件中该动作的功能来创建一个PHP函数，然后将函数存入插件文件（我们需要将插件文件放在wp-content/plugins目录下）。例如，如果我们希望每次我们发表新日志，博客都会以电子邮件的方式通知我们的朋友，我们可以定义以下函数：

```javascript
function email_friends($post_ID)  {
    $friends = 'bob@example.org,susie@example.org';
    mail($friends, "sally's blog updated", 
      'I just put something on my blog: http://blog.example.com');
    return $post_ID;
}
```

大多数动作函数都能接受一个参数（通常是日志ID或评论ID，取决于动作的性质）。有些动作函数能接收更多参数——更多信息请参照动作的说明文档或WordPress源代码。除参数外，我们也可以获取WordPress的全局变量，调用其它WordPress函数（或插件文件中的函数）。

函数输出的内容会出现在调用动作的页面源代码中。

注意：其它插件或WordPress核心文件中的函数可能已经使用了我们所创建的函数名称。

## **勾入WordPress（连接到WordPress程序中）**

定义PHP函数后，我们要将函数连接到WordPress中。可以在插件文件的全局变量执行域中调用add_action来实现连接：

**add_action ( 'hook_name', 'your_function_name', [priority], [accepted_args] );**
其中：

**hook_name**

WordPress动作钩子的名称，通过名称我们可以了解到函数与什么事件相关联。

**your_function_name**

hook_name指定事件后，需要执行的函数名。函数需要是WordPress核心文件中的标准PHP函数，或是我们在插件文件中定义的函数（如上文中定义的'email_friends'）。

**priority**

用一个可选的整数型变量来规定函数（与特定动作相关联）的执行顺序，变量值默认为10。若某函数的priority值小于10，优先执行该函数。如果若干函数priority值相等，则按加入动作的顺序执行函数。

**accept_args**

用一个可选的整数型变量来定义函数能够接受的参数数量（默认值为1）。有些钩子能够向函数传递一个以上参数，因此accept_args实用价值较大。参数引进于WordPress 1.5.1。

根据上面的例子，我们要在插件文件中加入以下代码行：

**add_action ( 'publish_post', 'email_friends' );**
同样，我们也可以删除动作钩子中的动作。

**安装与激活**

最后我们要安装文件、激活插件以运行动作钩子。我们要将创建的PHP函数和add_filter调用存入一个PHP文件并将该PHP文件安装在wp-content/plugins目录下。安装完毕后，在WordPress的管理界面中激活插件；参见管理插件。

**当前动作钩子**

插件API/常用动作（action）中列出了WordPress现有动作钩子以及之前WordPress版本的链接。

**过滤器（Filters）**

过滤器是WordPres在运行中的特定时间点、对数据进行操作（如将数据加入数据库，或将数据发送到浏览器窗口上）前，用来传递数据的函数。WordPress生成页面时，过滤器位于数据库和浏览器之间；当WordPress将新日志和评论加入到数据库中时，过滤器位于浏览器和数据库之间。WordPress中大多数输入和输出内容都至少经过一个过滤器的传递。默认情况下WordPress会执行一些过滤行为，但插件也可以添加自己的过滤器函数。

将过滤器函数加入WordPress的基本步骤如下（下文中有详细描述）：

1. 创建一个可以过滤数据的PHP函数
2. 调用add_filter()，将过滤器函数勾入WordPress
3. 将创建的PHP函数存放在插件文件中，激活该函数

**创建过滤器函数**

过滤器函数将未经修改的数据作为输入内容，返回修改后的数据（有时会返回空值来表示该数据应该被删除或忽略）。如果过滤器函数没有对数据做修改，则应该返回原始数据，方便插件必要时修改数据值。

因此要在插件中新建一个过滤器函数，首先要创建一个PHP函数负责过滤，然后将该PHP函数存入插件文件（插件文件必须位于wp-content/plugins目录下）。例如，如果希望我们的日志和评论中没有亵渎性语言，我们需要定义一个全局变量，列出所有不允许出现的词语，然后创建PHP函数：

`function filter_profanity($content) { global $profanities; $content=str_ireplace($profanities,'{censored}',$content); return $content; }`
为什么这里不用循环也可以？这是因为$profanities是一个数组，str_replace可以帮我们循环该数组。

注意：其它插件或WordPress核心文件中的函数可能已经使用了我们所创建的函数名称。

**将过滤器勾入WordPress（连接到WordPress程序中）**

定义PHP函数后，我们要将过滤器函数连接到WordPress中。可以在插件文件的全局变量执行域中调用add_filter来实现连接：

**add_filter ( 'hook_name', 'your_filter', [priority], [accepted_args] );**
其中：

**hook_name**

WordPress过滤器钩子的名称，通过名称我们可以了解到什么时候需要用到过滤器函数。

**your_function_name**

用于过滤的函数的名称。函数需要是WordPress核心文件中的标准PHP函数，或是我们在插件文件中定义的函数。

**priority**

用一个可选的整数型变量来规定函数（该函数与特定过滤器相关联）的执行顺序，变量值默认为10。若某函数的priority值小于10，优先执行该函数。如果若干函数priority值相等，则按加入过滤器的顺序执行函数。

**accept_args**

用一个可选的整数型变量来定义函数能够接受的参数数量（默认值为1）。有些钩子能够向函数传递一个以上参数，因此accept_args实用价值较大。

根据上面的例子，我们要在插件文件的主执行区域中加入以下代码行，让WordPress过滤含有亵渎性内容的评论：

**add_filter('comment_text','filter_profanity');**

我们也可以用remove_filter()删除过滤器钩子中的过滤器函数。

**安装与激活**

最后我们要安装文件、激活插件以运行过滤器钩子。我们要将创建的PHP函数和add_filter调用存入一个PHP文件并且将该PHP文件安装在wp-content/plugins目录下。安装完毕后，在WordPress的管理界面中激活插件；参见管理插件。

**当前过滤器钩子**

插件API/常用动作（action）中列出了WordPress现有过滤器钩子以及之前WordPress版本的链接。

**示例**

这是wp-hackers邮件列表中的一个示例。该示例用一个插件来更改（或重写）默认的bloginfo()函数。这将会修改核心函数。

```javascript
add_filter('bloginfo', 'mybloginfo', 1, 2);
add_filter('bloginfo_url', 'mybloginfo', 1, 2);

function mybloginfo($result='', $show='') {
        switch ($show) {
        case 'wpurl':
                $result = SITE_URL;
                break;
        case 'template_directory':
                $result = TEMPL_DIR;
                break;
        default: 
        }
        return $result;
}
```

**删除动作和过滤器**

有时我们可能会希望插件禁用WordPress内置的、或者其它插件创建的某个动作或过滤器。这时可以调用remove_filter('filter_hook','filter_function')或remove_action('action_hook','action_function')帮助我们达到期望的效果。

例如发表新日志时，用remove_action('publish_post','generic_ping'); 可以阻止博客发送ping。

注意，如果钩子优先级的值不是10，那么我们必须在调用remove_action时指定优先级。一般来说，除非我们完全了解所要删除的信息以及信息的作用，否则不能随意删除任何信息——可以查看WordPress源代码或者其它插件源代码以了解信息。

**可插入式函数**

除了上面介绍的钩子（动作和过滤器），我们还可以通过重写WordPress函数来让插件影响WordPress的运行。事实上，WordPress为插件提供了一个能够重新定义的小型函数集。函数集中的函数被称为可插入式函数，存储在wp-includes/pluggable.php下。如果所有插件都加载完毕后，可插入式函数仍然处于未定义状态，这时WordPress会加载这些函数。
