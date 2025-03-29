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
    let tool1 = Crate {
        crate_type: CrateType::Binary,
        name: "tool1",
        path: "packages/my_package/src/bin/tool1.rs",
    };
    println!("{tool1:#?}");
}
