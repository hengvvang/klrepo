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
    let test1 = Crate {
        crate_type: CrateType::Test,
        name: "test1",
        path: "packages/my_package/tests/test1.rs",
    };
    println!("{test1:#?}");
}
