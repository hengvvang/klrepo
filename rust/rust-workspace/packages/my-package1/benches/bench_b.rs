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
    let bench_b = Crate {
        crate_type: CrateType::Bench,
        name: "bench_b",
        path: "packages/my_package1/benches/bench_b.rs",
    };
    println!("{bench_b:#?}");
}
