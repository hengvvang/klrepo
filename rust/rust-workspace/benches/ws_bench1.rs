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
    let ws_bench1 = Crate {
        crate_type: CrateType::Bench,
        name: "ws_bench1",
        path: "benches/ws_bench1.rs",
    };
    println!("{ws_bench1:#?}");
}
