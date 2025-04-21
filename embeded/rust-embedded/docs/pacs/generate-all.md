# Use Scripts
下面我将详细介绍 `stm32-rs` 这个 GitHub 库的内容、各个部分之间的关系，以及如何生成 STM32 微控制器的 Peripheral Access Crates (PACs)。我会按照文档的结构逐步展开，并特别详细说明生成 PAC 的每个步骤。

---

### 一、`stm32-rs` 库的概述

`stm32-rs` 是一个为 STM32 微控制器提供 Rust 设备支持的开源项目。它通过使用 `svd2rust` 工具和社区维护的 SVD (System View Description) 文件补丁，生成一系列 Peripheral Access Crates (PACs)，为所有 STM32 设备提供安全的硬件外设访问 API。

#### 核心目标
1. **提供高质量的 SVD 文件**：修复 ST 官方 SVD 文件中的错误和不一致性，使其适用于 `svd2rust` 或其他工具。
2. **生成并发布 PACs**：为所有 STM32 微控制器生成并发布基于 `svd2rust` 的 Rust crate，减少社区中重复的工作。

#### 关键特点
- 每个 STM32 设备家族（如 `stm32f4`、`stm32h7` 等）对应一个 crate。
- 每个 crate 中通过 feature 标志支持具体的设备型号（如 `stm32f405`）。
- 项目提供“Nightly”版本，包含最新补丁和更新。
- 使用 Apache-2.0 和 MIT 双重许可。

---

### 二、库的内容与关系

#### 1. 主要目录和文件
- **`svd/vendor/`**: 存储 ST 官方提供的原始 SVD 压缩文件。
- **`svd/`**: 提取和修补后的 SVD 文件存放目录。
- **`devices/patches/`**: 针对外设的通用补丁（YAML 格式），避免重复定义。
- **`devices/fields/`**: 外设寄存器字段的详细描述（可选），提供类型安全的枚举值。
- **`devices/collect/`**: 用于收集数组、集群和派生信息，减少重复。
- **`devices/`**: 包含每个设备的 YAML 文件，定义 SVD 文件路径和特定补丁。
- **`stm32*/`**: 生成的 PAC 代码目录（如 `stm32f4`、`stm32h7` 等）。
- **`scripts/`**: 包含生成工具脚本，如 `makecrates.py` 和 `matchperipherals.py`。
- **`Makefile`**: 自动化构建流程的主要工具。

#### 2. 内容之间的关系
- **SVD 文件来源**：从 `svd/vendor/` 中的 ST 官方压缩文件提取到 `svd/`。
- **补丁应用**：`devices/patches/` 和 `devices/` 中的 YAML 文件用于修补 `svd/` 中的 SVD 文件。
- **字段增强**：`devices/fields/` 和 `devices/collect/` 提供可选的字段描述和结构化数据。
- **PAC 生成**：修补后的 SVD 文件通过 `svd2rust` 生成 `stm32*/` 中的 Rust 代码。
- **构建流程**：`Makefile` 和 `scripts/` 中的工具协调整个过程。

整个流程是一个从原始 SVD 到最终 PAC 的流水线，补丁和字段增强是可选的优化步骤。

---

### 三、在项目中使用 `stm32-rs` 的 PAC

#### 1. 稳定版
在 `Cargo.toml` 中添加依赖：
```toml
[dependencies.stm32f4]
version = "0.15.1"
features = ["stm32f405", "rt"]
```
- `stm32f4` 是设备家族，`stm32f405` 是具体型号。
- `rt` 是一个可选功能，参见 `svd2rust` 文档。

代码示例：
```rust
use stm32f4::stm32f405;

let mut peripherals = stm32f405::Peripherals::take().unwrap();
```

#### 2. Nightly 版
使用最新构建：
```toml
[dependencies.stm32f4]
git = "https://github.com/stm32-rs/stm32-rs-nightlies"
features = ["stm32f405", "rt"]
```

---

### 四、生成 PAC 库的详细流程

生成 PAC 的过程涉及多个步骤，从提取 SVD 文件到生成最终的 Rust 代码。以下是每个环节的详细说明。

#### 1. 前置条件
需要安装以下工具：
- **`svd2rust`**（版本 0.36.0）：将 SVD 文件转换为 Rust 代码。
- **`svdtools`**（版本 0.4.5）：修补 SVD 文件。
- **`form`**（版本 0.12.1）：格式化生成的 Rust 代码。
- **`rustfmt`**：Rust 代码格式化工具，通过 `rustup component add rustfmt` 安装。

安装方法：
- Linux x86-64：运行 `make install` 下载预构建二进制。
- 其他系统：使用 `cargo install` 手动安装，确保版本匹配。

#### 2. 完整流程图
```
ST 官方 SVD 压缩文件 (svd/vendor/)
    |
    | (make extract)
    ↓
提取后的 SVD 文件 (svd/*.svd)
    |
    |+ 设备补丁 (devices/) + 外设补丁 (devices/patches/) + 字段描述 (devices/fields/)
    |← (make patch, 使用 svdtools)
    ↓
修补后的 SVD 文件 (svd/*.svd.patched)
    |
    |  ← (make svd2rust, 使用 svd2rust)
    ↓
生成的 PAC 代码 (stm32*/)
    |
    | ← (make form, 使用 form 和 rustfmt)
    ↓
格式化后的 PAC 代码 (stm32*/)
```

#### 3. 详细步骤

##### 步骤 1：提取 SVD 文件 (`make extract`)
- **输入**：`svd/vendor/` 中的 ST 官方 SVD 压缩文件（如 ZIP 格式）。
- **操作**：`Makefile` 调用解压命令，将 SVD 文件解压到 `svd/` 目录。
- **输出**：`svd/` 中出现未修补的 `.svd` 文件。
- **细节**：
  - 如果 `svd/vendor/` 中有新的压缩文件，需手动更新。
  - 提取过程不涉及任何修改，仅解压。

##### 步骤 2：修补 SVD 文件 (`make patch`)
- **输入**：
  - `svd/` 中的原始 SVD 文件。
  - `devices/` 中的设备特定 YAML 文件（如 `stm32f405.yaml`）。
  - `devices/patches/` 中的外设通用补丁。
  - `devices/fields/` 和 `devices/collect/` 中的可选增强数据。
- **操作**：
  - 使用 `svdtools` 根据 YAML 文件修补 SVD。
  - YAML 文件指定 SVD 文件路径和补丁内容（如重命名字段、合并寄存器）。
  - 通用外设补丁（如 RCC、GPIO）从 `devices/patches/` 引入。
- **输出**：`svd/` 中生成修补后的 `.svd` 文件。
- **细节**：
  - 运行 `make patch -j` 可并行处理多个文件，提升效率。
  - 如果需要新设备支持，需在 `devices/` 中添加 YAML 文件。
  - 示例 YAML（简略）：
    ```yaml
    svd: "svd/stm32f405.svd"
    patches:
      - path: "devices/patches/rcc.yaml"
    ```

##### 步骤 3：生成 PAC 代码 (`make svd2rust`)
- **输入**：`svd/` 中的修补后 SVD 文件。
- **操作**：
  - 使用 `svd2rust` 将每个 SVD 文件转换为 Rust 代码。
  - 根据 `devices/` 和 `stm32_part_table.yaml` 配置 feature 标志。
  - `scripts/makecrates.py` 脚本生成每个家族的 crate 结构。
- **输出**：`stm32*/` 目录中生成对应的 Rust crate（如 `stm32f4/`）。
- **细节**：
  - 每个 crate 包含一个 `lib.rs`，按 feature 分隔设备模块。
  - 生成的代码未经格式化，可能包含冗长或未优化的部分。
  - 示例命令：`svd2rust -i svd/stm32f405.svd.patched -o stm32f4`。

##### 步骤 4：格式化代码 (`make form`)
- **输入**：`stm32*/` 中的未格式化 Rust 代码。
- **操作**：
  - 使用 `form` 工具整理代码结构。
  - 使用 `rustfmt` 格式化代码风格。
- **输出**：`stm32*/` 中生成格式化后的 Rust 代码。
- **细节**：
  - 此步骤可选，但推荐用于提高可读性。
  - 格式化后代码更符合 Rust 社区规范。

#### 4. 示例完整命令
假设在 Linux 上生成所有 PAC：
```bash
make install          # 安装工具
make extract          # 提取 SVD
make patch -j16       # 修补 SVD（16 线程并行）
make svd2rust -j16    # 生成 PAC
make form -j16        # 格式化代码
```

#### 5. 添加新设备
- 更新 `svd/vendor/` 中的 SVD 压缩文件。
- 运行 `make extract`。
- 在 `devices/` 中添加新设备的 YAML 文件。
- 更新 `stm32_part_table.yaml` 和 `scripts/makecrates.py`。
- 运行 `make` 重新生成。

---

### 五、如何参与和贡献

#### 1. 贡献方向
- **补丁开发**：为外设或设备编写 YAML 补丁。
- **测试**：验证生成的 PAC 在硬件上的正确性。
- **新设备支持**：添加新的 STM32 型号或家族。

#### 2. 工具支持
- **`matchperipherals.py`**：匹配现有外设补丁到新设备。
- **`periphtemplate.py`**：生成外设补丁模板。

---

### 六、总结

`stm32-rs` 通过修补 ST 的 SVD 文件并结合 `svd2rust`，为所有 STM32 微控制器提供了统一的 Rust PAC 支持。其生成流程清晰分为提取、修补、生成和格式化四个阶段，依赖 `svdtools`、`svd2rust` 和 `form` 等工具。通过参与补丁开发和测试，社区可以持续提升其覆盖度和质量。

如果你有具体问题或需要进一步解释某个部分，请告诉我！





# Without Scripts

以下是基于你的要求，使用与之前相同格式和方法，手动为所有 STM32 系列（不仅仅是 STM32F1）的 SVD 文件生成 PAC 的完整指南。我们将利用 `stm32-rs` 仓库中的所有 SVD 文件和补丁（包括 `devices/`、`devices/patches/`、`devices/fields/` 和 `devices/collect/`），生成所有 PAC（如 `stm32f0`、`stm32f1`、`stm32f4` 等），并保持文件结构与脚本一致。

---

## 手动为所有 SVD 文件生成 PAC 的完整指南

### 前置准备
1. **克隆仓库**：
   ```bash
   git clone https://github.com/stm32-rs/stm32-rs.git
   cd stm32-rs
   ```
2. **安装工具**：
   - `svd2rust` (v0.36.0)：`cargo install svd2rust --version 0.36.0`
   - `svdtools` (v0.4.5)：`cargo install svdtools --version 0.4.5`
   - `form` (v0.12.1)：`cargo install form --version 0.12.1`
   - `rustfmt`：`rustup component add rustfmt`
3. **目标**：基于 `stm32-rs` 中的所有 SVD 文件，应用所有补丁，生成所有 STM32 系列的 PAC。

---

## 生成流程

### 步骤 1：提取所有 SVD 文件
#### 目的
从 `svd/vendor/` 中的所有 ST 官方压缩文件提取 SVD 文件。

#### 输入
- `svd/vendor/` 中的所有 ZIP 文件，例如：
  - `STM32F0xx_svd_v1.1.zip`
  - `STM32F1xx_svd_v1.6.zip`
  - `STM32F4xx_svd_v2.8.zip`
  - `STM32H7xx_svd_v1.5.zip`
  - ...（所有 STM32 系列的 ZIP 文件）

#### 操作
1. **列出所有 ZIP 文件**：
   ```bash
   ls svd/vendor/*.zip
   ```
2. **解压所有 ZIP 文件到 `svd/`**：
   ```bash
   for zip in svd/vendor/*.zip; do unzip "$zip" -d svd/; done
   ```

#### 输出
- `svd/` 中生成所有 STM32 系列的原始 SVD 文件，例如：
  - `svd/stm32f030.svd`（STM32F0）
  - `svd/stm32f103.svd`（STM32F1）
  - `svd/stm32f405.svd`（STM32F4）
  - `svd/stm32h743.svd`（STM32H7）
  - ...（涵盖所有 STM32 型号）

#### 文件结构
```
stm32-rs/
├── svd/
│   ├── stm32f030.svd
│   ├── stm32f103.svd
│   ├── stm32f405.svd
│   ├── stm32h743.svd
│   ├── ... (所有 SVD 文件)
├── svd/vendor/
│   ├── STM32F0xx_svd_v1.1.zip
│   ├── STM32F1xx_svd_v1.6.zip
│   ├── STM32F4xx_svd_v2.8.zip
│   ├── STM32H7xx_svd_v1.5.zip
│   ├── ...
```

---

### 步骤 2：修补所有 SVD 文件（应用所有补丁）
#### 目的
使用 `devices/` 中的所有 YAML 文件，结合 `devices/patches/`、`devices/fields/` 和 `devices/collect/` 中的补丁，修补所有 SVD 文件。

#### 输入
- **原始 SVD 文件**：
  - `svd/stm32f030.svd`
  - `svd/stm32f103.svd`
  - `svd/stm32f405.svd`
  - `svd/stm32h743.svd`
  - ...（所有 SVD 文件）
- **补丁文件**：
  1. **设备特定补丁**：`devices/*.yaml`
     - 示例：`stm32f030.yaml`、`stm32f103.yaml`、`stm32f405.yaml` 等
  2. **通用外设补丁**：`devices/patches/*.yaml`
     - 示例：`adc.yaml`、`gpio.yaml`、`rcc.yaml` 等
  3. **字段描述（可选）**：`devices/fields/*.yaml`
     - 示例：`rcc.yaml`、`gpio.yaml`
  4. **收集数据（可选）**：`devices/collect/*.yaml`
     - 示例：`rcc.yaml`

#### 操作
1. **检查所有 YAML 文件**：
   - **列出设备 YAML**：
     ```bash
     ls devices/*.yaml
     ```
     示例输出：
     - `stm32f030.yaml`
     - `stm32f103.yaml`
     - `stm32f405.yaml`
     - `stm32h743.yaml`
     - ...
   - **检查通用补丁**：
     ```bash
     ls devices/patches/
     ```
     示例输出：
     - `adc.yaml`
     - `dma.yaml`
     - `gpio.yaml`
     - `rcc.yaml`
     - ...
   - **检查字段和收集数据**：
     ```bash
     ls devices/fields/
     ls devices/collect/
     ```

2. **确保 YAML 文件引用所有补丁**：
   - 检查每个 `devices/*.yaml` 文件，确保引用了适用的补丁。例如，`stm32f103.yaml`：
     ```yaml
     svd: "svd/stm32f103.svd"
     patches:
       - path: "devices/patches/adc.yaml"
       - path: "devices/patches/dma.yaml"
       - path: "devices/patches/gpio.yaml"
       - path: "devices/patches/rcc.yaml"
       # 所有相关外设补丁
     fields:
       - path: "devices/fields/rcc.yaml"
       - path: "devices/fields/gpio.yaml"
     collect:
       - path: "devices/collect/rcc.yaml"
     ```
   - **手动更新**：
     - 对于每个 YAML，添加 `devices/patches/` 中所有适用的外设补丁。
     - 若有 `fields` 和 `collect` 数据，添加对应路径。
     - 重复此过程，确保每个设备的 YAML 包含所有相关补丁。

3. **修补所有 SVD 文件**：
   - 对每个 YAML 文件运行 `svdtools`：
     ```bash
     for yaml in devices/*.yaml; do svdtools patch "$yaml"; done
     ```
   - 这会修补所有 SVD 文件，应用所有补丁。

#### 输出
- `svd/` 中的修补后 SVD 文件：
  - `svd/stm32f030.svd.patched`
  - `svd/stm32f103.svd.patched`
  - `svd/stm32f405.svd.patched`
  - `svd/stm32h743.svd.patched`
  - ...（所有修补后的 SVD 文件）

#### 文件结构
```
stm32-rs/
├── svd/
│   ├── stm32f030.svd
│   ├── stm32f030.svd.patched
│   ├── stm32f103.svd
│   ├── stm32f103.svd.patched
│   ├── stm32f405.svd
│   ├── stm32f405.svd.patched
│   ├── stm32h743.svd
│   ├── stm32h743.svd.patched
│   ├── ...
├── devices/
│   ├── stm32f030.yaml
│   ├── stm32f103.yaml
│   ├── stm32f405.yaml
│   ├── stm32h743.yaml
│   ├── ...
├── devices/patches/
│   ├── adc.yaml
│   ├── dma.yaml
│   ├── gpio.yaml
│   ├── rcc.yaml
│   ├── ...
├── devices/fields/
│   ├── rcc.yaml
│   ├── gpio.yaml
│   ├── ...
├── devices/collect/
│   ├── rcc.yaml
│   ├── ...
```

---

### 步骤 3：生成所有 Rust 代码
#### 目的
将所有修补后的 SVD 文件转换为 Rust 代码，组织成各自的 STM32 家族 crate（如 `stm32f0`、`stm32f1`、`stm32f4` 等）。

#### 输入
- `svd/stm32f030.svd.patched`
- `svd/stm32f103.svd.patched`
- `svd/stm32f405.svd.patched`
- `svd/stm32h743.svd.patched`
- ...（所有修补后的 SVD 文件）

#### 操作
1. **按家族分组**：
   - 根据 `stm32-rs` 的惯例，将 SVD 文件按家族分组：
     - `stm32f0`：`stm32f030`、`stm32f051` 等
     - `stm32f1`：`stm32f100`、`stm32f103` 等
     - `stm32f4`：`stm32f405`、`stm32f429` 等
     - `stm32h7`：`stm32h743` 等
     - ...（其他家族）

2. **为每个设备生成 Rust 文件**：
   - 示例（部分家族）：
     ```bash
     # STM32F0
     mkdir -p stm32f0/src
     svd2rust -i svd/stm32f030.svd.patched -o stm32f0/src/stm32f030.rs
     svd2rust -i svd/stm32f051.svd.patched -o stm32f0/src/stm32f051.rs

     # STM32F1
     mkdir -p stm32f1/src
     svd2rust -i svd/stm32f100.svd.patched -o stm32f1/src/stm32f100.rs
     svd2rust -i svd/stm32f103.svd.patched -o stm32f1/src/stm32f103.rs

     # STM32F4
     mkdir -p stm32f4/src
     svd2rust -i svd/stm32f405.svd.patched -o stm32f4/src/stm32f405.rs
     svd2rust -i svd/stm32f429.svd.patched -o stm32f4/src/stm32f429.rs

     # STM32H7
     mkdir -p stm32h7/src
     svd2rust -i svd/stm32h743.svd.patched -o stm32h7/src/stm32h743.rs
     ```
   - 对所有 SVD 文件重复此过程。

3. **创建每个家族的 `lib.rs`**：
   - 示例：
     - `stm32f0/src/lib.rs`：
       ```rust
       #![no_std]

       #[cfg(feature = "stm32f030")]
       pub mod stm32f030 {
           include!("stm32f030.rs");
       }

       #[cfg(feature = "stm32f051")]
       pub mod stm32f051 {
           include!("stm32f051.rs");
       }
       ```
     - `stm32f1/src/lib.rs`：
       ```rust
       #![no_std]

       #[cfg(feature = "stm32f100")]
       pub mod stm32f100 {
           include!("stm32f100.rs");
       }

       #[cfg(feature = "stm32f103")]
       pub mod stm32f103 {
           include!("stm32f103.rs");
       }
       ```
     - 为每个家族创建类似的 `lib.rs`。

4. **创建每个家族的 `Cargo.toml`**：
   - 示例（`stm32f0/Cargo.toml`）：
     ```toml
     [package]
     name = "stm32f0"
     version = "0.15.1"
     authors = ["stm32-rs contributors"]
     edition = "2018"
     license = "MIT OR Apache-2.0"
     description = "Peripheral access API for STM32F0 microcontrollers"
     repository = "https://github.com/stm32-rs/stm32-rs"

     [dependencies]
     cortex-m = "0.7"
     cortex-m-rt = { version = "0.7", optional = true }
     vcell = "0.1"

     [features]
     default = []
     rt = ["cortex-m-rt"]
     stm32f030 = []
     stm32f051 = []
     ```
   - 为每个家族（如 `stm32f1`、`stm32f4`、`stm32h7` 等）创建类似的 `Cargo.toml`，列出所有型号的 feature。

#### 输出
- 所有 STM32 家族的 Rust crate，例如：
  - `stm32f0/`
    - `Cargo.toml`
    - `src/lib.rs`
    - `src/stm32f030.rs`
    - `src/stm32f051.rs`
  - `stm32f1/`
    - `Cargo.toml`
    - `src/lib.rs`
    - `src/stm32f100.rs`
    - `src/stm32f103.rs`
  - `stm32f4/`
    - `Cargo.toml`
    - `src/lib.rs`
    - `src/stm32f405.rs`
    - `src/stm32f429.rs`
  - ...（其他家族）

#### 文件结构
```
stm32-rs/
├── svd/
│   ├── stm32f030.svd.patched
│   ├── stm32f103.svd.patched
│   ├── stm32f405.svd.patched
│   ├── stm32h743.svd.patched
│   ├── ...
├── stm32f0/
│   ├── Cargo.toml
│   ├── src/
│       ├── lib.rs
│       ├── stm32f030.rs
│       ├── stm32f051.rs
├── stm32f1/
│   ├── Cargo.toml
│   ├── src/
│       ├── lib.rs
│       ├── stm32f100.rs
│       ├── stm32f103.rs
├── stm32f4/
│   ├── Cargo.toml
│   ├── src/
│       ├── lib.rs
│       ├── stm32f405.rs
│       ├── stm32f429.rs
├── stm32h7/
│   ├── Cargo.toml
│   ├── src/
│       ├── lib.rs
│       ├── stm32h743.rs
├── ...
```

---

### 步骤 4：格式化所有代码
#### 目的
使用 `form` 和 `rustfmt` 优化所有生成的 Rust 代码。

#### 输入
- 所有家族的 Rust 文件，例如：
  - `stm32f0/src/stm32f030.rs`
  - `stm32f1/src/stm32f103.rs`
  - `stm32f4/src/stm32f405.rs`
  - ...

#### 操作
1. **运行 `form`**：
   ```bash
   for file in stm32*/src/*.rs; do form -i "$file" -o "$(dirname $file)/"; done
   ```

2. **运行 `rustfmt`**：
   ```bash
   for file in stm32*/src/*.rs; do rustfmt "$file"; done
   ```

#### 输出
- 格式化后的 Rust 文件，位置不变。

---

### 步骤 5：验证所有 PAC
#### 操作
1. **构建测试**：
   - 检查每个家族：
     ```bash
     cd stm32f0 && cargo build --features stm32f030
     cd ../stm32f1 && cargo build --features stm32f103
     cd ../stm32f4 && cargo build --features stm32f405
     # ... 对所有家族重复
     ```

2. **使用示例**：
   - 新建测试项目：
     ```bash
     cargo new test_stm32
     cd test_stm32
     ```
   - 编辑 `Cargo.toml`（以 `stm32f4` 为例）：
     ```toml
     [dependencies.stm32f4]
     path = "../stm32-rs/stm32f4"
     features = ["stm32f405"]
     ```
   - 编辑 `src/main.rs`：
     ```rust
     #![no_std]
     use stm32f4::stm32f405;

     fn main() {
         let p = stm32f405::Peripherals::take().unwrap();
     }
     ```

---

## 最终文件结构
```
stm32-rs/
├── svd/
│   ├── stm32f030.svd
│   ├── stm32f030.svd.patched
│   ├── stm32f103.svd
│   ├── stm32f103.svd.patched
│   ├── stm32f405.svd
│   ├── stm32f405.svd.patched
│   ├── stm32h743.svd
│   ├── stm32h743.svd.patched
│   ├── ...
├── stm32f0/
│   ├── Cargo.toml
│   ├── src/
│       ├── lib.rs
│       ├── stm32f030.rs
│       ├── stm32f051.rs
├── stm32f1/
│   ├── Cargo.toml
│   ├── src/
│       ├── lib.rs
│       ├── stm32f100.rs
│       ├── stm32f103.rs
├── stm32f4/
│   ├── Cargo.toml
│   ├── src/
│       ├── lib.rs
│       ├── stm32f405.rs
│       ├── stm32f429.rs
├── stm32h7/
│   ├── Cargo.toml
│   ├── src/
│       ├── lib.rs
│       ├── stm32h743.rs
├── ...
├── devices/
│   ├── stm32f030.yaml
│   ├── stm32f103.yaml
│   ├── stm32f405.yaml
│   ├── stm32h743.yaml
│   ├── ...
├── devices/patches/
│   ├── adc.yaml
│   ├── dma.yaml
│   ├── gpio.yaml
│   ├── rcc.yaml
│   ├── ...
├── devices/fields/
│   ├── rcc.yaml
│   ├── gpio.yaml
│   ├── ...
├── devices/collect/
│   ├── rcc.yaml
│   ├── ...
```

---

## 注意事项
1. **家族划分**：
   - 需要手动根据 SVD 文件名（如 `stm32f*`、`stm32h*`）分组到正确家族。
   - 参考 `stm32-rs` 的 `CRATES`（在 `Makefile` 中）：
     - `stm32f0`, `stm32f1`, `stm32f2`, `stm32f3`, `stm32f4`, `stm32f7`, `stm32h7`, `stm32l0`, `stm32l1`, `stm32l4`, `stm32l5`, `stm32g0`, `stm32g4`, `stm32mp1`, `stm32u0`, `stm32u5`, `stm32wl`, `stm32wb`
2. **补丁完整性**：
   - 确保每个 YAML 引用所有适用的 `patches/`、`fields/` 和 `collect/` 文件。
3. **效率**：
   - 使用循环命令（如 `for`）处理大量文件，避免逐一手动输入。

---

## 总结
通过以上步骤，你可以手动为所有 STM32 SVD 文件生成 PAC，应用所有补丁，生成所有家族的 crate。流程与脚本一致，文件结构完全匹配。如果需要进一步优化或特定家族的帮助，请告诉我！
