文件作用与优先级
	•	作用：.cargo/config.toml 是 Cargo 的配置文件，用于自定义构建、运行、依赖管理等行为。它特别适合嵌入式开发，因为可以精确控制目标、工具链和运行流程。
	•	优先级（从高到低）：
	1	命令行参数（例如 cargo build --target thumbv7m-none-eabi）。
	2	项目目录下的 .cargo/config.toml。
	3	用户主目录下的 ~/.cargo/config.toml。
	4	Cargo 默认值。
	•	注意：嵌入式项目通常在项目级别配置，避免全局配置干扰其他项目。

1. `[alias]`
深入说明：
	•	定义 cargo 的命令别名，类似于 shell 中的 alias，但仅在 cargo 命令中生效。
	•	支持复杂的命令组合，包括参数和子命令。
高级配置示例：
[alias]
# 构建并烧录
flash = "run --release --target thumbv7m-none-eabi"
# 构建并调试
debug = "build --release && probe-rs debug --chip STM32F103C8"
# 检查代码并格式化
check-fmt = "check && fmt"
影响与用途：
	•	cargo flash：结合 [target.].runner，直接编译并烧录。
	•	cargo debug：构建后启动 probe-rs 的调试模式（需要手动连接 GDB）。
	•	边缘情况：别名不支持条件逻辑，若命令复杂，建议用脚本代替。
	•	嵌入式优化：可以定义与 probe-rs 集成的别名，减少手动输入。
建议：
	•	为 STM32 项目添加： [alias]
	•	flash = "run --release"
	•	reset = "run --release -- --reset"  # probe-rs 支持复位后运行
	•

2. `[build]`
深入说明：
	•	控制全局构建行为，适用于所有目标，除非被 [target.] 覆盖。
	•	与嵌入式开发密切相关，因为可以指定目标、优化选项和工具链。
所有配置项：
	•	target：默认构建目标。
	•	rustc：自定义 rustc 路径。
	•	rustc-wrapper：包装 rustc 的工具（例如 sccache）。
	•	rustflags：传递给 rustc 的标志。
	•	jobs：并行任务数。
	•	incremental：增量编译开关。
	•	dep-info-basedir：依赖信息的基础目录。
	•	build-std：强制构建标准库（实验性）。
	•	target-dir：自定义输出目录。
高级配置示例：
[build]
target = "thumbv7m-none-eabi"
rustc = "/usr/local/bin/rustc-nightly"  # 使用 nightly 版本
rustc-wrapper = "sccache"              # 使用缓存加速编译
rustflags = [
    "-C", "link-arg=-Tmemory.x",       # 自定义链接脚本
    "-C", "opt-level=s",               # 优化代码体积
    "-C", "target-cpu=cortex-m3"       # 指定 CPU
]
jobs = 2                               # 限制并行任务
incremental = false                    # 禁用增量编译
target-dir = "target-custom"           # 自定义输出目录
build-std = ["core"]                   # 强制构建 core 库
逐项深入解释与影响：
	•	target：
	◦	用法：指定默认目标，避免每次命令行输入 --target。
	◦	影响：嵌入式开发中设为 thumbv7m-none-eabi，确保所有构建针对 Cortex-M3。
	•	rustc：
	◦	用法：指定特定 rustc 版本路径。
	◦	影响：可使用 nightly 版本以启用实验性功能（如 build-std）。
	•	rustc-wrapper：
	◦	用法：指定编译器包装工具，例如 sccache（缓存编译结果）。
	◦	影响：加速重复构建，适合开发迭代。
	•	rustflags：
	◦	用法：数组形式传递参数，支持复杂配置。
	◦	高级选项：
	▪	-C link-arg=-Tmemory.x：指定链接脚本。
	▪	-C opt-level=s：优化代码体积（s 表示 size，z 表示最小化）。
	▪	-C target-cpu=cortex-m3：针对 Cortex-M3 优化指令。
	▪	-C panic=abort：Panic 时直接中止，减小程序体积。
	◦	影响：嵌入式开发中常用于优化代码大小和性能。
	•	jobs：
	◦	用法：整数，控制并行编译。
	◦	影响：设为 1 可减少内存占用，但编译变慢。
	•	incremental：
	◦	用法：布尔值。
	◦	影响：嵌入式开发中建议关闭，避免缓存导致的链接问题。
	•	target-dir：
	◦	用法：自定义输出路径。
	◦	影响：可将构建产物放在特定目录，便于管理。
	•	build-std（实验性）：
	◦	用法：需要 nightly Rust，指定要构建的标准库子集。
	◦	影响：允许自定义 core 或 alloc，适合无操作系统环境。
适用于 STM32 项目：
[build]
target = "thumbv7m-none-eabi"
rustflags = ["-C", "link-arg=-Tmemory.x", "-C", "opt-level=s"]
incremental = false

3. `[target.]`
深入说明：
	•	为特定目标（如 thumbv7m-none-eabi）提供细粒度控制，覆盖 [build] 中的设置。
	•	嵌入式开发中最常用的部分。
所有配置项：
	•	runner：运行工具。
	•	rustflags：目标特定的 rustc 标志。
	•	linker：自定义链接器。
	•	ar：自定义归档工具。
	•	archiver：归档工具（较新版本支持）。
高级配置示例：
[target.thumbv7m-none-eabi]
runner = "probe-rs run --chip STM32F103C8 --speed 4000"  # 指定探针速度
rustflags = [
    "-C", "link-arg=-Tmemory.x",
    "-C", "panic=abort",           # Panic 时中止
    "-C", "inline-threshold=5"     # 调整内联阈值
]
linker = "arm-none-eabi-gcc"       # 使用 GCC 链接器
ar = "arm-none-eabi-ar"            # 使用交叉工具链的 ar
逐项深入解释与影响：
	•	runner：
	◦	用法：字符串，指定运行命令。
	◦	高级选项：
	▪	--speed 4000：设置 probe-rs 的 SWD 频率（单位 kHz）。
	▪	--reset：烧录后复位芯片。
	◦	影响：cargo run 会调用此命令，适合与 probe-rs 集成。
	•	rustflags：
	◦	用法：目标特定的标志。
	◦	高级选项：
	▪	-C inline-threshold=5：降低内联阈值，减小代码体积。
	▪	-C lto：启用链接时优化。
	◦	影响：仅对 thumbv7m-none-eabi 生效，适合嵌入式优化。
	•	linker：
	◦	用法：指定链接器路径。
	◦	影响：默认使用 rustc 内置链接器，但嵌入式开发中常使用 arm-none-eabi-gcc 以支持特定选项。
	•	ar：
	◦	用法：指定归档工具。
	◦	影响：用于静态库归档，嵌入式中较少使用。
适用于 STM32 项目：
[target.thumbv7m-none-eabi]
runner = "probe-rs run --chip STM32F103C8 --speed 2000"
rustflags = ["-C", "link-arg=-Tmemory.x", "-C", "panic=abort"]
linker = "arm-none-eabi-gcc"

4. `[env]`
深入说明：
	•	设置环境变量，影响构建工具或运行时行为。
	•	支持动态值和条件配置。
高级配置示例：
[env]
PROBE_RUN_PROBE = "0483:374b"          # ST-Link VID:PID
PROBE_RUN_SPEED = "2000"               # SWD 频率 (kHz)
RUSTFLAGS = "-C link-arg=-Tmemory.x"   # 覆盖 rustflags
逐项深入解释与影响：
	•	PROBE_RUN_PROBE：
	◦	用法：指定调试器设备。
	◦	影响：确保 probe-rs 使用正确的 ST-Link。
	•	PROBE_RUN_SPEED：
	◦	用法：设置探针通信速度。
	◦	影响：调整烧录和调试速度，过高可能导致连接失败。
	•	RUSTFLAGS：
	◦	用法：环境变量形式传递标志。
	◦	影响：优先级低于 [build] 和 [target.] 的 rustflags。
适用于 STM32 项目：
[env]
PROBE_RUN_PROBE = "0483:374b"
PROBE_RUN_SPEED = "2000"

5. `[http]` 和 `[net]`
深入说明：
	•	控制网络行为，主要用于依赖下载。
	•	嵌入式开发中影响较小，但若使用私有仓库或代理，可能需要配置。
高级配置示例：
[http]
timeout = 60
proxy = "http://proxy.example.com:8080"
cainfo = "/path/to/ca.pem"  # 自定义 CA 证书

[net]
git-fetch-with-cli = true
retry = 5
影响：
	•	cainfo：解决 HTTPS 证书问题。
	•	git-fetch-with-cli：使用系统 Git，提高稳定性。

6. `[patch]` 和 `[registries]`
深入说明：
	•	[patch] 用于临时替换依赖。
	•	[registries] 定义私有注册表。
高级配置示例：
[patch.crates-io]
stm32f1xx-hal = { path = "../stm32f1xx-hal" }  # 使用本地版本

[registries.my-registry]
index = "sparse+https://my-registry.com/index/"
token = "my-token"
影响：
	•	嵌入式开发中，[patch] 可用于测试未发布的功能。

7. `[rustdoc]` 和 `[term]`
深入说明：
	•	[rustdoc] 定制文档生成。
	•	[term] 控制终端输出。
高级配置示例：
[rustdoc]
html-in-header = ["custom.html"]

[term]
quiet = true
verbose = false
影响：
	•	[term] 在 CI/CD 中减少输出噪音。

适用于 STM32F103C8T6 的完整高级配置
[alias]
flash = "run --release"
debug = "build --release && probe-rs debug --chip STM32F103C8"

[build]
target = "thumbv7m-none-eabi"
rustflags = ["-C", "link-arg=-Tmemory.x", "-C", "opt-level=s"]
incremental = false
jobs = 2

[target.thumbv7m-none-eabi]
runner = "probe-rs run --chip STM32F103C8 --speed 2000 --reset"
rustflags = ["-C", "panic=abort", "-C", "inline-threshold=5"]
linker = "arm-none-eabi-gcc"

[env]
PROBE_RUN_PROBE = "0483:374b"
PROBE_RUN_SPEED = "2000"
效果：
	•	优化代码体积和性能。
	•	集成 probe-rs 的烧录和调试。
	•	提供便捷的别名。
