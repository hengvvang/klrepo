#[derive(Debug)]
enum CrateType {
    Binary,
    Library,
    Example,
    Test,
    Bench,
}
#[derive(Debug)]
struct Crate<'a> {
    crate_type: CrateType,
    name: &'a str,
    path: &'a str,
}
fn main() {
    let my_package_main = Crate {
        crate_type: CrateType::Library,
        name: "my_package_lib",
        path: "packages/my_package/src/lib.rs",
    };
    println!("{my_package_main:#?}");
}
