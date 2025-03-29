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
    let test_b = Crate {
        crate_type: CrateType::Test,
        name: "test_b",
        path: "packages/my_package1/tests/test_b.rs",
    };
    println!("{test_b:#?}");
}
