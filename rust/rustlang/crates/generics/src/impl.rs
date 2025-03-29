// // radius   半径
// // circle   圆
// #[derive(Debug)]
// struct Circle {
//     radius: f64,
// }
// impl Circle {
//     fn new(radius: f64) -> Self {
//         Self { radius }
//     }
//     fn area(&self) -> f64 {
//         std::f64::consts::PI * self.radius * self.radius
//     }
// }
// fn main() {
//     let circle = Circle::new(2.0);
//     println!("{circle:#?} area: {}", circle.area())
// }

// struct Container<T> {
//     value: T,
// }

// impl<T> Container<T> {
//     fn new(value: T) -> Self {
//         Self { value }
//     }
//     fn get(&self) -> &T {
//         &self.value
//     }
// }

// fn main() {
//     // let string: Container<String> = Container {
//     //     value: String::from("Rust"),
//     // };
//     // let int32: Container<i32> = Container { value: 111 };
//     let string = Container::new("Rust".to_string());
//     let int32 = Container::new(111);
//     // println!("{},{}", *string.get(), *int32.get())
//     println!("{},{}", string.get(), int32.get())
// }

use std::fmt::Display;
