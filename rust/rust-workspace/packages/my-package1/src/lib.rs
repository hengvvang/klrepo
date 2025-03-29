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
    let my_package1_lib = Crate {
        crate_type: CrateType::Library,
        name: "my_package1_lib",
        path: "packages/my_pakage1/src/lib.rs",
    };
    println!("{my_package1_lib:#?}");
}
