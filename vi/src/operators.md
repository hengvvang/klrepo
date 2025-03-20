# Operators 操作符
- 有一些 `operators` 可以被直接使用  C  D  J  x X  s S
- 有一些 `operators` 在被选择的内容上使用(visual mode)   J  u U  x  s
- 有一些 `operators` 可以与 `motions` | `scope + text-objects` 结合使用
    - `<Operator><Motion>`     d0   c^  y$
    - `<Operator><Scope><Text-Object>`  `diw`  `cab | ca(` ` yiB | yi{`
## overview
- **删除**：
  - `d{motion}`：删除指定移动范围
  - `d{scope}{text-object}`：删除指定范围内的文本
  - `dd`：删除整行
  - `D`：删除到行尾
  - `x`：删除当前字符
  - `X`：删除前一个字符
- **复制**：
  - `y{motion}`：复制指定移动范围
  - `y{scope}{text-object}`：复制指定范围内的文本
  - `yy`：复制整行
  - `Y`：复制整行（等同于 `yy`）
- **粘贴**：
  - `p`：光标后粘贴
  - `P`：光标前粘贴
- **修改**：
  - `{The content selected in visual mode}c`: 修改选中内容
  - `c{motion}`：修改指定移动范围
  - `c{scope}{text-object}`：修改指定范围内的文本
  - `cc`：修改整行
  - `C`：修改到行尾
  - `s`：删除当前字符并进入插入模式
  - `S`：删除整行并
  - `J`：合并选中的行（join lines）
- **替换**：
  - `r`：替换当前字符
  - `R`：进入替换模式
- **撤销与重做**：
  - `u`：撤销
  - `Ctrl + r`：重做
## 删除操作（`d` delete）
- **`+ motions`**
    - **注释**: 光标移动到哪里，删除到哪里
    - `b` bengin 移动到单词首部
        - `db` 删除到单词的首部，delete to word begin
    - `e` end  移动到单词的尾部）
        - `de` 删除到单词的尾部，delete to word end
    - `w` word 移动到下一个单词
        - `dw` 删除到下一个单词，delete to next word
    - `2j` 向下移动两行
       - `d2j` **向下**删除两行
    - `gg` 移动到文件开
        - `dgg` 删除到文件开头，delete to top
    - `G`  移动到文件结尾
        - `dG` 删除到文件结尾，delete to bottom

- **`+ scope + text objects`**
    - **注释**: 删除所选范围
    > 这里的 `iw` 的 `w` 是 `text object`
    - `dd`（删除当前行，delete line）。
    - `i` inner
        - `diw`（删除单词内部，delete inner word）。
        - `di"`（删除引号内的内容，delete inner quote）。
    - `a` around
        - `daw`（删除单词外部，delete around word）。
- **注意事项**：
  - 删除的内容存储在默认寄存器（`""`），可以使用 `p` 粘贴。
  - 使用 `"_d` 删除到黑洞寄存器，不影响默认寄存器。

## 修改操作（`c` change）
- **定义**：删除指定范围的文本并进入 Insert Mode。
- **`+ motions`**
- `0`
    - `c0` 删除到行首并进入`Insert Mode`
- `^`
    - `c^` 删除到此行第一个非空字符并进入`Insert Mode`
- `$`
    - `c$` 删除到行尾并进入`Insert Mode`
- **`+ scope + text objects`**
    - `cc`（修改当前行，change line）。
    - `i` inner
        - `ciw`（修改单词，change inner word）。
        - `ci(`（修改括号内部内容，change inner parenthesis）
    - `a` around
        - `ca[`（修改整个括号，包括括号本身，change around bracket）

- **注意事项**：
  - 修改后直接进入 Insert Mode，适合快速编辑。
  - 删除的内容存储在默认寄存器（`""`）。

## 复制操作（`y` yank）
- **定义**：复制指定范围的文本。
- **`+ motions`**
- `H` 跳到屏幕顶部，high
    - `yH` 复制到屏幕顶部
- `M` 跳到屏幕中间，middle
    - `yM` 复制到屏幕中间，middle
- `L` 跳到屏幕底部，low
    - `yL` 复制到屏幕底部，low
- **`+ scope + text objects`**
    - `yy`（复制当前行，yank line）。
    - `i` inner
        - `yip` 复制段落，yank inner paragraph
    - `a` around
        - `yab`/`yab` 复制整个小括号(及其内容，包括括号小本身 yank around bracket
        - `ya[`/`ya[` 复制整个中括号[及其内容，包括括号中本身 yank around bracket
        - `yaB`/`ya{` 复制整个大括号{及其内容，包括括号大本身 yank around bracket
- **注意事项**：
  - 复制的内容存储在默认寄存器（`""`），可以使用 `p` 粘贴。
  - 使用 `"+y` 复制到系统剪贴板。


## 选择操作（`v` visual）
- **定义**：用于在Vim中选择文本，支持字符、行和块级别的选择，可用于剪切、复制等操作。
- **`+ motions`**
    - `h` 向左移动一个字符
        - `vh` 选择到左侧一个字符，visual to left character
    - `l` 向右移动一个字符
        - `vl` 选择到右侧一个字符，visual to right character
    - `+` 移动到下一行的首个非空字符
        - `v+` 选择到下一行的首个非空字符，visual to next line start
    - `-` 移动到上一行的首个非空字符
        - `v-` 选择到上一行的首个非空字符，visual to previous line start
    - `|` 移动到当前行的指定列
        - `v10|` 选择到第10列，visual to column 10
    - `)` 移动到下一个句子结尾
        - `v)` 选择到下一个句子，visual to next sentence
    - `(` 移动到上一个句子开头
        - `v(` 选择到上一个句子，visual to previous sentence
- **`+ scope + text objects`**
    - `V`（选择当前行，visual line）。
    - `Ctrl+v`（进入可视块模式，visual block）。
    - `i` inner
        - `viw`（选择单词内部，visual inner word）。
        - `vi"`（选择引号内的内容，visual inner quote）。
    - `a` around
        - `vaw`（选择单词外部，visual around word）。
- **注意事项**：
  - 进入可视模式后，可以使用 `d`（删除）、`y`（复制）等操作处理选定文本。
  - 使用 `o` 可以在选择模式中切换光标起点和终点。
  - 可视模式下按 `:` 可以对选定区域执行命令，如 `:'<,'>s/foo/bar/g` 进行替换。

## 粘贴操作（`p` paste）
- **定义**：粘贴寄存器中的内容。
- **基本用法**：
  - `p`（在光标后粘贴，paste after）。
  - `P`（在光标前粘贴，paste before）。
- **注意事项**：
  - 粘贴的内容来自默认寄存器（`""`），可以使用 `"ap` 从寄存器 a 粘贴。
  - 行级粘贴（如 `yy`）会插入新行，字符级粘贴（如 `yw`）会插入在光标位置。

## 缩进操作（`>` 和 `<`）
- **定义**：调整文本缩进。
- **基本用法**：
  - `>`（当前行增加缩进，shift right）。
  - `<`（当前行减少缩进，shift left）。
    - visual mode
    - motion
        - 作用与当前行
        - `>2j` 增加当前行和下面 2 行的缩进。
    - scope + operator
  - `>>`（当前行增加缩进，shift right）。
  - `<<`（当前行减少缩进，shift left）。
- **注意事项**：
  - 缩进宽度由 `:set tabstop` 和 `:set shiftwidth` 控制。
  - 在 Visual Mode 下，选择多行后按 `>` 或 `<` 调整缩进。

## 大小写转换（`gU` 和 `gu`）
- **定义**：转换文本大小写。
- **基本用法**：
    - Available in visual mode
        - `u` 所选内容转小写
        - `U` 所选内容转大写
        - `~` 切换当前字符/所选内容的大小写。
    - Use with `motion` |`scope + operator`
        - visual mode
        - motion
            - `gUw`（单词转为大写，uppercase word）。
            - `guw`（单词转为小写，lowercase word）。
            - `gU$`（到行尾转为大写，uppercase to end of line）。
        - scope + operator
            - `gUip`（段落转为大写，uppercase inner paragraph）。
            - `guip`（段落转为小写，lowercase inner paragraph）。

## 折叠操作（`zf` fold）
- **定义**：折叠代码块以隐藏部分内容。
- **基本用法**：
  - `zf`（创建折叠，fold）。
  - visual mode
  - motion
    `zf2j`（向下折叠两行，fold two lines）。
  - scope + operator
    - `zfap`（折叠一个段落，fold around paragraph）。
  - `zo`（打开折叠，open fold）。
  - `zc`（关闭折叠，close fold）。
  - `zR`（打开所有折叠，open all folds）。
  - `zM`（关闭所有折叠，close all folds）。
- **示例**：
  - 在代码块中，按 `zf}` 创建折叠，然后按 `zo` 打开。
  - 按 `zM` 关闭所有折叠，然后按 `zR` 打开。
- **注意事项**：
  - 折叠需要 `:set foldmethod` 设置折叠方式（如 `indent`、`syntax`）。
  - 适合处理大文件，隐藏不相关内容。
