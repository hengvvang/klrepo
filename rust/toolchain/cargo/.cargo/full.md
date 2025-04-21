`.cargo/config.toml` 完整配置项详解
完整树结构
```
.cargo/config.toml
├── [alias]                                      # Table - 定义 Cargo 命令别名
│   └──                              # String 或 Array of Strings
│       ├── 用途: 为 Cargo 命令定义快捷别名
│       ├── 默认值: 无
│       ├── 示例: "b" = "build" 或 "t" = ["test", "--release"]
│       ├── 适用场景: 简化常用命令
│       └── 备注: 字符串表示单命令，数组支持带参数
├── [build]                                      # Table - 配置构建行为
│   ├── jobs                                     # Integer
│   │   ├── 用途: 指定并行编译作业数
│   │   ├── 默认值: CPU 核心数
│   │   ├── 示例: 8
│   │   ├── 适用场景: 平衡构建速度和资源使用
│   │   └── 备注: 可被 --jobs 或 CARGO_BUILD_JOBS 覆盖
│   ├── rustc                                    # String
│   │   ├── 用途: 指定 rustc 编译器路径
│   │   ├── 默认值: "rustc"
│   │   ├── 示例: "/usr/local/bin/rustc-nightly"
│   │   ├── 适用场景: 使用特定版本编译器
│   │   └── 备注: 可被 RUSTC 覆盖
│   ├── rustc-wrapper                            # String
│   │   ├── 用途: 指定 rustc 包装器（如 sccache）
│   │   ├── 默认值: 无
│   │   ├── 示例: "/usr/bin/sccache"
│   │   ├── 适用场景: 加速重复构建
│   │   └── 备注: 可被 RUSTC_WRAPPER 覆盖
│   ├── rustc-workspace-wrapper                  # String
│   │   ├── 用途: 指定工作区 rustc 包装器
│   │   ├── 默认值: 无
│   │   ├── 示例: "/usr/bin/sccache"
│   │   ├── 适用场景: 优化工作区构建
│   │   └── 备注: 不影响非工作区 crate
│   ├── rustflags                                # Array of Strings
│   │   ├── 用途: 全局 rustc 编译标志
│   │   ├── 默认值: 无
│   │   ├── 示例: ["-C", "opt-level=2"]
│   │   ├── 适用场景: 设置全局优化或警告
│   │   └── 备注: 可被 RUSTFLAGS 或 [target] 覆盖
│   ├── rustdoc                                  # String
│   │   ├── 用途: 指定 rustdoc 路径
│   │   ├── 默认值: "rustdoc"
│   │   ├── 示例: "/usr/local/bin/rustdoc-nightly"
│   │   ├── 适用场景: 使用特定版本生成文档
│   │   └── 备注: 可被 RUSTDOC 覆盖
│   ├── rustdocflags                             # Array of Strings
│   │   ├── 用途: rustdoc 标志
│   │   ├── 默认值: 无
│   │   ├── 示例: ["--cfg", "docsrs"]
│   │   ├── 适用场景: 自定义文档生成
│   │   └── 备注: 可被 RUSTDOCFLAGS 覆盖
│   ├── target                                   # String
│   │   ├── 用途: 默认构建目标
│   │   ├── 默认值: 当前主机平台
│   │   ├── 示例: "aarch64-unknown-linux-gnu"
│   │   ├── 适用场景: 默认交叉编译
│   │   └── 备注: 可被 --target 覆盖
│   ├── target-dir                               # String
│   │   ├── 用途: 指定构建输出目录
│   │   ├── 默认值: "target"
│   │   ├── 示例: "/tmp/cargo-target"
│   │   ├── 适用场景: 重定向输出
│   │   └── 备注: 可被 CARGO_TARGET_DIR 覆盖
│   ├── incremental                              # Boolean
│   │   ├── 用途: 是否启用增量编译
│   │   ├── 默认值: true (dev), false (release)
│   │   ├── 示例: false
│   │   ├── 适用场景: 调整内存与速度
│   │   └── 备注: 可被 CARGO_INCREMENTAL 覆盖
│   ├── dep-info-basedir                         # String
│   │   ├── 用途: 依赖信息基准目录
│   │   ├── 默认值: 无（相对 target-dir）
│   │   ├── 示例: "/src"
│   │   ├── 适用场景: 复杂项目结构
│   │   └── 备注: 很少使用
│   ├── future-incompat-report                   # Boolean
│   │   ├── 用途: 生成未来不兼容性报告
│   │   ├── 默认值: false
│   │   ├── 示例: true
│   │   ├── 适用场景: 检查升级影响
│   │   └── 备注: Rust 1.55+
│   └── build-std                                # Array of Strings
│       ├── 用途: 构建标准库 crate
│       ├── 默认值: 无（使用预编译）
│       ├── 示例: ["core", "alloc"]
│       ├── 适用场景: 嵌入式开发
│       └── 备注: 需 -Z build-std
├── [cargo-new]                                  # Table - 配置 cargo new 行为
│   ├── name                                     # String
│   │   ├── 用途: 默认作者名
│   │   ├── 默认值: git config user.name
│   │   ├── 示例: "Alice"
│   │   ├── 适用场景: 初始化项目
│   │   └── 备注: 可被命令行覆盖
│   ├── email                                    # String
│   │   ├── 用途: 默认邮箱
│   │   ├── 默认值: git config user.email
│   │   ├── 示例: "alice@example.com"
│   │   ├── 适用场景: 初始化项目
│   │   └── 备注: 可被命令行覆盖
│   ├── vcs                                      # String
│   │   ├── 用途: 默认版本控制系统
│   │   ├── 默认值: "git"
│   │   ├── 示例: "none"
│   │   ├── 可选值: "git", "hg", "pijul", "fossil", "none"
│   │   └── 适用场景: 初始化项目
│   └── edition                                  # String
│       ├── 用途: 默认 Rust 版本
│       ├── 默认值: 当前稳定版（如 "2021"）
│       ├── 示例: "2018"
│       ├── 可选值: "2015", "2018", "2021"
│       └── 适用场景: 初始化项目
├── [env]                                        # Table - 定义环境变量
│   └──                            # Table - 动态命名的环境变量
│       ├── value                                # String
│       │   ├── 用途: 环境变量值
│       │   ├── 默认值: 无
│       │   ├── 示例: "debug"
│       │   └── 备注: 必须设置
│       ├── force                                # Boolean
│       │   ├── 用途: 是否强制覆盖已有变量
│       │   ├── 默认值: false
│       │   ├── 示例: true
│       │   └── 备注: false 时仅未定义时生效
│       └── relative                             # Boolean
│           ├── 用途: 值是否相对 config.toml 路径
│           ├── 默认值: false
│           ├── 示例: true
│           └── 备注: 用于路径变量
├── [http]                                       # Table - 配置 HTTP 请求
│   ├── proxy                                    # String
│   │   ├── 用途: HTTP 代理地址
│   │   ├── 默认值: 无
│   │   ├── 示例: "http://proxy.example.com:8080"
│   │   ├── 适用场景: 通过代理下载依赖
│   │   └── 备注: 支持 socks5://
│   ├── timeout                                  # Integer
│   │   ├── 用途: 请求超时（秒）
│   │   ├── 默认值: 30
│   │   ├── 示例: 60
│   │   ├── 适用场景: 调整网络延迟
│   │   └── 备注: 0 表示无超时
│   ├── cainfo                                   # String
│   │   ├── 用途: CA 证书文件路径
│   │   ├── 默认值: 系统默认
│   │   ├── 示例: "/etc/ssl/certs/ca-certificates.crt"
│   │   ├── 适用场景: 自定义 HTTPS 验证
│   │   └── 备注: 用于私有注册表
│   ├── check-revoke                             # Boolean
│   │   ├── 用途: 检查证书吊销
│   │   ├── 默认值: true
│   │   ├── 示例: false
│   │   ├── 适用场景: 加速连接
│   │   └── 备注: 关闭降低安全性
│   ├── multiplexing                             # Boolean
│   │   ├── 用途: 启用 HTTP/2 多路复用
│   │   ├── 默认值: true
│   │   ├── 示例: false
│   │   ├── 适用场景: 解决兼容性问题
│   │   └── 备注: Rust 1.52+
│   ├── debug                                    # Boolean
│   │   ├── 用途: 启用 HTTP 调试日志
│   │   ├── 默认值: false
│   │   ├── 示例: true
│   │   ├── 适用场景: 排查网络问题
│   │   └── 备注: 输出到 stderr
│   └── user-agent                               # String
│       ├── 用途: 自定义 HTTP User-Agent
│       ├── 默认值: "cargo/"
│       ├── 示例: "MyCargo/1.0"
│       ├── 适用场景: 调试或合规性
│       └── 备注: 很少使用
├── [net]                                        # Table - 配置网络行为
│   ├── retry                                    # Integer
│   │   ├── 用途: 网络请求重试次数
│   │   ├── 默认值: 3
│   │   ├── 示例: 5
│   │   ├── 适用场景: 提高网络稳定性
│   │   └── 备注: 适用于 git 和 HTTP
│   ├── git-fetch-with-cli                       # Boolean
│   │   ├── 用途: 使用命令行 git 获取依赖
│   │   ├── 默认值: false
│   │   ├── 示例: true
│   │   ├── 适用场景: 解决内置 git 问题
│   │   └── 备注: 需要系统 git
│   └── offline                                  # Boolean
│       ├── 用途: 强制离线模式
│       ├── 默认值: false
│       ├── 示例: true
│       ├── 适用场景: 无网络环境
│       └── 备注: 仅使用本地缓存
├── [patch]                                      # Table - 配置依赖补丁
│   └──                           # Table - 如 crates-io
│       └──                          # Table - 补丁目标 crate
│           ├── git                              # String
│           │   ├── 用途: 补丁 Git 仓库地址
│           │   ├── 默认值: 无
│           │   ├── 示例: "https://github.com/serde-rs/serde"
│           │   └── 备注: 与 rev/tag/branch 搭配
│           ├── rev                              # String
│           │   ├── 用途: Git 修订版本
│           │   ├── 默认值: 无
│           │   ├── 示例: "abc123"
│           │   └── 备注: 指定具体提交
│           ├── tag                              # String
│           │   ├── 用途: Git 标签
│           │   ├── 默认值: 无
│           │   ├── 示例: "v1.0.0"
│           │   └── 备注: 指定发布版本
│           ├── branch                           # String
│           │   ├── 用途: Git 分支
│           │   ├── 默认值: 无
│           │   ├── 示例: "main"
│           │   └── 备注: 指定开发分支
│           └── path                             # String
│               ├── 用途: 本地补丁路径
│               ├── 默认值: 无
│               ├── 示例: "./local/crate"
│               └── 备注: 优先于 git
├── [profile]                                    # Table - 配置构建模式
│   └──                            # Table - 如 dev, release
│       ├── opt-level                            # Integer 或 String
│       │   ├── 用途: 优化级别
│       │   ├── 默认值: 0 (dev), 3 (release)
│       │   ├── 示例: "s"
│       │   ├── 可选值: 0, 1, 2, 3, "s", "z"
│       │   └── 备注: "s" 优化大小，"z" 最小化
│       ├── debug                                # Boolean 或 Integer
│       │   ├── 用途: 调试信息级别
│       │   ├── 默认值: true (dev), 0 (release)
│       │   ├── 示例: 2
│       │   ├── 可选值: true, false, 0, 1, 2
│       │   └── 备注: 2 为完整调试信息
│       ├── codegen-units                       # Integer
│       │   ├── 用途: 代码生成单元数
│       │   ├── 默认值: 256
│       │   ├── 示例: 1
│       │   ├── 适用场景: 优化性能
│       │   └── 备注: 1 表示最大优化
│       ├── lto                                  # Boolean 或 String
│       │   ├── 用途: 链接时优化
│       │   ├── 默认值: false
│       │   ├── 示例: "thin"
│       │   ├── 可选值: true, false, "thin", "fat"
│       │   └── 备注: "thin" 更快
│       ├── panic                                # String
│       │   ├── 用途: panic 行为
│       │   ├── 默认值: "unwind"
│       │   ├── 示例: "abort"
│       │   ├── 可选值: "unwind", "abort"
│       │   └── 备注: "abort" 更小二进制
│       └── incremental                          # Boolean
│           ├── 用途: 是否增量编译
│           ├── 默认值: true (dev), false (release)
│           ├── 示例: false
│           └── 备注: 影响首次编译时间
├── [registries]                                 # Table - 自定义注册表
│   └──                           # Table - 自定义名称
│       ├── index                                # String
│       │   ├── 用途: 注册表索引 URL
│       │   ├── 默认值: 无
│       │   ├── 示例: "https://my-registry.com/index"
│       │   └── 备注: 必须设置
│       ├── token                                # String
│       │   ├── 用途: 访问令牌
│       │   ├── 默认值: 无
│       │   ├── 示例: "xyz123"
│       │   └── 备注: 用于私有注册表
│       └── protocol                             # String
│           ├── 用途: 访问协议
│           ├── 默认值: "git"
│           ├── 示例: "sparse"
│           ├── 可选值: "git", "sparse"
│           └── 备注: "sparse" 更快
├── [source]                                     # Table - 配置依赖源
│   ├──                             # Table - 自定义源名称
│   │   ├── replace-with                         # String
│   │   │   ├── 用途: 替换为另一源
│   │   │   ├── 默认值: 无
│   │   │   ├── 示例: "my-mirror"
│   │   │   └── 备注: 用于镜像
│   │   ├── directory                            # String
│   │   │   ├── 用途: 本地目录路径
│   │   │   ├── 默认值: 无
│   │   │   ├── 示例: "/path/to/source"
│   │   │   └── 备注: 用于本地开发
│   │   ├── git                                  # String
│   │   │   ├── 用途: Git 仓库地址
│   │   │   ├── 默认值: 无
│   │   │   ├── 示例: "https://github.com/rust-lang/crates.io-index"
│   │   │   └── 备注: 与 branch/tag/rev 搭配
│   │   ├── branch                               # String
│   │   │   ├── 用途: Git 分支
│   │   │   ├── 默认值: 无
│   │   │   ├── 示例: "main"
│   │   │   └── 备注: 指定分支
│   │   ├── tag                                  # String
│   │   │   ├── 用途: Git 标签
│   │   │   ├── 默认值: 无
│   │   │   ├── 示例: "v1.0.0"
│   │   │   └── 备注: 指定版本
│   │   └── rev                                  # String
│   │       ├── 用途: Git 修订版本
│   │       ├── 默认值: 无
│   │       ├── 示例: "abc123"
│   │       └── 备注: 指定提交
│   └── crates-io                                # Table - 官方 crates.io
│       ├── replace-with                         # String
│       │   ├── 用途: 替换 crates.io 源
│       │   ├── 默认值: 无
│       │   ├── 示例: "my-mirror"
│       │   └── 备注: 加速下载
│       └── protocol                             # String
│           ├── 用途: 下载协议
│           ├── 默认值: "sparse" (Rust 1.70+)
│           ├── 示例: "git"
│           ├── 可选值: "git", "sparse"
│           └── 备注: "sparse" 更高效
├── [target]                                     # Table - 配置目标平台
│   └──                           # Table - 如 x86_64-unknown-linux-gnu
│       ├── linker                               # String
│       │   ├── 用途: 指定链接器
│       │   ├── 默认值: 系统默认
│       │   ├── 示例: "aarch64-linux-gnu-gcc"
│       │   ├── 适用场景: 交叉编译
│       │   └── 备注: 可被 RUSTC_LINKER 覆盖
│       ├── runner                               # String 或 Array of Strings
│       │   ├── 用途: 指定运行器
│       │   ├── 默认值: 无
│       │   ├── 示例: "qemu-aarch64" 或 ["qemu-aarch64", "-cpu", "cortex-a53"]
│       │   ├── 适用场景: 测试交叉编译结果
│       │   └── 备注: 数组支持参数
│       ├── rustflags                            # Array of Strings
│       │   ├── 用途: 目标特定 rustc 标志
│       │   ├── 默认值: 无
│       │   ├── 示例: ["-C", "target-cpu=native"]
│       │   ├── 适用场景: 优化特定平台
│       │   └── 备注: 优先于 [build].rustflags
│       ├── ar                                   # String
│       │   ├── 用途: 指定归档工具
│       │   ├── 默认值: 系统默认
│       │   ├── 示例: "/usr/local/bin/aarch64-ar"
│       │   ├── 适用场景: 交叉编译静态库
│       │   └── 备注: 很少单独设置
│       ├── rustdocflags                         # Array of Strings
│       │   ├── 用途: 目标特定 rustdoc 标志
│       │   ├── 默认值: 无
│       │   ├── 示例: ["--cfg", "docsrs"]
│       │   ├── 适用场景: 目标特定文档
│       │   └── 备注: 可被 RUSTDOCFLAGS 覆盖
│       └── dependencies                         # Table - 特定依赖配置
│           └──                        # Table - 依赖名称
│               ├── rustflags                    # Array of Strings
│               │   ├── 用途: 依赖特定 rustc 标志
│               │   ├── 默认值: 无
│               │   ├── 示例: ["-C", "opt-level=3"]
│               │   └── 备注: 仅影响该依赖
│               └── linker                       # String
│                   ├── 用途: 依赖特定链接器
│                   ├── 默认值: 无（继承上级）
│                   ├── 示例: "ld.gold"
│                   └── 备注: 优先于上级 linker
├── [term]                                       # Table - 配置终端输出
│   ├── quiet                                    # Boolean
│   │   ├── 用途: 禁用非错误输出
│   │   ├── 默认值: false
│   │   ├── 示例: true
│   │   ├── 适用场景: 简化输出
│   │   └── 备注: 等效于 --quiet
│   ├── verbose                                  # Boolean
│   │   ├── 用途: 启用详细输出
│   │   ├── 默认值: false
│   │   ├── 示例: true
│   │   ├── 适用场景: 调试构建
│   │   └── 备注: 等效于 --verbose
│   └── color                                    # String
│       ├── 用途: 终端颜色设置
│       ├── 默认值: "auto"
│       ├── 示例: "always"
│       ├── 可选值: "auto", "always", "never"
│       └── 备注: 等效于 --color
```
详细说明
1. `[alias]`
	•	用途：为 Cargo 命令定义快捷别名。
	•	示例： [alias]
	•	b = "build"
	•	t = ["test", "--release"]
	•
	•	备注：支持单命令（字符串）或带参数的命令（数组）。
2. `[build]`
	•	用途：控制全局构建行为。
	•	示例： [build]
	•	jobs = 8
	•	rustc-wrapper = "/usr/bin/sccache"
	•	target = "aarch64-unknown-linux-gnu"
	•	rustflags = ["-C", "opt-level=2"]
	•	build-std = ["core"]
	•
3. `[cargo-new]`
	•	用途：配置 cargo new 的默认值。
	•	示例： [cargo-new]
	•	name = "Alice"
	•	vcs = "none"
	•
4. `[env]`
	•	用途：定义构建时的环境变量。
	•	示例： [env]
	•	RUST_LOG = { value = "debug", force = true }
	•
5. `[http]`
	•	用途：配置 HTTP 请求行为。
	•	示例： [http]
	•	proxy = "http://proxy.example.com:8080"
	•	debug = true
	•
6. `[net]`
	•	用途：控制网络相关行为。
	•	示例： [net]
	•	retry = 5
	•	offline = true
	•
7. `[patch]`
	•	用途：为依赖指定补丁源。
	•	示例： [patch.crates-io]
	•	serde = { git = "https://github.com/serde-rs/serde", branch = "main" }
	•
8. `[profile]`
	•	用途：自定义构建模式。
	•	示例： [profile.release]
	•	opt-level = 3
	•	lto = "thin"
	•
9. `[registries]`
	•	用途：定义自定义依赖注册表。
	•	示例： [registries.my-registry]
	•	index = "https://my-registry.com/index"
	•	token = "xyz123"
	•
10. `[source]`
	•	用途：自定义或替换依赖源。
	•	示例： [source.my-mirror]
	•	replace-with = "crates-io"
	•	directory = "/path/to/mirror"
	•
11. `[target]`
	•	用途：为特定目标平台设置构建选项。
	•	示例： [target.aarch64-unknown-linux-gnu]
	•	linker = "aarch64-linux-gnu-gcc"
	•	rustflags = ["-C", "target-cpu=cortex-a53"]
	•
12. `[term]`
	•	用途：控制终端输出。
	•	示例： [term]
	•	verbose = true
	•	color = "always"
	•

综合示例
以下是一个完整的 .cargo/config.toml 示例，涵盖多种配置场景：
```
[alias]
b = "build"
t = ["test", "--release"]

[build]
jobs = 8
rustc = "/usr/local/bin/rustc-nightly"
rustc-wrapper = "/usr/bin/sccache"
rustflags = ["-C", "opt-level=2"]
target = "aarch64-unknown-linux-gnu"
target-dir = "/tmp/cargo-target"
incremental = false
build-std = ["core", "alloc"]

[cargo-new]
name = "Alice"
vcs = "none"

[env]
RUST_LOG = { value = "debug", force = true }

[http]
proxy = "http://proxy.example.com:8080"
timeout = 60
debug = true

[net]
retry = 5
offline = false

[patch.crates-io]
serde = { git = "https://github.com/serde-rs/serde", branch = "main" }

[profile.release]
opt-level = 3
lto = "thin"
panic = "abort"

[registries.my-registry]
index = "https://my-registry.com/index"
token = "xyz123"

[source.my-mirror]
replace-with = "crates-io"
directory = "/path/to/mirror"

[source.crates-io]
protocol = "sparse"

[target.aarch64-unknown-linux-gnu]
linker = "aarch64-linux-gnu-gcc"
runner = ["qemu-aarch64", "-cpu", "cortex-a53"]
rustflags = ["-C", "target-cpu=cortex-a53"]

[term]
verbose = true
color = "always"
```
