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
    let ws_bench2 = Crate {
        crate_type: CrateType::Bench,
        name: "ws_bench2",
        path: "benches/ws_bench2.rs",
    };
    println!("{ws_bench2:#?}");
}
