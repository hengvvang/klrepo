# 文件管理 - 压缩归档

## 概述

文件压缩和归档是Linux系统管理的基本技能。掌握各种压缩格式和归档工具有助于节省存储空间、加快文件传输速度，以及进行数据备份。本文档详细介绍Linux中常用的压缩归档工具。

---

## tar - 归档工具

### 概述
`tar` (Tape ARchive) 是Linux中最重要的归档工具，可以将多个文件和目录打包成一个文件，并可结合压缩算法减少文件大小。

```bash
tar [OPTION]... [FILE]...
```

### 主要操作模式
- `-c` - 创建归档文件
- `-x` - 解压归档文件  
- `-t` - 列出归档内容
- `-r` - 追加文件到归档
- `-u` - 更新归档中的文件

### 常用选项
- `-f FILE` - 指定归档文件名
- `-v` - 详细输出（显示处理的文件）
- `-z` - 使用gzip压缩/解压
- `-j` - 使用bzip2压缩/解压
- `-J` - 使用xz压缩/解压
- `-C DIR` - 解压到指定目录
- `-p` - 保持文件权限
- `--exclude=PATTERN` - 排除匹配的文件

### 基本用法

#### 创建归档文件

```bash
# 创建简单tar归档
tar -cf archive.tar file1.txt file2.txt directory/

# 创建带详细输出的归档
tar -cvf backup.tar /home/user/documents/

# 创建gzip压缩归档
tar -czf archive.tar.gz directory/

# 创建bzip2压缩归档
tar -cjf archive.tar.bz2 directory/

# 创建xz压缩归档
tar -cJf archive.tar.xz directory/

# 排除特定文件
tar -czf backup.tar.gz --exclude="*.tmp" --exclude="*.log" project/

# 排除多个模式
tar -czf backup.tar.gz \
    --exclude="node_modules" \
    --exclude="*.pyc" \
    --exclude=".git" \
    project/
```

#### 解压归档文件

```bash
# 解压tar归档到当前目录
tar -xf archive.tar

# 解压到指定目录
tar -xf archive.tar -C /path/to/destination/

# 解压gzip压缩归档
tar -xzf archive.tar.gz

# 解压bzip2压缩归档
tar -xjf archive.tar.bz2

# 解压xz压缩归档
tar -xJf archive.tar.xz

# 解压时显示详细信息
tar -xvf archive.tar

# 只解压特定文件
tar -xf archive.tar specific_file.txt

# 只解压匹配模式的文件
tar -xf archive.tar --wildcards "*.txt"
```

#### 查看归档内容

```bash
# 列出归档内容
tar -tf archive.tar

# 详细列出归档内容
tar -tvf archive.tar

# 列出压缩归档内容
tar -tzf archive.tar.gz
```

### 高级用法

```bash
# 增量备份（只备份比归档文件新的文件）
tar -czf backup-$(date +%Y%m%d).tar.gz --newer-mtime="2023-01-01" /home/user/

# 使用文件列表创建归档
find /home/user -name "*.pdf" > file_list.txt
tar -czf documents.tar.gz -T file_list.txt

# 分割大归档文件
tar -czf - large_directory/ | split -b 1G - backup.tar.gz.

# 通过ssh传输和解压
tar -czf - directory/ | ssh user@remote "cd /destination && tar -xzf -"

# 验证归档完整性
tar -tzf archive.tar.gz > /dev/null && echo "Archive is valid"
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## gzip/gunzip - GNU压缩工具

### 概述
`gzip` 是GNU压缩工具，使用Lempel-Ziv-Welch (LZW) 算法进行压缩，压缩率高且速度快。

```bash
gzip [OPTION]... [FILE]...
gunzip [OPTION]... [FILE]...
```

### 常用选项
- `-d` - 解压缩（等同于gunzip）
- `-r` - 递归压缩目录下的所有文件
- `-t` - 测试压缩文件完整性
- `-v` - 显示压缩比信息
- `-[1-9]` - 压缩级别（1最快，9最高压缩率）
- `-f` - 强制压缩（覆盖现有文件）
- `-k` - 保留原文件

### 基本用法

```bash
# 压缩文件（原文件被替换）
gzip file.txt

# 压缩并保留原文件
gzip -k file.txt

# 设置压缩级别
gzip -9 file.txt  # 最高压缩率
gzip -1 file.txt  # 最快压缩

# 递归压缩目录下所有文件
gzip -r directory/

# 解压缩文件
gunzip file.txt.gz
# 或
gzip -d file.txt.gz

# 解压缩并保留压缩文件
gunzip -k file.txt.gz

# 测试压缩文件完整性
gzip -t file.txt.gz

# 显示压缩信息
gzip -v file.txt

# 查看压缩文件内容（不解压）
zcat file.txt.gz
zless file.txt.gz
zgrep "pattern" file.txt.gz
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## bzip2/bunzip2 - 高压缩率工具

### 概述
`bzip2` 使用Burrows-Wheeler算法，压缩率比gzip更高，但速度较慢。

```bash
bzip2 [OPTION]... [FILE]...
bunzip2 [OPTION]... [FILE]...
```

### 基本用法

```bash
# 压缩文件
bzip2 file.txt

# 压缩并保留原文件
bzip2 -k file.txt

# 设置压缩级别
bzip2 -9 file.txt

# 解压缩
bunzip2 file.txt.bz2
# 或
bzip2 -d file.txt.bz2

# 测试完整性
bzip2 -t file.txt.bz2

# 查看压缩文件内容
bzcat file.txt.bz2
bzless file.txt.bz2
bzgrep "pattern" file.txt.bz2
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## xz/unxz - 现代压缩工具

### 概述
`xz` 是基于LZMA2算法的现代压缩工具，提供最高的压缩率。

```bash
xz [OPTION]... [FILE]...
unxz [OPTION]... [FILE]...
```

### 基本用法

```bash
# 压缩文件
xz file.txt

# 压缩并保留原文件
xz -k file.txt

# 设置压缩级别
xz -9 file.txt

# 解压缩
unxz file.txt.xz
# 或
xz -d file.txt.xz

# 查看压缩文件内容
xzcat file.txt.xz
xzless file.txt.xz
xzgrep "pattern" file.txt.xz
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## zip/unzip - 跨平台压缩

### 概述
`zip` 和 `unzip` 提供与Windows兼容的压缩格式，支持密码保护和多文件压缩。

```bash
zip [OPTION]... ARCHIVE [FILE]...
unzip [OPTION]... ARCHIVE [FILE]...
```

### zip常用选项
- `-r` - 递归压缩目录
- `-e` - 加密压缩文件
- `-x` - 排除文件
- `-u` - 更新压缩文件
- `-m` - 移动文件到压缩包（删除原文件）
- `-[0-9]` - 压缩级别

### unzip常用选项
- `-d DIR` - 解压到指定目录
- `-l` - 列出压缩文件内容
- `-t` - 测试压缩文件完整性
- `-o` - 覆盖文件不提示
- `-j` - 忽略路径，解压到当前目录

### 基本用法

```bash
# 创建zip文件
zip archive.zip file1.txt file2.txt

# 递归压缩目录
zip -r backup.zip directory/

# 加密压缩
zip -e secure.zip sensitive_file.txt

# 排除文件
zip -r backup.zip project/ -x "*.tmp" "*.log"

# 更新压缩文件
zip -u backup.zip new_file.txt

# 解压zip文件
unzip archive.zip

# 解压到指定目录
unzip archive.zip -d /path/to/destination/

# 列出压缩文件内容
unzip -l archive.zip

# 测试压缩文件
unzip -t archive.zip

# 只解压特定文件
unzip archive.zip specific_file.txt

# 解压时覆盖不提示
unzip -o archive.zip
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 7z - 7-Zip压缩工具

### 概述
`7z` 是功能强大的压缩工具，支持多种压缩格式，提供极高的压缩率。

```bash
7z [COMMAND] [SWITCHES] ARCHIVE [FILES]...
```

### 主要命令
- `a` - 添加文件到归档
- `x` - 解压文件（保持目录结构）
- `e` - 解压文件（忽略路径）
- `l` - 列出归档内容
- `t` - 测试归档完整性
- `d` - 删除归档中的文件

### 基本用法

```bash
# 创建7z压缩文件
7z a archive.7z file1.txt file2.txt

# 递归压缩目录
7z a backup.7z directory/

# 设置压缩级别
7z a -mx9 archive.7z directory/  # 最高压缩率

# 密码保护
7z a -p archive.7z directory/

# 解压7z文件
7z x archive.7z

# 解压到指定目录
7z x archive.7z -o/path/to/destination/

# 列出内容
7z l archive.7z

# 测试完整性
7z t archive.7z

# 解压其他格式
7z x archive.zip
7z x archive.rar
7z x archive.tar.gz
```

**安装**:
```bash
# Ubuntu/Debian
sudo apt install p7zip-full

# CentOS/RHEL
sudo yum install p7zip
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 压缩格式对比

### 压缩率对比（参考值）
| 格式 | 压缩率 | 速度 | CPU使用 | 兼容性 |
|------|--------|------|---------|--------|
| gzip | 中等   | 快   | 低      | 优秀   |
| bzip2| 高     | 中等 | 中等    | 良好   |
| xz   | 最高   | 慢   | 高      | 良好   |
| zip  | 中等   | 快   | 低      | 最佳   |
| 7z   | 极高   | 慢   | 高      | 中等   |

### 选择建议

```bash
# 日常备份 - 速度和压缩率平衡
tar -czf backup.tar.gz directory/

# 长期存档 - 追求最高压缩率
tar -cJf archive.tar.xz directory/

# 跨平台传输 - 兼容性最佳
zip -r archive.zip directory/

# 大文件压缩 - 极高压缩率
7z a -mx9 archive.7z directory/

# 快速压缩 - 追求速度
tar -czf --fast backup.tar.gz directory/
```

---

## 实用脚本和技巧

### 自动备份脚本

```bash
#!/bin/bash
# 自动备份脚本

BACKUP_SOURCE="/home/user/documents"
BACKUP_DEST="/backup"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="backup_$DATE"

# 创建备份目录
mkdir -p "$BACKUP_DEST"

# 执行备份
echo "开始备份: $BACKUP_SOURCE"
tar -czf "$BACKUP_DEST/$BACKUP_NAME.tar.gz" \
    --exclude="*.tmp" \
    --exclude="*.log" \
    --exclude=".git" \
    --exclude="node_modules" \
    -C "$(dirname "$BACKUP_SOURCE")" \
    "$(basename "$BACKUP_SOURCE")"

# 检查备份是否成功
if [ $? -eq 0 ]; then
    echo "备份成功: $BACKUP_DEST/$BACKUP_NAME.tar.gz"
    
    # 显示备份大小
    ls -lh "$BACKUP_DEST/$BACKUP_NAME.tar.gz"
    
    # 验证备份完整性
    tar -tzf "$BACKUP_DEST/$BACKUP_NAME.tar.gz" > /dev/null
    if [ $? -eq 0 ]; then
        echo "备份文件验证成功"
    else
        echo "警告: 备份文件可能损坏"
    fi
else
    echo "备份失败"
    exit 1
fi

# 清理旧备份（保留最近10个）
cd "$BACKUP_DEST"
ls -t backup_*.tar.gz | tail -n +11 | xargs -r rm
echo "清理完成，保留最近10个备份"
```

### 压缩格式转换脚本

```bash
#!/bin/bash
# 压缩格式转换脚本

convert_archive() {
    local input_file="$1"
    local output_format="$2"
    local temp_dir="/tmp/archive_convert_$$"
    
    if [ ! -f "$input_file" ]; then
        echo "错误: 文件不存在 $input_file"
        return 1
    fi
    
    # 获取文件名（无扩展名）
    local base_name=$(basename "$input_file")
    local name_only="${base_name%.*}"
    
    # 创建临时目录
    mkdir -p "$temp_dir"
    
    # 解压原文件
    echo "解压 $input_file..."
    case "$input_file" in
        *.tar.gz|*.tgz)   tar -xzf "$input_file" -C "$temp_dir" ;;
        *.tar.bz2|*.tbz2) tar -xjf "$input_file" -C "$temp_dir" ;;
        *.tar.xz)         tar -xJf "$input_file" -C "$temp_dir" ;;
        *.zip)            unzip -q "$input_file" -d "$temp_dir" ;;
        *.7z)             7z x "$input_file" -o"$temp_dir" ;;
        *) echo "不支持的输入格式"; return 1 ;;
    esac
    
    # 压缩为目标格式
    echo "压缩为 $output_format 格式..."
    case "$output_format" in
        "tar.gz")  tar -czf "$name_only.tar.gz" -C "$temp_dir" . ;;
        "tar.bz2") tar -cjf "$name_only.tar.bz2" -C "$temp_dir" . ;;
        "tar.xz")  tar -cJf "$name_only.tar.xz" -C "$temp_dir" . ;;
        "zip")     (cd "$temp_dir" && zip -r "../$name_only.zip" .) ;;
        "7z")      7z a "$name_only.7z" "$temp_dir/*" ;;
        *) echo "不支持的输出格式"; return 1 ;;
    esac
    
    # 清理临时目录
    rm -rf "$temp_dir"
    
    echo "转换完成: $name_only.$output_format"
}

# 使用示例
# convert_archive "old_file.zip" "tar.gz"
```

### 大文件分割和合并

```bash
#!/bin/bash
# 大文件分割和合并工具

split_large_archive() {
    local input_file="$1"
    local chunk_size="${2:-1G}"
    
    echo "分割文件: $input_file (块大小: $chunk_size)"
    split -b "$chunk_size" "$input_file" "$input_file."
    
    # 创建合并脚本
    cat > "${input_file}_merge.sh" << EOF
#!/bin/bash
echo "合并文件: $input_file"
cat $input_file.* > $input_file
echo "合并完成"

# 验证完整性
if cmp -s "$input_file.original" "$input_file" 2>/dev/null; then
    echo "文件完整性验证成功"
else
    echo "警告: 文件可能不完整"
fi
EOF
    
    chmod +x "${input_file}_merge.sh"
    
    # 创建校验和
    md5sum "$input_file" > "$input_file.md5"
    
    echo "分割完成，生成了合并脚本: ${input_file}_merge.sh"
}

# 使用示例
# split_large_archive "huge_backup.tar.gz" "500M"
```

---

## 最佳实践

### 1. 选择合适的压缩格式

```bash
# 快速日常备份
tar -czf daily_backup_$(date +%Y%m%d).tar.gz ~/documents/

# 长期存档（最高压缩率）
tar -cJf archive_$(date +%Y%m%d).tar.xz ~/important_data/

# 跨平台分享
zip -r project_$(date +%Y%m%d).zip ~/project/
```

### 2. 备份策略

```bash
# 增量备份
tar -czf incremental_$(date +%Y%m%d).tar.gz \
    --newer-mtime="1 day ago" \
    ~/documents/

# 完整备份 + 排除规则
tar -czf full_backup_$(date +%Y%m%d).tar.gz \
    --exclude-from=backup_exclude.txt \
    ~/
```

### 3. 自动化和监控

```bash
# 备份大小监控
check_backup_size() {
    local backup_file="$1"
    local max_size="1G"
    
    if [ -f "$backup_file" ]; then
        local size=$(stat -f%z "$backup_file" 2>/dev/null || stat -c%s "$backup_file")
        local max_bytes=$(numfmt --from=iec "$max_size")
        
        if [ "$size" -gt "$max_bytes" ]; then
            echo "警告: 备份文件过大 ($backup_file)"
        fi
    fi
}
```

### 4. 安全考虑

```bash
# 加密敏感数据
tar -czf - sensitive_data/ | gpg -c > encrypted_backup.tar.gz.gpg

# 验证备份完整性
tar -tzf backup.tar.gz > /dev/null && echo "备份完整"

# 安全删除原文件
shred -vfz -n 3 original_file.txt
```

---

## 故障排除

### 常见问题

#### 1. 压缩文件损坏
```bash
# 测试tar文件完整性
tar -tf archive.tar.gz > /dev/null

# 测试zip文件完整性  
unzip -t archive.zip

# 尝试恢复损坏的gzip文件
gzip -t file.gz || gzrecover file.gz
```

#### 2. 磁盘空间不足
```bash
# 压缩时直接传输到远程
tar -czf - large_directory/ | ssh user@remote "cat > backup.tar.gz"

# 分块压缩
tar -czf - directory/ | split -b 1G - backup.tar.gz.
```

#### 3. 权限问题
```bash
# 保持权限进行备份
tar -czpf backup.tar.gz directory/

# 解压时保持权限
tar -xzpf backup.tar.gz
```

---

## 总结

压缩归档是Linux系统管理的基础技能：

1. **工具选择** - 根据需求选择合适的压缩工具
2. **格式理解** - 了解不同格式的特点和适用场景
3. **自动化** - 编写脚本实现备份自动化
4. **完整性验证** - 确保压缩文件的完整性
5. **安全考虑** - 注意敏感数据的加密保护

---

*参考文档*:
- [GNU Tar Manual](https://www.gnu.org/software/tar/manual/)
- [gzip Manual](https://www.gnu.org/software/gzip/manual/)
- [Info-ZIP Documentation](http://www.info-zip.org/doc/)
