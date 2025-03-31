#![no_std]
#![no_main]

use cortex_m::asm; // 提供汇编指令，如 nop
use cortex_m_rt::entry; // 定义程序入口
use panic_halt as _; // panic 时停止
use stm32f1xx_hal::{
    // HAL 库
    pac,        // 外设访问
    prelude::*, // 常用 trait
};

#[entry]
fn main() -> ! {
    // 获取外设
    let dp = pac::Peripherals::take().unwrap();

    // 配置时钟（使用默认配置）
    let rcc = dp.RCC.constrain();
    let mut flash = dp.FLASH.constrain();
    let clocks = rcc.cfgr.freeze(&mut flash.acr);

    // 配置 GPIO
    let mut gpioc = dp.GPIOC.split();
    let mut led = gpioc.pc13.into_push_pull_output(&mut gpioc.crh); // PC13 作为输出

    // 主循环：LED 闪烁
    loop {
        led.set_high(); // 点亮 LED
        delay_ms(500); // 延时约 500ms
        led.set_low(); // 熄灭 LED
        delay_ms(500); // 延时约 500ms
    }
}

// 简单的忙等待延时函数
fn delay_ms(ms: u32) {
    // 假设系统时钟为 8MHz（默认 HSI），粗略计算循环次数
    // 每次循环约 3 个指令周期，调整循环次数以接近目标时间
    let cycles = ms * 2000; // 粗略估计，具体时间需根据实际时钟频率调整
    for _ in 0..cycles {
        asm::nop(); // 空操作，消耗一个周期
    }
}
