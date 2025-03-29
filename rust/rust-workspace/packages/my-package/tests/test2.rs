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
    let test2 = Crate {
        crate_type: CrateType::Test,
        name: "test2",
        path: "packages/my_package/tests/test2.rs",
    };
    println!("{test2:#?}");
}
