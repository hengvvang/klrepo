# 基础命令 - 文本处理

## 概述

文本处理是 Linux 系统中最常用的操作之一。Linux 提供了丰富的文本处理工具，从简单的文件查看到复杂的文本分析和编辑。掌握这些工具是高效使用 Linux 的关键。

---

## 文本查看

### `cat` - 连接和显示文件

**功能**: 显示文件内容，连接多个文件，或从标准输入读取

```bash
cat [OPTION]... [FILE]...
```

**常用选项**:
- `-n` - 显示行号
- `-b` - 只对非空行显示行号
- `-s` - 压缩连续的空行为一行
- `-T` - 显示 Tab 字符为 ^I
- `-v` - 显示非打印字符
- `-A` - 等同于 -vET（显示所有非打印字符）

**示例**:
```bash
# 显示文件内容
cat file.txt

# 显示多个文件
cat file1.txt file2.txt

# 显示带行号
cat -n file.txt

# 只对非空行显示行号
cat -b file.txt

# 创建新文件（从标准输入）
cat > newfile.txt
这里输入内容
按 Ctrl+D 结束

# 追加到文件
cat >> existing_file.txt
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `less` - 分页查看文件

**功能**: 分页显示文件内容，支持向前和向后浏览

```bash
less [OPTION]... [FILE]...
```

**常用选项**:
- `-N` - 显示行号
- `-S` - 不换行显示长行
- `-i` - 忽略大小写搜索
- `-F` - 如果文件小于一屏则自动退出
- `-X` - 退出时不清屏

**交互式命令**:
- `空格` - 下一页
- `b` - 上一页
- `j` - 下一行
- `k` - 上一行
- `/pattern` - 向下搜索
- `?pattern` - 向上搜索
- `n` - 下一个搜索结果
- `N` - 上一个搜索结果
- `g` - 文件开头
- `G` - 文件结尾
- `q` - 退出

**示例**:
```bash
# 查看文件
less file.txt

# 显示行号
less -N file.txt

# 忽略大小写搜索
less -i file.txt

# 查看命令输出
ps aux | less
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `more` - 简单分页查看

**功能**: 分页显示文件内容（功能比 less 简单）

```bash
more [OPTION]... [FILE]...
```

**交互式命令**:
- `空格` - 下一页
- `回车` - 下一行
- `q` - 退出
- `/pattern` - 搜索

**示例**:
```bash
# 查看文件
more file.txt

# 查看多个文件
more file1.txt file2.txt
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `head` - 显示文件开头

**功能**: 显示文件的开头部分

```bash
head [OPTION]... [FILE]...
```

**常用选项**:
- `-n NUM` - 显示前 NUM 行（默认 10 行）
- `-c NUM` - 显示前 NUM 字节
- `-q` - 多文件时不显示文件名
- `-v` - 总是显示文件名

**示例**:
```bash
# 显示前10行（默认）
head file.txt

# 显示前20行
head -n 20 file.txt
# 或者
head -20 file.txt

# 显示前100字节
head -c 100 file.txt

# 显示多个文件的开头
head file1.txt file2.txt

# 实时监控文件（结合其他命令）
tail -f /var/log/syslog | head -20
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `tail` - 显示文件结尾

**功能**: 显示文件的结尾部分

```bash
tail [OPTION]... [FILE]...
```

**常用选项**:
- `-n NUM` - 显示后 NUM 行（默认 10 行）
- `-c NUM` - 显示后 NUM 字节
- `-f` - 实时跟踪文件变化
- `-F` - 跟踪文件变化，即使文件被重命名
- `-q` - 多文件时不显示文件名
- `-v` - 总是显示文件名
- `--pid=PID` - 在进程 PID 结束后停止跟踪

**示例**:
```bash
# 显示最后10行（默认）
tail file.txt

# 显示最后20行
tail -n 20 file.txt
# 或者
tail -20 file.txt

# 实时跟踪日志文件
tail -f /var/log/syslog

# 从第5行开始显示到结尾
tail -n +5 file.txt

# 跟踪多个文件
tail -f /var/log/syslog /var/log/auth.log
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 文本搜索

### `grep` - 文本模式搜索

**功能**: 在文件中搜索匹配指定模式的行

```bash
grep [OPTION]... PATTERN [FILE]...
```

**常用选项**:
- `-i` - 忽略大小写
- `-v` - 反向匹配（显示不匹配的行）
- `-n` - 显示行号
- `-c` - 只显示匹配行数
- `-l` - 只显示包含匹配的文件名
- `-r, -R` - 递归搜索目录
- `-w` - 匹配完整单词
- `-x` - 匹配整行
- `-A NUM` - 显示匹配行后 NUM 行
- `-B NUM` - 显示匹配行前 NUM 行
- `-C NUM` - 显示匹配行前后 NUM 行
- `--color=auto` - 高亮显示匹配内容

**示例**:
```bash
# 基本搜索
grep "pattern" file.txt

# 忽略大小写搜索
grep -i "Pattern" file.txt

# 显示行号
grep -n "error" /var/log/syslog

# 递归搜索目录
grep -r "TODO" /project/src/

# 只显示文件名
grep -l "config" *.txt

# 反向匹配
grep -v "comment" file.txt

# 匹配完整单词
grep -w "test" file.txt

# 显示匹配行及上下文
grep -C 3 "error" log.txt

# 统计匹配行数
grep -c "warning" log.txt

# 多模式搜索
grep -E "error|warning|critical" log.txt
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `egrep` - 扩展正则表达式搜索

**功能**: 使用扩展正则表达式搜索（等同于 `grep -E`）

```bash
egrep [OPTION]... PATTERN [FILE]...
```

**示例**:
```bash
# 使用扩展正则表达式
egrep "error|warning" log.txt

# 搜索数字模式
egrep "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" file.txt

# 搜索邮箱格式
egrep "[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}" contacts.txt
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 文本编辑

### `sed` - 流编辑器

**功能**: 对文本进行过滤和转换

```bash
sed [OPTION]... 'SCRIPT' [INPUT-FILE]...
```

**常用选项**:
- `-e` - 添加脚本
- `-f` - 从文件读取脚本
- `-i` - 直接修改文件
- `-n` - 安静模式，只输出处理的行
- `-r` - 使用扩展正则表达式

**常用命令**:
- `s/pattern/replacement/` - 替换
- `d` - 删除行
- `p` - 打印行
- `a\text` - 追加文本
- `i\text` - 插入文本

**示例**:
```bash
# 替换文本（只替换第一个匹配）
sed 's/old/new/' file.txt

# 全局替换
sed 's/old/new/g' file.txt

# 直接修改文件
sed -i 's/old/new/g' file.txt

# 删除空行
sed '/^$/d' file.txt

# 删除包含特定模式的行
sed '/pattern/d' file.txt

# 只打印特定行
sed -n '5,10p' file.txt

# 在特定行后插入文本
sed '3a\This is new line' file.txt

# 多个操作
sed -e 's/old/new/g' -e '/^$/d' file.txt
```

**权限**: 🟢 普通用户 | **危险级别**: 🟡 注意

---

### `awk` - 文本处理工具

**功能**: 强大的文本分析和处理工具

```bash
awk [OPTION]... 'PROGRAM' [FILE]...
```

**常用内置变量**:
- `NR` - 当前行号
- `NF` - 当前行字段数
- `FS` - 字段分隔符（默认空格）
- `$0` - 整行内容
- `$1, $2...` - 第1个、第2个字段

**示例**:
```bash
# 打印特定列
awk '{print $1, $3}' file.txt

# 打印行号和内容
awk '{print NR, $0}' file.txt

# 使用自定义分隔符
awk -F: '{print $1}' /etc/passwd

# 条件处理
awk '$1 > 100 {print $0}' numbers.txt

# 统计文件行数、字段数
awk 'END {print NR, "lines"}' file.txt

# 计算数值列的总和
awk '{sum += $1} END {print sum}' numbers.txt

# 模式匹配
awk '/pattern/ {print $0}' file.txt

# 格式化输出
awk '{printf "%-10s %s\n", $1, $2}' file.txt
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 文本统计

### `wc` - 字符统计

**功能**: 统计文件的行数、字数、字符数

```bash
wc [OPTION]... [FILE]...
```

**常用选项**:
- `-l` - 只显示行数
- `-w` - 只显示字数
- `-c` - 只显示字节数
- `-m` - 只显示字符数
- `-L` - 显示最长行的长度

**示例**:
```bash
# 显示所有统计信息
wc file.txt
# 输出：行数 字数 字符数 文件名

# 只显示行数
wc -l file.txt

# 统计多个文件
wc *.txt

# 统计目录下所有文件
find . -name "*.txt" | xargs wc -l

# 统计命令输出
ps aux | wc -l
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `sort` - 排序文本

**功能**: 对文本行进行排序

```bash
sort [OPTION]... [FILE]...
```

**常用选项**:
- `-n` - 数值排序
- `-r` - 反向排序
- `-k` - 指定排序字段
- `-t` - 指定字段分隔符
- `-u` - 去除重复行
- `-f` - 忽略大小写
- `-b` - 忽略前导空格

**示例**:
```bash
# 基本排序
sort file.txt

# 数值排序
sort -n numbers.txt

# 反向排序
sort -r file.txt

# 按第2列排序
sort -k2 file.txt

# 使用冒号作分隔符，按第3列数值排序
sort -t: -k3 -n /etc/passwd

# 去除重复行
sort -u file.txt

# 组合使用
sort -t: -k3 -n /etc/passwd | head -10
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `uniq` - 处理重复行

**功能**: 报告或省略重复行

```bash
uniq [OPTION]... [INPUT [OUTPUT]]
```

**常用选项**:
- `-c` - 显示每行出现的次数
- `-d` - 只显示重复的行
- `-u` - 只显示不重复的行
- `-i` - 忽略大小写
- `-f N` - 忽略前 N 个字段

**示例**:
```bash
# 去除连续的重复行（需要先排序）
sort file.txt | uniq

# 显示每行出现次数
sort file.txt | uniq -c

# 只显示重复的行
sort file.txt | uniq -d

# 只显示唯一的行
sort file.txt | uniq -u

# 统计最常出现的行
sort file.txt | uniq -c | sort -rn
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 文本转换

### `tr` - 字符转换

**功能**: 转换或删除字符

```bash
tr [OPTION]... SET1 [SET2]
```

**常用选项**:
- `-d` - 删除指定字符
- `-s` - 压缩重复字符
- `-c` - 使用 SET1 的补集

**示例**:
```bash
# 转换大小写
echo "Hello World" | tr 'a-z' 'A-Z'

# 转换为小写
echo "Hello World" | tr 'A-Z' 'a-z'

# 删除指定字符
echo "Hello, World!" | tr -d ','

# 删除数字
echo "abc123def456" | tr -d '0-9'

# 压缩空格
echo "a    b    c" | tr -s ' '

# 替换字符
tr '\n' ' ' < file.txt  # 将换行符替换为空格
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

### `cut` - 提取列

**功能**: 从每行中提取指定部分

```bash
cut [OPTION]... [FILE]...
```

**常用选项**:
- `-f` - 选择字段
- `-d` - 指定分隔符
- `-c` - 选择字符位置
- `-b` - 选择字节位置
- `--complement` - 选择除指定外的部分

**示例**:
```bash
# 提取第1和第3个字段（默认 Tab 分隔）
cut -f1,3 file.txt

# 使用冒号作分隔符
cut -d: -f1 /etc/passwd

# 提取字符位置 1-10
cut -c1-10 file.txt

# 提取用户名（/etc/passwd 第1字段）
cut -d: -f1 /etc/passwd

# 提取多个字段
cut -d: -f1,5 /etc/passwd

# 提取从第3个字段开始的所有字段
cut -d: -f3- /etc/passwd
```

**权限**: 🟢 普通用户 | **危险级别**: ⚪ 安全

---

## 实用技巧

### 1. 管道组合

```bash
# 查找文件中最常出现的单词
cat file.txt | tr ' ' '\n' | sort | uniq -c | sort -rn | head -10

# 统计日志中的IP访问次数
grep "访问" access.log | awk '{print $1}' | sort | uniq -c | sort -rn

# 查找大文件
find . -type f -exec wc -c {} \; | sort -rn | head -10
```

### 2. 正则表达式常用模式

```bash
# 匹配IP地址
grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" file.txt

# 匹配邮箱
grep -E "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" file.txt

# 匹配电话号码
grep -E "1[3-9][0-9]{9}" file.txt
```

### 3. 文件编码转换

```bash
# 查看文件编码
file -i file.txt

# 转换编码（需要 iconv）
iconv -f GB2312 -t UTF-8 input.txt > output.txt
```

---

## 性能优化

### 大文件处理

```bash
# 处理大文件时使用流处理
# 避免
cat large_file.txt | grep pattern

# 推荐
grep pattern large_file.txt

# 对于非常大的文件，使用 split 分割处理
split -l 10000 large_file.txt part_
```

### 内存使用优化

```bash
# 使用 less 而不是 cat 查看大文件
less large_file.txt

# 使用 head/tail 查看部分内容
head -100 large_file.txt
tail -100 large_file.txt
```

---

## 常见错误

### 字符编码问题
```bash
# 问题：显示乱码
# 解决：检查文件编码
file -i file.txt
# 或使用合适的 locale
LC_ALL=C grep pattern file.txt
```

### 管道处理中断
```bash
# 问题：管道中的命令被中断
# 解决：使用 timeout 控制时间
timeout 30s grep pattern large_file.txt | head -100
```

---

## 最佳实践

1. **合理使用管道** - 避免不必要的中间文件
2. **选择合适的工具** - less vs cat, grep vs awk
3. **注意文件编码** - 处理中文等非ASCII字符
4. **备份重要文件** - 使用 -i 选项前先备份
5. **性能考虑** - 大文件使用流处理工具

---

*参考文档*:
- [GNU Coreutils - Text utilities](https://www.gnu.org/software/coreutils/manual/html_node/Text-utilities.html)
- [Regular Expressions Info](https://www.regular-expressions.info/)
- [Advanced Bash-Scripting Guide - Text Processing](https://tldp.org/LDP/abs/html/textproc.html)
