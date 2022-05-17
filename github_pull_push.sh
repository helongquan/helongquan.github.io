#!/bin/bash
riqi=`date "+%Y-%m-%d-%H:%M:%S+update"`
echo "不同设备之间,先从远程pull一下..."
git pull
echo "拉取完毕..."
echo "添加当前目录下的所有文件到暂存区"
git add .
echo "添加完毕..."
echo "提交暂存区到本地仓库中..."
git commit -a -m $riqi
echo "提交完毕..."
echo "将本地的分支版本上传到远程并合并，提交到hexo分支，不是master分支..."
git push origin hexo
echo "推送完毕！"