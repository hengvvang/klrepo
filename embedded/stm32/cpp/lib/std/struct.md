按照你的要求，我将以每个外设对应的硬件结构体（`XXX_TypeDef`）为中心，详细介绍其相关的初始化结构体（`XXX_InitTypeDef`）、枚举类型、其他数据类型，以及所有标准库函数，明确每个函数如何操作硬件结构体的具体字段。这种方式能清晰展示标准库对外设的抽象逻辑，突出函数与寄存器字段的对应关系。

以下基于 STM32F103C8T6 和 STM32F10x Standard Peripheral Library，内容将精炼且详尽，确保每个细节到位。

---

## STM32F103C8T6 外设全解析（以硬件结构体为中心）

---

### 1. GPIO - General Purpose Input/Output
#### 硬件结构体
- **`GPIO_TypeDef`**
  ```c
  typedef struct {
      __IO uint32_t CRL;  // 配置低寄存器 (引脚 0-7 模式/速度)
      __IO uint32_t CRH;  // 配置高寄存器 (引脚 8-15 模式/速度)
      __IO uint32_t IDR;  // 输入数据寄存器 (读取引脚状态)
      __IO uint32_t ODR;  // 输出数据寄存器 (设置输出状态)
      __IO uint32_t BSRR; // 位设置/复位寄存器 (高效控制引脚)
      __IO uint32_t BRR;  // 位复位寄存器 (仅复位引脚)
      __IO uint32_t LCKR; // 锁定寄存器 (锁定配置)
  } GPIO_TypeDef;
  ```

#### 初始化结构体
- **`GPIO_InitTypeDef`**
  ```c
  typedef struct {
      uint16_t GPIO_Pin;         // 引脚号 (如 GPIO_Pin_0 = 0x0001)
      GPIOSpeed_TypeDef GPIO_Speed; // 输出速度
      GPIOMode_TypeDef GPIO_Mode;   // 工作模式
  } GPIO_InitTypeDef;
  ```

#### 枚举类型
- **`GPIOSpeed_TypeDef`**
  - `GPIO_Speed_10MHz` - 配置 `CRL`/`CRH` 的 CNF 和 MODE 位为 10 MHz。
  - `GPIO_Speed_2MHz`
  - `GPIO_Speed_50MHz`
- **`GPIOMode_TypeDef`**
  - `GPIO_Mode_AIN`         - 模拟输入 (`CRL`/`CRH` 的 CNF = 00, MODE = 00)
  - `GPIO_Mode_IN_FLOATING` - 浮空输入 (`CNF = 01, MODE = 00`)
  - `GPIO_Mode_IPD`         - 下拉输入 (`CNF = 10, MODE = 00` + `ODR` 清零)
  - `GPIO_Mode_IPU`         - 上拉输入 (`CNF = 10, MODE = 00` + `ODR` 置一)
  - `GPIO_Mode_Out_OD`      - 开漏输出 (`CNF = 01, MODE = 非 00`)
  - `GPIO_Mode_Out_PP`      - 推挽输出 (`CNF = 00, MODE = 非 00`)
  - `GPIO_Mode_AF_OD`       - 复用开漏 (`CNF = 11, MODE = 非 00`)
  - `GPIO_Mode_AF_PP`       - 复用推挽 (`CNF = 10, MODE = 非 00`)

#### 函数及其字段操作
- **`void GPIO_Init(GPIO_TypeDef* GPIOx, GPIO_InitTypeDef* GPIO_InitStruct)`**
  - 操作 `CRL` 和 `CRH`，根据 `GPIO_Pin` 设置对应引脚的 `CNF`（模式）和 `MODE`（速度）。
- **`uint8_t GPIO_ReadInputDataBit(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin)`**
  - 读取 `IDR` 的指定位，返回 0 或 1。
- **`uint16_t GPIO_ReadInputData(GPIO_TypeDef* GPIOx)`**
  - 读取整个 `IDR`，返回 16 位数据。
- **`void GPIO_SetBits(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin)`**
  - 写 `BSRR` 的设置位（高 16 位），置位 `ODR` 对应位。
- **`void GPIO_ResetBits(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin)`**
  - 写 `BSRR` 的复位位（低 16 位）或 `BRR`，清零 `ODR` 对应位。
- **`void GPIO_WriteBit(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin, BitAction BitVal)`**
  - 根据 `BitVal`（`Bit_SET` 或 `Bit_RESET`），操作 `BSRR` 控制 `ODR`。
- **`void GPIO_Write(GPIO_TypeDef* GPIOx, uint16_t PortVal)`**
  - 直接写 `ODR`，设置整个端口输出。
- **`void GPIO_PinLockConfig(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin)`**
  - 操作 `LCKR`，锁定指定引脚的配置。

---

### 2. USART - Universal Synchronous/Asynchronous Receiver/Transmitter
#### 硬件结构体
- **`USART_TypeDef`**
  ```c
  typedef struct {
      __IO uint16_t SR;   // 状态寄存器 (如 TXE、RXNE)
      uint16_t RESERVED0;
      __IO uint16_t DR;   // 数据寄存器
      uint16_t RESERVED1;
      __IO uint16_t BRR;  // 波特率寄存器
      uint16_t RESERVED2;
      __IO uint16_t CR1;  // 控制寄存器 1 (使能、字长)
      uint16_t RESERVED3;
      __IO uint16_t CR2;  // 控制寄存器 2 (停止位)
      uint16_t RESERVED4;
      __IO uint16_t CR3;  // 控制寄存器 3 (流控)
      uint16_t RESERVED5;
      __IO uint16_t GTPR; // 保护时间和预分频
      uint16_t RESERVED6;
  } USART_TypeDef;
  ```

#### 初始化结构体
- **`USART_InitTypeDef`**
  ```c
  typedef struct {
      uint32_t USART_BaudRate;           // 波特率
      uint16_t USART_WordLength;         // 数据长度
      uint16_t USART_StopBits;           // 停止位
      uint16_t USART_Parity;             // 校验
      uint16_t USART_Mode;               // 模式
      uint16_t USART_HardwareFlowControl;// 硬件流控
  } USART_InitTypeDef;
  ```

#### 枚举类型
- **`USART_WordLength`**
  - `USART_WordLength_8b` - `CR1` 的 M 位 = 0。
  - `USART_WordLength_9b` - `CR1` 的 M 位 = 1。
- **`USART_StopBits`**
  - `USART_StopBits_1`   - `CR2` 的 STOP = 00。
  - `USART_StopBits_0_5` - `CR2` 的 STOP = 01。
- **`USART_Parity`**
  - `USART_Parity_No`   - `CR1` 的 PCE = 0。
  - `USART_Parity_Even` - `CR1` 的 PCE = 1, PS = 0。
- **`USART_Mode`**
  - `USART_Mode_Rx` - `CR1` 的 RE = 1。
  - `USART_Mode_Tx` - `CR1` 的 TE = 1。

#### 函数及其字段操作
- **`void USART_Init(USART_TypeDef* USARTx, USART_InitTypeDef* USART_InitStruct)`**
  - 写 `BRR`（波特率）、`CR1`（字长、校验、模式）、`CR2`（停止位）、`CR3`（流控）。
- **`void USART_Cmd(USART_TypeDef* USARTx, FunctionalState NewState)`**
  - 修改 `CR1` 的 UE 位（使能）。
- **`void USART_SendData(USART_TypeDef* USARTx, uint16_t Data)`**
  - 写 `DR`，需检查 `SR` 的 TXE 位。
- **`uint16_t USART_ReceiveData(USART_TypeDef* USARTx)`**
  - 读 `DR`，需检查 `SR` 的 RXNE 位。
- **`FlagStatus USART_GetFlagStatus(USART_TypeDef* USARTx, uint16_t USART_FLAG)`**
  - 检查 `SR` 的指定位（如 TXE、RXNE）。
- **`void USART_ITConfig(USART_TypeDef* USARTx, uint16_t USART_IT, FunctionalState NewState)`**
  - 修改 `CR1`、`CR2` 或 `CR3` 的中断使能位（如 RXNEIE）。

---

### 3. SPI - Serial Peripheral Interface
#### 硬件结构体
- **`SPI_TypeDef`**
  ```c
  typedef struct {
      __IO uint16_t CR1;     // 控制寄存器 1 (模式、波特率)
      uint16_t RESERVED0;
      __IO uint16_t CR2;     // 控制寄存器 2 (中断)
      uint16_t RESERVED1;
      __IO uint16_t SR;      // 状态寄存器 (TXE、RXNE)
      uint16_t RESERVED2;
      __IO uint16_t DR;      // 数据寄存器
      uint16_t RESERVED3;
      __IO uint16_t CRCPR;   // CRC 多项式
      uint16_t RESERVED4;
      __IO uint16_t RXCRCR;  // 接收 CRC
      uint16_t RESERVED5;
      __IO uint16_t TXCRCR;  // 发送 CRC
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

#### 枚举类型
- **`SPI_Mode`**
  - `SPI_Mode_Master` - `CR1` 的 MSTR = 1。
  - `SPI_Mode_Slave`  - `CR1` 的 MSTR = 0。
- **`SPI_DataSize`**
  - `SPI_DataSize_16b` - `CR1` 的 DFF = 1。
  - `SPI_DataSize_8b`  - `CR1` 的 DFF = 0。

#### 函数及其字段操作
- **`void SPI_Init(SPI_TypeDef* SPIx, SPI_InitTypeDef* SPI_InitStruct)`**
  - 写 `CR1`（模式、波特率、时钟等）、`CRCPR`（CRC）。
- **`void SPI_Cmd(SPI_TypeDef* SPIx, FunctionalState NewState)`**
  - 修改 `CR1` 的 SPE 位（使能）。
- **`void SPI_I2S_SendData(SPI_TypeDef* SPIx, uint16_t Data)`**
  - 写 `DR`，需检查 `SR` 的 TXE。
- **`uint16_t SPI_I2S_ReceiveData(SPI_TypeDef* SPIx)`**
  - 读 `DR`，需检查 `SR` 的 RXNE。
- **`FlagStatus SPI_I2S_GetFlagStatus(SPI_TypeDef* SPIx, uint16_t SPI_I2S_FLAG)`**
  - 检查 `SR` 的标志位。

---

### 4. I2C - Inter-Integrated Circuit
#### 硬件结构体
- **`I2C_TypeDef`**
  ```c
  typedef struct {
      __IO uint16_t CR1;   // 控制寄存器 1 (使能)
      uint16_t RESERVED0;
      __IO uint16_t CR2;   // 控制寄存器 2 (频率)
      uint16_t RESERVED1;
      __IO uint16_t OAR1;  // 自身地址 1
      uint16_t RESERVED2;
      __IO uint16_t OAR2;  // 自身地址 2
      uint16_t RESERVED3;
      __IO uint16_t DR;    // 数据寄存器
      uint16_t RESERVED4;
      __IO uint16_t SR1;   // 状态寄存器 1
      uint16_t RESERVED5;
      __IO uint16_t SR2;   // 状态寄存器 2
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
      uint32_t I2C_ClockSpeed;         // 时钟速度
      uint16_t I2C_Mode;               // 模式
      uint16_t I2C_DutyCycle;          // 占空比
      uint16_t I2C_OwnAddress1;        // 自身地址
      uint16_t I2C_Ack;                // 应答
      uint16_t I2C_AcknowledgedAddress;// 应答地址位数
  } I2C_InitTypeDef;
  ```

#### 枚举类型
- **`I2C_Mode`**
  - `I2C_Mode_I2C` - `CR1` 配置为 I2C。
- **`I2C_DutyCycle`**
  - `I2C_DutyCycle_2` - `CCR` 的 DUTY = 0。

#### 函数及其字段操作
- **`void I2C_Init(I2C_TypeDef* I2Cx, I2C_InitTypeDef* I2C_InitStruct)`**
  - 写 `CR2`（频率）、`CCR`（时钟）、`OAR1`（地址）、`TRISE`。
- **`void I2C_Cmd(I2C_TypeDef* I2Cx, FunctionalState NewState)`**
  - 修改 `CR1` 的 PE 位（使能）。
- **`void I2C_SendData(I2C_TypeDef* I2Cx, uint8_t Data)`**
  - 写 `DR`。
- **`uint8_t I2C_ReceiveData(I2C_TypeDef* I2Cx)`**
  - 读 `DR`。

---

### 5. TIM - Timer
#### 硬件结构体
- **`TIM_TypeDef`**
  ```c
  typedef struct {
      __IO uint16_t CR1;   // 控制寄存器 1
      uint16_t RESERVED0;
      __IO uint16_t CR2;   // 控制寄存器 2
      uint16_t RESERVED1;
      __IO uint16_t SMCR;  // 从模式控制
      uint16_t RESERVED2;
      __IO uint16_t DIER;  // 中断使能
      uint16_t RESERVED3;
      __IO uint16_t SR;    // 状态寄存器
      uint16_t RESERVED4;
      __IO uint16_t EGR;   // 事件生成
      uint16_t RESERVED5;
      __IO uint16_t CCMR1; // 捕获/比较模式 1
      uint16_t RESERVED6;
      __IO uint16_t CCMR2; // 捕获/比较模式 2
      uint16_t RESERVED7;
      __IO uint16_t CCER;  // 捕获/比较使能
      uint16_t RESERVED8;
      __IO uint16_t CNT;   // 计数器
      uint16_t RESERVED9;
      __IO uint16_t PSC;   // 预分频器
      uint16_t RESERVED10;
      __IO uint16_t ARR;   // 自动重装载
      uint16_t RESERVED11;
      __IO uint16_t CCR1;  // 捕获/比较寄存器 1
      // 其他通道略
  } TIM_TypeDef;
  ```

#### 初始化结构体
- **`TIM_TimeBaseInitTypeDef`**
  ```c
  typedef struct {
      uint16_t TIM_Prescaler;        // 预分频
      uint16_t TIM_CounterMode;      // 计数模式
      uint16_t TIM_Period;           // 周期
      uint16_t TIM_ClockDivision;    // 时钟分频
      uint8_t TIM_RepetitionCounter; // 重复计数
  } TIM_TimeBaseInitTypeDef;
  ```
- **`TIM_OCInitTypeDef`**
  ```c
  typedef struct {
      uint16_t TIM_OCMode;       // 输出模式
      uint16_t TIM_OutputState;  // 输出使能
      uint16_t TIM_Pulse;        // 脉宽
      uint16_t TIM_OCPolarity;   // 极性
  } TIM_OCInitTypeDef;
  ```

#### 枚举类型
- **`TIM_CounterMode`**
  - `TIM_CounterMode_Up` - `CR1` 的 DIR = 0。
- **`TIM_OCMode`**
  - `TIM_OCMode_PWM1` - `CCMRx` 的 OCM = 110。

#### 函数及其字段操作
- **`void TIM_TimeBaseInit(TIM_TypeDef* TIMx, TIM_TimeBaseInitTypeDef* TIM_TimeBaseInitStruct)`**
  - 写 `PSC`（预分频）、`ARR`（周期）、`CR1`（计数模式）。
- **`void TIM_Cmd(TIM_TypeDef* TIMx, FunctionalState NewState)`**
  - 修改 `CR1` 的 CEN 位。
- **`void TIM_OC1Init(TIM_TypeDef* TIMx, TIM_OCInitTypeDef* TIM_OCInitStruct)`**
  - 写 `CCMR1`（模式）、`CCR1`（脉宽）、`CCER`（使能）。

---

### 6. ADC - Analog-to-Digital Converter
#### 硬件结构体
- **ADC_TypeDef**
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

#### 枚举类型
- **`ADC_Mode`**
  - `ADC_Mode_Independent` - `CR1` 的 DUALMOD = 0。
- **`ADC_DataAlign`**
  - `ADC_DataAlign_Right` - `CR2` 的 ALIGN = 0。

#### 函数及其字段操作
- **`void ADC_Init(ADC_TypeDef* ADCx, ADC_InitTypeDef* ADC_InitStruct)`**
  - 写 `CR1`（模式）、`CR2`（触发、对齐）、`SQR1`（通道数）。
- **`void ADC_Cmd(ADC_TypeDef* ADCx, FunctionalState NewState)`**
  - 修改 `CR2` 的 ADON 位。
- **`uint16_t ADC_GetConversionValue(ADC_TypeDef* ADCx)`**
  - 读 `DR`。
- **`void ADC_RegularChannelConfig(ADC_TypeDef* ADCx, uint8_t ADC_Channel, uint8_t Rank, uint8_t ADC_SampleTime)`**
  - 写 `SQRx`（通道序列）、`SMPRx`（采样时间）。

---

### 7. DMA - Direct Memory Access
#### 硬件结构体
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
      uint32_t DMA_PeripheralBaseAddr; // 外设地址
      uint32_t DMA_MemoryBaseAddr;     // 内存地址
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

#### 枚举类型
- **`DMA_DIR`**
  - `DMA_DIR_PeripheralDST` - `CCR` 的 DIR = 1。
- **`DMA_Mode`**
  - `DMA_Mode_Circular` - `CCR` 的 CIRC = 1。

#### 函数及其字段操作
- **`void DMA_Init(DMA_Channel_TypeDef* DMAy_Channelx, DMA_InitTypeDef* DMA_InitStruct)`**
  - 写 `CCR`（模式、方向等）、`CNDTR`（数据量）、`CPAR`、`CMAR`。
- **`void DMA_Cmd(DMA_Channel_TypeDef* DMAy_Channelx, FunctionalState NewState)`**
  - 修改 `CCR` 的 EN 位。

---

### 8. RTC - Real-Time Clock
#### 硬件结构体
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

#### 函数及其字段操作
- **`void RTC_SetCounter(uint32_t CounterValue)`**
  - 写 `CNTH` 和 `CNTL`。
- **`uint32_t RTC_GetCounter(void)`**
  - 读 `CNTH` 和 `CNTL`。
- **`void RTC_SetPrescaler(uint32_t PrescalerValue)`**
  - 写 `PRLH` 和 `PRLL`。

---

### 9. WWDG - Window Watchdog
#### 硬件结构体
- **`WWDG_TypeDef`**
  ```c
  typedef struct {
      __IO uint32_t CR;  // 控制寄存器
      __IO uint32_t CFR; // 配置寄存器
      __IO uint32_t SR;  // 状态寄存器
  } WWDG_TypeDef;
  ```

#### 函数及其字段操作
- **`void WWDG_Enable(uint8_t Counter)`**
  - 写 `CR` 的 T 位和 WDGA 位。
- **`void WWDG_SetPrescaler(uint32_t WWDG_Prescaler)`**
  - 写 `CFR` 的 W 位。
- **`void WWDG_SetWindowValue(uint8_t WindowValue)`**
  - 写 `CFR` 的 WDGTB 位。

---

### 10. IWDG - Independent Watchdog
#### 硬件结构体
- **`IWDG_TypeDef`**
  ```c
  typedef struct {
      __IO uint32_t KR;  // 键值寄存器
      __IO uint32_t PR;  // 预分频寄存器
      __IO uint32_t RLR; // 重装载寄存器
      __IO uint32_t SR;  // 状态寄存器
  } IWDG_TypeDef;
  ```

#### 函数及其字段操作
- **`void IWDG_WriteAccessCmd(uint16_t IWDG_WriteAccess)`**
  - 写 `KR`（如 0x5555 解锁）。
- **`void IWDG_SetPrescaler(uint8_t IWDG_Prescaler)`**
  - 写 `PR`。
- **`void IWDG_ReloadCounter(void)`**
  - 写 `KR`（0xAAAA 喂狗）。

---

### 11. EXTI - External Interrupt
#### 硬件结构体
- **`EXTI_TypeDef`**
  ```c
  typedef struct {
      __IO uint32_t IMR;   // 中断掩码
      __IO uint32_t EMR;   // 事件掩码
      __IO uint32_t RTSR;  // 上升触发
      __IO uint32_t FTSR;  // 下降触发
      __IO uint32_t SWIER; // 软件中断
      __IO uint32_t PR;    // 挂起寄存器
  } EXTI_TypeDef;
  ```

#### 初始化结构体
- **`EXTI_InitTypeDef`**
  ```c
  typedef struct {
      uint32_t EXTI_Line;       // 中断线
      EXTIMode_TypeDef EXTI_Mode; // 模式
      EXTITrigger_TypeDef EXTI_Trigger; // 触发
      FunctionalState EXTI_LineCmd; // 使能
  } EXTI_InitTypeDef;
  ```

#### 枚举类型
- **`EXTIMode_TypeDef`**
  - `EXTI_Mode_Interrupt` - `IMR`。
- **`EXTITrigger_TypeDef`**
  - `EXTI_Trigger_Rising` - `RTSR`。

#### 函数及其字段操作
- **`void EXTI_Init(EXTI_InitTypeDef* EXTI_InitStruct)`**
  - 写 `IMR`（中断）、`RTSR`/`FTSR`（触发）。
- **`FlagStatus EXTI_GetFlagStatus(uint32_t EXTI_Line)`**
  - 读 `PR`。

---

### 12. CAN - Controller Area Network
#### 硬件结构体
- **`CAN_TypeDef`** (简化)
  ```c
  typedef struct {
      __IO uint32_t MCR;  // 主控制寄存器
      __IO uint32_t MSR;  // 主状态寄存器
      __IO uint32_t TSR;  // 传输状态
      // 其他复杂字段略
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
      FunctionalState CAN_TTCM; // 时间触发
      FunctionalState CAN_ABOM; // 自动离线
      FunctionalState CAN_AWUM; // 自动唤醒
      FunctionalState CAN_NART;// 非自动重传
      FunctionalState CAN_RFLM;// 接收 FIFO 锁定
      FunctionalState CAN_TXFP;// 发送 FIFO 优先级
  } CAN_InitTypeDef;
  ```

#### 函数及其字段操作
- **`void CAN_Init(CAN_TypeDef* CANx, CAN_InitTypeDef* CAN_InitStruct)`**
  - 写 `MCR`（模式等）。
- **`uint8_t CAN_Transmit(CAN_TypeDef* CANx, CanTxMsg* TxMessage)`**
  - 操作 `TSR` 和邮箱寄存器。

---

### 13. USB - Universal Serial Bus
#### 说明
- 标准库未提供完整 `USB_TypeDef` 和相关函数，需依赖专用 USB 库。

---

### 总体规律
- **硬件结构体**：`XXX_TypeDef` 直接映射寄存器。
- **初始化**：`XXX_InitTypeDef` 参数通过 `XXX_Init` 写入对应字段。
- **函数**：直接操作特定字段（如 `DR` 用于数据，`CRx` 用于控制）。
- **枚举**：定义字段的取值，简化配置。
