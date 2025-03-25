# Commands 命令
Commands 在 Command-line Mode 下执行, 以 `:` 开始

## 文件操作
- **定义**：用于管理文件和缓冲区。
- **常见命令**：
  - `:w`（保存文件，write）。
  - `:w file`（另存为 file）。
  - `:q`（退出，quit）。
  - `:q!`（强制退出，不保存，quit without saving）。
  - `:wq` 或 `ZZ`（保存并退出，write and quit）。
  - `:e file`（打开文件，edit file）。
  - `:bd`（关闭当前缓冲区，buffer delete）。
  - `:ls`（列出所有缓冲区，list buffers）。
  - `:b <num>`（切换到指定缓冲区，buffer number）。
- **示例**：
  - `:w newfile.txt` 将当前内容另存为 newfile.txt。
  - `:e README.md` 打开 README.md 文件。
- **注意事项**：
  - 使用 `:w!` 强制保存只读文件（需权限）。
  - 使用 `:bd` 关闭缓冲区，释放内存。

##  搜索和替换
- **定义**：用于搜索和替换文本。
- **常见命令**：
  - `:%s/old/new/g`（全局替换 old 为 new，substitute globally）。
  - `:%s/old/new/gc`（全局替换，逐个确认，confirm）。
  - `:g/pattern/d`（删除匹配 pattern 的行，global delete）。
  - `:v/pattern/d`（删除不匹配 pattern 的行，reverse global delete）。
- **示例**：
  - `:%s/foo/bar/g` 将文件中所有 "foo" 替换为 "bar"。
  - `:%s/foo/bar/gc` 替换时逐个确认。
- **注意事项**：
  - 替换支持正则表达式，如 `:%s/\d\+/number/g` 替换数字。
  - 使用 `:g` 和 `:v` 结合其他命令进行批量操作。

## 分屏
- **定义**：用于分屏编辑多个文件。
- **常见命令**：
  - `:sp`（水平分屏，split）。
  - `:vsp`（垂直分屏，vertical split）。
  - `:sp file`（水平分屏打开文件）。
  - `:vsp file`（垂直分屏打开文件）。
  - `Ctrl-w h/j/k/l`（在分屏间移动，window navigation）。
  - `Ctrl-w c`（关闭当前窗口，close window）。
  - `Ctrl-w o`（关闭其他窗口，only current window）。
  - `Ctrl-w =`（使所有窗口等高/等宽，equal size）。
- **示例**：
  - `:vsp README.md` 垂直分屏打开 README.md。
  - 按 `Ctrl-w l` 移动到右侧窗口。
- **注意事项**：
  - 分屏适合同时编辑多个文件。
  - 使用 `Ctrl-w` 快捷键提高导航效率。

## 配置设置
- **定义**：用于配置 Vim 行为。
- **常见命令**：
  - `:set nu`（显示行号，number）。
  - `:set nonu`（隐藏行号）。
  - `:set hlsearch`（高亮搜索结果，highlight search）。
  - `:noh`（取消高亮，no highlight）。
  - `:set tabstop=4`（设置 Tab 宽度为 4）。
  - `:set shiftwidth=4`（设置缩进宽度为 4）。
  - `:set expandtab`（将 Tab 转换为空格）。
  - `:set autoindent`（启用自动缩进）。
- **示例**：
  - `:set nu` 显示行号，然后 `:set nonu` 隐藏。
  - `:set expandtab` 将 Tab 转换为空格。
- **注意事项**：
  - 配置可以写入 `~/.vimrc` 文件，永久生效。
  - 使用 `:set all` 查看所有配置选项。
  以下是对 Vim Commands（命令）功能的再次优化，基于之前的扩展内容，进一步精炼信息，增强结构清晰度，确保每个细节详实且实用。内容分为定义、命令列表、行为细节、示例、注意事项、场景应用、高级用法、性能优化、与其他编辑器对比九个部分，逻辑更严谨，适合快速参考和深入学习。

  ---

  # Commands 命令

  在 Command-line Mode 下执行，以 `:` 开始，从 Normal Mode 按 `:` 进入。
  - **定义**：命令行模式下的命令用于文件管理、文本搜索替换、分屏布局和行为配置，支持自动补全（`Tab`）、历史记录（`Up`/`Down`）和正则表达式。
  - **行为细节**：命令以 `:` 开头，按 `Enter` 执行后返回 Normal Mode，支持范围（如 `:%`、`1,5`）、正则表达式（如 `:%s/\v\d+/number/g`）和历史持久化（`~/.viminfo` 或 `~/.local/share/nvim/shada`）。
  - **注意事项**：确保语法正确，避免误操作；大文件操作注意性能，按 `Ctrl + c` 中止；命令历史和补全提高效率。
  - **场景应用**：文件操作（保存、打开）、搜索替换（批量修改）、分屏管理（多文件编辑）、配置设置（行为自定义）。

  ---

  ## 文件操作

  - **定义**：管理文件和缓冲区，包括保存、打开、关闭、切换，支持权限控制和多文件编辑。

  - **命令列表**：
    - `:w`：保存当前文件。
    - `:w file`：另存为 `file`。
    - `:w!`：强制保存（需权限）。
    - `:wa`：保存所有修改缓冲区。
    - `:q`：退出（未保存提示）。
    - `:q!`：强制退出，不保存。
    - `:wq` / `:x` / `ZZ`：保存并退出。
    - `:qa` / `:qa!`：退出所有缓冲区（强制）。
    - `:e file`：打开 `file`。
    - `:e! file`：强制打开，丢弃更改。
    - `:ene`：新建空缓冲区。
    - `:bd` / `:bd!`：关闭缓冲区（强制）。
    - `:ls`：列出缓冲区（状态：`%` 当前、`#` 上一个、`+` 修改、`-` 隐藏）。
    - `:b <num>` / `:b <name>`：切换缓冲区（编号/名称）。
    - `:bw`：擦除缓冲区及历史。
    - `:sav file`：保存并另存为 `file`。

  - **行为细节**：
    - **保存**：`:w` 更新修改时间，`:w file` 支持路径补全，`:w!` 需权限，`:wa` 仅保存修改缓冲区。
    - **退出**：`:q` 未保存提示，`:wq` / `:x` 仅修改时保存，`ZZ` 是 Normal Mode 快捷键，`:qa!` 丢弃所有未保存内容。
    - **打开**：`:e file` 替换缓冲区，`:e! file` 丢弃更改，`:ene` 创建匿名缓冲区。
    - **缓冲区**：`:ls` 显示状态，`:b <num>` / `:b <name>` 切换（`Tab` 补全），`:bd` 后编号重排，`:bw` 彻底删除。
    - **错误**：权限不足提示 "Permission denied"，文件不存在时 `:e file` 创建新文件，`:sav file` 覆盖需确认。

  - **示例**：
    - `:w newfile.txt` 另存为 `newfile.txt`。
    - `:e README.md` 打开 `README.md`。
    - `:w!` 强制保存只读文件（需权限）。
    - `:ls` 列出缓冲区，`:b 2` 切换到编号 2。
    - `:bd 3` 删除编号 3 缓冲区。
    - `:sav backup.txt` 保存并另存为 `backup.txt`。

  - **注意事项**：
    - 权限：`:w!` 需权限，失败提示错误。
    - 缓冲区：`:bd` 后注意编号变化，`:b <num>` 可能失效。
    - 未保存：`:q!` / `:bd!` 丢弃内容，先确认 `:ls`。
    - 大文件：`:w` / `:e` 耗时，考虑分块编辑。
    - 路径：`:e file` / `:w file` 用 `Tab` 补全，确保路径正确。
    - 只读：`:w` 失败用 `:w!` 或 `:w !sudo tee % > /dev/null`。
    - 自动保存：`.vimrc` 设置 `autocmd BufWritePre * :%s/\s\+$//e` 删除行尾空格。

  - **场景应用**：
    - 代码：`:w` 保存，`:e file` 打开头文件。
    - 文档：`:w file` 备份，`:bd` 关闭无用文档。
    - 调试：`:ls` 查看缓冲区，`:b <num>` 切换错误文件。
    - 系统：`:w!` 保存配置文件，`:e /etc/hosts` 编辑主机文件。

  - **高级用法**：
    - 寄存器：`:w !tee > /dev/null | pbcopy` 复制到剪贴板，`:w "a` 写入寄存器 `a`。
    - 分屏：`:sp | e file` 水平分屏，`:vsp | b 2` 垂直切换缓冲区。
    - 全局：`:g/pattern/w file` 提取匹配行，`:v/pattern/w file` 提取不匹配行。
    - 宏：录制 `qa:w<CR>q` 批量保存，`qa:bd<CR>q` 清理缓冲区。
    - 自动命令：`.vimrc` 设置 `autocmd BufWritePost *.py !python3 %` 自动执行 Python 文件。
    - 映射：`.vimrc` 定义 `nnoremap <leader>w :w<CR>`，`nnoremap <C-q> :q!<CR>`。

  - **性能优化**：
    - 大文件：`:set lazyredraw` 延迟重绘，`autocmd BufReadPost * if line('$') > 1000 | set lazyredraw | endif`。
    - 高亮：`:set nocursorline`，`autocmd BufReadPost * if line('$') > 1000 | set nocursorline | endif`。
    - 缓冲区：`:bw` 擦除无用缓冲区，`autocmd BufDelete * if len(getbufinfo({'buflisted':1})) > 10 | bw # | endif`。

  - **与其他编辑器对比**：
    - Emacs：`:w` / `:q` 比 `C-x C-s` / `C-x C-c` 简洁，`:ls` / `:b <num>` 比 `C-x b` 直观。
    - VS Code：文件操作依赖菜单或 `Ctrl + s`，不如 `:w` / `:e` 高效，缓冲区管理不如 `:ls` / `:b <num>` 强大。
    - Sublime Text：文件操作依赖菜单或 `Ctrl + s`，不如 `:w` / `:e` 无鼠标，缓冲区管理不如 `:ls` / `:b <num>` 灵活。

  ---

  ## 搜索和替换

  - **定义**：查找和修改文本，支持正则表达式、范围指定、确认模式，适合批量编辑和内容处理。

  - **命令列表**：
    - `:%s/old/new/g`：全局替换 `old` 为 `new`。
    - `:%s/old/new/gc`：全局替换，逐个确认（`y/n/a/q/l/^E/^Y`）。
    - `:s/old/new/`：替换当前行第一个 `old`。
    - `:s/old/new/g`：替换当前行所有 `old`。
    - `:%s/old/new/gi`：全局替换，忽略大小写。
    - `:%s/old/new/gI`：全局替换，强制大小写敏感。
    - `:g/pattern/d`：删除匹配 `pattern` 的行。
    - `:v/pattern/d`：删除不匹配 `pattern` 的行。
    - `:g/pattern/y A`：复制匹配行到寄存器 `A`。
    - `:v/pattern/y A`：复制不匹配行到寄存器 `A`。
    - `:%s///g`：使用最近搜索模式替换。
    - `:%s/\v\d+/number/g`：正则替换数字为 `number`。

  - **行为细节**：
    - **范围**：`:%s` 整个文件，`1,5s` 第 1-5 行，`'<,'>s` 可视模式，`.,+5s` 当前到下 5 行，`.,$s` 到文件末尾。
    - **选项**：`g` 替换所有，`c` 确认（`y` 替换、`n` 跳过、`a` 全替换、`q` 退出、`l` 最后、`^E` 上滚、`^Y` 下滚），`i` 忽略大小写，`I` 强制敏感。
    - **正则**：支持 `\d`（数字）、`\w`（单词）、`\<` / `\>`（单词边界），`\v` 简化语法，捕获组如 `:%s/\v(\d+)-(\d+)/\2-\1/g`。
    - **全局**：`:g/pattern/cmd` 执行 `cmd` 于匹配行，`:v/pattern/cmd` 执行于不匹配行，支持嵌套（如 `:g/pattern/normal A;`）。
    - **错误**：无效模式提示 "Pattern not found"，空目标（如 `:%s/foo//g`）删除匹配，注意误操作。

  - **示例**：
    - `:%s/foo/bar/g` 全局替换 `foo` 为 `bar`。
    - `:%s/foo/bar/gc` 替换并确认。
    - `:s/\v\d+/number/` 当前行替换数字。
    - `:g/^TODO/d` 删除 `TODO` 开头行。
    - `:v/error/y A` 复制不含 `error` 的行到寄存器 `A`。
    - `:%s/\v(\w+)-(\w+)/\2-\1/gi` 交换连字符单词，忽略大小写。

  - **注意事项**：
    - 正则：复杂模式影响性能，用 `\v` 简化。
    - 大小写：默认由 `:set ignorecase` / `:set smartcase` 控制，`i` / `I` 优先。
    - 确认：`:s/.../.../gc` 注意 `a` / `q`，避免意外或中断。
    - 大文件：`:g` / `:v` 耗时，用 `:vimgrep` 或 `fzf.vim` 优化。
    - 撤销：替换记录在撤销历史，`u` 撤销，`Ctrl + r` 重做。
    - 搜索历史：`:%s///g` 依赖最近 `/` / `?`，确认模式正确。

  - **场景应用**：
    - 代码：`:%s/\vfunc_/function_/g` 替换函数名前缀。
    - 文档：`:g/typo/d` 删除拼写错误行。
    - 数据：`:%s/\v\d{4}-\d{2}-\d{2}/DATE/g` 标准化日期。
    - 日志：`:v/error/y A` 提取不含 `error` 的行。

  - **高级用法**：
    - 寄存器：`:g/pattern/y A` 复制到 `A`，`"ap` 粘贴。
    - 可视模式：`:'<,'>s/foo/bar/g` 替换选中范围。
    - 全局：`:g/pattern/normal A;` 匹配行尾加分号，`:v/bar/normal I# ` 不匹配行首加注释。
    - 宏：录制 `qa:%s/foo/bar/g<CR>q` 批量替换，`qa:g/error/d<CR>q` 清理日志。
    - 正则：`:%s/\v<word>/newword/g` 替换完整单词。
    - 映射：`.vimrc` 定义 `nnoremap <leader>r :%s/foo/bar/g<CR>`，`nnoremap <leader>rc :%s/\v\d+/number/gc<CR>`。

  - **性能优化**：
    - 大文件：`:set lazyredraw`，`autocmd BufReadPost * if line('$') > 1000 | set lazyredraw | endif`。
    - 正则：用 `\v` 简化，`:%s/\v\d+/number/g` 比 `:%s/\d\+/number/g` 高效。
    - 高亮：`:set nohlsearch`，`autocmd BufReadPost * if line('$') > 1000 | set nohlsearch | endif`。

  - **与其他编辑器对比**：
    - Emacs：`:%s/.../.../g` 比 `M-x replace-regexp` 简洁，支持确认（`gc`），`:g` / `:v` 比 `M-x delete-matching-lines` 强大。
    - VS Code：搜索替换依赖 `Ctrl + h`，不如 `:%s` / `:g` 高效，不支持 `:v`。
    - Sublime Text：搜索替换依赖 `Ctrl + h`，不如 `:%s` / `:g` 无鼠标，不支持 `:v`。

  ---

  ## 分屏

  - **定义**：在同一会话中编辑多个文件或缓冲区，支持水平（`:sp`）和垂直（`:vsp`）分屏，配合 `Ctrl-w` 导航和管理。

  - **命令列表**：
    - `:sp` / `:vsp`：水平/垂直分屏当前缓冲区。
    - `:sp file` / `:vsp file`：水平/垂直分屏打开 `file`。
    - `:new` / `:vnew`：新建水平/垂直空缓冲区。
    - `Ctrl-w h/j/k/l`：移动到左/下/上/右窗口。
    - `Ctrl-w H/J/K/L`：将当前窗口移到最左/下/上/右。
    - `Ctrl-w c`：关闭当前窗口。
    - `Ctrl-w o`：关闭其他窗口，仅保留当前。
    - `Ctrl-w =`：使所有窗口等高/等宽。
    - `Ctrl-w +` / `-`：增加/减少窗口高度。
    - `Ctrl-w >` / `<`：增加/减少窗口宽度。
    - `:resize <num>` / `:vertical resize <num>`：设置窗口高度/宽度。

  - **行为细节**：
    - **创建**：`:sp` / `:vsp` 默认加载当前缓冲区，`:sp file` / `:vsp file` 支持 `Tab` 补全，`:new` / `:vnew` 创建匿名缓冲区。
    - **导航**：`Ctrl-w h/j/k/l` 循环移动，`Ctrl-w H/J/K/L` 调整布局。
    - **管理**：`Ctrl-w c` 关闭当前（不退出 Vim），`Ctrl-w o` 仅保留当前，`Ctrl-w =` 调整大小，`Ctrl-w +/-/>/<` 和 `:resize` 精确控制。
    - **共享**：多窗口可共享缓冲区，同步修改，`:ls` / `:b <num>` 切换。
    - **错误**：文件不存在时 `:sp file` 创建新文件，窗口过多影响性能，需关闭无用窗口。

  - **示例**：
    - `:vsp README.md` 垂直分屏打开 `README.md`。
    - `Ctrl-w l` 移到右侧，`Ctrl-w h` 返回左侧。
    - `:sp | e file.c` 水平分屏打开 `file.c`。
    - `Ctrl-w J` 移到最底部，调整布局。
    - `:resize 10` 设置高度 10 行，`:vertical resize 30` 设置宽度 30 列。

  - **注意事项**：
    - 数量：分屏过多影响可读性，注意屏幕尺寸。
    - 性能：大文件或多窗口耗时，关闭无用窗口（`Ctrl-w c` / `:bd`）。
    - 导航：熟悉 `Ctrl-w h/j/k/l` 和 `H/J/K/L`，提高效率。
    - 同步：共享缓冲区注意修改同步，避免覆盖。
    - 插件：检查 `:verbose map <C-w>`，避免冲突（如 `vim-airline`）。
    - 终端：终端 Vim 分屏依赖模拟器支持，注意颜色和边框。

  - **场景应用**：
    - 代码：`:vsp file.c` 比较版本，`:sp | e file.h` 查看头文件。
    - 文档：`:sp README.md` 编辑文档和代码。
    - 调试：`:vsp | e log.txt` 打开日志，`:b <num>` 切换错误文件。
    - 多文件：`:sp | ls` 查看缓冲区，`:b <num>` 切换。

  - **高级用法**：
    - 寄存器：`"ayy` 复制，切换窗口后 `"ap` 粘贴。
    - 缓冲区：`:vsp | b 2` 切换编号 2，`:sp | ls | b <Tab>` 补全名称。
    - 全局：`:sp | g/pattern/d` 删除匹配行，`:vsp | v/error/y A` 提取不匹配行。
    - 宏：录制 `qa:sp<CR>e file<CR>q` 批量分屏，`qaCtrl-w lq` 循环导航。
    - 映射：`.vimrc` 定义 `nnoremap <leader>sp :sp<CR>`，`nnoremap <leader>resize :resize 10<CR>`。

  - **性能优化**：
    - 大文件：`:set lazyredraw`，`autocmd BufReadPost * if line('$') > 1000 | set lazyredraw | endif`。
    - 高亮：`:set nocursorline`，`autocmd BufReadPost * if line('$') > 1000 | set nocursorline | endif`。
    - 管理：`Ctrl-w o` 关闭无用窗口，`autocmd WinEnter * if winnr('$') > 5 | Ctrl-w o | endif`。

  - **与其他编辑器对比**：
    - Emacs：`:sp` / `:vsp` 比 `C-x 2` / `C-x 3` 简洁，`Ctrl-w` 比 `C-x o` 直观，支持更多操作。
    - VS Code：分屏依赖 `Ctrl + \`，不如 `:sp` / `:vsp` 高效，导航依赖鼠标，不如 `Ctrl-w` 强大。
    - Sublime Text：分屏依赖 `Alt + Shift + 2`，不如 `:sp` / `:vsp` 无鼠标，导航不如 `Ctrl-w` 灵活。

  ---

  ## 配置设置

  - **定义**：调整 Vim 行为和编辑环境，包括行号、搜索高亮、缩进、制表符，支持临时（`:set`）和永久（`~/.vimrc`）设置。

  - **命令列表**：
    - `:set nu` / `:set nonu`：显示/隐藏行号。
    - `:set rnu` / `:set nornu`：显示/隐藏相对行号。
    - `:set number relativenumber`：同时显示绝对和相对行号。
    - `:set hlsearch` / `:set nohlsearch`：启用/禁用搜索高亮。
    - `:noh`：临时取消当前高亮。
    - `:set incsearch`：启用增量搜索。
    - `:set ignorecase` / `:set smartcase`：忽略/智能大小写敏感。
    - `:set tabstop=4`：Tab 显示宽度 4。
    - `:set softtabstop=4`：Tab 输入宽度 4。
    - `:set shiftwidth=4`：缩进宽度 4。
    - `:set expandtab` / `:set noexpandtab`：Tab 转换/不转换空格。
    - `:set autoindent` / `:set smartindent` / `:set cindent`：自动/智能/C 风格缩进。
    - `:set filetype=python` / `:set syntax=python`：设置文件类型/语法高亮。
    - `:set wrap` / `:set nowrap`：启用/禁用自动换行。
    - `:set cursorline` / `:set nocursorline`：高亮/不高亮当前行。
    - `:set cursorcolumn` / `:set nocursorcolumn`：高亮/不高亮当前列。
    - `:set showmatch` / `:set noshowmatch`：高亮/不高亮匹配括号。
    - `:set all`：查看所有选项。
    - `:set <option>?` / `:set <option>&`：查看/恢复选项值。

  - **行为细节**：
    - **行号**：`:set nu` 显示绝对行号，`:set rnu` 显示相对行号，配合 `j` / `k` 移动，`:set number relativenumber` 当前行绝对。
    - **搜索**：`:set hlsearch` 高亮匹配，`:noh` 临时取消，`:set incsearch` 实时高亮，`:set ignorecase` / `:set smartcase` 控制大小写。
    - **缩进**：`:set tabstop` 显示宽度，`:set softtabstop` 输入宽度，`:set shiftwidth` 缩进宽度，`:set expandtab` Tab 转空格。
    - **文件类型**：`:set filetype` 启用插件/缩进，`:set syntax` 控制高亮，需 `:filetype plugin on`。
    - **显示**：`:set wrap` 自动换行，`:set cursorline` / `:set cursorcolumn` 高亮光标，`:set showmatch` 高亮括号（依赖 `matchpairs`）。
    - **持久化**：`:set` 临时，写入 `.vimrc` 永久，如 `set tabstop=4`。

  - **示例**：
    - `:set nu` 显示行号，`:set nonu` 隐藏。
    - `:set expandtab tabstop=4 shiftwidth=4` 规范化缩进。
    - `:set hlsearch` 高亮搜索，`:noh` 取消当前高亮。
    - `:set filetype=python syntax=python` 启用 Python 语法。
    - `:set cursorline` 高亮当前行，`:set nocursorline` 禁用。

  - **注意事项**：
    - 性能：过多设置（如 `:set cursorline` / `:set cursorcolumn`）影响性能，关闭不必要选项。
    - 文件：`:set expandtab` 注意格式一致，避免混用 Tab 和空格。
    - 插件：检查 `:verbose set <option>?`，避免冲突（如 `vim-airline`）。
    - 大文件：禁用 `:set wrap` / `:set cursorline`，`autocmd BufReadPost * if line('$') > 1000 | set nowrap | endif`。
    - 默认：`:set <option>&` 恢复默认，注意 `.vimrc` 冲突。
    - 查询：`:set all` 查看所有，`:set <option>?` 查看具体，`:set <option>&` 恢复。

  - **场景应用**：
    - 代码：`:set expandtab tabstop=4 shiftwidth=4` 规范化缩进，`:set filetype=python` 启用 Python 语法。
    - 文档：`:set wrap nu` 优化阅读体验。
    - 调试：`:set hlsearch incsearch cursorline` 快速定位问题。
    - 自定义：`:set ignorecase smartcase autoindent` 优化编辑效率。

  - **高级用法**：
    - 自动命令：`.vimrc` 设置 `autocmd FileType python setlocal tabstop=4 shiftwidth=4 expandtab`，`autocmd BufReadPost * if line('$') > 1000 | set nowrap | endif`。
    - 寄存器：`:set clipboard=unnamed` 同步剪贴板，配合 `"*y` / `"*p`。
    - 全局：`:g/pattern/set nu` 匹配行启用行号，`:v/error/set nowrap` 不匹配行禁用换行。
    - 宏：录制 `qa:set nu<CR>q` 批量调整，`qa:set expandtab tabstop=4 shiftwidth=4<CR>q` 规范化缩进。
    - 映射：`.vimrc` 定义 `nnoremap <leader>nu :set nu!<CR>`，`nnoremap <leader>indent :set expandtab tabstop=4 shiftwidth=4<CR>`。

  - **性能优化**：
    - 大文件：`:set nowrap`，`autocmd BufReadPost * if line('$') > 1000 | set nowrap | endif`。
    - 高亮：`:set nocursorline nocursorcolumn`，`autocmd BufReadPost * if line('$') > 1000 | set nocursorline nocursorcolumn | endif`。
    - 加载：`.vimrc` 用 `autocmd` 按需加载，`autocmd FileType markdown set wrap`，`autocmd InsertEnter * set nocursorline`。

  - **与其他编辑器对比**：
    - Emacs：`:set nu` / `:set rnu` 比 `M-x linum-mode` 灵活，`:set hlsearch` / `:set incsearch` 比 `C-s` 直观。
    - VS Code：配置依赖设置界面或 `settings.json`，不如 `:set` 高效，行号/缩进不如 `:set nu` / `:set expandtab` 便捷。
    - Sublime Text：配置依赖设置界面或 `sublime-settings`，不如 `:set` 无鼠标，行号/缩进不如 `:set nu` / `:set expandtab` 灵活。

  ---

  以上是对 Vim Commands（命令）功能的再次优化，结构更清晰，内容精炼且详实，涵盖定义、命令列表、行为细节、示例、注意事项、场景应用、高级用法、性能优化、与其他编辑器对比九个部分，适合快速参考和深入学习。如果你有具体问题或场景，欢迎进一步讨论！
