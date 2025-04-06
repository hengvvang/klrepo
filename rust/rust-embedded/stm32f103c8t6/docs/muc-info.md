```
STM32F103C8T6
├── GPIO - General Purpose Input/Output (通用输入输出)
│   ├── GPIOA - Port A (Base Address: 0x4001_0800)
│   │   ├── CRL - Port Configuration Register Low (Offset: 0x00) - Configures Pins 0-7
│   │   │   ├── MODE0[1:0] (Bits 1:0) - Pin 0 Mode
│   │   │   │   ├── 00: Input mode (复位状态)
│   │   │   │   ├── 01: Output mode, max speed 10 MHz
│   │   │   │   ├── 10: Output mode, max speed 2 MHz
│   │   │   │   └── 11: Output mode, max speed 50 MHz
│   │   │   ├── CNF0[3:2] (Bits 3:2) - Pin 0 Configuration
│   │   │   │   ├── In Input Mode:
│   │   │   │   │   ├── 00: Analog input
│   │   │   │   │   ├── 01: Floating input (复位状态)
│   │   │   │   │   ├── 10: Pull-up/Pull-down input (由 ODR 决定)
│   │   │   │   │   └── 11: Reserved
│   │   │   │   ├── In Output Mode:
│   │   │   │   │   ├── 00: General purpose push-pull output
│   │   │   │   │   ├── 01: General purpose open-drain output
│   │   │   │   │   ├── 10: Alternate function push-pull output
│   │   │   │   │   └── 11: Alternate function open-drain output
│   │   │   ├── MODE1[5:4] (Bits 5:4) - Pin 1 Mode (同 MODE0)
│   │   │   ├── CNF1[7:6] (Bits 7:6) - Pin 1 Configuration (同 CNF0)
│   │   │   ├── MODE2[9:8] (Bits 9:8) - Pin 2 Mode (同 MODE0)
│   │   │   ├── CNF2[11:10] (Bits 11:10) - Pin 2 Configuration (同 CNF0)
│   │   │   ├── MODE3[13:12] (Bits 13:12) - Pin 3 Mode (同 MODE0)
│   │   │   ├── CNF3[15:14] (Bits 15:14) - Pin 3 Configuration (同 CNF0)
│   │   │   ├── MODE4[17:16] (Bits 17:16) - Pin 4 Mode (同 MODE0)
│   │   │   ├── CNF4[19:18] (Bits 19:18) - Pin 4 Configuration (同 CNF0)
│   │   │   ├── MODE5[21:20] (Bits 21:20) - Pin 5 Mode (同 MODE0)
│   │   │   ├── CNF5[23:22] (Bits 23:22) - Pin 5 Configuration (同 CNF0)
│   │   │   ├── MODE6[25:24] (Bits 25:24) - Pin 6 Mode (同 MODE0)
│   │   │   ├── CNF6[27:26] (Bits 27:26) - Pin 6 Configuration (同 CNF0)
│   │   │   ├── MODE7[29:28] (Bits 29:28) - Pin 7 Mode (同 MODE0)
│   │   │   └── CNF7[31:30] (Bits 31:30) - Pin 7 Configuration (同 CNF0)
│   │   ├── CRH - Port Configuration Register High (Offset: 0x04) - Configures Pins 8-15
│   │   │   ├── MODE8[1:0] (Bits 1:0) - Pin 8 Mode (同 MODE0)
│   │   │   ├── CNF8[3:2] (Bits 3:2) - Pin 8 Configuration (同 CNF0)
│   │   │   ├── MODE9[5:4] (Bits 5:4) - Pin 9 Mode (同 MODE0)
│   │   │   ├── CNF9[7:6] (Bits 7:6) - Pin 9 Configuration (同 CNF0)
│   │   │   ├── MODE10[9:8] (Bits 9:8) - Pin 10 Mode (同 MODE0)
│   │   │   ├── CNF10[11:10] (Bits 11:10) - Pin 10 Configuration (同 CNF0)
│   │   │   ├── MODE11[13:12] (Bits 13:12) - Pin 11 Mode (同 MODE0)
│   │   │   ├── CNF11[15:14] (Bits 15:14) - Pin 11 Configuration (同 CNF0)
│   │   │   ├── MODE12[17:16] (Bits 17:16) - Pin 12 Mode (同 MODE0)
│   │   │   ├── CNF12[19:18] (Bits 19:18) - Pin 12 Configuration (同 CNF0)
│   │   │   ├── MODE13[21:20] (Bits 21:20) - Pin 13 Mode (同 MODE0)
│   │   │   ├── CNF13[23:22] (Bits 23:22) - Pin 13 Configuration (同 CNF0)
│   │   │   ├── MODE14[25:24] (Bits 25:24) - Pin 14 Mode (同 MODE0)
│   │   │   ├── CNF14[27:26] (Bits 27:26) - Pin 14 Configuration (同 CNF0)
│   │   │   ├── MODE15[29:28] (Bits 29:28) - Pin 15 Mode (同 MODE0)
│   │   │   └── CNF15[31:30] (Bits 31:30) - Pin 15 Configuration (同 CNF0)
│   │   ├── IDR - Input Data Register (Offset: 0x08) - Read-only
│   │   │   ├── IDR0 (Bit 0) - Pin 0 Input State (0 or 1)
│   │   │   ├── IDR1 (Bit 1) - Pin 1 Input State (0 or 1)
│   │   │   ├── ... (IDR2 to IDR15, Bits 2 to 15)
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── ODR - Output Data Register (Offset: 0x0C)
│   │   │   ├── ODR0 (Bit 0) - Pin 0 Output State (0: Low, 1: High)
│   │   │   ├── ODR1 (Bit 1) - Pin 1 Output State (0: Low, 1: High)
│   │   │   ├── ... (ODR2 to ODR15, Bits 2 to 15)
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── BSRR - Bit Set/Reset Register (Offset: 0x10) - Write-only
│   │   │   ├── BS0 (Bit 0) - Set Pin 0 (1: Set High, 0: No effect)
│   │   │   ├── BS1 (Bit 1) - Set Pin 1 (1: Set High, 0: No effect)
│   │   │   ├── ... (BS2 to BS15, Bits 2 to 15)
│   │   │   ├── BR0 (Bit 16) - Reset Pin 0 (1: Set Low, 0: No effect)
│   │   │   ├── BR1 (Bit 17) - Reset Pin 1 (1: Set Low, 0: No effect)
│   │   │   └── ... (BR2 to BR15, Bits 18 to 31)
│   │   ├── BRR - Bit Reset Register (Offset: 0x14) - Write-only
│   │   │   ├── BR0 (Bit 0) - Reset Pin 0 (1: Set Low, 0: No effect)
│   │   │   ├── BR1 (Bit 1) - Reset Pin 1 (1: Set Low, 0: No effect)
│   │   │   ├── ... (BR2 to BR15, Bits 2 to 15)
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── LCKR - Configuration Lock Register (Offset: 0x18)
│   │   │   ├── LCK0 (Bit 0) - Lock Pin 0 Config (1: Locked, 0: Unlocked)
│   │   │   ├── LCK1 (Bit 1) - Lock Pin 1 Config (1: Locked, 0: Unlocked)
│   │   │   ├── ... (LCK2 to LCK15, Bits 2 to 15)
│   │   │   ├── LCKK (Bit 16) - Lock Key (Write 1-0-1 sequence to lock)
│   │   │   └── Reserved[31:17] (Bits 31:17) - Reserved
│   ├── GPIOB - Port B (Base Address: 0x4001_0C00) - Identical to GPIOA
│   ├── GPIOC - Port C (Base Address: 0x4001_1000) - Identical to GPIOA
│   ├── GPIOD - Port D (Base Address: 0x4001_1400) - Identical to GPIOA
│
├── AFIO - Alternate Function Input/Output (Base Address: 0x4001_0000)
│   ├── EVCR - Event Control Register (Offset: 0x00)
│   │   ├── PIN[3:0] (Bits 3:0) - Event Output Pin Selection
│   │   │   ├── 0000: Pin 0
│   │   │   ├── 0001: Pin 1
│   │   │   ├── ... (up to 1111: Pin 15)
│   │   ├── PORT[6:4] (Bits 6:4) - Event Output Port Selection
│   │   │   ├── 000: Port A
│   │   │   ├── 001: Port B
│   │   │   ├── 010: Port C
│   │   │   ├── 011: Port D
│   │   │   └── 100: Port E
│   │   ├── EVOE (Bit 7) - Event Output Enable
│   │   │   ├── 0: Disabled (复位状态)
│   │   │   └── 1: Enabled
│   │   └── Reserved[31:8] (Bits 31:8) - Reserved
│   ├── MAPR - AF Remap and Debug I/O Configuration Register (Offset: 0x04)
│   │   ├── SPI1_REMAP (Bit 0) - SPI1 Remap
│   │   │   ├── 0: No remap (NSS/PA15, SCK/PA5, MISO/PA6, MOSI/PA7)
│   │   │   └── 1: Remap (NSS/PA4, SCK/PB3, MISO/PB4, MOSI/PB5)
│   │   ├── I2C1_REMAP (Bit 1) - I2C1 Remap
│   │   │   ├── 0: No remap (SCL/PB6, SDA/PB7)
│   │   │   └── 1: Remap (SCL/PB8, SDA/PB9)
│   │   ├── USART1_REMAP (Bit 2) - USART1 Remap
│   │   │   ├── 0: No remap (TX/PA9, RX/PA10)
│   │   │   └── 1: Remap (TX/PB6, RX/PB7)
│   │   ├── USART2_REMAP (Bit 3) - USART2 Remap
│   │   │   ├── 0: No remap (TX/PA2, RX/PA3)
│   │   │   └── 1: Remap (TX/PD5, RX/PD6)
│   │   ├── USART3_REMAP[5:4] (Bits 5:4) - USART3 Remap
│   │   │   ├── 00: No remap (TX/PB10, RX/PB11)
│   │   │   ├── 01: Partial remap (TX/PC10, RX/PC11)
│   │   │   ├── 10: Reserved
│   │   │   └── 11: Full remap (TX/PD8, RX/PD9)
│   │   ├── TIM1_REMAP[7:6] (Bits 7:6) - TIM1 Remap
│   │   │   ├── 00: No remap (CH1/PA8, CH2/PA9, CH3/PA10, CH4/PA11)
│   │   │   ├── 01: Partial remap (CH1/PA7, CH2/PB0, CH3/PB1)
│   │   │   ├── 10: Reserved
│   │   │   └── 11: Full remap (CH1/PE9, CH2/PE11, CH3/PE13, CH4/PE14)
│   │   ├── TIM2_REMAP[9:8] (Bits 9:8) - TIM2 Remap
│   │   │   ├── 00: No remap (CH1/PA0, CH2/PA1, CH3/PA2, CH4/PA3)
│   │   │   ├── 01: Partial remap 1 (CH1/PA15, CH2/PB3)
│   │   │   ├── 10: Partial remap 2 (CH3/PB10, CH4/PB11)
│   │   │   └── 11: Full remap (CH1/PA15, CH2/PB3, CH3/PB10, CH4/PB11)
│   │   ├── TIM3_REMAP[11:10] (Bits 11:10) - TIM3 Remap
│   │   │   ├── 00: No remap (CH1/PA6, CH2/PA7, CH3/PB0, CH4/PB1)
│   │   │   ├── 01: Reserved
│   │   │   ├── 10: Partial remap (CH1/PB4, CH2/PB5)
│   │   │   └── 11: Full remap (CH1/PC6, CH2/PC7, CH3/PC8, CH4/PC9)
│   │   ├── TIM4_REMAP (Bit 12) - TIM4 Remap
│   │   │   ├── 0: No remap (CH1/PB6, CH2/PB7, CH3/PB8, CH4/PB9)
│   │   │   └── 1: Remap (CH1/PD12, CH2/PD13, CH3/PD14, CH4/PD15)
│   │   ├── CAN_REMAP[14:13] (Bits 14:13) - CAN Remap
│   │   │   ├── 00: No remap (RX/PA11, TX/PA12)
│   │   │   ├── 01: Reserved
│   │   │   ├── 10: Remap 2 (RX/PB8, TX/PB9)
│   │   │   └── 11: Remap 3 (RX/PD0, TX/PD1)
│   │   ├── ADC1_ETRGINJ_REMAP (Bit 15) - ADC1 External Trigger Injected Remap
│   │   │   ├── 0: No remap
│   │   │   └── 1: Remap
│   │   ├── ADC1_ETRGREG_REMAP (Bit 16) - ADC1 External Trigger Regular Remap
│   │   │   ├── 0: No remap
│   │   │   └── 1: Remap
│   │   ├── ADC2_ETRGINJ_REMAP (Bit 17) - ADC2 External Trigger Injected Remap
│   │   │   ├── 0: No remap
│   │   │   └── 1: Remap
│   │   ├── ADC2_ETRGREG_REMAP (Bit 18) - ADC2 External Trigger Regular Remap
│   │   │   ├── 0: No remap
│   │   │   └── 1: Remap
│   │   ├── SWJ_CFG[26:24] (Bits 26:24) - Serial Wire JTAG Configuration
│   │   │   ├── 000: Full SWJ (JTAG-DP + SW-DP)
│   │   │   ├── 001: JTAG-DP Disabled, SW-DP Enabled
│   │   │   ├── 010: JTAG-DP Disabled, SW-DP Disabled
│   │   │   ├── 100: JTAG-DP Enabled, SW-DP Disabled
│   │   │   └── Others: Reserved
│   │   └── Reserved[31:27] (Bits 31:27) - Reserved
│   ├── EXTICR1 - External Interrupt Configuration Register 1 (Offset: 0x08) - EXTI Lines 0-3
│   │   │   ├── EXTI0[3:0] (Bits 3:0) - EXTI Line 0 Source
│   │   │   │   ├── 0000: PA0
│   │   │   │   ├── 0001: PB0
│   │   │   │   ├── 0010: PC0
│   │   │   │   ├── 0011: PD0
│   │   │   │   └── Others: Reserved
│   │   │   ├── EXTI1[7:4] (Bits 7:4) - EXTI Line 1 Source (同 EXTI0)
│   │   │   ├── EXTI2[11:8] (Bits 11:8) - EXTI Line 2 Source (同 EXTI0)
│   │   │   ├── EXTI3[15:12] (Bits 15:12) - EXTI Line 3 Source (同 EXTI0)
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   ├── EXTICR2 - External Interrupt Configuration Register 2 (Offset: 0x0C) - EXTI Lines 4-7 (同 EXTICR1)
│   ├── EXTICR3 - External Interrupt Configuration Register 3 (Offset: 0x10) - EXTI Lines 8-11 (同 EXTICR1)
│   ├── EXTICR4 - External Interrupt Configuration Register 4 (Offset: 0x14) - EXTI Lines 12-15 (同 EXTICR1)
│   ├── MAPR2 - AF Remap Register 2 (Offset: 0x1C)
│   │   ├── TIM15_REMAP (Bit 0) - TIM15 Remap
│   │   │   ├── 0: No remap
│   │   │   └── 1: Remap
│   │   ├── TIM16_REMAP (Bit 1) - TIM16 Remap
│   │   │   ├── 0: No remap
│   │   │   └── 1: Remap
│   │   ├── TIM17_REMAP (Bit 2) - TIM17 Remap
│   │   │   ├── 0: No remap
│   │   │   └── 1: Remap
│   │   ├── Reserved[31:3] (Bits 31:3) - Reserved
│
├── RCC - Reset and Clock Control (Base Address: 0x4002_1000)
│   ├── CR - Clock Control Register (Offset: 0x00)
│   │   ├── HSION (Bit 0) - HSI Oscillator Enable
│   │   │   ├── 0: Disabled
│   │   │   └── 1: Enabled
│   │   ├── HSIRDY (Bit 1) - HSI Oscillator Ready (Read-only)
│   │   │   ├── 0: Not ready
│   │   │   └── 1: Ready
│   │   ├── HSITRIM[7:3] (Bits 7:3) - HSI Clock Trimming
│   │   │   ├── 00000 to 11111: Trim value (default: 16)
│   │   ├── HSICAL[15:8] (Bits 15:8) - HSI Calibration Value (Read-only)
│   │   ├── HSEON (Bit 16) - HSE Oscillator Enable
│   │   │   ├── 0: Disabled
│   │   │   └── 1: Enabled
│   │   ├── HSERDY (Bit 17) - HSE Oscillator Ready (Read-only)
│   │   │   ├── 0: Not ready
│   │   │   └── 1: Ready
│   │   ├── HSEBYP (Bit 18) - HSE Bypass
│   │   │   ├── 0: HSE not bypassed
│   │   │   └── 1: HSE bypassed
│   │   ├── CSSON (Bit 19) - Clock Security System Enable
│   │   │   ├── 0: Disabled
│   │   │   └── 1: Enabled
│   │   ├── PLLON (Bit 24) - PLL Enable
│   │   │   ├── 0: Disabled
│   │   │   └── 1: Enabled
│   │   ├── PLLRDY (Bit 25) - PLL Ready (Read-only)
│   │   │   ├── 0: Not ready
│   │   │   └── 1: Ready
│   │   └── Reserved[31:26] (Bits 31:26) - Reserved
│   ├── CFGR - Clock Configuration Register (Offset: 0x04)
│   │   ├── SW[1:0] (Bits 1:0) - System Clock Switch
│   │   │   ├── 00: HSI selected
│   │   │   ├── 01: HSE selected
│   │   │   ├── 10: PLL selected
│   │   │   └── 11: Reserved
│   │   ├── SWS[3:2] (Bits 3:2) - System Clock Switch Status (Read-only)
│   │   │   ├── 00: HSI in use
│   │   │   ├── 01: HSE in use
│   │   │   ├── 10: PLL in use
│   │   │   └── 11: Reserved
│   │   ├── HPRE[7:4] (Bits 7:4) - AHB Prescaler
│   │   │   ├── 0xxx: SYSCLK not divided
│   │   │   ├── 1000: SYSCLK / 2
│   │   │   ├── 1001: SYSCLK / 4
│   │   │   ├── ... (up to 1111: SYSCLK / 512)
│   │   ├── PPRE1[10:8] (Bits 10:8) - APB1 Prescaler (Low-speed)
│   │   │   ├── 0xx: HCLK not divided
│   │   │   ├── 100: HCLK / 2
│   │   │   ├── 101: HCLK / 4
│   │   │   ├── 110: HCLK / 8
│   │   │   └── 111: HCLK / 16
│   │   ├── PPRE2[13:11] (Bits 13:11) - APB2 Prescaler (High-speed)
│   │   │   ├── 0xx: HCLK not divided
│   │   │   ├── 100: HCLK / 2
│   │   │   ├── 101: HCLK / 4
│   │   │   ├── 110: HCLK / 8
│   │   │   └── 111: HCLK / 16
│   │   ├── ADCPRE[15:14] (Bits 15:14) - ADC Prescaler
│   │   │   ├── 00: PCLK2 / 2
│   │   │   ├── 01: PCLK2 / 4
│   │   │   ├── 10: PCLK2 / 6
│   │   │   └── 11: PCLK2 / 8
│   │   ├── PLLSRC (Bit 16) - PLL Clock Source
│   │   │   ├── 0: HSI / 2
│   │   │   └── 1: HSE
│   │   ├── PLLXTPRE (Bit 17) - HSE Divider for PLL Entry
│   │   │   ├── 0: HSE not divided
│   │   │   └── 1: HSE / 2
│   │   ├── PLLMUL[21:18] (Bits 21:18) - PLL Multiplication Factor
│   │   │   ├── 0000: x2
│   │   │   ├── 0001: x3
│   │   │   ├── ... (up to 1111: x16)
│   │   ├── USBPRE (Bit 22) - USB Prescaler
│   │   │   ├── 0: PLL / 1.5
│   │   │   └── 1: PLL not divided
│   │   ├── MCO[26:24] (Bits 26:24) - Microcontroller Clock Output
│   │   │   ├── 000: No clock
│   │   │   ├── 100: System clock (SYSCLK)
│   │   │   ├── 101: HSI clock
│   │   │   ├── 110: HSE clock
│   │   │   └── 111: PLL clock / 2
│   │   └── Reserved[31:27] (Bits 31:27) - Reserved
│   ├── CIR - Clock Interrupt Register (Offset: 0x08)
│   │   ├── LSIRDYF (Bit 0) - LSI Ready Interrupt Flag
│   │   │   ├── 0: No interrupt
│   │   │   └── 1: Interrupt occurred
│   │   ├── LSERDYF (Bit 1) - LSE Ready Interrupt Flag
│   │   ├── HSIRDYF (Bit 2) - HSI Ready Interrupt Flag
│   │   ├── HSERDYF (Bit 3) - HSE Ready Interrupt Flag
│   │   ├── PLLRDYF (Bit 4) - PLL Ready Interrupt Flag
│   │   ├── CSSF (Bit 7) - Clock Security System Interrupt Flag
│   │   ├── LSIRDYIE (Bit 8) - LSI Ready Interrupt Enable
│   │   │   ├── 0: Disabled
│   │   │   └── 1: Enabled
│   │   ├── LSERDYIE (Bit 9) - LSE Ready Interrupt Enable
│   │   ├── HSIRDYIE (Bit 10) - HSI Ready Interrupt Enable
│   │   ├── HSERDYIE (Bit 11) - HSE Ready Interrupt Enable
│   │   ├── PLLRDYIE (Bit 12) - PLL Ready Interrupt Enable
│   │   ├── LSIRDYC (Bit 16) - LSI Ready Interrupt Clear (Write 1 to clear)
│   │   ├── LSERDYC (Bit 17) - LSE Ready Interrupt Clear
│   │   ├── HSIRDYC (Bit 18) - HSI Ready Interrupt Clear
│   │   ├── HSERDYC (Bit 19) - HSE Ready Interrupt Clear
│   │   ├── PLLRDYC (Bit 20) - PLL Ready Interrupt Clear
│   │   ├── CSSC (Bit 23) - Clock Security System Interrupt Clear
│   │   └── Reserved[31:24] (Bits 31:24) - Reserved
│   ├── APB2RSTR - APB2 Peripheral Reset Register (Offset: 0x0C)
│   │   ├── AFIORST (Bit 0) - AFIO Reset
│   │   │   ├── 0: No reset
│   │   │   └── 1: Reset
│   │   ├── IOPARST (Bit 2) - GPIOA Reset
│   │   ├── IOPBRST (Bit 3) - GPIOB Reset
│   │   ├── IOPCRST (Bit 4) - GPIOC Reset
│   │   ├── IOPDRST (Bit 5) - GPIOD Reset
│   │   ├── ADC1RST (Bit 9) - ADC1 Reset
│   │   ├── ADC2RST (Bit 10) - ADC2 Reset
│   │   ├── TIM1RST (Bit 11) - TIM1 Reset
│   │   ├── SPI1RST (Bit 12) - SPI1 Reset
│   │   ├── USART1RST (Bit 14) - USART1 Reset
│   │   └── Reserved[31:15] (Bits 31:15) - Reserved
│   ├── APB1RSTR - APB1 Peripheral Reset Register (Offset: 0x10)
│   │   ├── TIM2RST (Bit 0) - TIM2 Reset
│   │   ├── TIM3RST (Bit 1) - TIM3 Reset
│   │   ├── TIM4RST (Bit 2) - TIM4 Reset
│   │   ├── WWDGRST (Bit 11) - WWDG Reset
│   │   ├── USART2RST (Bit 17) - USART2 Reset
│   │   ├── USART3RST (Bit 18) - USART3 Reset
│   │   ├── I2C1RST (Bit 21) - I2C1 Reset
│   │   ├── I2C2RST (Bit 22) - I2C2 Reset
│   │   ├── CANRST (Bit 25) - CAN Reset
│   │   ├── BKRST (Bit 27) - Backup Interface Reset
│   │   ├── PWRRST (Bit 28) - Power Control Reset
│   │   ├── DACRST (Bit 29) - DAC Reset
│   │   └── Reserved[31:30] (Bits 31:30) - Reserved
│   ├── AHBENR - AHB Peripheral Clock Enable Register (Offset: 0x14)
│   │   ├── DMA1EN (Bit 0) - DMA1 Clock Enable
│   │   │   ├── 0: Disabled
│   │   │   └── 1: Enabled
│   │   ├── DMA2EN (Bit 1) - DMA2 Clock Enable
│   │   ├── SRAMEN (Bit 2) - SRAM Clock Enable (Always 1)
│   │   ├── FLITFEN (Bit 4) - FLITF Clock Enable (Always 1)
│   │   ├── CRCEN (Bit 6) - CRC Clock Enable
│   │   ├── FSMCEN (Bit 8) - FSMC Clock Enable (Not in STM32F103C8T6)
│   │   └── Reserved[31:9] (Bits 31:9) - Reserved
│   ├── APB2ENR - APB2 Peripheral Clock Enable Register (Offset: 0x18)
│   │   ├── AFIOEN (Bit 0) - AFIO Clock Enable
│   │   │   ├── 0: Disabled
│   │   │   └── 1: Enabled
│   │   ├── IOPAEN (Bit 2) - GPIOA Clock Enable
│   │   ├── IOPBEN (Bit 3) - GPIOB Clock Enable
│   │   ├── IOPCEN (Bit 4) - GPIOC Clock Enable
│   │   ├── IOPDEN (Bit 5) - GPIOD Clock Enable
│   │   ├── ADC1EN (Bit 9) - ADC1 Clock Enable
│   │   ├── ADC2EN (Bit 10) - ADC2 Clock Enable
│   │   ├── TIM1EN (Bit 11) - TIM1 Clock Enable
│   │   ├── SPI1EN (Bit 12) - SPI1 Clock Enable
│   │   ├── USART1EN (Bit 14) - USART1 Clock Enable
│   │   └── Reserved[31:15] (Bits 31:15) - Reserved
│   ├── APB1ENR - APB1 Peripheral Clock Enable Register (Offset: 0x1C)
│   │   ├── TIM2EN (Bit 0) - TIM2 Clock Enable
│   │   │   ├── 0: Disabled
│   │   │   └── 1: Enabled
│   │   ├── TIM3EN (Bit 1) - TIM3 Clock Enable
│   │   ├── TIM4EN (Bit 2) - TIM4 Clock Enable
│   │   ├── WWDGEN (Bit 11) - WWDG Clock Enable
│   │   ├── USART2EN (Bit 17) - USART2 Clock Enable
│   │   ├── USART3EN (Bit 18) - USART3 Clock Enable
│   │   ├── I2C1EN (Bit 21) - I2C1 Clock Enable
│   │   ├── I2C2EN (Bit 22) - I2C2 Clock Enable
│   │   ├── CANEN (Bit 25) - CAN Clock Enable
│   │   ├── BKPEN (Bit 27) - Backup Interface Clock Enable
│   │   ├── PWREN (Bit 28) - Power Control Clock Enable
│   │   ├── DACEN (Bit 29) - DAC Clock Enable
│   │   └── Reserved[31:30] (Bits 31:30) - Reserved
│   ├── BDCR - Backup Domain Control Register (Offset: 0x20)
│   │   ├── LSEON (Bit 0) - LSE Oscillator Enable
│   │   │   ├── 0: Disabled
│   │   │   └── 1: Enabled
│   │   ├── LSERDY (Bit 1) - LSE Oscillator Ready (Read-only)
│   │   ├── LSEBYP (Bit 2) - LSE Bypass
│   │   ├── RTCSEL[9:8] (Bits 9:8) - RTC Clock Source Selection
│   │   │   ├── 00: No clock
│   │   │   ├── 01: LSE oscillator
│   │   │   ├── 10: LSI oscillator
│   │   │   └── 11: HSE / 128
│   │   ├── RTCEN (Bit 15) - RTC Clock Enable
│   │   │   ├── 0: Disabled
│   │   │   └── 1: Enabled
│   │   ├── BDRST (Bit 16) - Backup Domain Software Reset
│   │   │   ├── 0: No reset
│   │   │   └── 1: Reset
│   │   └── Reserved[31:17] (Bits 31:17) - Reserved
│   ├── CSR - Control/Status Register (Offset: 0x24)
│   │   ├── LSION (Bit 0) - LSI Oscillator Enable
│   │   │   ├── 0: Disabled
│   │   │   └── 1: Enabled
│   │   ├── LSIRDY (Bit 1) - LSI Oscillator Ready (Read-only)
│   │   ├── RMVF (Bit 24) - Remove Reset Flag (Write 1 to clear)
│   │   ├── PINRSTF (Bit 26) - Pin Reset Flag (Read-only)
│   │   ├── PORRSTF (Bit 27) - POR/PDR Reset Flag (Read-only)
│   │   ├── SFTRSTF (Bit 28) - Software Reset Flag (Read-only)
│   │   ├── IWDGRSTF (Bit 29) - Independent Watchdog Reset Flag (Read-only)
│   │   ├── WWDGRSTF (Bit 30) - Window Watchdog Reset Flag (Read-only)
│   │   ├── LPWRRSTF (Bit 31) - Low-Power Reset Flag (Read-only)
│   │   └── Reserved[23:2] (Bits 23:2) - Reserved
│
├── USART - Universal Synchronous/Asynchronous Receiver/Transmitter
│   ├── USART1 (Base Address: 0x4001_3800)
│   │   ├── SR - Status Register (Offset: 0x00)
│   │   │   ├── PE (Bit 0) - Parity Error
│   │   │   │   ├── 0: No error
│   │   │   │   └── 1: Error detected
│   │   │   ├── FE (Bit 1) - Framing Error
│   │   │   ├── NE (Bit 2) - Noise Error
│   │   │   ├── ORE (Bit 3) - Overrun Error
│   │   │   ├── IDLE (Bit 4) - Idle Line Detected
│   │   │   ├── RXNE (Bit 5) - Receive Data Register Not Empty
│   │   │   │   ├── 0: Data not received
│   │   │   │   └── 1: Data received (Write 1 to clear)
│   │   │   ├── TC (Bit 6) - Transmission Complete
│   │   │   ├── TXE (Bit 7) - Transmit Data Register Empty
│   │   │   │   ├── 0: Data not transferred
│   │   │   │   └── 1: Data transferred
│   │   │   ├── LBD (Bit 8) - LIN Break Detection
│   │   │   ├── CTS (Bit 9) - CTS Flag
│   │   │   └── Reserved[31:10] (Bits 31:10) - Reserved
│   │   ├── DR - Data Register (Offset: 0x04)
│   │   │   ├── DR[8:0] (Bits 8:0) - Data Value (9-bit data)
│   │   │   └── Reserved[31:9] (Bits 31:9) - Reserved
│   │   ├── BRR - Baud Rate Register (Offset: 0x08)
│   │   │   ├── DIV_Fraction[3:0] (Bits 3:0) - Fraction of Baud Rate
│   │   │   ├── DIV_Mantissa[15:4] (Bits 15:4) - Mantissa of Baud Rate
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── CR1 - Control Register 1 (Offset: 0x0C)
│   │   │   ├── SBK (Bit 0) - Send Break
│   │   │   │   ├── 0: No break
│   │   │   │   └── 1: Send break
│   │   │   ├── RWU (Bit 1) - Receiver Wakeup
│   │   │   ├── RE (Bit 2) - Receiver Enable
│   │   │   ├── TE (Bit 3) - Transmitter Enable
│   │   │   ├── IDLEIE (Bit 4) - Idle Interrupt Enable
│   │   │   ├── RXNEIE (Bit 5) - RXNE Interrupt Enable
│   │   │   ├── TCIE (Bit 6) - Transmission Complete Interrupt Enable
│   │   │   ├── TXEIE (Bit 7) - TXE Interrupt Enable
│   │   │   ├── PEIE (Bit 8) - Parity Error Interrupt Enable
│   │   │   ├── PS (Bit 9) - Parity Selection
│   │   │   │   ├── 0: Even parity
│   │   │   │   └── 1: Odd parity
│   │   │   ├── PCE (Bit 10) - Parity Control Enable
│   │   │   ├── WAKE (Bit 11) - Wakeup Method
│   │   │   ├── M (Bit 12) - Word Length
│   │   │   │   ├── 0: 8 bits
│   │   │   │   └── 1: 9 bits
│   │   │   ├── UE (Bit 13) - USART Enable
│   │   │   └── Reserved[31:14] (Bits 31:14) - Reserved
│   │   ├── CR2 - Control Register 2 (Offset: 0x10)
│   │   │   ├── ADD[3:0] (Bits 3:0) - Address of USART Node
│   │   │   ├── LBDL (Bit 5) - LIN Break Detection Length
│   │   │   │   ├── 0: 10-bit break
│   │   │   │   └── 1: 11-bit break
│   │   │   ├── LBDIE (Bit 6) - LIN Break Detection Interrupt Enable
│   │   │   ├── STOP[13:12] (Bits 13:12) - Stop Bits
│   │   │   │   ├── 00: 1 stop bit
│   │   │   │   ├── 01: 0.5 stop bit
│   │   │   │   ├── 10: 2 stop bits
│   │   │   │   └── 11: 1.5 stop bits
│   │   │   ├── LINEN (Bit 14) - LIN Mode Enable
│   │   │   └── Reserved[31:15] (Bits 31:15) - Reserved
│   │   ├── CR3 - Control Register 3 (Offset: 0x14)
│   │   │   ├── EIE (Bit 0) - Error Interrupt Enable
│   │   │   ├── IREN (Bit 1) - IrDA Mode Enable
│   │   │   ├── IRLP (Bit 2) - IrDA Low-Power
│   │   │   ├── HDSEL (Bit 3) - Half-Duplex Selection
│   │   │   ├── NACK (Bit 4) - Smartcard NACK Enable
│   │   │   ├── SCEN (Bit 5) - Smartcard Mode Enable
│   │   │   ├── DMAR (Bit 6) - DMA Enable Receiver
│   │   │   ├── DMAT (Bit 7) - DMA Enable Transmitter
│   │   │   ├── RTSE (Bit 8) - RTS Enable
│   │   │   ├── CTSE (Bit 9) - CTS Enable
│   │   │   ├── CTSIE (Bit 10) - CTS Interrupt Enable
│   │   │   └── Reserved[31:11] (Bits 31:11) - Reserved
│   │   ├── GTPR - Guard Time and Prescaler Register (Offset: 0x18)
│   │   │   ├── PSC[7:0] (Bits 7:0) - Prescaler Value
│   │   │   ├── GT[15:8] (Bits 15:8) - Guard Time Value
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   ├── USART2 (Base Address: 0x4000_4400) - Identical to USART1
│   ├── USART3 (Base Address: 0x4000_4800) - Identical to USART1
│
├── SPI - Serial Peripheral Interface
│   ├── SPI1 (Base Address: 0x4001_3000)
│   │   ├── CR1 - Control Register 1 (Offset: 0x00)
│   │   │   ├── CPHA (Bit 0) - Clock Phase
│   │   │   │   ├── 0: First clock transition is first data capture edge
│   │   │   │   └── 1: Second clock transition is first data capture edge
│   │   │   ├── CPOL (Bit 1) - Clock Polarity
│   │   │   │   ├── 0: CK to 0 when idle
│   │   │   │   └── 1: CK to 1 when idle
│   │   │   ├── MSTR (Bit 2) - Master Selection
│   │   │   │   ├── 0: Slave mode
│   │   │   │   └── 1: Master mode
│   │   │   ├── BR[5:3] (Bits 5:3) - Baud Rate Control
│   │   │   │   ├── 000: fPCLK / 2
│   │   │   │   ├── 001: fPCLK / 4
│   │   │   │   ├── 010: fPCLK / 8
│   │   │   │   ├── 011: fPCLK / 16
│   │   │   │   ├── 100: fPCLK / 32
│   │   │   │   ├── 101: fPCLK / 64
│   │   │   │   ├── 110: fPCLK / 128
│   │   │   │   └── 111: fPCLK / 256
│   │   │   ├── SPE (Bit 6) - SPI Enable
│   │   │   │   ├── 0: Disabled
│   │   │   │   └── 1: Enabled
│   │   │   ├── LSBFIRST (Bit 7) - Frame Format
│   │   │   │   ├── 0: MSB first
│   │   │   │   └── 1: LSB first
│   │   │   ├── SSI (Bit 8) - Internal Slave Select
│   │   │   ├── SSM (Bit 9) - Software Slave Management
│   │   │   ├── RXONLY (Bit 10) - Receive Only
│   │   │   ├── DFF (Bit 11) - Data Frame Format
│   │   │   │   ├── 0: 8-bit data
│   │   │   │   └── 1: 16-bit data
│   │   │   ├── CRCNEXT (Bit 12) - CRC Transfer Next
│   │   │   ├── CRCEN (Bit 13) - Hardware CRC Calculation Enable
│   │   │   ├── BIDIOE (Bit 14) - Bidirectional Data Mode Enable
│   │   │   ├── BIDIMODE (Bit 15) - Bidirectional Data Mode
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── CR2 - Control Register 2 (Offset: 0x04)
│   │   │   ├── RXDMAEN (Bit 0) - Rx Buffer DMA Enable
│   │   │   ├── TXDMAEN (Bit 1) - Tx Buffer DMA Enable
│   │   │   ├── SSOE (Bit 2) - SS Output Enable
│   │   │   ├── ERRIE (Bit 5) - Error Interrupt Enable
│   │   │   ├── RXNEIE (Bit 6) - RXNE Interrupt Enable
│   │   │   ├── TXEIE (Bit 7) - TXE Interrupt Enable
│   │   │   └── Reserved[31:8] (Bits 31:8) - Reserved
│   │   ├── SR - Status Register (Offset: 0x08)
│   │   │   ├── RXNE (Bit 0) - Receive Buffer Not Empty
│   │   │   ├── TXE (Bit 1) - Transmit Buffer Empty
│   │   │   ├── CHSIDE (Bit 2) - Channel Side
│   │   │   ├── UDR (Bit 3) - Underrun Flag
│   │   │   ├── CRCERR (Bit 4) - CRC Error Flag
│   │   │   ├── MODF (Bit 5) - Mode Fault
│   │   │   ├── OVR (Bit 6) - Overrun Flag
│   │   │   ├── BSY (Bit 7) - Busy Flag
│   │   │   └── Reserved[31:8] (Bits 31:8) - Reserved
│   │   ├── DR - Data Register (Offset: 0x0C)
│   │   │   ├── DR[15:0] (Bits 15:0) - Data Register
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── CRCPR - CRC Polynomial Register (Offset: 0x10)
│   │   │   ├── CRCPOLY[15:0] (Bits 15:0) - CRC Polynomial
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── RXCRCR - Rx CRC Register (Offset: 0x14)
│   │   │   ├── RxCRC[15:0] (Bits 15:0) - Rx CRC Value
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── TXCRCR - Tx CRC Register (Offset: 0x18)
│   │   │   ├── TxCRC[15:0] (Bits 15:0) - Tx CRC Value
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   ├── SPI2 (Base Address: 0x4000_3800) - Identical to SPI1
│
├── I2C - Inter-Integrated Circuit
│   ├── I2C1 (Base Address: 0x4000_5400)
│   │   ├── CR1 - Control Register 1 (Offset: 0x00)
│   │   │   ├── PE (Bit 0) - Peripheral Enable
│   │   │   │   ├── 0: Disabled
│   │   │   │   └── 1: Enabled
│   │   │   ├── SMBUS (Bit 1) - SMBus Mode
│   │   │   │   ├── 0: I2C mode
│   │   │   │   └── 1: SMBus mode
│   │   │   ├── ENARP (Bit 4) - ARP Enable
│   │   │   ├── ENPEC (Bit 5) - PEC Enable
│   │   │   ├── ENGC (Bit 6) - General Call Enable
│   │   │   ├── NOSTRETCH (Bit 7) - Clock Stretching Disable
│   │   │   ├── START (Bit 8) - Start Generation
│   │   │   ├── STOP (Bit 9) - Stop Generation
│   │   │   ├── ACK (Bit 10) - Acknowledge Enable
│   │   │   ├── POS (Bit 11) - Acknowledge/PEC Position
│   │   │   ├── PEC (Bit 12) - Packet Error Checking
│   │   │   ├── ALERT (Bit 13) - SMBus Alert
│   │   │   ├── SWRST (Bit 15) - Software Reset
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── CR2 - Control Register 2 (Offset: 0x04)
│   │   │   ├── FREQ[5:0] (Bits 5:0) - Peripheral Clock Frequency
│   │   │   │   ├── 000010: 2 MHz
│   │   │   │   ├── ... (up to 110000: 48 MHz)
│   │   │   ├── ITERREN (Bit 8) - Error Interrupt Enable
│   │   │   ├── ITEVTEN (Bit 9) - Event Interrupt Enable
│   │   │   ├── ITBUFEN (Bit 10) - Buffer Interrupt Enable
│   │   │   ├── DMAEN (Bit 11) - DMA Requests Enable
│   │   │   ├── LAST (Bit 12) - DMA Last Transfer
│   │   │   └── Reserved[31:13] (Bits 31:13) - Reserved
│   │   ├── OAR1 - Own Address Register 1 (Offset: 0x08)
│   │   │   ├── ADD0 (Bit 0) - Interface Address Bit 0
│   │   │   ├── ADD[7:1] (Bits 7:1) - Interface Address (7-bit mode)
│   │   │   ├── ADD[9:8] (Bits 9:8) - Interface Address (10-bit mode)
│   │   │   ├── ADDMODE (Bit 15) - Addressing Mode
│   │   │   │   ├── 0: 7-bit mode
│   │   │   │   └── 1: 10-bit mode
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── OAR2 - Own Address Register 2 (Offset: 0x0C)
│   │   │   ├── ENDUAL (Bit 0) - Dual Addressing Mode Enable
│   │   │   ├── ADD2[7:1] (Bits 7:1) - Second Interface Address
│   │   │   └── Reserved[31:8] (Bits 31:8) - Reserved
│   │   ├── DR - Data Register (Offset: 0x10)
│   │   │   ├── DR[7:0] (Bits 7:0) - Data Register
│   │   │   └── Reserved[31:8] (Bits 31:8) - Reserved
│   │   ├── SR1 - Status Register 1 (Offset: 0x14)
│   │   │   ├── SB (Bit 0) - Start Bit
│   │   │   ├── ADDR (Bit 1) - Address Sent/Matched
│   │   │   ├── BTF (Bit 2) - Byte Transfer Finished
│   │   │   ├── ADD10 (Bit 3) - 10-bit Header Sent
│   │   │   ├── STOPF (Bit 4) - Stop Detection
│   │   │   ├── RXNE (Bit 6) - Data Register Not Empty
│   │   │   ├── TXE (Bit 7) - Data Register Empty
│   │   │   ├── BERR (Bit 8) - Bus Error
│   │   │   ├── ARLO (Bit 9) - Arbitration Lost
│   │   │   ├── AF (Bit 10) - Acknowledge Failure
│   │   │   ├── OVR (Bit 11) - Overrun/Underrun
│   │   │   ├── PECERR (Bit 12) - PEC Error
│   │   │   ├── TIMEOUT (Bit 14) - Timeout Error
│   │   │   ├── SMBALERT (Bit 15) - SMBus Alert
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── SR2 - Status Register 2 (Offset: 0x18)
│   │   │   ├── MSL (Bit 0) - Master/Slave Mode
│   │   │   ├── BUSY (Bit 1) - Bus Busy
│   │   │   ├── TRA (Bit 2) - Transmitter/Receiver
│   │   │   ├── GENCALL (Bit 4) - General Call Address
│   │   │   ├── SMBDEFAULT (Bit 5) - SMBus Default Address
│   │   │   ├── SMBHOST (Bit 6) - SMBus Host Header
│   │   │   ├── DUALF (Bit 7) - Dual Flag
│   │   │   ├── PEC[15:8] (Bits 15:8) - Packet Error Checking Register
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── CCR - Clock Control Register (Offset: 0x1C)
│   │   │   ├── CCR[11:0] (Bits 11:0) - Clock Control Register
│   │   │   ├── DUTY (Bit 14) - Fast Mode Duty Cycle
│   │   │   ├── F_S (Bit 15) - I2C Master Mode Selection
│   │   │   │   ├── 0: Standard mode
│   │   │   │   └── 1: Fast mode
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── TRISE - Rise Time Register (Offset: 0x20)
│   │   │   ├── TRISE[5:0] (Bits 5:0) - Maximum Rise Time
│   │   │   └── Reserved[31:6] (Bits 31:6) - Reserved
│   ├── I2C2 (Base Address: 0x4000_5800) - Identical to I2C1
│
├── ADC - Analog-to-Digital Converter
│   ├── ADC1 (Base Address: 0x4001_2400)
│   │   ├── SR - Status Register (Offset: 0x00)
│   │   │   ├── AWD (Bit 0) - Analog Watchdog Flag
│   │   │   ├── EOC (Bit 1) - End of Conversion
│   │   │   ├── JEOC (Bit 2) - Injected Channel End of Conversion
│   │   │   ├── JSTRT (Bit 3) - Injected Channel Start Flag
│   │   │   ├── STRT (Bit 4) - Regular Channel Start Flag
│   │   │   └── Reserved[31:5] (Bits 31:5) - Reserved
│   │   ├── CR1 - Control Register 1 (Offset: 0x04)
│   │   │   ├── AWDCH[4:0] (Bits 4:0) - Analog Watchdog Channel Select
│   │   │   ├── EOCIE (Bit 5) - End of Conversion Interrupt Enable
│   │   │   ├── AWDIE (Bit 6) - Analog Watchdog Interrupt Enable
│   │   │   ├── JEOCIE (Bit 7) - Injected End of Conversion Interrupt Enable
│   │   │   ├── SCAN (Bit 8) - Scan Mode Enable
│   │   │   ├── AWDSGL (Bit 9) - Analog Watchdog Single Channel Enable
│   │   │   ├── JAUTO (Bit 10) - Automatic Injected Group Conversion
│   │   │   ├── DISCEN (Bit 11) - Discontinuous Mode Enable
│   │   │   ├── JDISCEN (Bit 12) - Discontinuous Mode on Injected Channels
│   │   │   ├── DISCNUM[15:13] (Bits 15:13) - Discontinuous Mode Channel Count
│   │   │   ├── JAWDEN (Bit 22) - Analog Watchdog on Injected Channels
│   │   │   ├── AWDEN (Bit 23) - Analog Watchdog on Regular Channels
│   │   │   └── Reserved[31:24] (Bits 31:24) - Reserved
│   │   ├── CR2 - Control Register 2 (Offset: 0x08)
│   │   │   ├── ADON (Bit 0) - ADC On
│   │   │   ├── CONT (Bit 1) - Continuous Conversion
│   │   │   ├── CAL (Bit 2) - ADC Calibration
│   │   │   ├── RSTCAL (Bit 3) - Reset Calibration
│   │   │   ├── DMA (Bit 8) - DMA Enable
│   │   │   ├── ALIGN (Bit 11) - Data Alignment
│   │   │   │   ├── 0: Right alignment
│   │   │   │   └── 1: Left alignment
│   │   │   ├── JEXTSEL[14:12] (Bits 14:12) - Injected External Trigger Selection
│   │   │   ├── JEXTTRIG (Bit 15) - Injected External Trigger Enable
│   │   │   ├── EXTSEL[19:17] (Bits 19:17) - Regular External Trigger Selection
│   │   │   ├── EXTTRIG (Bit 20) - Regular External Trigger Enable
│   │   │   ├── JSWSTART (Bit 21) - Start Conversion of Injected Channels
│   │   │   ├── SWSTART (Bit 22) - Start Conversion of Regular Channels
│   │   │   ├── TSVREFE (Bit 23) - Temperature Sensor and VREFINT Enable
│   │   │   └── Reserved[31:24] (Bits 31:24) - Reserved
│   │   ├── SMPR1 - Sample Time Register 1 (Offset: 0x0C)
│   │   │   ├── SMP10[2:0] (Bits 2:0) - Channel 10 Sample Time
│   │   │   │   ├── 000: 1.5 cycles
│   │   │   │   ├── 001: 7.5 cycles
│   │   │   │   ├── ... (up to 111: 239.5 cycles)
│   │   │   ├── SMP11[5:3] (Bits 5:3) - Channel 11 Sample Time
│   │   │   ├── ... (SMP12 to SMP17, Bits 8:6 to 23:21)
│   │   │   └── Reserved[31:24] (Bits 31:24) - Reserved
│   │   ├── SMPR2 - Sample Time Register 2 (Offset: 0x10)
│   │   │   ├── SMP0[2:0] (Bits 2:0) - Channel 0 Sample Time
│   │   │   ├── SMP1[5:3] (Bits 5:3) - Channel 1 Sample Time
│   │   │   ├── ... (SMP2 to SMP9, Bits 8:6 to 29:27)
│   │   │   └── Reserved[31:30] (Bits 31:30) - Reserved
│   │   ├── JOFR1 - Injected Channel Data Offset Register 1 (Offset: 0x14)
│   │   │   ├── JOFFSET1[11:0] (Bits 11:0) - Data Offset for Injected Channel 1
│   │   │   └── Reserved[31:12] (Bits 31:12) - Reserved
│   │   ├── JOFR2 - Injected Channel Data Offset Register 2 (Offset: 0x18) - Same as JOFR1
│   │   ├── JOFR3 - Injected Channel Data Offset Register 3 (Offset: 0x1C) - Same as JOFR1
│   │   ├── JOFR4 - Injected Channel Data Offset Register 4 (Offset: 0x20) - Same as JOFR1
│   │   ├── HTR - Watchdog Higher Threshold Register (Offset: 0x24)
│   │   │   ├── HT[11:0] (Bits 11:0) - Analog Watchdog High Threshold
│   │   │   └── Reserved[31:12] (Bits 31:12) - Reserved
│   │   ├── LTR - Watchdog Lower Threshold Register (Offset: 0x28)
│   │   │   ├── LT[11:0] (Bits 11:0) - Analog Watchdog Low Threshold
│   │   │   └── Reserved[31:12] (Bits 31:12) - Reserved
│   │   ├── SQR1 - Regular Sequence Register 1 (Offset: 0x2C)
│   │   │   ├── SQ13[4:0] (Bits 4:0) - 13th Conversion in Regular Sequence
│   │   │   ├── SQ14[9:5] (Bits 9:5) - 14th Conversion
│   │   │   ├── SQ15[14:10] (Bits 14:10) - 15th Conversion
│   │   │   ├── SQ16[19:15] (Bits 19:15) - 16th Conversion
│   │   │   ├── L[23:20] (Bits 23:20) - Regular Channel Sequence Length
│   │   │   │   ├── 0000: 1 conversion
│   │   │   │   ├── ... (up to 1111: 16 conversions)
│   │   │   └── Reserved[31:24] (Bits 31:24) - Reserved
│   │   ├── SQR2 - Regular Sequence Register 2 (Offset: 0x30)
│   │   │   ├── SQ7[4:0] (Bits 4:0) - 7th Conversion
│   │   │   ├── SQ8[9:5] (Bits 9:5) - 8th Conversion
│   │   │   ├── ... (SQ9 to SQ12, Bits 14:10 to 29:25)
│   │   │   └── Reserved[31:30] (Bits 31:30) - Reserved
│   │   ├── SQR3 - Regular Sequence Register 3 (Offset: 0x34)
│   │   │   ├── SQ1[4:0] (Bits 4:0) - 1st Conversion
│   │   │   ├── SQ2[9:5] (Bits 9:5) - 2nd Conversion
│   │   │   ├── ... (SQ3 to SQ6, Bits 14:10 to 29:25)
│   │   │   └── Reserved[31:30] (Bits 31:30) - Reserved
│   │   ├── JSQR - Injected Sequence Register (Offset: 0x38)
│   │   │   ├── JSQ1[4:0] (Bits 4:0) - 1st Injected Conversion
│   │   │   ├── JSQ2[9:5] (Bits 9:5) - 2nd Injected Conversion
│   │   │   ├── JSQ3[14:10] (Bits 14:10) - 3rd Injected Conversion
│   │   │   ├── JSQ4[19:15] (Bits 19:15) - 4th Injected Conversion
│   │   │   ├── JL[21:20] (Bits 21:20) - Injected Sequence Length
│   │   │   │   ├── 00: 1 conversion
│   │   │   │   ├── ... (up to 11: 4 conversions)
│   │   │   └── Reserved[31:22] (Bits 31:22) - Reserved
│   │   ├── JDR1 - Injected Data Register 1 (Offset: 0x3C)
│   │   │   ├── JDATA[15:0] (Bits 15:0) - Injected Data
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── JDR2 - Injected Data Register 2 (Offset: 0x40) - Same as JDR1
│   │   ├── JDR3 - Injected Data Register 3 (Offset: 0x44) - Same as JDR1
│   │   ├── JDR4 - Injected Data Register 4 (Offset: 0x48) - Same as JDR1
│   │   ├── DR - Regular Data Register (Offset: 0x4C)
│   │   │   ├── DATA[15:0] (Bits 15:0) - Regular Data
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   ├── ADC2 (Base Address: 0x4001_2800) - Identical to ADC1
│
├── TIM - Timers
│   ├── TIM1 (Base Address: 0x4001_2C00)
│   │   ├── CR1 - Control Register 1 (Offset: 0x00)
│   │   │   ├── CEN (Bit 0) - Counter Enable
│   │   │   ├── UDIS (Bit 1) - Update Disable
│   │   │   ├── URS (Bit 2) - Update Request Source
│   │   │   ├── OPM (Bit 3) - One-Pulse Mode
│   │   │   ├── DIR (Bit 4) - Direction
│   │   │   │   ├── 0: Upcounter
│   │   │   │   └── 1: Downcounter
│   │   │   ├── CMS[6:5] (Bits 6:5) - Center-Aligned Mode Selection
│   │   │   │   ├── 00: Edge-aligned mode
│   │   │   │   ├── 01: Center-aligned mode 1
│   │   │   │   ├── 10: Center-aligned mode 2
│   │   │   │   └── 11: Center-aligned mode 3
│   │   │   ├── ARPE (Bit 7) - Auto-Reload Preload Enable
│   │   │   ├── CKD[9:8] (Bits 9:8) - Clock Division
│   │   │   │   ├── 00: tDTS = tCK_INT
│   │   │   │   ├── 01: tDTS = 2 × tCK_INT
│   │   │   │   ├── 10: tDTS = 4 × tCK_INT
│   │   │   │   └── 11: Reserved
│   │   │   └── Reserved[31:10] (Bits 31:10) - Reserved
│   │   ├── CR2 - Control Register 2 (Offset: 0x04)
│   │   │   ├── CCPC (Bit 0) - Capture/Compare Preloaded Control
│   │   │   ├── CCUS (Bit 2) - Capture/Compare Control Update Selection
│   │   │   ├── CCDS (Bit 3) - Capture/Compare DMA Selection
│   │   │   ├── MMS[6:4] (Bits 6:4) - Master Mode Selection
│   │   │   ├── TI1S (Bit 7) - TI1 Selection
│   │   │   ├── OIS1 (Bit 8) - Output Idle State 1
│   │   │   ├── OIS1N (Bit 9) - Output Idle State 1 (Complementary)
│   │   │   ├── OIS2 (Bit 10) - Output Idle State 2
│   │   │   ├── OIS2N (Bit 11) - Output Idle State 2 (Complementary)
│   │   │   ├── OIS3 (Bit 12) - Output Idle State 3
│   │   │   ├── OIS3N (Bit 13) - Output Idle State 3 (Complementary)
│   │   │   ├── OIS4 (Bit 14) - Output Idle State 4
│   │   │   └── Reserved[31:15] (Bits 31:15) - Reserved
│   │   ├── SMCR - Slave Mode Control Register (Offset: 0x08)
│   │   │   ├── SMS[2:0] (Bits 2:0) - Slave Mode Selection
│   │   │   ├── TS[6:4] (Bits 6:4) - Trigger Selection
│   │   │   ├── MSM (Bit 7) - Master/Slave Mode
│   │   │   ├── ETF[11:8] (Bits 11:8) - External Trigger Filter
│   │   │   ├── ETPS[13:12] (Bits 13:12) - External Trigger Prescaler
│   │   │   ├── ECE (Bit 14) - External Clock Enable
│   │   │   ├── ETP (Bit 15) - External Trigger Polarity
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── DIER - DMA/Interrupt Enable Register (Offset: 0x0C)
│   │   │   ├── UIE (Bit 0) - Update Interrupt Enable
│   │   │   ├── CC1IE (Bit 1) - Capture/Compare 1 Interrupt Enable
│   │   │   ├── CC2IE (Bit 2) - Capture/Compare 2 Interrupt Enable
│   │   │   ├── CC3IE (Bit 3) - Capture/Compare 3 Interrupt Enable
│   │   │   ├── CC4IE (Bit 4) - Capture/Compare 4 Interrupt Enable
│   │   │   ├── COMIE (Bit 5) - COM Interrupt Enable
│   │   │   ├── TIE (Bit 6) - Trigger Interrupt Enable
│   │   │   ├── BIE (Bit 7) - Break Interrupt Enable
│   │   │   ├── UDE (Bit 8) - Update DMA Request Enable
│   │   │   │   ├── 0: Disabled
│   │   │   │   └── 1: Enabled
│   │   │   ├── CC1DE (Bit 9) - Capture/Compare 1 DMA Request Enable
│   │   │   ├── CC2DE (Bit 10) - Capture/Compare 2 DMA Request Enable
│   │   │   ├── CC3DE (Bit 11) - Capture/Compare 3 DMA Request Enable
│   │   │   ├── CC4DE (Bit 12) - Capture/Compare 4 DMA Request Enable
│   │   │   ├── COMDE (Bit 13) - COM DMA Request Enable
│   │   │   ├── TDE (Bit 14) - Trigger DMA Request Enable
│   │   │   └── Reserved[31:15] (Bits 31:15) - Reserved
│   │   ├── SR - Status Register (Offset: 0x10)
│   │   │   ├── UIF (Bit 0) - Update Interrupt Flag
│   │   │   │   ├── 0: No update occurred
│   │   │   │   └── 1: Update occurred (Write 0 to clear)
│   │   │   ├── CC1IF (Bit 1) - Capture/Compare 1 Interrupt Flag
│   │   │   ├── CC2IF (Bit 2) - Capture/Compare 2 Interrupt Flag
│   │   │   ├── CC3IF (Bit 3) - Capture/Compare 3 Interrupt Flag
│   │   │   ├── CC4IF (Bit 4) - Capture/Compare 4 Interrupt Flag
│   │   │   ├── COMIF (Bit 5) - COM Interrupt Flag
│   │   │   ├── TIF (Bit 6) - Trigger Interrupt Flag
│   │   │   ├── BIF (Bit 7) - Break Interrupt Flag
│   │   │   ├── CC1OF (Bit 9) - Capture/Compare 1 Overcapture Flag
│   │   │   ├── CC2OF (Bit 10) - Capture/Compare 2 Overcapture Flag
│   │   │   ├── CC3OF (Bit 11) - Capture/Compare 3 Overcapture Flag
│   │   │   ├── CC4OF (Bit 12) - Capture/Compare 4 Overcapture Flag
│   │   │   └── Reserved[31:13] (Bits 31:13) - Reserved
│   │   ├── EGR - Event Generation Register (Offset: 0x14) - Write-only
│   │   │   ├── UG (Bit 0) - Update Generation
│   │   │   │   ├── 1: Generate update event
│   │   │   ├── CC1G (Bit 1) - Capture/Compare 1 Generation
│   │   │   ├── CC2G (Bit 2) - Capture/Compare 2 Generation
│   │   │   ├── CC3G (Bit 3) - Capture/Compare 3 Generation
│   │   │   ├── CC4G (Bit 4) - Capture/Compare 4 Generation
│   │   │   ├── COMG (Bit 5) - Capture/Compare Control Update Generation
│   │   │   ├── TG (Bit 6) - Trigger Generation
│   │   │   ├── BG (Bit 7) - Break Generation
│   │   │   └── Reserved[31:8] (Bits 31:8) - Reserved
│   │   ├── CCMR1 - Capture/Compare Mode Register 1 (Offset: 0x18)
│   │   │   ├── (Input Capture Mode)
│   │   │   │   ├── CC1S[1:0] (Bits 1:0) - Capture/Compare 1 Selection
│   │   │   │   │   ├── 00: CC1 channel is output
│   │   │   │   │   ├── 01: CC1 channel is input, IC1 mapped on TI1
│   │   │   │   │   ├── 10: CC1 channel is input, IC1 mapped on TI2
│   │   │   │   │   └── 11: CC1 channel is input, IC1 mapped on TRC
│   │   │   │   ├── IC1PSC[3:2] (Bits 3:2) - Input Capture 1 Prescaler
│   │   │   │   │   ├── 00: No prescaler
│   │   │   │   │   ├── 01: Capture every 2 events
│   │   │   │   │   ├── 10: Capture every 4 events
│   │   │   │   │   └── 11: Capture every 8 events
│   │   │   │   ├── IC1F[7:4] (Bits 7:4) - Input Capture 1 Filter
│   │   │   │   │   ├── 0000: No filter
│   │   │   │   │   ├── 0001: fSAMPLING=fCK_INT, N=2
│   │   │   │   │   ├── ... (up to 1111: fSAMPLING=fDTS/32, N=8)
│   │   │   │   ├── CC2S[9:8] (Bits 9:8) - Capture/Compare 2 Selection
│   │   │   │   ├── IC2PSC[11:10] (Bits 11:10) - Input Capture 2 Prescaler
│   │   │   │   └── IC2F[15:12] (Bits 15:12) - Input Capture 2 Filter
│   │   │   ├── (Output Compare Mode)
│   │   │   │   ├── CC1S[1:0] (Bits 1:0) - Capture/Compare 1 Selection
│   │   │   │   ├── OC1FE (Bit 2) - Output Compare 1 Fast Enable
│   │   │   │   ├── OC1PE (Bit 3) - Output Compare 1 Preload Enable
│   │   │   │   ├── OC1M[6:4] (Bits 6:4) - Output Compare 1 Mode
│   │   │   │   │   ├── 000: Frozen
│   │   │   │   │   ├── 001: Set channel 1 to active level on match
│   │   │   │   │   ├── 010: Set channel 1 to inactive level on match
│   │   │   │   │   ├── 011: Toggle
│   │   │   │   │   ├── 100: Force inactive level
│   │   │   │   │   ├── 101: Force active level
│   │   │   │   │   ├── 110: PWM mode 1
│   │   │   │   │   └── 111: PWM mode 2
│   │   │   │   ├── OC1CE (Bit 7) - Output Compare 1 Clear Enable
│   │   │   │   ├── CC2S[9:8] (Bits 9:8) - Capture/Compare 2 Selection
│   │   │   │   ├── OC2FE (Bit 10) - Output Compare 2 Fast Enable
│   │   │   │   ├── OC2PE (Bit 11) - Output Compare 2 Preload Enable
│   │   │   │   ├── OC2M[14:12] (Bits 14:12) - Output Compare 2 Mode
│   │   │   │   └── OC2CE (Bit 15) - Output Compare 2 Clear Enable
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── CCMR2 - Capture/Compare Mode Register 2 (Offset: 0x1C) - Same as CCMR1 for Channels 3 and 4
│   │   ├── CCER - Capture/Compare Enable Register (Offset: 0x20)
│   │   │   ├── CC1E (Bit 0) - Capture/Compare 1 Output Enable
│   │   │   ├── CC1P (Bit 1) - Capture/Compare 1 Polarity
│   │   │   ├── CC1NE (Bit 2) - Capture/Compare 1 Complementary Output Enable
│   │   │   ├── CC1NP (Bit 3) - Capture/Compare 1 Complementary Polarity
│   │   │   ├── CC2E (Bit 4) - Capture/Compare 2 Output Enable
│   │   │   ├── CC2P (Bit 5) - Capture/Compare 2 Polarity
│   │   │   ├── CC2NE (Bit 6) - Capture/Compare 2 Complementary Output Enable
│   │   │   ├── CC2NP (Bit 7) - Capture/Compare 2 Complementary Polarity
│   │   │   ├── CC3E (Bit 8) - Capture/Compare 3 Output Enable
│   │   │   ├── CC3P (Bit 9) - Capture/Compare 3 Polarity
│   │   │   ├── CC3NE (Bit 10) - Capture/Compare 3 Complementary Output Enable
│   │   │   ├── CC3NP (Bit 11) - Capture/Compare 3 Complementary Polarity
│   │   │   ├── CC4E (Bit 12) - Capture/Compare 4 Output Enable
│   │   │   ├── CC4P (Bit 13) - Capture/Compare 4 Polarity
│   │   │   └── Reserved[31:14] (Bits 31:14) - Reserved
│   │   ├── CNT - Counter Register (Offset: 0x24)
│   │   │   ├── CNT[15:0] (Bits 15:0) - Counter Value
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── PSC - Prescaler Register (Offset: 0x28)
│   │   │   ├── PSC[15:0] (Bits 15:0) - Prescaler Value
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── ARR - Auto-Reload Register (Offset: 0x2C)
│   │   │   ├── ARR[15:0] (Bits 15:0) - Auto-Reload Value
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── RCR - Repetition Counter Register (Offset: 0x30)
│   │   │   ├── RCR[7:0] (Bits 7:0) - Repetition Counter Value
│   │   │   └── Reserved[31:8] (Bits 31:8) - Reserved
│   │   ├── CCR1 - Capture/Compare Register 1 (Offset: 0x34)
│   │   │   ├── CCR1[15:0] (Bits 15:0) - Capture/Compare 1 Value
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── CCR2 - Capture/Compare Register 2 (Offset: 0x38) - Same as CCR1
│   │   ├── CCR3 - Capture/Compare Register 3 (Offset: 0x3C) - Same as CCR1
│   │   ├── CCR4 - Capture/Compare Register 4 (Offset: 0x40) - Same as CCR1
│   │   ├── BDTR - Break and Dead-Time Register (Offset: 0x44)
│   │   │   ├── DTG[7:0] (Bits 7:0) - Dead-Time Generator Setup
│   │   │   ├── LOCK[9:8] (Bits 9:8) - Lock Configuration
│   │   │   │   ├── 00: No lock
│   │   │   │   ├── 01: Lock level 1
│   │   │   │   ├── 10: Lock level 2
│   │   │   │   └── 11: Lock level 3
│   │   │   ├── OSSI (Bit 10) - Off-State Selection for Idle Mode
│   │   │   ├── OSSR (Bit 11) - Off-State Selection for Run Mode
│   │   │   ├── BKE (Bit 12) - Break Enable
│   │   │   ├── BKP (Bit 13) - Break Polarity
│   │   │   ├── AOE (Bit 14) - Automatic Output Enable
│   │   │   ├── MOE (Bit 15) - Main Output Enable
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── DCR - DMA Control Register (Offset: 0x48)
│   │   │   ├── DBA[4:0] (Bits 4:0) - DMA Base Address
│   │   │   ├── DBL[12:8] (Bits 12:8) - DMA Burst Length
│   │   │   └── Reserved[31:13] (Bits 31:13) - Reserved
│   │   ├── DMAR - DMA Address for Full Transfer (Offset: 0x4C)
│   │   │   ├── DMAB[15:0] (Bits 15:0) - DMA Register for Burst Access
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   ├── TIM2 (Base Address: 0x4000_0000) - Same as TIM1 (No RCR, BDTR, DCR, DMAR)
│   ├── TIM3 (Base Address: 0x4000_0400) - Same as TIM2
│   ├── TIM4 (Base Address: 0x4000_0800) - Same as TIM2
│
├── DMA - Direct Memory Access
│   ├── DMA1 (Base Address: 0x4002_0000)
│   │   ├── ISR - Interrupt Status Register (Offset: 0x00)
│   │   │   ├── GIF1 (Bit 0) - Channel 1 Global Interrupt Flag
│   │   │   ├── TCIF1 (Bit 1) - Channel 1 Transfer Complete Flag
│   │   │   ├── HTIF1 (Bit 2) - Channel 1 Half Transfer Flag
│   │   │   ├── TEIF1 (Bit 3) - Channel 1 Transfer Error Flag
│   │   │   ├── GIF2 (Bit 4) - Channel 2 Global Interrupt Flag
│   │   │   ├── TCIF2 (Bit 5) - Channel 2 Transfer Complete Flag
│   │   │   ├── HTIF2 (Bit 6) - Channel 2 Half Transfer Flag
│   │   │   ├── TEIF2 (Bit 7) - Channel 2 Transfer Error Flag
│   │   │   ├── ... (GIF3 to TEIF7, Bits 8 to 27 for Channels 3-7)
│   │   │   └── Reserved[31:28] (Bits 31:28) - Reserved
│   │   ├── IFCR - Interrupt Flag Clear Register (Offset: 0x04) - Write-only
│   │   │   ├── CGIF1 (Bit 0) - Clear Channel 1 Global Interrupt Flag
│   │   │   ├── CTCIF1 (Bit 1) - Clear Channel 1 Transfer Complete Flag
│   │   │   ├── CHTIF1 (Bit 2) - Clear Channel 1 Half Transfer Flag
│   │   │   ├── CTEIF1 (Bit 3) - Clear Channel 1 Transfer Error Flag
│   │   │   ├── ... (CGIF2 to CTEIF7, Bits 4 to 27 for Channels 2-7)
│   │   │   └── Reserved[31:28] (Bits 31:28) - Reserved
│   │   ├── CCR1 - Channel 1 Configuration Register (Offset: 0x08)
│   │   │   ├── EN (Bit 0) - Channel Enable
│   │   │   │   ├── 0: Disabled
│   │   │   │   └── 1: Enabled
│   │   │   ├── TCIE (Bit 1) - Transfer Complete Interrupt Enable
│   │   │   ├── HTIE (Bit 2) - Half Transfer Interrupt Enable
│   │   │   ├── TEIE (Bit 3) - Transfer Error Interrupt Enable
│   │   │   ├── DIR (Bit 4) - Data Transfer Direction
│   │   │   │   ├── 0: Peripheral to memory
│   │   │   │   └── 1: Memory to peripheral
│   │   │   ├── CIRC (Bit 5) - Circular Mode
│   │   │   ├── PINC (Bit 6) - Peripheral Increment Mode
│   │   │   ├── MINC (Bit 7) - Memory Increment Mode
│   │   │   ├── PSIZE[9:8] (Bits 9:8) - Peripheral Size
│   │   │   │   ├── 00: 8 bits
│   │   │   │   ├── 01: 16 bits
│   │   │   │   ├── 10: 32 bits
│   │   │   │   └── 11: Reserved
│   │   │   ├── MSIZE[11:10] (Bits 11:10) - Memory Size (Same as PSIZE)
│   │   │   ├── PL[13:12] (Bits 13:12) - Priority Level
│   │   │   │   ├── 00: Low
│   │   │   │   ├── 01: Medium
│   │   │   │   ├── 10: High
│   │   │   │   └── 11: Very high
│   │   │   ├── MEM2MEM (Bit 14) - Memory-to-Memory Mode
│   │   │   └── Reserved[31:15] (Bits 31:15) - Reserved
│   │   ├── CNDTR1 - Channel 1 Number of Data Register (Offset: 0x0C)
│   │   │   ├── NDT[15:0] (Bits 15:0) - Number of Data to Transfer
│   │   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   │   ├── CPAR1 - Channel 1 Peripheral Address Register (Offset: 0x10)
│   │   │   ├── PA[31:0] (Bits 31:0) - Peripheral Address
│   │   ├── CMAR1 - Channel 1 Memory Address Register (Offset: 0x14)
│   │   │   ├── MA[31:0] (Bits 31:0) - Memory Address
│   │   ├── CCR2 to CMAR7 (Offsets: 0x1C to 0x70) - Same as Channel 1 for Channels 2-7
│   ├── DMA2 (Base Address: 0x4002_0400) - Identical to DMA1 , 5 Channels in STM32F103C8T6
│   │   ├── ISR - Interrupt Status Register (Offset: 0x00)
│   │   │   ├── GIF1 (Bit 0) - Channel 1 Global Interrupt Flag
│   │   │   ├── ... (GIF2 to TEIF5, Bits 4 to 19 for Channels 2-5)
│   │   │   └── Reserved[31:20] (Bits 31:20) - Reserved
│   │   ├── IFCR - Interrupt Flag Clear Register (Offset: 0x04) - Write-only
│   │   │   ├── CGIF1 (Bit 0) - Clear Channel 1 Global Interrupt Flag
│   │   │   ├── ... (CGIF2 to CTEIF5, Bits 4 to 19 for Channels 2-5)
│   │   │   └── Reserved[31:20] (Bits 31:20) - Reserved
│   │   ├── CCR1 to CMAR5 (Offsets: 0x08 to 0x58) - Channels 1-5, Same as DMA1 Channel 1
│
├── RTC - Real-Time Clock (Base Address: 0x4000_2800)
│   ├── CRH - Control Register High (Offset: 0x00)
│   │   ├── SECIE (Bit 0) - Second Interrupt Enable
│   │   │   ├── 0: Disabled
│   │   │   └── 1: Enabled
│   │   ├── ALRIE (Bit 1) - Alarm Interrupt Enable
│   │   ├── OWIE (Bit 2) - Overflow Interrupt Enable
│   │   └── Reserved[31:3] (Bits 31:3) - Reserved
│   ├── CRL - Control Register Low (Offset: 0x04)
│   │   ├── SECF (Bit 0) - Second Flag
│   │   ├── ALRF (Bit 1) - Alarm Flag
│   │   ├── OWF (Bit 2) - Overflow Flag
│   │   ├── RSF (Bit 3) - Registers Synchronized Flag
│   │   ├── CNF (Bit 4) - Configuration Flag
│   │   ├── RTOFF (Bit 5) - RTC Operation Off (Read-only)
│   │   └── Reserved[31:6] (Bits 31:6) - Reserved
│   ├── PRLH - Prescaler Load Register High (Offset: 0x08)
│   │   ├── PRLH[3:0] (Bits 3:0) - RTC Prescaler High Bits
│   │   └── Reserved[31:4] (Bits 31:4) - Reserved
│   ├── PRLL - Prescaler Load Register Low (Offset: 0x0C)
│   │   ├── PRLL[15:0] (Bits 15:0) - RTC Prescaler Low Bits
│   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   ├── DIVH - Divider Register High (Offset: 0x10)
│   │   ├── DIVH[3:0] (Bits 3:0) - RTC Clock Divider High Bits (Read-only)
│   │   └── Reserved[31:4] (Bits 31:4) - Reserved
│   ├── DIVL - Divider Register Low (Offset: 0x14)
│   │   ├── DIVL[15:0] (Bits 15:0) - RTC Clock Divider Low Bits (Read-only)
│   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   ├── CNTH - Counter Register High (Offset: 0x18)
│   │   ├── CNTH[15:0] (Bits 15:0) - RTC Counter High Bits
│   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   ├── CNTL - Counter Register Low (Offset: 0x1C)
│   │   ├── CNTL[15:0] (Bits 15:0) - RTC Counter Low Bits
│   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   ├── ALRH - Alarm Register High (Offset: 0x20)
│   │   ├── ALRH[15:0] (Bits 15:0) - RTC Alarm High Bits
│   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   ├── ALRL - Alarm Register Low (Offset: 0x24)
│   │   ├── ALRL[15:0] (Bits 15:0) - RTC Alarm Low Bits
│   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│
├── IWDG - Independent Watchdog (Base Address: 0x4000_3000)
│   ├── KR - Key Register (Offset: 0x00) - Write-only
│   │   ├── KEY[15:0] (Bits 15:0) - Key Value
│   │   │   ├── 0xAAAA: Enable watchdog
│   │   │   ├── 0x5555: Enable register access
│   │   │   ├── 0xCCCC: Start watchdog
│   │   │   └── Others: No effect
│   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   ├── PR - Prescaler Register (Offset: 0x04)
│   │   ├── PR[2:0] (Bits 2:0) - Prescaler Divider
│   │   │   ├── 000: Divider / 4
│   │   │   ├── 001: Divider / 8
│   │   │   ├── 010: Divider / 16
│   │   │   ├── 011: Divider / 32
│   │   │   ├── 100: Divider / 64
│   │   │   ├── 101: Divider / 128
│   │   │   ├── 110: Divider / 256
│   │   │   └── 111: Divider / 256
│   │   └── Reserved[31:3] (Bits 31:3) - Reserved
│   ├── RLR - Reload Register (Offset: 0x08)
│   │   ├── RL[11:0] (Bits 11:0) - Watchdog Counter Reload Value
│   │   └── Reserved[31:12] (Bits 31:12) - Reserved
│   ├── SR - Status Register (Offset: 0x0C)
│   │   ├── PVU (Bit 0) - Prescaler Value Update (Read-only)
│   │   │   ├── 0: No update in progress
│   │   │   └── 1: Update in progress
│   │   ├── RVU (Bit 1) - Reload Value Update (Read-only)
│   │   └── Reserved[31:2] (Bits 31:2) - Reserved
│
├── WWDG - Window Watchdog (Base Address: 0x4000_2C00)
│   ├── CR - Control Register (Offset: 0x00)
│   │   ├── T[6:0] (Bits 6:0) - 7-bit Counter Value
│   │   ├── WDGA (Bit 7) - Activation Bit
│   │   │   ├── 0: Watchdog disabled
│   │   │   └── 1: Watchdog enabled
│   │   └── Reserved[31:8] (Bits 31:8) - Reserved
│   ├── CFR - Configuration Register (Offset: 0x04)
│   │   ├── W[6:0] (Bits 6:0) - 7-bit Window Value
│   │   ├── WDGTB[8:7] (Bits 8:7) - Timer Base
│   │   │   ├── 00: CK Counter Clock / 1
│   │   │   ├── 01: CK Counter Clock / 2
│   │   │   ├── 10: CK Counter Clock / 4
│   │   │   └── 11: CK Counter Clock / 8
│   │   ├── EWI (Bit 9) - Early Wakeup Interrupt
│   │   └── Reserved[31:10] (Bits 31:10) - Reserved
│   ├── SR - Status Register (Offset: 0x08)
│   │   ├── EWIF (Bit 0) - Early Wakeup Interrupt Flag
│   │   │   ├── 0: No interrupt
│   │   │   └── 1: Interrupt occurred (Write 0 to clear)
│   │   └── Reserved[31:1] (Bits 31:1) - Reserved
│
├── FLASH - Flash Memory Interface (Base Address: 0x4002_2000)
│   ├── ACR - Access Control Register (Offset: 0x00)
│   │   ├── LATENCY[2:0] (Bits 2:0) - Latency
│   │   │   ├── 000: Zero wait state
│   │   │   ├── 001: One wait state
│   │   │   ├── 010: Two wait states
│   │   │   └── Others: Reserved
│   │   ├── HLFCYA (Bit 3) - Half Cycle Access Enable
│   │   ├── PRFTBE (Bit 4) - Prefetch Buffer Enable
│   │   ├── PRFTBS (Bit 5) - Prefetch Buffer Status (Read-only)
│   │   └── Reserved[31:6] (Bits 31:6) - Reserved
│   ├── KEYR - Key Register (Offset: 0x04) - Write-only
│   │   ├── FKEYR[31:0] (Bits 31:0) - Flash Key
│   │   │   ├── 0x45670123: Key 1
│   │   │   └── 0xCDEF89AB: Key 2 (Write in sequence to unlock)
│   ├── OPTKEYR - Option Byte Key Register (Offset: 0x08) - Write-only
│   │   ├── OPTKEYR[31:0] (Bits 31:0) - Option Byte Key (Same sequence as KEYR)
│   ├── SR - Status Register (Offset: 0x0C)
│   │   ├── BSY (Bit 0) - Busy (Read-only)
│   │   ├── PGERR (Bit 2) - Programming Error
│   │   ├── WRPRTERR (Bit 4) - Write Protection Error
│   │   ├── EOP (Bit 5) - End of Operation
│   │   └── Reserved[31:6] (Bits 31:6) - Reserved
│   ├── CR - Control Register (Offset: 0x10)
│   │   ├── PG (Bit 0) - Programming
│   │   ├── PER (Bit 1) - Page Erase
│   │   ├── MER (Bit 2) - Mass Erase
│   │   ├── OPTPG (Bit 4) - Option Byte Programming
│   │   ├── OPTER (Bit 5) - Option Byte Erase
│   │   ├── STRT (Bit 6) - Start
│   │   ├── LOCK (Bit 7) - Lock
│   │   ├── OPTWRE (Bit 9) - Option Bytes Write Enable
│   │   ├── ERRIE (Bit 10) - Error Interrupt Enable
│   │   ├── EOPIE (Bit 12) - End of Operation Interrupt Enable
│   │   └── Reserved[31:13] (Bits 31:13) - Reserved
│   ├── AR - Address Register (Offset: 0x14)
│   │   ├── FAR[31:0] (Bits 31:0) - Flash Address
│   ├── OBR - Option Byte Register (Offset: 0x1C) - Read-only
│   │   ├── OPTERR (Bit 0) - Option Byte Error
│   │   │   ├── 0: No error
│   │   │   └── 1: Error detected
│   │   ├── RDPRT (Bit 1) - Read Protection
│   │   │   ├── 0: Read protection disabled
│   │   │   └── 1: Read protection enabled
│   │   ├── WDG_SW (Bit 2) - Software Watchdog
│   │   │   ├── 0: Hardware IWDG
│   │   │   └── 1: Software IWDG
│   │   ├── nRST_STOP (Bit 3) - Reset in Stop Mode
│   │   │   ├── 0: Reset generated
│   │   │   └── 1: No reset in Stop mode
│   │   ├── nRST_STDBY (Bit 4) - Reset in Standby Mode
│   │   │   ├── 0: Reset generated
│   │   │   └── 1: No reset in Standby mode
│   │   ├── BOOT1 (Bit 5) - Boot Mode Selection (with nBOOT0)
│   │   │   ├── 0: Boot from Main Flash or System Memory (depends on nBOOT0)
│   │   │   └── 1: Boot from SRAM or System Memory (depends on nBOOT0)
│   │   ├── nBOOT0 (Bit 6) - Boot Mode Selection (with BOOT1)
│   │   │   ├── 0: Boot from System Memory or SRAM (depends on BOOT1)
│   │   │   └── 1: Boot from Main Flash or SRAM (depends on BOOT1)
│   │   ├── DATA0[15:8] (Bits 15:8) - User Data Byte 0
│   │   ├── DATA1[23:16] (Bits 23:16) - User Data Byte 1
│   │   └── Reserved[31:24] (Bits 31:24) - Reserved
│   ├── WRPR - Write Protection Register (Offset: 0x20)
│   │   ├── WRP[31:0] (Bits 31:0) - Write Protection Bits
│
├── PWR - Power Control (Base Address: 0x4000_7000)
│   ├── CR - Control Register (Offset: 0x00)
│   │   ├── LPDS (Bit 0) - Low-Power Deep Sleep
│   │   │   ├── 0: Voltage regulator on
│   │   │   └── 1: Voltage regulator in low-power mode
│   │   ├── PDDS (Bit 1) - Power Down Deep Sleep
│   │   │   ├── 0: Enter Stop mode
│   │   │   └── 1: Enter Standby mode
│   │   ├── CWUF (Bit 2) - Clear Wakeup Flag (Write 1 to clear)
│   │   ├── CSBF (Bit 3) - Clear Standby Flag (Write 1 to clear)
│   │   ├── PVDE (Bit 4) - Power Voltage Detector Enable
│   │   ├── PLS[7:5] (Bits 7:5) - PVD Level Selection
│   │   │   ├── 000: 2.2V
│   │   │   ├── 001: 2.3V
│   │   │   ├── ... (up to 111: 2.9V)
│   │   ├── DBP (Bit 8) - Disable Backup Domain Write Protection
│   │   └── Reserved[31:9] (Bits 31:9) - Reserved
│   ├── CSR - Status Register (Offset: 0x04)
│   │   ├── WUF (Bit 0) - Wakeup Flag (Read-only)
│   │   ├── SBF (Bit 1) - Standby Flag (Read-only)
│   │   ├── PVDO (Bit 2) - PVD Output (Read-only)
│   │   ├── EWUP (Bit 8) - Enable WKUP Pin
│   │   └── Reserved[31:9] (Bits 31:9) - Reserved
│
├── BKP - Backup Registers (Base Address: 0x4000_6C00)
│   ├── DR1 - Backup Data Register 1 (Offset: 0x04)
│   │   ├── BKP[15:0] (Bits 15:0) - Backup Data
│   │   └── Reserved[31:16] (Bits 31:16) - Reserved
│   ├── DR2 to DR10 (Offsets: 0x08 to 0x28) -10 Backup Registers, Same as DR1
│   ├── RTCCR - RTC Clock Calibration Register (Offset: 0x2C)
│   │   ├── CAL[6:0] (Bits 6:0) - Calibration Value
│   │   ├── CCO (Bit 7) - Calibration Clock Output
│   │   ├── ASOE (Bit 8) - Alarm or Second Output Enable
│   │   ├── ASOS (Bit 9) - Alarm or Second Output Selection
│   │   └── Reserved[31:10] (Bits 31:10) - Reserved
│   ├── CR - Control Register (Offset: 0x30)
│   │   ├── TPE (Bit 0) - Tamper Pin Enable
│   │   ├── TPAL (Bit 1) - Tamper Pin Active Level
│   │   └── Reserved[31:2] (Bits 31:2) - Reserved
│   ├── CSR - Status Register (Offset: 0x34)
│   │   ├── CTE (Bit 0) - Clear Tamper Event (Write 1 to clear)
│   │   ├── CTI (Bit 1) - Clear Tamper Interrupt (Write 1 to clear)
│   │   ├── TPIE (Bit 2) - Tamper Pin Interrupt Enable
│   │   ├── TEF (Bit 8) - Tamper Event Flag (Read-only)
│   │   ├── TIF (Bit 9) - Tamper Interrupt Flag (Read-only)
│   │   └── Reserved[31:10] (Bits 31:10) - Reserved
│
├── EXTI - External Interrupt/Event Controller (Base Address: 0x4001_0400)
│   ├── IMR - Interrupt Mask Register (Offset: 0x00)
│   │   ├── MR0 (Bit 0) - Interrupt Mask on Line 0
│   │   │   ├── 0: Interrupt request masked
│   │   │   └── 1: Interrupt request not masked
│   │   ├── MR1 (Bit 1) - Interrupt Mask on Line 1
│   │   ├── ... (MR2 to MR18, Bits 2 to 18)
│   │   └── Reserved[31:19] (Bits 31:19) - Reserved
│   ├── EMR - Event Mask Register (Offset: 0x04)
│   │   ├── MR0 (Bit 0) - Event Mask on Line 0
│   │   │   ├── 0: Event request masked
│   │   │   └── 1: Event request not masked
│   │   ├── ... (MR1 to MR18, Bits 1 to 18)
│   │   └── Reserved[31:19] (Bits 31:19) - Reserved
│   ├── RTSR - Rising Trigger Selection Register (Offset: 0x08)
│   │   ├── TR0 (Bit 0) - Rising Trigger on Line 0
│   │   │   ├── 0: Disabled
│   │   │   └── 1: Enabled
│   │   ├── ... (TR1 to TR18, Bits 1 to 18)
│   │   └── Reserved[31:19] (Bits 31:19) - Reserved
│   ├── FTSR - Falling Trigger Selection Register (Offset: 0x0C)
│   │   ├── TR0 (Bit 0) - Falling Trigger on Line 0
│   │   │   ├── 0: Disabled
│   │   │   └── 1: Enabled
│   │   ├── ... (TR1 to TR18, Bits 1 to 18)
│   │   └── Reserved[31:19] (Bits 31:19) - Reserved
│   ├── SWIER - Software Interrupt Event Register (Offset: 0x10)
│   │   ├── SWIER0 (Bit 0) - Software Interrupt on Line 0
│   │   │   ├── 0: No effect
│   │   │   └── 1: Generate interrupt/event
│   │   ├── ... (SWIER1 to SWIER18, Bits 1 to 18)
│   │   └── Reserved[31:19] (Bits 31:19) - Reserved
│   ├── PR - Pending Register (Offset: 0x14)
│   │   ├── PR0 (Bit 0) - Pending Bit on Line 0
│   │   │   ├── 0: No pending request
│   │   │   └── 1: Pending request (Write 1 to clear)
│   │   ├── ... (PR1 to PR18, Bits 1 to 18)
│   │   └── Reserved[31:19] (Bits 31:19) - Reserved
│
└── NVIC - Nested Vectored Interrupt Controller (Base Address: 0xE000_E100)
    ├── ISER0 - Interrupt Set-Enable Register 0 (Offset: 0x00)
    │   ├── SETENA[31:0] (Bits 31:0) - Enable Interrupts 0-31
    │   │   ├── 0: No effect
    │   │   └── 1: Enable interrupt
    ├── ISER1 - Interrupt Set-Enable Register 1 (Offset: 0x04)
    │   ├── SETENA[31:0] (Bits 31:0) - Enable Interrupts 32-63
    ├── ICER0 - Interrupt Clear-Enable Register 0 (Offset: 0x80)
    │   ├── CLRENA[31:0] (Bits 31:0) - Disable Interrupts 0-31
    │   │   ├── 0: No effect
    │   │   └── 1: Disable interrupt
    ├── ICER1 - Interrupt Clear-Enable Register 1 (Offset: 0x84)
    │   ├── CLRENA[31:0] (Bits 31:0) - Disable Interrupts 32-63
    ├── ISPR0 - Interrupt Set-Pending Register 0 (Offset: 0x100)
    │   ├── SETPEND[31:0] (Bits 31:0) - Set Pending Interrupts 0-31
    ├── ISPR1 - Interrupt Set-Pending Register 1 (Offset: 0x104)
    │   ├── SETPEND[31:0] (Bits 31:0) - Set Pending Interrupts 32-63
    ├── ICPR0 - Interrupt Clear-Pending Register 0 (Offset: 0x180)
    │   ├── CLRPEND[31:0] (Bits 31:0) - Clear Pending Interrupts 0-31
    ├── ICPR1 - Interrupt Clear-Pending Register 1 (Offset: 0x184)
    │   ├── CLRPEND[31:0] (Bits 31:0) - Clear Pending Interrupts 32-63
    ├── IABR0 - Interrupt Active Bit Register 0 (Offset: 0x200)
    │   ├── ACTIVE[31:0] (Bits 31:0) - Active Interrupts 0-31 (Read-only)
    ├── IABR1 - Interrupt Active Bit Register 1 (Offset: 0x204)
    │   ├── ACTIVE[31:0] (Bits 31:0) - Active Interrupts 32-63 (Read-only)
    ├── IPR0 - Interrupt Priority Register 0 (Offset: 0x300)
    │   ├── PRI_0[7:4] (Bits 7:4) - Priority for Interrupt 0
    │   ├── PRI_1[15:12] (Bits 15:12) - Priority for Interrupt 1
    │   ├── PRI_2[23:20] (Bits 23:20) - Priority for Interrupt 2
    │   ├── PRI_3[31:28] (Bits 31:28) - Priority for Interrupt 3
    ├── IPR1 to IPR20 (Offsets: 0x304 to 0x350) - Same structure for Interrupts 4-83
```
