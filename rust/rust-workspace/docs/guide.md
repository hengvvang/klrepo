# Workspace
> 我将进一步模块化内容，按功能模块分门别类介绍，并在每个模块中针对crate类型（binary、library、test、example、bench）分别说明`Cargo`在crate、package、workspace级别的使用。

### 项目结构
```
rust-workspace/
├── Cargo.toml
├── tests/
│   ├── ws_test1.rs
│   └── ws_test2.rs
├── examples/
│   ├── ws_example1.rs
│   └── ws_example2.rs
├── benches/
│   ├── ws_bench1.rs
│   └── ws_bench2.rs
├── packages/
│   ├── my-package/
│   │   ├── Cargo.toml
│   │   ├── src/
│   │   │   ├── main.rs         # 默认binary crate
│   │   │   ├── lib.rs          # library crate
│   │   │   └── bin/
│   │   │       ├── app1.rs     # 额外binary crate
│   │   │       └── app2.rs     # 额外binary crate
│   │   ├── tests/
│   │   │   ├── test1.rs
│   │   │   └── test2.rs
│   │   ├── examples/
│   │   │   ├── example1.rs
│   │   │   └── example2.rs
│   │   └── benches/
│   │       ├── bench1.rs
│   │       └── bench2.rs
│   ├── my-package1/
│   │   ├── Cargo.toml
│   │   ├── src/
│   │   │   ├── main.rs         # 默认binary crate
│   │   │   ├── lib.rs          # library crate
│   │   │   └── bin/
│   │   │       ├── tool1.rs    # 额外binary crate
│   │   │       └── tool2.rs    # 额外binary crate
│   │   ├── tests/
│   │   │   ├── test_a.rs
│   │   │   └── test_b.rs
│   │   ├── examples/
│   │   │   ├── example_a.rs
│   │   │   └── example_b.rs
│   │   └── benches/
│   │       ├── bench_a.rs
│   │       └── bench_b.rs
```

#### 配置文件（简要列出）
- **根`Cargo.toml`**:
  ```toml
  [workspace]
  members = ["packages/my-package", "packages/my-package1"]
  [package]
  name = "my-workspace"
  version = "0.1.0"
  edition = "2021"
  [[test]] name = "ws_test1" path = "tests/ws_test1.rs"
  [[test]] name = "ws_test2" path = "tests/ws_test2.rs"
  [[example]] name = "ws_example1" path = "examples/ws_example1.rs"
  [[example]] name = "ws_example2" path = "examples/ws_example2.rs"
  [[bench]] name = "ws_bench1" path = "benches/ws_bench1.rs"
  [[bench]] name = "ws_bench2" path = "benches/ws_bench2.rs"
  ```

- **`packages/my-package/Cargo.toml`**:
  ```toml
  [package]
  name = "my-package"
  version = "0.1.0"
  edition = "2021"
  [lib] name = "my_package_lib" path = "src/lib.rs"
  [[bin]] name = "my-package" path = "src/main.rs"
  [[bin]] name = "app1" path = "src/bin/app1.rs"
  [[bin]] name = "app2" path = "src/bin/app2.rs"
  [[test]] name = "test1" path = "tests/test1.rs"
  [[test]] name = "test2" path = "tests/test2.rs"
  [[example]] name = "example1" path = "examples/example1.rs"
  [[example]] name = "example2" path = "examples/example2.rs"
  [[bench]] name = "bench1" path = "benches/bench1.rs"
  [[bench]] name = "bench2" path = "benches/bench2.rs"
  ```

- **`packages/my-package1/Cargo.toml`**:
  ```toml
  [package]
  name = "my-package1"
  version = "0.1.0"
  edition = "2021"
  [lib] name = "my_package1_lib" path = "src/lib.rs"
  [[bin]] name = "my-package1" path = "src/main.rs"
  [[bin]] name = "tool1" path = "src/bin/tool1.rs"
  [[bin]] name = "tool2" path = "src/bin/tool2.rs"
  [[test]] name = "test_a" path = "tests/test_a.rs"
  [[test]] name = "test_b" path = "tests/test_b.rs"
  [[example]] name = "example_a" path = "examples/example_a.rs"
  [[example]] name = "example_b" path = "examples/example_b.rs"
  [[bench]] name = "bench_a" path = "benches/bench_a.rs"
  [[bench]] name = "bench_b" path = "benches/bench_b.rs"
  ```

---

## Cargo 使用方法（模块化分门别类）

### 模块 1：构建与编译
#### Crate 级别
- **Binary Crate**:
  - **`cargo build --bin <name> -p <package>`**:
    - 编译单个binary crate。
    - 示例: `cargo build --bin app1 -p my-package --release`
    - 输出: `target/release/app1`
  - **`cargo check --bin <name> -p <package>`**:
    - 检查binary crate。
    - 示例: `cargo check --bin tool2 -p my-package1`
- **Library Crate**:
  - **`cargo build --lib -p <package>`**:
    - 编译library crate。
    - 示例: `cargo build --lib -p my-package1`
    - 输出: `target/debug/libmy_package1_lib.rlib`
  - **`cargo check --lib -p <package>`**:
    - 检查library crate。
    - 示例: `cargo check --lib -p my-package`
- **Test Crate**:
  - **`cargo build --test <name> -p <package>`**:
    - 编译test crate。
    - 示例: `cargo build --test test1 -p my-package`
  - **`cargo check --test <name> -p <package>`**:
    - 检查test crate。
    - 示例: `cargo check --test ws_test2`
- **Example Crate**:
  - **`cargo build --example <name> -p <package>`**:
    - 编译example crate。
    - 示例: `cargo build --example example2 -p my-package`
  - **`cargo check --example <name> -p <package>`**:
    - 检查example crate。
    - 示例: `cargo check --example ws_example1`
- **Bench Crate**:
  - **`cargo build --bench <name> -p <package>`**:
    - 编译bench crate。
    - 示例: `cargo build --bench bench1 -p my-package`
  - **`cargo check --bench <name> -p <package>`**:
    - 检查bench crate。
    - 示例: `cargo check --bench ws_bench2`

#### Package 级别
- **Binary Crate**
  - **`cargo build --bins -p <package>`**
    - 编译所有binary crate。
    - 示例: `cargo build --bins -p my-package1`
- **Library Crate**
  - **`cargo build --lib -p <package>`**
    - 同crate级别。
- **Test Crate**
  - **`cargo build --tests -p <package>`**
    - 编译所有test crate。
    - 示例: `cargo build --tests -p my-package`
- **Example Crate**
  - **`cargo build --examples -p <package>`**
    - 编译所有example crate。
    - 示例: `cargo build --examples -p my-package1`
- **Bench Crate**
  - **`cargo build --benches -p <package>`**
    - 编译所有bench crate。
    - 示例: `cargo build --benches -p my-package`
- **所有类型**
  - **`cargo build -p <package>`**
    - 编译package内所有crate。
    - 示例: `cargo build -p my-package`
  - **`cargo check -p <package>`**
    - 检查所有crate。
    - 示例: `cargo check -p my-package1 --all-targets`

#### Workspace 级别
- **Binary Crate**
  - **`cargo build --bins`**
  - 编译所有package和根目录的binary。
- **Library Crate**
  - **`cargo build --lib`**
  - 编译所有library。
- **Test Crate**
  - **`cargo build --tests`**
  - 编译所有test。
- **Example Crate**
  - **`cargo build --examples`**
  - 编译所有example。
- **Bench Crate**
  - **`cargo build --benches`**
  - 编译所有bench。
- **所有类型**
  - **`cargo build`**
    - 编译整个工作空间。
    - 示例: `cargo build --release`
  - **`cargo check`**
    - 检查整个工作空间。
    - 示例: `cargo check`
  - **`cargo clean`**
    - 清理构建产物。
    - 示例: `cargo clean`

---

### 模块 2：运行与调试
#### Crate 级别
- **Binary Crate**:
  - **`cargo run --bin <name> -p <package>`**
    - 运行binary。
    - 示例: `cargo run --bin app1 -p my-package -- --arg1`
- **Library Crate**: 无运行命令。
- **Test Crate**: 通过`cargo test`运行。
- **Example Crate**:
  - **`cargo run --example <name> -p <package>`**: 运行example。
    - 示例: `cargo run --example example2 -p my-package`
  - 根目录: `cargo run --example ws_example1`
- **Bench Crate**: 通过`cargo bench`运行。

#### Package 级别
- **Binary Crate**:
  - **`cargo run -p <package>`**: 运行默认binary。
    - 示例: `cargo run -p my-package1`
- **其他类型**: 无直接运行命令。

#### Workspace 级别
- **Example Crate**:
  - **`cargo run --example <name>`**: 运行根目录example。
    - 示例: `cargo run --example ws_example2`
- **其他类型**: 无默认运行。

---

### 模块 3：测试与基准测试
#### Crate 级别
- **Binary Crate**:
  - **`cargo test --bin <name> -p <package>`**: 测试binary的单元测试。
    - 示例: `cargo test --bin app2 -p my-package`
- **Library Crate**:
  - **`cargo test --lib -p <package>`**: 测试library单元测试。
    - 示例: `cargo test --lib -p my-package1`
- **Test Crate**:
  - **`cargo test --test <name> -p <package>`**: 运行集成测试。
    - 示例: `cargo test --test test1 -p my-package`
  - 根目录: `cargo test --test ws_test2`
- **Example Crate**:
  - **`cargo test --example <name> -p <package>`**: 测试example。
    - 示例: `cargo test --example example_a -p my-package1`
- **Bench Crate**:
  - **`cargo bench --bench <name> -p <package>`**: 运行基准测试。
    - 示例: `cargo bench --bench bench1 -p my-package`
  - 根目录: `cargo bench --bench ws_bench2`

#### Package 级别
- **所有类型**:
  - **`cargo test -p <package>`**: 运行所有测试。
    - 示例: `cargo test -p my-package --test-threads 2`
  - **`cargo bench -p <package>`**: 运行所有基准测试。
    - 示例: `cargo bench -p my-package1`

#### Workspace 级别
- **所有类型**:
  - **`cargo test`**: 运行所有测试。
    - 示例: `cargo test`
  - **`cargo bench`**: 运行所有基准测试。
    - 示例: `cargo bench`

---

### 模块 4：依赖管理
#### Crate 级别
- **所有类型**:
  - **手动编辑`Cargo.toml`**: 为特定crate添加依赖。
    - 示例（binary）:
      ```toml
      [[bin]]
      name = "app1"
      [bin.dependencies]
      tokio = "1.0"
      ```
    - 示例（test）:
      ```toml
      [[test]]
      name = "ws_test1"
      [test.dependencies]
      rand = "0.8"
      ```

#### Package 级别
- **所有类型**:
  - **`cargo add <crate> -p <package>`**: 添加共享依赖。
    - 示例: `cargo add serde -p my-package --features derive`
  - **`cargo update -p <package>`**: 更新依赖。
    - 示例: `cargo update -p my-package1`

#### Workspace 级别
- **所有类型**:
  - **`cargo add <crate>`**: 添加根目录依赖。
    - 示例: `cargo add rand`
  - **共享依赖**: 在根`Cargo.toml`定义。
    - 示例: `[workspace.dependencies] serde = "1.0"`
  - **`cargo update`**: 更新所有依赖。
    - 示例: `cargo update`

---

### 模块 5：文档与发布
#### Crate 级别
- **Binary Crate**:
  - **`cargo doc --bin <name> -p <package>`**: 生成文档。
    - 示例: `cargo doc --bin tool1 -p my-package1`
- **Library Crate**:
  - **`cargo doc --lib -p <package>`**: 生成文档。
    - 示例: `cargo doc --lib -p my-package`

#### Package 级别
- **所有类型**:
  - **`cargo doc -p <package>`**: 生成所有文档。
    - 示例: `cargo doc -p my-package1 --open`
  - **`cargo publish`**: 发布library。
    - 示例: `cd packages/my-package && cargo publish --dry-run`

#### Workspace 级别
- **所有类型**:
  - **`cargo doc`**: 生成所有文档。
    - 示例: `cargo doc`

---

### 模块 6：代码检查与格式化
#### Crate 级别
- **Binary Crate**:
  - **`cargo tree --target bin <name> -p <package>`**: 查看依赖树。
    - 示例: `cargo tree --target bin app1 -p my-package`

#### Package 级别
- **所有类型**:
  - **`cargo fmt -p <package>`**: 格式化代码。
    - 示例: `cargo fmt -p my-package --check`
  - **`cargo clippy -p <package>`**: 检查代码。
    - 示例: `cargo clippy -p my-package1 --fix`

#### Workspace 级别
- **所有类型**:
  - **`cargo fmt`**: 格式化所有代码。
    - 示例: `cargo fmt`
  - **`cargo clippy`**: 检查所有代码。
    - 示例: `cargo clippy`
  - **`cargo tree`**: 查看所有依赖树。
    - 示例: `cargo tree`

---

### 模块 7：元数据与信息
#### Workspace 级别
- **所有类型**:
  - **`cargo metadata`**: 输出元数据。
    - 示例: `cargo metadata --format-version 1`
