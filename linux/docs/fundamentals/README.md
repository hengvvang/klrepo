# Linux 基础知识

## 📚 模块概述

本模块涵盖Linux系统的基础知识，从历史发展到系统架构，从Shell环境到用户管理。适合Linux新手建立完整的知识基础。

## 📖 学习内容

### 🔍 [Linux 介绍](introduction.md)
- **Linux历史** - Linux发展历程和重要节点
- **发行版概述** - 主要Linux发行版特点和选择
- **开源生态** - 开源软件和社区文化
- **应用场景** - Linux在不同领域的应用

### 🏗️ [系统架构](system-architecture.md)
- **内核架构** - Linux内核结构和组件
- **用户空间** - 用户空间组件和服务
- **系统启动** - 启动过程和init系统
- **设备管理** - 设备驱动和硬件抽象

### 💻 [Shell 环境](shell-basics.md)
- **Shell类型** - Bash、Zsh等Shell比较
- **命令行基础** - 命令语法和基本操作
- **环境变量** - 系统环境配置
- **Shell脚本** - 基础脚本编程

### 👤 [用户与权限](users-permissions.md)
- **用户管理** - 用户和组的概念
- **权限系统** - Linux权限模型
- **访问控制** - 文件权限和特殊权限
- **安全模型** - Linux安全架构

## 🎯 学习目标

完成本模块学习后，您将能够：

- ✅ 理解Linux系统的历史和发展
- ✅ 掌握Linux系统架构和组件
- ✅ 熟练使用Shell命令行环境
- ✅ 管理用户权限和系统安全

## 📋 学习检查清单

### Linux介绍 (25%)
- [ ] 了解Linux发展历程
- [ ] 认识主要Linux发行版
- [ ] 理解开源软件概念
- [ ] 掌握Linux应用场景

### 系统架构 (25%)
- [ ] 理解内核架构
- [ ] 掌握系统启动流程
- [ ] 了解设备管理机制
- [ ] 认识系统组件关系

### Shell环境 (25%)
- [ ] 熟练使用Bash命令
- [ ] 掌握环境变量配置
- [ ] 理解文件路径概念
- [ ] 能编写简单脚本

### 用户权限 (25%)
- [ ] 理解用户和组概念
- [ ] 掌握权限查看和修改
- [ ] 了解特殊权限用法
- [ ] 配置安全策略

## 🔗 相关资源

### 官方文档
- [Linux内核文档](https://www.kernel.org/doc/html/latest/)
- [GNU Bash手册](https://www.gnu.org/software/bash/manual/)
- [POSIX标准](https://pubs.opengroup.org/onlinepubs/9699919799/)

### 推荐书籍
- 《Linux系统管理技术手册》
- 《UNIX/Linux系统管理技术手册》
- 《Linux内核设计与实现》

### 在线资源
- [Linux From Scratch](http://www.linuxfromscratch.org/)
- [Arch Linux Wiki](https://wiki.archlinux.org/)
- [The Linux Documentation Project](https://tldp.org/)

## 🚀 快速开始

### 第一步：了解Linux
```bash
# 查看系统信息
uname -a
cat /etc/os-release

# 查看内核版本
uname -r

# 查看系统架构
arch
```

### 第二步：探索系统
```bash
# 查看目录结构
ls -la /

# 查看当前用户
whoami
id

# 查看环境变量
env | head -20
```

### 第三步：基础命令
```bash
# 文件操作
ls -l
pwd
cd ~

# 帮助系统
man ls
info bash
ls --help
```

## ⚡ 练习建议

1. **动手实践** - 在实际系统中练习命令
2. **阅读文档** - 查看man页面和官方文档
3. **系统探索** - 探索不同目录和配置文件
4. **脚本练习** - 编写简单的Shell脚本

---

*准备好开始Linux学习之旅了吗？从 [Linux介绍](introduction.md) 开始吧！*
