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
    let example_a = Crate {
        crate_type: CrateType::Example,
        name: "exmaple_a",
        path: "packages/my_package1/examples/example_a.rs",
    };
    println!("{example_a:#?}");
}
