# Cargo commands
Cargo 是 Rust 的官方构建工具和包管理器，负责项目创建、依赖管理、代码编译、测试运行和包发布。它于 Rust 1.0（2015年）发布，与 Rust 生态深度集成。命令格式为：
```
cargo <command> [options] [arguments]
```
- `<command>`：操作，如 `build`。
- `[options]`：参数，以 `--` 开头。
- `[arguments]`：附加输入，如路径。

Cargo 支持单 crate 项目、多 crate package 和 workspace，适用于从简单脚本到复杂系统。

---

### 2.1 项目创建与初始化

#### `cargo new`
**用途**：创建新 Rust 项目。
**背景**：生成标准项目结构，是开发的起点。
**参数**：
- `--bin`：二进制项目（默认）。
- `--lib`：库项目。
- `--name <name>`：项目名称。
- `--edition <year>`：Rust 版本（`2015`、`2018`、`2021`，默认最新）。
- `--vcs <vcs>`：版本控制（`git` 默认、`hg`、`pijul`、`fossil`、`none`）。
- `--color <when>`：颜色（`auto`、`always`、`never`）。
- `-v, --verbose`、 `-q, --quiet`、 `-Z <flag>`。

**说明**：创建 `Cargo.toml` 和 `src/`，支持版本控制初始化。
**使用场景**：启动新项目，如工具或库。
**Workspace 行为**：生成独立项目，可加入 workspace。
**注意事项**：路径冲突会报错。
**示例**：
- 创建带 Git 的库项目：
  ```
  cargo new my_lib --lib --edition 2021 --vcs git --verbose
  ```
  - 输出：`my_lib/` 包含 `src/lib.rs`，初始化 Git，显示详细日志。

#### `cargo init`
**用途**：在当前目录初始化项目。
**背景**：适合已有目录，补充 Rust 项目结构。
**参数**：同 `cargo new`。
**说明**：不会覆盖已有文件。
**使用场景**：将现有代码转为 Rust 项目。
**Workspace 行为**：可初始化 workspace 成员。
**注意事项**：已有 `Cargo.toml` 会失败。
**示例**：
- 初始化二进制项目：
  ```
  mkdir my_dir && cd my_dir
  cargo init --bin --vcs none --quiet
  ```
  - 输出：生成 `src/main.rs`，无版本控制，静默执行。

### 2.2 构建与运行

#### `cargo build`
**用途**：编译项目及其依赖。
**背景**：生成可执行文件或库，支持 debug/release 模式。
**参数**：
- `--release`：优化构建。
- `--target <triple>`：交叉编译。
- `--target-dir <path>`。
- `--out-dir <path>`。
- `-j, --jobs <n>`。
- `--features <features>`。
- `--all-features`、 `--no-default-features`。
- `--profile <name>`。
- `--manifest-path <path>`。
- `--frozen`、 `--locked`、 `--offline`。
- `--config <key=value>`、 `--timings`。
- `-v, --verbose`、 `-q, --quiet`、 `--color <when>`、 `--message-format <fmt>`、 `--build-plan`、 `-Z <flag>`。

**说明**：默认输出到 `target/`。
**使用场景**：开发调试或准备部署。
**Workspace 行为**：`--workspace` 构建所有包，`-p` 指定包。
**注意事项**：`--jobs` 过多可能耗尽资源。
**示例**：
- 构建 release 版本：
  ```
  cargo build --release --features "logging" --jobs 4
  ```
  - 输出：优化二进制，启用 logging 功能。
- Workspace 示例：
  ```
  cargo build --workspace --release --target-dir ./build
  ```
  - 构建所有包，输出到 `build/`。

#### `cargo run`
**用途**：编译并运行二进制。
**背景**：快速测试代码，自动调用 `cargo build`。
**参数**：继承 `cargo build`，新增：
- `--bin <name>`。
- `--example <name>`。
- `--`。

**说明**：适合迭代开发。
**使用场景**：运行主程序或示例。
**Workspace 行为**：需用 `-p` 指定包。
**注意事项**：多二进制需明确 `--bin`。
**示例**：
- 运行带参数的程序：
  ```
  cargo run --release --bin server -- --port 8080
  ```
  - 输出：运行 `server`，监听 8080 端口。
- Workspace 示例：
  ```
  cargo run -p my_app --bin cli --release
  ```
  - 运行 `my_app` 的 `cli` 二进制。

#### `cargo check`
**用途**：检查代码可编译性。
**背景**：比 `cargo build` 快，不生成文件。
**参数**：同 `cargo build`。
**说明**：仅验证语法和类型。
**使用场景**：开发中快速检查。
**Workspace 行为**：支持 `--workspace` 和 `-p`。
**注意事项**：不保证运行时行为。
**示例**：
- 检查代码：
  ```
  cargo check --features "test" --verbose
  ```
  - 输出：检查启用 test 功能的代码。
- Workspace 示例：
  ```
  cargo check --workspace --target x86_64-unknown-linux-gnu
  ```

### 2.3 测试与基准

#### `cargo test`
**用途**：运行测试。
**背景**：支持单元、集成和文档测试。
**参数**：继承 `cargo build`，新增：
- `--test <name>`。
- `--bench <name>`。
- `--doc`。
- `--no-run`。
- `--nocapture`。
- `--ignored`。
- `--test-threads <n>`。
- `--`。

**说明**：集成 Rust 测试框架。
**使用场景**：验证功能。
**Workspace 行为**：`--workspace` 测试所有包。
**注意事项**：`--nocapture` 便于调试。
**示例**：
- 运行测试并显示输出：
  ```
  cargo test --test integration --nocapture --verbose
  ```
  - 输出：运行 `tests/integration.rs`，显示实时日志。
- Workspace 示例：
  ```
  cargo test --workspace --features "test-utils"
  ```

#### `cargo bench`
**用途**：运行基准测试。
**背景**：需 `#[bench]` 注解，分析性能。
**参数**：同 `cargo test`。
**说明**：输出性能数据。
**使用场景**：优化代码。
**Workspace 行为**：同 `cargo test`。
**注意事项**：需启用 `test` 配置。
**示例**：
- 运行基准：
  ```
  cargo bench --bench perf --jobs 2
  ```
  - 输出：运行 `benches/perf.rs`。
- Workspace 示例：
  ```
  cargo bench -p perf_crate --verbose
  ```

### 2.4 文档与发布

#### `cargo doc`
**用途**：生成 HTML 文档。
**背景**：基于 Rustdoc，生成 API 文档。
**参数**：继承 `cargo build`，新增：
- `--open`。
- `--no-deps`。
- `--document-private-items`。

**说明**：输出到 `target/doc`。
**使用场景**：为库生成文档。
**Workspace 行为**：`--workspace` 生成所有包文档。
**注意事项**：文档质量依赖注释。
**示例**：
- 生成并打开文档：
  ```
  cargo doc --open --features "docs" --no-deps
  ```
  - 输出：生成文档，启用 docs 功能。
- Workspace 示例：
  ```
  cargo doc --workspace --open
  ```

#### `cargo publish`
**用途**：发布 crate 到 crates.io。
**背景**：需账户和令牌，分享库。
**参数**：
- `--dry-run`。
- `--token <token>`。
- `--no-verify`。
- `--allow-dirty`。
- `--index <url>`。
- 继承 `cargo build`。

**说明**：上传 crate 及其依赖。
**使用场景**：发布新版本。
**Workspace 行为**：需 `--manifest-path` 指定包。
**注意事项**：检查版本号。
**示例**：
- 模拟发布：
  ```
  cargo publish --dry-run --features "extra" --verbose
  ```
  - 输出：模拟发布，启用 extra 功能。
- Workspace 示例：
  ```
  cargo publish --manifest-path ./lib/Cargo.toml --dry-run
  ```

### 2.5 依赖管理与工具

#### `cargo update`
**用途**：更新依赖版本。
**背景**：根据 `Cargo.toml` 更新 `Cargo.lock`。
**参数**：
- `--aggressive`。
- `--precise <version>`。
- `--package <name>`。
- `--dry-run`。
- 继承 `cargo build`。

**说明**：保持依赖最新。
**使用场景**：获取修复或新功能。
**Workspace 行为**：`--workspace` 更新所有包。
**注意事项**：检查兼容性。
**示例**：
- 更新特定依赖：
  ```
  cargo update --package serde --precise 1.0.150 --dry-run
  ```
  - 输出：模拟更新 `serde`。
- Workspace 示例：
  ```
  cargo update --workspace --verbose
  ```

#### `cargo install`
**用途**：安装二进制。
**背景**：安装到 `~/.cargo/bin`。
**参数**：
- `--version <version>`。
- `--git <url>`。
- `--branch <branch>`、 `--tag <tag>`、 `--rev <sha>`。
- `--path <path>`。
- `--root <path>`。
- `--bin <name>`。
- `--force`。
- `--no-track`。
- 继承 `cargo build`。

**说明**：安装工具或本地二进制。
**使用场景**：安装实用工具。
**Workspace 行为**：需 `--path` 指定包。
**注意事项**：检查版本。
**示例**：
- 安装特定版本：
  ```
  cargo install ripgrep --version 13.0.0 --force
  ```
  - 输出：强制安装 `ripgrep`。
- Workspace 示例：
  ```
  cargo install --path ./tools/my_tool --bin cli
  ```

#### `cargo uninstall`
**用途**：卸载二进制。
**背景**：移除已安装工具。
**参数**：
- `--root <path>`。
- `-v, --verbose`。
- `-q, --quiet`。

**说明**：清理工具。
**使用场景**：移除不需要的工具。
**Workspace 行为**：不直接相关。
**注意事项**：需正确名称。
**示例**：
- 卸载工具：
  ```
  cargo uninstall ripgrep --verbose
  ```

#### `cargo clean`
**用途**：清理构建产物。
**背景**：删除 `target/` 内容。
**参数**：
- `--release`。
- `--doc`。
- `--target <triple>`。
- `--manifest-path <path>`。
- 继承 `cargo build`。

**说明**：释放空间。
**使用场景**：重置构建状态。
**Workspace 行为**：`--workspace` 清理所有包。
**注意事项**：不可恢复。
**示例**：
- 清理 release：
  ```
  cargo clean --release --doc
  ```
  - 输出：清理 release 和文档。
- Workspace 示例：
  ```
  cargo clean --workspace --verbose
  ```

### 2.6 信息与调试

#### `cargo generate-lockfile`
**用途**：生成 `Cargo.lock`。
**背景**：锁定依赖版本。
**参数**：
- `--manifest-path <path>`。
- `--offline`。
- `--frozen`。

**说明**：确保一致性。
**使用场景**：初始化锁文件。
**Workspace 行为**：`--workspace` 为所有包生成。
**注意事项**：与 `Cargo.toml` 匹配。
**示例**：
- 生成锁文件：
  ```
  cargo generate-lockfile --offline --verbose
  ```
- Workspace 示例：
  ```
  cargo generate-lockfile --workspace
  ```

#### `cargo metadata`
**用途**：输出元数据（JSON）。
**背景**：供工具解析。
**参数**：
- `--format-version <version>`。
- `--no-deps`。
- 继承 `cargo build`。

**说明**：提供项目信息。
**使用场景**：分析结构。
**Workspace 行为**：返回整个 workspace 数据。
**注意事项**：输出复杂。
**示例**：
- 获取元数据：
  ```
  cargo metadata --no-deps --verbose
  ```
- Workspace 示例：
  ```
  cargo metadata --workspace --format-version 1
  ```

#### `cargo pkgid`
**用途**：显示包 ID。
**背景**：用于调试。
**参数**：
- `--manifest-path <path>`。
- `<spec>`。

**说明**：唯一标识包。
**使用场景**：确认包身份。
**Workspace 行为**：需 `-p` 指定。
**注意事项**：需正确路径。
**示例**：
- 获取 ID：
  ```
  cargo pkgid --manifest-path ./Cargo.toml
  ```
- Workspace 示例：
  ```
  cargo pkgid -p my_lib --verbose
  ```

#### `cargo tree`
**用途**：显示依赖树。
**背景**：可视化依赖。
**参数**：
- `--invert`。
- `--prefix <style>`。
- `--format <fmt>`。
- 继承 `cargo build`。

**说明**：需安装 `cargo-tree`。
**使用场景**：检查依赖冲突。
**Workspace 行为**：支持 `-p`。
**注意事项**：输出可能较长。
**示例**：
- 显示依赖：
  ```
  cargo tree --prefix depth --verbose
  ```
- Workspace 示例：
  ```
  cargo tree -p my_app --invert
  ```

#### `cargo vendor`
**用途**：下载依赖到本地。
**背景**：支持离线开发。
**参数**：
- `--no-delete`。
- `--versioned-dirs`。
- 继承 `cargo build`。

**说明**：生成 `vendor/` 目录。
**使用场景**：离线环境。
**Workspace 行为**：为所有包下载。
**注意事项**：占用空间。
**示例**：
- 下载依赖：
  ```
  cargo vendor --no-delete --verbose
  ```
- Workspace 示例：
  ```
  cargo vendor --workspace
  ```

### 2.7 账户与搜索

#### `cargo login`
**用途**：登录 crates.io。
**背景**：保存认证令牌。
**参数**：
- `--registry <name>`。
- `-v, --verbose`。
- `-q, --quiet`。

**说明**：准备发布。
**使用场景**：认证用户。
**Workspace 行为**：不直接相关。
**注意事项**：令牌保密。
**示例**：
- 登录：
  ```
  cargo login my_token --verbose
  ```

#### `cargo logout`
**用途**：登出。
**背景**：清除令牌。
**参数**：
- `--registry <name>`。
- `-v, --verbose`。
- `-q, --quiet`。

**说明**：仅影响本地。
**使用场景**：切换账户。
**Workspace 行为**：不直接相关。
**注意事项**：无网络操作。
**示例**：
- 登出：
  ```
  cargo logout --quiet
  ```

#### `cargo search`
**用途**：搜索 crates.io。
**背景**：查找可用 crate。
**参数**：
- `--limit <n>`。
- `--index <url>`。
- `--registry <name>`。
- `-v, --verbose`。
- `-q, --quiet`。

**说明**：显示 crate 信息。
**使用场景**：寻找依赖。
**Workspace 行为**：不直接相关。
**注意事项**：需联网。
**示例**：
- 搜索：
  ```
  cargo search serde --limit 5 --verbose
  ```

#### `cargo report`
**用途**：生成报告（不稳定）。
**背景**：检查兼容性。
**参数**：依赖子命令（如 `future-incompat`）。
**说明**：需夜间版。
**使用场景**：调试。
**Workspace 行为**：支持 `-p`。
**注意事项**：实验性功能。
**示例**：
- 检查兼容性：
  ```
  cargo report future-incompat --verbose
  ```
- Workspace 示例：
  ```
  cargo report future-incompat -p my_app
  ```

---

## 3. Workspace 深入解析

### 3.1 结构
Workspace 允许多包共享配置。根 `Cargo.toml`：
```toml
[workspace]
members = ["app", "lib"]
default-members = ["app"]
resolver = "2"
```
目录：
```
my_workspace/
├── Cargo.toml
├── app/
│   ├── Cargo.toml
│   └── src/main.rs
├── lib/
│   ├── Cargo.toml
│   └── src/lib.rs
```

### 3.2 关键选项
- `--workspace`：操作所有包。
- `-p <name>`：指定包。
- `--exclude <name>`：排除包。
- `--manifest-path <path>`。

### 3.3 复杂示例
- 构建并运行：
  ```
  cargo build --workspace --release --features "shared" && cargo run -p app --bin server
  ```
  - 构建所有包，运行 `app` 的 `server`。

---

## 4. 总结

Cargo 指令集功能强大，示例展示了适度复杂的用法，结合常用参数如 `--release`、`--features` 和 workspace 选项。无论是单包还是多包项目，Cargo 都能高效支持。
