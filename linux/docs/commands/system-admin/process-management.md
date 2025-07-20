# 系统管理 - 进程管理

## 概述

进程管理是 Linux 系统管理的核心技能之一。理解进程的生命周期、状态转换、信号处理和资源管理对于系统管理员和开发者都至关重要。本文档提供全面的进程管理指南。

---

## 进程基础概念

### 进程生命周期

1. **创建 (Created)** - 进程被创建但尚未运行
2. **就绪 (Ready)** - 等待CPU调度执行
3. **运行 (Running)** - 正在CPU上执行
4. **阻塞 (Blocked/Waiting)** - 等待I/O或其他事件
5. **终止 (Terminated)** - 进程执行完毕或被杀死

### 进程类型

- **前台进程** - 在终端前台运行，接收用户输入
- **后台进程** - 在后台运行，不接收终端输入
- **守护进程 (Daemon)** - 系统启动时启动，在后台持续运行
- **僵尸进程 (Zombie)** - 已终止但父进程未收集其退出状态
- **孤儿进程 (Orphan)** - 父进程已终止的子进程

### 进程标识

- **PID (Process ID)** - 唯一的进程标识符
- **PPID (Parent Process ID)** - 父进程的PID
- **UID/GID** - 用户ID和组ID
- **Session ID** - 会话标识符
- **Process Group ID** - 进程组标识符

---

## 进程查看命令

### `ps` - 进程快照

**功能**: 显示系统中运行进程的静态快照

```bash
ps [OPTION]...
```

**常用选项**:
- `a` - 显示所有用户的进程
- `u` - 显示用户信息
- `x` - 显示没有控制终端的进程
- `e` - 显示所有进程（等同于 -A）
- `f` - 完整格式显示
- `l` - 长格式显示
- `--forest` - 显示进程树
- `--sort` - 按指定字段排序

**BSD风格选项组合**:
```bash
# 显示所有用户的所有进程（最常用）
ps aux

# 显示进程树结构
ps auxf

# 按CPU使用率排序
ps aux --sort=-pcpu

# 按内存使用率排序  
ps aux --sort=-pmem

# 只显示当前用户进程
ps ux
```

**System V风格选项**:
```bash
# 显示所有进程的完整信息
ps -ef

# 显示进程树
ps -ejH

# 显示特定用户的进程
ps -u username

# 显示特定进程组
ps -g groupname
```

**输出字段解释**:
```bash
USER    PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root      1  0.0  0.1 169704 11484 ?        Ss   Jul19   0:01 /sbin/init
```

- **USER**: 进程所有者
- **PID**: 进程ID
- **%CPU**: CPU使用百分比
- **%MEM**: 内存使用百分比
- **VSZ**: 虚拟内存大小 (KB)
- **RSS**: 物理内存大小 (KB)  
- **TTY**: 控制终端
- **STAT**: 进程状态
- **START**: 启动时间
- **TIME**: CPU累计时间
- **COMMAND**: 命令行

**进程状态码**:
- `R` - Running (运行中)
- `S` - Sleeping (可中断睡眠)
- `D` - Uninterruptible sleep (不可中断睡眠)
- `T` - Stopped (停止)
- `Z` - Zombie (僵尸进程)
- `s` - Session leader (会话领导者)
- `+` - 前台进程组
- `<` - 高优先级
- `N` - 低优先级

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `top` - 实时进程监控

**功能**: 实时显示系统运行的进程信息

```bash
top [OPTION]...
```

**常用选项**:
- `-d SEC` - 更新间隔（秒）
- `-p PID` - 监控指定PID
- `-u USER` - 监控指定用户进程
- `-H` - 显示线程而不是进程
- `-c` - 显示完整命令行

**交互式命令**:
- `h` - 帮助
- `q` - 退出
- `k` - 杀死进程
- `r` - 重新设置进程优先级
- `u` - 过滤用户
- `M` - 按内存使用排序
- `P` - 按CPU使用排序
- `T` - 按累计时间排序
- `1` - 切换CPU显示模式
- `f` - 字段管理
- `o` - 排序设置
- `W` - 保存设置

**示例**:
```bash
# 基本使用
top

# 每2秒更新一次
top -d 2

# 只显示指定用户的进程
top -u apache

# 显示指定进程
top -p 1234,5678

# 显示线程信息
top -H

# 批处理模式（非交互）
top -b -n 1
```

**输出解释**:
```
top - 14:20:45 up 2 days,  4:15,  3 users,  load average: 0.15, 0.20, 0.18
Tasks: 245 total,   1 running, 244 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.3 us,  0.7 sy,  0.0 ni, 96.7 id,  0.3 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   7849.2 total,   3214.5 free,   2107.8 used,   2526.9 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   5412.3 avail Mem
```

- **load average**: 1分钟、5分钟、15分钟平均负载
- **Tasks**: 进程总数和各状态数量
- **%Cpu(s)**: CPU使用情况
  - `us`: 用户空间CPU使用率
  - `sy`: 内核空间CPU使用率
  - `ni`: nice值改变过的进程CPU使用率
  - `id`: 空闲CPU使用率
  - `wa`: IO等待CPU使用率
- **Mem/Swap**: 内存和交换分区使用情况

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `htop` - 增强版top

**功能**: 更友好的实时进程监控工具

```bash
htop [OPTION]...
```

**特点**:
- 彩色界面
- 支持鼠标操作
- 树状显示进程
- 水平/垂直滚动
- 支持多核CPU显示

**交互式快捷键**:
- `F1` - 帮助
- `F2` - 设置
- `F3` - 搜索
- `F4` - 过滤
- `F5` - 树状显示
- `F6` - 排序
- `F9` - 杀死进程
- `F10` - 退出
- `u` - 选择用户
- `t` - 切换树状显示
- `H` - 显示/隐藏线程

**安装**:
```bash
# Ubuntu/Debian
sudo apt install htop

# CentOS/RHEL
sudo yum install htop
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `pstree` - 进程树

**功能**: 以树状格式显示进程层次关系

```bash
pstree [OPTION]... [USER/PID]
```

**常用选项**:
- `-p` - 显示PID
- `-u` - 显示用户名
- `-a` - 显示命令行参数
- `-c` - 不合并相同进程
- `-h` - 高亮当前进程
- `-n` - 按PID排序

**示例**:
```bash
# 显示完整进程树
pstree

# 显示带PID的进程树
pstree -p

# 显示特定用户的进程树
pstree username

# 从特定进程开始显示
pstree -p 1234

# 显示命令行参数
pstree -a

# 高亮当前进程
pstree -h
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 进程控制命令

### `kill` - 发送信号给进程

**功能**: 向进程发送信号以终止或控制进程

```bash
kill [OPTION]... PID...
kill -SIGNAL PID...
kill -l [SIGNAL]...
```

**常用信号**:
- `TERM (15)` - 终止信号（默认，优雅退出）
- `KILL (9)` - 强制杀死信号（无法被忽略）
- `HUP (1)` - 挂起信号（通常用于重新加载配置）
- `INT (2)` - 中断信号（Ctrl+C）
- `QUIT (3)` - 退出信号（Ctrl+\）
- `STOP (19)` - 停止信号
- `CONT (18)` - 继续信号
- `USR1 (10)` - 用户定义信号1
- `USR2 (12)` - 用户定义信号2

**示例**:
```bash
# 终止进程（优雅退出）
kill 1234

# 强制杀死进程
kill -9 1234
kill -KILL 1234

# 重新加载配置（常用于服务）
kill -HUP 1234
kill -1 1234

# 停止进程（可恢复）
kill -STOP 1234

# 恢复停止的进程
kill -CONT 1234

# 列出所有可用信号
kill -l

# 杀死多个进程
kill 1234 5678 9012
```

**权限**: 🟡 只能杀死自己的进程，root可杀死任何进程 | **危险级别**: 🟡 注意

---

### `killall` - 按名称杀死进程

**功能**: 根据进程名称杀死进程

```bash
killall [OPTION]... NAME...
```

**常用选项**:
- `-e` - 完全匹配进程名
- `-I` - 忽略大小写
- `-g` - 杀死进程组
- `-i` - 交互式确认
- `-l` - 列出信号名
- `-q` - 安静模式
- `-v` - 详细模式
- `-w` - 等待进程终止
- `-Z` - 只杀死指定SELinux上下文的进程

**示例**:
```bash
# 杀死所有名为firefox的进程
killall firefox

# 强制杀死
killall -9 firefox

# 交互式确认
killall -i httpd

# 完全匹配进程名
killall -e "exact_name"

# 等待进程终止
killall -w nginx

# 详细输出
killall -v apache2
```

**权限**: 🟡 只能杀死自己的进程，root可杀死任何进程 | **危险级别**: 🟡 注意

---

### `pkill` - 按模式杀死进程

**功能**: 根据进程名模式、用户等条件杀死进程

```bash
pkill [OPTION]... PATTERN
```

**常用选项**:
- `-f` - 匹配完整命令行
- `-u USER` - 指定用户
- `-g GID` - 指定组ID
- `-s SID` - 指定会话ID
- `-P PPID` - 指定父进程ID
- `-x` - 完全匹配
- `-n` - 只杀死最新的进程
- `-o` - 只杀死最老的进程

**示例**:
```bash
# 杀死匹配模式的进程
pkill firefox

# 杀死指定用户的所有进程
pkill -u username

# 匹配完整命令行
pkill -f "python script.py"

# 杀死父进程下的所有子进程
pkill -P 1234

# 只杀死最新的匹配进程
pkill -n httpd
```

**权限**: 🟡 只能杀死自己的进程，root可杀死任何进程 | **危险级别**: 🟡 注意

---

### `pgrep` - 按模式查找进程

**功能**: 根据进程名模式查找进程ID

```bash
pgrep [OPTION]... PATTERN
```

**常用选项**:
- `-l` - 显示进程名
- `-f` - 匹配完整命令行
- `-u USER` - 指定用户
- `-x` - 完全匹配
- `-n` - 只显示最新的进程
- `-o` - 只显示最老的进程
- `-c` - 只显示匹配的进程数

**示例**:
```bash
# 查找匹配的进程ID
pgrep firefox

# 显示进程ID和名称
pgrep -l nginx

# 查找指定用户的进程
pgrep -u apache httpd

# 匹配完整命令行
pgrep -f "python.*script.py"

# 统计匹配的进程数
pgrep -c ssh
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 任务管理

### 作业控制基础

**后台运行**:
```bash
# 在命令后添加 & 使其在后台运行
command &

# 查看作业列表
jobs

# 将作业转到前台
fg %1

# 将作业转到后台
bg %1
```

**信号操作**:
```bash
# Ctrl+C - 发送SIGINT（中断）
# Ctrl+Z - 发送SIGTSTP（停止）
# Ctrl+\ - 发送SIGQUIT（退出）
```

### `jobs` - 作业列表

**功能**: 显示当前会话的作业列表

```bash
jobs [OPTION]... [JOBSPEC]...
```

**常用选项**:
- `-l` - 显示进程ID
- `-p` - 只显示进程ID
- `-r` - 只显示运行的作业
- `-s` - 只显示停止的作业

**示例**:
```bash
# 显示所有作业
jobs

# 显示带PID的作业
jobs -l

# 只显示运行中的作业
jobs -r

# 只显示停止的作业
jobs -s
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `fg` - 前台运行

**功能**: 将后台作业转到前台运行

```bash
fg [JOBSPEC]
```

**示例**:
```bash
# 将最近的后台作业转到前台
fg

# 将指定作业转到前台
fg %1
fg %job_name
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `bg` - 后台运行

**功能**: 将停止的作业在后台继续运行

```bash
bg [JOBSPEC]
```

**示例**:
```bash
# 将最近停止的作业在后台继续
bg

# 将指定作业在后台继续
bg %1
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `nohup` - 忽略挂起信号

**功能**: 运行命令忽略挂起信号，即使终端关闭也继续运行

```bash
nohup COMMAND [ARG]... &
```

**示例**:
```bash
# 后台运行脚本，输出重定向到nohup.out
nohup ./long_running_script.sh &

# 指定输出文件
nohup ./script.sh > output.log 2>&1 &

# 运行多个命令
nohup bash -c "command1; command2" &
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 进程优先级管理

### `nice` - 设置进程优先级

**功能**: 以指定优先级运行命令

```bash
nice [OPTION] [COMMAND [ARG]...]
```

**优先级范围**: -20 (最高) 到 19 (最低)，默认为 10

**示例**:
```bash
# 以默认nice值运行
nice command

# 以指定nice值运行
nice -n 10 command

# 以低优先级运行CPU密集型任务
nice -n 19 ./cpu_intensive_task

# 以高优先级运行（需要特权）
sudo nice -n -10 important_task
```

**权限**: 🟢 普通用户可降低优先级，🔴 root可提高优先级 | **危险级别**: ⚪ 安全

---

### `renice` - 修改运行进程优先级

**功能**: 修改正在运行进程的优先级

```bash
renice [-n] PRIORITY [-p PID] [-g GID] [-u USER]
```

**示例**:
```bash
# 修改指定PID的优先级
renice -n 15 -p 1234

# 修改指定用户所有进程的优先级
renice -n 10 -u username

# 修改指定组所有进程的优先级
renice -n 5 -g developers

# 使用传统语法
renice 15 1234
```

**权限**: 🟡 只能降低自己进程优先级，root可任意修改 | **危险级别**: 🟡 注意

---

## 系统资源限制

### `ulimit` - 用户资源限制

**功能**: 控制shell及其启动进程的资源限制

```bash
ulimit [OPTION] [LIMIT]
```

**常用选项**:
- `-a` - 显示所有限制
- `-c` - core文件大小
- `-f` - 文件大小
- `-n` - 文件描述符数量
- `-u` - 用户进程数量
- `-v` - 虚拟内存大小
- `-t` - CPU时间（秒）

**示例**:
```bash
# 显示所有资源限制
ulimit -a

# 设置文件描述符限制
ulimit -n 4096

# 设置用户进程数限制
ulimit -u 1024

# 禁用core dump
ulimit -c 0

# 设置CPU时间限制（10分钟）
ulimit -t 600
```

**权限**: 🟢 普通用户 | **危险级别**: 🟡 注意

---

## 高级进程管理

### `screen` - 虚拟终端

**功能**: 创建可分离的终端会话

```bash
screen [OPTION] [COMMAND [ARGS]]
```

**常用命令**:
```bash
# 创建新会话
screen

# 创建命名会话
screen -S session_name

# 列出所有会话
screen -ls

# 重新连接会话
screen -r session_name

# 分离会话（在screen内）
Ctrl+A, d

# 终止会话
exit  # 或 Ctrl+A, k
```

**在screen内的快捷键**:
- `Ctrl+A, c` - 创建新窗口
- `Ctrl+A, n` - 下一个窗口
- `Ctrl+A, p` - 上一个窗口
- `Ctrl+A, "` - 窗口列表
- `Ctrl+A, d` - 分离会话

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `tmux` - 终端复用器

**功能**: 现代化的终端复用工具

```bash
tmux [COMMAND [FLAGS]]
```

**基本使用**:
```bash
# 创建新会话
tmux

# 创建命名会话
tmux new-session -s session_name

# 列出会话
tmux list-sessions

# 连接会话
tmux attach -t session_name

# 分离会话（在tmux内）
Ctrl+B, d
```

**常用快捷键** (默认前缀 Ctrl+B):
- `Ctrl+B, c` - 新建窗口
- `Ctrl+B, %` - 垂直分割
- `Ctrl+B, "` - 水平分割
- `Ctrl+B, arrow` - 切换面板
- `Ctrl+B, d` - 分离会话

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 进程调试和分析

### `strace` - 系统调用跟踪

**功能**: 跟踪进程的系统调用和信号

```bash
strace [OPTION]... COMMAND [ARG]...
strace [OPTION]... -p PID...
```

**常用选项**:
- `-p PID` - 跟踪现有进程
- `-o FILE` - 输出到文件
- `-f` - 跟踪子进程
- `-e EXPR` - 过滤表达式
- `-c` - 统计模式
- `-t` - 显示时间戳

**示例**:
```bash
# 跟踪命令的系统调用
strace ls

# 跟踪现有进程
strace -p 1234

# 只跟踪文件操作
strace -e trace=file ls

# 统计系统调用
strace -c ls

# 跟踪并输出到文件
strace -o trace.log command
```

**权限**: 🟡 需要对目标进程有ptrace权限 | **危险级别**: 🟡 注意

---

### `lsof` - 列出打开的文件

**功能**: 列出系统中打开的文件和进程信息

```bash
lsof [OPTION]... [FILE]...
```

**常用选项**:
- `-p PID` - 指定进程ID
- `-u USER` - 指定用户
- `-c CMD` - 指定命令名
- `-i` - 网络连接
- `-t` - 只显示PID

**示例**:
```bash
# 显示所有打开的文件
lsof

# 显示指定进程打开的文件
lsof -p 1234

# 显示指定用户打开的文件
lsof -u username

# 显示网络连接
lsof -i

# 显示指定端口的连接
lsof -i :80

# 显示指定文件被哪些进程打开
lsof /var/log/syslog

# 查找占用指定端口的进程
lsof -t -i :8080
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 实用脚本和技巧

### 批量进程管理脚本

```bash
#!/bin/bash
# 批量进程管理脚本

# 函数：查找并杀死匹配的进程
kill_by_pattern() {
    local pattern=$1
    local signal=${2:-TERM}
    
    echo "查找匹配 '$pattern' 的进程..."
    pids=$(pgrep -f "$pattern")
    
    if [ -z "$pids" ]; then
        echo "没有找到匹配的进程"
        return 1
    fi
    
    echo "找到以下进程："
    ps -p $pids -o pid,ppid,cmd
    
    read -p "确认杀死这些进程？(y/N) " confirm
    if [[ $confirm == [Yy] ]]; then
        kill -$signal $pids
        echo "已发送 $signal 信号"
    fi
}

# 使用示例
kill_by_pattern "nginx" "HUP"  # 重新加载nginx配置
```

### 系统负载监控

```bash
#!/bin/bash
# 系统负载监控脚本

monitor_load() {
    local threshold=${1:-2.0}
    
    while true; do
        load=$(uptime | awk -F'load average:' '{print $2}' | cut -d, -f1 | xargs)
        
        if (( $(echo "$load > $threshold" | bc -l) )); then
            echo "$(date): 高负载警告! 当前负载: $load"
            
            # 显示CPU使用最高的5个进程
            echo "CPU使用率最高的5个进程："
            ps aux --sort=-pcpu | head -6
            
            # 可以添加报警逻辑
            # send_alert "High load: $load"
        fi
        
        sleep 30
    done
}

# 启动监控
monitor_load 1.5
```

### 进程资源使用分析

```bash
#!/bin/bash
# 进程资源分析脚本

analyze_process() {
    local pid=$1
    
    if [ -z "$pid" ]; then
        echo "用法: analyze_process <PID>"
        return 1
    fi
    
    if ! kill -0 "$pid" 2>/dev/null; then
        echo "进程 $pid 不存在"
        return 1
    fi
    
    echo "=== 进程 $pid 资源分析 ==="
    
    # 基本信息
    ps -p "$pid" -o pid,ppid,user,start,time,pcpu,pmem,cmd
    
    echo -e "\n=== 内存使用详情 ==="
    cat "/proc/$pid/status" | grep -E "VmSize|VmRSS|VmPeak|VmHWM"
    
    echo -e "\n=== 打开的文件描述符数量 ==="
    lsof -p "$pid" | wc -l
    
    echo -e "\n=== 网络连接 ==="
    lsof -i -p "$pid"
    
    echo -e "\n=== 线程信息 ==="
    ps -T -p "$pid" | wc -l
}

# 使用示例
analyze_process 1234
```

---

## 故障排除

### 常见问题诊断

#### 僵尸进程处理

```bash
# 查找僵尸进程
ps aux | awk '{if($8=="Z") print}'

# 或者
ps -eo stat,pid,cmd | grep "^Z"

# 查找僵尸进程的父进程
ps -eo pid,ppid,state,comm | grep "Z"

# 杀死父进程（谨慎操作）
kill -TERM parent_pid
```

#### 进程卡死处理

```bash
# 查看进程状态
ps -p PID -o pid,stat,wchan

# 如果状态是D（不可中断睡眠），查看等待的资源
cat /proc/PID/wchan

# 尝试发送信号
kill -TERM PID
sleep 5
kill -KILL PID
```

#### 资源耗尽诊断

```bash
# CPU使用率最高的进程
ps aux --sort=-pcpu | head -10

# 内存使用率最高的进程
ps aux --sort=-pmem | head -10

# 打开文件最多的进程
lsof | awk '{print $2}' | sort | uniq -c | sort -rn | head -10

# 检查系统资源限制
ulimit -a
cat /proc/sys/fs/file-max
cat /proc/sys/kernel/pid_max
```

---

## 最佳实践

### 1. 进程监控

```bash
# 定期检查关键服务
#!/bin/bash
services=("nginx" "mysql" "redis")

for service in "${services[@]}"; do
    if ! pgrep "$service" > /dev/null; then
        echo "$(date): $service not running" >> /var/log/service-monitor.log
        # 重启服务的逻辑
    fi
done
```

### 2. 资源使用优化

```bash
# 为不同类型的任务设置合适的优先级
nice -n 19 backup_script.sh     # 备份任务低优先级
nice -n -5 critical_service     # 关键服务高优先级
```

### 3. 安全的进程终止

```bash
# 优雅地终止进程
graceful_kill() {
    local pid=$1
    local timeout=${2:-30}
    
    # 发送TERM信号
    kill -TERM "$pid"
    
    # 等待进程退出
    for i in $(seq 1 $timeout); do
        if ! kill -0 "$pid" 2>/dev/null; then
            echo "进程已正常退出"
            return 0
        fi
        sleep 1
    done
    
    # 强制杀死
    echo "强制终止进程"
    kill -KILL "$pid"
}
```

### 4. 进程间通信监控

```bash
# 监控进程间的通信
monitor_ipc() {
    echo "=== 共享内存 ==="
    ipcs -m
    
    echo -e "\n=== 信号量 ==="
    ipcs -s
    
    echo -e "\n=== 消息队列 ==="
    ipcs -q
}
```

---

## 总结

进程管理是Linux系统管理的核心技能：

1. **理解进程** - 掌握进程生命周期和状态
2. **监控工具** - 熟练使用ps、top、htop等工具
3. **控制技巧** - 掌握信号、作业控制和优先级管理
4. **故障诊断** - 能够识别和处理各种进程问题
5. **自动化** - 编写脚本实现进程监控和管理自动化

---

*参考文档*:
- [Process Management in Linux](https://www.kernel.org/doc/html/latest/admin-guide/pm/)
- [Linux Process API](https://man7.org/linux/man-pages/man2/fork.2.html)
- [System Programming](https://www.gnu.org/software/libc/manual/html_node/Processes.html)
