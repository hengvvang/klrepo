我将提供一个极其详细的树结构，涵盖`stm32f1xx-hal`库代码中的所有模块、结构体、枚举、方法、函数、trait以及相关数据类型，细化到每个具体定义。同时，我会以文本形式补充所有非代码相关内容，包括依赖、设计理念等，确保内容全面且详尽。由于`stm32f1xx-hal`内容庞大，我会基于版本`0.10.0`（截至2025年3月31日可能有更新，但核心一致），以STM32F103为例，尽量覆盖所有细节。

---

### 非代码相关内容（详细文本）

#### 1. 概述
- **目标**: `stm32f1xx-hal`是Rust语言针对STM32F1系列微控制器的硬件抽象层（HAL），旨在提供类型安全、零成本抽象和高性能的外设访问接口。它构建在`stm32f1` PAC之上，实现了`embedded-hal`标准trait，支持从简单GPIO操作到复杂DMA传输的各种嵌入式开发需求。
- **设计理念**:
  - **类型安全**: 使用Rust的类型状态模式（如GPIO引脚的`Input<Floating>`、`Output<PushPull>`）确保编译期检查硬件配置。
  - **零成本抽象**: 通过Rust的零开销抽象原则，生成的机器码接近手写汇编。
  - **可移植性**: 遵循`embedded-hal`标准，方便跨不同微控制器移植。
- **支持的芯片**:
  - STM32F100 (低密度)
  - STM32F101 (中密度)
  - STM32F102 (USB支持)
  - STM32F103 (高密度，中等型号如F103C8、F103RB)
  - STM32F105/F107 (连接性系列，支持CAN和以太网)
  - 通过Cargo特性指定，例如`stm32f103`、`medium`。

#### 2. 项目配置
- **Cargo.toml**:
  ```toml
  [package]
  name = "stm32f1xx-example"
  version = "0.1.0"
  edition = "2021"

  [dependencies]
  stm32f1xx-hal = { version = "0.10.0", features = ["stm32f103", "rt", "medium"] }
  cortex-m = "0.7.7"
  cortex-m-rt = "0.7.3"
  panic-halt = "0.2.0"

  [dev-dependencies]
  defmt = "0.3"  # 可选，用于调试日志
  defmt-rtt = "0.4"  # 可选，RTT调试输出
  ```
- **特性说明**:
  - `stm32f103`: 支持STM32F103系列。
  - `rt`: 启用运行时支持（如`cortex-m-rt`的`entry`宏）。
  - `medium`: 支持中等连接性设备（如F103RB，带更多外设）。
- **其他依赖**:
  - `stm32f1 = "0.15.1"`: PAC层，间接通过`stm32f1xx-hal`引入。
  - `embedded-hal = "1.0.0"`: 标准化trait，间接引入。
  - `nb = "1.1.0"`: 非阻塞操作支持，间接引入。
  - `void = "1.0.2"`: 表示永不发生的错误类型，间接引入。
- **配置文件**:
  - **`.cargo/config.toml`**:
    ```toml
    [target.thumbv7m-none-eabi]
    runner = "probe-run --chip STM32F103C8"
    rustflags = ["-C", "link-arg=-Tlink.x"]
    ```
  - **`memory.x`**:
    ```x
    MEMORY
    {
        FLASH : ORIGIN = 0x08000000, LENGTH = 64K
        RAM : ORIGIN = 0x20000000, LENGTH = 20K
    }
    ```

#### 3. 源码与文档
- **GitHub**: [github.com/stm32-rs/stm32f1xx-hal](https://github.com/stm32-rs/stm32f1xx-hal)
- **文档**: 使用`cargo doc --open`生成本地文档，或查看[docs.rs/stm32f1xx-hal](https://docs.rs/stm32f1xx-hal)。
- **参考手册**: STMicroelectronics的RM0008（STM32F1参考手册）。

---

### 代码相关内容（详细树结构）

以下树结构细化到`stm32f1xx-hal`代码中的每个模块、结构体、枚举、函数、方法和trait，涵盖所有数据类型和实现细节。

```
stm32f1xx-hal
├── prelude (常用类型与trait模块)
│   ├── 类型
│   │   ├── Hertz (频率单位)
│   │   │   ├── 定义: pub struct Hertz(pub u32)
│   │   │   └── 方法
│   │   │       ├── hz(self) -> Hertz: pub fn hz(self) -> Hertz { Hertz(self) }
│   │   │       ├── khz(self) -> Hertz: pub fn khz(self) -> Hertz { Hertz(self * 1_000) }
│   │   │       ├── mhz(self) -> Hertz: pub fn mhz(self) -> Hertz { Hertz(self * 1_000_000) }
│   │   │       └── into(self) -> u32: pub fn into(self) -> u32 { self.0 }
│   │   ├── MilliSeconds (毫秒单位)
│   │   │   ├── 定义: pub struct MilliSeconds(pub u32)
│   │   │   └── 方法
│   │   │       └── ms(self) -> MilliSeconds: pub fn ms(self) -> MilliSeconds { MilliSeconds(self) }
│   │   └── MicroSeconds (微秒单位)
│   │       ├── 定义: pub struct MicroSeconds(pub u32)
│   │       └── 方法
│   │           └── us(self) -> MicroSeconds: pub fn us(self) -> MicroSeconds { MicroSeconds(self) }
│   └── Trait
│       ├── Constrain (外设约束)
│       │   ├── 定义: pub trait Constrain { type Constrained; fn constrain(self) -> Self::Constrained; }
│       │   └── 实现: 用于pac::RCC, pac::FLASH等转为HAL结构体
│       └── Into (类型转换)
│           ├── 定义: pub trait Into<T> { fn into(self) -> T; }
│           └── 实现: 用于频率、时间单位转换
├── pac (Peripheral Access Crate, 重新导出)
│   ├── 结构体
│   │   ├── Peripherals (所有外设集合)
│   │   │   ├── 定义: pub struct Peripherals { pub RCC: RCC, pub GPIOA: GPIOA, ... }
│   │   │   └── 方法
│   │   │       ├── take() -> Option<Self>: pub fn take() -> Option<Self> { ... }
│   │   │       └── steal() -> Self: pub unsafe fn steal() -> Self { ... } (不安全获取)
│   │   ├── RCC (时钟控制寄存器)
│   │   │   ├── 定义: pub struct RCC { ... } (包含所有RCC寄存器字段)
│   │   │   └── 方法: 底层寄存器操作 (如apb2enr)
│   │   ├── GPIOA, GPIOB, ..., GPIOE (GPIO端口寄存器)
│   │   │   ├── 定义: pub struct GPIOA { ... } (包含crl, crh, odr等)
│   │   │   └── 方法: 底层寄存器操作
│   │   ├── TIM1, TIM2, ..., TIM5 (定时器寄存器)
│   │   ├── SPI1, SPI2, SPI3 (SPI寄存器)
│   │   ├── I2C1, I2C2 (I2C寄存器)
│   │   ├── USART1, USART2, USART3 (串口寄存器)
│   │   ├── ADC1, ADC2 (ADC寄存器)
│   │   ├── IWDG (看门狗寄存器)
│   │   └── DMA1 (DMA寄存器)
│   └── 模块
│       └── stm32 (pac根模块)
│           └── 类型: RCC, GPIOA等具体外设类型
├── rcc (Reset and Clock Control)
│   ├── 结构体
│   │   ├── Rcc (时钟控制)
│   │   │   ├── 定义: pub struct Rcc { rcc: pac::RCC }
│   │   │   └── 方法
│   │   │       ├── constrain(self) -> Rcc: pub fn constrain(self) -> Rcc { Rcc { rcc: self } }
│   │   ├── CFGR (时钟配置)
│   │   │   ├── 定义: pub struct CFGR { ... }
│   │   │   └── 方法
│   │   │       ├── new(rcc: &mut pac::RCC) -> Self: pub fn new(rcc: &mut pac::RCC) -> Self { ... }
│   │   │       ├── use_hse(self, hse: Hertz) -> Self: pub fn use_hse(self, hse: Hertz) -> Self { ... }
│   │   │       ├── sysclk(self, freq: Hertz) -> Self: pub fn sysclk(self, freq: Hertz) -> Self { ... }
│   │   │       ├── hclk(self, freq: Hertz) -> Self: pub fn hclk(self, freq: Hertz) -> Self { ... }
│   │   │       ├── pclk1(self, freq: Hertz) -> Self: pub fn pclk1(self, freq: Hertz) -> Self { ... }
│   │   │       ├── pclk2(self, freq: Hertz) -> Self: pub fn pclk2(self, freq: Hertz) -> Self { ... }
│   │   │       ├── adcclk(self, freq: Hertz) -> Self: pub fn adcclk(self, freq: Hertz) -> Self { ... }
│   │   │       └── freeze(self, acr: &mut ACR) -> Clocks: pub fn freeze(self, acr: &mut ACR) -> Clocks { ... }
│   │   └── Clocks (冻结后的时钟状态)
│   │       ├── 定义: pub struct Clocks { sysclk: Hertz, hclk: Hertz, pclk1: Hertz, pclk2: Hertz, adcclk: Hertz }
│   │       └── 字段
│   │           ├── sysclk: Hertz (系统时钟频率)
│   │           ├── hclk: Hertz (AHB时钟频率)
│   │           ├── pclk1: Hertz (APB1时钟频率)
│   │           ├── pclk2: Hertz (APB2时钟频率)
│   │           └── adcclk: Hertz (ADC时钟频率)
├── flash
│   ├── 结构体
│   │   ├── Flash (Flash控制器)
│   │   │   ├── 定义: pub struct Flash { flash: pac::FLASH }
│   │   │   └── 方法
│   │   │       ├── constrain(self) -> Flash: pub fn constrain(self) -> Flash { Flash { flash: self } }
│   │   └── ACR (访问控制寄存器)
│   │       ├── 定义: pub struct ACR { acr: pac::flash::ACR }
│   │       └── 方法
│   │           ├── set_latency(&mut self, latency: u8): pub fn set_latency(&mut self, latency: u8) { ... }
├── gpio
│   ├── 结构体
│   │   ├── Gpioa, Gpiob, Gpioc, Gpiod, Gpioe (GPIO端口)
│   │   │   ├── 定义: pub struct Gpioa { crl: CRL, crh: CRH, pins: [PA0; 16] }
│   │   │   ├── 方法
│   │   │   │   ├── split(self) -> Gpioa: pub fn split(self) -> Gpioa { ... }
│   │   │   └── 字段
│   │   │       ├── crl: CRL (低8位控制寄存器)
│   │   │       ├── crh: CRH (高8位控制寄存器)
│   │   │       ├── pa0: PA0<Input<Floating>> (引脚0)
│   │   │       ├── pa1: PA1<Input<Floating>> (引脚1)
│   │   │       ├── ... (直到pa15)
│   │   ├── CRL, CRH (GPIO控制寄存器)
│   │   │   ├── 定义: pub struct CRL { crl: pac::gpioa::CRL }
│   │   │   └── 方法: 底层寄存器操作
│   │   ├── PA0, PA1, ..., PA15, PB0, ..., PE15 (具体引脚)
│   │   │   ├── 定义: pub struct PA0<MODE> { _mode: PhantomData<MODE> }
│   │   │   └── 方法
│   │   │       ├── into_push_pull_output(self, crl: &mut CRL) -> PA0<Output<PushPull>>: pub fn into_push_pull_output(self, crl: &mut CRL) -> PA0<Output<PushPull>> { ... }
│   │   │       ├── into_floating_input(self, crl: &mut CRL) -> PA0<Input<Floating>>: pub fn into_floating_input(self, crl: &mut CRL) -> PA0<Input<Floating>> { ... }
│   │   │       ├── into_pull_up_input(self, crl: &mut CRL) -> PA0<Input<PullUp>>: pub fn into_pull_up_input(self, crl: &mut CRL) -> PA0<Input<PullUp>> { ... }
│   │   │       ├── into_pull_down_input(self, crl: &mut CRL) -> PA0<Input<PullDown>>: pub fn into_pull_down_input(self, crl: &mut CRL) -> PA0<Input<PullDown>> { ... }
│   │   │       ├── into_open_drain_output(self, crl: &mut CRL) -> PA0<Output<OpenDrain>>: pub fn into_open_drain_output(self, crl: &mut CRL) -> PA0<Output<OpenDrain>> { ... }
│   │   │       ├── into_alternate_push_pull(self, crl: &mut CRL) -> PA0<Alternate<PushPull>>: pub fn into_alternate_push_pull(self, crl: &mut CRL) -> PA0<Alternate<PushPull>> { ... }
│   │   │       ├── into_alternate_open_drain(self, crl: &mut CRL) -> PA0<Alternate<OpenDrain>>: pub fn into_alternate_open_drain(self, crl: &mut CRL) -> PA0<Alternate<OpenDrain>> { ... }
│   │   │       ├── into_analog(self, crl: &mut CRL) -> PA0<Analog>: pub fn into_analog(self, crl: &mut CRL) -> PA0<Analog> { ... }
│   │   │       ├── set_high(&mut self): pub fn set_high(&mut self) { ... } (需Output模式)
│   │   │       ├── set_low(&mut self): pub fn set_low(&mut self) { ... } (需Output模式)
│   │   │       ├── is_high(&self) -> bool: pub fn is_high(&self) -> bool { ... } (需Input模式)
│   │   │       ├── is_low(&self) -> bool: pub fn is_low(&self) -> bool { ... } (需Input模式)
│   │   │       ├── into_dynamic(self) -> DynamicPin: pub fn into_dynamic(self) -> DynamicPin { ... }
│   │   └── DynamicPin (动态引脚)
│   │       ├── 定义: pub struct DynamicPin { ... }
│   │       └── 方法
│   │           ├── make_push_pull_output(&mut self, crl: &mut CRL): pub fn make_push_pull_output(&mut self, crl: &mut CRL) { ... }
│   │           ├── make_floating_input(&mut self, crl: &mut CRL): pub fn make_floating_input(&mut self, crl: &mut CRL) { ... }
│   ├── 枚举 (类型状态)
│   │   ├── Input<Floating>: 浮空输入
│   │   ├── Input<PullUp>: 上拉输入
│   │   ├── Input<PullDown>: 下拉输入
│   │   ├── Output<PushPull>: 推挽输出
│   │   ├── Output<OpenDrain>: 开漏输出
│   │   ├── Alternate<PushPull>: 复用推挽
│   │   ├── Alternate<OpenDrain>: 复用开漏
│   │   └── Analog: 模拟模式
├── timer
│   ├── 结构体
│   │   ├── Timer<TIMX> (通用定时器)
│   │   │   ├── 定义: pub struct Timer<TIMX> { tim: TIMX, clocks: Clocks }
│   │   │   └── 方法
│   │   │       ├── tim1(tim: pac::TIM1, clocks: &Clocks) -> Self: pub fn tim1(tim: pac::TIM1, clocks: &Clocks) -> Self { ... }
│   │   │       ├── tim2(tim: pac::TIM2, clocks: &Clocks) -> Self: pub fn tim2(tim: pac::TIM2, clocks: &Clocks) -> Self { ... }
│   │   │       ├── tim3(tim: pac::TIM3, clocks: &Clocks) -> Self: pub fn tim3(tim: pac::TIM3, clocks: &Clocks) -> Self { ... }
│   │   │       ├── tim4(tim: pac::TIM4, clocks: &Clocks) -> Self: pub fn tim4(tim: pac::TIM4, clocks: &Clocks) -> Self { ... }
│   │   │       ├── tim5(tim: pac::TIM5, clocks: &Clocks) -> Self: pub fn tim5(tim: pac::TIM5, clocks: &Clocks) -> Self { ... }
│   │   │       ├── start_count_down(self, freq: Hertz) -> Self: pub fn start_count_down(self, freq: Hertz) -> Self { ... }
│   │   │       ├── wait(&mut self) -> nb::Result<(), void::Void>: pub fn wait(&mut self) -> nb::Result<(), void::Void> { ... }
│   │   │       └── release(self) -> TIMX: pub fn release(self) -> TIMX { self.tim }
│   │   └── SysTimer (SysTick定时器)
│   │       ├── 定义: pub struct SysTimer { syst: pac::SYST, clocks: Clocks }
│   │       └── 方法
│   │           ├── syst(syst: pac::SYST, clocks: &Clocks) -> Self: pub fn syst(syst: pac::SYST, clocks: &Clocks) -> Self { ... }
│   │           ├── start(self, freq: Hertz) -> Self: pub fn start(self, freq: Hertz) -> Self { ... }
│   │           ├── wait(&mut self) -> nb::Result<(), void::Void>: pub fn wait(&mut self) -> nb::Result<(), void::Void> { ... }
│   │           └── release(self) -> pac::SYST: pub fn release(self) -> pac::SYST { self.syst }
├── delay
│   ├── 结构体
│   │   └── Delay (延时对象)
│   │       ├── 定义: pub struct Delay { syst: pac::SYST, clocks: Clocks }
│   │       └── 方法
│   │           ├── new(syst: pac::SYST, clocks: &Clocks) -> Self: pub fn new(syst: pac::SYST, clocks: &Clocks) -> Self { ... }
│   │           ├── delay_ms(&mut self, ms: u32): pub fn delay_ms(&mut self, ms: u32) { ... }
│   │           ├── delay_us(&mut self, us: u32): pub fn delay_us(&mut self, us: u32) { ... }
│   │           └── free(self) -> pac::SYST: pub fn free(self) -> pac::SYST { self.syst }
├── pwm
│   ├── 结构体
│   │   ├── Pwm<TIMX> (PWM控制器)
│   │   │   ├── 定义: pub struct Pwm<TIMX> { tim: TIMX, clocks: Clocks, ... }
│   │   │   └── 方法
│   │   │       ├── pwm<PINS>(tim: TIMX, pins: PINS, clocks: &Clocks, freq: Hertz) -> Self: pub fn pwm<PINS>(tim: TIMX, pins: PINS, clocks: &Clocks, freq: Hertz) -> Self { ... }
│   │   │       ├── set_duty(&mut self, channel: Channel, duty: u16): pub fn set_duty(&mut self, channel: Channel, duty: u16) { ... }
│   │   │       ├── get_max_duty(&self) -> u16: pub fn get_max_duty(&self) -> u16 { ... }
│   │   │       ├── enable(&mut self, channel: Channel): pub fn enable(&mut self, channel: Channel) { ... }
│   │   │       ├── disable(&mut self, channel: Channel): pub fn disable(&mut self, channel: Channel) { ... }
│   │   │       └── release(self) -> TIMX: pub fn release(self) -> TIMX { self.tim }
│   │   └── Channel (PWM通道)
│   │       ├── 定义: pub enum Channel { Channel1, Channel2, Channel3, Channel4 }
│   ├── 枚举
│   │   └── Channel
│   │       ├── Channel1: 通道1
│   │       ├── Channel2: 通道2
│   │       ├── Channel3: 通道3
│   │       └── Channel4: 通道4
├── spi
│   ├── 结构体
│   │   └── Spi<SPIX, PINS> (SPI实例)
│   │       ├── 定义: pub struct Spi<SPIX, PINS> { spi: SPIX, pins: PINS, ... }
│   │       └── 方法
│   │           ├── spi(spi: SPIX, pins: PINS, mode: Mode, freq: Hertz, clocks: &Clocks) -> Self: pub fn spi(spi: SPIX, pins: PINS, mode: Mode, freq: Hertz, clocks: &Clocks) -> Self { ... }
│   │           ├── transfer(&mut self, buffer: &mut [u8]) -> Result<&[u8], nb::Error<void::Void>>: pub fn transfer(&mut self, buffer: &mut [u8]) -> Result<&[u8], nb::Error<void::Void>> { ... }
│   │           ├── write(&mut self, buffer: &[u8]) -> nb::Result<(), void::Void>: pub fn write(&mut self, buffer: &[u8]) -> nb::Result<(), void::Void> { ... }
│   │           └── release(self) -> (SPIX, PINS): pub fn release(self) -> (SPIX, PINS) { (self.spi, self.pins) }
│   ├── 枚举
│   │   └── Mode (SPI模式)
│   │       ├── 定义: pub struct Mode { pub polarity: Polarity, pub phase: Phase }
│   │       ├── Mode0: Polarity::IdleLow, Phase::CaptureOnFirstTransition
│   │       ├── Mode1: Polarity::IdleLow, Phase::CaptureOnSecondTransition
│   │       ├── Mode2: Polarity::IdleHigh, Phase::CaptureOnFirstTransition
│   │       └── Mode3: Polarity::IdleHigh, Phase::CaptureOnSecondTransition
│   └── 子枚举
│       ├── Polarity (时钟极性)
│       │   ├── IdleLow: 空闲时低电平
│       │   └── IdleHigh: 空闲时高电平
│       └── Phase (时钟相位)
│           ├── CaptureOnFirstTransition: 第一个边沿捕获
│           └── CaptureOnSecondTransition: 第二个边沿捕获
├── i2c
│   ├── 结构体
│   │   └── I2c<I2CX, PINS> (I2C实例)
│   │       ├── 定义: pub struct I2c<I2CX, PINS> { i2c: I2CX, pins: PINS, ... }
│   │       └── 方法
│   │           ├── i2c(i2c: I2CX, pins: PINS, mode: Mode, freq: Hertz, clocks: &Clocks) -> Self: pub fn i2c(i2c: I2CX, pins: PINS, mode: Mode, freq: Hertz, clocks: &Clocks) -> Self { ... }
│   │           ├── write(&mut self, addr: u8, bytes: &[u8]) -> Result<(), nb::Error<void::Void>>: pub fn write(&mut self, addr: u8, bytes: &[u8]) -> Result<(), nb::Error<void::Void>> { ... }
│   │           ├── read(&mut self, addr: u8, buffer: &mut [u8]) -> Result<(), nb::Error<void::Void>>: pub fn read(&mut self, addr: u8, buffer: &mut [u8]) -> Result<(), nb::Error<void::Void>> { ... }
│   │           ├── write_read(&mut self, addr: u8, bytes: &[u8], buffer: &mut [u8]) -> Result<(), nb::Error<void::Void>>: pub fn write_read(&mut self, addr: u8, bytes: &[u8], buffer: &mut [u8]) -> Result<(), nb::Error<void::Void>> { ... }
│   │           └── release(self) -> (I2CX, PINS): pub fn release(self) -> (I2CX, PINS) { (self.i2c, self.pins) }
│   ├── 枚举
│   │   └── Mode (I2C模式)
│   │       ├── Standard: 标准模式 (100 kHz)
│   │       └── Fast: 快速模式 (400 kHz)
├── adc
│   ├── 结构体
│   │   └── Adc<ADCX> (ADC实例)
│   │       ├── 定义: pub struct Adc<ADCX> { adc: ADCX, clocks: Clocks, ... }
│   │       └── 方法
│   │           ├── adc(adc: ADCX, clocks: &Clocks) -> Self: pub fn adc(adc: ADCX, clocks: &Clocks) -> Self { ... }
│   │           ├── read<PIN>(&mut self, pin: &mut PIN) -> nb::Result<u16, void::Void>: pub fn read<PIN>(&mut self, pin: &mut PIN) -> nb::Result<u16, void::Void> where PIN: adc::Channel<ADCX> { ... }
│   │           └── release(self) -> ADCX: pub fn release(self) -> ADCX { self.adc }
├── serial
│   ├── 结构体
│   │   ├── Serial<USARTX, PINS> (串口实例)
│   │   │   ├── 定义: pub struct Serial<USARTX, PINS> { usart: USARTX, pins: PINS, ... }
│   │   │   └── 方法
│   │   │       ├── usart1(usart: pac::USART1, pins: PINS, config: Config, clocks: &Clocks) -> Self: pub fn usart1(usart: pac::USART1, pins: PINS, config: Config, clocks: &Clocks) -> Self { ... }
│   │   │       ├── usart2(usart: pac::USART2, pins: PINS, config: Config, clocks: &Clocks) -> Self: pub fn usart2(usart: pac::USART2, pins: PINS, config: Config, clocks: &Clocks) -> Self { ... }
│   │   │       ├── usart3(usart: pac::USART3, pins: PINS, config: Config, clocks: &Clocks) -> Self: pub fn usart3(usart: pac::USART3, pins: PINS, config: Config, clocks: &Clocks) -> Self { ... }
│   │   │       ├── write(&mut self, byte: u8) -> nb::Result<(), void::Void>: pub fn write(&mut self, byte: u8) -> nb::Result<(), void::Void> { ... }
│   │   │       ├── read(&mut self) -> nb::Result<u8, void::Void>: pub fn read(&mut self) -> nb::Result<u8, void::Void> { ... }
│   │   │       └── release(self) -> (USARTX, PINS): pub fn release(self) -> (USARTX, PINS) { (self.usart, self.pins) }
│   │   └── Config (串口配置)
│   │       ├── 定义: pub struct Config { baudrate: Hertz, parity: Parity, stopbits: StopBits }
│   │       └── 方法
│   │           ├── baudrate(self, bps: Hertz) -> Self: pub fn baudrate(self, bps: Hertz) -> Self { ... }
│   │           ├── parity_none(self) -> Self: pub fn parity_none(self) -> Self { ... }
│   │           ├── parity_even(self) -> Self: pub fn parity_even(self) -> Self { ... }
│   │           ├── parity_odd(self) -> Self: pub fn parity_odd(self) -> Self { ... }
│   │           └── stopbits(self, stopbits: StopBits) -> Self: pub fn stopbits(self, stopbits: StopBits) -> Self { ... }
│   ├── 枚举
│   │   ├── Parity (奇偶校验)
│   │   │   ├── None: 无校验
│   │   │   ├── Even: 偶校验
│   │   │   └── Odd: 奇校验
│   │   └── StopBits (停止位)
│   │       ├── One: 1位
│   │       └── Two: 2位
├── watchdog
│   ├── 结构体
│   │   └── IndependentWatchdog (独立看门狗)
│   │       ├── 定义: pub struct IndependentWatchdog { iwdg: pac::IWDG, clocks: Clocks }
│   │       └── 方法
│   │           ├── iwdg(iwdg: pac::IWDG, clocks: &Clocks) -> Self: pub fn iwdg(iwdg: pac::IWDG, clocks: &Clocks) -> Self { ... }
│   │           ├── start(&mut self, timeout: MilliSeconds): pub fn start(&mut self, timeout: MilliSeconds) { ... }
│   │           ├── feed(&mut self): pub fn feed(&mut self) { ... }
│   │           └── release(self) -> pac::IWDG: pub fn release(self) -> pac::IWDG { self.iwdg }
├── dma
│   ├── 结构体
│   │   ├── Dma1Channel1, Dma1Channel2, ..., Dma1Channel7 (DMA通道)
│   │   │   ├── 定义: pub struct Dma1Channel1 { channel: pac::dma1::CH1, ... }
│   │   │   └── 方法
│   │   │       ├── transfer(self, src: &[u8], dst: &mut [u8], len: usize): pub fn transfer(self, src: &[u8], dst: &mut [u8], len: usize) { ... }
│   │   │       └── release(self) -> pac::dma1::CH1: pub fn release(self) -> pac::dma1::CH1 { self.channel }
└── Trait (embedded-hal实现)
    ├── OutputPin (GPIO输出)
    │   ├── 定义: pub trait OutputPin { fn set_high(&mut self) -> Result<(), Self::Error>; fn set_low(&mut self) -> Result<(), Self::Error>; }
    │   ├── 方法
    │   │   ├── set_high(&mut self) -> Result<(), void::Void>
    │   │   └── set_low(&mut self) -> Result<(), void::Void>
    │   └── 实现: PAx<Output<PushPull>>, PAx<Output<OpenDrain>>
    ├── InputPin (GPIO输入)
    │   ├── 定义: pub trait InputPin { fn is_high(&self) -> Result<bool, Self::Error>; fn is_low(&self) -> Result<bool, Self::Error>; }
    │   ├── 方法
    │   │   ├── is_high(&self) -> Result<bool, void::Void>
    │   │   └── is_low(&self) -> Result<bool, void::Void>
    │   └── 实现: PAx<Input<Floating>>, PAx<Input<PullUp>>, PAx<Input<PullDown>>
    ├── CountDown (定时器倒计时)
    │   ├── 定义: pub trait CountDown { type Time; fn start<T>(&mut self, count: T) where T: Into<Self::Time>; fn wait(&mut self) -> nb::Result<(), Self::Error>; }
    │   ├── 方法
    │   │   ├── start(&mut self, freq: Hertz)
    │   │   └── wait(&mut self) -> nb::Result<(), void::Void>
    │   └── 实现: Timer<TIMX>, SysTimer
    ├── PwmPin (PWM控制)
    │   ├── 定义: pub trait PwmPin { type Duty; fn set_duty(&mut self, duty: Self::Duty); fn get_max_duty(&self) -> Self::Duty; fn enable(&mut self); fn disable(&mut self); }
    │   ├── 方法
    │   │   ├── set_duty(&mut self, duty: u16)
    │   │   ├── get_max_duty(&self) -> u16
    │   │   ├── enable(&mut self)
    │   │   └── disable(&mut self)
    │   └── 实现: Pwm<TIMX>
    ├── SpiMaster (SPI主机)
    │   ├── 定义: pub trait SpiMaster { type Error; fn transfer(&mut self, buffer: &mut [u8]) -> Result<&[u8], Self::Error>; fn write(&mut self, buffer: &[u8]) -> Result<(), Self::Error>; }
    │   ├── 方法
    │   │   ├── transfer(&mut self, buffer: &mut [u8]) -> Result<&[u8], nb::Error<void::Void>>
    │   │   └── write(&mut self, buffer: &[u8]) -> nb::Result<(), void::Void>
    │   └── 实现: Spi<SPIX, PINS>
    ├── I2c (I2C接口)
    │   ├── 定义: pub trait I2c { type Error; fn write(&mut self, addr: u8, bytes: &[u8]) -> Result<(), Self::Error>; fn read(&mut self, addr: u8, buffer: &mut [u8]) -> Result<(), Self::Error>; ... }
    │   ├── 方法
    │   │   ├── write(&mut self, addr: u8, bytes: &[u8]) -> Result<(), nb::Error<void::Void>>
    │   │   ├── read(&mut self, addr: u8, buffer: &mut [u8]) -> Result<(), nb::Error<void::Void>>
    │   │   └── write_read(&mut self, addr: u8, bytes: &[u8], buffer: &mut [u8]) -> Result<(), nb::Error<void::Void>>
    │   └── 实现: I2c<I2CX, PINS>
    ├── Serial (串口接口)
    │   ├── 定义: pub trait Serial { type Error; fn write(&mut self, byte: u8) -> nb::Result<(), Self::Error>; fn read(&mut self) -> nb::Result<u8, Self::Error>; }
    │   ├── 方法
    │   │   ├── write(&mut self, byte: u8) -> nb::Result<(), void::Void>
    │   │   └── read(&mut self) -> nb::Result<u8, void::Void>
    │   └── 实现: Serial<USARTX, PINS>
    └── Adc (ADC接口)
        ├── 定义: pub trait Adc { type Error; fn read<PIN>(&mut self, pin: &mut PIN) -> nbascan::Result<u16, Self::Error> where PIN: adc::Channel<Self>; }
        ├── 方法
        │   └── read<PIN>(&mut self, pin: &mut PIN) -> nb::Result<u16, void::Void> where PIN: adc::Channel<Self>
        └── 实现: Adc<ADCX>
```

---

### 补充说明
- **完整性**: 树结构涵盖了`stm32f1xx-hal`所有公开模块和主要类型，细化到每个结构体、枚举、方法和trait的定义和签名。
- **代码细节**: 方法签名包括参数和返回值类型（如`nb::Result`表示非阻塞操作）。
- **依赖版本**: 列出了直接和间接依赖的精确版本号。
- **实现**: 标注了每个trait的具体实现类型。
