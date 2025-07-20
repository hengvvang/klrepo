# Vim Commands 命令行模式

> Vim命令行模式提供了强大的文本编辑和文件管理能力。本章从基础概念到实战应用，全面介绍命令行模式的使用方法。

## 概述

### 什么是命令行模式

命令行模式（Command-line Mode）是Vim的四大模式之一，通过输入以`:`开头的命令来执行各种操作：

- **进入方式**：在Normal模式下按`:`键
- **执行方式**：输入命令后按`Enter`执行
- **退出方式**：执行完毕自动返回Normal模式，或按`Esc`取消

### 核心特性

| 特性 | 说明 | 示例 |
|------|------|------|
| **自动补全** | 按`Tab`键补全命令和文件路径 | `:e <Tab>` |
| **命令历史** | 使用`↑`/`↓`键浏览历史命令 | `:` + `↑` |
| **范围操作** | 指定行范围执行命令 | `1,5d` |
| **正则表达式** | 支持强大的模式匹配 | `:%s/\v\d+/NUM/g` |

---

## 文件操作

### 基础文件操作

#### 保存和退出

```vim
:w              " 保存当前文件
:w filename     " 另存为指定文件
:w!             " 强制保存（覆盖只读）
:wa             " 保存所有已修改的文件

:q              " 退出（有未保存内容会提示）
:q!             " 强制退出，不保存修改
:wq             " 保存并退出
:x              " 智能保存并退出（仅在有修改时保存）
:qa             " 退出所有窗口
:qa!            " 强制退出所有窗口
```

#### 文件打开和创建

```vim
:e filename     " 编辑文件（如果不存在则创建）
:e!             " 重新加载当前文件，丢弃未保存修改
:e              " 重新加载当前文件
:enew           " 创建新的空白文件

:tabnew file    " 在新标签页中打开文件
:vs file        " 垂直分屏打开文件
:sp file        " 水平分屏打开文件
```

### 缓冲区管理

#### 缓冲区操作

```vim
:ls             " 列出所有缓冲区
:buffers        " 同:ls，列出缓冲区
:b N            " 切换到编号N的缓冲区
:b filename     " 切换到指定文件名的缓冲区
:bn             " 切换到下一个缓冲区
:bp             " 切换到上一个缓冲区
:bf             " 切换到第一个缓冲区
:bl             " 切换到最后一个缓冲区

:bd             " 删除当前缓冲区
:bd N           " 删除编号N的缓冲区
:bd filename    " 删除指定文件的缓冲区
:bw             " 彻底删除缓冲区（包括历史记录）
```

#### 缓冲区状态标识

| 标识 | 含义 |
|------|------|
| `%` | 当前缓冲区 |
| `#` | 轮换缓冲区（上一个） |
| `a` | 活动缓冲区（加载且显示） |
| `h` | 隐藏缓冲区（加载但未显示） |
| `+` | 已修改缓冲区 |
| `-` | 不可修改缓冲区 |

### 实战案例

```vim
" 快速文件切换工作流
:e config.txt           " 打开配置文件
:w                       " 保存
:e main.py              " 切换到主程序
:ls                     " 查看所有打开的文件
:b config.txt           " 快速切换回配置文件
:bd main.py             " 关闭不需要的文件
```

---

## 搜索与替换

### 基础搜索替换

#### substitute命令语法

```vim
:[range]s/pattern/replacement/[flags]
```

#### 常用替换操作

```vim
:s/old/new/             " 替换当前行第一个匹配
:s/old/new/g            " 替换当前行所有匹配
:%s/old/new/g           " 替换整个文件所有匹配
:%s/old/new/gc          " 替换整个文件所有匹配（逐个确认）
:%s/old/new/gi          " 替换，忽略大小写
:%s/old/new/gI          " 替换，严格大小写匹配
```

#### 范围指定

| 范围语法 | 说明 | 示例 |
|----------|------|------|
| `N,M` | 第N行到第M行 | `1,10s/old/new/g` |
| `%` | 整个文件 | `:%s/old/new/g` |
| `.` | 当前行 | `.,+5s/old/new/g` |
| `$` | 最后一行 | `1,$s/old/new/g` |
| `'<,'>` | 可视模式选中区域 | `:'<,'>s/old/new/g` |

### 高级搜索替换

#### 正则表达式应用

```vim
" 基础正则表达式
:%s/\d\+/NUMBER/g       " 替换所有数字为NUMBER
:%s/\w\+@\w\+\.\w\+/EMAIL/g " 简单邮箱匹配

" Very Magic模式（推荐）
:%s/\v\d+/NUMBER/g      " 更简洁的数字匹配
:%s/\v(\w+)-(\w+)/\2-\1/g " 交换用连字符连接的单词

" 高级应用
:%s/\v^(\s*)(.*)/\1> \2/g   " 在每行前添加引用符号
:%s/\v([A-Z])/\l\1/g        " 将大写字母转为小写
```

#### 确认模式选项

在使用`c`标志时的交互选项：

| 按键 | 操作 |
|------|------|
| `y` | 替换当前匹配 |
| `n` | 跳过当前匹配 |
| `a` | 替换所有剩余匹配 |
| `q` | 退出替换 |
| `l` | 替换当前匹配后退出 |
| `Ctrl+E` | 向上滚动 |
| `Ctrl+Y` | 向下滚动 |

### 全局命令

#### :g和:v命令

```vim
:g/pattern/command      " 在匹配pattern的行上执行command
:v/pattern/command      " 在不匹配pattern的行上执行command
:g!/pattern/command     " 同:v
```

#### 实用全局操作

```vim
:g/TODO/d               " 删除包含TODO的行
:v/error/d              " 删除不包含error的行
:g/^$/d                 " 删除空行
:g/pattern/t$           " 复制匹配行到文件末尾
:g/pattern/m0           " 移动匹配行到文件开头

" 复合操作
:g/function/normal A;   " 在包含function的行末尾添加分号
:g/class/+1d            " 删除包含class的行的下一行
```

### 搜索替换实战

```vim
" 代码重构示例
:%s/\voldFunction/newFunction/g          " 重命名函数
:%s/\v(public|private)\s+/&static /g     " 为所有访问修饰符添加static
:g/console\.log/d                        " 删除所有调试语句

" 文本格式化
:%s/\v\s+$//g                           " 删除行尾空格
:%s/\v\n\n+/\r\r/g                      " 将多个空行替换为两个空行
:%s/\v([.!?])\s+/\1  /g                 " 句子后添加双空格
```

---

## 窗口与分屏管理

### 窗口创建与切换

#### 基础分屏操作

```vim
:sp [file]              " 水平分屏（可选择打开文件）
:vsp [file]             " 垂直分屏（可选择打开文件）
:new                    " 水平分屏创建新文件
:vnew                   " 垂直分屏创建新文件

Ctrl-w s               " 水平分屏当前窗口
Ctrl-w v               " 垂直分屏当前窗口
```

#### 窗口导航

```vim
Ctrl-w h               " 移动到左边窗口
Ctrl-w j               " 移动到下面窗口
Ctrl-w k               " 移动到上面窗口
Ctrl-w l               " 移动到右边窗口
Ctrl-w w               " 循环切换窗口
Ctrl-w t               " 移动到顶部窗口
Ctrl-w b               " 移动到底部窗口
```

### 窗口布局管理

#### 窗口大小调整

```vim
Ctrl-w =               " 使所有窗口等大
Ctrl-w +               " 增加窗口高度
Ctrl-w -               " 减少窗口高度
Ctrl-w >               " 增加窗口宽度
Ctrl-w <               " 减少窗口宽度

:resize 20             " 设置当前窗口高度为20行
:vertical resize 80    " 设置当前窗口宽度为80列
```

#### 窗口移动与关闭

```vim
Ctrl-w H               " 将当前窗口移到最左侧
Ctrl-w J               " 将当前窗口移到最底部
Ctrl-w K               " 将当前窗口移到最顶部
Ctrl-w L               " 将当前窗口移到最右侧

Ctrl-w c               " 关闭当前窗口
Ctrl-w o               " 关闭除当前窗口外的所有窗口
Ctrl-w q               " 退出当前窗口（:q的快捷键）
```

### 标签页管理

```vim
:tabnew [file]         " 创建新标签页
:tabc                  " 关闭当前标签页
:tabo                  " 关闭除当前标签页外的所有标签页
:tabn                  " 切换到下一个标签页
:tabp                  " 切换到上一个标签页
:tabfirst              " 切换到第一个标签页
:tablast               " 切换到最后一个标签页

gt                     " 下一个标签页（Normal模式）
gT                     " 上一个标签页（Normal模式）
```

---

## 设置与配置

### 基础设置命令

#### 显示设置

```vim
:set number            " 显示行号
:set nonumber          " 隐藏行号
:set nu                " :set number的简写
:set nonu              " :set nonumber的简写

:set relativenumber    " 显示相对行号
:set norelativenumber  " 隐藏相对行号
:set rnu               " :set relativenumber的简写
:set nornu             " :set norelativenumber的简写

:set cursorline        " 高亮当前行
:set nocursorline      " 取消高亮当前行
:set cursorcolumn      " 高亮当前列
:set nocursorcolumn    " 取消高亮当前列
```

#### 搜索设置

```vim
:set hlsearch          " 高亮搜索结果
:set nohlsearch        " 不高亮搜索结果
:set incsearch         " 增量搜索（边输入边搜索）
:set noincsearch       " 关闭增量搜索

:set ignorecase        " 搜索时忽略大小写
:set noignorecase      " 搜索时区分大小写
:set smartcase         " 智能大小写（小写忽略，包含大写则区分）

:noh                   " 临时取消搜索高亮
:nohlsearch            " 同:noh
```

#### 缩进与制表符

```vim
:set tabstop=4         " Tab显示宽度为4个空格
:set softtabstop=4     " Tab键输入时的宽度
:set shiftwidth=4      " 自动缩进宽度
:set expandtab         " 将Tab转换为空格
:set noexpandtab       " 保持Tab字符

:set autoindent        " 自动缩进
:set smartindent       " 智能缩进
:set cindent           " C语言风格缩进
```

### 高级配置

#### 文件类型与语法

```vim
:filetype on           " 启用文件类型检测
:filetype plugin on    " 启用文件类型插件
:filetype indent on    " 启用文件类型缩进

:syntax on             " 启用语法高亮
:syntax off            " 禁用语法高亮

:set filetype=python   " 手动设置文件类型
:set syntax=javascript " 手动设置语法高亮
```

#### 编辑行为

```vim
:set wrap              " 启用自动换行显示
:set nowrap            " 禁用自动换行显示
:set linebreak         " 在单词边界换行
:set nolinebreak       " 不在单词边界换行

:set showmatch         " 高亮匹配的括号
:set noshowmatch       " 不高亮匹配的括号
:set matchtime=3       " 括号匹配高亮持续时间（十分之一秒）

:set scrolloff=5       " 垂直滚动时保持5行边距
:set sidescrolloff=5   " 水平滚动时保持5列边距
```

### 配置查询与管理

```vim
:set                   " 显示所有已修改的选项
:set all               " 显示所有选项
:set option?           " 查询特定选项的值
:set option&           " 将选项重置为默认值

:verbose set option?   " 显示选项值及最后设置的位置
:setlocal option       " 仅对当前缓冲区设置选项
:setglobal option      " 设置全局选项值
```

---

## 命令行技巧与最佳实践

### 命令行编辑技巧

#### 命令行导航

```vim
Ctrl-B                 " 光标移到行首
Ctrl-E                 " 光标移到行尾
Ctrl-A                 " 同Ctrl-B
Ctrl-F                 " 光标右移一个字符
Ctrl-H                 " 删除前一个字符
Ctrl-W                 " 删除前一个单词
Ctrl-U                 " 删除到行首
```

#### 命令历史与补全

```vim
↑ / Ctrl-P             " 上一个历史命令
↓ / Ctrl-N             " 下一个历史命令
Tab                    " 补全命令或文件名
Ctrl-D                 " 列出所有可能的补全

:history               " 显示命令历史
:history : 10          " 显示最近10个命令
q:                     " 打开命令行历史窗口（可编辑）
```

### 实用命令组合

#### 管道与过滤

```vim
:w !sudo tee %         " 以sudo权限保存文件
:r !date               " 插入当前日期
:r !ls                 " 插入当前目录列表
:%!sort                " 对整个文件排序
:%!sort -u             " 对整个文件排序并去重
:5,10!sort             " 对第5-10行排序
```

#### 外部命令集成

```vim
:!ls                   " 执行外部命令ls
:!!                    " 重复上一个外部命令
:shell                 " 启动shell
:sh                    " 同:shell的简写

:read !command         " 读取外部命令输出到当前位置
:write !command        " 将内容作为输入传递给外部命令
```

### 键盘映射管理

```vim
:map                   " 显示所有映射
:map <key>             " 显示特定键的映射
:unmap <key>           " 取消映射

:nnoremap              " 显示Normal模式映射
:inoremap              " 显示Insert模式映射
:vnoremap              " 显示Visual模式映射
:cnoremap              " 显示命令行模式映射
```

---

## 常见问题与解决方案

### 文件操作问题

#### 权限问题

```vim
" 问题：无法保存只读文件
:w !sudo tee %         " 解决方案：使用sudo权限保存

" 问题：文件被其他程序占用
:w! filename           " 强制写入新文件
:saveas filename       " 另存为新文件
```

#### 编码问题

```vim
:set encoding=utf-8    " 设置内部编码
:set fileencoding=utf-8 " 设置文件保存编码
:e ++enc=gbk filename  " 以特定编码打开文件
```

### 搜索替换问题

#### 特殊字符处理

```vim
" 搜索替换包含特殊字符的内容
:%s/\V[special]/replacement/g  " 使用\V开启very nomagic模式
:%s/\//\\/g                    " 替换正斜杠为反斜杠（需要转义）
```

#### 多行匹配

```vim
" 跨行搜索替换
:%s/\n/,/g             " 将换行符替换为逗号
:%s/pattern\_.*end/replacement/g  " 跨行匹配pattern到end
```

### 性能优化

#### 大文件处理

```vim
:set lazyredraw        " 延迟重绘，提高性能
:set nofoldenable      " 禁用折叠，加快大文件处理
:syntax off            " 对超大文件禁用语法高亮
:set noundofile        " 禁用undo文件
```

#### 自动化配置

```vim
" 在.vimrc中添加自动化配置
autocmd BufReadPost * if line("'\"") > 0 && line("'\"") <= line("$")
  \| exe "normal! g'\"" | endif          " 自动跳转到上次编辑位置

autocmd BufWritePre * :%s/\s\+$//e      " 保存时自动删除行尾空格

" 根据文件类型自动设置
autocmd FileType python setlocal ts=4 sw=4 et
autocmd FileType javascript setlocal ts=2 sw=2 et
```

---

## 总结

Vim的命令行模式是其最强大的功能之一，掌握这些命令能够极大地提高编辑效率：

### 核心要点

1. **文件操作**：熟练使用保存、打开、缓冲区管理等基础操作
2. **搜索替换**：掌握正则表达式和范围操作，实现精确的文本处理
3. **窗口管理**：合理使用分屏和标签页，提高多文件编辑效率
4. **配置设置**：根据需要调整Vim行为，创建个性化的编辑环境

### 学习建议

- 从基础命令开始，逐步掌握高级功能
- 多练习正则表达式，这是文本处理的关键
- 建立自己的配置文件（.vimrc），积累常用设置
- 结合实际工作场景，形成高效的工作流程

### 进阶方向

- 学习Vim脚本，编写自定义函数
- 探索插件生态，扩展Vim功能
- 研究高级文本处理技巧
- 与其他工具集成，构建完整的开发环境
