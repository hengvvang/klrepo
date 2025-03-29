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
    let bench_a = Crate {
        crate_type: CrateType::Bench,
        name: "bench_a",
        path: "packages/my_package1/benches/bench_a.rs",
    };
    println!("{bench_a:#?}");
}
