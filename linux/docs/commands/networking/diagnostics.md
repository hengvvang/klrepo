# 网络工具 - 连接诊断

## 概述

网络诊断是系统管理和故障排除的重要技能。Linux 提供了丰富的网络诊断工具，帮助管理员识别、分析和解决网络连接问题。本文档详细介绍各种网络诊断工具的使用方法。

---

## 网络连接测试

### `ping` - ICMP回声测试

**功能**: 使用ICMP协议测试网络连接性和延迟

```bash
ping [OPTION]... DESTINATION
```

**常用选项**:
- `-c COUNT` - 发送指定数量的包后停止
- `-i INTERVAL` - 设置发送间隔（秒）
- `-s SIZE` - 设置包大小（字节）
- `-t TTL` - 设置TTL值
- `-W TIMEOUT` - 等待响应超时时间
- `-f` - 快速模式（洪水ping，需要root）
- `-q` - 安静模式，只显示统计
- `-v` - 详细输出
- `-4` - 强制使用IPv4
- `-6` - 强制使用IPv6

**示例**:
```bash
# 基本连通性测试
ping google.com

# 发送5个包后停止
ping -c 5 8.8.8.8

# 设置包大小为1500字节
ping -s 1500 192.168.1.1

# 快速ping测试（每0.2秒一次）
ping -i 0.2 -c 10 192.168.1.1

# 安静模式，只显示统计结果
ping -q -c 10 baidu.com

# 设置超时时间为2秒
ping -W 2 -c 3 slow-server.com

# IPv6 ping测试
ping6 ::1

# 洪水ping（需要root权限）
sudo ping -f -c 100 192.168.1.1
```

**输出解释**:
```bash
64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=25.2 ms
│    │      │           │         │       │
│    │      │           │         │       └─ 往返时间
│    │      │           │         └─ 生存时间
│    │      │           └─ 序列号
│    │      └─ 源IP地址
│    └─ 响应包大小
└─ 包大小
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `ping6` - IPv6连接测试

**功能**: IPv6网络的ICMP测试

```bash
ping6 [OPTION]... DESTINATION
```

**示例**:
```bash
# 测试IPv6连接
ping6 ::1

# 测试IPv6 DNS
ping6 2001:4860:4860::8888

# 指定接口进行测试
ping6 -I eth0 fe80::1

# 测试链路本地地址
ping6 fe80::1%eth0
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `traceroute` - 路由跟踪

**功能**: 跟踪数据包到达目标的路由路径

```bash
traceroute [OPTION]... DESTINATION [PORT]
```

**常用选项**:
- `-n` - 不进行DNS反向解析
- `-m MAX_TTL` - 设置最大跳数
- `-w TIMEOUT` - 设置等待响应超时
- `-q NQUERIES` - 每跳发送的探测包数
- `-p PORT` - 设置目标端口
- `-I` - 使用ICMP ECHO代替UDP
- `-T` - 使用TCP SYN代替UDP
- `-4` - 强制使用IPv4
- `-6` - 强制使用IPv6

**示例**:
```bash
# 基本路由跟踪
traceroute google.com

# 不解析主机名
traceroute -n 8.8.8.8

# 使用ICMP代替UDP
traceroute -I baidu.com

# 使用TCP跟踪
traceroute -T -p 80 www.google.com

# 设置最大跳数为20
traceroute -m 20 remote-server.com

# IPv6路由跟踪
traceroute6 ::1

# 快速跟踪（减少探测包数）
traceroute -q 1 destination.com
```

**输出解释**:
```bash
 1  192.168.1.1 (192.168.1.1)  1.234 ms  1.123 ms  1.045 ms
 2  10.0.0.1 (10.0.0.1)  5.678 ms  5.456 ms  5.234 ms
 3  * * *
 │  │            │        │      │      └─ 第3次探测时间
 │  │            │        │      └─ 第2次探测时间  
 │  │            │        └─ 第1次探测时间
 │  │            └─ 主机名
 │  └─ IP地址
 └─ 跳数
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `mtr` - 网络诊断工具

**功能**: 结合ping和traceroute功能的网络诊断工具

```bash
mtr [OPTION]... HOSTNAME
```

**常用选项**:
- `-c COUNT` - 发送指定数量的包
- `-i INTERVAL` - 设置发送间隔
- `-n` - 不解析主机名
- `-r` - 报告模式（非交互）
- `-s SIZE` - 设置包大小
- `-4` - 强制IPv4
- `-6` - 强制IPv6
- `--tcp` - 使用TCP
- `--udp` - 使用UDP

**交互式命令**:
- `q` - 退出
- `d` - 切换显示模式
- `n` - 切换DNS解析
- `p` - 暂停/恢复

**示例**:
```bash
# 交互式网络测试
mtr google.com

# 报告模式，发送100个包
mtr -r -c 100 8.8.8.8

# 不解析主机名
mtr -n baidu.com

# 使用TCP进行测试
mtr --tcp -P 80 www.google.com

# 设置包大小
mtr -s 1500 destination.com
```

**安装**:
```bash
# Ubuntu/Debian
sudo apt install mtr-tiny

# CentOS/RHEL
sudo yum install mtr
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 端口和服务检测

### `telnet` - Telnet客户端

**功能**: 测试TCP端口连接性

```bash
telnet [HOST [PORT]]
```

**示例**:
```bash
# 测试HTTP端口
telnet www.google.com 80

# 测试SSH端口
telnet 192.168.1.100 22

# 测试SMTP端口
telnet smtp.gmail.com 587

# 测试本地服务
telnet localhost 3306

# 退出telnet
# Ctrl+] 然后输入 quit
```

**在telnet会话中的操作**:
```bash
# HTTP请求示例（在telnet连接后）
GET / HTTP/1.1
Host: www.example.com

# 按两次回车发送请求
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `nc` (netcat) - 网络工具

**功能**: 多功能的网络调试和数据传输工具

```bash
nc [OPTION]... [DESTINATION] [PORT]
```

**常用选项**:
- `-l` - 监听模式
- `-p PORT` - 指定本地端口
- `-u` - 使用UDP代替TCP
- `-v` - 详细输出
- `-w TIMEOUT` - 连接超时时间
- `-z` - 扫描模式（不发送数据）
- `-n` - 不进行DNS解析

**示例**:
```bash
# 测试TCP端口连接
nc -v google.com 80

# 扫描端口（不建立连接）
nc -zv 192.168.1.100 22

# 扫描端口范围
nc -zv 192.168.1.1 20-25

# UDP连接测试
nc -u -v dns-server 53

# 监听端口
nc -l -p 12345

# 文件传输（接收端）
nc -l -p 12345 > received_file

# 文件传输（发送端）
nc target_host 12345 < file_to_send

# 端口扫描脚本
for port in {20..25}; do
    nc -zv 192.168.1.1 $port 2>&1 | grep succeeded
done
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `nmap` - 网络探测工具

**功能**: 强大的网络发现和端口扫描工具

```bash
nmap [OPTION]... [TARGET]
```

**常用选项**:
- `-sS` - TCP SYN扫描（半开扫描）
- `-sT` - TCP连接扫描
- `-sU` - UDP扫描  
- `-sV` - 版本检测
- `-O` - 操作系统检测
- `-A` - 激进扫描（OS检测、版本检测、脚本扫描）
- `-p PORT` - 指定端口
- `-F` - 快速扫描（常用端口）
- `-T[0-5]` - 时序模板（速度）

**示例**:
```bash
# 基本主机发现
nmap 192.168.1.1

# 扫描子网
nmap 192.168.1.0/24

# 扫描指定端口
nmap -p 22,80,443 192.168.1.100

# 扫描端口范围
nmap -p 1-1000 target.com

# 版本检测
nmap -sV target.com

# 操作系统检测
nmap -O target.com

# 激进扫描
nmap -A target.com

# 快速扫描
nmap -F target.com

# UDP扫描
nmap -sU target.com

# 脚本扫描
nmap --script vuln target.com

# 扫描多个目标
nmap 192.168.1.1 192.168.1.2 google.com
```

**安装**:
```bash
# Ubuntu/Debian
sudo apt install nmap

# CentOS/RHEL
sudo yum install nmap
```

**权限**: 🟢 普通用户基本功能，🔴 root高级功能 | **危险级别**: 🟡 注意

---

## 域名解析诊断

### `nslookup` - DNS查询工具

**功能**: 查询DNS记录

```bash
nslookup [OPTION]... [NAME] [SERVER]
```

**查询类型**:
- `A` - IPv4地址记录
- `AAAA` - IPv6地址记录
- `MX` - 邮件交换记录
- `NS` - 名称服务器记录
- `TXT` - 文本记录
- `PTR` - 反向DNS记录

**示例**:
```bash
# 基本域名解析
nslookup google.com

# 指定DNS服务器
nslookup google.com 8.8.8.8

# 查询MX记录
nslookup -type=MX gmail.com

# 查询NS记录
nslookup -type=NS google.com

# 反向DNS查询
nslookup 8.8.8.8

# 交互模式
nslookup
> set type=A
> google.com
> exit
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `dig` - DNS查询工具

**功能**: 更强大的DNS查询工具

```bash
dig [@SERVER] [NAME] [TYPE] [OPTION]...
```

**常用选项**:
- `+short` - 简洁输出
- `+trace` - 跟踪DNS解析过程
- `+noall +answer` - 只显示答案部分
- `-x` - 反向DNS查询
- `+tcp` - 使用TCP查询

**示例**:
```bash
# 基本查询
dig google.com

# 简洁输出
dig +short google.com

# 指定DNS服务器
dig @8.8.8.8 google.com

# 查询特定记录类型
dig google.com MX
dig google.com NS
dig google.com TXT

# 反向DNS查询
dig -x 8.8.8.8

# 跟踪DNS解析过程
dig +trace google.com

# 批量查询
dig google.com baidu.com

# 使用TCP查询
dig +tcp google.com

# 查询所有记录类型
dig google.com ANY

# 从文件批量查询
dig -f domains.txt
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `host` - DNS查询工具

**功能**: 简单的DNS查询工具

```bash
host [OPTION]... NAME [SERVER]
```

**常用选项**:
- `-t TYPE` - 指定查询类型
- `-a` - 查询所有记录
- `-v` - 详细输出
- `-r` - 禁用递归查询

**示例**:
```bash
# 基本查询
host google.com

# 查询MX记录
host -t MX gmail.com

# 查询所有记录
host -a google.com

# 反向查询
host 8.8.8.8

# 指定DNS服务器
host google.com 8.8.8.8
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 网络接口诊断

### `ifconfig` - 网络接口配置

**功能**: 显示和配置网络接口

```bash
ifconfig [INTERFACE] [OPTIONS]
```

**示例**:
```bash
# 显示所有网络接口
ifconfig

# 显示指定接口
ifconfig eth0

# 显示简要信息
ifconfig -s

# 启用接口（需要root）
sudo ifconfig eth0 up

# 禁用接口（需要root）
sudo ifconfig eth0 down

# 设置IP地址（需要root）
sudo ifconfig eth0 192.168.1.100 netmask 255.255.255.0
```

**权限**: 🟢 普通用户查看，🔴 root配置 | **危险级别**: ⚪ 安全查看，🟡 注意配置

---

### `ip` - 现代网络工具

**功能**: 现代的网络配置和查看工具

```bash
ip [OPTION] OBJECT [COMMAND [ARGUMENTS]]
```

**常用对象**:
- `link` - 网络接口
- `addr` - IP地址
- `route` - 路由表
- `neigh` - ARP表

**示例**:
```bash
# 显示所有网络接口
ip link show

# 显示IP地址
ip addr show
# 简写
ip a

# 显示特定接口
ip addr show eth0

# 显示路由表
ip route show
# 简写
ip r

# 显示ARP表
ip neigh show

# 启用接口（需要root）
sudo ip link set eth0 up

# 添加IP地址（需要root）
sudo ip addr add 192.168.1.100/24 dev eth0

# 添加路由（需要root）
sudo ip route add 192.168.2.0/24 via 192.168.1.1
```

**权限**: 🟢 普通用户查看，🔴 root配置 | **危险级别**: ⚪ 安全查看，🟡 注意配置

---

## 网络连接状态

### `netstat` - 网络连接统计

**功能**: 显示网络连接、路由表、接口统计等

```bash
netstat [OPTION]...
```

**常用选项**:
- `-t` - TCP连接
- `-u` - UDP连接
- `-l` - 只显示监听端口
- `-n` - 显示数字地址而不解析主机
- `-p` - 显示进程ID和名称
- `-r` - 显示路由表
- `-i` - 显示网络接口统计
- `-c` - 持续显示
- `-a` - 显示所有套接字

**示例**:
```bash
# 显示所有TCP连接
netstat -t

# 显示所有监听端口
netstat -tl

# 显示数字格式的连接
netstat -tn

# 显示带进程信息的连接
netstat -tlnp

# 显示UDP连接
netstat -un

# 显示路由表
netstat -rn

# 显示网络接口统计
netstat -i

# 持续监控连接
netstat -tc

# 统计连接状态
netstat -t | awk '{print $6}' | sort | uniq -c
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `ss` - 现代套接字统计

**功能**: netstat的现代替代品，更快更强大

```bash
ss [OPTION]... [FILTER]
```

**常用选项**:
- `-t` - TCP套接字
- `-u` - UDP套接字
- `-l` - 监听套接字
- `-n` - 不解析服务名
- `-p` - 显示进程信息
- `-4` - 只显示IPv4
- `-6` - 只显示IPv6
- `-s` - 显示摘要统计

**示例**:
```bash
# 显示所有连接
ss

# 显示TCP监听端口
ss -tl

# 显示带进程信息的连接
ss -tlnp

# 显示UDP套接字
ss -u

# 显示连接统计
ss -s

# 过滤特定端口
ss -t '( dport = :80 or sport = :80 )'

# 显示特定状态的连接
ss -t state established

# 显示连接到特定地址的套接字
ss dst 192.168.1.100
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 网络性能测试

### `wget` - 文件下载工具

**功能**: 命令行文件下载工具，可用于测试HTTP/HTTPS连接

```bash
wget [OPTION]... [URL]...
```

**网络测试相关选项**:
- `-O FILE` - 输出到文件
- `-q` - 安静模式
- `-v` - 详细输出
- `-T TIMEOUT` - 读取超时
- `--tries=NUMBER` - 重试次数
- `--spider` - 不下载，只检查
- `--server-response` - 显示服务器响应

**示例**:
```bash
# 测试网站可用性
wget --spider http://www.google.com

# 下载文件并测试速度
wget http://example.com/largefile.zip

# 测试连接超时
wget -T 5 --tries=3 http://slow-server.com

# 显示详细连接信息
wget -v http://example.com

# 测试HTTPS连接
wget --no-check-certificate https://example.com
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `curl` - 数据传输工具

**功能**: 强大的数据传输工具，支持多种协议

```bash
curl [OPTION]... [URL]...
```

**常用选项**:
- `-I` - 只获取头部信息
- `-v` - 详细输出
- `-s` - 安静模式
- `-L` - 跟随重定向
- `-w FORMAT` - 自定义输出格式
- `-o FILE` - 输出到文件
- `--connect-timeout SEC` - 连接超时
- `--max-time SEC` - 最大传输时间

**示例**:
```bash
# 基本HTTP请求
curl http://www.google.com

# 获取头部信息
curl -I http://www.google.com

# 详细连接信息
curl -v http://www.google.com

# 测试连接时间
curl -w "connect: %{time_connect}s\n" http://google.com

# 测试DNS解析时间
curl -w "dns: %{time_namelookup}s\n" http://google.com

# 完整的时间分析
curl -w "dns:%{time_namelookup} connect:%{time_connect} ttfb:%{time_starttransfer} total:%{time_total}\n" -o /dev/null -s http://google.com

# 测试POST请求
curl -X POST -d "data=test" http://httpbin.org/post

# 测试HTTPS
curl -k https://self-signed.badssl.com/

# 设置超时
curl --connect-timeout 5 --max-time 10 http://slow-server.com
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 高级网络诊断

### `tcpdump` - 数据包捕获

**功能**: 网络数据包分析工具

```bash
tcpdump [OPTION]... [EXPRESSION]
```

**常用选项**:
- `-i INTERFACE` - 指定接口
- `-n` - 不解析主机名
- `-c COUNT` - 捕获指定数量的包
- `-w FILE` - 写入文件
- `-r FILE` - 读取文件
- `-v` - 详细输出
- `-s SIZE` - 捕获的字节数

**示例**:
```bash
# 捕获所有流量
sudo tcpdump

# 捕获特定接口
sudo tcpdump -i eth0

# 捕获HTTP流量
sudo tcpdump -i eth0 port 80

# 捕获特定主机的流量
sudo tcpdump -i eth0 host 192.168.1.100

# 保存到文件
sudo tcpdump -i eth0 -w capture.pcap

# 从文件读取
tcpdump -r capture.pcap

# 捕获DNS查询
sudo tcpdump -i eth0 port 53

# 捕获ICMP包
sudo tcpdump -i eth0 icmp

# 组合过滤条件
sudo tcpdump -i eth0 'host 192.168.1.1 and port 80'
```

**权限**: 🔴 root或有cap_net_raw权限 | **危险级别**: 🟡 注意

---

### `iftop` - 实时网络流量

**功能**: 实时显示网络接口流量

```bash
iftop [OPTION]...
```

**常用选项**:
- `-i INTERFACE` - 指定接口
- `-n` - 不解析主机名
- `-P` - 显示端口号
- `-B` - 以字节显示而非位

**交互式命令**:
- `q` - 退出
- `n` - 切换DNS解析
- `P` - 切换端口显示
- `s` - 切换源地址显示
- `d` - 切换目标地址显示

**示例**:
```bash
# 监控默认接口
sudo iftop

# 监控指定接口
sudo iftop -i eth0

# 不解析主机名
sudo iftop -n

# 显示端口信息
sudo iftop -P
```

**安装**:
```bash
# Ubuntu/Debian
sudo apt install iftop

# CentOS/RHEL
sudo yum install iftop
```

**权限**: 🔴 root | **危险级别**: ⚪ 安全

---

## 实用诊断脚本

### 网络连通性检查脚本

```bash
#!/bin/bash
# 网络连通性全面检查

check_network() {
    local target=${1:-"8.8.8.8"}
    
    echo "=== 网络连通性检查: $target ==="
    
    # 1. ping测试
    echo "1. Ping测试:"
    if ping -c 3 -W 3 "$target" &>/dev/null; then
        echo "   ✓ Ping成功"
        ping -c 1 "$target" | head -2
    else
        echo "   ✗ Ping失败"
    fi
    
    # 2. DNS解析测试
    echo -e "\n2. DNS解析测试:"
    if host "$target" &>/dev/null; then
        echo "   ✓ DNS解析成功"
        host "$target"
    else
        echo "   ✗ DNS解析失败"
    fi
    
    # 3. 路由跟踪
    echo -e "\n3. 路由跟踪:"
    traceroute -n -m 10 -w 3 "$target" | head -15
    
    # 4. 网络接口状态
    echo -e "\n4. 网络接口状态:"
    ip addr show | grep -A 2 "state UP"
    
    # 5. 默认路由
    echo -e "\n5. 默认路由:"
    ip route show default
    
    # 6. DNS配置
    echo -e "\n6. DNS配置:"
    cat /etc/resolv.conf | grep nameserver
}

# 使用示例
check_network "google.com"
```

### 端口扫描脚本

```bash
#!/bin/bash
# 简单端口扫描脚本

port_scan() {
    local host=$1
    local start_port=${2:-1}
    local end_port=${3:-1024}
    local timeout=${4:-1}
    
    if [ -z "$host" ]; then
        echo "用法: port_scan <主机> [起始端口] [结束端口] [超时时间]"
        return 1
    fi
    
    echo "扫描主机: $host"
    echo "端口范围: $start_port-$end_port"
    echo "开放的端口:"
    
    for port in $(seq $start_port $end_port); do
        if timeout $timeout bash -c "echo >/dev/tcp/$host/$port" 2>/dev/null; then
            service=$(getent services $port/tcp 2>/dev/null | cut -d' ' -f1)
            echo "  $port/tcp open ${service:+($service)}"
        fi
    done
}

# 常用端口快速扫描
quick_scan() {
    local host=$1
    local ports="21 22 23 25 53 80 110 143 443 993 995 3389"
    
    echo "快速扫描 $host 的常用端口:"
    for port in $ports; do
        if timeout 1 bash -c "echo >/dev/tcp/$host/$port" 2>/dev/null; then
            service=$(getent services $port/tcp 2>/dev/null | cut -d' ' -f1)
            echo "  $port/tcp open ${service:+($service)}"
        fi
    done
}

# 使用示例
# port_scan 192.168.1.1 1 100
# quick_scan google.com
```

### 网络性能测试脚本

```bash
#!/bin/bash
# 网络性能测试脚本

network_performance() {
    local target=${1:-"http://www.google.com"}
    local count=${2:-10}
    
    echo "=== 网络性能测试: $target ==="
    
    # 1. 连接时间测试
    echo "1. 连接时间分析:"
    for i in $(seq 1 $count); do
        curl -w "DNS:%{time_namelookup}s Connect:%{time_connect}s TTFB:%{time_starttransfer}s Total:%{time_total}s\n" \
             -o /dev/null -s "$target"
        sleep 1
    done | awk '
    BEGIN { dns_sum=0; conn_sum=0; ttfb_sum=0; total_sum=0; count=0 }
    {
        gsub(/[a-zA-Z:]/, "", $0)
        dns_sum += $1; conn_sum += $2; ttfb_sum += $3; total_sum += $4; count++
    }
    END {
        printf "平均值 - DNS:%.3fs Connect:%.3fs TTFB:%.3fs Total:%.3fs\n",
               dns_sum/count, conn_sum/count, ttfb_sum/count, total_sum/count
    }'
    
    # 2. 带宽测试（使用一个测试文件）
    echo -e "\n2. 下载速度测试:"
    wget --progress=dot:giga -O /dev/null "$target" 2>&1 | \
    grep -o '[0-9.]*[KMG]B/s' | tail -1
}

# 使用示例
network_performance "http://speedtest.tele2.net/1MB.zip" 5
```

---

## 故障排除指南

### 常见网络问题诊断

#### 1. 无法访问网站

```bash
# 诊断步骤
echo "检查网络连接..."

# 步骤1: 检查本地网络接口
ip addr show

# 步骤2: 检查默认网关
ip route show default

# 步骤3: 测试本地网关连通性
gateway=$(ip route show default | awk '/default/ {print $3}')
ping -c 3 $gateway

# 步骤4: 测试DNS
nslookup google.com

# 步骤5: 测试外网连通性
ping -c 3 8.8.8.8

# 步骤6: 测试目标网站
curl -I http://target-website.com
```

#### 2. 网络速度慢

```bash
# 网络延迟测试
mtr --report-cycles 10 8.8.8.8

# 查看网络接口错误
ip -s link

# 检查网络拥塞
ss -s

# 查看活跃连接
ss -tuln | wc -l
```

#### 3. DNS解析问题

```bash
# 测试不同DNS服务器
dig @8.8.8.8 google.com
dig @1.1.1.1 google.com
dig @114.114.114.114 google.com

# 清除DNS缓存（如果有）
sudo systemctl flush-dns

# 检查/etc/hosts文件
cat /etc/hosts | grep -v "^#"
```

---

## 最佳实践

### 1. 系统化的网络诊断流程

1. **物理层检查** - 网线、网卡、链路状态
2. **网络层检查** - IP配置、路由、ARP
3. **传输层检查** - 端口状态、连接数
4. **应用层检查** - 服务状态、日志分析

### 2. 网络监控脚本

```bash
#!/bin/bash
# 网络监控守护程序

LOGFILE="/var/log/network-monitor.log"
TARGETS=("8.8.8.8" "google.com" "baidu.com")

log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOGFILE"
}

monitor_network() {
    for target in "${TARGETS[@]}"; do
        if ! ping -c 1 -W 3 "$target" &>/dev/null; then
            log_message "ALERT: Cannot reach $target"
        else
            log_message "INFO: $target is reachable"
        fi
    done
}

# 每5分钟检查一次
while true; do
    monitor_network
    sleep 300
done
```

### 3. 安全考虑

- 使用网络扫描工具时要谨慎，避免对他人系统造成影响
- tcpdump等工具可能捕获敏感信息，使用时要注意数据保护
- 定期检查网络连接，识别异常活动

---

## 总结

网络诊断是Linux系统管理的重要技能：

1. **基础连通性** - 掌握ping、traceroute等基本工具
2. **端口检测** - 学会使用telnet、nc、nmap等工具
3. **DNS诊断** - 熟练使用dig、nslookup等DNS工具
4. **流量分析** - 了解tcpdump、iftop等流量监控工具
5. **自动化监控** - 编写脚本实现网络状态自动监控

---

*参考文档*:
- [Linux Network Troubleshooting Guide](https://www.kernel.org/doc/html/latest/networking/)
- [TCP/IP Illustrated](http://www.kohala.com/start/tcpipiv1.html)
- [Network Diagnostic Tools](https://tools.ietf.org/html/rfc2151)
