// RCC  Reset and Clock Control
// - 时钟源管理: 提供多个时钟源（如 HSI<high speed internal> HSE<high speed external> PLL<phase lock loop> LSI<low speed internal> LSE<low speed external>) 并控制系统时钟(SYSCLK)
// - 时钟分配和分配: 通过预分频器将时钟分配给 AHB APB1 APB2 等总线 即外设
// - 外设时钟使能：GPIO USART SPI 等外设提供时钟信号
//
// - RCC_CR
// - RCC_CFGR
// - RCC_CIR
// - RCC_AHBENR
// - RCC_APB1ENR
// - RCC_APB2ENR
// - RCC_BDCR
// - RCC_CSR

// ----------- RCC_CR ---------
// HSION
// HSIRDY
// HSEON
// HSERDY
// PLLON
// PLLRDY
#![no_main]
#![no_std]
#![allow(unused)]
use cortex_m_rt::entry;
use panic_halt as _;
use stm32f1::stm32f103;
fn configure_rcc_cr() {
    // use library

    let cp = cortex_m::Peripherals::take().unwrap();
    let dp = stm32f103::Peripherals::take().unwrap();
    // use pub use
    // let cp = stm32f1::stm32f103::CorePeripherals::take().unwrap();
    // let dp = stm32f1::stm32f103::Peripherals::take().unwrap();
    let cp = stm32f103::CorePeripherals::take().unwrap();
    let dp = stm32f103::Peripherals::take().unwrap();

    let rcc = &dp.RCC;
    let gpioa = &dp.GPIOA;
    let gpiob = &dp.GPIOB;
    let gpioc = &dp.GPIOC;
    let gpiod = &dp.GPIOD;
    let adc1 = &dp.ADC1;
    let adc2 = &dp.ADC2;
    let adc3 = &dp.ADC3;
    let spi1 = &dp.SPI1;
    let spi2 = &dp.SPI2;
    let spi3 = &dp.SPI3;
    let i2c1 = &dp.I2C1;
    let i2c1 = &dp.I2C2;
    let usart1 = &dp.USART1;
    let tim1 = &dp.TIM1;

    let brr = gpioa.brr();
    let bsrr = gpioa.bsrr();
    let crh = gpioa.crh();
    let crl = gpioa.crl();
    let odr = gpioa.odr();
    let lckr = gpioa.lckr();
    let rc = rcc.cr();

    let rcc = &dp.RCC;
    let ahbenr = rcc.ahbenr();
    let apb1enr = rcc.apb1enr();
    // rcc.cr.modify(|_, w| w.hseon().set_bit());
    // while rcc.cr.read().hserdy().bit_is_clear() {}

    // rcc.cr.modify(|_, w| w.pllon().set.bit());
    // while rcc.cr.read().pllrdy().bit_is_clear() {}
}

#[entry]
fn main() -> ! {
    configure_rcc_cr();
    loop {}
}
