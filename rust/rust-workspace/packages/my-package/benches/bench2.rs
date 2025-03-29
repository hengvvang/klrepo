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
    let bench2 = Crate {
        crate_type: CrateType::Bench,
        name: "bench2",
        path: "packages/my_package/benches/bench2.rs",
    };
    println!("{bench2:#?}");
}
