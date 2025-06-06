## `cargo-binutils` 使用方法全解析

`cargo-binutils` 的核心思想是将 Rust 工具链中的 LLVM 工具（如 `llvm-nm`、`llvm-objdump` 等）通过 `Cargo` 子命令的形式集成到 Rust 项目的工作流中。每个子命令都会先调用 `cargo build` 构建项目，然后对生成的工件（如 ELF 文件）运行相应的 LLVM 工具。以下是所有子命令及其使用方法的详细说明。

### 前置条件
- 已安装 `cargo-binutils`（`cargo install cargo-binutils`）。
- 已添加 `llvm-tools-preview` 组件（`rustup component add llvm-tools-preview`）。
- 当前目录是一个 Rust 项目（包含 `Cargo.toml`）。

---

### 通用用法格式
所有 `cargo-binutils` 子命令的通用格式如下：
```
cargo <子命令> [构建选项] [--] [工具选项]
```
- **`<子命令>`**：如 `nm`、`objdump`、`size` 等。
- **`[构建选项]`**：与 `cargo build` 相同的选项（如 `--release`、`--bin` 等）。
- **`[--]`**：分隔符，将后续参数传递给底层 LLVM 工具。
- **`[工具选项]`**：LLVM 工具的特定选项（如 `--print-size`、`--disassemble` 等）。

#### 常用构建选项
- `--release`：使用发布模式构建（优化后）。
- `--bin <NAME>`：指定操作的二进制目标。
- `--example <NAME>`：指定操作的示例目标。
- `--target <TRIPLE>`：指定目标架构（如 `thumbv7em-none-eabihf`）。
- `--verbose` 或 `-v`：显示详细的构建和工具调用信息。

---

## 主要子命令详解

### 1. `cargo nm`
**功能**：列出目标文件中的符号表（类似于 GNU 的 `nm`），包括函数、全局变量等的名称和地址。

#### 用法
```
cargo nm [构建选项] [--] [nm选项]
```

#### 常用选项
- `--print-size` 或 `-S`：显示每个符号的大小。
- `--size-sort`：按符号大小排序。
- `-n`：按地址顺序排序。
- `-g`：仅显示外部符号。
- `--demangle`：解码 Rust 的符号修饰（默认启用）。

#### 示例
- **列出所有符号**：
  ```bash
  cargo nm --release
  ```
  输出类似于：
  ```
  00010000 T main
  00010010 T _ZN3app4func17h1234567890abcdefE
  ```
  （未修饰的符号会显示为 Rust 的内部命名格式，`cargo-binutils` 会自动解码。）

- **按大小排序并显示大小**：
  ```bash
  cargo nm --release -- --print-size --size-sort
  ```
  输出：
  ```
  00010000 00000100 T main
  00010100 00000200 T some_large_function
  ```

- **仅显示外部符号**：
  ```bash
  cargo nm --release -- -g
  ```

#### 应用场景
- 检查哪些函数或变量占用了大量空间。
- 调试链接问题，验证符号是否正确导出。

---

### 2. `cargo size`
**功能**：显示目标文件中各段的大小（如 `.text`、`.data`、`.bss`），以及总大小。

#### 用法
```
cargo size [构建选项] [--] [size选项]
```

#### 常用选项
- `-A`：显示详细的段信息（类似 `size -A`）。
- `-B`：使用 Berkeley 格式输出（默认）。
- `-x`：以十六进制显示大小。
- `--totals`：显示所有段的总和。

#### 示例
- **默认输出**：
  ```bash
  cargo size --release
  ```
  输出：
  ```
  text    data     bss     dec     hex     filename
  1024     256       8    1288     508     target/release/app
  ```

- **详细段信息**：
  ```bash
  cargo size --release -- -A -x
  ```
  输出：
  ```
  section              size   addr
  .text               0x400  0x10000
  .data               0x100  0x20000
  .bss                 0x8   0x21000
  Total               0x508
  ```

- **指定目标架构**：
  ```bash
  cargo size --target thumbv7em-none-eabihf --release
  ```

#### 应用场景
- 检查程序是否超出嵌入式设备的闪存或 RAM 限制。
- 比较优化前后的二进制大小。

---

### 3. `cargo objdump`
**功能**：反汇编目标文件，查看汇编代码或机器码；也可以显示文件头信息等。

#### 用法
```
cargo objdump [构建选项] [--] [objdump选项]
```

#### 常用选项
- `--disassemble` 或 `-d`：反汇编所有可执行代码。
- `--disassemble-all` 或 `-D`：反汇编所有内容（包括数据段）。
- `--no-show-raw-insn`：隐藏原始机器码，仅显示汇编指令。
- `-h`：显示文件头信息。
- `-S`：将源代码与汇编代码混合显示（需要调试信息）。

#### 示例
- **反汇编代码**：
  ```bash
  cargo objdump --release -- --disassemble
  ```
  输出：
  ```
  00010000 <main>:
     10000:       push    {r7, lr}
     10002:       mov     r7, sp
     10004:       bl      0x10010 <some_function>
  ```

- **隐藏机器码**：
  ```bash
  cargo objdump --release -- -d --no-show-raw-insn
  ```
  输出：
  ```
  00010000 <main>:
      push    {r7, lr}
      mov     r7, sp
      bl      0x10010 <some_function>
  ```

- **显示文件头**：
  ```bash
  cargo objdump --release -- -h
  ```

#### 应用场景
- 调试低级代码，验证编译器生成的汇编是否符合预期。
- 分析性能瓶颈，检查指令序列。

---

### 4. `cargo objcopy`
**功能**：转换目标文件格式（如从 ELF 到二进制文件），或提取特定段。

#### 用法
```
cargo objcopy [构建选项] [--] [objcopy选项]
```

#### 常用选项
- `-O <FORMAT>`：指定输出格式（如 `binary`、`ihex`）。
- `--only-section <SECTION>`：仅提取指定段。
- `--output-target <FILE>`：指定输出文件（不推荐，建议直接用空格分隔输出文件名）。

#### 示例
- **转换为二进制文件**：
  ```bash
  cargo objcopy --release -- -O binary app.bin
  ```
  将 `target/release/app` 转换为 `app.bin`。

- **提取 .text 段**：
  ```bash
  cargo objcopy --release -- --only-section .text text.bin
  ```

- **生成 Intel HEX 格式**：
  ```bash
  cargo objcopy --release -- -O ihex app.hex
  ```

#### 应用场景
- 为嵌入式设备生成可烧录的二进制文件。
- 提取特定段用于分析或调试。

---

### 5. `cargo strip`
**功能**：去除目标文件中的符号信息和调试信息，减小文件体积。

#### 用法
```
cargo strip [构建选项] [--] [strip选项]
```

#### 常用选项
- `--strip-all` 或 `-s`：移除所有符号和调试信息。
- `--strip-unneeded`：移除不必要的符号。
- `-o <FILE>`：指定输出文件。

#### 示例
- **移除所有符号**：
  ```bash
  cargo strip --release -- --strip-all
  ```
  （默认覆盖原始文件）

- **保存到新文件**：
  ```bash
  cargo strip --release -- -o app-stripped
  ```

#### 应用场景
- 减小发布版本的二进制文件大小。
- 在嵌入式系统中节省存储空间。

---

## 高级用法

### 指定特定目标
对于多二进制项目或示例：
- **操作特定二进制**：
  ```bash
  cargo nm --bin my_app --release
  ```
- **操作示例**：
  ```bash
  cargo size --example my_example --release
  ```

### 交叉编译
在交叉编译时，需指定目标架构：
```bash
cargo objdump --target aarch64-unknown-linux-gnu --release -- -d
```

### 自定义工具链
如果使用非默认工具链，可以通过环境变量指定：
```bash
RUSTFLAGS="-C linker=arm-none-eabi-gcc" cargo size --target thumbv7em-none-eabihf --release
```

### 调试工具调用
使用 `--verbose` 查看底层命令：
```bash
cargo nm --release -v
```
输出可能包括：
```
Running `cargo build --release`
Running `rust-nm target/release/app`
```

---

## 实际案例分析

### 案例 1：嵌入式固件优化
假设你在开发一个微控制器程序，需要确保固件大小小于 32KB。
1. 检查大小：
   ```bash
   cargo size --target thumbv7em-none-eabihf --release -- -A -x
   ```
   输出显示 `.text` 占 0x8000（32KB），超出限制。
2. 查找大符号：
   ```bash
   cargo nm --release -- --print-size --size-sort
   ```
   发现 `large_function` 占用过多空间。
3. 优化后重新检查：
   ```bash
   cargo size --release -- -A -x
   ```

### 案例 2：调试崩溃
程序在特定地址崩溃，需要查看汇编：
```bash
cargo objdump --release -- -d --no-show-raw-insn > dump.txt
```
在 `dump.txt` 中查找对应地址的指令序列。

### 案例 3：生成固件
将程序转换为二进制文件并烧录：
```bash
cargo objcopy --release -- -O binary firmware.bin
```

---

## 注意事项与技巧
1. **工具选项传递**：所有 `--` 后的参数直接传递给 LLVM 工具，需参考 `rust-<工具> -help`。
2. **性能提示**：大型项目可能需要较长时间构建，建议搭配 `--release` 使用优化后的输出。
3. **错误排查**：如果工具未找到，检查 `llvm-tools-preview` 是否正确安装。

---

## 获取帮助
每个工具的具体选项可以通过以下方式查看：
```bash
rust-nm -help
rust-objdump -help
```
