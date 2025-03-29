Cargo with Workspace
---
构建与编译
===
### Crates
- **Binary Crate**:
    - `cargo build --bin <name> -p <package>`
        - 编译单个binary crate
    - `cargo check --bin <name> -p <package>`
        - 检查binary crate


- **Library Crate**:
    - `cargo build --lib -p <package>`
        - 编译library crate
    - `cargo check --lib -p <package>`
        - 检查library crate


- **Test Crate**:
    - `cargo build --test <name> -p <package>`
        - 编译test crate
    - `cargo check --test <name> -p <package>`
        - 检查test crate


- **Example Crate**:
  - `cargo build --example <name> -p <package>`
        - 编译example crate
  - `cargo check --example <name> -p <package>`
        - 检查example crate



- **Bench Crate**:
  - `cargo build --bench <name> -p <package>`
        - 编译bench crate
  - **`cargo check --bench <name> -p <package>`**:
        - 检查bench crate。


### Package
- **Binary Crate**
  - **`cargo build --bins -p <package>`**
    - 编译所有binary crate。


- **Library Crate**
  - **`cargo build --lib -p <package>`**
    - 同crate级别。


- **Test Crate**
  - **`cargo build --tests -p <package>`**
    - 编译所有test crate。


- **Example Crate**
  - **`cargo build --examples -p <package>`**
    - 编译所有example crate。


- **Bench Crate**
  - **`cargo build --benches -p <package>`**
    - 编译所有bench crate。


- **所有类型**
  - **`cargo build -p <package>`**
    - 编译package内所有crate。

  - **`cargo check -p <package>`**
    - 检查所有crate。

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

### 运行与调试
#### Crate 级别
- **Binary Crate**:
    - **`cargo run --bin <name> -p <package>`**
        - 运行binary。

- **Library Crate**:
    - 无运行命令。

- **Test Crate**:
    - 通过`cargo test`运行。

- **Example Crate**:
    - **`cargo run --example <name> -p <package>`**:
        - 运行example。

- **Bench Crate**:
    - 通过`cargo bench`运行。

#### Package 级别
- **Binary Crate**:
  - **`cargo run -p <package>`**: 运行默认binary。

- **其他类型**: 无直接运行命令。

#### Workspace 级别
- **Example Crate**:
  - **`cargo run --example <name>`**: 运行根目录example。

- **其他类型**: 无默认运行。

---

### 测试与基准测试
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

### 文档与发布
#### Crate 级别
- **Binary Crate**:
  - **`cargo doc --bin <name> -p <package>`**:
    - 生成文档。
    - 示例: `cargo doc --bin tool1 -p my-package1`
- **Library Crate**:
  - **`cargo doc --lib -p <package>`**:
    -生成文档。
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

### 代码检查与格式化
#### Crate 级别
- **Binary Crate**:
    - **`cargo tree --target bin <name> -p <package>`**
        - 查看依赖树。
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
