#![no_std]
#![no_main]
#![allow(unused)]

// use cortex_m::Peipherals as CorePeripherals;

use cortex_m_rt::entry;
use panic_halt as _;
// use stm32f1::stm32f103 as pac;
use stm32f1::stm32f103::{self as pac, CorePeripherals, Peripherals, rcc::apb2enr::AFIOEN};

#[entry]
fn main() -> ! {
    // ------------- Peripherals -------------
    let cp = pac::CorePeripherals::take().unwrap();
    let dp = pac::Peripherals::take().unwrap();
    // ------------- Peripheral --------------
    // Periph<RegisterBlock, xxxxxxxxxx>
    let rcc = &dp.RCC;
    let gpioa = &dp.GPIOA;
    let gpiob = &dp.GPIOB;
    let gpioc = &dp.GPIOC;
    let gpiod = &dp.GPIOD;
    // ------------- Register -------------
    // Reg<CRLrs>
    let crl = gpioa.crl();
    let crh = gpioa.crh();
    let idr = gpioa.idr();
    let odr = gpioa.odr();
    let bsrr = gpioa.bsrr();
    let brr = gpioa.brr();
    let lckr = gpioa.lckr();
    // -------------- Field -----------------
    // CRL CRH
    // - MODEX[1:0]
    // - CNFX[1:0]

    rcc.apb2enr().modify(|_, w| w.iopaen().set_bit());

    loop {}
}
