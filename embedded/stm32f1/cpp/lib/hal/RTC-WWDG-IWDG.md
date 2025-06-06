继续对 STM32F103C8T6 HAL 库中另外三个外设（RTC、WWDG、IWDG）的详细分析，涵盖每个表示外设的结构体（`XXX_TypeDef`）、配置外设的结构体（`XXX_InitTypeDef`）、句柄结构体（`XXX_HandleTypeDef`）、所有相关枚举类型以及每个函数接口的详细说明。我将通过源码逐一展开，确保内容详尽到每个字段和函数的作用与用法。

---

## 模块化讲解 STM32F103C8T6 HAL 库（详细到每个结构体、枚举和函数）

### 模块 10：RTC（Real-Time Clock）
#### 10.1 表示外设的结构体
- **RTC_TypeDef**（`stm32f1xx.h`）
  ```c
  typedef struct {
    __IO uint32_t CRH;   // 控制寄存器高位
    __IO uint32_t CRL;   // 控制寄存器低位
    __IO uint32_t PRLH;  // 预分频值高位
    __IO uint32_t PRLL;  // 预分频值低位
    __IO uint32_t DIVH;  // 分频器高位（只读）
    __IO uint32_t DIVL;  // 分频器低位（只读）
    __IO uint32_t CNTH;  // 计数器高位
    __IO uint32_t CNTL;  // 计数器低位
    __IO uint32_t ALRH;  // 报警值高位
    __IO uint32_t ALRL;  // 报警值低位
  } RTC_TypeDef;
  ```
  - 字段解析：
    - `CRH/CRL`：控制 RTC 功能（如使能中断）。
    - `PRLH/PRLL`：预分频值，设置时钟频率。
    - `DIVH/DIVL`：当前分频器剩余值。
    - `CNTH/CNTL`：当前时间计数。
    - `ALRH/ALRL`：报警触发时间。

#### 10.2 配置外设的结构体
- **RTC_InitTypeDef**（`stm32f1xx_hal_rtc.h`）
  ```c
  typedef struct {
    uint32_t AsynchPrediv;  // 异步预分频（0-0x7F）
    uint32_t SynchPrediv;   // 同步预分频（0-0x7FFF）
    uint32_t OutPutSource;  // 输出源（如 RTC_OUTPUTSOURCE_NONE）
  } RTC_InitTypeDef;
  ```
  - 字段解析：
    - `AsynchPrediv`：异步分频因子。
    - `SynchPrediv`：同步分频因子。
    - `OutPutSource`：RTC 输出引脚功能。

#### 10.3 句柄结构体
- **RTC_HandleTypeDef**（`stm32f1xx_hal_rtc.h`）
  ```c
  typedef struct {
    RTC_TypeDef *Instance;            // RTC 实例
    RTC_InitTypeDef Init;             // 初始化参数
    HAL_LockTypeDef Lock;             // 锁状态
    __IO HAL_RTC_StateTypeDef State;  // 状态
  } RTC_HandleTypeDef;
  ```

#### 10.4 枚举类型
- **RTC_OutputSource**（`stm32f1xx_hal_rtc.h`）
  ```c
  #define RTC_OUTPUTSOURCE_NONE      0x00000000U  // 无输出
  #define RTC_OUTPUTSOURCE_SECOND    RTC_CRH_SECIE // 秒脉冲
  #define RTC_OUTPUTSOURCE_ALARM     RTC_CRH_ALRIE // 报警脉冲
  ```
- **HAL_RTC_StateTypeDef**（`stm32f1xx_hal_rtc.h`）
  ```c
  typedef enum {
    HAL_RTC_STATE_RESET       = 0x00U,  // 未初始化
    HAL_RTC_STATE_READY       = 0x01U,  // 就绪
    HAL_RTC_STATE_BUSY        = 0x02U,  // 忙碌
    HAL_RTC_STATE_TIMEOUT     = 0x03U,  // 超时
    HAL_RTC_STATE_ERROR       = 0x04U   // 错误
  } HAL_RTC_StateTypeDef;
  ```

#### 10.5 函数接口
- **`HAL_RTC_Init(RTC_HandleTypeDef *hrtc)`**
  - 作用：初始化 RTC。
  - 用法：配置分频和输出。
- **`HAL_RTC_DeInit(RTC_HandleTypeDef *hrtc)`**
  - 作用：反初始化 RTC。
  - 用法：恢复默认状态。
- **`HAL_RTC_SetTime(RTC_HandleTypeDef *hrtc, RTC_TimeTypeDef *sTime, uint32_t Format)`**
  - 作用：设置时间。
  - 用法：写入当前时间。
- **`HAL_RTC_GetTime(RTC_HandleTypeDef *hrtc, RTC_TimeTypeDef *sTime, uint32_t Format)`**
  - 作用：获取时间。
  - 用法：读取当前时间。
- **`HAL_RTC_SetAlarm(RTC_HandleTypeDef *hrtc, RTC_AlarmTypeDef *sAlarm, uint32_t Format)`**
  - 作用：设置报警。
  - 用法：配置报警时间。
- **`HAL_RTC_AlarmIRQHandler(RTC_HandleTypeDef *hrtc)`**
  - 作用：处理报警中断。
  - 用法：在中断服务函数中调用。
- **`HAL_RTC_AlarmAEventCallback(RTC_HandleTypeDef *hrtc)`**
  - 作用：报警事件回调（弱定义）。
  - 用法：用户重写逻辑。

---

### 模块 11：WWDG（Window Watchdog）
#### 11.1 表示外设的结构体
- **WWDG_TypeDef**（`stm32f1xx.h`）
  ```c
  typedef struct {
    __IO uint32_t CR;   // 控制寄存器
    __IO uint32_t CFR;  // 配置寄存器
    __IO uint32_t SR;   // 状态寄存器
  } WWDG_TypeDef;
  ```
  - 字段解析：
    - `CR`：使能看门狗和计数器值。
    - `CFR`：窗口值和分频配置。
    - `SR`：状态标志（复位标志）。

#### 11.2 配置外设的结构体
- **WWDG_InitTypeDef**（`stm32f1xx_hal_wwdg.h`）
  ```c
  typedef struct {
    uint32_t Prescaler;  // 预分频（如 WWDG_PRESCALER_1）
    uint32_t Window;     // 窗口值（0x40-0x7F）
    uint32_t Counter;    // 计数器值（0x40-0x7F）
  } WWDG_InitTypeDef;
  ```

#### 11.3 句柄结构体
- **WWDG_HandleTypeDef**（`stm32f1xx_hal_wwdg.h`）
  ```c
  typedef struct {
    WWDG_TypeDef *Instance;           // WWDG 实例
    WWDG_InitTypeDef Init;            // 初始化参数
    HAL_LockTypeDef Lock;             // 锁状态
    __IO HAL_WWDG_StateTypeDef State; // 状态
  } WWDG_HandleTypeDef;
  ```

#### 11.4 枚举类型
- **WWDG_Prescaler**（`stm32f1xx_hal_wwdg.h`）
  ```c
  #define WWDG_PRESCALER_1    0x00000000U  // 1 分频
  #define WWDG_PRESCALER_2    WWDG_CFR_WDGTB0 // 2 分频
  #define WWDG_PRESCALER_4    WWDG_CFR_WDGTB1 // 4 分频
  #define WWDG_PRESCALER_8    (WWDG_CFR_WDGTB0 | WWDG_CFR_WDGTB1) // 8 分频
  ```
- **HAL_WWDG_StateTypeDef**（`stm32f1xx_hal_wwdg.h`）
  ```c
  typedef enum {
    HAL_WWDG_STATE_RESET       = 0x00U,  // 未初始化
    HAL_WWDG_STATE_READY       = 0x01U,  // 就绪
    HAL_WWDG_STATE_BUSY        = 0x02U,  // 忙碌
    HAL_WWDG_STATE_TIMEOUT     = 0x03U,  // 超时
    HAL_WWDG_STATE_ERROR       = 0x04U   // 错误
  } HAL_WWDG_StateTypeDef;
  ```

#### 11.5 函数接口
- **`HAL_WWDG_Init(WWDG_HandleTypeDef *hwwdg)`**
  - 作用：初始化窗口看门狗。
  - 用法：配置分频和窗口。
- **`HAL_WWDG_DeInit(WWDG_HandleTypeDef *hwwdg)`**
  - 作用：反初始化 WWDG。
  - 用法：恢复默认状态。
- **`HAL_WWDG_Refresh(WWDG_HandleTypeDef *hwwdg)`**
  - 作用：喂狗（刷新计数器）。
  - 用法：防止复位。
- **`HAL_WWDG_IRQHandler(WWDG_HandleTypeDef *hwwdg)`**
  - 作用：处理 WWDG 中断。
  - 用法：在中断服务函数中调用。
- **`HAL_WWDG_EarlyWakeupCallback(WWDG_HandleTypeDef *hwwdg)`**
  - 作用：早期唤醒回调（弱定义）。
  - 用法：用户重写逻辑。

---

### 模块 12：IWDG（Independent Watchdog）
#### 12.1 表示外设的结构体
- **IWDG_TypeDef**（`stm32f1xx.h`）
  ```c
  typedef struct {
    __IO uint32_t KR;   // 键值寄存器
    __IO uint32_t PR;   // 预分频寄存器
    __IO uint32_t RLR;  // 重载寄存器
    __IO uint32_t SR;   // 状态寄存器
  } IWDG_TypeDef;
  ```
  - 字段解析：
    - `KR`：写入键值控制看门狗。
    - `PR`：分频设置。
    - `RLR`：重载值（超时时间）。
    - `SR`：状态标志。

#### 12.2 配置外设的结构体
- **IWDG_InitTypeDef**（`stm32f1xx_hal_iwdg.h`）
  ```c
  typedef struct {
    uint32_t Prescaler;  // 预分频（如 IWDG_PRESCALER_4）
    uint32_t Reload;     // 重载值（0-0xFFF）
  } IWDG_InitTypeDef;
  ```

#### 12.3 句柄结构体
- **IWDG_HandleTypeDef**（`stm32f1xx_hal_iwdg.h`）
  ```c
  typedef struct {
    IWDG_TypeDef *Instance;           // IWDG 实例
    IWDG_InitTypeDef Init;            // 初始化参数
    HAL_LockTypeDef Lock;             // 锁状态
    __IO HAL_IWDG_StateTypeDef State; // 状态
  } IWDG_HandleTypeDef;
  ```

#### 12.4 枚举类型
- **IWDG_Prescaler**（`stm32f1xx_hal_iwdg.h`）
  ```c
  #define IWDG_PRESCALER_4    0x00000000U  // 4 分频
  #define IWDG_PRESCALER_8    IWDG_PR_PR_0 // 8 分频
  #define IWDG_PRESCALER_16   IWDG_PR_PR_1 // 16 分频
  #define IWDG_PRESCALER_32   (IWDG_PR_PR_0 | IWDG_PR_PR_1) // 32 分频
  ```
- **HAL_IWDG_StateTypeDef**（`stm32f1xx_hal_iwdg.h`）
  ```c
  typedef enum {
    HAL_IWDG_STATE_RESET       = 0x00U,  // 未初始化
    HAL_IWDG_STATE_READY       = 0x01U,  // 就绪
    HAL_IWDG_STATE_BUSY        = 0x02U,  // 忙碌
    HAL_IWDG_STATE_TIMEOUT     = 0x03U,  // 超时
    HAL_IWDG_STATE_ERROR       = 0x04U   // 错误
  } HAL_IWDG_StateTypeDef;
  ```

#### 12.5 函数接口
- **`HAL_IWDG_Init(IWDG_HandleTypeDef *hiwdg)`**
  - 作用：初始化独立看门狗。
  - 用法：配置分频和重载值。
- **`HAL_IWDG_Refresh(IWDG_HandleTypeDef *hiwdg)`**
  - 作用：喂狗（刷新计数器）。
  - 用法：防止复位。
