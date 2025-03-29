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
    let example_b = Crate {
        crate_type: CrateType::Example,
        name: "exmaple_b",
        path: "packages/my_package1/examples/example_b.rs",
    };
    println!("{example_b:#?}");
}
