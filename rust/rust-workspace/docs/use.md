# WORKSPACE

## project structure
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
### NOTICES
- rust 中的`crate`有五种类型

    - `binary`
        - rust 允许在一个 **`package`** 中存在多个 `binary crate`
        - 在 **`package`** 的 `src/main.rs` 和 `src/bin/*`下的`.rs`文件, rust自动识别为 `binary crate` [默认]
        - 在 `cargo.toml` 中使用 [[bin]] 数组表指定任意路径的 `.rs` 文件为 `binary crate`, 也可以覆盖rust默认设置，为`src/main.rs` `src/bin/*`自定义 name [自定义]

    - `library`
        - 对于任意 **`package`** rust 只允许存在一个 `library crate`
        - 在 **`package`** 的 `src/lib.rs`  rust自动识别为 `library crate` [默认]
        - 在 `cargo.toml` 中使用 [lib] 表指定任意路径的 `.rs` 文件为 `library crate`, 也可以覆盖rust默认设置，为`src/lib.rs` 自定义 name [自定义]

    - `test`
        - rust 允许在一个 **`package`** 中存在多个 `test crate`
        - 在 **`package`** `的 tests/*` 下的`.rs`文件, rust自动识别为 `test crate` [默认]
        - 在 `cargo.toml` 中使用 [[test]] 数组表指定任意路径的 `.rs` 文件为 `test crate`, 也可以覆盖rust默认设置, 默认 name 的值为文件名

    - `example`
        - rust 允许在一个 **`package`** 中存在多个 `example crate`
        - 在 **`package`** `的 examples/*` 下的`.rs`文件, rust自动识别为 `example crate` [默认]
        - 在 `cargo.toml` 中使用 [[example]] 数组表指定任意路径的 `.rs` 文件为 `example crate`, 也可以覆盖rust默认设置
        默认 name 的值为文件名

    - `bench`
        - rust 允许在一个 **`package`** 中存在多个 `bench crate`
        - 在 **`package`** `的 benches/*` 下的`.rs`文件, rust自动识别为 `bench crate` [默认]
        - 在 `cargo.toml` 中使用 [[benches]] 数组表指定任意路径的 `.rs` 文件为 `bench crate`, 也可以覆盖rust默认设置
        默认 name 的值为文件名
    ### 利用报错
    ```
    D:\Repository\rust\rust-workspace> cargo build --bin
    error: "--bin" takes one argument.
    Available binaries:
        app1
        app2
        my-package
        my-package1
        tool1
        tool2
    ```
    ```
    D:\Repository\rust\rust-workspace> cargo build --test
    error: "--test" takes one argument.
    Available test targets:
        test1
        test2
        test_a
        test_b
    ```
    ```
    D:\Repository\rust\rust-workspace> cargo build --bench
    error: "--bench" takes one argument.
    Available bench targets:
        bench1
        bench2
        bench_a
        bench_b
    ```
    ```
    D:\Repository\rust\rust-workspace> cargo build --example
    error: "--example" takes one argument.
    Available examples:
        example1
        example2
        example_a
        example_b
    ```


### commands


#### cargo build --example
> 利用报错查看 examples
```
PS D:\Repository\rust\rust-workspace> cargo build --example
error: "--example" takes one argument.
Available examples:
    example1
    example2
    example_a
    example_b
```


---

#### cargo build --example example_a
> 指定 example 的 name 来编译
```
PS D:\Repository\rust\rust-workspace> cargo build --example example_a
   Compiling my-package1 v0.1.0 (D:\Repository\rust\rust-workspace\packages\my-package1)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.48s
```

---


#### cargo clean  清理构建
```
PS D:\Repository\rust\rust-workspace> cargo clean
     Removed 35 files, 2.0MiB total
```


---

#### cargo build --example example_a --package my-package1
> 指定 example 的 name 和 所从属的 package
```
PS D:\Repository\rust\rust-workspace> cargo build --example example_a --package my-package1
   Compiling my-package1 v0.1.0 (D:\Repository\rust\rust-workspace\packages\my-package1)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.49s
```

---

#### cargo clean  清理构建
```
PS D:\Repository\rust\rust-workspace> cargo clean
     Removed 35 files, 2.0MiB total
```

---

####  --package    ====>   -p
```
PS D:\Repository\rust\rust-workspace> cargo build --example example_a -p my-package1
   Compiling my-package1 v0.1.0 (D:\Repository\rust\rust-workspace\packages\my-package1)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.71s
```

---


#### cargo clean  清理构建
```
PS D:\Repository\rust\rust-workspace> cargo clean
     Removed 35 files, 2.0MiB total
```

---


#### 编译所有 examples
```
PS D:\Repository\rust\rust-workspace> cargo build --examples
    Compiling my-package1 v0.1.0 (D:\Repository\rust\rust-workspace\packages\my-package1)
    Compiling my-package v0.1.0 (D:\Repository\rust\rust-workspace\packages\my-package)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.53s
```

---
