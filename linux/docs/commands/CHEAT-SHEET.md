# Linux 命令速查表 (Cheat Sheet)

## 📋 文件系统操作

| 命令 | 功能 | 示例 | 权限 |
|------|------|------|------|
| `pwd` | 显示当前目录 | `pwd` | 🟢 |
| `cd` | 切换目录 | `cd /home/user` | 🟢 |
| `ls` | 列出文件 | `ls -la` | 🟢 |
| `mkdir` | 创建目录 | `mkdir -p dir1/dir2` | 🟢 |
| `rmdir` | 删除空目录 | `rmdir empty_dir` | 🟢 |
| `cp` | 复制文件/目录 | `cp -r src/ dest/` | 🟢 |
| `mv` | 移动/重命名 | `mv old.txt new.txt` | 🟢 |
| `rm` | 删除文件/目录 | `rm -rf directory/` | 🟢 |
| `touch` | 创建文件 | `touch newfile.txt` | 🟢 |
| `ln` | 创建链接 | `ln -s target link` | 🟢 |

## 📄 文本处理

| 命令 | 功能 | 示例 | 权限 |
|------|------|------|------|
| `cat` | 显示文件内容 | `cat file.txt` | 🟢 |
| `less` | 分页查看 | `less file.txt` | 🟢 |
| `head` | 显示文件开头 | `head -20 file.txt` | 🟢 |
| `tail` | 显示文件结尾 | `tail -f log.txt` | 🟢 |
| `grep` | 文本搜索 | `grep "pattern" file.txt` | 🟢 |
| `sed` | 文本替换 | `sed 's/old/new/g' file.txt` | 🟢 |
| `awk` | 文本处理 | `awk '{print $1}' file.txt` | 🟢 |
| `sort` | 排序 | `sort -n numbers.txt` | 🟢 |
| `uniq` | 去重 | `uniq -c file.txt` | 🟢 |
| `wc` | 计数 | `wc -l file.txt` | 🟢 |
| `tr` | 字符转换 | `tr 'a-z' 'A-Z'` | 🟢 |
| `cut` | 提取列 | `cut -d: -f1 /etc/passwd` | 🟢 |

## 🔍 查找定位

| 命令 | 功能 | 示例 | 权限 |
|------|------|------|------|
| `find` | 查找文件 | `find / -name "*.txt"` | 🟢 |
| `locate` | 快速定位 | `locate filename` | 🟢 |
| `which` | 查找命令位置 | `which python` | 🟢 |
| `whereis` | 查找文件位置 | `whereis ls` | 🟢 |
| `xargs` | 参数传递 | `find . -name "*.txt" \| xargs rm` | 🟢 |

## 🔐 权限管理

| 命令 | 功能 | 示例 | 权限 |
|------|------|------|------|
| `chmod` | 修改权限 | `chmod 755 script.sh` | 🟡 |
| `chown` | 修改所有者 | `chown user:group file.txt` | 🔴 |
| `chgrp` | 修改组 | `chgrp group file.txt` | 🟡 |
| `umask` | 默认权限 | `umask 022` | 🟢 |
| `su` | 切换用户 | `su - username` | 🟢 |
| `sudo` | 提升权限 | `sudo command` | 🟡 |

## 📦 压缩归档

| 命令 | 功能 | 示例 | 权限 |
|------|------|------|------|
| `tar` | 归档 | `tar -czf archive.tar.gz dir/` | 🟢 |
| `gzip` | 压缩 | `gzip file.txt` | 🟢 |
| `gunzip` | 解压 | `gunzip file.txt.gz` | 🟢 |
| `zip` | 创建zip | `zip -r archive.zip dir/` | 🟢 |
| `unzip` | 解压zip | `unzip archive.zip` | 🟢 |

## 🖥️ 系统信息

| 命令 | 功能 | 示例 | 权限 |
|------|------|------|------|
| `uname` | 系统信息 | `uname -a` | 🟢 |
| `whoami` | 当前用户 | `whoami` | 🟢 |
| `id` | 用户ID | `id username` | 🟢 |
| `uptime` | 运行时间 | `uptime` | 🟢 |
| `date` | 日期时间 | `date +"%Y-%m-%d"` | 🟢 |
| `cal` | 日历 | `cal 2024` | 🟢 |
| `hostname` | 主机名 | `hostname -I` | 🟢 |

## 💾 存储管理

| 命令 | 功能 | 示例 | 权限 |
|------|------|------|------|
| `df` | 磁盘使用 | `df -h` | 🟢 |
| `du` | 目录大小 | `du -sh directory/` | 🟢 |
| `free` | 内存使用 | `free -h` | 🟢 |
| `lsblk` | 块设备 | `lsblk` | 🟢 |
| `mount` | 挂载 | `mount /dev/sdb1 /mnt` | 🔴 |
| `umount` | 卸载 | `umount /mnt` | 🔴 |

## ⚙️ 进程管理

| 命令 | 功能 | 示例 | 权限 |
|------|------|------|------|
| `ps` | 进程列表 | `ps aux` | 🟢 |
| `top` | 实时进程 | `top` | 🟢 |
| `htop` | 增强top | `htop` | 🟢 |
| `kill` | 杀死进程 | `kill -9 1234` | 🟡 |
| `killall` | 按名杀死 | `killall firefox` | 🟡 |
| `nohup` | 后台运行 | `nohup command &` | 🟢 |
| `jobs` | 作业列表 | `jobs` | 🟢 |
| `fg` | 前台运行 | `fg %1` | 🟢 |
| `bg` | 后台运行 | `bg %1` | 🟢 |

## 🌐 网络工具

| 命令 | 功能 | 示例 | 权限 |
|------|------|------|------|
| `ping` | 连通测试 | `ping google.com` | 🟢 |
| `wget` | 下载文件 | `wget http://example.com/file` | 🟢 |
| `curl` | 数据传输 | `curl -O http://example.com/file` | 🟢 |
| `ssh` | 远程连接 | `ssh user@hostname` | 🟢 |
| `scp` | 远程复制 | `scp file user@host:/path` | 🟢 |
| `netstat` | 网络连接 | `netstat -tuln` | 🟢 |
| `ss` | 现代netstat | `ss -tuln` | 🟢 |
| `lsof` | 打开文件 | `lsof -i :80` | 🟢 |

## 🔧 用户管理

| 命令 | 功能 | 示例 | 权限 |
|------|------|------|------|
| `useradd` | 添加用户 | `useradd -m username` | 🔴 |
| `usermod` | 修改用户 | `usermod -aG sudo username` | 🔴 |
| `userdel` | 删除用户 | `userdel -r username` | 🔴 |
| `passwd` | 修改密码 | `passwd username` | 🔴 |
| `groups` | 用户组 | `groups username` | 🟢 |
| `who` | 登录用户 | `who` | 🟢 |
| `w` | 用户活动 | `w` | 🟢 |
| `last` | 登录历史 | `last` | 🟢 |

## 📊 监控诊断

| 命令 | 功能 | 示例 | 权限 |
|------|------|------|------|
| `iostat` | I/O统计 | `iostat -x 1` | 🟢 |
| `vmstat` | 虚拟内存 | `vmstat 1` | 🟢 |
| `sar` | 系统活动 | `sar -u 1 5` | 🟢 |
| `dmesg` | 内核消息 | `dmesg \| tail` | 🟢 |
| `lscpu` | CPU信息 | `lscpu` | 🟢 |
| `lsusb` | USB设备 | `lsusb` | 🟢 |
| `lspci` | PCI设备 | `lspci` | 🟢 |

## 🔄 服务管理

| 命令 | 功能 | 示例 | 权限 |
|------|------|------|------|
| `systemctl` | 服务控制 | `systemctl status nginx` | 🟡 |
| `service` | 服务管理 | `service nginx start` | 🔴 |
| `crontab` | 定时任务 | `crontab -e` | 🟢 |
| `at` | 一次性任务 | `at 15:30` | 🟢 |

## 💡 实用技巧

### 管道和重定向
```bash
# 管道
command1 | command2 | command3

# 输出重定向
command > file.txt        # 覆盖
command >> file.txt       # 追加
command 2> error.log      # 错误重定向
command &> all.log        # 全部重定向

# 输入重定向
command < input.txt
```

### 快捷键
| 快捷键 | 功能 |
|--------|------|
| `Ctrl+C` | 中断命令 |
| `Ctrl+Z` | 暂停命令 |
| `Ctrl+D` | 结束输入/退出 |
| `Ctrl+L` | 清屏 |
| `Ctrl+R` | 搜索历史 |
| `Tab` | 自动补全 |
| `!!` | 重复上一命令 |
| `!n` | 执行历史第n个命令 |

### 通配符
| 通配符 | 含义 | 示例 |
|--------|------|------|
| `*` | 匹配任意字符 | `*.txt` |
| `?` | 匹配单个字符 | `file?.txt` |
| `[]` | 匹配字符集 | `file[123].txt` |
| `{}` | 大括号展开 | `file{1,2,3}.txt` |

### 权限说明
- 🟢 **普通用户** - 无需特殊权限
- 🟡 **建议sudo** - 建议使用管理员权限
- 🔴 **必需root** - 必须使用root权限

---

## 📚 学习建议

### 初学者 (前20个命令)
```bash
ls, cd, pwd, mkdir, cp, mv, rm, cat, grep, man, 
chmod, ps, kill, sudo, ssh, ping, wget, tar, 
history, which
```

### 进阶者 (再掌握30个)
```bash
find, awk, sed, sort, uniq, top, df, du, free, 
netstat, crontab, systemctl, useradd, chown, 
head, tail, less, wc, curl, scp, lsof, jobs, 
fg, bg, nohup, mount, umount, passwd, groups, su
```

### 高级用户 (系统管理)
```bash
strace, lsof, tcpdump, iptables, rsync, dd, 
fdisk, mkfs, fsck, iostat, sar, vmstat, 
gdb, valgrind, perf, systemd相关命令
```

---

*提示: 使用 `man command` 查看详细帮助*  
*快速帮助: `command --help`*
