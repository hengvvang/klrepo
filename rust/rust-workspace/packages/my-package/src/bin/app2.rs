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
    let app2 = Crate {
        crate_type: CrateType::Binary,
        name: "app2",
        path: "packages/my_package/src/bin/app2.rs",
    };
    println!("{app2:#?}");
}
