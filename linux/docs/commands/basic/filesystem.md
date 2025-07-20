# 基础命令 - 文件系统操作

## 概述

文件系统操作是 Linux 使用的基础，包括目录导航、文件查看、创建、删除等基本操作。这些命令是所有 Linux 用户必须掌握的核心技能。

---

## 目录操作

### `pwd` - 显示当前工作目录

**功能**: 打印当前工作目录的完整路径

```bash
pwd [OPTION]
```

**选项**:
- `-L` - 显示逻辑路径（默认，包含符号链接）
- `-P` - 显示物理路径（解析符号链接）

**示例**:
```bash
# 显示当前目录
pwd
# 输出: /home/username/documents

# 显示物理路径（解析符号链接）
pwd -P
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `cd` - 切换目录

**功能**: 改变当前工作目录

```bash
cd [DIRECTORY]
```

**特殊用法**:
- `cd` 或 `cd ~` - 回到家目录
- `cd -` - 回到上一个目录
- `cd ..` - 回到父目录
- `cd ../..` - 回到父目录的父目录
- `cd ./dir` - 进入当前目录下的子目录

**示例**:
```bash
# 切换到指定目录
cd /var/log

# 回到家目录
cd ~
# 或者
cd

# 回到上一个目录
cd -

# 相对路径导航
cd ../documents/projects
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `ls` - 列出目录内容

**功能**: 显示目录中的文件和子目录

```bash
ls [OPTION]... [FILE]...
```

**常用选项**:
- `-l` - 长格式显示（详细信息）
- `-a` - 显示所有文件（包括隐藏文件）
- `-A` - 显示所有文件（除了 . 和 ..）
- `-h` - 人类可读的文件大小
- `-t` - 按修改时间排序
- `-r` - 反向排序
- `-S` - 按文件大小排序
- `-d` - 只显示目录本身，不显示内容
- `--color=auto` - 彩色显示

**示例**:
```bash
# 基本列表
ls

# 详细列表（权限、所有者、大小、时间）
ls -l

# 显示所有文件（包括隐藏文件）
ls -la

# 人类可读的文件大小
ls -lh

# 按时间排序
ls -lt

# 只显示目录
ls -d */

# 递归显示子目录
ls -R
```

**输出格式解释**:
```bash
-rw-r--r-- 1 user group 1234 Jul 20 10:30 filename.txt
│││││││││  │ │    │     │    │           │
│││││││││  │ │    │     │    │           └─ 文件名
│││││││││  │ │    │     │    └─ 修改时间
│││││││││  │ │    │     └─ 文件大小
│││││││││  │ │    └─ 所属组
│││││││││  │ └─ 所有者
│││││││││  └─ 链接数
││││││││└─ 其他用户权限 (r--)
│││││└───  所属组权限 (r--)
││└─────   所有者权限 (rw-)
└─────────  文件类型 (-=普通文件, d=目录, l=符号链接)
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 文件操作

### `touch` - 创建文件或更新时间戳

**功能**: 创建空文件或更新现有文件的访问/修改时间

```bash
touch [OPTION]... FILE...
```

**常用选项**:
- `-a` - 只更改访问时间
- `-m` - 只更改修改时间
- `-c` - 不创建不存在的文件
- `-d STRING` - 使用指定时间而不是当前时间
- `-t STAMP` - 使用指定的时间戳格式

**示例**:
```bash
# 创建新文件
touch newfile.txt

# 创建多个文件
touch file1.txt file2.txt file3.txt

# 更新现有文件的时间戳
touch existing_file.txt

# 使用指定时间
touch -d "2023-01-01 12:00:00" file.txt

# 不创建不存在的文件
touch -c maybe_exists.txt
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `mkdir` - 创建目录

**功能**: 创建一个或多个目录

```bash
mkdir [OPTION]... DIRECTORY...
```

**常用选项**:
- `-p` - 递归创建目录（创建父目录如果不存在）
- `-m MODE` - 设置目录权限
- `-v` - 显示创建过程

**示例**:
```bash
# 创建单个目录
mkdir newdir

# 创建多个目录
mkdir dir1 dir2 dir3

# 递归创建目录结构
mkdir -p project/src/main/java

# 创建目录并设置权限
mkdir -m 755 public_dir

# 显示创建过程
mkdir -pv project/{src,docs,tests}
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `rmdir` - 删除空目录

**功能**: 删除空目录

```bash
rmdir [OPTION]... DIRECTORY...
```

**常用选项**:
- `-p` - 递归删除空的父目录
- `-v` - 显示删除过程
- `--ignore-fail-on-non-empty` - 忽略非空目录的删除失败

**示例**:
```bash
# 删除空目录
rmdir emptydir

# 递归删除空目录
rmdir -p project/empty/path

# 显示删除过程
rmdir -v olddir
```

**权限**: 🟢 普通用户 | **危险级别**: 🟡 注意

---

### `cp` - 复制文件和目录

**功能**: 复制文件和目录

```bash
cp [OPTION]... SOURCE DEST
cp [OPTION]... SOURCE... DIRECTORY
```

**常用选项**:
- `-r, -R` - 递归复制目录
- `-i` - 覆盖前询问
- `-f` - 强制覆盖
- `-p` - 保持文件属性（权限、时间戳等）
- `-a` - 归档模式（等同于 -dpR）
- `-u` - 只复制更新的文件
- `-v` - 显示复制过程
- `-L` - 跟随符号链接
- `-P` - 不跟随符号链接

**示例**:
```bash
# 复制文件
cp source.txt destination.txt

# 复制到目录
cp file.txt /home/user/documents/

# 递归复制目录
cp -r sourcedir/ destdir/

# 保持属性复制
cp -p important.txt backup.txt

# 交互式复制（覆盖前询问）
cp -i file.txt existing_file.txt

# 复制多个文件到目录
cp file1.txt file2.txt file3.txt /backup/

# 归档模式复制（保持所有属性）
cp -a project/ project_backup/
```

**权限**: 🟢 普通用户 | **危险级别**: 🟡 注意

---

### `mv` - 移动/重命名文件和目录

**功能**: 移动文件/目录或重命名

```bash
mv [OPTION]... SOURCE DEST
mv [OPTION]... SOURCE... DIRECTORY
```

**常用选项**:
- `-i` - 覆盖前询问
- `-f` - 强制覆盖
- `-n` - 不覆盖现有文件
- `-u` - 只移动更新的文件
- `-v` - 显示移动过程
- `-b` - 覆盖时创建备份

**示例**:
```bash
# 重命名文件
mv oldname.txt newname.txt

# 移动文件到目录
mv file.txt /home/user/documents/

# 移动目录
mv olddir/ /path/to/newlocation/

# 交互式移动（覆盖前询问）
mv -i file.txt existing_file.txt

# 移动多个文件
mv file1.txt file2.txt file3.txt /backup/

# 创建备份再覆盖
mv -b file.txt existing.txt
```

**权限**: 🟢 普通用户 | **危险级别**: 🟡 注意

---

### `rm` - 删除文件和目录

**功能**: 删除文件和目录

```bash
rm [OPTION]... FILE...
```

**常用选项**:
- `-f` - 强制删除，不询问
- `-i` - 删除前询问确认
- `-r, -R` - 递归删除目录
- `-v` - 显示删除过程
- `-I` - 删除超过3个文件时询问一次
- `--preserve-root` - 不允许删除根目录（默认）
- `--no-preserve-root` - 允许删除根目录

**示例**:
```bash
# 删除文件
rm file.txt

# 交互式删除
rm -i important.txt

# 强制删除
rm -f file.txt

# 递归删除目录
rm -r directory/

# 强制递归删除目录（危险！）
rm -rf directory/

# 显示删除过程
rm -v file.txt

# 删除多个文件
rm file1.txt file2.txt file3.txt
```

**⚠️ 重要警告**:
- `rm -rf` 是非常危险的命令，会永久删除文件
- 删除的文件无法从命令行恢复
- 使用 `-i` 选项进行确认是好习惯
- 永远不要运行 `rm -rf /`

**权限**: 🟢 普通用户 | **危险级别**: 🔴 危险

---

## 实用技巧

### 1. 通配符使用

```bash
# 星号匹配任意字符
ls *.txt          # 所有 .txt 文件
rm temp_*         # 删除以 temp_ 开头的文件

# 问号匹配单个字符
ls file?.txt      # file1.txt, file2.txt 等

# 方括号匹配字符集
ls file[123].txt  # file1.txt, file2.txt, file3.txt
ls file[a-z].txt  # filea.txt, fileb.txt 等
```

### 2. 路径技巧

```bash
# 家目录快捷方式
cd ~/documents    # 等同于 cd /home/username/documents

# 上级目录
cd ../../         # 向上两级目录

# 前一个目录
cd -             # 快速切换到上一个目录
```

### 3. 批量操作

```bash
# 创建目录结构
mkdir -p project/{src,docs,tests}/{main,backup}

# 批量创建文件
touch file{1..10}.txt

# 批量重命名（使用 shell 循环）
for file in *.txt; do
    mv "$file" "${file%.txt}.bak"
done
```

### 4. 文件大小查看

```bash
# 查看目录大小
du -sh directory/

# 查看磁盘使用情况
df -h

# 查看文件大小排序
ls -lhS
```

---

## 常见错误和解决方案

### 权限拒绝 (Permission denied)

```bash
# 问题：无法访问文件或目录
ls: cannot access '/root': Permission denied

# 解决：检查权限或使用 sudo
sudo ls /root
```

### 文件不存在 (No such file or directory)

```bash
# 问题：文件路径错误
cat /path/to/nonexistent/file

# 解决：检查路径和文件名
ls -la /path/to/  # 检查目录内容
```

### 目录非空 (Directory not empty)

```bash
# 问题：rmdir 无法删除非空目录
rmdir: failed to remove 'directory': Directory not empty

# 解决：使用 rm -r 或先清空目录
rm -r directory/
```

---

## 最佳实践

1. **使用 Tab 补全** - 提高效率，减少拼写错误
2. **使用 `-i` 选项** - 删除或覆盖文件前确认
3. **定期备份** - 重要文件定期复制到安全位置
4. **理解路径** - 区分绝对路径和相对路径
5. **检查权限** - 使用 `ls -l` 了解文件权限
6. **使用别名** - 为常用命令创建别名提高效率

```bash
# 有用的别名示例
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
```

---

*参考文档*:
- [GNU Coreutils - File utilities](https://www.gnu.org/software/coreutils/manual/html_node/File-utilities.html)
- [Linux File System Hierarchy](https://www.pathname.com/fhs/)
- [POSIX.1-2017 Directory utilities](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html)
