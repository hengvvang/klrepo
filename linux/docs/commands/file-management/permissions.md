# 文件管理 - 权限管理

## 概述

Linux 文件权限系统是系统安全的核心组成部分。理解和正确管理文件权限对于系统安全、数据保护和多用户环境管理至关重要。本文档详细介绍Linux权限管理的各个方面。

---

## 权限基础概念

### 权限类型

Linux 中有三种基本权限类型：

- **读权限 (r, Read)** - 权限值：4
  - 文件：可以查看文件内容
  - 目录：可以列出目录内容
  
- **写权限 (w, Write)** - 权限值：2
  - 文件：可以修改文件内容
  - 目录：可以创建、删除目录中的文件
  
- **执行权限 (x, Execute)** - 权限值：1
  - 文件：可以执行文件
  - 目录：可以进入目录（cd）

### 权限对象

权限针对三类对象：

- **所有者 (Owner/User)** - 文件的创建者
- **所属组 (Group)** - 文件所属的组
- **其他用户 (Others)** - 除所有者和组成员外的用户

### 权限表示法

#### 符号表示法
```
-rwxrw-r--
│││││││└─ 其他用户权限 (r--)
│││└───── 所属组权限 (rw-)  
└─────── 所有者权限 (rwx)
│
└──────── 文件类型 (-=普通文件, d=目录, l=符号链接)
```

#### 数字表示法
```
755 = rwxr-xr-x
│││
││└─ 其他用户权限 (5 = r-x = 4+1)
│└── 所属组权限 (5 = r-x = 4+1)
└─── 所有者权限 (7 = rwx = 4+2+1)
```

---

## 权限查看命令

### `ls -l` - 详细列表

**功能**: 以长格式显示文件信息，包括权限

```bash
ls -l [FILE]...
```

**示例**:
```bash
# 查看当前目录文件权限
ls -l

# 查看特定文件权限
ls -l /etc/passwd

# 查看目录权限
ls -ld /home/user/

# 查看隐藏文件权限
ls -la
```

**输出解释**:
```bash
-rw-r--r-- 1 user group 1234 Jul 20 10:30 filename.txt
│││││││││  │ │    │     │    │           │
│││││││││  │ │    │     │    │           └─ 文件名
│││││││││  │ │    │     │    └─ 修改时间
│││││││││  │ │    │     └─ 文件大小
│││││││││  │ │    └─ 所属组
│││││││││  │ └─ 所有者
│││││││││  └─ 硬链接数
└─────────  权限位 (第1位文件类型，2-4位所有者，5-7位组，8-10位其他)
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `stat` - 详细文件状态

**功能**: 显示文件详细状态信息

```bash
stat [OPTION]... FILE...
```

**常用选项**:
- `-f` - 显示文件系统状态
- `-c FORMAT` - 自定义输出格式
- `-t` - 简洁格式输出

**示例**:
```bash
# 查看文件详细状态
stat filename.txt

# 只显示权限（八进制）
stat -c "%a" filename.txt

# 显示权限和所有者信息
stat -c "%A %U %G" filename.txt

# 查看多个文件
stat file1.txt file2.txt
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 权限修改命令

### `chmod` - 修改权限

**功能**: 修改文件或目录的权限

```bash
chmod [OPTION]... MODE[,MODE]... FILE...
chmod [OPTION]... OCTAL-MODE FILE...
chmod [OPTION]... --reference=RFILE FILE...
```

**常用选项**:
- `-R` - 递归修改目录及其内容
- `-v` - 显示修改过程
- `-c` - 只显示实际修改的文件
- `--reference=FILE` - 参考其他文件的权限

#### 数字模式

**示例**:
```bash
# 设置文件权限为 rw-r--r-- (644)
chmod 644 filename.txt

# 设置目录权限为 rwxr-xr-x (755)
chmod 755 directory/

# 递归设置目录权限
chmod -R 755 /path/to/directory/

# 设置脚本可执行
chmod 755 script.sh

# 设置文件只有所有者可读写
chmod 600 private.txt

# 设置目录及内容的权限
chmod -R 644 documents/
find documents/ -type d -exec chmod 755 {} \;
```

#### 符号模式

**符号**:
- `u` - 用户（所有者）
- `g` - 组
- `o` - 其他用户
- `a` - 所有用户（相当于ugo）

**操作符**:
- `+` - 添加权限
- `-` - 移除权限
- `=` - 设置权限（覆盖原有权限）

**示例**:
```bash
# 给所有者添加执行权限
chmod u+x script.sh

# 移除其他用户的写权限
chmod o-w filename.txt

# 给组添加写权限
chmod g+w shared_file.txt

# 设置所有用户只读权限
chmod a=r readonly.txt

# 给所有者设置读写执行，组和其他只读
chmod u=rwx,go=r script.sh

# 移除所有用户的执行权限
chmod a-x filename.txt

# 复制其他用户权限给组
chmod g=o filename.txt
```

**权限**: 🟡 文件所有者或root | **危险级别**: 🟡 注意

---

### `chown` - 修改所有者

**功能**: 修改文件或目录的所有者和所属组

```bash
chown [OPTION]... [OWNER][:[GROUP]] FILE...
chown [OPTION]... --reference=RFILE FILE...
```

**常用选项**:
- `-R` - 递归修改
- `-v` - 显示修改过程
- `-c` - 只显示实际修改的文件
- `--reference=FILE` - 参考其他文件

**示例**:
```bash
# 修改文件所有者
chown user filename.txt

# 修改文件所有者和组
chown user:group filename.txt

# 只修改组（所有者不变）
chown :group filename.txt

# 递归修改目录及内容
chown -R user:group directory/

# 参考其他文件修改
chown --reference=template.txt target.txt

# 修改符号链接本身（而不是目标）
chown -h user symlink
```

**权限**: 🔴 root用户 | **危险级别**: 🟡 注意

---

### `chgrp` - 修改所属组

**功能**: 修改文件或目录的所属组

```bash
chgrp [OPTION]... GROUP FILE...
chgrp [OPTION]... --reference=RFILE FILE...
```

**常用选项**:
- `-R` - 递归修改
- `-v` - 显示修改过程
- `-c` - 只显示实际修改的文件

**示例**:
```bash
# 修改文件所属组
chgrp group filename.txt

# 递归修改目录所属组
chgrp -R developers project/

# 参考其他文件修改组
chgrp --reference=template.txt target.txt

# 显示修改过程
chgrp -v staff *.txt
```

**权限**: 🟡 文件所有者或root | **危险级别**: 🟡 注意

---

## 特殊权限

### SUID (Set User ID)

**功能**: 执行文件时以文件所有者身份运行

- **数字表示**: 4000
- **符号表示**: s（在所有者执行位）

**示例**:
```bash
# 设置SUID权限
chmod 4755 program
# 或
chmod u+s program

# 查看SUID文件
find /usr/bin -perm -4000 -type f

# 常见SUID文件
ls -l /usr/bin/passwd
ls -l /usr/bin/sudo
```

### SGID (Set Group ID)

**功能**: 
- 文件：执行时以文件所属组身份运行
- 目录：新建文件继承目录的组

- **数字表示**: 2000  
- **符号表示**: s（在组执行位）

**示例**:
```bash
# 设置SGID权限
chmod 2755 program
# 或
chmod g+s program

# 为目录设置SGID
chmod g+s shared_directory/

# 查看SGID文件/目录
find /usr/bin -perm -2000 -type f
```

### Sticky Bit

**功能**: 
- 目录：只有文件所有者可以删除自己的文件

- **数字表示**: 1000
- **符号表示**: t（在其他用户执行位）

**示例**:
```bash
# 设置Sticky Bit
chmod 1755 directory/
# 或
chmod +t directory/

# 查看典型的sticky目录
ls -ld /tmp
ls -ld /var/tmp

# 创建共享目录
mkdir shared
chmod 1777 shared/
```

---

## 访问控制列表 (ACL)

### `getfacl` - 查看ACL

**功能**: 获取文件访问控制列表

```bash
getfacl [OPTION]... FILE...
```

**示例**:
```bash
# 查看文件ACL
getfacl filename.txt

# 查看目录ACL
getfacl directory/

# 以简洁格式显示
getfacl -c filename.txt
```

### `setfacl` - 设置ACL

**功能**: 设置文件访问控制列表

```bash
setfacl [OPTION]... [-bdkmR] ACL_SPEC... FILE...
```

**常用选项**:
- `-m` - 修改ACL
- `-x` - 删除ACL条目
- `-b` - 删除所有扩展ACL
- `-d` - 设置默认ACL
- `-R` - 递归操作

**示例**:
```bash
# 给特定用户添加读写权限
setfacl -m u:username:rw filename.txt

# 给特定组添加读权限
setfacl -m g:groupname:r filename.txt

# 设置默认ACL（对目录）
setfacl -d -m u:username:rwx directory/

# 删除特定用户的ACL
setfacl -x u:username filename.txt

# 复制ACL到其他文件
getfacl file1.txt | setfacl --set-file=- file2.txt
```

**权限**: 🟡 文件所有者或root | **危险级别**: 🟡 注意

---

## 实用场景和技巧

### 常用权限设置

#### 文件权限

```bash
# 私人文件（只有所有者可读写）
chmod 600 private.txt

# 共享只读文件
chmod 644 shared_readonly.txt  

# 可执行脚本
chmod 755 script.sh

# 配置文件（组可读）
chmod 640 config.conf
```

#### 目录权限

```bash
# 私人目录
chmod 700 private_dir/

# 共享目录（所有人可读可进入）
chmod 755 public_dir/

# 工作组共享目录
chmod 775 team_shared/
chmod g+s team_shared/  # 新文件继承组

# 上传目录（任何人可写入）
mkdir upload/
chmod 1777 upload/  # sticky bit防止互相删除
```

### 批量权限管理

```bash
# 批量设置文件权限为644，目录权限为755
find /path -type f -exec chmod 644 {} \;
find /path -type d -exec chmod 755 {} \;

# 一条命令完成上述操作
find /path \( -type f -exec chmod 644 {} \; \) -o \( -type d -exec chmod 755 {} \; \)

# 递归设置所有.sh文件为可执行
find . -name "*.sh" -exec chmod +x {} \;

# 移除所有用户的写权限（保护文件）
chmod -R a-w important_files/
```

### 权限故障排查

```bash
# 检查目录的完整权限路径
namei -m /path/to/file

# 查找权限异常的文件
find /home -type f \( -perm -002 -o -perm -020 \) -ls

# 查找没有所有者的文件
find / -nouser -o -nogroup 2>/dev/null

# 查找SUID/SGID文件
find / -perm -4000 -o -perm -2000 2>/dev/null
```

### 安全权限审计

```bash
#!/bin/bash
# 权限安全检查脚本

echo "=== 权限安全检查 ==="

echo "1. 查找世界可写文件:"
find /etc /bin /sbin /usr -perm -002 -type f 2>/dev/null | head -10

echo -e "\n2. 查找SUID程序:"
find /usr/bin /usr/sbin /bin /sbin -perm -4000 -type f 2>/dev/null

echo -e "\n3. 查找空密码用户:"
awk -F: '($2 == "") {print $1}' /etc/shadow 2>/dev/null

echo -e "\n4. 查找UID为0的用户:"
awk -F: '($3 == "0") {print $1}' /etc/passwd

echo -e "\n5. 检查重要文件权限:"
ls -l /etc/passwd /etc/shadow /etc/sudoers 2>/dev/null
```

---

## 权限规划最佳实践

### 1. 最小权限原则

```bash
# 给予用户完成任务的最小权限
# 避免过度的777权限
chmod 755 script.sh    # 而不是 chmod 777 script.sh
```

### 2. 组权限管理

```bash
# 创建工作组
sudo groupadd developers
sudo usermod -a -G developers username

# 设置组共享目录
sudo mkdir /shared/projects
sudo chgrp developers /shared/projects
sudo chmod 2775 /shared/projects  # SGID + 组写权限
```

### 3. 目录结构权限

```bash
# 标准目录权限结构
home/
├── user/           (755, user:user)
│   ├── public/     (755, user:user) 
│   ├── private/    (700, user:user)
│   └── shared/     (775, user:group, +SGID)
```

### 4. Web应用权限

```bash
# Web应用典型权限设置
sudo chown -R www-data:www-data /var/www/html/
find /var/www/html -type d -exec chmod 755 {} \;
find /var/www/html -type f -exec chmod 644 {} \;
# 上传目录特殊处理
chmod 775 /var/www/html/uploads/
```

---

## 常见问题解决

### 权限被拒绝

```bash
# 问题：Permission denied
ls: cannot access '/etc/shadow': Permission denied

# 解决方案：
# 1. 检查权限
ls -l /etc/shadow
# 2. 使用sudo（如果需要）
sudo cat /etc/shadow
# 3. 检查目录权限路径
namei -m /etc/shadow
```

### 无法删除文件

```bash
# 问题：无法删除文件
rm: cannot remove 'file.txt': Permission denied

# 解决方案：
# 1. 检查文件属性
lsattr file.txt
# 2. 移除只读属性（如果有）
chattr -i file.txt
# 3. 检查父目录权限
ls -ld .
```

### SUID不生效

```bash
# 问题：SUID程序无法提升权限
# 解决方案：
# 1. 检查文件系统挂载选项
mount | grep nosuid
# 2. 检查文件权限设置
ls -l program
# 3. 确认程序本身支持SUID
```

---

## 权限管理工具

### umask - 默认权限掩码

```bash
# 查看当前umask
umask

# 设置umask（临时）
umask 022

# 永久设置（在 .bashrc 或 .profile）
echo "umask 022" >> ~/.bashrc
```

### 权限计算器脚本

```bash
#!/bin/bash
# 权限计算器
calc_perm() {
    local perm=$1
    local r w x
    
    r=$(($perm / 4))
    w=$((($perm % 4) / 2))  
    x=$(($perm % 2))
    
    echo "${r:+r}${w:+w}${x:+x}"
}

echo "权限 755 表示："
echo "所有者: $(calc_perm 7)"
echo "组: $(calc_perm 5)"  
echo "其他: $(calc_perm 5)"
```

---

## 权限监控

### 实时权限变化监控

```bash
# 使用inotify监控权限变化
inotifywait -m -e attrib /path/to/watch

# 监控脚本
#!/bin/bash
while inotifywait -e attrib /important/files/ 2>/dev/null; do
    echo "$(date): 权限发生变化" >> /var/log/perm-changes.log
    ls -l /important/files/ >> /var/log/perm-changes.log
done
```

---

## 总结

权限管理是Linux系统管理的核心技能：

1. **理解基础** - 掌握rwx权限和数字表示
2. **合理规划** - 遵循最小权限原则
3. **定期审计** - 检查异常权限和SUID程序  
4. **工具熟练** - 熟练使用chmod、chown、ACL等工具
5. **安全意识** - 避免过度权限，注意特殊权限的影响

---

*参考文档*:
- [Linux File Permissions](https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html)
- [Access Control Lists](https://www.usenix.org/legacy/publications/library/proceedings/usenix03/tech/freenix03/full_papers/gruenbacher/gruenbacher_html/main.html)
- [Security in Linux](https://www.kernel.org/doc/html/latest/admin-guide/LSM/)
