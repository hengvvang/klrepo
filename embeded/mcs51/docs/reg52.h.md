```
/*--------------------------------------------------------------------------
REG52.H

Header file for generic 80C52 and 80C32 microcontroller.
Copyright (c) 1988-2002 Keil Elektronik GmbH and Keil Software, Inc.
All rights reserved.
--------------------------------------------------------------------------*/

#ifndef __REG52_H__
#define __REG52_H__

/*  BYTE Registers  */
sfr P0    = 0x80;
sfr P1    = 0x90;
sfr P2    = 0xA0;
sfr P3    = 0xB0;
sfr PSW   = 0xD0;
sfr ACC   = 0xE0;
sfr B     = 0xF0;
sfr SP    = 0x81;
sfr DPL   = 0x82;
sfr DPH   = 0x83;
sfr PCON  = 0x87;
sfr TCON  = 0x88;
sfr TMOD  = 0x89;
sfr TL0   = 0x8A;
sfr TL1   = 0x8B;
sfr TH0   = 0x8C;
sfr TH1   = 0x8D;
sfr IE    = 0xA8;
sfr IP    = 0xB8;
sfr SCON  = 0x98;
sfr SBUF  = 0x99;

/*  8052 Extensions  */
sfr T2CON  = 0xC8;
sfr RCAP2L = 0xCA;
sfr RCAP2H = 0xCB;
sfr TL2    = 0xCC;
sfr TH2    = 0xCD;


/*  BIT Registers  */
/*  PSW  */
sbit CY    = PSW^7;
sbit AC    = PSW^6;
sbit F0    = PSW^5;
sbit RS1   = PSW^4;
sbit RS0   = PSW^3;
sbit OV    = PSW^2;
sbit P     = PSW^0; //8052 only

/*  TCON  */
sbit TF1   = TCON^7;
sbit TR1   = TCON^6;
sbit TF0   = TCON^5;
sbit TR0   = TCON^4;
sbit IE1   = TCON^3;
sbit IT1   = TCON^2;
sbit IE0   = TCON^1;
sbit IT0   = TCON^0;

/*  IE  */
sbit EA    = IE^7;
sbit ET2   = IE^5; //8052 only
sbit ES    = IE^4;
sbit ET1   = IE^3;
sbit EX1   = IE^2;
sbit ET0   = IE^1;
sbit EX0   = IE^0;

/*  IP  */
sbit PT2   = IP^5;
sbit PS    = IP^4;
sbit PT1   = IP^3;
sbit PX1   = IP^2;
sbit PT0   = IP^1;
sbit PX0   = IP^0;

/*  P3  */
sbit RD    = P3^7;
sbit WR    = P3^6;
sbit T1    = P3^5;
sbit T0    = P3^4;
sbit INT1  = P3^3;
sbit INT0  = P3^2;
sbit TXD   = P3^1;
sbit RXD   = P3^0;

/*  SCON  */
sbit SM0   = SCON^7;
sbit SM1   = SCON^6;
sbit SM2   = SCON^5;
sbit REN   = SCON^4;
sbit TB8   = SCON^3;
sbit RB8   = SCON^2;
sbit TI    = SCON^1;
sbit RI    = SCON^0;

/*  P1  */
sbit T2EX  = P1^1; // 8052 only
sbit T2    = P1^0; // 8052 only

/*  T2CON  */
sbit TF2    = T2CON^7;
sbit EXF2   = T2CON^6;
sbit RCLK   = T2CON^5;
sbit TCLK   = T2CON^4;
sbit EXEN2  = T2CON^3;
sbit TR2    = T2CON^2;
sbit C_T2   = T2CON^1;
sbit CP_RL2 = T2CON^0;

#endif

```



---


```

/*--------------------------------------------------------------------------
REG52.H

Header file for generic 80C52 and 80C32 microcontroller.
Copyright (c) 1988-2002 Keil Elektronik GmbH and Keil Software, Inc.
All rights reserved.
--------------------------------------------------------------------------*/

#ifndef __REG52_H__
#define __REG52_H__

/*  BYTE Registers (特殊功能寄存器，按字节访问) */
sfr P0    = 0x80;  // Port 0 (I/O 端口)
sfr P1    = 0x90;  // Port 1 (I/O 端口)
sfr P2    = 0xA0;  // Port 2 (I/O 端口)
sfr P3    = 0xB0;  // Port 3 (I/O 端口)
sfr PSW   = 0xD0;  // Program Status Word (程序状态字寄存器)
sfr ACC   = 0xE0;  // Accumulator (累加器)
sfr B     = 0xF0;  // B Register (B寄存器，用于乘法和除法运算)
sfr SP    = 0x81;  // Stack Pointer (堆栈指针)
sfr DPL   = 0x82;  // Data Pointer Low Byte (数据指针低字节)
sfr DPH   = 0x83;  // Data Pointer High Byte (数据指针高字节)
sfr PCON  = 0x87;  // Power Control (电源控制寄存器)
sfr TCON  = 0x88;  // Timer Control (定时器控制寄存器)
sfr TMOD  = 0x89;  // Timer Mode (定时器模式控制寄存器)
sfr TL0   = 0x8A;  // Timer 0 Low Byte (定时器0低字节)
sfr TL1   = 0x8B;  // Timer 1 Low Byte (定时器1低字节)
sfr TH0   = 0x8C;  // Timer 0 High Byte (定时器0高字节)
sfr TH1   = 0x8D;  // Timer 1 High Byte (定时器1高字节)
sfr IE    = 0xA8;  // Interrupt Enable (中断使能寄存器)
sfr IP    = 0xB8;  // Interrupt Priority (中断优先级寄存器)
sfr SCON  = 0x98;  // Serial Control (串行控制寄存器)
sfr SBUF  = 0x99;  // Serial Buffer (串行数据缓冲寄存器)

/*  8052 Extensions (8052 额外的寄存器) */
sfr T2CON  = 0xC8;  // Timer 2 Control (定时器2控制寄存器)
sfr RCAP2L = 0xCA;  // Timer 2 Capture Low Byte (定时器2捕获低字节)
sfr RCAP2H = 0xCB;  // Timer 2 Capture High Byte (定时器2捕获高字节)
sfr TL2    = 0xCC;  // Timer 2 Low Byte (定时器2低字节)
sfr TH2    = 0xCD;  // Timer 2 High Byte (定时器2高字节)

/*  BIT Registers (位寻址寄存器) */
/*  PSW (程序状态字寄存器) */
sbit CY    = PSW^7; // Carry Flag (进位标志)
sbit AC    = PSW^6; // Auxiliary Carry Flag (辅助进位标志)
sbit F0    = PSW^5; // User Flag 0 (用户标志位0)
sbit RS1   = PSW^4; // Register Bank Select Bit 1 (寄存器组选择位1)
sbit RS0   = PSW^3; // Register Bank Select Bit 0 (寄存器组选择位0)
sbit OV    = PSW^2; // Overflow Flag (溢出标志)
sbit P     = PSW^0; // Parity Flag (奇偶校验标志，仅8052可用)

/*  TCON (定时器控制寄存器) */
sbit TF1   = TCON^7; // Timer 1 Overflow Flag (定时器1溢出标志)
sbit TR1   = TCON^6; // Timer 1 Run Control (定时器1运行控制)
sbit TF0   = TCON^5; // Timer 0 Overflow Flag (定时器0溢出标志)
sbit TR0   = TCON^4; // Timer 0 Run Control (定时器0运行控制)
sbit IE1   = TCON^3; // External Interrupt 1 Edge Flag (外部中断1标志)
sbit IT1   = TCON^2; // External Interrupt 1 Type Control (外部中断1触发类型控制)
sbit IE0   = TCON^1; // External Interrupt 0 Edge Flag (外部中断0标志)
sbit IT0   = TCON^0; // External Interrupt 0 Type Control (外部中断0触发类型控制)

/*  IE (中断使能寄存器) */
sbit EA    = IE^7; // Global Interrupt Enable (全局中断使能)
sbit ET2   = IE^5; // Timer 2 Interrupt Enable (定时器2中断使能，8052专用)
sbit ES    = IE^4; // Serial Interrupt Enable (串行中断使能)
sbit ET1   = IE^3; // Timer 1 Interrupt Enable (定时器1中断使能)
sbit EX1   = IE^2; // External Interrupt 1 Enable (外部中断1使能)
sbit ET0   = IE^1; // Timer 0 Interrupt Enable (定时器0中断使能)
sbit EX0   = IE^0; // External Interrupt 0 Enable (外部中断0使能)

/*  P3 (端口3) */
sbit RD    = P3^7; // External Data Memory Read (外部数据存储器读)
sbit WR    = P3^6; // External Data Memory Write (外部数据存储器写)
sbit T1    = P3^5; // Timer 1 External Input (定时器1外部输入)
sbit T0    = P3^4; // Timer 0 External Input (定时器0外部输入)
sbit INT1  = P3^3; // External Interrupt 1 (外部中断1)
sbit INT0  = P3^2; // External Interrupt 0 (外部中断0)
sbit TXD   = P3^1; // Serial Transmit Data (串行发送数据)
sbit RXD   = P3^0; // Serial Receive Data (串行接收数据)

#endif /* __REG52_H__ */


```
