继续对 STM32F103C8T6 HAL 库中另外三个关键外设（USART、I2C、SPI）的详细分析，涵盖每个表示外设的结构体（`XXX_TypeDef`）、配置外设的结构体（`XXX_InitTypeDef`）、句柄结构体（`XXX_HandleTypeDef`）、所有相关枚举类型以及每个函数接口的详细说明。我将通过源码逐一展开，确保内容详尽到每个字段和函数的作用与用法。

---

## 模块化讲解 STM32F103C8T6 HAL 库（详细到每个结构体、枚举和函数）

### 模块 4：USART（Universal Synchronous/Asynchronous Receiver/Transmitter）
#### 4.1 表示外设的结构体
- **USART_TypeDef**（`stm32f1xx.h`）
  ```c
  typedef struct {
    __IO uint32_t SR;    // 状态寄存器
    __IO uint32_t DR;    // 数据寄存器
    __IO uint32_t BRR;   // 波特率寄存器
    __IO uint32_t CR1;   // 控制寄存器 1
    __IO uint32_t CR2;   // 控制寄存器 2
    __IO uint32_t CR3;   // 控制寄存器 3
    __IO uint32_t GTPR;  // 保护时间和预分频寄存器
  } USART_TypeDef;
  ```
  - 字段解析：
    - `SR`：状态标志（如 TXE 发送空、RXNE 接收满）。
    - `DR`：收发数据存储。
    - `BRR`：波特率分频值。
    - `CR1`：基本控制（使能、字长等）。
    - `CR2`：停止位和时钟控制。
    - `CR3`：硬件流控制。
    - `GTPR`：保护时间配置。

#### 4.2 配置外设的结构体
- **UART_InitTypeDef**（`stm32f1xx_hal_uart.h`）
  ```c
  typedef struct {
    uint32_t BaudRate;       // 波特率（如 115200）
    uint32_t WordLength;     // 字长（如 UART_WORDLENGTH_8B）
    uint32_t StopBits;       // 停止位（如 UART_STOPBITS_1）
    uint32_t Parity;         // 校验位（如 UART_PARITY_NONE）
    uint32_t Mode;           // 模式（如 UART_MODE_TX_RX）
    uint32_t HwFlowCtl;      // 硬件流控制（如 UART_HWCONTROL_NONE）
    uint32_t OverSampling;   // 过采样（如 UART_OVERSAMPLING_16）
  } UART_InitTypeDef;
  ```
  - 字段解析：
    - `BaudRate`：通信速率。
    - `WordLength`：数据位数。
    - `StopBits`：停止位数。
    - `Parity`：校验类型。
    - `Mode`：发送/接收使能。
    - `HwFlowCtl`：CTS/RTS 控制。
    - `OverSampling`：采样率。

#### 4.3 句柄结构体
- **UART_HandleTypeDef**（`stm32f1xx_hal_uart.h`）
  ```c
  typedef struct {
    USART_TypeDef *Instance;          // USART 实例
    UART_InitTypeDef Init;            // 初始化参数
    uint8_t *pTxBuffPtr;              // 发送缓冲区指针
    uint16_t TxXferSize;              // 发送数据大小
    uint16_t TxXferCount;             // 发送计数
    uint8_t *pRxBuffPtr;              // 接收缓冲区指针
    uint16_t RxXferSize;              // 接收数据大小
    uint16_t RxXferCount;             // 接收计数
    DMA_HandleTypeDef *hdmatx;        // 发送 DMA 句柄
    DMA_HandleTypeDef *hdmarx;        // 接收 DMA 句柄
    HAL_LockTypeDef Lock;             // 锁状态
    __IO HAL_UART_StateTypeDef State; // 状态
    __IO uint32_t ErrorCode;          // 错误码
  } UART_HandleTypeDef;
  ```
  - 字段解析：
    - `pTxBuffPtr`/`pRxBuffPtr`：数据缓冲区。
    - `TxXferSize`/`RxXferSize`：传输总量。
    - `TxXferCount`/`RxXferCount`：已传输计数。
    - `hdmatx`/`hdmarx`：DMA 支持。

#### 4.4 枚举类型
- **UART_WordLength**（`stm32f1xx_hal_uart.h`）
  ```c
  #define UART_WORDLENGTH_8B         0x00000000U  // 8 位
  #define UART_WORDLENGTH_9B         0x00001000U  // 9 位
  ```
- **UART_StopBits**（`stm32f1xx_hal_uart.h`）
  ```c
  #define UART_STOPBITS_1            0x00000000U  // 1 停止位
  #define UART_STOPBITS_2            0x00002000U  // 2 停止位
  ```
- **UART_Parity**（`stm32f1xx_hal_uart.h`）
  ```c
  #define UART_PARITY_NONE           0x00000000U  // 无校验
  #define UART_PARITY_EVEN           0x00000400U  // 偶校验
  #define UART_PARITY_ODD            0x00000600U  // 奇校验
  ```
- **UART_Mode**（`stm32f1xx_hal_uart.h`）
  ```c
  #define UART_MODE_RX               0x00000004U  // 仅接收
  #define UART_MODE_TX               0x00000008U  // 仅发送
  #define UART_MODE_TX_RX            0x0000000CU  // 发送和接收
  ```
- **HAL_UART_StateTypeDef**（`stm32f1xx_hal_uart.h`）
  ```c
  typedef enum {
    HAL_UART_STATE_RESET       = 0x00U,  // 未初始化
    HAL_UART_STATE_READY       = 0x01U,  // 就绪
    HAL_UART_STATE_BUSY        = 0x02U,  // 忙碌
    HAL_UART_STATE_BUSY_TX     = 0x12U,  // 发送中
    HAL_UART_STATE_BUSY_RX     = 0x22U,  // 接收中
    HAL_UART_STATE_TIMEOUT     = 0x03U,  // 超时
    HAL_UART_STATE_ERROR       = 0x04U   // 错误
  } HAL_UART_StateTypeDef;
  ```

#### 4.5 函数接口
- **`HAL_UART_Init(UART_HandleTypeDef *huart)`**
  - 作用：初始化 UART。
  - 用法：配置波特率、字长等。
- **`HAL_UART_DeInit(UART_HandleTypeDef *huart)`**
  - 作用：反初始化 UART。
  - 用法：恢复默认状态。
- **`HAL_UART_Transmit(UART_HandleTypeDef *huart, uint8_t *pData, uint16_t Size, uint32_t Timeout)`**
  - 作用：发送数据（轮询模式）。
  - 用法：发送指定长度数据。
- **`HAL_UART_Receive(UART_HandleTypeDef *huart, uint8_t *pData, uint16_t Size, uint32_t Timeout)`**
  - 作用：接收数据（轮询模式）。
  - 用法：接收指定长度数据。
- **`HAL_UART_Transmit_IT(UART_HandleTypeDef *huart, uint8_t *pData, uint16_t Size)`**
  - 作用：中断模式发送数据。
  - 用法：启用中断发送。
- **`HAL_UART_Receive_IT(UART_HandleTypeDef *huart, uint8_t *pData, uint16_t Size)`**
  - 作用：中断模式接收数据。
  - 用法：启用中断接收。
- **`HAL_UART_IRQHandler(UART_HandleTypeDef *huart)`**
  - 作用：处理 UART 中断。
  - 用法：在中断服务函数中调用。
- **`HAL_UART_TxCpltCallback(UART_HandleTypeDef *huart)`**
  - 作用：发送完成回调（弱定义）。
  - 用法：用户重写处理逻辑。
- **`HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)`**
  - 作用：接收完成回调（弱定义）。
  - 用法：用户重写处理逻辑。

---

### 模块 5：I2C（Inter-Integrated Circuit）
#### 5.1 表示外设的结构体
- **I2C_TypeDef**（`stm32f1xx.h`）
  ```c
  typedef struct {
    __IO uint32_t CR1;   // 控制寄存器 1
    __IO uint32_t CR2;   // 控制寄存器 2
    __IO uint32_t OAR1;  // 自身地址寄存器 1
    __IO uint32_t OAR2;  // 自身地址寄存器 2
    __IO uint32_t DR;    // 数据寄存器
    __IO uint32_t SR1;   // 状态寄存器 1
    __IO uint32_t SR2;   // 状态寄存器 2
    __IO uint32_t CCR;   // 时钟控制寄存器
    __IO uint32_t TRISE; // 上升时间寄存器
  } I2C_TypeDef;
  ```
  - 字段解析：
    - `CR1`：使能和模式控制。
    - `CR2`：频率配置。
    - `OAR1/OAR2`：从机地址。
    - `DR`：数据收发。
    - `SR1/SR2`：状态标志。
    - `CCR`：时钟速度。
    - `TRISE`：SCL 上升时间。

#### 5.2 配置外设的结构体
- **I2C_InitTypeDef**（`stm32f1xx_hal_i2c.h`）
  ```c
  typedef struct {
    uint32_t ClockSpeed;      // 时钟速度（如 100000）
    uint32_t DutyCycle;       // 占空比（如 I2C_DUTYCYCLE_2）
    uint32_t OwnAddress1;     // 自身地址 1
    uint32_t AddressingMode;  // 寻址模式（如 I2C_ADDRESSINGMODE_7BIT）
    uint32_t DualAddressMode; // 双地址模式（如 I2C_DUALADDRESS_DISABLE）
    uint32_t OwnAddress2;     // 自身地址 2
    uint32_t GeneralCallMode; // 广播呼叫（如 I2C_GENERALCALL_DISABLE）
    uint32_t NoStretchMode;   // 时钟延长（如 I2C_NOSTRETCH_DISABLE）
  } I2C_InitTypeDef;
  ```

#### 5.3 句柄结构体
- **I2C_HandleTypeDef**（`stm32f1xx_hal_i2c.h`）
  ```c
  typedef struct {
    I2C_TypeDef *Instance;            // I2C 实例
    I2C_InitTypeDef Init;             // 初始化参数
    uint8_t *pBuffPtr;                // 数据缓冲区指针
    uint16_t XferSize;                // 传输数据大小
    uint16_t XferCount;               // 传输计数
    uint32_t XferOptions;             // 传输选项
    uint32_t PreviousState;           // 前一状态
    HAL_LockTypeDef Lock;             // 锁状态
    __IO HAL_I2C_StateTypeDef State;  // 状态
    __IO uint32_t ErrorCode;          // 错误码
  } I2C_HandleTypeDef;
  ```

#### 5.4 枚举类型
- **I2C_DutyCycle**（`stm32f1xx_hal_i2c.h`）
  ```c
  #define I2C_DUTYCYCLE_2         0x00000000U  // 2:1
  #define I2C_DUTYCYCLE_16_9      I2C_CCR_DUTY // 16:9
  ```
- **I2C_AddressingMode**（`stm32f1xx_hal_i2c.h`）
  ```c
  #define I2C_ADDRESSINGMODE_7BIT    0x00004000U  // 7 位地址
  #define I2C_ADDRESSINGMODE_10BIT   0x0000C000U  // 10 位地址
  ```
- **HAL_I2C_StateTypeDef**（`stm32f1xx_hal_i2c.h`）
  ```c
  typedef enum {
    HAL_I2C_STATE_RESET       = 0x00U,  // 未初始化
    HAL_I2C_STATE_READY       = 0x01U,  // 就绪
    HAL_I2C_STATE_BUSY        = 0x02U,  // 忙碌
    HAL_I2C_STATE_BUSY_TX     = 0x12U,  // 发送中
    HAL_I2C_STATE_BUSY_RX     = 0x22U,  // 接收中
    HAL_I2C_STATE_TIMEOUT     = 0x03U,  // 超时
    HAL_I2C_STATE_ERROR       = 0x04U   // 错误
  } HAL_I2C_StateTypeDef;
  ```

#### 5.5 函数接口
- **`HAL_I2C_Init(I2C_HandleTypeDef *hi2c)`**
  - 作用：初始化 I2C。
  - 用法：配置时钟和地址。
- **`HAL_I2C_DeInit(I2C_HandleTypeDef *hi2c)`**
  - 作用：反初始化 I2C。
  - 用法：恢复默认状态。
- **`HAL_I2C_Master_Transmit(I2C_HandleTypeDef *hi2c, uint16_t DevAddress, uint8_t *pData, uint16_t Size, uint32_t Timeout)`**
  - 作用：主模式发送数据。
  - 用法：发送到指定从机。
- **`HAL_I2C_Master_Receive(I2C_HandleTypeDef *hi2c, uint16_t DevAddress, uint8_t *pData, uint16_t Size, uint32_t Timeout)`**
  - 作用：主模式接收数据。
  - 用法：从指定从机接收。
- **`HAL_I2C_Slave_Transmit(I2C_HandleTypeDef *hi2c, uint8_t *pData, uint16_t Size, uint32_t Timeout)`**
  - 作用：从模式发送数据。
  - 用法：响应主机请求。
- **`HAL_I2C_Slave_Receive(I2C_HandleTypeDef *hi2c, uint8_t *pData, uint16_t Size, uint32_t Timeout)`**
  - 作用：从模式接收数据。
  - 用法：接收主机数据。
- **`HAL_I2C_Master_Transmit_IT(I2C_HandleTypeDef *hi2c, uint16_t DevAddress, uint8_t *pData, uint16_t Size)`**
  - 作用：主模式中断发送。
  - 用法：启用中断传输。
- **`HAL_I2C_IRQHandler(I2C_HandleTypeDef *hi2c)`**
  - 作用：处理 I2C 中断。
  - 用法：在中断服务函数中调用。
- **`HAL_I2C_MasterTxCpltCallback(I2C_HandleTypeDef *hi2c)`**
  - 作用：主发送完成回调（弱定义）。
  - 用法：用户重写逻辑。

---

### 模块 6：SPI（Serial Peripheral Interface）
#### 6.1 表示外设的结构体
- **SPI_TypeDef**（`stm32f1xx.h`）
  ```c
  typedef struct {
    __IO uint32_t CR1;    // 控制寄存器 1
    __IO uint32_t CR2;    // 控制寄存器 2
    __IO uint32_t SR;     // 状态寄存器
    __IO uint32_t DR;     // 数据寄存器
    __IO uint32_t CRCPR;  // CRC 多项式寄存器
    __IO uint32_t RXCRCR; // 接收 CRC 寄存器
    __IO uint32_t TXCRCR; // 发送 CRC 寄存器
  } SPI_TypeDef;
  ```

#### 6.2 配置外设的结构体
- **SPI_InitTypeDef**（`stm32f1xx_hal_spi.h`）
  ```c
  typedef struct {
    uint32_t Mode;           // 主/从模式（如 SPI_MODE_MASTER）
    uint32_t Direction;      // 数据方向（如 SPI_DIRECTION_2LINES）
    uint32_t DataSize;       // 数据大小（如 SPI_DATASIZE_8BIT）
    uint32_t CLKPolarity;    // 时钟极性（如 SPI_POLARITY_LOW）
    uint32_t CLKPhase;       // 时钟相位（如 SPI_PHASE_1EDGE）
    uint32_t NSS;            // 片选控制（如 SPI_NSS_SOFT）
    uint32_t BaudRatePrescaler; // 波特率预分频（如 SPI_BAUDRATEPRESCALER_2）
    uint32_t FirstBit;       // 首发送位（如 SPI_FIRSTBIT_MSB）
    uint32_t TIMode;         // TI 模式（如 SPI_TIMODE_DISABLE）
    uint32_t CRCCalculation; // CRC 计算（如 SPI_CRCCALCULATION_DISABLE）
    uint32_t CRCPolynomial;  // CRC 多项式
  } SPI_InitTypeDef;
  ```

#### 6.3 句柄结构体
- **SPI_HandleTypeDef**（`stm32f1xx_hal_spi.h`）
  ```c
  typedef struct {
    SPI_TypeDef *Instance;            // SPI 实例
    SPI_InitTypeDef Init;             // 初始化参数
    uint8_t *pTxBuffPtr;              // 发送缓冲区指针
    uint16_t TxXferSize;              // 发送数据大小
    uint16_t TxXferCount;             // 发送计数
    uint8_t *pRxBuffPtr;              // 接收缓冲区指针
    uint16_t RxXferSize;              // 接收数据大小
    uint16_t RxXferCount;             // 接收计数
    DMA_HandleTypeDef *hdmatx;        // 发送 DMA 句柄
    DMA_HandleTypeDef *hdmarx;        // 接收 DMA 句柄
    HAL_LockTypeDef Lock;             // 锁状态
    __IO HAL_SPI_StateTypeDef State;  // 状态
    __IO uint32_t ErrorCode;          // 错误码
  } SPI_HandleTypeDef;
  ```

#### 6.4 枚举类型
- **SPI_Mode**（`stm32f1xx_hal_spi.h`）
  ```c
  #define SPI_MODE_SLAVE             0x00000000U  // 从模式
  #define SPI_MODE_MASTER            SPI_CR1_MSTR  // 主模式
  ```
- **SPI_Direction**（`stm32f1xx_hal_spi.h`）
  ```c
  #define SPI_DIRECTION_2LINES        0x00000000U  // 双线全双工
  #define SPI_DIRECTION_2LINES_RXONLY SPI_CR1_RXONLY // 双线仅接收
  #define SPI_DIRECTION_1LINE         SPI_CR1_BIDIMODE // 单线双向
  ```
- **SPI_DataSize**（`stm32f1xx_hal_spi.h`）
  ```c
  #define SPI_DATASIZE_8BIT          0x00000000U  // 8 位
  #define SPI_DATASIZE_16BIT         SPI_CR1_DFF   // 16 位
  ```
- **HAL_SPI_StateTypeDef**（`stm32f1xx_hal_spi.h`）
  ```c
  typedef enum {
    HAL_SPI_STATE_RESET       = 0x00U,  // 未初始化
    HAL_SPI_STATE_READY       = 0x01U,  // 就绪
    HAL_SPI_STATE_BUSY        = 0x02U,  // 忙碌
    HAL_SPI_STATE_BUSY_TX     = 0x12U,  // 发送中
    HAL_SPI_STATE_BUSY_RX     = 0x22U,  // 接收中
    HAL_SPI_STATE_TIMEOUT     = 0x03U,  // 超时
    HAL_SPI_STATE_ERROR       = 0x04U   // 错误
  } HAL_SPI_StateTypeDef;
  ```

#### 6.5 函数接口
- **`HAL_SPI_Init(SPI_HandleTypeDef *hspi)`**
  - 作用：初始化 SPI。
  - 用法：配置模式和波特率。
- **`HAL_SPI_DeInit(SPI_HandleTypeDef *hspi)`**
  - 作用：反初始化 SPI。
  - 用法：恢复默认状态。
- **`HAL_SPI_Transmit(SPI_HandleTypeDef *hspi, uint8_t *pData, uint16_t Size, uint32_t Timeout)`**
  - 作用：发送数据（轮询模式）。
  - 用法：发送指定长度数据。
- **`HAL_SPI_Receive(SPI_HandleTypeDef *hspi, uint8_t *pData, uint16_t Size, uint32_t Timeout)`**
  - 作用：接收数据（轮询模式）。
  - 用法：接收指定长度数据。
- **`HAL_SPI_TransmitReceive(SPI_HandleTypeDef *hspi, uint8_t *pTxData, uint8_t *pRxData, uint16_t Size, uint32_t Timeout)`**
  - 作用：全双工收发数据。
  - 用法：同时发送和接收。
- **`HAL_SPI_Transmit_IT(SPI_HandleTypeDef *hspi, uint8_t *pData, uint16_t Size)`**
  - 作用：中断模式发送。
  - 用法：启用中断传输。
- **`HAL_SPI_IRQHandler(SPI_HandleTypeDef *hspi)`**
  - 作用：处理 SPI 中断。
  - 用法：在中断服务函数中调用。
- **`HAL_SPI_TxCpltCallback(SPI_HandleTypeDef *hspi)`**
  - 作用：发送完成回调（弱定义）。
  - 用法：用户重写逻辑。
