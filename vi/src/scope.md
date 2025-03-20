# Scope 范围
## Overview
`<Operator><Scope><Text-Object>`
## Inner（内部）
- **定义**：操作范围不包括边界（如括号、引号等）。
- **常见用法**：
  - `diw`（删除单词内部，delete inner word）。
  - `ci(`（修改括号内部内容，change inner parenthesis）。
  - `yi"`（复制引号内部内容，yank inner quote）。
  - `vi[`（选择括号内部内容，visual inner bracket）。
  - `gUiw`（将光标所在单词大写，Uppercase inner word）
- **注意事项**：
  - Inner 范围不包括边界，适合精确操作。
  - 常与 `d`、`c`、`y`、`v` 等 Operators 结合使用。

## Around（周围）
- **定义**：操作范围包括边界（如括号、引号等）。
- **常见用法**：
  - `daw`（删除整个单词，包括周围空格，delete around word）。
  - `ca[`（修改整个括号，包括括号本身，change around bracket）。
  - `ya"`（复制整个引号，包括引号本身，yank around quote）。
  - `va[`（选择整个括号，包括括号本身，visual around bracket）。
  - `guap` (将光标所处段落单词全部小写， lowercase around paragraph)
- **注意事项**：
  - Around 范围包括边界，适合完整操作。
  - 常与 `d`、`c`、`y`、`v` 等 Operators 结合使用。

## Surround（环绕）
  - **核心命令**：
    - `ys`：添加环绕。
    - `ds`：删除环绕。
    - `cs`：修改环绕。
  - **使用模式**：
    - 普通模式：操作单词、段落等。
    - 可视模式：操作选中文本。
    - 动作命令：结合 Vim 动作（如 `iw`、`ip`）。


  ## 删除环绕（`ds`）
  - **用法**：`ds` + 目标字符。
  - **示例**：
    - `ds<deleted-character>`
    - `ds"`：删除双引号 → `"hello"` → `hello`。
    - `dst`：删除标签 → `<p>hello</p>` → `hello`。
  - **嵌套处理**：只删除最内层环绕。

  ## 修改环绕（`cs`）
  - **用法**：
    - `cs` + 要被替换目标字符 + 新字符。
  - **示例**：
    - `cs<replaced-character><new-character>`
        - `cs"'`：双引号改单引号 → `"hello"` → `'hello'`。
        - `cst<div>`：标签改 `<div>` → `<p>hello</p>` → `<div>hello</div>`。
  - **嵌套处理**：只修改最内层环绕。

  ## 添加环绕（`ys`）
  - **用法**：`ys` + 动作 + 目标字符。
  - **示例**：
  - `ys<scope><text-object><new-character>`
    - `ysiw"`：为单词添加双引号 → `"hello"`。
    - `ysip)`：为段落添加圆括号 → `(hello world)`。
    - `yss{`：为整行添加大括号 → `{ hello }`（带空格）。
  - **空格规则**：
    - `(`、`{`、`[`：不带空格。
    - `)`、`}`、`]`：带空格。
  - **变体**：
    - `yss`：整行环绕。
    - `ySs` / `ySS`：整行环绕并换行（常用于标签）。
    - 示例：`ySs<div>` → `<div>\nhello\n</div>`。

  ##  可视模式操作
  - **添加环绕**：
    - 选中文本，输入 `S` + 目标字符。
    - 示例：选中 `hello`，输入 `S"` → `"hello"`。
  - **变体**：
    - `yS` / `YS`：添加环绕并换行（常用于标签）。
      - 示例：选中 `hello`，输入 `yS<div>` → `<div>\nhello\n</div>`。
    - `gS`：多行文本环绕。
      - 示例：选中多行，输入 `gS"` → 每行分别加引号。

## 4. 目标字符
  - **常用字符**：
    - 引号：`"`、`'`
    - 括号：`(` / `)`、`{` / `}`、`[` / `]`
    - 标签：`t`（HTML/XML 标签）、`<div>` 等。
  - **特殊字符**：
    - `b`：圆括号 `()`。
    - `B`：大括号 `{}`。
    - `r`：方括号 `[]`。
    - `a`：尖括号 `<>`。
    - `f`：函数调用 `func()`。
  - **自定义字符**：
    - 可视模式下，输入 `S` + 任意字符。
    - 示例：选中 `hello`，输入 `S#` → `#hello#`。
