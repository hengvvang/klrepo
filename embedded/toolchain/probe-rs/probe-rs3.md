## **1. 工具简介**

`probe-rs` 是一个强大的工具，支持以下功能：

- **探测**：列出当前可用的调试器、目标芯片。
- **烧录**：将固件文件（如 `.elf`、`.hex`）烧录到目标芯片。
- **调试**：通过启动 GDB 服务调试嵌入式程序。
- **存储操作**：直接读写目标芯片的内存。

支持的调试器包括：

- **ST-Link**（用于 STM32 系列）
- **J-Link**（支持广泛的 ARM 设备）
- **CMSIS-DAP**（如 DAPLink）

支持的通信协议：

- **SWD**（常见于 Cortex-M 内核）
- **JTAG**（较老设备常用）

### **安装**

```Bash
cargo install probe-rs-cli
```

验证安装：

```Bash
probe-rs --version
```

---

## **2. 所有命令与参数详解**

### **2.1 全局选项**

|参数|描述|
|-|-|
|`--help`|显示帮助信息。|
|`--version`|显示 `probe-rs` 当前版本。|
|`--log <level>`|设置日志级别（可选值：`off`, `error`, `warn`, `info`, `debug`, `trace`）。|
|`--chip <chip_name>`|指定目标芯片型号，例如 `STM32F401CE`。|
|`--protocol <protocol>`|指定通信协议，支持 `swd` 和 `jtag`。|
|`--probe <probe_id>`|指定使用的调试器，支持通过 `probe-rs list` 查看调试器编号。|
|`--connect-under-reset`|在复位状态下连接目标芯片（某些情况下避免芯片进入错误状态）。|
|`--speed <speed>`|设置通信速度（单位 kHz），例如 `4000` 表示 4 MHz。|


---

### **2.2 设备探测**

#### **2.2.1 列出可用调试器**

```Bash
probe-rs list
```

输出示例：

```Markdown
Available probes:
0: ST-Link (VID=0x0483, PID=0x3748, Serial=00300023A001)
1: J-Link (VID=0x1366, PID=0x0101, Serial=123456789)
```

**细节**：

- `VID` 和 `PID` 是 USB 设备的供应商和产品标识符。
- `Serial` 是调试器的唯一序列号。

#### **2.2.2 探测芯片信息**

```Markdown
probe-rs info --chip STM32F401CE
```

输出示例：

```C
Target chip: STM32F401CE
Available memory regions:
  FLASH: 0x08000000 - 0x08080000
  RAM:   0x20000000 - 0x20020000
Core: Cortex-M4
```

**细节**：

- `FLASH` 和 `RAM` 显示芯片的内存布局。
- `Core` 表示芯片的内核类型。

---

### **2.3 固件烧录**

#### **2.3.1 烧录固件**

```Bash
probe-rs flash --chip STM32F401CE --protocol swd --speed 4000 firmware.elf
```

**参数详解**：

- `--chip STM32F401CE`：指定目标芯片型号。
- `--protocol swd`：选择使用 SWD 协议。
- `--speed 4000`：设置通信速度为 4 MHz。
- `firmware.elf`：需要烧录的固件文件。

**执行细节**：

1. `probe-rs` 会先自动探测调试器。
2. 检查固件文件是否匹配目标芯片。
3. 写入固件到芯片的 FLASH 区域。

#### **2.3.2 擦除芯片存储**

```Markdown
probe-rs erase --chip STM32F401CE
```

**执行细节**：

- 此命令会完全擦除目标芯片的 FLASH 区域，但不会影响芯片的保护寄存器。

---

### **2.4 调试功能**

#### **2.4.1 启动 GDB 调试服务**

```Markdown
probe-rs debug --chip STM32F401CE --protocol swd --speed 4000
```

**默认行为**：

- 启动一个 GDB 服务监听在端口 `4444`。
- 可通过 `gdb-multiarch` 或 `arm-none-eabi-gdb` 连接。

#### **2.4.2 使用 GDB 客户端连接**

```Bash
gdb-multiarch firmware.elf
target remote :4444
```

**常用 GDB 命令**：

- `load`：将固件烧录到目标芯片。
- `monitor reset`：复位目标芯片。
- `continue` 或 `c`：继续运行程序。
- `break <location>`：设置断点，例如 `break main`。

#### **2.4.3 挂起目标运行**

```Markdown
probe-rs halt --chip STM32F401CE
```

#### **2.4.4 恢复运行**

```Bash
probe-rs resume --chip STM32F401CE
```

#### **2.4.5 复位芯片**

```Bash
probe-rs reset --chip STM32F401CE
```

---

### **2.5 内存操作**

#### **2.5.1 读取内存**

```Markdown
probe-rs read --chip STM32F401CE --address 0x20000000 --length 64
```

**参数详解**：

- `--address`：起始地址。
- `--length`：读取的字节数。

**输出示例**：

```Markdown
Read 64 bytes from 0x20000000:
00 11 22 33 44 55 66 77 88 99 AA BB CC DD EE FF
...
```

#### **2.5.2 写入内存**

```Markdown
probe-rs write --chip STM32F401CE --address 0x20000000 0x12 0x34 0x56 0x78
```

**执行细节**：

- `probe-rs` 会校验地址范围是否可写。
- 写入数据会直接反映在目标芯片内存中。

---

## **3. 完整使用流程**

以下是一个综合例子，详细展示如何用 `probe-rs` 完成调试任务。

### **3.1 准备调试器和芯片**

1. 列出所有调试器：

```text
probe-rs list
```

    确定调试器序列号，例如 `00300023A001`。
2. 探测芯片信息：

```Bash
probe-rs info --chip STM32F401CE
```

---

### **3.2 烧录固件**

1. 擦除芯片存储：

```Bash
probe-rs erase --chip STM32F401CE
```
2. 烧录固件：

```Markdown
probe-rs flash --chip STM32F401CE firmware.elf --log debug
```

---

### **3.3 调试程序**

1. 启动调试服务：

```Bash
probe-rs debug --chip STM32F401CE
```
2. 连接 GDB 客户端：

```Bash
gdb-multiarch firmware.elf
target remote :4444
```
3. 设置断点并运行：

```text
break main
continue
```

---

### **3.4 操作内存**

1. 读取 SRAM 数据：

```Markdown
probe-rs read --chip STM32F401CE --address 0x20000000 --length 16
```
2. 写入数据：

```Bash
probe-rs write --chip STM32F401CE --address 0x20000000 0x12 0x34 0x56
```

---

通过以上流程，您可以全面掌握 `probe-rs` 的功能，并高效执行嵌入式开发任务。若有进一步问题，欢迎随时提问！

### **3.5 高级使用案例**

以下是更复杂的 `probe-rs` 使用案例，涵盖多种场景下的详细操作。

---

#### **案例 1：多个调试器设备的并行管理**

如果同时连接了多个调试器（如 ST-Link 和 J-Link），可以通过 `--probe` 参数指定目标设备。

1. 列出所有可用调试器：

```Bash
probe-rs list
```

    假设输出如下：

```Markdown
Available probes:
0: ST-Link (VID=0x0483, PID=0x3748, Serial=00300023A001)
1: J-Link (VID=0x1366, PID=0x0101, Serial=123456789)
```
2. 指定使用 `J-Link` 进行烧录：

```Bash
probe-rs flash --chip STM32F401CE --probe 1 firmware.elf
```
3. 同时使用两个调试器（分别连接不同设备）：
    - 打开两个终端，分别运行以下命令：

```Markdown
probe-rs debug --chip STM32F401CE --probe 0
probe-rs debug --chip STM32F411RE --probe 1
```

---

#### **案例 2：高通信速度调试**

默认情况下，`probe-rs` 的通信速度会适配目标芯片的能力，但在某些情况下可以手动提高速度。

1. 设置通信速度为 10 MHz：

```Bash
probe-rs debug --chip STM32F401CE --speed 10000
```
2. 如果通信失败，可逐步降低速度（例如 4 MHz 或 2 MHz）：

```Bash
probe-rs debug --chip STM32F401CE --speed 4000
```

---

#### **案例 3：在复位状态下连接目标芯片**

有时目标芯片的运行状态可能导致调试器无法正常连接（例如陷入错误循环）。此时可以使用 `--connect-under-reset` 参数。

1. 在复位状态下连接芯片：

```Markdown
probe-rs debug --chip STM32F401CE --connect-under-reset
```
2. 使用 GDB 连接后，可以检查和修改程序的运行状态。

---

#### **案例 4：芯片特定的存储区域操作**

假设需要对 STM32F401 的特定存储区域进行操作（如 Option Bytes 或 Flash Controller 寄存器）。

1. **读取 Flash Controller 配置寄存器**：

```Markdown
probe-rs read --chip STM32F401CE --address 0x40023C00 --length 16
```

    输出示例：

```Markdown
Read 16 bytes from 0x40023C00:
01 23 45 67 89 AB CD EF 01 02 03 04 05 06 07 08
```
2. **修改寄存器值（写入 Option Bytes）**：

```Markdown
probe-rs write --chip STM32F401CE --address 0x40023C14 0x01 0x00
```
3. **检查写入是否成功**：

    再次读取地址 `0x40023C14` 的值，确认是否符合预期。

---

#### **案例 5：自动化工作流程**

使用 Shell 脚本将常用的 `probe-rs` 操作自动化，例如在 CI/CD 中的固件烧录。

1. 创建脚本 `burn_firmware.sh`：

```Bash
#!/bin/bash
set -e  # 遇到错误时停止脚本执行

# 固件路径
FIRMWARE="firmware.elf"

# 烧录流程
echo "擦除芯片存储..."
probe-rs erase --chip STM32F401CE

echo "烧录固件..."
probe-rs flash --chip STM32F401CE $FIRMWARE

echo "复位芯片..."
probe-rs reset --chip STM32F401CE

echo "烧录完成！"
```
2. 赋予脚本执行权限：

```Bash
chmod +x burn_firmware.sh
```
3. 执行脚本：

```Bash
./burn_firmware.sh
```

---

#### **案例 6：GDB 调试脚本的自动化**

通过 GDB 脚本快速执行调试任务。

1. 创建 GDB 脚本 `debug.gdb`：

```Toml
target remote :4444
monitor reset halt
load
break main
continue
```
2. 启动 GDB 并加载脚本：

```Bash
gdb-multiarch firmware.elf -x debug.gdb
```

---

## **4. 常见问题与解决方法**

### **4.1 调试器无法连接目标设备**

**问题原因**：

- 目标芯片未供电。
- 调试器未正确连接。
- 目标芯片处于错误状态。

**解决方法**：

1. 检查硬件连接（包括供电和信号线）。
2. 使用 `--connect-under-reset` 参数重新连接。

---

### **4.2 烧录固件失败**

**问题原因**：

- 固件格式不正确。
- 芯片的保护寄存器未解除。

**解决方法**：

1. 确保固件为 `.elf` 或 `.hex` 格式。
2. 检查芯片是否启用了读写保护。
3. 在烧录前执行擦除命令：

```Markdown
probe-rs erase --chip <chip_name>
```

---

### **4.3 GDB 连接失败**

**问题原因**：

- GDB 服务未启动。
- 端口冲突。

**解决方法**：

1. 确认 `probe-rs debug` 是否在运行。
2. 如果默认端口被占用，可以指定新的端口：

```Bash
probe-rs debug --chip STM32F401CE --port 5555
```

    然后在 GDB 中连接：

```Bash
target remote :5555
```
