继续对 STM32F103C8T6 HAL 库中另外三个外设（DAC、DMA、CAN）的详细分析，涵盖每个表示外设的结构体（`XXX_TypeDef`）、配置外设的结构体（`XXX_InitTypeDef`）、句柄结构体（`XXX_HandleTypeDef`）、所有相关枚举类型以及每个函数接口的详细说明。我将通过源码逐一展开，确保内容详尽到每个字段和函数的作用与用法。

---

## 模块化讲解 STM32F103C8T6 HAL 库（详细到每个结构体、枚举和函数）

### 模块 7：DAC（Digital-to-Analog Converter）
#### 7.1 表示外设的结构体
- **DAC_TypeDef**（`stm32f1xx.h`）
  ```c
  typedef struct {
    __IO uint32_t CR;      // 控制寄存器
    __IO uint32_t SWTRIGR; // 软件触发寄存器
    __IO uint32_t DHR12R1; // 通道 1 12 位右对齐数据寄存器
    __IO uint32_t DHR12L1; // 通道 1 12 位左对齐数据寄存器
    __IO uint32_t DHR8R1;  // 通道 1 8 位右对齐数据寄存器
    __IO uint32_t DHR12R2; // 通道 2 12 位右对齐数据寄存器
    __IO uint32_t DHR12L2; // 通道 2 12 位左对齐数据寄存器
    __IO uint32_t DHR8R2;  // 通道 2 8 位右对齐数据寄存器
    __IO uint32_t DHR12RD; // 双通道 12 位右对齐数据寄存器
    __IO uint32_t DHR12LD; // 双通道 12 位左对齐数据寄存器
    __IO uint32_t DHR8RD;  // 双通道 8 位右对齐数据寄存器
    __IO uint32_t DOR1;    // 通道 1 数据输出寄存器
    __IO uint32_t DOR2;    // 通道 2 数据输出寄存器
  } DAC_TypeDef;
  ```
  - 字段解析：
    - `CR`：控制 DAC 使能和触发。
    - `SWTRIGR`：软件触发通道。
    - `DHR12R1/DHR12L1/DHR8R1`：通道 1 数据输入（不同对齐方式）。
    - `DHR12R2/DHR12L2/DHR8R2`：通道 2 数据输入。
    - `DHR12RD/DHR12LD/DHR8RD`：双通道同时输入。
    - `DOR1/DOR2`：输出数据。

#### 7.2 配置外设的结构体
- **DAC_InitTypeDef**（`stm32f1xx_hal_dac.h`）
  ```c
  typedef struct {
    uint32_t Trigger;       // 触发源（如 DAC_TRIGGER_NONE）
    uint32_t WaveGeneration;// 波形生成（如 DAC_WAVEGENERATION_NONE）
    uint32_t LFSRUnmask_TriangleAmplitude; // LFSR 掩码或三角波幅度
    uint32_t OutputBuffer;  // 输出缓冲（如 DAC_OUTPUTBUFFER_ENABLE）
  } DAC_InitTypeDef;
  ```
  - 字段解析：
    - `Trigger`：外部或软件触发。
    - `WaveGeneration`：噪声或三角波生成。
    - `LFSRUnmask_TriangleAmplitude`：噪声掩码或三角波幅度。
    - `OutputBuffer`：缓冲使能。

#### 7.3 句柄结构体
- **DAC_HandleTypeDef**（`stm32f1xx_hal_dac.h`）
  ```c
  typedef struct {
    DAC_TypeDef *Instance;            // DAC 实例
    DAC_InitTypeDef Init;             // 初始化参数
    HAL_LockTypeDef Lock;             // 锁状态
    __IO HAL_DAC_StateTypeDef State;  // 状态
    DMA_HandleTypeDef *DMA_Handle1;   // 通道 1 DMA 句柄
    DMA_HandleTypeDef *DMA_Handle2;   // 通道 2 DMA 句柄
    __IO uint32_t ErrorCode;          // 错误码
  } DAC_HandleTypeDef;
  ```

#### 7.4 枚举类型
- **DAC_Trigger**（`stm32f1xx_hal_dac.h`）
  ```c
  #define DAC_TRIGGER_NONE           0x00000000U  // 无触发
  #define DAC_TRIGGER_T2_TRGO        0x00000024U  // 定时器 2 TRGO
  #define DAC_TRIGGER_SOFTWARE       0x0000003CU  // 软件触发
  ```
- **DAC_WaveGeneration**（`stm32f1xx_hal_dac.h`）
  ```c
  #define DAC_WAVEGENERATION_NONE    0x00000000U  // 无波形
  #define DAC_WAVEGENERATION_NOISE   0x00000040U  // 噪声
  #define DAC_WAVEGENERATION_TRIANGLE 0x00000080U // 三角波
  ```
- **HAL_DAC_StateTypeDef**（`stm32f1xx_hal_dac.h`）
  ```c
  typedef enum {
    HAL_DAC_STATE_RESET       = 0x00U,  // 未初始化
    HAL_DAC_STATE_READY       = 0x01U,  // 就绪
    HAL_DAC_STATE_BUSY        = 0x02U,  // 忙碌
    HAL_DAC_STATE_TIMEOUT     = 0x03U,  // 超时
    HAL_DAC_STATE_ERROR       = 0x04U   // 错误
  } HAL_DAC_StateTypeDef;
  ```

#### 7.5 函数接口
- **`HAL_DAC_Init(DAC_HandleTypeDef *hdac)`**
  - 作用：初始化 DAC。
  - 用法：配置触发和波形。
- **`HAL_DAC_DeInit(DAC_HandleTypeDef *hdac)`**
  - 作用：反初始化 DAC。
  - 用法：恢复默认状态。
- **`HAL_DAC_Start(DAC_HandleTypeDef *hdac, uint32_t Channel)`**
  - 作用：启动 DAC 通道。
  - 用法：启用指定通道。
- **`HAL_DAC_Stop(DAC_HandleTypeDef *hdac, uint32_t Channel)`**
  - 作用：停止 DAC 通道。
  - 用法：暂停指定通道。
- **`HAL_DAC_SetValue(DAC_HandleTypeDef *hdac, uint32_t Channel, uint32_t Alignment, uint32_t Data)`**
  - 作用：设置 DAC 输出值。
  - 用法：写入指定数据。
- **`HAL_DAC_Start_DMA(DAC_HandleTypeDef *hdac, uint32_t Channel, uint32_t *pData, uint32_t Length, uint32_t Alignment)`**
  - 作用：启动 DMA 模式输出。
  - 用法：使用 DMA 传输数据。
- **`HAL_DAC_IRQHandler(DAC_HandleTypeDef *hdac)`**
  - 作用：处理 DAC 中断。
  - 用法：在中断服务函数中调用。
- **`HAL_DAC_ConvCpltCallbackCh1(DAC_HandleTypeDef *hdac)`**
  - 作用：通道 1 转换完成回调（弱定义）。
  - 用法：用户重写逻辑。

---

### 模块 8：DMA（Direct Memory Access）
#### 8.1 表示外设的结构体
- **DMA_TypeDef**（`stm32f1xx.h`）
  ```c
  typedef struct {
    __IO uint32_t ISR;   // 中断状态寄存器
    __IO uint32_t IFCR;  // 中断标志清除寄存器
  } DMA_TypeDef;
  ```
- **DMA_Channel_TypeDef**（每个通道的寄存器，`stm32f1xx.h`）
  ```c
  typedef struct {
    __IO uint32_t CCR;   // 通道控制寄存器
    __IO uint32_t CNDTR; // 通道数据数量寄存器
    __IO uint32_t CPAR;  // 通道外设地址寄存器
    __IO uint32_t CMAR;  // 通道内存地址寄存器
  } DMA_Channel_TypeDef;
  ```

#### 8.2 配置外设的结构体
- **DMA_InitTypeDef**（`stm32f1xx_hal_dma.h`）
  ```c
  typedef struct {
    uint32_t Direction;      // 传输方向（如 DMA_MEMORY_TO_PERIPH）
    uint32_t PeriphInc;      // 外设地址增量（如 DMA_PINC_ENABLE）
    uint32_t MemInc;         // 内存地址增量（如 DMA_MINC_ENABLE）
    uint32_t PeriphDataAlignment; // 外设数据宽度（如 DMA_PDATAALIGN_BYTE）
    uint32_t MemDataAlignment;    // 内存数据宽度（如 DMA_MDATAALIGN_BYTE）
    uint32_t Mode;           // 模式（如 DMA_NORMAL）
    uint32_t Priority;       // 优先级（如 DMA_PRIORITY_LOW）
  } DMA_InitTypeDef;
  ```

#### 8.3 句柄结构体
- **DMA_HandleTypeDef**（`stm32f1xx_hal_dma.h`）
  ```c
  typedef struct {
    DMA_Channel_TypeDef *Instance;    // DMA 通道实例
    DMA_InitTypeDef Init;             // 初始化参数
    HAL_LockTypeDef Lock;             // 锁状态
    __IO HAL_DMA_StateTypeDef State;  // 状态
    void *Parent;                     // 父对象指针
    void (* XferCpltCallback)(struct __DMA_HandleTypeDef *hdma); // 传输完成回调
    __IO uint32_t ErrorCode;          // 错误码
  } DMA_HandleTypeDef;
  ```

#### 8.4 枚举类型
- **DMA_Direction**（`stm32f1xx_hal_dma.h`）
  ```c
  #define DMA_PERIPH_TO_MEMORY       0x00000000U  // 外设到内存
  #define DMA_MEMORY_TO_PERIPH       DMA_CCR_DIR  // 内存到外设
  #define DMA_MEMORY_TO_MEMORY       DMA_CCR_MEM2MEM // 内存到内存
  ```
- **DMA_Mode**（`stm32f1xx_hal_dma.h`）
  ```c
  #define DMA_NORMAL                 0x00000000U  // 单次模式

  #define DMA_CIRCULAR               DMA_CCR_CIRC // 循环模式
  ```
- **HAL_DMA_StateTypeDef**（`stm32f1xx_hal_dma.h`）
  ```c
  typedef enum {
    HAL_DMA_STATE_RESET       = 0x00U,  // 未初始化
    HAL_DMA_STATE_READY       = 0x01U,  // 就绪
    HAL_DMA_STATE_BUSY        = 0x02U,  // 忙碌
    HAL_DMA_STATE_TIMEOUT     = 0x03U,  // 超时
    HAL_DMA_STATE_ERROR       = 0x04U   // 错误
  } HAL_DMA_StateTypeDef;
  ```

#### 8.5 函数接口
- **`HAL_DMA_Init(DMA_HandleTypeDef *hdma)`**
  - 作用：初始化 DMA。
  - 用法：配置传输参数。
- **`HAL_DMA_DeInit(DMA_HandleTypeDef *hdma)`**
  - 作用：反初始化 DMA。
  - 用法：恢复默认状态。
- **`HAL_DMA_Start(DMA_HandleTypeDef *hdma, uint32_t SrcAddress, uint32_t DstAddress, uint32_t DataLength)`**
  - 作用：启动 DMA 传输。
  - 用法：指定源和目标地址。
- **`HAL_DMA_Start_IT(DMA_HandleTypeDef *hdma, uint32_t SrcAddress, uint32_t DstAddress, uint32_t DataLength)`**
  - 作用：启动中断模式 DMA。
 Zhe - 用法：启用中断传输。
- **`HAL_DMA_Abort(DMA_HandleTypeDef *hdma)`**
  - 作用：中止 DMA 传输。
  - 用法：停止当前传输。
- **`HAL_DMA_IRQHandler(DMA_HandleTypeDef *hdma)`**
  - 作用：处理 DMA 中断。
  - 用法：在中断服务函数中调用。
- **`HAL_DMA_XferCpltCallback(DMA_HandleTypeDef *hdma)`**
  - 作用：传输完成回调（弱定义）。
  - 用法：用户重写逻辑。

---

### 模块 9：CAN（Controller Area Network）
#### 9.1 表示外设的结构体
- **CAN_TypeDef**（`stm32f1xx.h`）
  ```c
  typedef struct {
    __IO uint32_t TIR;   // 传输邮箱标识符寄存器
    __IO uint32_t TDTR;  // 传输邮箱数据长度和时间寄存器
    __IO uint32_t TDLR;  // 传输邮箱低字节数据寄存器
    __IO uint32_t TDHR;  // 传输邮箱高字节数据寄存器
    // 接收 FIFO 和控制寄存器略
    __IO uint32_t MCR;   // 主控制寄存器
    __IO uint32_t MSR;   // 主状态寄存器
    __IO uint32_t TSR;   // 传输状态寄存器
    __IO uint32_t RF0R;  // 接收 FIFO 0 寄存器
    __IO uint32_t RF1R;  // 接收 FIFO 1 寄存器
    __IO uint32_t IER;   // 中断使能寄存器
    __IO uint32_t ESR;   // 错误状态寄存器
    __IO uint32_t BTR;   // 位定时寄存器
  } CAN_TypeDef;
  ```

#### 9.2 配置外设的结构体
- **CAN_InitTypeDef**（`stm32f1xx_hal_can.h`）
  ```c
  typedef struct {
    uint32_t Prescaler;      // 预分频器（1-1024）
    uint32_t Mode;           // 模式（如 CAN_MODE_NORMAL）
    uint32_t SJW;            // 同步跳跃宽度（如 CAN_SJW_1TQ）
    uint32_t BS1;            // 时间段 1（如 CAN_BS1_4TQ）
    uint32_t BS2;            // 时间段 2（如 CAN_BS2_3TQ）
    uint32_t TTCM;           // 时间触发通信（如 CAN_TTCM_DISABLE）
    uint32_t ABOM;           // 自动离线管理（如 CAN_ABOM_DISABLE）
    uint32_t AWUM;           // 自动唤醒（如 CAN_AWUM_DISABLE）
    uint32_t NART;           // 非自动重传（如 CAN_NART_DISABLE）
    uint32_t RFLM;           // 接收 FIFO 锁定（如 CAN_RFLM_DISABLE）
    uint32_t TXFP;           // 发送 FIFO 优先级（如 CAN_TXFP_DISABLE）
  } CAN_InitTypeDef;
  ```

#### 9.3 句柄结构体
- **CAN_HandleTypeDef**（`stm32f1xx_hal_can.h`）
  ```c
  typedef struct {
    CAN_TypeDef *Instance;            // CAN 实例
    CAN_InitTypeDef Init;             // 初始化参数
    CAN_TxHeaderTypeDef *pTxMsg;      // 发送消息指针
    CAN_RxHeaderTypeDef *pRxMsg;      // 接收消息指针
    HAL_LockTypeDef Lock;             // 锁状态
    __IO HAL_CAN_StateTypeDef State;  // 状态
    __IO uint32_t ErrorCode;          // 错误码
  } CAN_HandleTypeDef;
  ```

#### 9.4 枚举类型
- **CAN_Mode**（`stm32f1xx_hal_can.h`）
  ```c
  #define CAN_MODE_NORMAL            0x00000000U  // 正常模式
  #define CAN_MODE_LOOPBACK          0x00000001U  // 回环模式
  #define CAN_MODE_SILENT            0x00000002U  // 静默模式
  ```
- **CAN_SJW**（`stm32f1xx_hal_can.h`）
  ```c
  #define CAN_SJW_1TQ                0x00000000U  // 1 时间量
  #define CAN_SJW_2TQ                CAN_BTR_SJW_0 // 2 时间量
  ```
- **HAL_CAN_StateTypeDef**（`stm32f1xx_hal_can.h`）
  ```c
  typedef enum {
    HAL_CAN_STATE_RESET       = 0x00U,  // 未初始化
    HAL_CAN_STATE_READY       = 0x01U,  // 就绪
    HAL_CAN_STATE_BUSY        = 0x02U,  // 忙碌
    HAL_CAN_STATE_TIMEOUT     = 0x03U,  // 超时
    HAL_CAN_STATE_ERROR       = 0x04U   // 错误
  } HAL_CAN_StateTypeDef;
  ```

#### 9.5 函数接口
- **`HAL_CAN_Init(CAN_HandleTypeDef *hcan)`**
  - 作用：初始化 CAN。
  - 用法：配置波特率和模式。
- **`HAL_CAN_DeInit(CAN_HandleTypeDef *hcan)`**
  - 作用：反初始化 CAN。
  - 用法：恢复默认状态。
- **`HAL_CAN_Transmit(CAN_HandleTypeDef *hcan, uint32_t Timeout)`**
  - 作用：发送 CAN 消息。
  - 用法：发送指定数据帧。
- **`HAL_CAN_Receive(CAN_HandleTypeDef *hcan, uint32_t Fifo, uint32_t Timeout)`**
  - 作用：接收 CAN 消息。
  - 用法：从指定 FIFO 接收。
- **`HAL_CAN_Transmit_IT(CAN_HandleTypeDef *hcan)`**
  - 作用：中断模式发送。
  - 用法：启用中断传输。
- **`HAL_CAN_IRQHandler(CAN_HandleTypeDef *hcan)`**
  - 作用：处理 CAN 中断。
  - 用法：在中断服务函数中调用。
- **`HAL_CAN_TxCpltCallback(CAN_HandleTypeDef *hcan)`**
  - 作用：发送完成回调（弱定义）。
  - 用法：用户重写逻辑。

---
