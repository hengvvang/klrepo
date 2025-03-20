# Windows & Tabs 窗口和标签页
Vim 支持多窗口和多标签页，方便编辑多个文件。以下是详细分类，按功能分层。

  ## 核心操作

  ### 创建窗口
  - **水平分屏**：`split`
    - `:sp`：新建空白水平分屏。
    - `:sp file`：水平分屏打开文件。
  - **垂直分屏**：`vertical split`
    - `:vsp`：新建空白垂直分屏。
    - `:vsp file`：垂直分屏打开文件。
  - **其他**：
    - `:new`：新建空白水平分屏（同 `:sp`）。
    - `:vnew`：新建空白垂直分屏（同 `:vsp`）。

  ### 示例
  - `:sp README.md` → 水平分屏打开 README.md。
  - `:vsp config.yaml` → 垂直分屏打开 config.yaml。

  ---

  ## 窗口导航

  ### 快捷键（Normal Mode）
  - **方向移动**：
    - `Ctrl-w h`（移动到左边窗口）。
    - `Ctrl-w j`（移动到下方窗口）。
    - `Ctrl-w k`（移动到上方窗口）。
    - `Ctrl-w l`（移动到右边窗口）。
  - **循环切换**：
    - `Ctrl-w w`：顺时针切换。
    - `Ctrl-w W`：逆时针切换。
  - **边界跳转**：
    - `Ctrl-w t`：顶部窗口。
    - `Ctrl-w b`：底部窗口。
 - **窗口管理**：
    - **示例**：
    - 按 `:vsp file.txt`，然后按 `Ctrl-w l` 移动到右侧窗口。
    - 按 `Ctrl-w c` 关闭当前窗口。

  ### 命令行方式
  - `:wincmd h` → 等同于 `Ctrl-w h`。
  - `:wincmd j` → 等同于 `Ctrl-w j`。
  - `:wincmd k` → 等同于 `Ctrl-w k`。
  - `:wincmd l` → 等同于 `Ctrl-w l`。

  ---

  ## 窗口管理

  ### 调整大小
  - **均衡**：
    - `Ctrl-w =`（使所有窗口等高/等宽，equal size）。
  - **高度调整**：
    - `Ctrl-w +`（增加当前窗口高度）。
    - `Ctrl-w -`（减少当前窗口高度）。
    - `:resize N`：设置高度为 N 行。
  - **宽度调整**：
    - `Ctrl-w >`：增加宽度。
    - `Ctrl-w <`：减少宽度。
    - `:vertical resize N`：设置宽度为 N 列。

  ### 关闭窗口
  - `Ctrl-w c`：关闭当前窗口。  close
  - `Ctrl-w o`：仅保留当前窗口（关闭其他）。  only
  - `:q`：若为最后一个窗口，退出 Vim。

  ### 移动窗口
  - `Ctrl-w r`：顺时针旋转。
  - `Ctrl-w R`：逆时针旋转。
  - `Ctrl-w x`：与下一个窗口交换位置。

  ---

  ### 示例流程
  1. **创建分屏**：
     - `:vsp file.txt` → 垂直分屏打开 file.txt。
     - `Ctrl-w l` → 移动到右侧窗口。
  2. **调整大小**：
     - `Ctrl-w =` → 所有窗口等高/等宽。
     - `Ctrl-w +` → 增加当前窗口高度。
  3. **关闭窗口**：
     - `Ctrl-w c` → 关闭当前窗口。
     - `Ctrl-w o` → 仅保留当前窗口。

  ---

  ### 注意事项
  - 适合对比编辑相关文件。
  - 使用 `Ctrl-w` 快捷键提升导航效率。
  - 避免过多窗口，影响性能。

  ---

  ## Tabs 标签页

  ### 定义
  - 在 Vim 中使用标签页管理多个文件或工作区。
  - 每个标签页可包含多个窗口（分屏）。
  - 用途：管理不相关文件或项目，逻辑清晰。

  ---

  ### 核心操作

  #### 创建标签页
  - `:tabnew`：新建空白标签页。
  - `:tabnew file`：在新标签页打开文件。
  - `:tabe file`：等同于 `:tabnew file`。

  #### 关闭标签页
  - `:tabclose`：关闭当前标签页。
  - `:tabclose N`：关闭第 N 个标签页。
  - `:tabonly`：仅保留当前标签页。

  ---

  ### 标签页导航

  #### 快捷键（Normal Mode）
  - `gt` 在 Normal Mode 下，切换到下一个标签页
  - `gT` 切换到上一个标签页
  - `Ngt`：跳转到第 N 个标签页（例如，`2gt` → 第 2 个标签页）。

  #### 命令行方式
  - `:tabn`：下一个标签页。 next
  - `:tabp`：上一个标签页。 pervious
  - `:tabfirst`：第一个标签页。
  - `:tablast`：最后一个标签页。
  - `:tabs`：列出所有标签页及其内容。
  - **示例**：
    - 按 `:tabnew README.md` 在新标签页打开 README.md。
    - 按 `gt` 切换到下一个标签页。
  ---

  ### 示例流程
  1. **创建标签页**：
     - `:tabnew README.md` → 新标签页打开 README.md。
     - `:tabe config.yaml` → 新标签页打开 config.yaml。
  2. **导航标签页**：
     - `gt` → 切换到下一个标签页。
     - `2gt` → 切换到第 2 个标签页。
  3. **关闭标签页**：
     - `:tabclose` → 关闭当前标签页。
     - `:tabonly` → 仅保留当前标签页。

  ---

  ### 注意事项
  - 适合管理不相关文件或项目。
  - 每个标签页可包含多个窗口，灵活组合。
  - 避免过多标签页，影响性能。

  ---

  ## 高级用法

  ### 窗口与标签页结合
  - **场景**：在标签页内分屏编辑。
  - **操作**：
    - `:tabnew file1.txt` → 新建标签页并打开 file1.txt。
    - `:vsp file2.txt` → 在当前标签页内垂直分屏打开 file2.txt。
  - **用途**：标签页管理项目，窗口对比文件。

  ---

  ### 自定义配置（`.vimrc`）
  #### 快捷键
  ```vim
  " 快速新建标签页
  nnoremap <C-t> :tabnew<CR>
  " 快速切换标签页
  nnoremap <C-n> :tabn<CR>
  nnoremap <C-p> :tabp<CR>
  ```

  #### 分屏方向
  ```vim
  set splitbelow  " 新水平分屏在下方
  set splitright  " 新垂直分屏在右侧
  ```
