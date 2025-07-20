# Vim 作用域 (Text Object Scopes)

> *基于 Vim 官方文档 motion.txt 和 change.txt，完整介绍 Vim 中的文本对象作用域系统*

---

## 📚 目录

1. [🎯 核心概念](#-核心概念)
2. [🔍 Inner 作用域](#-inner-作用域)
3. [🌐 Around 作用域](#-around-作用域)
4. [🔄 Surround 操作](#-surround-操作)
5. [📋 实用示例](#-实用示例)
6. [⚡ 最佳实践](#-最佳实践)

---

## 🎯 核心概念

### 什么是作用域 (Scope)

作用域定义了操作符对文本对象的操作范围，是 Vim 文本对象系统的核心组件。

**基本语法结构：**
```
{operator}{scope}{text-object}
```

**核心作用域类型：**
- `i` (inner) - 内部作用域：不包括边界
- `a` (around) - 周围作用域：包括边界

### 与操作符的关系

作用域将操作符的作用精确定位到文本的特定部分：

| 操作符 | 说明 | 示例 |
|--------|------|------|
| `d` | 删除 | `diw` 删除单词内部 |
| `c` | 修改 | `ciw` 修改单词内部 |
| `y` | 复制 | `yiw` 复制单词内部 |
| `v` | 选择 | `viw` 选择单词内部 |
| `gU` | 转大写 | `gUiw` 单词转大写 |
| `gu` | 转小写 | `guiw` 单词转小写 |

---

## 🔍 Inner 作用域

### 定义与特点

**Inner (`i`) 作用域**：
- 操作范围**不包括边界**字符（括号、引号、标签等）
- 适用于精确的内容操作
- 保持边界结构完整

### 常用文本对象

#### 单词和标识符
```vim
iw    # 单词内部 (inner word)
iW    # 大单词内部 (inner WORD)
```

**示例：**
```
文本: "hello world"  (光标在 hello 上)
diw  → " world"      # 删除单词，保留空格
ciw  → 进入插入模式   # 修改单词
```

#### 句子和段落
```vim
is    # 句子内部 (inner sentence)
ip    # 段落内部 (inner paragraph)
```

**示例：**
```
dip   # 删除段落内容，保留空行分隔符
cis   # 修改句子内容，保留句号
```

#### 括号和引号
```vim
i(    # 圆括号内部, 等同于 ib
i[    # 方括号内部
i{    # 大括号内部, 等同于 iB
i<    # 尖括号内部
i"    # 双引号内部
i'    # 单引号内部
i`    # 反引号内部
```

**示例：**
```
文本: function(arg1, arg2)
ci(  → function()        # 修改括号内容
yi"  → 复制引号内容
```

#### HTML/XML 标签
```vim
it    # 标签内部 (inner tag)
```

**示例：**
```
文本: <div>content</div>
dit  → <div></div>       # 删除标签内容
cit  → <div></div>       # 修改标签内容，进入插入模式
```

### 嵌套处理规则

当存在嵌套结构时，Inner 作用域选择最内层匹配：

```
文本: (outer (inner) text)
光标在 "inner" 上执行 ci(
结果: (outer () text)    # 只修改最内层括号
```

---

## 🌐 Around 作用域

### 定义与特点

**Around (`a`) 作用域**：
- 操作范围**包括边界**字符
- 适用于完整结构的操作
- 包含周围的空格或分隔符

### 常用文本对象

#### 单词和标识符
```vim
aw    # 整个单词 (around word)，包括后续空格
aW    # 整个大单词 (around WORD)，包括后续空格
```

**示例：**
```
文本: "hello world"  (光标在 hello 上)
daw  → "world"       # 删除单词及空格
caw  → 进入插入模式   # 修改整个单词边界
```

#### 句子和段落
```vim
as    # 整个句子 (around sentence)，包括句号和空格
ap    # 整个段落 (around paragraph)，包括空行
```

**示例：**
```
das   # 删除整个句子，包括标点和空格
yap   # 复制整个段落，包括前后空行
```

#### 括号和引号
```vim
a(    # 整个圆括号结构, 等同于 ab
a[    # 整个方括号结构
a{    # 整个大括号结构, 等同于 aB
a<    # 整个尖括号结构
a"    # 整个双引号结构
a'    # 整个单引号结构
a`    # 整个反引号结构
```

**示例：**
```
文本: function(arg1, arg2)
da(  → function          # 删除括号及内容
ca{  → { }              # 修改大括号及内容
```

#### HTML/XML 标签
```vim
at    # 整个标签结构 (around tag)
```

**示例：**
```
文本: <div>content</div>
dat  → (删除整个标签)     # 完全删除标签和内容
cat  → 进入插入模式       # 修改整个标签结构
```

### 空格处理规则

Around 作用域的空格处理遵循特定规则：

1. **单词**：包含单词后的一个空格，如果后面没有空格则包含前面的空格
2. **句子**：包含句子结束标点及后续空格
3. **段落**：包含段落前后的空行

---

## 🔄 Surround 操作

> **注意**: Surround 功能需要安装 `vim-surround` 插件，不是 Vim 原生功能

### 插件安装

使用包管理器安装 `vim-surround` 插件：
```vim
" 使用 vim-plug
Plug 'tpope/vim-surround'

" 使用 Vundle
Plugin 'tpope/vim-surround'
```

### 核心命令

#### 添加环绕 (`ys`)

**语法**: `ys{motion/text-object}{surrounding}`

```vim
ysiw"     # 为当前单词添加双引号
ysap)     # 为段落添加圆括号
yss{      # 为整行添加大括号（带空格）
```

**示例：**
```
文本: hello world
ysiw" → "hello" world    # 为单词添加引号
ysap( → (hello world)    # 为段落添加括号
```

#### 删除环绕 (`ds`)

**语法**: `ds{surrounding}`

```vim
ds"       # 删除双引号
ds)       # 删除圆括号
dst       # 删除 HTML 标签
```

**示例：**
```
文本: "hello world"
ds"  → hello world       # 删除引号

文本: <div>content</div>
dst  → content           # 删除标签
```

#### 修改环绕 (`cs`)

**语法**: `cs{old-surrounding}{new-surrounding}`

```vim
cs"'      # 双引号改为单引号
cs([      # 圆括号改为方括号
cst<p>    # 标签改为 <p> 标签
```

**示例：**
```
文本: "hello world"
cs"'  → 'hello world'    # 引号类型转换

文本: (content)
cs(]  → [content]        # 括号类型转换
```

### 可视模式操作

在可视模式下选择文本后：

```vim
S"        # 为选中文本添加双引号
S<div>    # 为选中文本添加 HTML 标签
```

### 特殊环绕字符

| 字符 | 说明 | 示例 |
|------|------|------|
| `b` | 圆括号 `()` | `dsb` |
| `B` | 大括号 `{}` | `dsB` |
| `r` | 方括号 `[]` | `dsr` |
| `a` | 尖括号 `<>` | `dsa` |
| `t` | HTML 标签 | `dst` |

### 空格规则

括号的空格处理：
- `(`, `{`, `[` - 内部不带空格：`(content)`
- `)`, `}`, `]` - 内部带空格：`( content )`

---

## 📋 实用示例

### 代码编辑场景

```vim
# JavaScript 对象操作
let obj = {key: "value", num: 42};

ci{         # 修改对象内容
da{         # 删除整个对象
ysi{"       # 为键添加引号: {"key": "value"}
```

```vim
# HTML 标签操作
<div class="container">content</div>

dit         # 删除标签内容 → <div class="container"></div>
dat         # 删除整个标签
cst<p>      # 改为 p 标签 → <p class="container">content</p>
```

### 文本处理场景

```vim
# 句子操作
"Hello world. How are you? Fine, thanks."

dis         # 删除当前句子内容
cas         # 修改当前句子
yas         # 复制当前句子
```

```vim
# 段落操作
第一段内容...

第二段内容...

dip         # 删除段落内容，保留空行
dap         # 删除整个段落，包括空行
```

### 复杂嵌套结构

```vim
# 嵌套括号
function(outer(inner(deep)))

# 光标在 "deep" 上
ci(         # 修改最内层: function(outer(inner()))
# 光标在 "inner" 上  
ci(         # 修改中层: function(outer())
# 光标在 "outer" 上
ci(         # 修改外层: function()
```

---

## ⚡ 最佳实践

### 学习路径

1. **基础掌握**: 先熟练 `iw`, `aw`, `ip`, `ap`
2. **括号引号**: 练习 `i(`, `a(`, `i"`, `a"` 等
3. **插件增强**: 安装并学习 `vim-surround`
4. **实战应用**: 在日常编辑中有意识使用

### 效率技巧

#### 快速选择技巧
```vim
# 选择函数参数
f(          # 跳转到左括号
vi(         # 选择括号内内容

# 选择引号内容
f"          # 跳转到引号
vi"         # 选择引号内内容
```

#### 组合操作技巧
```vim
# 复制并粘贴到括号内
yiw         # 复制单词
ci(         # 修改括号内容，自动粘贴
```

#### 重复操作技巧
```vim
# 使用 . 命令重复surround操作
ysiw"       # 第一个单词加引号
w           # 移动到下一个单词
.           # 重复操作
```

### 常见错误避免

1. **边界混淆**: 记住 `i` 不包含边界，`a` 包含边界
2. **嵌套理解**: 在嵌套结构中，操作的是最近的匹配层
3. **光标位置**: 某些操作对光标位置敏感，需要精确定位

### 配置建议

```vim
" 显示匹配括号
set showmatch

" 匹配时间 (十分之一秒)
set matchtime=2

" 高亮搜索，便于定位
set hlsearch
set incsearch

" 相对行号，便于计数操作
set relativenumber
```

### 调试技巧

当操作不符合预期时：
1. 检查光标位置是否正确
2. 确认文本对象边界
3. 使用可视模式预览选择范围
4. 查看 `:help text-objects` 获取详细信息

---

掌握 Vim 的作用域系统是高效编辑的关键。通过理解 Inner 和 Around 的区别，合理使用各种文本对象，您将获得强大的文本操作能力！
