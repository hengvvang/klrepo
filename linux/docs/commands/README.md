# Linux 命令参考手册

## 🌟 项目概述

这是一个**全面、权威、实用**的 Linux 命令参考手册，基于以下权威资料精心编写：
- 📖 Linux 官方文档和内核文档
- 📋 IEEE POSIX.1-2017 标准
- 🐧 主要发行版最佳实践 (Ubuntu, CentOS, RHEL, Debian)
- 📚 GNU 工具集官方手册

### 🎯 项目特色
- ✅ **分层次设计** - 初级→中级→高级，循序渐进
- ✅ **分类别管理** - 按功能模块科学分类
- ✅ **实战导向** - 每个命令都有实际应用示例
- ✅ **权威可信** - 基于官方文档，确保准确性
- ✅ **持续更新** - 跟进最新Linux发行版变化

---

## 📚 文档结构

### � 基础命令 (basic/)
**掌握Linux的第一步，日常使用必备**

| 文档 | 描述 | 状态 | 核心命令 |
|------|------|------|----------|
| [filesystem.md](basic/filesystem.md) | 文件系统操作 | ✅ 已完成 | `ls` `cd` `pwd` `cp` `mv` `rm` `mkdir` |
| [text-processing.md](basic/text-processing.md) | 文本处理基础 | ✅ 已完成 | `cat` `grep` `sed` `awk` `sort` `head` `tail` |
| [system-info.md](basic/system-info.md) | 系统信息查询 | ✅ 已完成 | `ps` `top` `free` `df` `uname` `uptime` |

### 📁 文件管理 (file-management/)
**高效的文件管理和数据处理**

| 文档 | 描述 | 状态 | 核心命令 |
|------|------|------|----------|
| [permissions.md](file-management/permissions.md) | 权限管理详解 | ✅ 已完成 | `chmod` `chown` `chgrp` `umask` `setfacl` |
| [compression.md](file-management/compression.md) | 压缩归档工具 | ✅ 已完成 | `tar` `gzip` `zip` `7z` `bzip2` `xz` |
| search.md | 查找定位技巧 | 🚧 计划中 | `find` `locate` `which` `whereis` |

### � 系统管理 (system-admin/)
**系统管理员必备技能**

| 文档 | 描述 | 状态 | 核心命令 |
|------|------|------|----------|
| [process-management.md](system-admin/process-management.md) | 进程管理详解 | ✅ 已完成 | `ps` `top` `htop` `kill` `jobs` `nohup` |
| user-management.md | 用户和组管理 | 🚧 计划中 | `useradd` `usermod` `passwd` `su` `sudo` |
| service-management.md | 服务管理 | 🚧 计划中 | `systemctl` `service` `crontab` |
| disk-management.md | 磁盘和文件系统 | 🚧 计划中 | `fdisk` `mount` `fsck` `lvm` |

### 🌐 网络工具 (networking/)
**网络诊断和管理专家**

| 文档 | 描述 | 状态 | 核心命令 |
|------|------|------|----------|
| [diagnostics.md](networking/diagnostics.md) | 网络连接诊断 | ✅ 已完成 | `ping` `traceroute` `nmap` `netstat` `ss` |
| remote-access.md | 远程访问工具 | 🚧 计划中 | `ssh` `scp` `rsync` `sftp` |
| monitoring.md | 网络监控分析 | 🚧 计划中 | `tcpdump` `iftop` `wireshark` |

### � 开发工具 (development/)
**开发者和运维工程师工具集**

| 文档 | 描述 | 状态 | 核心命令 |
|------|------|------|----------|
| version-control.md | Git版本控制 | 🚧 计划中 | `git` `svn` |
| build-tools.md | 编译构建工具 | 🚧 计划中 | `gcc` `make` `cmake` |
| debugging.md | 调试和分析 | 🚧 计划中 | `gdb` `strace` `valgrind` |

### � 安全工具 (security/)
**系统安全和数据保护**

| 文档 | 描述 | 状态 | 核心命令 |
|------|------|------|----------|
| encryption.md | 加密和解密 | 🚧 计划中 | `gpg` `openssl` `ssh-keygen` |
| system-security.md | 系统安全加固 | 🚧 计划中 | `iptables` `ufw` `fail2ban` |
| audit.md | 日志和审计 | 🚧 计划中 | `auditd` `journalctl` `logrotate` |

### � 性能监控 (performance/)
**系统性能优化和故障排除**

| 文档 | 描述 | 状态 | 核心命令 |
|------|------|------|----------|
| resource-monitoring.md | 资源监控 | 🚧 计划中 | `sar` `iostat` `vmstat` `iotop` |
| performance-analysis.md | 性能分析 | 🚧 计划中 | `perf` `pstack` `lsof` |
| troubleshooting.md | 故障排查 | 🚧 计划中 | 综合诊断方法和工具 |

---

## 🚀 快速开始

### 📋 速查表
- **[CHEAT-SHEET.md](CHEAT-SHEET.md)** - 常用命令速查表，一页纸掌握核心命令
- **[INDEX.md](INDEX.md)** - 完整的文档索引和学习路径规划

### 🎯 按需学习

#### 🥉 初学者 (Linux新手)
**推荐学习路径**: 基础命令 → 文本处理 → 系统信息
```bash
# 第一周：文件操作基础
ls, cd, pwd, mkdir, cp, mv, rm, chmod, chown

# 第二周：文本处理
cat, less, grep, head, tail, sed, awk

# 第三周：系统信息
ps, top, free, df, du, uname, whoami, uptime
```

#### 🥈 中级用户 (有一定经验)
**推荐学习路径**: 进程管理 → 网络工具 → 文件管理进阶
```bash
# 深入进程管理
kill, killall, jobs, nohup, screen, tmux

# 网络诊断技能
ping, traceroute, netstat, ss, curl, wget

# 高级文件操作
find, tar, gzip, rsync, ln
```

#### 🥇 高级用户 (系统管理员/开发者)
**推荐学习路径**: 系统管理 → 性能监控 → 安全工具
```bash
# 系统管理专业技能
systemctl, crontab, mount, fdisk, iptables

# 性能分析和调试
strace, lsof, tcpdump, sar, iostat, gdb

# 安全和运维自动化
gpg, ssh, ansible, docker
```

---

## 📖 使用说明

### 🔤 命令格式约定
```bash
command [OPTION]... [ARGUMENT]...
```

### 🔢 符号说明
- `[]` - 可选参数
- `<>` - 必需参数
- `...` - 可重复参数
- `|` - 互斥选项（二选一）
- `{}` - 参数组合

### 🚦 权限级别标识
| 图标 | 含义 | 说明 |
|------|------|------|
| 🟢 | 普通用户 | 无需特殊权限即可执行 |
| 🟡 | 建议sudo | 建议使用管理员权限 |
| 🔴 | 必需root | 必须使用root权限执行 |

### ⚠️ 危险级别标识
| 图标 | 含义 | 说明 |
|------|------|------|
| ⚪ | 安全 | 只读操作，无数据风险 |
| 🟡 | 注意 | 可能影响文件或系统设置 |
| 🔴 | 危险 | 可能造成数据丢失或系统损坏 |

---

## 🎲 快速索引

### 📊 最常用命令 (Top 30)
按使用频率排序的核心命令：

| 排名 | 命令 | 功能 | 分类 | 文档位置 |
|------|------|------|------|----------|
| 1 | `ls` | 列出目录内容 | 文件操作 | [filesystem.md](basic/filesystem.md#ls) |
| 2 | `cd` | 切换目录 | 文件操作 | [filesystem.md](basic/filesystem.md#cd) |
| 3 | `pwd` | 显示当前目录 | 文件操作 | [filesystem.md](basic/filesystem.md#pwd) |
| 4 | `cat` | 查看文件内容 | 文本处理 | [text-processing.md](basic/text-processing.md#cat) |
| 5 | `grep` | 文本搜索 | 文本处理 | [text-processing.md](basic/text-processing.md#grep) |
| 6 | `cp` | 复制文件 | 文件操作 | [filesystem.md](basic/filesystem.md#cp) |
| 7 | `mv` | 移动/重命名 | 文件操作 | [filesystem.md](basic/filesystem.md#mv) |
| 8 | `rm` | 删除文件 | 文件操作 | [filesystem.md](basic/filesystem.md#rm) |
| 9 | `ps` | 查看进程 | 进程管理 | [process-management.md](system-admin/process-management.md#ps) |
| 10 | `top` | 系统监控 | 进程管理 | [process-management.md](system-admin/process-management.md#top) |

### 🔤 字母索引
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

#### A
- `awk` - 文本处理工具 → [text-processing.md](basic/text-processing.md#awk)

#### C
- `cat` - 显示文件内容 → [text-processing.md](basic/text-processing.md#cat)
- `cd` - 切换目录 → [filesystem.md](basic/filesystem.md#cd)
- `chmod` - 修改权限 → [permissions.md](file-management/permissions.md#chmod)
- `chown` - 修改所有者 → [permissions.md](file-management/permissions.md#chown)
- `cp` - 复制文件 → [filesystem.md](basic/filesystem.md#cp)
- `curl` - 数据传输 → [diagnostics.md](networking/diagnostics.md#curl)

#### D
- `df` - 磁盘使用情况 → [system-info.md](basic/system-info.md#df)
- `dig` - DNS查询 → [diagnostics.md](networking/diagnostics.md#dig)
- `du` - 目录大小 → [system-info.md](basic/system-info.md#du)

#### F
- `find` - 查找文件 → 计划中
- `free` - 内存使用情况 → [system-info.md](basic/system-info.md#free)

#### G
- `grep` - 文本搜索 → [text-processing.md](basic/text-processing.md#grep)
- `gunzip` - 解压gzip → [compression.md](file-management/compression.md#gzip)
- `gzip` - gzip压缩 → [compression.md](file-management/compression.md#gzip)

#### H
- `head` - 显示文件开头 → [text-processing.md](basic/text-processing.md#head)
- `htop` - 增强版top → [process-management.md](system-admin/process-management.md#htop)

#### K
- `kill` - 终止进程 → [process-management.md](system-admin/process-management.md#kill)
- `killall` - 按名称杀进程 → [process-management.md](system-admin/process-management.md#killall)

#### L
- `less` - 分页查看文件 → [text-processing.md](basic/text-processing.md#less)
- `ls` - 列出目录内容 → [filesystem.md](basic/filesystem.md#ls)
- `lsof` - 列出打开文件 → [process-management.md](system-admin/process-management.md#lsof)

#### M
- `mkdir` - 创建目录 → [filesystem.md](basic/filesystem.md#mkdir)
- `mv` - 移动/重命名 → [filesystem.md](basic/filesystem.md#mv)

#### N
- `netstat` - 网络连接状态 → [diagnostics.md](networking/diagnostics.md#netstat)
- `nmap` - 端口扫描 → [diagnostics.md](networking/diagnostics.md#nmap)

#### P
- `ping` - 网络连通测试 → [diagnostics.md](networking/diagnostics.md#ping)
- `ps` - 进程状态 → [process-management.md](system-admin/process-management.md#ps)
- `pwd` - 显示当前目录 → [filesystem.md](basic/filesystem.md#pwd)

#### R
- `rm` - 删除文件 → [filesystem.md](basic/filesystem.md#rm)

#### S
- `sed` - 流编辑器 → [text-processing.md](basic/text-processing.md#sed)
- `sort` - 排序 → [text-processing.md](basic/text-processing.md#sort)
- `ss` - 现代netstat → [diagnostics.md](networking/diagnostics.md#ss)
- `ssh` - 安全远程连接 → 计划中

#### T
- `tail` - 显示文件结尾 → [text-processing.md](basic/text-processing.md#tail)
- `tar` - 归档工具 → [compression.md](file-management/compression.md#tar)
- `top` - 实时进程监控 → [process-management.md](system-admin/process-management.md#top)
- `traceroute` - 路由跟踪 → [diagnostics.md](networking/diagnostics.md#traceroute)

#### U
- `uname` - 系统信息 → [system-info.md](basic/system-info.md#uname)
- `uniq` - 处理重复行 → [text-processing.md](basic/text-processing.md#uniq)
- `unzip` - 解压zip → [compression.md](file-management/compression.md#zip)
- `uptime` - 系统运行时间 → [system-info.md](basic/system-info.md#uptime)

#### W
- `wc` - 字符统计 → [text-processing.md](basic/text-processing.md#wc)
- `wget` - 文件下载 → [diagnostics.md](networking/diagnostics.md#wget)

#### Z
- `zip` - 创建zip压缩 → [compression.md](file-management/compression.md#zip)

---

## 🎯 学习建议和最佳实践

### 📈 学习策略
1. **循序渐进**: 先掌握基础命令，再学习高级功能
2. **实践为主**: 每个命令都在实际环境中练习
3. **场景驱动**: 结合实际工作场景学习相关命令组合
4. **理解原理**: 不只记住命令，更要理解背后的系统原理

### 🛠️ 实用技巧
- **使用Tab补全**: 提高命令输入效率，减少拼写错误
- **善用历史**: `history` 和 `Ctrl+R` 快速查找之前的命令
- **掌握管道**: 学会使用 `|` 连接多个命令
- **编写别名**: 为常用的长命令创建简短的别名
- **阅读手册**: 遇到问题先查看 `man` 手册页

### 🔐 安全提醒
- **谨慎使用root权限**: 只在必要时使用sudo，避免长期以root身份运行
- **备份重要数据**: 在执行可能影响数据的命令前先备份
- **理解命令后果**: 特别是rm、chmod等可能造成数据丢失的命令
- **测试环境验证**: 在生产环境使用新命令前先在测试环境验证

---

## 📚 参考资料和扩展阅读

### 📖 官方文档
- **[Linux Kernel Documentation](https://www.kernel.org/doc/html/latest/)** - Linux内核官方文档
- **[GNU Coreutils Manual](https://www.gnu.org/software/coreutils/manual/)** - GNU核心工具手册
- **[IEEE POSIX.1-2017](https://pubs.opengroup.org/onlinepubs/9699919799/)** - POSIX标准
- **[Linux From Scratch](http://www.linuxfromscratch.org/)** - 深入理解Linux系统

### 📚 推荐书籍
- **《Linux命令行与shell脚本编程大全》** - 全面的命令行参考
- **《Unix环境高级编程》** - 深入理解Unix/Linux编程
- **《Linux系统管理技术手册》** - 系统管理权威指南
- **《性能之巅：洞悉系统、企业与云计算》** - 性能分析专业指南

### 🌐 在线资源
- **[Explain Shell](https://explainshell.com/)** - 命令行解释工具
- **[Linux Command Library](https://linuxcommandlibrary.com/)** - 命令查询网站
- **[Cheat.sh](https://cheat.sh/)** - 快速命令示例

### 🎓 学习路径推荐
1. **Linux基础** → 本手册基础命令部分
2. **Shell脚本** → 学习bash脚本编程
3. **系统管理** → 深入学习系统管理技能
4. **网络管理** → 掌握网络配置和诊断
5. **安全运维** → 学习安全防护和自动化运维

---

## 🤝 贡献指南

### 💡 如何贡献
我们欢迎各种形式的贡献：
- 📝 **内容完善**: 补充命令示例、纠正错误
- 🌍 **翻译工作**: 翻译为其他语言版本
- 💻 **工具开发**: 开发配套的学习工具
- 🐛 **问题反馈**: 报告文档错误或提出改进建议

### 📋 贡献标准
- **准确性**: 所有命令示例必须经过测试验证
- **完整性**: 提供完整的语法、选项和示例说明
- **一致性**: 遵循已有的文档格式和命名约定
- **实用性**: 重点关注实际应用场景

### 📞 联系方式
- **GitHub Issues**: 报告问题和提出建议
- **Pull Request**: 提交代码和文档改进
- **Email**: 发送详细的反馈和建议

---

## 📊 项目状态

### ✅ 已完成 (25%)
- 基础命令: 文件系统、文本处理、系统信息
- 文件管理: 权限管理、压缩归档
- 系统管理: 进程管理
- 网络工具: 连接诊断
- 快速索引和速查表

### 🚧 进行中 (50%)
- 文件管理: 查找定位工具
- 系统管理: 用户管理、服务管理、磁盘管理
- 网络工具: 远程访问、网络监控

### 📋 计划中 (25%)
- 开发工具: 版本控制、构建工具、调试工具
- 安全工具: 加密工具、安全防护、日志审计
- 性能监控: 资源监控、性能分析、故障排除

---

## 📄 版权声明

本项目遵循 **开放共享** 原则：
- 📖 **学习使用**: 完全开放，欢迎个人学习和研究使用
- 🏢 **商业使用**: 请联系获得授权
- 🔄 **再分发**: 保留版权信息的前提下允许转载

---

*最后更新时间: 2025年7月20日*  
*项目维护: Linux 命令参考项目组*  
*文档版本: v1.0.0-alpha*
