# Linux 命令快速索引

## 📚 已完成文档

### 🔰 基础命令 (basic/)
- **[filesystem.md](basic/filesystem.md)** - 文件系统操作
  - 目录操作: pwd, cd, ls, mkdir, rmdir
  - 文件操作: touch, cp, mv, rm
  - 权限与属性查看
  
- **[text-processing.md](basic/text-processing.md)** - 文本处理
  - 文本查看: cat, less, more, head, tail
  - 文本搜索: grep, egrep
  - 文本编辑: sed, awk
  - 文本统计: wc, sort, uniq
  - 文本转换: tr, cut
  
- **[system-info.md](basic/system-info.md)** - 系统信息
  - 系统信息: uname, hostname, whoami, id
  - 系统状态: uptime, date, cal
  - 硬件信息: lscpu, lsmem, lsblk, lsusb, lspci
  - 资源使用: free, df, du
  - 进程信息: ps
  - 环境变量: env, printenv

### 📁 文件管理 (file-management/)
- **[permissions.md](file-management/permissions.md)** - 权限管理
  - 权限查看: ls -l, stat
  - 权限修改: chmod, chown, chgrp
  - 特殊权限: SUID, SGID, Sticky Bit
  - 访问控制列表: getfacl, setfacl
  - 权限规划和最佳实践

### 🔧 系统管理 (system-admin/)
- **[process-management.md](system-admin/process-management.md)** - 进程管理
  - 进程查看: ps, top, htop, pstree
  - 进程控制: kill, killall, pkill, pgrep
  - 任务管理: jobs, fg, bg, nohup
  - 进程优先级: nice, renice
  - 资源限制: ulimit
  - 虚拟终端: screen, tmux
  - 进程调试: strace, lsof

### 🌐 网络工具 (networking/)
- **[diagnostics.md](networking/diagnostics.md)** - 连接诊断
  - 连接测试: ping, ping6, traceroute, mtr
  - 端口检测: telnet, nc, nmap
  - 域名解析: nslookup, dig, host
  - 网络接口: ifconfig, ip
  - 连接状态: netstat, ss
  - 性能测试: wget, curl
  - 数据包分析: tcpdump, iftop

---

## 📋 待创建文档

### 📁 文件管理 (file-management/)
- **compression.md** - 压缩归档
  - tar, gzip, gunzip, zip, unzip
  - 7z, rar, compress
  
- **search.md** - 查找定位
  - find, locate, which, whereis
  - grep高级用法, xargs

### 🔧 系统管理 (system-admin/)
- **user-management.md** - 用户管理
  - useradd, usermod, userdel
  - groupadd, groupmod, groupdel
  - passwd, su, sudo

- **service-management.md** - 服务管理
  - systemctl, service
  - 启动、停止、重启服务
  - 服务状态查看

- **disk-management.md** - 磁盘管理
  - fdisk, parted, mkfs
  - mount, umount
  - fsck, blkid

### 💻 开发工具 (development/)
- **version-control.md** - 版本控制
  - git基础命令
  - git分支管理
  - git远程操作

- **build-tools.md** - 编译构建
  - gcc, make, cmake
  - 编译参数和优化

- **debugging.md** - 调试分析
  - gdb, valgrind
  - 性能分析工具

### 🌐 网络工具 (networking/)
- **remote-access.md** - 远程访问
  - ssh, scp, sftp
  - rsync, wget, curl高级用法

- **monitoring.md** - 监控分析
  - 网络流量监控
  - 连接状态分析

### 🔒 安全工具 (security/)
- **encryption.md** - 加密解密
  - gpg, openssl
  - 文件加密和签名

- **system-security.md** - 系统安全
  - 防火墙配置
  - 安全扫描

- **audit.md** - 日志审计
  - 日志分析工具
  - 系统审计

### 📊 性能监控 (performance/)
- **resource-monitoring.md** - 资源监控
  - CPU、内存、磁盘监控
  - 系统负载分析

- **performance-analysis.md** - 性能分析
  - 性能瓶颈识别
  - 系统优化建议

- **troubleshooting.md** - 故障排查
  - 常见问题诊断
  - 故障排除流程

---

## 🚀 命令分级学习路径

### 🥉 初级必备 (20个命令)
```bash
ls, cd, pwd, cp, mv, rm, mkdir    # 文件操作
cat, grep, head, tail            # 文本处理
ps, top, kill                    # 进程管理
chmod, chown                     # 权限管理
ping, ssh                        # 网络基础
sudo, man, history              # 系统辅助
```

### 🥈 中级进阶 (30个命令)
```bash
find, locate, which              # 文件查找
sed, awk, sort, uniq            # 文本高级处理
tar, gzip, zip                  # 压缩归档
df, du, free, lsof              # 系统监控
netstat, ss, curl, wget        # 网络工具
crontab, systemctl              # 任务和服务
git, make, gcc                  # 开发工具
```

### 🥇 高级专业 (50+个命令)
```bash
strace, ltrace, gdb             # 调试分析
tcpdump, wireshark, nmap        # 网络分析
iptables, ufw                   # 安全防护
rsync, scp, sftp               # 数据传输
docker, kubernetes              # 容器技术
ansible, puppet                 # 自动化运维
```

---

## 📖 使用指南

### 快速查找
1. **按功能查找** - 使用上面的分类导航
2. **按字母查找** - 参考主README.md的字母索引
3. **按难度查找** - 根据学习路径选择合适级别

### 学习建议
1. **循序渐进** - 先掌握初级命令再进阶
2. **实践为主** - 每个命令都要亲手练习
3. **场景应用** - 结合实际工作场景学习
4. **系统理解** - 理解命令背后的系统原理

### 使用约定
- 🟢 普通用户可执行
- 🔴 需要root权限
- 🟡 建议sudo执行
- ⚪ 安全操作
- 🟡 注意谨慎
- 🔴 危险操作

---

## 📝 贡献指南

### 文档标准
- 每个命令包含：功能描述、语法格式、常用选项、实例演示
- 提供权限要求和安全级别说明
- 包含实用技巧和最佳实践
- 提供故障排除指导

### 内容要求
- 基于官方文档和权威资料
- 包含实际可运行的示例
- 适合不同技能水平的用户
- 注重实用性和可操作性

---

*文档状态: 持续更新中*  
*最后更新: 2025年7月20日*
