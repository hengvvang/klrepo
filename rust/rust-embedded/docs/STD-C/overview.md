## STM32F103C8T6 外设全解析（基于标准库）

### 外设清单
1. GPIO - General Purpose Input/Output
2. USART - Universal Synchronous/Asynchronous Receiver/Transmitter
3. SPI - Serial Peripheral Interface
4. I2C - Inter-Integrated Circuit
5. TIM - Timer
6. ADC - Analog-to-Digital Converter
7. DMA - Direct Memory Access
8. RTC - Real-Time Clock
9. WWDG - Window Watchdog
10. IWDG - Independent Watchdog
11. EXTI - External Interrupt
12. CAN - Controller Area Network
13. USB - Universal Serial Bus

---

### 1. GPIO - General Purpose Input/Output
#### 功能简介
控制 STM32 的引脚，支持输入、输出、模拟和复用功能。

#### 硬件寄存器结构体
- **`GPIO_TypeDef`**
  ```c
  typedef struct {
      __IO uint32_t CRL;  // 配置低寄存器 (控制引脚 0-7 的模式和速度)
      __IO uint32_t CRH;  // 配置高寄存器 (控制引脚 8-15 的模式和速度)
      __IO uint32_t IDR;  // 输入数据寄存器 (读取引脚状态)
      __IO uint32_t ODR;  // 输出数据寄存器 (设置输出状态)
      __IO uint32_t BSRR; // 位设置/复位寄存器 (高效设置或清零引脚)
      __IO uint32_t BRR;  // 位复位寄存器 (仅复位引脚)
      __IO uint32_t LCKR; // 锁定寄存器 (锁定配置)
  } GPIO_TypeDef;
  ```

#### 初始化结构体
- **`GPIO_InitTypeDef`**
  ```c
  typedef struct {
      uint16_t GPIO_Pin;         // 引脚号，位掩码表示，例如 GPIO_Pin_0 = 0x0001
      GPIOSpeed_TypeDef GPIO_Speed; // 输出速度
      GPIOMode_TypeDef GPIO_Mode;   // 工作模式
  } GPIO_InitTypeDef;
  ```

#### 关键枚举类型
- **`GPIOSpeed_TypeDef`**
  - `GPIO_Speed_10MHz` - 10 MHz 输出速度
  - `GPIO_Speed_2MHz`  - 2 MHz 输出速度
  - `GPIO_Speed_50MHz` - 50 MHz 输出速度
- **`GPIOMode_TypeDef`**
  - `GPIO_Mode_AIN`         - 模拟输入
  - `GPIO_Mode_IN_FLOATING` - 浮空输入
  - `GPIO_Mode_IPD`         - 下拉输入
  - `GPIO_Mode_IPU`         - 上拉输入
  - `GPIO_Mode_Out_OD`      - 开漏输出
  - `GPIO_Mode_Out_PP`      - 推挽输出
  - `GPIO_Mode_AF_OD`       - 复用开漏输出
  - `GPIO_Mode_AF_PP`       - 复用推挽输出

#### API 函数列表
- **`void GPIO_Init(GPIO_TypeDef* GPIOx, GPIO_InitTypeDef* GPIO_InitStruct)`**
  - 初始化 GPIO，参数：端口（如 GPIOA）、初始化结构体指针。
- **`uint8_t GPIO_ReadInputDataBit(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin)`**
  - 读取单个引脚输入状态，返回 0 或 1。
- **`uint16_t GPIO_ReadInputData(GPIO_TypeDef* GPIOx)`**
  - 读取整个端口输入状态，返回 16 位数据。
- **`void GPIO_SetBits(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin)`**
  - 将指定引脚置高。
- **`void GPIO_ResetBits(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin)`**
  - 将指定引脚置低。
- **`void GPIO_WriteBit(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin, BitAction BitVal)`**
  - 写单个引脚状态，`BitAction` 为 `Bit_SET` 或 `Bit_RESET`。
- **`void GPIO_Write(GPIO_TypeDef* GPIOx, uint16_t PortVal)`**
  - 写整个端口输出值。
- **`void GPIO_PinRemapConfig(uint32_t GPIO_Remap, FunctionalState NewState)`**
  - 配置引脚复用功能，`GPIO_Remap` 如 `GPIO_Remap_SPI1`。

#### 规律总结
- 函数以 `GPIO_` 开头，操作目标明确（读/写/初始化）。
- `GPIOx` 表示端口（如 `GPIOA`、`GPIOB`），支持 A 到 E。
- `GPIO_Pin` 使用位掩码，范围 `GPIO_Pin_0` 到 `GPIO_Pin_15`。
- 时钟使能需调用 `RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOx, ENABLE)`。

---

### 2. USART - Universal Synchronous/Asynchronous Receiver/Transmitter
#### 功能简介
支持异步（如 UART）或同步串行通信，STM32F103C8T6 有 USART1、USART2、USART3。

#### 硬件寄存器结构体
- **`USART_TypeDef`**
  ```c
  typedef struct {
      __IO uint16_t SR;   // 状态寄存器 (如 TXE、RXNE 标志)
      uint16_t RESERVED0; // 保留字节对齐
      __IO uint16_t DR;   // 数据寄存器 (发送/接收数据)
      uint16_t RESERVED1;
      __IO uint16_t BRR;  // 波特率寄存器 (设置波特率分频)
      uint16_t RESERVED2;
      __IO uint16_t CR1;  // 控制寄存器 1 (使能、字长等)
      uint16_t RESERVED3;
      __IO uint16_t CR2;  // 控制寄存器 2 (停止位、时钟)
      uint16_t RESERVED4;
      __IO uint16_t CR3;  // 控制寄存器 3 (流控、DMA)
      uint16_t RESERVED5;
      __IO uint16_t GTPR; // 保护时间和预分频寄存器
      uint16_t RESERVED6;
  } USART_TypeDef;
  ```

#### 初始化结构体
- **`USART_InitTypeDef`**
  ```c
  typedef struct {
      uint32_t USART_BaudRate;           // 波特率，如 115200
      uint16_t USART_WordLength;         // 数据长度
      uint16_t USART_StopBits;           // 停止位数
      uint16_t USART_Parity;             // 校验类型
      uint16_t USART_Mode;               // 模式（发送/接收）
      uint16_t USART_HardwareFlowControl;// 硬件流控制
  } USART_InitTypeDef;
  ```

#### 关键枚举类型
- **`USART_WordLength`**
  - `USART_WordLength_8b` - 8 位数据
  - `USART_WordLength_9b` - 9 位数据
- **`USART_StopBits`**
  - `USART_StopBits_1`   - 1 位停止位
  - `USART_StopBits_0_5` - 0.5 位停止位
  - `USART_StopBits_2`   - 2 位停止位
  - `USART_StopBits_1_5` - 1.5 位停止位
- **`USART_Parity`**
  - `USART_Parity_No`   - 无校验
  - `USART_Parity_Even` - 偶校验
  - `USART_Parity_Odd`  - 奇校验
- **`USART_Mode`**
  - `USART_Mode_Rx` - 接收模式
  - `USART_Mode_Tx` - 发送模式（可组合）
- **`USART_HardwareFlowControl`**
  - `USART_HardwareFlowControl_None` - 无流控
  - `USART_HardwareFlowControl_RTS`  - 请求发送
  - `USART_HardwareFlowControl_CTS`  - 清除发送

#### API 函数列表
- **`void USART_Init(USART_TypeDef* USARTx, USART_InitTypeDef* USART_InitStruct)`**
  - 初始化串口参数。
- **`void USART_Cmd(USART_TypeDef* USARTx, FunctionalState NewState)`**
  - 使能或禁用串口，`NewState` 为 `ENABLE` 或 `DISABLE`。
- **`void USART_SendData(USART_TypeDef* USARTx, uint16_t Data)`**
  - 发送数据（8 或 9 位）。
- **`uint16_t USART_ReceiveData(USART_TypeDef* USARTx)`**
  - 接收数据。
- **`FlagStatus USART_GetFlagStatus(USART_TypeDef* USARTx, uint16_t USART_FLAG)`**
  - 检查状态标志，如 `USART_FLAG_TXE`（发送缓冲空）。
- **`void USART_ITConfig(USART_TypeDef* USARTx, uint16_t USART_IT, FunctionalState NewState)`**
  - 配置中断，如 `USART_IT_RXNE`（接收中断）。

#### 规律总结
- 函数以 `USART_` 开头，参数以 `USARTx`（如 `USART1`）开头。
- 时钟使能：`RCC_APB2PeriphClockCmd`（USART1）或 `RCC_APB1PeriphClockCmd`（USART2/3）。
- 数据操作需配合状态标志检查。

---

### 3. SPI - Serial Peripheral Interface
#### 功能简介
高速同步串行通信，支持主从模式，STM32F103C8T6 有 SPI1、SPI2。

#### 硬件寄存器结构体
- **`SPI_TypeDef`**
  ```c
  typedef struct {
      __IO uint16_t CR1;     // 控制寄存器 1 (模式、波特率)
      uint16_t RESERVED0;
      __IO uint16_t CR2;     // 控制寄存器 2 (中断、DMA)
      uint16_t RESERVED1;
      __IO uint16_t SR;      // 状态寄存器 (TXE、RXNE)
      uint16_t RESERVED2;
      __IO uint16_t DR;      // 数据寄存器
      uint16_t RESERVED3;
      __IO uint16_t CRCPR;   // CRC 多项式寄存器
      uint16_t RESERVED4;
      __IO uint16_t RXCRCR;  // 接收 CRC 寄存器
      uint16_t RESERVED5;
      __IO uint16_t TXCRCR;  // 发送 CRC 寄存器
      uint16_t RESERVED6;
  } SPI_TypeDef;
  ```

#### 初始化结构体
- **`SPI_InitTypeDef`**
  ```c
  typedef struct {
      uint16_t SPI_Direction;         // 数据方向
      uint16_t SPI_Mode;              // 主从模式
      uint16_t SPI_DataSize;          // 数据长度
      uint16_t SPI_CPOL;              // 时钟极性
      uint16_t SPI_CPHA;              // 时钟相位
      uint16_t SPI_NSS;               // 片选控制
      uint16_t SPI_BaudRatePrescaler; // 波特率预分频
      uint16_t SPI_FirstBit;          // 数据顺序
      uint16_t SPI_CRCPolynomial;     // CRC 多项式
  } SPI_InitTypeDef;
  ```

#### 关键枚举类型
- **`SPI_Direction`**
  - `SPI_Direction_2Lines_FullDuplex` - 双线全双工
  - `SPI_Direction_2Lines_RxOnly`     - 双线仅接收
- **`SPI_Mode`**
  - `SPI_Mode_Master` - 主模式
  - `SPI_Mode_Slave`  - 从模式
- **`SPI_DataSize`**
  - `SPI_DataSize_16b` - 16 位
  - `SPI_DataSize_8b`  - 8 位
- **`SPI_CPOL`**
  - `SPI_CPOL_Low`  - 空闲时低电平
  - `SPI_CPOL_High` - 空闲时高电平
- **`SPI_CPHA`**
  - `SPI_CPHA_1Edge` - 第一个时钟边沿采样
  - `SPI_CPHA_2Edge` - 第二个时钟边沿采样

#### API 函数列表
- **`void SPI_Init(SPI_TypeDef* SPIx, SPI_InitTypeDef* SPI_InitStruct)`**
  - 初始化 SPI 参数。
- **`void SPI_Cmd(SPI_TypeDef* SPIx, FunctionalState NewState)`**
  - 使能或禁用 SPI。
- **`void SPI_I2S_SendData(SPI_TypeDef* SPIx, uint16_t Data)`**
  - 发送数据。
- **`uint16_t SPI_I2S_ReceiveData(SPI_TypeDef* SPIx)`**
  - 接收数据。
- **`FlagStatus SPI_I2S_GetFlagStatus(SPI_TypeDef* SPIx, uint16_t SPI_I2S_FLAG)`**
  - 检查标志，如 `SPI_I2S_FLAG_TXE`。

#### 规律总结
- 函数以 `SPI_` 或 `SPI_I2S_` 开头，`SPIx` 如 `SPI1`。
- 时钟使能：`RCC_APB2PeriphClockCmd`（SPI1）或 `RCC_APB1PeriphClockCmd`（SPI2）。

---

### 4. I2C - Inter-Integrated Circuit
#### 功能简介
双线串行通信，支持多主多从，STM32F103C8T6 有 I2C1、I2C2。

#### 硬件寄存器结构体
- **`I2C_TypeDef`**
  ```c
  typedef struct {
      __IO uint16_t CR1;   // 控制寄存器 1 (使能、模式)
      uint16_t RESERVED0;
      __IO uint16_t CR2;   // 控制寄存器 2 (频率、中断)
      uint16_t RESERVED1;
      __IO uint16_t OAR1;  // 自身地址寄存器 1
      uint16_t RESERVED2;
      __IO uint16_t OAR2;  // 自身地址寄存器 2
      uint16_t RESERVED3;
      __IO uint16_t DR;    // 数据寄存器
      uint16_t RESERVED4;
      __IO uint16_t SR1;   // 状态寄存器 1 (事件标志)
      uint16_t RESERVED5;
      __IO uint16_t SR2;   // 状态寄存器 2 (忙碌、从地址)
      uint16_t RESERVED6;
      __IO uint16_t CCR;   // 时钟控制寄存器
      uint16_t RESERVED7;
      __IO uint16_t TRISE;// 上升时间寄存器
      uint16_t RESERVED8;
  } I2C_TypeDef;
  ```

#### 初始化结构体
- **`I2C_InitTypeDef`**
  ```c
  typedef struct {
      uint32_t I2C_ClockSpeed;         // 时钟速度 (Hz)
      uint16_t I2C_Mode;               // 模式
      uint16_t I2C_DutyCycle;          // 占空比
      uint16_t I2C_OwnAddress1;        // 自身地址
      uint16_t I2C_Ack;                // 应答
      uint16_t I2C_AcknowledgedAddress;// 应答地址位数
  } I2C_InitTypeDef;
  ```

#### 关键枚举类型
- **`I2C_Mode`**
  - `I2C_Mode_I2C`    - I2C 模式
  - `I2C_Mode_SMBusDevice` - SMBus 设备模式
- **`I2C_DutyCycle`**
  - `I2C_DutyCycle_16_9` - 16:9 占空比
  - `I2C_DutyCycle_2`    - 2:1 占空比
- **`I2C_Ack`**
  - `I2C_Ack_Enable`  - 启用应答
  - `I2C_Ack_Disable` - 禁用应答

#### API 函数列表
- **`void I2C_Init(I2C_TypeDef* I2Cx, I2C_InitTypeDef* I2C_InitStruct)`**
  - 初始化 I2C。
- **`void I2C_Cmd(I2C_TypeDef* I2Cx, FunctionalState NewState)`**
  - 使能或禁用 I2C。
- **`void I2C_SendData(I2C_TypeDef* I2Cx, uint8_t Data)`**
  - 发送数据。
- **`uint8_t I2C_ReceiveData(I2C_TypeDef* I2Cx)`**
  - 接收数据。
- **`FlagStatus I2C_GetFlagStatus(I2C_TypeDef* I2Cx, uint32_t I2C_FLAG)`**
  - 检查状态，如 `I2C_FLAG_BUSY`。

#### 规律总结
- 函数以 `I2C_` 开头，`I2Cx` 如 `I2C1`。
- 时钟使能：`RCC_APB1PeriphClockCmd`。

---

### 5. TIM - Timer
#### 功能简介
支持计时、PWM、输入捕获等，STM32F103C8T6 有 TIM1-TIM4。

#### 硬件寄存器结构体
- **`TIM_TypeDef`**
  ```c
  typedef struct {
      __IO uint16_t CR1;   // 控制寄存器 1
      uint16_t RESERVED0;
      __IO uint16_t CR2;   // 控制寄存器 2
      uint16_t RESERVED1;
      __IO uint16_t SMCR;  // 从模式控制寄存器
      uint16_t RESERVED2;
      __IO uint16_t DIER;  // DMA/中断使能寄存器
      uint16_t RESERVED3;
      __IO uint16_t SR;    // 状态寄存器
      uint16_t RESERVED4;
      __IO uint16_t EGR;   // 事件生成寄存器
      uint16_t RESERVED5;
      __IO uint16_t CCMR1; // 捕获/比较模式寄存器 1
      uint16_t RESERVED6;
      __IO uint16_t CCMR2; // 捕获/比较模式寄存器 2
      uint16_t RESERVED7;
      __IO uint16_t CCER;  // 捕获/比较使能寄存器
      uint16_t RESERVED8;
      __IO uint16_t CNT;   // 计数器
      uint16_t RESERVED9;
      __IO uint16_t PSC;   // 预分频器
      uint16_t RESERVED10;
      __IO uint16_t ARR;   // 自动重装载寄存器
      uint16_t RESERVED11;
      __IO uint16_t RCR;   // 重复计数器寄存器
      uint16_t RESERVED12;
      __IO uint16_t CCR1;  // 捕获/比较寄存器 1
      uint16_t RESERVED13;
      __IO uint16_t CCR2;  // 捕获/比较寄存器 2
      uint16_t RESERVED14;
      __IO uint16_t CCR3;  // 捕获/比较寄存器 3
      uint16_t RESERVED15;
      __IO uint16_t CCR4;  // 捕获/比较寄存器 4
      uint16_t RESERVED16;
      __IO uint16_t BDTR;  // 刹车和死区寄存器 (TIM1)
      uint16_t RESERVED17;
      __IO uint16_t DCR;   // DMA 控制寄存器
      uint16_t RESERVED18;
      __IO uint16_t DMAR;  // DMA 地址寄存器
      uint16_t RESERVED19;
  } TIM_TypeDef;
  ```

#### 初始化结构体
- **`TIM_TimeBaseInitTypeDef`**
  ```c
  typedef struct {
      uint16_t TIM_Prescaler;        // 预分频值
      uint16_t TIM_CounterMode;      // 计数模式
      uint16_t TIM_Period;           // 周期 (ARR 值)
      uint16_t TIM_ClockDivision;    // 时钟分频
      uint8_t TIM_RepetitionCounter; // 重复计数 (高级定时器)
  } TIM_TimeBaseInitTypeDef;
  ```
- **`TIM_OCInitTypeDef`** (输出比较)
  ```c
  typedef struct {
      uint16_t TIM_OCMode;       // 输出比较模式
      uint16_t TIM_OutputState;  // 输出使能
      uint16_t TIM_Pulse;        // 脉宽 (CCR 值)
      uint16_t TIM_OCPolarity;   // 输出极性
  } TIM_OCInitTypeDef;
  ```

#### 关键枚举类型
- **`TIM_CounterMode`**
  - `TIM_CounterMode_Up`   - 向上计数
  - `TIM_CounterMode_Down` - 向下计数
- **`TIM_OCMode`**
  - `TIM_OCMode_PWM1` - PWM 模式 1
  - `TIM_OCMode_PWM2` - PWM 模式 2

#### API 函数列表
- **`void TIM_TimeBaseInit(TIM_TypeDef* TIMx, TIM_TimeBaseInitTypeDef* TIM_TimeBaseInitStruct)`**
  - 初始化定时器基本参数。
- **`void TIM_Cmd(TIM_TypeDef* TIMx, FunctionalState NewState)`**
  - 使能或禁用定时器。
- **`void TIM_OC1Init(TIM_TypeDef* TIMx, TIM_OCInitTypeDef* TIM_OCInitStruct)`**
  - 初始化通道 1 输出比较 (2-4 类似)。
- **`void TIM_SetCounter(TIM_TypeDef* TIMx, uint16_t Counter)`**
  - 设置计数器值。
- **`void TIM_ITConfig(TIM_TypeDef* TIMx, uint16_t TIM_IT, FunctionalState NewState)`**
  - 配置中断，如 `TIM_IT_Update`。

#### 规律总结
- 函数以 `TIM_` 开头，`TIMx` 如 `TIM1`。
- 时钟使能：`RCC_APB2PeriphClockCmd`（TIM1）或 `RCC_APB1PeriphClockCmd`（TIM2-4）。

---

### 6. ADC - Analog-to-Digital Converter
#### 功能简介
将模拟信号转换为数字信号，STM32F103C8T6 有 ADC1、ADC2。

#### 硬件寄存器结构体
- **`ADC_TypeDef`**
  ```c
  typedef struct {
      __IO uint32_t SR;    // 状态寄存器
      __IO uint32_t CR1;   // 控制寄存器 1
      __IO uint32_t CR2;   // 控制寄存器 2
      __IO uint32_t SMPR1; // 采样时间寄存器 1
      __IO uint32_t SMPR2; // 采样时间寄存器 2
      __IO uint32_t JOFR1; // 注入偏移寄存器 1
      __IO uint32_t JOFR2; // 注入偏移寄存器 2
      __IO uint32_t JOFR3; // 注入偏移寄存器 3
      __IO uint32_t JOFR4; // 注入偏移寄存器 4
      __IO uint32_t HTR;   // 高阈值寄存器
      __IO uint32_t LTR;   // 低阈值寄存器
      __IO uint32_t SQR1;  // 规则序列寄存器 1
      __IO uint32_t SQR2;  // 规则序列寄存器 2
      __IO uint32_t SQR3;  // 规则序列寄存器 3
      __IO uint32_t JSQR;  // 注入序列寄存器
      __IO uint32_t JDR1;  // 注入数据寄存器 1
      __IO uint32_t JDR2;  // 注入数据寄存器 2
      __IO uint32_t JDR3;  // 注入数据寄存器 3
      __IO uint32_t JDR4;  // 注入数据寄存器 4
      __IO uint32_t DR;    // 规则数据寄存器
  } ADC_TypeDef;
  ```

#### 初始化结构体
- **`ADC_InitTypeDef`**
  ```c
  typedef struct {
      uint32_t ADC_Mode;              // 工作模式
      FunctionalState ADC_ScanConvMode; // 扫描模式
      FunctionalState ADC_ContinuousConvMode; // 连续转换
      uint32_t ADC_ExternalTrigConv;  // 外部触发
      uint32_t ADC_DataAlign;         // 数据对齐
      uint8_t ADC_NbrOfChannel;       // 通道数
  } ADC_InitTypeDef;
  ```

#### 关键枚举类型
- **`ADC_Mode`**
  - `ADC_Mode_Independent` - 独立模式
  - `ADC_Mode_RegSimult`   - 规则同时模式
- **`ADC_DataAlign`**
  - `ADC_DataAlign_Right` - 右对齐
  - `ADC_DataAlign_Left`  - 左对齐

#### API 函数列表
- **`void ADC_Init(ADC_TypeDef* ADCx, ADC_InitTypeDef* ADC_InitStruct)`**
  - 初始化 ADC。
- **`void ADC_Cmd(ADC_TypeDef* ADCx, FunctionalState NewState)`**
  - 使能或禁用 ADC。
- **`uint16_t ADC_GetConversionValue(ADC_TypeDef* ADCx)`**
  - 获取转换结果。
- **`void ADC_RegularChannelConfig(ADC_TypeDef* ADCx, uint8_t ADC_Channel, uint8_t Rank, uint8_t ADC_SampleTime)`**
  - 配置规则通道。

#### 规律总结
- 函数以 `ADC_` 开头，`ADCx` 如 `ADC1`。
- 时钟使能：`RCC_APB2PeriphClockCmd`。

---

### 7. DMA - Direct Memory Access
#### 功能简介
直接在内存和外设间传输数据，STM32F103C8T6 有 DMA1（7 通道）。

#### 硬件寄存器结构体
- **`DMA_Channel_TypeDef`**
  ```c
  typedef struct {
      __IO uint32_t CCR;   // 配置寄存器
      __IO uint32_t CNDTR; // 数据量寄存器
      __IO uint32_t CPAR;  // 外设地址寄存器
      __IO uint32_t CMAR;  // 内存地址寄存器
  } DMA_Channel_TypeDef;
  ```

#### 初始化结构体
- **`DMA_InitTypeDef`**
  ```c
  typedef struct {
      uint32_t DMA_PeripheralBaseAddr; // 外设基地址
      uint32_t DMA_MemoryBaseAddr;     // 内存基地址
      uint32_t DMA_DIR;                // 传输方向
      uint32_t DMA_BufferSize;         // 缓冲区大小
      uint32_t DMA_PeripheralInc;      // 外设地址增量
      uint32_t DMA_MemoryInc;          // 内存地址增量
      uint32_t DMA_PeripheralDataSize; // 外设数据宽度
      uint32_t DMA_MemoryDataSize;     // 内存数据宽度
      uint32_t DMA_Mode;               // 模式
      uint32_t DMA_Priority;           // 优先级
      uint32_t DMA_M2M;                // 内存到内存
  } DMA_InitTypeDef;
  ```

#### 关键枚举类型
- **`DMA_DIR`**
  - `DMA_DIR_PeripheralDST` - 外设为目标
  - `DMA_DIR_PeripheralSRC` - 外设为源
- **`DMA_Mode`**
  - `DMA_Mode_Circular` - 循环模式
  - `DMA_Mode_Normal`   - 正常模式

#### API 函数列表
- **`void DMA_Init(DMA_Channel_TypeDef* DMAy_Channelx, DMA_InitTypeDef* DMA_InitStruct)`**
  - 初始化 DMA 通道。
- **`void DMA_Cmd(DMA_Channel_TypeDef* DMAy_Channelx, FunctionalState NewState)`**
  - 使能或禁用 DMA。
- **`FlagStatus DMA_GetFlagStatus(uint32_t DMAy_FLAG)`**
  - 检查标志，如 `DMA1_FLAG_TC1`。

#### 规律总结
- 函数以 `DMA_` 开头，`DMAy_Channelx` 如 `DMA1_Channel1`。
- 时钟使能：`RCC_AHBPeriphClockCmd`。

---

### 8. RTC - Real-Time Clock
#### 功能简介
提供实时时钟功能。

#### 硬件寄存器结构体
- **`RTC_TypeDef`**
  ```c
  typedef struct {
      __IO uint32_t CRH;   // 控制寄存器高
      __IO uint32_t CRL;   // 控制寄存器低
      __IO uint32_t PRLH;  // 预分频高
      __IO uint32_t PRLL;  // 预分频低
      __IO uint32_t DIVH;  // 分频高
      __IO uint32_t DIVL;  // 分频低
      __IO uint32_t CNTH;  // 计数器高
      __IO uint32_t CNTL;  // 计数器低
      __IO uint32_t ALRH;  // 报警高
      __IO uint32_t ALRL;  // 报警低
  } RTC_TypeDef;
  ```

#### API 函数列表
- **`void RTC_SetCounter(uint32_t CounterValue)`**
  - 设置计数器值。
- **`uint32_t RTC_GetCounter(void)`**
  - 获取计数器值。
- **`void RTC_ITConfig(uint32_t RTC_IT, FunctionalState NewState)`**
  - 配置中断，如 `RTC_IT_SEC`。

#### 规律总结
- 函数以 `RTC_` 开头，无初始化结构体。
- 时钟使能：`RCC_APB1PeriphClockCmd`。

---

### 9. WWDG - Window Watchdog
#### 功能简介
窗口看门狗，防止程序异常。

#### 硬件寄存器结构体
- **`WWDG_TypeDef`**
  ```c
  typedef struct {
      __IO uint32_t CR;  // 控制寄存器
      __IO uint32_t CFR; // 配置寄存器
      __IO uint32_t SR;  // 状态寄存器
  } WWDG_TypeDef;
  ```

#### API 函数列表
- **`void WWDG_Enable(uint8_t Counter)`**
  - 启用看门狗并设置计数器。
- **`void WWDG_SetPrescaler(uint32_t WWDG_Prescaler)`**
  - 设置预分频，如 `WWDG_Prescaler_1`。
- **`void WWDG_SetWindowValue(uint8_t WindowValue)`**
  - 设置窗口值。

#### 规律总结
- 函数以 `WWDG_` 开头，参数简单。
- 时钟使能：`RCC_APB1PeriphClockCmd`。

---

### 10. IWDG - Independent Watchdog
#### 功能简介
独立看门狗，使用独立时钟。

#### 硬件寄存器结构体
- **`IWDG_TypeDef`**
  ```c
  typedef struct {
      __IO uint32_t KR;  // 键值寄存器
      __IO uint32_t PR;  // 预分频寄存器
      __IO uint32_t RLR; // 重装载寄存器
      __IO uint32_t SR;  // 状态寄存器
  } IWDG_TypeDef;
  ```

#### API 函数列表
- **`void IWDG_WriteAccessCmd(uint16_t IWDG_WriteAccess)`**
  - 使能写访问，如 `IWDG_WriteAccess_Enable`。
- **`void IWDG_SetPrescaler(uint8_t IWDG_Prescaler)`**
  - 设置预分频，如 `IWDG_Prescaler_4`。
- **`void IWDG_ReloadCounter(void)`**
  - 喂狗。

#### 规律总结
- 函数以 `IWDG_` 开头，注重喂狗操作。

---

### 11. EXTI - External Interrupt
#### 功能简介
外部中断处理。

#### 硬件寄存器结构体
- **`EXTI_TypeDef`**
  ```c
  typedef struct {
      __IO uint32_t IMR;   // 中断掩码寄存器
      __IO uint32_t EMR;   // 事件掩码寄存器
      __IO uint32_t RTSR;  // 上升触发选择寄存器
      __IO uint32_t FTSR;  // 下降触发选择寄存器
      __IO uint32_t SWIER; // 软件中断事件寄存器
      __IO uint32_t PR;    // 挂起寄存器
  } EXTI_TypeDef;
  ```

#### 初始化结构体
- **`EXTI_InitTypeDef`**
  ```c
  typedef struct {
      uint32_t EXTI_Line;       // 中断线，如 `EXTI_Line0`
      EXTIMode_TypeDef EXTI_Mode; // 模式
      EXTITrigger_TypeDef EXTI_Trigger; // 触发方式
      FunctionalState EXTI_LineCmd; // 使能
  } EXTI_InitTypeDef;
  ```

#### API 函数列表
- **`void EXTI_Init(EXTI_InitTypeDef* EXTI_InitStruct)`**
  - 初始化中断线。
- **`FlagStatus EXTI_GetFlagStatus(uint32_t EXTI_Line)`**
  - 检查中断标志。

#### 规律总结
- 函数以 `EXTI_` 开头，注重线配置。
- 时钟使能：`RCC_APB2PeriphClockCmd`。

---

### 12. CAN - Controller Area Network
#### 功能简介
CAN 总线通信，STM32F103C8T6 有 CAN1。

#### 硬件寄存器结构体
- **`CAN_TypeDef`**
  ```c
  typedef struct {
      __IO uint32_t MCR;  // 主控制寄存器
      __IO uint32_t MSR;  // 主状态寄存器
      __IO uint32_t TSR;  // 传输状态寄存器
      // 其他复杂寄存器略
  } CAN_TypeDef;
  ```

#### 初始化结构体
- **`CAN_InitTypeDef`**
  ```c
  typedef struct {
      uint16_t CAN_Prescaler;   // 预分频
      uint8_t CAN_Mode;         // 模式
      uint8_t CAN_SJW;          // 同步跳跃宽度
      uint8_t CAN_BS1;          // 时间段 1
      uint8_t CAN_BS2;          // 时间段 2
      FunctionalState CAN_TTCM; // 时间触发通信
      FunctionalState CAN_ABOM; // 自动离线管理
      FunctionalState CAN_AWUM; // 自动唤醒
      FunctionalState CAN_NART;// 非自动重传
      FunctionalState CAN_RFLM;// 接收 FIFO 锁定
      FunctionalState CAN_TXFP;// 发送 FIFO 优先级
  } CAN_InitTypeDef;
  ```

#### API 函数列表
- **`void CAN_Init(CAN_TypeDef* CANx, CAN_InitTypeDef* CAN_InitStruct)`**
  - 初始化 CAN。
- **`uint8_t CAN_Transmit(CAN_TypeDef* CANx, CanTxMsg* TxMessage)`**
  - 发送消息。

#### 规律总结
- 函数以 `CAN_` 开头，参数复杂。
- 时钟使能：`RCC_APB1PeriphClockCmd`。

---

### 13. USB - Universal Serial Bus
#### 功能简介
USB 2.0 全速设备接口。

#### 说明
标准库未直接提供 USB 完整支持，需结合专用 USB 库（如 STM32 USB Device Library）。

#### 规律总结
- 依赖外部库，非标准库核心。

---

### 总体规律总结
1. **命名**：函数以模块缩写开头（如 `GPIO_`），参数以实例开头（如 `GPIOx`）。
2. **结构体**：硬件用 `TypeDef`，初始化用 `InitTypeDef`。
3. **枚举**：多用枚举定义配置选项。
4. **时钟**：外设需使能时钟，APB1/APB2/AHB 不同。
5. **操作**：常见动词 `Init`、`Cmd`、`Set`、`Get`。

如需进一步优化或补充，请告诉我！
