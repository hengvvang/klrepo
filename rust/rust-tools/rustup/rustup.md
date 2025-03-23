rustup 是 Rust 编程语言的官方工具链管理器，用于安装、更新和管理 Rust 的版本以及相关的工具。以下是 rustup 的全部命令及其详细使用攻略，涵盖常用功能、命令选项和实际使用场景。

---

### 1. **rustup 简介**

rustup 是 Rust 的版本管理工具，类似于 Python 的 pyenv 或 Node.js 的 nvm。它可以：

- 安装和更新 Rust 编译器（rustc）、标准库（std）、Cargo 等。
- 管理多个 Rust 版本（如 stable、beta、nightly）。
- 安装和管理交叉编译工具链。
- 管理 Rust 相关的文档和工具。

---

### 2. **安装 rustup**

在大多数系统上，可以通过以下命令安装 rustup：

```Bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

- 在 Windows 上，可以下载并运行 `rustup-init.exe`。
- 安装完成后，rustup 会自动配置环境变量（如 PATH），并安装默认的 stable 版本。

---

### 3. **rustup 常用命令全览**

以下是 rustup 的所有主要命令及其功能，按功能分类。

#### 3.1 **版本管理**

- `rustup update`

    更新 rustup 和已安装的 Rust 版本。

    示例：

```Rust
rustup update              # 更新所有已安装的工具链
rustup update stable       # 仅更新 stable 版本
rustup update nightly      # 仅更新 nightly 版本
```
- `rustup install <toolchain>`

    安装指定的 Rust 工具链。

    示例：

```Rust
rustup install stable      # 安装 stable 版本
rustup install nightly     # 安装 nightly 版本
rustup install 1.75.0      # 安装特定版本
```
- `rustup default <toolchain>`

    设置默认的 Rust 工具链。

    示例：

```Rust
rustup default stable      # 设置 stable 为默认版本
rustup default nightly     # 设置 nightly 为默认版本
```
- `rustup toolchain list`

    列出已安装的工具链。

    示例：

```Rust
rustup toolchain list
# 输出示例：
# stable-x86_64-unknown-linux-gnu (default)
# nightly-x86_64-unknown-linux-gnu
```
- `rustup toolchain uninstall <toolchain>`

    卸载指定的工具链。

    示例：

```Rust
rustup toolchain uninstall nightly
```
- `rustup show`

    显示当前默认工具链、已安装的工具链和活跃的工具链信息。

    示例：

```Rust
rustup show
# 输出示例：
# Default host: x86_64-unknown-linux-gnu
# rustc 1.75.0 (stable)
```
- `rustup override set <toolchain>`

    为当前目录设置特定的工具链，覆盖默认工具链。

    示例：

```Bash
rustup override set nightly  # 当前目录使用 nightly
```
- `rustup override unset`

    取消当前目录的工具链覆盖。

    示例：

```Rust
rustup override unset
```

---

#### 3.2 **组件管理**

- `rustup component add <component>`

    添加指定的组件（如 rustfmt、clippy、rust-analyzer 等）。

    示例：

```Rust
rustup component add rustfmt      # 添加代码格式化工具
rustup component add clippy       # 添加代码检查工具
rustup component add rust-analyzer  # 添加语言服务器
```
- `rustup component remove <component>`

    移除指定的组件。

    示例：

```Rust
rustup component remove rustfmt
```
- `rustup component list`

    列出已安装和可用的组件。

    示例：

```Markdown
rustup component list
# 输出示例：
# rustfmt (installed)
# clippy (installed)
# rust-analyzer (available)
```

---

#### 3.3 **目标平台管理（交叉编译）**

- `rustup target add <target>`

    添加指定的目标平台，用于交叉编译。

    示例：

```Bash
rustup target add wasm32-unknown-unknown  # 添加 WebAssembly 目标
rustup target add aarch64-linux-android   # 添加 Android 目标
```
- `rustup target remove <target>`

    移除指定的目标平台。

    示例：

```Rust
rustup target remove wasm32-unknown-unknown
```
- `rustup target list`

    列出已安装和可用的目标平台。

    示例：

```Rust
rustup target list
# 输出示例：
# wasm32-unknown-unknown (installed)
# aarch64-linux-android (available)
```

---

#### 3.4 **文档和帮助**

- `rustup doc`

    打开本地安装的 Rust 文档（浏览器中）。

    示例：

```Rust
rustup doc                   # 打开默认文档
rustup doc --book            # 打开 Rust 官方书籍
rustup doc --std             # 打开标准库文档
rustup doc --cargo           # 打开 Cargo 文档
```
- `rustup help`

    显示 rustup 的帮助信息。

    示例：

```Rust
rustup help
rustup help update           # 查看特定命令的帮助
```

---

#### 3.5 **rustup 自身管理**

- `rustup self update`

    更新 rustup 本身。

    示例：

```Rust
rustup self update
```
- `rustup self uninstall`

    卸载 rustup 和所有相关的 Rust 工具链。

    示例：

```Rust
rustup self uninstall
```

---

### 4. **rustup 高级用法**

#### 4.1 **工具链版本说明**

- **stable**：稳定版，适合生产环境。
- **beta**：预发布版，包含即将发布的特性。
- **nightly**：每日构建版，包含最新特性，但可能不稳定。
- **版本号**：如 `1.75.0`，指定具体的 Rust 版本。
- **工具链格式**：`<channel>-<host>`，如 `stable-x86_64-unknown-linux-gnu`。

#### 4.2 **自定义工具链路径**

可以通过 `--toolchain` 参数指定工具链，而无需设置默认工具链。

示例：

```Rust
rustc --toolchain=nightly main.rs  # 使用 nightly 编译
cargo +nightly build               # 使用 nightly 构建
```

#### 4.3 **离线使用**

- 如果没有网络，可以使用 `--no-self-update` 禁用 rustup 的自动更新。

    示例：

```Rust
rustup update --no-self-update
```
- 离线安装组件或工具链需要提前下载对应的安装包，并手动配置。

#### 4.4 **环境变量**

rustup 会自动配置以下环境变量：

- `PATH`：包含 rustc、cargo 等工具的路径。
- `RUSTUP_HOME`：rustup 的安装目录（默认 `~/.rustup`）。
- `CARGO_HOME`：Cargo 的安装目录（默认 `~/.cargo`）。

可以通过修改环境变量自定义安装路径：

```Bash
export RUSTUP_HOME=/custom/path/rustup
export CARGO_HOME=/custom/path/cargo
```

---

### 5. **常见问题与解决方案**

#### 5.1 **安装失败**

- 检查网络连接是否正常。
- 确保系统满足要求（如 Linux 需要 glibc 2.17 及以上）。
- Windows 用户可能需要安装 Microsoft Visual C++ Redistributable。

#### 5.2 **工具链切换问题**

- 如果 `rustc --version` 显示的版本与预期不符，检查：
    1. 默认工具链是否正确：`rustup default <toolchain>`。
    2. 当前目录是否有覆盖：`rustup override unset`。
    3. 环境变量是否正确：检查 `PATH`。

#### 5.3 **组件或目标缺失**

- 使用 `rustup component add` 或 `rustup target add` 安装缺失的组件或目标。
- 使用 `rustup component list` 或 `rustup target list` 检查可用选项。

#### 5.4 **更新失败**

- 检查磁盘空间是否充足。
- 使用 `rustup self update` 更新 rustup。
- 尝试手动下载工具链并安装。

---

### 6. **实际使用场景**

#### 6.1 **开发一个 WebAssembly 项目**

1. 安装 WebAssembly 目标：

```Rust
rustup target add wasm32-unknown-unknown
```
2. 使用 nightly 工具链（某些特性可能需要 nightly）：

```Rust
rustup default nightly
```
3. 编译项目：

```Bash
cargo build --target wasm32-unknown-unknown
```

#### 6.2 **使用 Clippy 检查代码**

1. 安装 Clippy：

```Rust
rustup component add clippy
```
2. 运行 Clippy：

```Rust
cargo clippy --all-targets --all-features -- -D warnings
```

#### 6.3 **为特定项目使用特定版本**

1. 在项目目录下设置工具链：

```Rust
rustup override set 1.75.0
```
2. 编译项目：

```Rust
cargo build
```

#### 6.4 **查看本地文档**

1. 打开标准库文档：

```Rust
rustup doc --std
```

---

### 7. **注意事项**

- **nightly 工具链稳定性**：nightly 版本可能包含不稳定的特性，仅用于实验性开发。
- **磁盘空间**：安装多个工具链和目标可能会占用大量空间，定期清理不需要的工具链。
- **权限问题**：在某些系统上，可能需要管理员权限来安装或更新 rustup。
- **代理设置**：如果需要代理，可以设置环境变量 `http_proxy` 和 `https_proxy`。

---

### 8. **总结**

rustup 是 Rust 开发中不可或缺的工具，提供了灵活的版本管理和工具链支持。通过掌握上述命令和用法，可以轻松管理 Rust 的开发环境，满足不同项目的需求。建议开发者定期运行 `rustup update` 以保持工具链和组件的最新状态。

如果有进一步的问题或特定场景需求，可以随时提问！
