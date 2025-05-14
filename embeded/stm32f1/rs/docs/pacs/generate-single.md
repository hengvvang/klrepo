# PAC
在生成 STM32F1 PAC 时，应用 `stm32-rs` 仓库中所有可用的补丁文件
-  `devices/` 下的设备特定补丁
- `devices/patches/` 下的通用外设补丁
- `devices/collect/` 和 `devices/fields/` 中的增强数据（如果适用）。

---

## 手动生成 STM32F1 PAC 的完整指南（应用所有补丁）

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
3. **目标**：基于 STM32F1 的 SVD 文件，应用所有补丁生成 `stm32f1` PAC。

---

## 生成流程

### 步骤 1：提取 SVD 文件
#### 目的
从 ST 官方压缩文件中提取 STM32F1 的原始 SVD 文件。

#### 输入
- `svd/vendor/STM32F1xx_svd_v1.6.zip`

#### 操作
```bash
unzip svd/vendor/STM32F1xx_svd_v1.6.zip -d svd/
```

#### 输出
- `svd/` 中的原始 SVD 文件，例如：
  - `svd/stm32f100.svd`
  - `svd/stm32f101.svd`
  - `svd/stm32f103.svd`
  - `svd/stm32f105.svd`
  - `svd/stm32f107.svd`

#### 文件结构
```
stm32-rs/
├── svd/
│   ├── stm32f100.svd
│   ├── stm32f101.svd
│   ├── stm32f103.svd
│   ├── stm32f105.svd
│   ├── stm32f107.svd
├── svd/vendor/
│   ├── STM32F1xx_svd_v1.6.zip
```

---

### 步骤 2：修补 SVD 文件（应用所有补丁）
#### 目的
使用 `devices/` 中的设备特定 YAML 文件，结合 `devices/patches/`、`devices/fields/` 和 `devices/collect/` 中的所有补丁，修补原始 SVD 文件。

#### 输入
- **原始 SVD 文件**：
  - `svd/stm32f100.svd`
  - `svd/stm32f101.svd`
  - `svd/stm32f103.svd`
  - `svd/stm32f105.svd`
  - `svd/stm32f107.svd`
- **补丁文件**：
  1. **设备特定补丁**：`devices/stm32f1*.yaml`
     - 示例：`devices/stm32f103.yaml`
  2. **通用外设补丁**：`devices/patches/*.yaml`
     - 示例：`rcc.yaml`、`gpio.yaml` 等
  3. **字段描述（可选）**：`devices/fields/*.yaml`
     - 示例：`rcc.yaml`（提供枚举值）
  4. **收集数据（可选）**：`devices/collect/*.yaml`
     - 示例：用于数组或集群定义

#### 操作
1. **检查现有补丁文件**：
   - **列出 STM32F1 相关 YAML**：
     ```bash
     ls devices/stm32f1*.yaml
     ```
     输出可能包括：
     - `stm32f100.yaml`
     - `stm32f101.yaml`
     - `stm32f103.yaml`
     - `stm32f105.yaml`
     - `stm32f107.yaml`
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
   - 检查每个 `devices/stm32f1*.yaml` 文件，确保它引用了所有适用的补丁。例如，`stm32f103.yaml` 可能如下：
     ```yaml
     svd: "svd/stm32f103.svd"
     patches:
       - path: "devices/patches/adc.yaml"
       - path: "devices/patches/dma.yaml"
       - path: "devices/patches/gpio.yaml"
       - path: "devices/patches/rcc.yaml"
       # 其他外设补丁...
     fields:
       - path: "devices/fields/rcc.yaml"
       # 其他字段补丁...
     collect:
       - path: "devices/collect/rcc.yaml"
       # 其他收集补丁...
     ```
   - **手动更新 YAML**：
     - 如果现有 YAML 未包含所有补丁，手动添加 `devices/patches/` 中所有相关外设的补丁。
     - 如果需要字段增强，添加 `devices/fields/` 中的补丁。
     - 如果需要数组/集群支持，添加 `devices/collect/` 中的补丁。
   - 示例完整 `stm32f103.yaml`（假设应用所有补丁）：
     ```yaml
     svd: "svd/stm32f103.svd"
     patches:
       - path: "devices/patches/adc.yaml"
       - path: "devices/patches/dma.yaml"
       - path: "devices/patches/exti.yaml"
       - path: "devices/patches/gpio.yaml"
       - path: "devices/patches/i2c.yaml"
       - path: "devices/patches/rcc.yaml"
       - path: "devices/patches/spi.yaml"
       - path: "devices/patches/tim.yaml"
       - path: "devices/patches/usart.yaml"
     fields:
       - path: "devices/fields/rcc.yaml"
       - path: "devices/fields/gpio.yaml"
     collect:
       - path: "devices/collect/rcc.yaml"
     ```

3. **修补每个 SVD 文件**：
   - 对每个 STM32F1 设备运行 `svdtools`：
     ```bash
     svdtools patch devices/stm32f100.yaml
     svdtools patch devices/stm32f101.yaml
     svdtools patch devices/stm32f103.yaml
     svdtools patch devices/stm32f105.yaml
     svdtools patch devices/stm32f107.yaml
     ```
   - `svdtools` 会：
     - 读取 `svd/` 中的原始 SVD 文件。
     - 应用 `patches` 部分的补丁。
     - 如果有 `fields` 和 `collect`，一并合并。

#### 输出
- `svd/` 中的修补后 SVD 文件：
  - `svd/stm32f100.svd.patched`
  - `svd/stm32f101.svd.patched`
  - `svd/stm32f103.svd.patched`
  - `svd/stm32f105.svd.patched`
  - `svd/stm32f107.svd.patched`

#### 文件结构
```
stm32-rs/
├── svd/
│   ├── stm32f100.svd
│   ├── stm32f100.svd.patched
│   ├── stm32f101.svd
│   ├── stm32f101.svd.patched
│   ├── stm32f103.svd
│   ├── stm32f103.svd.patched
│   ├── stm32f105.svd
│   ├── stm32f105.svd.patched
│   ├── stm32f107.svd
│   ├── stm32f107.svd.patched
├── devices/
│   ├── stm32f100.yaml
│   ├── stm32f101.yaml
│   ├── stm32f103.yaml
│   ├── stm32f105.yaml
│   ├── stm32f107.yaml
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

### 步骤 3：生成 Rust 代码
#### 目的
将修补后的 SVD 文件转换为 Rust 代码，组织成 `stm32f1` crate。

#### 输入
- `svd/stm32f100.svd.patched`
- `svd/stm32f101.svd.patched`
- `svd/stm32f103.svd.patched`
- `svd/stm32f105.svd.patched`
- `svd/stm32f107.svd.patched`

#### 操作
1. **为每个设备生成 Rust 文件**：
   ```bash
   mkdir stm32f1/
   svd2rust -i svd/stm32f100.svd.patched -o stm32f1/
   svd2rust -i svd/stm32f101.svd.patched -o stm32f1/
   svd2rust -i svd/stm32f103.svd.patched -o stm32f1/
   svd2rust -i svd/stm32f105.svd.patched -o stm32f1/
   svd2rust -i svd/stm32f107.svd.patched -o stm32f1/
   ```

2. **创建 `lib.rs`**：
   - 在 `stm32f1/src/` 中创建 `lib.rs`：
     ```rust
     #![no_std]

     #[cfg(feature = "stm32f100")]
     pub mod stm32f100 {
         include!("stm32f100.rs");
     }

     #[cfg(feature = "stm32f101")]
     pub mod stm32f101 {
         include!("stm32f101.rs");
     }

     #[cfg(feature = "stm32f103")]
     pub mod stm32f103 {
         include!("stm32f103.rs");
     }

     #[cfg(feature = "stm32f105")]
     pub mod stm32f105 {
         include!("stm32f105.rs");
     }

     #[cfg(feature = "stm32f107")]
     pub mod stm32f107 {
         include!("stm32f107.rs");
     }
     ```

3. **创建 `Cargo.toml`**：
   - 在 `stm32f1/` 中创建 `Cargo.toml`：
     ```toml
     [package]
     name = "stm32f1"
     version = "0.15.1"
     authors = ["stm32-rs contributors"]
     edition = "2018"
     license = "MIT OR Apache-2.0"
     description = "Peripheral access API for STM32F1 microcontrollers"
     repository = "https://github.com/stm32-rs/stm32-rs"

     [dependencies]
     cortex-m = "0.7"
     cortex-m-rt = { version = "0.7", optional = true }
     vcell = "0.1"

     [features]
     default = []
     rt = ["cortex-m-rt"]
     stm32f100 = []
     stm32f101 = []
     stm32f103 = []
     stm32f105 = []
     stm32f107 = []
     ```

#### 输出
- `stm32f1/` 中的 Rust crate：
  - `stm32f1/Cargo.toml`
  - `stm32f1/src/lib.rs`
  - `stm32f1/src/stm32f100.rs`
  - `stm32f1/src/stm32f101.rs`
  - `stm32f1/src/stm32f103.rs`
  - `stm32f1/src/stm32f105.rs`
  - `stm32f1/src/stm32f107.rs`

#### 文件结构
```
stm32-rs/
├── svd/
│   ├── stm32f100.svd.patched
│   ├── stm32f101.svd.patched
│   ├── stm32f103.svd.patched
│   ├── stm32f105.svd.patched
│   ├── stm32f107.svd.patched
├── stm32f1/
│   ├── Cargo.toml
│   ├── src/
│       ├── lib.rs
│       ├── stm32f100.rs
│       ├── stm32f101.rs
│       ├── stm32f103.rs
│       ├── stm32f105.rs
│       ├── stm32f107.rs
```

---

### 步骤 4：格式化代码
#### 目的
使用 `form` 和 `rustfmt` 优化代码结构和格式。

#### 输入
- `stm32f1/src/stm32f100.rs`
- `stm32f1/src/stm32f101.rs`
- `stm32f1/src/stm32f103.rs`
- `stm32f1/src/stm32f105.rs`
- `stm32f1/src/stm32f107.rs`
- `stm32f1/src/lib.rs`

#### 操作
1. **运行 `form`**：
   ```bash
   form -i stm32f1/src/stm32f100.rs -o stm32f1/src/
   form -i stm32f1/src/stm32f101.rs -o stm32f1/src/
   form -i stm32f1/src/stm32f103.rs -o stm32f1/src/
   form -i stm32f1/src/stm32f105.rs -o stm32f1/src/
   form -i stm32f1/src/stm32f107.rs -o stm32f1/src/
   ```

2. **运行 `rustfmt`**：
   ```bash
   rustfmt stm32f1/src/lib.rs
   rustfmt stm32f1/src/stm32f100.rs
   rustfmt stm32f1/src/stm32f101.rs
   rustfmt stm32f1/src/stm32f103.rs
   rustfmt stm32f1/src/stm32f105.rs
   rustfmt stm32f1/src/stm32f107.rs
   ```

#### 输出
- 格式化后的 Rust 文件，位置不变。

---

### 步骤 5：验证 PAC
#### 操作
1. **构建测试**：
   ```bash
   cd stm32f1
   cargo build --features stm32f103
   ```

2. **使用示例**：
   - 新建项目：
     ```bash
     cargo new test_stm32f1
     cd test_stm32f1
     ```
   - 编辑 `Cargo.toml`：
     ```toml
     [dependencies.stm32f1]
     path = "../stm32-rs/stm32f1"
     features = ["stm32f103"]
     ```
   - 编辑 `src/main.rs`：
     ```rust
     #![no_std]
     use stm32f1::stm32f103;

     fn main() {
         let p = stm32f103::Peripherals::take().unwrap();
     }
     ```

---

## 最终文件结构
```
stm32-rs/
├── svd/
│   ├── stm32f100.svd
│   ├── stm32f100.svd.patched
│   ├── stm32f101.svd
│   ├── stm32f101.svd.patched
│   ├── stm32f103.svd
│   ├── stm32f103.svd.patched
│   ├── stm32f105.svd
│   ├── stm32f105.svd.patched
│   ├── stm32f107.svd
│   ├── stm32f107.svd.patched
├── stm32f1/
│   ├── Cargo.toml
│   ├── src/
│       ├── lib.rs
│       ├── stm32f100.rs
│       ├── stm32f101.rs
│       ├── stm32f103.rs
│       ├── stm32f105.rs
│       ├── stm32f107.rs
├── devices/
│   ├── stm32f100.yaml
│   ├── stm32f101.yaml
│   ├── stm32f103.yaml
│   ├── stm32f105.yaml
│   ├── stm32f107.yaml
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
1. **补丁完整性**：
   - `devices/patches/` 中可能包含更多外设补丁（如 `tim.yaml`、`usart.yaml`），需根据 STM32F1 的外设支持情况全部添加到 YAML。
   - `devices/fields/` 和 `devices/collect/` 是可选的，若无对应文件，可跳过。
2. **设备覆盖**：
   - STM32F1 系列可能还有其他型号（如 `stm32f102`），需检查 `svd/` 和 `devices/` 是否包含所有 SVD 和 YAML。
3. **错误排查**：
   - 如果 `svdtools patch` 报错，检查 YAML 文件路径或内容是否正确。
   - 如果 `cargo build` 失败，检查 `Cargo.toml` 的依赖版本。

---
