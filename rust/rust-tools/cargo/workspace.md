# 根`Cargo.toml`的全面配置项详解

在Rust的大型项目中，当使用工作区（Workspace）管理多个包时，根`Cargo.toml`文件扮演着核心角色。它既可以定义工作区的全局配置（通过`[workspace]`表），也可以作为根目录的独立包（通过`[package]`表等）存在。以下是根`Cargo.toml`中所有可用配置项的详细介绍，分为三大模块：**工作区配置**、**根包配置**和**全局配置**。

当前日期为2025年3月25日，基于Rust最新稳定版（假设1.77或更高版本）。

---

## 第一部分：工作区配置（`[workspace]`表）
这些配置项仅适用于定义和管理工作区，位于根`Cargo.toml`的`[workspace]`表下。如果根文件不包含此表，则不被视为工作区根。

### 1.1 `members`
- **定义**: 指定工作区包含的成员包路径。
- **类型**: 字符串数组（`Vec<String>`）。
- **是否必需**: 是（无`members`则无法定义工作区）。
- **默认值**: 无。
- **语法示例**:
  ```toml
  [workspace]
  members = ["core", "cli", "libs/*"]
  ```
  - `"core"`: 根目录下的`core`子目录。
  - `"libs/*"`: 通配符匹配`libs`下的所有子目录（如`libs/util`）。
- **作用**:
  - 列出所有需要纳入工作区的包路径。
  - 成员包共享根目录的`Cargo.lock`和`target`目录。
- **细节**:
  - **路径规则**: 相对路径，基于根`Cargo.toml`所在目录。
  - **通配符**: 支持`*`（单层匹配）和`**`（递归匹配），如`"src/**/mod"`。
  - **错误情况**: 路径不存在或无`Cargo.toml`时，Cargo报错：
    ```
    error: failed to load manifest for workspace member `invalid`
    ```
  - **根包关系**: 根目录本身需显式列在`members`中才会成为成员。
- **历史背景**: 2015年随工作区功能引入，是工作区机制的基础。
- **使用场景**: 组织多包项目，如核心库和工具。

### 1.2 `exclude`
- **定义**: 指定从`members`中排除的路径。
- **类型**: 字符串数组。
- **是否必需**: 否。
- **默认值**: `[]`。
- **语法示例**:
  ```toml
  [workspace]
  members = ["crates/*"]
  exclude = ["crates/old", "crates/temp"]
  ```
- **作用**: 避免某些匹配`members`通配符的目录被视为成员包。
- **细节**:
  - **优先级**: 高于`members`，即被排除的路径不会加入工作区。
  - **路径不存在**: 无错误，仅忽略。
  - **与根包无关**: 不影响根目录是否为包。
- **使用场景**: 排除废弃代码或临时目录。
- **历史背景**: 早期引入，解决通配符过度匹配问题。

### 1.3 `default-members`
- **定义**: 指定默认构建的成员包。
- **类型**: 字符串数组。
- **是否必需**: 否。
- **默认值**: 若未指定，则为`members`中的所有包。
- **语法示例**:
  ```toml
  [workspace]
  members = ["core", "cli", "tests"]
  default-members = ["core", "cli"]
  ```
- **作用**: 在根目录运行`cargo build`时，只构建指定包。
- **细节**:
  - **子集要求**: 必须是`members`的子集，否则报错。
  - **命令行覆盖**: 可通过`-p`参数构建其他包。
  - **空值**: `default-members = []`表示默认不构建任何包。
- **使用场景**: 优化大型项目的构建速度。
- **历史背景**: Rust 1.50（2020年）引入。

### 1.4 `[workspace.package]`
- **定义**: 定义供成员包继承的共享元数据。
- **类型**: 子表。
- **是否必需**: 否。
- **默认值**: 无。
- **语法示例**:
  ```toml
  [workspace.package]
  version = "0.1.0"
  authors = ["Team <team@example.com>"]
  edition = "2021"
  license = "MIT"
  ```
- **子字段**:
  - `version`: 版本号（字符串，如`"0.2.0"`）。
  - `authors`: 作者列表（字符串数组）。
  - `description`: 描述（字符串）。
  - `homepage`, `repository`, `documentation`: URL（字符串）。
  - `license`: 许可证（字符串，如`"MIT OR Apache-2.0"`）。
  - `license-file`: 自定义许可证路径。
  - `keywords`: 关键词（最多5个）。
  - `categories`: 分类（需符合crates.io）。
  - `publish`: 是否发布（布尔值，默认`true`）。
  - `edition`: Rust版本（`"2015"`, `"2018"`, `"2021"`, `"2024"`等）。
- **作用**: 提供默认元数据，成员包未定义时继承。
- **细节**:
  - **覆盖规则**: 成员包的`[package]`优先。
  - **根包无关**: 根包的`[package]`不继承此表。
- **使用场景**: 统一多包项目的元数据。
- **历史背景**: Rust 1.64（2022年）引入。

### 1.5 `[workspace.dependencies]`
- **定义**: 定义共享依赖。
- **类型**: 子表。
- **是否必需**: 否。
- **默认值**: 无。
- **语法示例**:
  ```toml
  [workspace.dependencies]
  serde = { version = "1.0", features = ["derive"] }
  tokio = "1.0"
  ```
- **作用**: 成员包通过`workspace = true`引用，确保依赖一致性。
- **细节**:
  - **支持字段**: `version`, `path`, `git`, `features`, `optional`等。
  - **覆盖**: 成员包可显式定义依赖覆盖。
- **使用场景**: 统一依赖版本。
- **历史背景**: Rust 1.64引入。

### 1.6 `[workspace.metadata]`
- **定义**: 自定义元数据。
- **类型**: 子表。
- **是否必需**: 否。
- **默认值**: 无。
- **语法示例**:
  ```toml
  [workspace.metadata]
  build-date = "2025-03-25"
  ```
- **作用**: 供第三方工具使用，Cargo不解析。
- **细节**: 格式自由，可嵌套。
- **使用场景**: CI/CD集成。

### 1.7 `resolver`
- **定义**: 指定依赖解析器版本。
- **类型**: 字符串。
- **是否必需**: 否。
- **默认值**: `"1"`（Rust 2018前）。
- **语法示例**: `resolver = "2"`.
- **可选值**:
  - `"1"`: 第一代解析器。
  - `"2"`: 第二代（Rust 2021默认）。
- **作用**: 控制依赖冲突解析。
- **细节**: 全局生效。
- **使用场景**: 现代项目推荐`"2"`。

---

## 第二部分：根包配置
如果根`Cargo.toml`包含`[package]`表，则根目录是一个独立包。这些配置仅适用于根包，与工作区成员无关。

### 2.1 `[package]`表
#### 子字段
- **`name`**:
  - **类型**: 字符串。
  - **必需**: 是。
  - **示例**: `name = "root-app"`.
  - **作用**: 根包的唯一标识。
- **`version`**:
  - **类型**: 字符串。
  - **示例**: `version = "0.1.0"`.
  - **注意**: 不继承`[workspace.package.version]`。
- **`edition`**: Rust版本。
- **`authors`, `description`, `homepage`, `repository`, `documentation`, `license`, `license-file`, `keywords`, `categories`, `publish`**:
  - 同`[workspace.package]`，但仅限根包。
- **`readme`**:
  - **类型**: 字符串。
  - **示例**: `readme = "README.md"`.
- **`rust-version`**:
  - **类型**: 字符串。
  - **示例**: `rust-version = "1.60"`.
  - **作用**: 指定最低Rust版本。
- **`exclude` / `include`**:
  - **类型**: 字符串数组。
  - **示例**: `exclude = ["tests/*"]`.
  - **作用**: 控制发布时的文件。
- **`default-run`**:
  - **类型**: 字符串。
  - **示例**: `default-run = "main"`.
- **`autobins`, `autoexamples`, `autotests`, `autobenches`**:
  - **类型**: 布尔值。
  - **默认**: `true`.
- **`build`**:
  - **类型**: 字符串。
  - **示例**: `build = "build.rs"`.
- **`links`**:
  - **类型**: 字符串。
  - **示例**: `links = "pthread"`.

#### 使用场景
- 根目录作为主应用程序或测试工具。

### 2.2 `[dependencies]`, `[dev-dependencies]`, `[build-dependencies]`
- **类型**: 子表。
- **示例**:
  ```toml
  [dependencies]
  serde = { workspace = true }
  ```
- **作用**: 定义根包依赖。
- **细节**: 可引用`[workspace.dependencies]`。

### 2.3 `[[bin]]`, `[[lib]]`, `[[test]]`, `[[bench]]`, `[[example]]`
- **类型**: 数组表。
- **示例**:
  ```toml
  [[bin]]
  name = "main"
  path = "src/main.rs"
  ```
- **作用**: 定义根包的目标。

### 2.4 `[features]`
- **类型**: 子表。
- **示例**:
  ```toml
  [features]
  default = ["std"]
  std = []
  ```
- **作用**: 定义根包特性。

### 2.5 `[target]`
- **类型**: 子表。
- **示例**:
  ```toml
  [target.'cfg(windows)'.dependencies]
  winapi = "0.3"
  ```
- **作用**: 平台特定配置。

### 2.6 `[metadata]`
- **类型**: 子表。
- **示例**:
  ```toml
  [metadata]
  custom = "root-data"
  ```
- **作用**: 根包自定义元数据。

---

## 第三部分：全局配置
这些配置影响整个工作区，包括根包和成员包。

### 3.1 `[profile]`表
- **定义**: 配置构建优化。
- **子表**: `[profile.dev]`, `[profile.release]`, `[profile.test]`, `[profile.bench]`.
- **示例**:
  ```toml
  [profile.release]
  opt-level = 3
  lto = "thin"
  ```
- **子字段**:
  - `opt-level`: 优化级别（0-3）。
  - `debug`: 调试信息（0-2或`true`/`false`）。
  - `lto`: 链接时优化。
  - `codegen-units`: 代码生成单元数。
- **作用**: 全局生效。

### 3.2 `[patch]`
- **定义**: 覆盖依赖来源。
- **示例**:
  ```toml
  [patch.crates-io]
  serde = { path = "local/serde" }
  ```
- **作用**: 全局修改依赖。

### 3.3 `[replace]`（已废弃）
- **定义**: 替换依赖版本。
- **示例**:
  ```toml
  [replace]
  "serde:1.0.0" = { path = "local/serde" }
  ```

---

## 完整示例
```toml
[workspace]
members = ["core", "cli"]
resolver = "2"

[package]
name = "root-app"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { workspace = true }

[workspace.dependencies]
serde = "1.0"

[profile.release]
opt-level = 3
```

---

这提供了根`Cargo.toml`所有配置项的最详细说明。如需进一步扩展或具体问题，请告知！
