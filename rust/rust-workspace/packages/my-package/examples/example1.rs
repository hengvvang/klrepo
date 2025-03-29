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
    let example1 = Crate {
        crate_type: CrateType::Example,
        name: "exmaple1",
        path: "packages/my_package/examples/example1.rs",
    };
    println!("{example1:#?}");
}
