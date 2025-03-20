# Text Objects 文本对象
## overview
- **Text Objects** 是 Vim 中用于操作结构化文本的范围工具，允许用户快速选择或操作特定的文本结构，例如单词、句子、段落、括号、引号、标签等。
- 文本对象通常与 **Operators**（操作符，如 `d` delete, `c` change, `y` yank, `v` visual）和 **Scope**（范围，如 Inner 和 Around）结合使用。
- **核心特点**：
  - 结构化：基于文本的语义结构（如单词、括号）而非光标移动。
  - 高效性：通过组合操作，快速完成复杂编辑任务。
  - 灵活性：支持多种范围和操作，适用于代码、自然语言文本和标记语言。

## 基本用法
- **格式**：`<Operator><Scope><Text Object>`
  - **Operator**：操作符，决定执行的操作类型。
    - `d`（删除，delete）
    - `c`（修改，change，删除并进入 Insert Mode）
    - `y`（复制，yank）
    - `v`（选择，visual）
  - **Scope**：范围，决定操作的边界。
    - **Inner（内部）**：不包括边界（如括号、引号、标签的边界）。
    - `i`
    - **Around（周围）**：包括边界。
    - `a`
  - **Text Object**：具体的文本对象，决定操作的目标。
    - `w`（单词，word）
    - `s`（句子，sentence）
    - `p`（段落，paragraph）
    - `(` 或 `b`（圆括号，parentheses）
    - `t`（标签，tag）

## 单词 word
- **定义**：操作单词级别的范围。
- **命令**：
  - `w`（单词，word）。
  - `iw`（内部单词，inner word）。
  - `aw`（整个单词，包括周围空格，around word）。
- **注意事项**：
  - `iw` 不包括空格，`aw` 包括空格。
  - 适合快速编辑单词。

## 句子 sentence
- **定义**：操作句子级别的范围。
- **命令**：
  - `s`（句子，sentence）。
  - `is`（内部句子，inner sentence）。
  - `as`（整个句子，包括周围空格，around sentence）。
- **注意事项**：
  - 句子以 `.`、`!`、`?` 结尾分隔。
  - 适合处理自然语言文本。

## 段落 paragraph
- **定义**：操作段落级别的范围。
- **命令**：
  - `p`（段落，paragraph）。
  - `ip`（内部段落，inner paragraph）。
  - `ap`（整个段落，包括周围空格，around paragraph）。
- **注意事项**：
  - 段落以空行分隔。
  - 适合处理大段文本。

## 括号和引号
- **定义**：操作括号和引号内的范围。
- **命令**：
  - `b` 或 `(`（括号，block）。
  - `[` 或 `{`（大括号）。
  - `"` 或 `'`（引号，quote）。
- **注意事项**：
  - 支持多种括号，如 `()`、`[]`、`{}`。
  - 适合处理代码和嵌套结构。

## 标签 tag
- **定义**：操作 HTML/XML 标签的范围。
- **命令**：
  - `t`（标签，tag，例如 HTML 标签）。
  - `it`（内部标签，inner tag）。
  - `at`（整个标签，包括标签本身，around tag）。
- **注意事项**：
  - 需要启用语法高亮（`:syntax on`）。
  - 适合处理标记语言文件。


  ## `<Operator><Motion>`的对比

 - `<Operator><Motion>`
      - 基于光标移动，范围动态。
      - 示例：`dw` 删除从光标到下一个单词开头的内容。
  - `<Operator><Scope><Text>`
    - 基于结构化范围，范围明确。
    - 示例：`diw` 删除当前单词，无论光标在单词的哪个位置。
- **区别与结合**：
    - 文本对象更适合结构化操作，Motions 更适合动态范围。
    - 示例：
    - 在 "hello world" 中，光标在 "hello" 的 "h" 上：
        - 使用 Motion：`dw` 删除 "hello "（包括空格）。
        - 使用 Text Object：`diw` 删除 "hello"（不包括空格）。
