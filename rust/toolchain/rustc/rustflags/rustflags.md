# RUSTFLAGS
## **Overview Key Points**

1. **分类与作用**：
    - **通用编译器**：警告（`-D`、`-W`、`-A`、）、条件（`--cfg`）、版本（`--edition`）、输出（`--emit`）。
    - **代码生成（****`-C`****）**：性能（`opt-level`）、调试（`debug-info`）、架构（`target-cpu`）。
    - **链接相关**：库路径（`-L`）、链接库（`-l`）、外部 crate（`--extern`）。
    - **调试诊断**：错误解释（`--explain`）、详细输出（`--verbose`）、格式（`--error-format`）。
    - **不稳定（****`-Z`****）**：实验功能（`unstable-options`）、调试（`dump-mir`、 `time-passes`）。
2. **缩写与翻译**：
    - 缩写（如 `-D` = Deny、`-C` = Codegen）反映技术含义，翻译准确。
    - 全称（如 `--verbose`、 `--explain`）直接表达功能，易于理解。
    - 组合词（如 `--crate-type`、 `unstable-options`）清晰描述作用。
3. **常用选项与场景**：
    - **质量控制**：`-D warnings`、 `-W missing_docs`。
    - **性能优化**：`-C opt-level=3`、 `-C target-cpu=native`。
    - **调试分析**：`--verbose`、 `-Z time-passes`。
    - **实验性功能**：`-Z unstable-options`、 `-F try_blocks`。
    - **链接与 FFI**：`-L /path`、 `-l mylib`。
4. **注意事项**：
    - `-Z` 标志仅限 nightly 版本，需关注 Rust 版本更新。
    - 命令行标志优先级高于 `RUSTFLAGS` 和 `.cargo/config.toml`。
    - 部分标志（如 `-C incremental`、 `-Z sanitize`）可能影响性能，需权衡使用。
### **概览（Overview）**

`RUSTFLAGS` 是 Rust 编译器的环境变量，用于控制编译行为，分为五大类：

1. **通用编译器标志**：管理警告、条件编译、版本和输出，适用于代码质量和适配。
2. **代码生成标志（****`-C`**** 前缀）**：优化性能、调试信息和目标架构，`-C` 表示 "Codegen"（代码生成）。
3. **链接相关标志**：处理库路径和外部链接，适用于 FFI 和库集成。
4. **调试和诊断标志**：支持错误分析和编译过程调试，适用于开发和问题排查。
5. **不稳定标志（****`-Z`**** 前缀）**：启用实验性功能和调试，仅限 nightly 版本，`-Z` 表示不稳定。

**关键点**：

- 标志按功能分类，涵盖从代码质量到性能优化的全流程。
- 缩写来源反映技术含义，常用选项体现实际应用场景。
- 使用场景包括质量控制、性能优化、调试分析和实验性功能。
- 注意 `-Z` 标志的 nightly 限制和标志优先级（命令行 > `RUSTFLAGS` > `.cargo/config.toml`）。

---

### **1. 通用编译器标志**

**作用概览**：控制警告（质量）、条件编译（适配）、版本（一致性）和输出（灵活性）。

**关键点**：适用于所有项目，核心是代码管理和适配。

|标志|作用|缩写来源（中英翻译）|常用选项|
|:-:|:-:|:-:|:-:|
|`-D <warning>`|将警告升级为错误，强制修复|Deny（拒绝/禁止）|`-D unused`, `-D warnings`|
|`-A <warning>`|禁用警告，防止显示|Allow（允许/准许）|`-A dead_code`, `-A nonstandard_style`|
|`-W <warning>`|启用警告，即使默认未启用|Warn（警告/告诫）|`-W missing_docs`, `-W trivial_numeric_casts`|
|`-F <feature>`|启用实验性特性（nightly 版本）|Feature（特性/功能）|`-F proc_macro_hygiene`, `-F try_blocks`|
|`--cfg <config>`|设置条件编译配置，控制代码适配|Configuration（配置/设置）|`--cfg feature="serde"`, `--cfg target_os="linux"`|
|`--edition <edition>`|指定 Rust 版本，影响语法和语义|Edition（版本/版次，全称）|`--edition 2021`, `--edition 2018`|
|`--crate-type <type>`|指定生成的 crate 类型|Crate Type（箱/模块，类型/种类，组合词）|`--crate-type lib`, `--crate-type cdylib`|
|`--emit <output>`|指定编译器输出类型|Emit（输出/发射，全称）|`--emit asm`, `--emit llvm-ir`|


---

### **2. 代码生成标志（****`-C`**** 前缀）**

**作用概览**：优化性能（速度/大小）、调试信息（排查）和目标架构（适配）。

**关键点**：`-C` 表示 "Codegen"（代码生成），用于性能和调试优化。

|标志|作用|缩写来源（中英翻译）|常用选项|
|-|-|-|-|
|`-C opt-level=<level>`|设置优化级别，控制性能和二进制大小|Codegen（代码生成）, Optimization Level（优化/最佳化，级别/层次）|`-C opt-level=3`, `-C opt-level=s`|
|`-C debug-info=<level>`|控制调试信息生成级别|Codegen（代码生成）, Debug Info（调试/纠错，信息/资料）|`-C debug-info=2`, `-C debug-info=0`|
|`-C target-cpu=<cpu>`|指定目标 CPU 架构，优化指令集|Codegen（代码生成）, Target CPU（目标/对象，中央处理器）|`-C target-cpu=native`, `-C target-cpu=x86-64`|
|`-C codegen-units=<n>`|设置并行代码生成单元数，影响编译速度|Codegen（代码生成）, Codegen Units（代码生成，单位/单元）|`-C codegen-units=1`, `-C codegen-units=16`|
|`-C incremental=<path>`|启用增量编译并指定缓存路径|Codegen（代码生成）, Incremental（增量/渐进）|`-C incremental=./target/incremental`|
|`-C link-arg=<arg>`|传递参数给链接器|Codegen（代码生成）, Link Argument（链接/连接，参数/论证）|`-C link-arg=-Wl,-rpath,/usr/local/lib`|
|`-C strip=<option>`|控制是否剥离调试信息或符号|Codegen（代码生成）, Strip（剥离/去除）|`-C strip=debuginfo`, `-C strip=symbols`|


---

### **3. 链接相关标志**

**作用概览**：管理库路径和外部链接，支持 FFI 和库集成。

**关键点**：适用于需要自定义链接的项目，处理外部依赖。

|标志|作用|缩写来源（中英翻译）|常用选项|
|-|-|-|-|
|`-L <path>`|指定额外的库搜索路径|Library（库/图书馆）|`-L /usr/local/lib`, `-L ./libs`|
|`-l <name>`|链接指定的库|Link（链接/连接）|`-l mylib`, `-l tcmalloc`|
|`--extern <name>=<path>`|指定外部 crate 的路径|External（外部/外面的，全称）|`--extern mylib=/path/to/libmylib.rlib`|


---

### **4. 调试和诊断标志**

**作用概览**：支持错误分析（解释）、详细输出（排查）和错误格式化（集成）。

**关键点**：适用于开发和问题排查，增强调试能力。

|标志|作用|缩写来源（中英翻译）|常用选项|
|-|-|-|-|
|`--explain <error>`|解释指定的错误代码|Explain（解释/说明，全称）|`--explain E0425`, `--explain E0308`|
|`--verbose`|启用详细输出，显示更多编译信息|Verbose（详细的/冗长的，全称）|`--verbose`|
|`--error-format=<format>`|指定错误输出格式|Error Format（错误/差错，格式/形式，组合词）|`--error-format json`, `--error-format short`|


---

### **5. 不稳定标志（****`-Z`**** 前缀）**

**作用概览**：启用实验性功能（测试）和调试（分析），仅限 nightly 版本。

**关键点**：`-Z` 表示不稳定功能，需谨慎使用，适用于实验和深入调试。

|标志|作用|缩写来源（中英翻译）|常用选项|
|-|-|-|-|
|`-Z no-index`|禁用索引生成，减少编译时间|No Index（不/没有，索引/指标，组合词）|`-Z no-index`|
|`-Z unstable-options`|启用不稳定的命令行选项|Unstable Options（不稳定的/易变的，选项/选择，组合词）|`-Z unstable-options`|
|`-Z dump-mir=<filter>`|将 MIR 输出到文件，分析中间表示|Dump MIR（转储/输出，中级中间表示，MIR = Mid-level Intermediate Representation）|`-Z dump-mir=all`, `-Z dump-mir=main`|
|`-Z sanitize=<option>`|启用 sanitizer，检测运行时错误|Sanitize（清理/消毒，全称）|`-Z sanitize=address`, `-Z sanitize=thread`|
|`-Z time-passes`|报告编译阶段耗时，分析性能|Time Passes（时间/次数，阶段/通过，组合词）|`-Z time-passes`|
|`-Z allow-features=<features>`|允许使用指定的实验性特性|Allow Features（允许/准许，特性/功能，组合词）|`-Z allow-features=try_blocks`|


---


---

## **记忆与使用技巧**

- **按模块记忆**：将标志分为通用、代码生成、链接、调试、不稳定五大类，逐类掌握。
- **缩写联想**：如 `-D`（Deny，拒绝警告）、`-C`（Codegen，代码生成）、`-Z`（不稳定，实验性）。
- **场景对应**：记住典型场景（如优化用 `-C opt-level`、调试用 `--verbose`）。
- **常用选项快速参考**：常用选项直接关联实际应用，快速定位使用场景。
