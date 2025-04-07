# probe-rs
> `probe-rs` 是一个用于嵌入式开发的调试和交互工具集，主要用于通过调试探针与微控制器（MCU）通信，支持 ARM 和 RISC-V 架构。

## 什么是 `probe-rs`？

`probe-rs` 是一个帮助开发者与嵌入式设备（比如微控制器）交互的工具箱。它可以用来烧录程序、调试代码、查看设备状态等。想象它是一个“桥梁”，连接你的电脑和硬件芯片，让你能轻松操作芯片上的程序。它支持多种调试探针，比如 ST-Link、J-Link 和 CMSIS-DAP，甚至可以用在支持 Rust、C 或其他语言开发的嵌入式项目中。

安装很简单，通常可以用 Rust 的包管理器 `cargo` 下载预编译版本，或者从源码编译。安装后，你可以通过命令行输入 `probe-rs --help` 查看所有可用功能。

---

## 常用功能概览


#### （1）列出连接的探针：`probe-rs list`

- **用途**：看看有哪些调试探针连到了你的电脑上。
- **怎么用**：直接输入 `probe-rs list`，它会返回一个列表，告诉你当前插了哪些探针，比如 ST-Link 或 J-Link，以及它们的编号。
- **场景**：如果你有多个探针，想确认哪个能用，或者插上探针后不确定电脑认没认出来，就用这个。
    ```
    D:\Repository> probe-rs list
    The following debug probes were found:
    [0]: STLink V2 -- 0483:3748:29001E00102D373637365744 (ST-LINK)
    ```

#### （2）查看探针和芯片信息：`probe-rs info`

- **用途**：获取当前探针和连接的芯片的详细信息。
- **怎么用**：输入 `probe-rs info`，如果有多个探针，可以加 `--probe VID:PID` 指定某个探针。
- **结果**：它会告诉你探针型号、芯片类型，甚至芯片的状态，比如内存访问是否正常。
- **场景**：想确认硬件连接是否正确，或者排查问题时需要更多细节。
    ```

    ```
#### （3）烧录程序：`probe-rs run`

- **用途**：把程序（比如编译好的 ELF 文件）烧到芯片上，然后运行它。
- **怎么用**：输入 `probe-rs run --chip 芯片型号 文件路径`，比如 `probe-rs run --chip nRF52840_xxAA ./my_program.elf`。
- **特点**：它会自动擦除芯片上的旧数据、烧录新程序，还能显示程序运行时的日志（如果用了 RTT 或 defmt）。
- **场景**：开发时快速测试代码，相当于 Rust 项目中的 `cargo run`，非常方便。

#### （4）只烧录不运行：`probe-rs download`

- **用途**：把程序文件烧到芯片上，但不启动。
- **怎么用**：类似 `probe-rs download --chip 芯片型号 文件路径`，可以指定格式（比如 ELF 或二进制文件）。
- **场景**：只想更新芯片上的固件，但暂时不运行，或者需要手动启动。

#### （5）调试现有程序：`probe-rs attach`

- **用途**：连接到芯片上正在运行的程序，查看它的状态。
- **怎么用**：输入 `probe-rs attach --chip 芯片型号`，它不会重置芯片，而是直接“窥探”当前运行情况。
- **场景**：芯片已经在跑程序，你想检查它在干嘛，或者接管调试。

#### （6）擦除芯片：`probe-rs erase`

- **用途**：清空芯片上的非易失性存储（比如 Flash）。
- **怎么用**：输入 `probe-rs erase --chip 芯片型号`，简单粗暴。
- **场景**：在烧新程序前清空旧数据，或者芯片状态异常需要重置。

#### （7）重启芯片：`probe-rs reset`

- **用途**：让芯片重新启动。
- **怎么用**：输入 `probe-rs reset --chip 芯片型号`，相当于按下硬件复位键。
- **场景**：程序跑飞了，或者想从头开始运行。

#### （8）命令行调试：`probe-rs debug`

- **用途**：进入一个简单的交互式调试模式。
- **怎么用**：输入 `probe-rs debug --chip 芯片型号`，然后可以用命令查看内存、设置断点等。
- **场景**：适合喜欢命令行操作的人，手动调试代码。

#### （9）运行 GDB 服务器：`probe-rs gdb`

- **用途**：启动一个 GDB 服务器，让你用 GDB 调试芯片。
- **怎么用**：输入 `probe-rs gdb --chip 芯片型号`，默认端口是 1337，然后用 GDB 客户端连接。
- **场景**：如果你习惯用 GDB 调试嵌入式程序，这个很实用。

#### （10）跟踪内存：`probe-rs trace`

- **用途**：实时监控芯片上某个内存地址的变化。
- **怎么用**：输入 `probe-rs trace --chip 芯片型号 --address 地址`，比如 `0x20000000`。
- **场景**：想观察某个变量或寄存器在运行时的变化。

#### （11）读取内存：`probe-rs read`

- **用途**：从芯片的某个地址读取数据。
- **怎么用**：输入 `probe-rs read --chip 芯片型号 --address 地址 --length 长度`，比如读取 32 字节。
- **场景**：检查芯片内存里存了什么。

#### （12）写入内存：`probe-rs write`

- **用途**：往芯片的某个地址写入数据。
- **怎么用**：输入 `probe-rs write --chip 芯片型号 --address 地址 数据`，数据可以是数字或字节。
- **场景**：手动修改内存内容，比如测试或修补程序。

#### （13）性能测试：`probe-rs benchmark`

- **用途**：测试探针的数据传输速度。
- **怎么用**：输入 `probe-rs benchmark --chip 芯片型号`，它会告诉你每秒能传多少数据。
- **场景**：想知道你的探针有多快，或者对比不同探针的性能。

#### （14）分析程序性能：`probe-rs profile`

- **用途**：分析芯片上程序的运行性能。
- **怎么用**：输入 `probe-rs profile --chip 芯片型号 文件路径`，需要 ELF 文件。
- **场景**：优化代码时，找出哪些部分跑得慢。

---

### 3. 配合 Cargo 使用

`probe-rs` 提供了几个与 Rust 的 `cargo` 集成的工具，特别适合 Rust 开发者：

- **`cargo-flash`**：只负责烧录程序。用法是 `cargo flash --chip 芯片型号`，直接把项目编译并烧录。
- **`cargo-embed`**：功能更丰富，除了烧录，还支持 RTT 日志、GDB 调试等。用法是 `cargo embed --chip 芯片型号`。
- **设置 runner**：可以在项目的 `.cargo/config.toml` 文件中加一行，比如 `runner = "probe-rs run --chip nRF52840_xxAA"`，之后用 `cargo run` 就能自动烧录和运行。

这些工具让 Rust 的嵌入式开发像写普通程序一样简单。

---

### 4. 实际使用小贴士

- **指定探针**：如果插了多个探针，可以用 `--probe VID:PID` 指定，比如 `--probe 0483:374b`。
- **查看帮助**：每个子命令后加 `--help`，比如 `probe-rs run --help`，能看到详细用法。
- **日志调试**：加环境变量 `RUST_LOG=debug probe-rs ...` 可以输出更多调试信息。
- **芯片支持**：用 `probe-rs list-chips` 查看支持的芯片型号，如果你的不在列表里，可能需要更新版本或提 issue。

---

### 5. 典型使用场景举例

- **快速测试代码**：写好 Rust 代码后，`cargo run`（假设配置了 runner），程序直接烧到芯片上，日志实时显示。
- **调试问题**：用 `probe-rs gdb` 启动 GDB 服务器，然后用 GDB 单步执行，找出代码bug。
- **清空重来**：芯片跑乱了，先 `probe-rs erase`，再 `probe-rs run` 烧新程序。
- **检查状态**：用 `probe-rs info` 和 `probe-rs read` 查看芯片当前情况。

---

### 6. 注意事项

- **权限问题**：在 Linux 上，可能需要设置 udev 规则或用 `sudo`，不然探针可能连不上。
- **芯片型号**：每次命令都要指定 `--chip`，不然它不知道你要操作哪个芯片。
- **探针兼容性**：不是所有探针都完美支持，遇到问题可以去 GitHub 上反馈。

---


### 1. 安装与准备

在介绍具体指令之前，需要确保你已经安装了 probe-rs。通常可以通过以下方式安装：

- 使用预编译版本：从 GitHub Releases 下载。
- 通过 Rust 的 Cargo 安装最新发布版本：

```Bash
cargo install probe-rs-tools --locked
```
- 或安装开发版本：

```Bash
cargo install probe-rs-tools --git https://github.com/probe-rs/probe-rs --locked
```

安装完成后，主要的可执行工具包括 `probe-rs`（核心命令行工具）、`cargo-flash` 和 `cargo-embed`，这些工具都可以通过命令行调用。

---

### 2. 核心命令：probe-rs

`probe-rs` 是 probe-rs 的主要命令行工具，提供多个子命令用于不同的功能。以下是其主要子命令及其用途：

#### (1) `probe-rs run`

- **用途**：运行并调试嵌入式目标上的程序。
- **功能**：将目标程序烧录到设备，启动运行，并通过 RTT（实时终端）或 defmt 输出日志。
- **常用选项**：
    - `--chip <芯片型号>`：指定目标芯片，例如 `nRF52840_xxAA`。
    - `<路径>`：指定要运行的二进制文件（如 ELF 文件）。
- **示例**：

```Bash
probe-rs run --chip nRF52840_xxAA ./target/thumbv7em-none-eabihf/release/my_program
```

    这会擦除芯片相关区域、烧录程序、运行并显示日志。

#### (2) `probe-rs attach`

- **用途**：连接到正在运行的目标设备进行调试，不重置或重新烧录。
- **功能**：适合调试已经在运行的程序，保留当前状态。
- **常用选项**：
    - `--chip <芯片型号>`：指定目标芯片。
- **示例**：

```Markdown
probe-rs attach --chip nRF52840_xxAA
```

#### (3) `probe-rs download`

- **用途**：仅将程序烧录到目标设备，不运行。
- **功能**：用于快速更新固件。
- **常用选项**：
    - `--chip <芯片型号>`：指定芯片。
    - `--format <格式>`：指定文件格式（如 `elf`、`bin`）。
    - `<路径>`：固件文件路径。
- **示例**：

```Bash
probe-rs download --chip nRF52840_xxAA --format elf ./my_program.elf
```

#### (4) `probe-rs erase`

- **用途**：擦除目标芯片的闪存。
- **功能**：支持全片擦除或特定区域擦除。
- **常用选项**：
    - `--chip <芯片型号>`。
    - `--all`：擦除整个芯片。
- **示例**：

```Markdown
probe-rs erase --chip nRF52840_xxAA --all
```

#### (5) `probe-rs reset`

- **用途**：重置目标设备。
- **功能**：执行硬件或软件重置。
- **常用选项**：
    - `--chip <芯片型号>`。
- **示例**：

```Bash
probe-rs reset --chip nRF52840_xxAA
```

#### (6) `probe-rs list`

- **用途**：列出所有连接的调试探针。
- **功能**：帮助用户确认可用设备。
- **示例**：

```Bash
probe-rs list
```

    输出可能显示类似于 J-Link 或 ST-Link 的探针信息。

#### (7) `probe-rs dap-server`

- **用途**：启动一个调试适配器协议（DAP）服务器。
- **功能**：允许 VS Code 等 IDE 通过 DAP 协议连接并调试。
- **常用选项**：
    - `--chip <芯片型号>`。
    - `--port <端口>`：指定服务器端口，默认是 50000。
- **示例**：

```Markdown
probe-rs dap-server --chip nRF52840_xxAA --port 50000
```

#### (8) `probe-rs gdb`

- **用途**：启动 GDB 服务器。
- **功能**：允许使用 GDB 客户端连接到目标设备进行调试。
- **常用选项**：
    - `--chip <芯片型号>`。
    - `--port <端口>`：默认 1337。
- **示例**：

```Markdown
probe-rs gdb --chip nRF52840_xxAA
```

#### (9) `probe-rs info`

- **用途**：显示目标芯片的信息。
- **功能**：包括芯片型号、内存映射等。
- **常用选项**：
    - `--chip <芯片型号>`。
- **示例**：

```Bash
probe-rs info --chip nRF52840_xxAA
```

#### (10) `probe-rs help`

- **用途**：显示帮助信息。
- **功能**：列出所有子命令或某个子命令的详细用法。
- **示例**：

```Markdown
probe-rs help
```

    或：

```Bash
probe-rs run --help
```

---

### 3. Cargo 集成工具

probe-rs 提供了与 Cargo 集成的工具，简化 Rust 项目的开发流程。

#### (1) `cargo flash`

- **用途**：将编译后的 Rust 程序烧录到目标设备。
- **功能**：类似 `probe-rs download`，但作为 Cargo 子命令使用。
- **常用选项**：
    - `--chip <芯片型号>`。
    - `--release`：使用发布模式编译。
- **示例**：

```Rust
cargo flash --chip nRF52840_xxAA --release
```

#### (2) `cargo embed`

- **用途**：烧录并运行程序，提供完整的 RTT 终端。
- **功能**：支持日志输出和多通道 RTT。
- **常用选项**：
    - `--chip <芯片型号>`。
    - `--release`。
- **示例**：

```Markdown
cargo embed --chip nRF52840_xxAA --release
```

#### 配置 Cargo Runner

你可以在项目的 `.cargo/config.toml` 中设置 `probe-rs run` 作为默认 runner：

```Rust
[target.'cfg(target_arch = "arm")']
runner = "probe-rs run --chip nRF52840_xxAA"
```

之后直接运行 `cargo run` 即可烧录并调试。

---

### 4. 常见选项与参数

以下是许多子命令通用的选项：

- `--chip <型号>`：指定目标芯片型号（如 `nRF52840_xxAA`、`STM32F103C8`）。
- `--probe <VID:PID>`：指定调试探针（当有多个探针时）。
- `--protocol <协议>`：选择调试协议（如 `swd` 或 `jtag`），默认是 SWD。
- `--speed <频率>`：设置调试速度（单位 kHz）。
- `--connect-under-reset`：在复位状态下连接目标。

---

### 5. 调试与扩展

- **VS Code 集成**：probe-rs 提供 VS Code 扩展，支持图形化调试。需要在 `launch.json` 中配置芯片型号和探针。
- **RTT 和 defmt**：通过 `cargo embed` 或 `probe-rs run` 获取实时日志，需要在固件中集成相关库。
- **自定义目标**：如果芯片不在支持列表中，可以使用 `target-gen` 从 CMSIS-Pack 生成目标描述，或手动编写闪存算法。

---

### 6. 注意事项

- **探针支持**：probe-rs 支持 CMSIS-DAP、J-Link、ST-Link 和 FTDI 等探针，Linux 下可能需要配置 udev 规则，Windows 下可能需要用 Zadig 安装 WinUSB 驱动。
- **芯片支持**：支持数百种 ARM 和 RISC-V 芯片，具体型号可查阅官方文档或 `probe-rs info` 输出。

---

### 总结

probe-rs 提供了从固件烧录到调试的完整工具链，主要通过 `probe-rs` 的子命令和 `cargo flash`、`cargo embed` 与 Rust 生态集成。常用的核心指令包括 `run`、`attach`、`download`、`erase` 等，配合丰富的选项，能满足大多数嵌入式开发需求。如果你需要更详细的某条指令说明，可以告诉我，我再深入展开！



好的，我将对 `probe-rs` 的所有指令进行更详细、条理更清晰的介绍，内容将更加全面且结构化，确保涵盖其核心功能、使用场景、参数选项及实用示例。我会从工具的总体概览开始，逐步深入到每个子命令的具体细节，并补充更多背景信息和实际应用建议。

---

## probe-rs 指令全览与详解

### 一、什么是 probe-rs？

`probe-rs` 是一个开源的嵌入式开发工具集，由 Rust 语言开发，旨在为 ARM 和 RISC-V 微控制器提供高效的调试和固件烧录支持。它通过调试探针（如 J-Link、ST-Link、CMSIS-DAP 等）与目标设备交互，适用于嵌入式开发者，特别是使用 Rust 语言的开发者。工具集包括：

- **核心 CLI 工具**：`probe-rs`，提供多个子命令。
- **Cargo 集成工具**：`cargo-flash` 和 `cargo-embed`，简化 Rust 项目工作流。
- **扩展功能**：支持 GDB、DAP 服务器、RTT 日志等。

**当前版本**（截至 2025 年 3 月 6 日）：基于最新稳定版（例如 v0.24.0），具体版本可能因更新而变化，可通过 `probe-rs --version` 检查。

---

### 二、安装与环境准备

在使用指令之前，需要安装 probe-rs。以下是安装方式：

1. **通过 Cargo 安装稳定版**：

```Rust
cargo install probe-rs-tools --locked
```
2. **安装开发版**：

```Bash
cargo install probe-rs-tools --git https://github.com/probe-rs/probe-rs --locked
```
3. **预编译二进制**：从 [GitHub Releases](https://github.com/probe-rs/probe-rs/releases) 下载对应平台的二进制文件。

**依赖**：

- Rust 工具链（建议使用最新稳定版）。
- 调试探针的驱动（如 J-Link 的 Segger 驱动或 ST-Link 的 libusb 驱动）。
- Linux 下可能需要配置 udev 规则，Windows 下可能需要 Zadig 安装 WinUSB 驱动。

安装完成后，运行 `probe-rs --version` 确认工具可用。

---

### 三、核心工具：`probe-rs` 的子命令

`probe-rs` 是主要命令行工具，通过子命令实现不同功能。以下按功能分类详细介绍每个子命令。

#### 1. 设备管理相关

##### (1) `probe-rs list`

- **用途**：列出所有连接的调试探针。
- **功能**：检测并显示探针的 VID:PID、序列号和类型，帮助用户确认可用设备。
- **参数**：无额外选项。
- **输出示例**：

```Bash
$ probe-rs list
The following debug probes were found:
[0]: J-Link (VID: 1366, PID: 0101, Serial: 123456789)
[1]: ST-Link V2 (VID: 0483, PID: 3748, Serial: ABCDEF123456)
```
- **使用场景**：多探针环境下选择正确设备。

##### (2) `probe-rs info`

- **用途**：显示目标芯片的详细信息。
- **功能**：输出芯片型号、内存映射、内核架构等。
- **常用参数**：
    - `--chip <型号>`：指定目标芯片。
    - `--probe <VID:PID>`：指定探针。
- **示例**：

```Markdown
probe-rs info --chip STM32F103C8
```

    输出可能包括：

```Markdown
Chip: STM32F103C8
Cores: 1 (ARM Cortex-M3)
Flash: 64 KiB
RAM: 20 KiB
```
- **使用场景**：验证芯片配置是否正确。

#### 2. 固件操作相关

##### (3) `probe-rs download`

- **用途**：将固件烧录到目标设备。
- **功能**：支持多种格式（如 ELF、BIN），仅烧录不运行。
- **常用参数**：
    - `--chip <型号>`：目标芯片。
    - `--format <格式>`：文件格式（`elf`、`bin`、`hex`）。
    - `--path <路径>`：固件文件路径。
    - `--no-verify`：跳过烧录校验。
- **示例**：

```Bash
probe-rs download --chip nRF52832_xxAA --format elf --path ./target/my_program.elf
```
- **使用场景**：快速更新固件而不启动。

##### (4) `probe-rs erase`

- **用途**：擦除目标芯片的闪存。
- **功能**：支持全片擦除或指定区域擦除。
- **常用参数**：
    - `--chip <型号>`。
    - `--all`：擦除整个闪存。
    - `--sector <地址>`：擦除特定扇区（需查阅芯片手册）。
- **示例**：

```Markdown
probe-rs erase --chip nRF52832_xxAA --all
```
- **使用场景**：准备新固件烧录前清空闪存。

##### (5) `probe-rs reset`

- **用途**：重置目标设备。
- **功能**：支持硬件复位（通过探针）或软件复位。
- **常用参数**：
    - `--chip <型号>`。
    - `--hardware`：强制硬件复位。
- **示例**：

```Bash
probe-rs reset --chip STM32F103C8 --hardware
```
- **使用场景**：恢复设备到初始状态。

#### 3. 运行与调试相关

##### (6) `probe-rs run`

- **用途**：烧录并运行程序。
- **功能**：擦除、烧录、启动程序，并支持 RTT 或 defmt 日志输出。
- **常用参数**：
    - `--chip <型号>`。
    - `--path <路径>`：ELF 文件路径。
    - `--no-halt`：启动后不暂停（默认暂停以便调试）。
- **示例**：

```Bash
probe-rs run --chip nRF52840_xxAA --path ./target/thumbv7em-none-eabihf/release/app
```

    输出可能显示 RTT 日志：

```text
[INFO] Hello from RTT!
```
- **使用场景**：开发中快速测试程序。

##### (7) `probe-rs attach`

- **用途**：连接到运行中的目标设备。
- **功能**：不重置或烧录，直接调试当前状态。
- **常用参数**：
    - `--chip <型号>`。
    - `--speed <kHz>`：调试速度。
- **示例**：

```Markdown
probe-rs attach --chip STM32F103C8
```
- **使用场景**：调试已部署的设备。

#### 4. 调试服务器相关

##### (8) `probe-rs gdb`

- **用途**：启动 GDB 服务器。
- **功能**：允许使用 GDB 客户端（如 `arm-none-eabi-gdb`）连接调试。
- **常用参数**：
    - `--chip <型号>`。
    - `--port <端口>`：默认 1337。
- **示例**：

```Markdown
probe-rs gdb --chip nRF52840_xxAA --port 1337
```

    然后在另一终端运行：

```Bash
arm-none-eabi-gdb -q ./target/app.elf -x "target remote :1337"
```
- **使用场景**：需要 GDB 的高级调试功能。

##### (9) `probe-rs dap-server`

- **用途**：启动 DAP（调试适配器协议）服务器。
- **功能**：支持 VS Code、CLion 等 IDE 通过 DAP 协议调试。
- **常用参数**：
    - `--chip <型号>`。
    - `--port <端口>`：默认 50000。
- **示例**：

```Bash
probe-rs dap-server --chip STM32F103C8 --port 50000
```
- **使用场景**：在 IDE 中进行图形化调试。

#### 5. 帮助与信息

##### (10) `probe-rs help`

- **用途**：查看帮助信息。
- **功能**：显示所有子命令或某个子命令的详细用法。
- **示例**：

```text
probe-rs help
```

    或：

```Markdown
probe-rs run --help
```
- **使用场景**：快速了解命令用法。

---

### 四、Cargo 集成工具

probe-rs 与 Rust 的 Cargo 工具链深度集成，提供以下子命令：

#### 1. `cargo flash`

- **用途**：编译并烧录 Rust 项目。
- **功能**：类似 `probe-rs download`，但自动处理编译。
- **常用参数**：
    - `--chip <型号>`。
    - `--release`：使用发布模式。
    - `--example <名称>`：烧录特定示例。
- **示例**：

```Rust
cargo flash --chip nRF52840_xxAA --release
```
- **使用场景**：Rust 项目快速部署。

#### 2. `cargo embed`

- **用途**：编译、烧录并运行程序，提供 RTT 终端。
- **功能**：支持实时日志输出。
- **常用参数**：
    - `--chip <型号>`。
    - `--release`。
    - `--features <特性>`：启用特定 Cargo 特性。
- **示例**：

```Rust
cargo embed --chip STM32F103C8 --release
```
- **使用场景**：开发中实时监控程序输出。

#### 配置 Runner

在 `.cargo/config.toml` 中添加：

```YAML
[target.'cfg(target_arch = "arm")']
runner = "probe-rs run --chip nRF52840_xxAA"
```

然后直接运行 `cargo run` 即可烧录并调试。

---

### 五、通用的参数与选项

以下选项适用于大多数子命令：

- `--chip <型号>`：指定芯片，如 `nRF52840_xxAA`、`STM32F103C8`。
- `--probe <VID:PID>`：指定探针，如 `1366:0101`。
- `--protocol <协议>`：调试协议（`swd` 或 `jtag`，默认 `swd`）。
- `--speed <kHz>`：调试速度，默认自适应。
- `--connect-under-reset`：在复位下连接，解决某些设备连接问题。
- `--log <级别>`：设置日志级别（如 `info`、`debug`）。

---

### 六、调试与扩展功能

#### 1. RTT 与 defmt 支持

- **RTT（实时终端）**：通过 `probe-rs run` 或 `cargo embed` 输出实时日志，需在固件中使用 `rtt-target` 库。
- **defmt**：更高效的日志格式，需启用 `defmt-rtt` 和 `panic-probe`。

#### 2. VS Code 集成

- 安装 `probe-rs` VS Code 扩展。
- 配置 `launch.json`：

```JSON
{
    "type": "probe-rs-debug",
    "request": "launch",
    "chip": "nRF52840_xxAA",
    "programBinary": "${workspaceFolder}/target/app.elf"
}
```

#### 3. 自定义目标支持

- 使用 `target-gen` 从 CMSIS-Pack 生成目标定义。
- 手动编写 YAML 文件和闪存算法（参考官方文档）。

---

### 七、常见问题与注意事项

1. **探针兼容性**：
    - 支持 J-Link、ST-Link、CMSIS-DAP、FTDI 等。
    - Linux 下运行 `sudo probe-rs list` 检查权限。
2. **芯片支持**：
    - 覆盖主流 ARM Cortex-M 和 RISC-V 芯片，完整列表见 [probe-rs 芯片支持](https://probe.rs/docs/chips/)。
3. **性能优化**：
    - 使用 `--speed` 调整调试速度。
    - 启用 `--no-verify` 加快烧录。

---

### 八、总结

`probe-rs` 提供了从设备检测（`list`）、固件管理（`download`、`erase`）、运行调试（`run`、`attach`）到高级调试（`gdb`、`dap-server`）的全套工具链。通过与 Cargo 的集成（`cargo flash`、`cargo embed`），它特别适合 Rust 嵌入式开发。每个子命令功能明确，配合灵活的参数选项，能满足初学者到高级开发者的需求。
