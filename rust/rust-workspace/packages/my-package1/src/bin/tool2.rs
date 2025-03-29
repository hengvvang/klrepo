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
    let tool2 = Crate {
        crate_type: CrateType::Binary,
        name: "tool2",
        path: "packages/my_package/src/bin/tool2.rs",
    };
    println!("{tool2:#?}");
}
