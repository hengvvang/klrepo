# Modes 模式

## Normal Mode（正常模式）
- **描述**：默认模式，用于导航和执行命令。在此模式下，按键触发操作而非输入文本。
- **进入方式**：从其他模式按 `Esc` 或 `Ctrl + [` 返回。
- **常用操作**：
  - `d`：删除 (delete)
  - `c`：替换（cut）
  - `x`：删除光标下的字符（delete character）
  - `y`：复制（Yank）
  - `p`：粘贴 (paste)
  - `u`：撤销 (undo)
  - `Ctrl + r`：重做 (redo)

## Insert Mode（插入模式）
- **描述**：用于输入和编辑文本。
- **进入方式**：
  - `i` 在光标前插入 (insert)
  - `a` 在光标后插入 (append)
  - `I` 在行首插入  (insert at beginning of line）
  - `A` 在行尾插入  (append at end of line)
  - `o` 在下一行插入新行 (open a new line below)
  - `O` 在上一行插入新行 (open a new line above）
  - `s` 删除光标下的字符并进入插入模式 (substitute）
  - `S` 删除当前行并进入插入模式 (substitute line）
  - `c` 剪切指定范围并进入插入模式
  - `C` 剪切内容到行尾并进入出入模式
    - `d` 功能与 `c` 对应，只是 `d` 不会进入插入模式
- **退出方式**：按 `Esc` 或 `Ctrl + [ ` 返回普通模式。

## Visual Mode（可视模式）
- **描述**：用于选择文本块以执行操作。
- **进入方式**：
  - `v`（字符选择，visual mode）。
  - `V`（行选择，visual line mode）。
  - `Ctrl-v`（块选择，visual block mode）。
- **退出方式**：按 `Esc` 或 `Ctrl + [ ` 返回普通模式。

## Command-line Mode（命令行模式）
- **定义**：用于执行 Vim 命令。
- **进入方式**：
  - `:` 进入命令行
    - `:w`：保存
    - `:q`：退出
    - `:wq`：保存并退出
    - `:q!`：强制退出
  - `/`（向前搜索，例如 `/pattern`）。
  - `?`（向后搜索，例如 `?pattern`）。
  - `!`（执行外部命令，例如 `:!ls`）。
- **退出方式**：按 `Esc` 或 `Ctrl + [ ` 返回普通模式。

##  Replace Mode（替换模式）
- **定义**：用于覆盖现有文本。
- **进入方式**：
  - `R`（进入替换模式，replace mode）。
  - `r`（替换单个字符，replace one character）。
- **退出方式**：按 `Esc` 或 `Ctrl + [ ` 返回普通模式。
