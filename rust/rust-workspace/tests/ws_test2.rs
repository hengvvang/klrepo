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
    let ws_test2 = Crate {
        crate_type: CrateType::Test,
        name: "ws_test2",
        path: "examples/ws_test2.rs",
    };
    println!("{ws_test2:#?}");
}
