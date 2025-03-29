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
    let bench1 = Crate {
        crate_type: CrateType::Bench,
        name: "bench1",
        path: "packages/my_package/benches/bench1.rs",
    };
    println!("{bench1:#?}");
}
