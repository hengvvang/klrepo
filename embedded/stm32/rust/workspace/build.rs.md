# Build.rs

在 `Cargo.toml` 中：

- **没有独立的 `[build]` 表**。
- 构建脚本的路径是通过 `[package]` 表下的 `build` 字段指定的，例如：
  ```toml
  [package]
  name = "led-blink"
  version = "0.1.0"
  edition = "2021"
  build = "../../build.rs"
  ```
- `build` 字段的值是一个字符串，表示构建脚本的路径，**相对于当前 `Cargo.toml` 所在目录**。


---

### 项目结构

假设你的 Workspace 结构如下：

```
my_workspace/
├── Cargo.toml          # Workspace 根配置文件
├── build.rs           # 顶层构建脚本
├── memory.x           # 顶层内存布局文件
├── packages/
│   ├── led-blink/
│   │   ├── Cargo.toml  # led-blink 的配置文件
│   │   └── src/
│   │       └── main.rs
│   ├── another-package/
│   │   ├── Cargo.toml  # 另一个包的配置文件
│   │   └── src/
│   │       └── main.rs
```

目标：

- 所有包（`led-blink` 和 `another-package`）复用顶层的 `build.rs` 和 `memory.x`。
- 支持单独编译某个包（`cargo build -p led-blink`）或整个 Workspace（`cargo build`）。

---

### 配置 Workspace

#### 1. 根 `Cargo.toml`

定义 Workspace 和成员包：

```toml
[workspace]
members = [
    "packages/led-blink",
    "packages/another-package",
]
```

#### 2. 各包的 `Cargo.toml`

每个包在 `[package]` 下通过 `build` 字段指定顶层的 `build.rs`：

- `packages/led-blink/Cargo.toml`：

```toml
[package]
name = "led-blink"
version = "0.1.0"
edition = "2021"
build = "../../build.rs"  # 指向顶层 build.rs
```

- `packages/another-package/Cargo.toml`：

```toml
[package]
name = "another-package"
version = "0.1.0"
edition = "2021"
build = "../../build.rs"  # 指向顶层 build.rs
```

- **路径说明**：
  - `build` 字段的路径是**相对于当前 `Cargo.toml` 所在目录**。
  - 从 `my_workspace/packages/led-blink/` 到 `my_workspace/build.rs`，需要回退两级（`../../build.rs`）。

---

### 方法一：使用相对路径复用 `build.rs` 和 `memory.x`

#### `build.rs` 配置

直接使用相对路径，基于 `build.rs` 所在目录：

```rust
use std::env;
use std::fs::File;
use std::io::Write;
use std::path::PathBuf;

fn main() {
    let out = &PathBuf::from(env::var_os("OUT_DIR").unwrap());
    File::create(out.join("memory.x"))
        .unwrap()
        .write_all(include_bytes!("memory.x"))
        .unwrap();
    println!("cargo:rustc-link-search={}", out.display());

    println!("cargo:rerun-if-changed=memory.x");

    println!("cargo:rustc-link-arg=--nmagic");
    println!("cargo:rustc-link-arg=-Tmemory.x"); // 使用 memory.x 作为链接脚本
}
```

#### 路径解析

- **`include_bytes!("memory.x")`**：
  - 路径是相对于 `build.rs` 所在目录（`my_workspace/`）。
  - 因为 `memory.x` 也在 `my_workspace/`，`"memory.x"` 直接指向 `my_workspace/memory.x`。
- **`cargo:rerun-if-changed=memory.x`**：
  - 同样相对于 `build.rs` 目录，指向 `my_workspace/memory.x`。
- **`cargo:rustc-link-arg=-Tmemory.x`**：
  - `memory.x` 被复制到 `OUT_DIR`（通过 `File::create`），链接器会在 `OUT_DIR` 中找到它（通过 `cargo:rustc-link-search`）。

#### 执行过程

1. 运行 `cargo build -p led-blink`：
   - Cargo 读取 `packages/led-blink/Cargo.toml`，找到 `build = "../../build.rs"`。
   - 执行 `my_workspace/build.rs`。
   - `build.rs` 在 `my_workspace/` 目录下运行，`"memory.x"` 解析为 `my_workspace/memory.x`。
2. 对 `another-package` 或整个 Workspace 同理。

#### 优点

- **简单直观**：直接使用相对路径，无需动态计算。
- **与模板兼容**：基于 `cortex-m-quickstart` 的逻辑，只需将 `-Tlink.x` 改为 `-Tmemory.x`。

#### 缺点

- **位置依赖**：假设 `memory.x` 必须与 `build.rs` 同级。如果 `memory.x` 移动（例如到 `my_workspace/scripts/memory.x`），需要修改路径为 `"scripts/memory.x"`。
- **单一性**：所有包强制使用同一个 `memory.x`，无法灵活区分。

---

#############################

????? 有问题

#############################


### 方法二：使用动态路径复用 `build.rs` 和 `memory.x`
#### `build.rs` 配置

使用 `CARGO_MANIFEST_DIR` 动态计算路径：

```rust
use std::env;
use std::fs::File;
use std::io::Write;
use std::path::PathBuf;

fn main() {
    // 获取当前包的 manifest 目录
    let manifest_dir = env::var("CARGO_MANIFEST_DIR").unwrap();
    let memory_x_path = PathBuf::from(&manifest_dir).join("../../memory.x");

    // 将 memory.x 复制到 OUT_DIR
    let out = &PathBuf::from(env::var_os("OUT_DIR").unwrap());
    File::create(out.join("memory.x"))
        .unwrap()
        .write_all(&std::fs::read(&memory_x_path).unwrap())
        .unwrap();
    println!("cargo:rustc-link-search={}", out.display());

    // 当 memory.x 更改时重新运行
    println!("cargo:rerun-if-changed={}", memory_x_path.display());

    // 链接器参数
    println!("cargo:rustc-link-arg=--nmagic");
    println!("cargo:rustc-link-arg=-Tmemory.x");
}
```

#### 路径解析

- **`CARGO_MANIFEST_DIR`**：
  - 表示当前包的 `Cargo.toml` 所在目录。
  - 对于 `led-blink`，是 `my_workspace/packages/led-blink/`。
  - 对于 `another-package`，是 `my_workspace/packages/another-package/`。
- **`../../memory.x`**：
  - 从当前包目录回退两级，到达 `my_workspace/`，然后指向 `memory.x`。
  - 结果是 `my_workspace/memory.x`。
- **`std::fs::read(&memory_x_path)`**：
  - 动态读取文件内容，替代 `include_bytes!` 的硬编码路径。
- **`cargo:rerun-if-changed`**：
  - 使用完整路径（`my_workspace/memory.x`），确保监控正确。

#### 执行过程

1. 运行 `cargo build -p led-blink`：
   - `CARGO_MANIFEST_DIR` = `my_workspace/packages/led-blink/`。
   - `memory_x_path` = `my_workspace/packages/led-blink/../../memory.x` = `my_workspace/memory.x`。
   - `memory.x` 被复制到 `OUT_DIR`，并用于链接。
2. 对 `another-package` 同理。

#### 优点

- **灵活性**：路径动态计算，可适应 `memory.x` 位置的变化（只需调整相对路径）。
- **可扩展性**：可以通过 `CARGO_PKG_NAME` 添加条件逻辑，例如：
  ```rust
  let pkg_name = env::var("CARGO_PKG_NAME").unwrap();
  let memory_x_path = if pkg_name == "led-blink" {
      PathBuf::from(&manifest_dir).join("../../memory-led.x")
  } else {
      PathBuf::from(&manifest_dir).join("../../memory.x")
  };
  ```

#### 缺点

- **稍复杂**：需要额外的路径计算逻辑。
- **结构依赖**：仍需确保包目录相对于顶层的层级一致（两级回退）。

---

### 两种方法的对比

| 特性           | 相对路径            | 动态路径                 |
| -------------- | ------------------- | ------------------------ |
| **路径基准**   | `build.rs` 所在目录 | `CARGO_MANIFEST_DIR`     |
| **路径示例**   | `"memory.x"`        | `"../../memory.x"`       |
| **代码复杂度** | 简单，无需计算      | 稍复杂，需要动态计算     |
| **灵活性**     | 较低，依赖同级文件  | 较高，可适应不同位置     |
| **适用场景**   | 文件位置固定        | 文件位置可能变化或需区分 |

---

### 完整配置示例

#### 使用相对路径

1. **`my_workspace/build.rs`**：

```rust
use std::env;
use std::fs::File;
use std::io::Write;
use std::path::PathBuf;

fn main() {
    let out = &PathBuf::from(env::var_os("OUT_DIR").unwrap());
    File::create(out.join("memory.x"))
        .unwrap()
        .write_all(include_bytes!("memory.x"))
        .unwrap();
    println!("cargo:rustc-link-search={}", out.display());
    println!("cargo:rerun-if-changed=memory.x");
    println!("cargo:rustc-link-arg=--nmagic");
    println!("cargo:rustc-link-arg=-Tmemory.x");
}
```

2. **`packages/led-blink/Cargo.toml`**：

```toml
[package]
name = "led-blink"
version = "0.1.0"
edition = "2021"
build = "../../build.rs"
```

#### 使用动态路径

1. **`my_workspace/build.rs`**：

```rust
use std::env;
use std::fs::File;
use std::io::Write;
use std::path::PathBuf;

fn main() {
    let manifest_dir = env::var("CARGO_MANIFEST_DIR").unwrap();
    let memory_x_path = PathBuf::from(&manifest_dir).join("../../memory.x");

    let out = &PathBuf::from(env::var_os("OUT_DIR").unwrap());
    File::create(out.join("memory.x"))
        .unwrap()
        .write_all(&std::fs::read(&memory_x_path).unwrap())
        .unwrap();
    println!("cargo:rustc-link-search={}", out.display());
    println!("cargo:rerun-if-changed={}", memory_x_path.display());
    println!("cargo:rustc-link-arg=--nmagic");
    println!("cargo:rustc-link-arg=-Tmemory.x");
}
```

2. **`packages/led-blink/Cargo.toml`**：

```toml
[package]
name = "led-blink"
version = "0.1.0"
edition = "2021"
build = "../../build.rs"
```

---

### 验证与调试

- **调试路径**：

```rust
println!("cargo:warning=manifest_dir: {}", env::var("CARGO_MANIFEST_DIR").unwrap());
println!("cargo:warning=memory_x_path: {}", memory_x_path.display());
```

- **运行命令**：
  - `cargo build -p led-blink --verbose`：检查构建过程。
  - 确认 `OUT_DIR/memory.x` 是否生成。

---

### 总结

- **配置关键**：在 `[package]` 下使用 `build = "../../build.rs"` 正确指向顶层脚本。
- **相对路径**：适合 `build.rs` 和 `memory.x` 同级的情况，简单高效。
- **动态路径**：适合需要灵活性或区分不同包的场景，使用 `CARGO_MANIFEST_DIR` 计算路径。
- **选择建议**：如果你的结构固定且简单，推荐相对路径；如果需要扩展性，推荐动态路径。
