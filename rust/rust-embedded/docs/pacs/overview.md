# lib.rs
- 设置代码风格
    - #![allow(non_camel_case_types)]
    - #![allow(non_snake_case)]
- 设置rust库依赖
    - #![no_std]
- 导入 generic 模块
- 条件编译
    - 在 `cargo.tom` 中声明 features
        - [features]  stm32f10x = []
    - 使用features 进行选择导入编译内容
        - #[cfg(feature = "stm32f10x")]

# generic.rs
- 通过 结构体<泛型> 抽象外设的三个层次
    - 外设
        - 外设 Periph<RB, const A: usize>
        - RB 寄存块 A 寄存器块的地址
        - 如 GPIOA  或 GPIOB  或 I2C
    - R<REG: RegisterSpec>
    - W<REG: RegisterSpec>
    - FieldReader<FI = u8> where  FI: FieldSpec,
    - BitReader<FI>
- 通过 trait 来抽象外设三个层次
    - 寄存器
        - RegisterSpec
        - 包括每个设包含的寄存器
    - 字段
        - FieldSpec
        - IsEnum: FieldSpec
