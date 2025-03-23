`probe-rs-cli` 是一个功能强大的命令行工具，用于通过 JTAG 或 SWD 接口与嵌入式设备进行交互。它可以帮助开发者完成固件烧录、设备调试、内存读写、寄存器访问等操作。以下是 `probe-rs-cli` 工具的详细使用方法，包括所有可用的命令和参数，最后通过一个完整的使用流程展示其实际操作。

---

### **1. 安装 ****`probe-rs-cli`**

首先，确保你已经安装了 `probe-rs-cli`。可以通过 Cargo 安装：

```Rust
cargo install probe-rs-cli
```

安装完成后，使用 `probe-rs` 命令可以验证是否安装成功：

```Bash
probe-rs --version
```

---

### **2. ****`probe-rs-cli`**** 命令概述**

`probe-rs-cli` 的基本命令格式为：

```Markdown
probe-rs [options] [command] [subcommand] [arguments...]
```

常见命令包括：

- `list`：列出可用的调试器
- `info`：获取设备信息
- `flash`：烧录固件
- `read-memory`：读取内存
- `write-memory`：写入内存
- `run`：启动设备程序
- `halt`：暂停设备程序
- `regs`：查看寄存器
- `breakpoint`：设置断点

---

### **3. ****`probe-rs-cli`**** 命令及参数详解**

#### **3.1 ****`probe-rs list`** — 列出可用的调试器

此命令列出所有可用的调试器设备。

```Bash
probe-rs list
```

**参数：**

- `--probe <index>`：选择指定的调试器设备（通过其索引）。

**输出示例：**

```Markdown
Found 1 probe(s)
  0: ST-Link V2
```

---

#### **3.2 ****`probe-rs info`** — 获取设备信息

此命令显示目标设备的详细信息。

```Markdown
probe-rs --probe <index> info
```

**参数：**

- `--probe <index>`：指定调试器设备的索引。
- `--json`：以 JSON 格式输出信息。

**输出示例：**

```text
Probe information:
  ID: 1
  Type: ST-Link
  Device: STM32F103C8
  Interface: SWD
  Speed: 4000kHz
```

---

#### **3.3 ****`probe-rs flash`** — 烧录固件

该命令用于将固件烧录到目标设备。

```Markdown
probe-rs --probe <index> flash <firmware_file>
```

**参数：**

- `--probe <index>`：指定调试器设备的索引。
- `<firmware_file>`：需要烧录的固件文件路径。

**选项：**

- `--erase`：在烧录之前擦除设备的 flash 区域。
- `--verify`：烧录后验证固件的正确性。

**示例：**

```Bash
probe-rs --probe 0 flash firmware.bin --erase --verify
```

---

#### **3.4 ****`probe-rs read-memory`** — 读取内存

该命令用于读取目标设备的内存内容。

```Markdown
probe-rs --probe <index> read-memory <address> <size>
```

**参数：**

- `--probe <index>`：指定调试器设备的索引。
- `<address>`：开始读取的内存地址。
- `<size>`：要读取的内存大小（字节）。

**示例：**

```Bash
probe-rs --probe 0 read-memory 0x20000000 0x1000
```

此命令将从地址 `0x20000000` 开始读取 `0x1000` 字节的内存内容。

---

#### **3.5 ****`probe-rs write-memory`** — 写入内存

此命令将数据写入目标设备的内存。

```Markdown
probe-rs --probe <index> write-memory <address> <data_file>
```

**参数：**

- `--probe <index>`：指定调试器设备的索引。
- `<address>`：目标内存地址。
- `<data_file>`：包含要写入数据的文件路径。

**示例：**

```Markdown
probe-rs --probe 0 write-memory 0x20000000 data.bin
```

此命令会将 `data.bin` 文件中的数据写入 `0x20000000` 地址的内存。

---

#### **3.6 ****`probe-rs run`** — 启动设备程序

此命令启动目标设备上的程序。

```Markdown
probe-rs --probe <index> run
```

**参数：**

- `--probe <index>`：指定调试器设备的索引。

**示例：**

```Bash
probe-rs --probe 0 run
```

---

#### **3.7 ****`probe-rs halt`** — 暂停设备程序

此命令用于暂停正在运行的目标设备程序。

```Markdown
probe-rs --probe <index> halt
```

**参数：**

- `--probe <index>`：指定调试器设备的索引。

**示例：**

```Bash
probe-rs --probe 0 halt
```

---

#### **3.8 ****`probe-rs regs`** — 查看寄存器

该命令查看目标设备的寄存器值。

```Markdown
probe-rs --probe <index> regs
```

**参数：**

- `--probe <index>`：指定调试器设备的索引。

**示例：**

```Markdown
probe-rs --probe 0 regs
```

---

#### **3.9 ****`probe-rs breakpoint`** — 设置断点

该命令用于在目标程序中设置断点。

```Markdown
probe-rs --probe <index> breakpoint set <address>
```

**参数：**

- `--probe <index>`：指定调试器设备的索引。
- `<address>`：断点的内存地址。

**示例：**

```Bash
probe-rs --probe 0 breakpoint set 0x08008000
```

此命令将在地址 `0x08008000` 设置一个断点。

---

### **4. 完整使用流程：烧录、调试、查看和修改目标设备**

#### **步骤 1: 列出可用的调试器**

首先，使用 `list` 命令查找连接的调试器。

```Markdown
probe-rs list
```

假设返回如下输出，表示有一个 ST-Link 调试器连接：

```Markdown
Found 1 probe(s)
  0: ST-Link V2
```

#### **步骤 2: 获取目标设备信息**

使用 `info` 命令查看目标设备的详细信息。

```Bash
probe-rs --probe 0 info
```

输出可能类似：

```Markdown
Probe information:
  ID: 1
  Type: ST-Link
  Device: STM32F103C8
  Interface: SWD
  Speed: 4000kHz
```

#### **步骤 3: 烧录固件**

接下来，烧录固件到目标设备：

```text
probe-rs --probe 0 flash firmware.bin --erase --verify
```

此命令会擦除设备的 flash 区域，然后将 `firmware.bin` 烧录到设备，并验证烧录是否成功。

#### **步骤 4: 设置断点**

假设你需要调试烧录的程序并在某个位置设置断点，可以使用 `breakpoint` 命令：

```Markdown
probe-rs --probe 0 breakpoint set 0x08008000
```

该命令将在地址 `0x08008000` 设置一个断点。

#### **步骤 5: 启动程序**

设置完断点后，可以使用 `run` 命令启动目标程序：

```Bash
probe-rs --probe 0 run
```

#### **步骤 6: 暂停程序**

如果需要暂停程序执行，可以使用 `halt` 命令：

```text
probe-rs --probe 0 halt
```

#### **步骤 7: 查看寄存器**

在暂停程序后，可以查看寄存器的当前值：

```text
probe-rs --probe 0 regs
```

#### **步骤 8: 读取内存**

可以使用 `read-memory` 命令读取目标设备的内存内容：

```Markdown
probe-rs --probe 0 read-memory 0x20000000 0x1000
```

#### **步骤 9: 写入内存**

如果需要修改内存，可以使用 `write-memory` 命令：

```Bash
probe-rs --probe 0 write-memory 0x20000000 data.bin
```

---

### **5. 总结**

`probe-rs-cli` 提供了完整的调试功能，包括固件烧录、内存和寄存器操作、断点设置等。通过以下几个步骤，你可以实现一个完整的调试流程：

1. 列出可用调试器；
2. 获取

设备信息；

1. 烧录固件；
2. 设置断点；
3. 启动和暂停程序；
4. 查看和修改寄存器及内存。

这些命令和参数为嵌入式开发提供了极大的便利，使得调试过程更加高效和灵活。































了解，下面我将详细介绍 `probe-rs-cli` 的每一个命令及其参数，并通过一个完整的调试流程，详细展示如何使用每个命令和所有可选参数。

---

## **1. ****`probe-rs-cli`**** 命令详细介绍**

### **1.1 ****`probe-rs list`** — 列出可用的调试器

此命令用于列出连接到计算机上的所有调试器设备。它会扫描连接的调试器，并显示相关信息。

```Bash
probe-rs list
```

**参数：**

- `--json`：以 JSON 格式显示设备列表。这对于自动化脚本或需要进一步处理数据的场景很有用。

**输出示例：**

```Markdown
Found 1 probe(s):
  0: ST-Link V2
```

**详细解析：**

- **Found 1 probe(s):** 表示找到 1 个调试器。
- **0: ST-Link V2**：表示第一台调试器是 `ST-Link V2`，其编号为 0。

---

### **1.2 ****`probe-rs info`** — 获取设备信息

此命令用于获取与目标设备连接的调试器的信息。它会提供调试器的类型、连接的设备信息、接口类型和调试速度等详细信息。

```Markdown
probe-rs --probe <index> info
```

**参数：**

- `--probe <index>`：指定要操作的调试器的索引。`list` 命令会列出可用调试器及其索引。
- `--json`：以 JSON 格式显示设备信息，便于进一步处理和分析。

**输出示例：**

```Markdown
Probe information:
  ID: 1
  Type: ST-Link
  Device: STM32F103C8
  Interface: SWD
  Speed: 4000kHz
```

**详细解析：**

- **ID:** 调试器的唯一标识符。
- **Type:** 调试器的类型，这里是 `ST-Link`。
- **Device:** 目标设备的型号，例如 `STM32F103C8`。
- **Interface:** 连接目标设备的接口类型，可能是 `SWD`、`JTAG` 等。
- **Speed:** 调试器连接设备的速度，通常是以 kHz 为单位。

---

### **1.3 ****`probe-rs flash`** — 烧录固件

此命令用于将固件烧录到目标设备的 Flash 存储中。

```Bash
probe-rs --probe <index> flash <firmware_file> [options]
```

**参数：**

- `--probe <index>`：指定要操作的调试器的索引。
- `<firmware_file>`：要烧录的固件文件路径。固件应为二进制文件（如 `.bin` 或 `.hex` 格式）。
- `--erase`：在烧录固件前先擦除目标设备的 Flash 区域。
- `--verify`：烧录后验证固件是否正确烧录到设备中。
- `--start`：烧录完成后立即启动设备。
- `--no-verify`：如果你不希望进行烧录验证，可以禁用验证功能（默认会验证）。

**输出示例：**

```Bash
probe-rs --probe 0 flash firmware.bin --erase --verify
```

**详细解析：**

- **--erase**：会在烧录前擦除目标设备的 Flash 存储，防止烧录过程中出现冲突。
- **--verify**：在烧录完成后，工具会自动检查 Flash 区域是否与目标固件一致，确保没有错误发生。
- **--start**：该选项会在烧录完成后自动启动设备程序。通常用于烧录完成后无需手动启动程序。

---

### **1.4 ****`probe-rs read-memory`** — 读取内存

此命令用于从目标设备的内存中读取数据。

```Markdown
probe-rs --probe <index> read-memory <address> <size>
```

**参数：**

- `--probe <index>`：指定要操作的调试器的索引。
- `<address>`：要读取的内存地址（16 进制格式）。
- `<size>`：要读取的内存大小，单位为字节。

**输出示例：**

```Bash
probe-rs --probe 0 read-memory 0x20000000 0x1000
```

**详细解析：**

- **<address>**：目标内存的起始地址。`0x20000000` 是目标设备上的内存地址。
- **<size>**：读取的字节数，`0x1000` 表示读取 4 KB 的数据。

输出结果通常是读取到的内存数据的 16 进制值。

---

### **1.5 ****`probe-rs write-memory`** — 写入内存

此命令用于将数据写入目标设备的内存。

```Markdown
probe-rs --probe <index> write-memory <address> <data_file>
```

**参数：**

- `--probe <index>`：指定要操作的调试器的索引。
- `<address>`：要写入数据的目标内存地址。
- `<data_file>`：包含写入数据的文件路径。

**输出示例：**

```Bash
probe-rs --probe 0 write-memory 0x20000000 data.bin
```

**详细解析：**

- **<address>**：目标内存的起始地址，`0x20000000` 是目标设备的内存地址。
- **<data_file>**：要写入的数据文件，这个文件应为二进制格式，如 `data.bin`。数据会按文件中的内容写入内存。

---

### **1.6 ****`probe-rs run`** — 启动设备程序

该命令用于启动目标设备上已经烧录的程序。

```Bash
probe-rs --probe <index> run
```

**参数：**

- `--probe <index>`：指定要操作的调试器的索引。

**输出示例：**

```Markdown
probe-rs --probe 0 run
```

**详细解析：**

- **run**：会启动目标设备上已烧录的程序。通常用于在调试或烧录之后启动程序执行。

---

### **1.7 ****`probe-rs halt`** — 暂停设备程序

该命令用于暂停目标设备上的程序执行。

```Bash
probe-rs --probe <index> halt
```

**参数：**

- `--probe <index>`：指定要操作的调试器的索引。

**输出示例：**

```Bash
probe-rs --probe 0 halt
```

**详细解析：**

- **halt**：会暂停设备上的程序执行。此时，设备不会继续执行代码，通常用于调试。

---

### **1.8 ****`probe-rs regs`** — 查看寄存器值

此命令用于查看目标设备的寄存器值。

```Bash
probe-rs --probe <index> regs
```

**参数：**

- `--probe <index>`：指定要操作的调试器的索引。

**输出示例：**

```Bash
probe-rs --probe 0 regs
```

**详细解析：**

- **regs**：会列出目标设备中所有的寄存器值。输出通常包括 CPU 寄存器的名称和当前值。

---

### **1.9 ****`probe-rs breakpoint`** — 设置断点

该命令用于在目标设备程序中设置断点。

```Bash
probe-rs --probe <index> breakpoint set <address>
```

**参数：**

- `--probe <index>`：指定要操作的调试器的索引。
- `<address>`：断点的内存地址，通常是代码中的某个位置。

**输出示例：**

```Markdown
probe-rs --probe 0 breakpoint set 0x08008000
```

**详细解析：**

- **<address>**：指定断点的地址。设备程序将在该内存地址暂停执行，供调试使用。

---

## **2. 完整使用流程：调试、烧录、修改内存**

下面是一个完整的调试流程，详细展示如何使用 `probe-rs-cli` 各个命令及其参数。

### **步骤 1: 列出可用调试器**

首先，列出连接到计算机上的所有调试器设备：

```Bash
probe-rs list
```

**示例输出：**

```Markdown
Found 1 probe(s):
  0: ST-Link V2
```

### **步骤 2: 获取设备信息**

获取连接的调试器设备的详细信息：

```text
probe-rs --probe 0 info
```

**示例输出：**

```YAML
Probe information:
  ID: 1
  Type: ST-Link
  Device: STM32F103C8
  Interface: SWD
  Speed: 4000kHz
```

### **步骤 3: 烧录固件**

将固件 `firmware.bin` 烧录到目标设备，并在烧录前擦除设备的 Flash

  存储：

```Bash
probe-rs --probe 0 flash firmware.bin --erase --verify
```

### **步骤 4: 设置断点**

在程序的特定位置设置断点：

```Bash
probe-rs --probe 0 breakpoint set 0x08008000
```

### **步骤 5: 启动程序**

启动烧录的固件并开始执行：

```Bash
probe-rs --probe 0 run
```

### **步骤 6: 暂停程序**

如果程序运行到断点位置，使用 `halt` 暂停程序：

```Bash
probe-rs --probe 0 halt
```

### **步骤 7: 查看寄存器**

查看目标设备的寄存器值：

```TypeScript
probe-rs --probe 0 regs
```

### **步骤 8: 修改内存**

如果需要修改设备的内存内容，使用 `write-memory` 命令：

```Bash
probe-rs --probe 0 write-memory 0x20000000 data.bin
```

---

通过这种方式，你可以利用 `probe-rs-cli` 工具进行全面的设备调试，包括烧录、调试、内存操作、寄存器查看等功能。
