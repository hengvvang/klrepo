//! 对于许多项目来说，这是可选的，因为链接器始终会在
//! 项目根目录（`Cargo.toml` 所在的地方）中搜索。但是，如果你
//! 使用的是工作区（workspace）或具有更复杂的构建设置，则
//! 该构建脚本是必需的。此外，通过请求 Cargo 在 `memory.x` 更改时
//! 重新运行构建脚本，更新 `memory.x` 可以确保应用程序
//! 使用新的内存设置重新构建。
//!
//! 构建脚本还会设置链接器标志，指定要使用的链接脚本。

use std::env;
use std::fs::File;
use std::io::Write;
use std::path::PathBuf;

fn main() {
    // 将 `memory.x` 放入输出目录，并确保它
    // 在链接器的搜索路径中。
    let out = &PathBuf::from(env::var_os("OUT_DIR").unwrap());
    File::create(out.join("memory.x"))
        .unwrap()
        .write_all(include_bytes!("memory.x"))
        .unwrap();
    println!("cargo:rustc-link-search={}", out.display());

    // 默认情况下，Cargo 会在项目中任何文件更改时重新运行构建脚本。
    // 通过在此处指定 `memory.x`，我们确保只有当 `memory.x`
    // 更改时才重新运行构建脚本。
    println!("cargo:rerun-if-changed=memory.x");

    // 指定链接器参数。

    // `--nmagic` 参数在内存段地址未对齐到 0x10000 时是必需的，
    // 例如 `memory.x` 文件中的 FLASH 和 RAM 段。
    // 参考：https://github.com/rust-embedded/cortex-m-quickstart/pull/95
    println!("cargo:rustc-link-arg=--nmagic");

    // 将链接脚本设置为由 `cortex-m-rt` 提供的 `link.x`。
    println!("cargo:rustc-link-arg=-Tlink.x");
}
