#!/bin/bash
# 先删除站点根目录下的.deploy_git文件夹
rm -rf .deploy_git/
echo "删除.deploy_git文件完成"
##执行
# git config --global core.autocrlf false
hexo clean
echo "清理缓存文件..."
echo "添加更新内容"
hexo g
echo "生成静态文件..."
echo "生成静态文件完毕,准备推送到远程..."
hexo d
echo "推送到远程完成！"