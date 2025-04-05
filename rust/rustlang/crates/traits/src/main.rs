// Associated Items 关联项
// 关联类型 type  trait中定义
// mod my_mod {
struct MyStruct;
mod my_mod {
    use super::MyStruct;
    impl MyStruct {
        pub const PUBLIC: i32 = 1;
        const PRIVATE: i32 = 2;
    }
}
fn main() {
    println!("{}", MyStruct::PUBLIC); // OK
    // println!("{}", MyStruct::PRIVATE); // 错误
}
// fn main() {
//     println!("{}", MY_CONST); // 错误
// }
// const MY_CONST: i32 = 111; // 静态项
// struct Example;
// impl Example {
//     fn use_value() {
//         println!("{}", Self::VALUE);
//     }
// }

// impl Example {
//     const VALUE: i32 = 42;
// }

// fn main() {
//     let example = Example;
//     Example::use_value();
// }

// std::fmt::Display
// use std::fmt;

// struct Position {
//     longitude: f32,
//     latitude: f32,
// }

// impl fmt::Display for Position {
//     fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
//         write!(f, "({}, {})", self.longitude, self.latitude)
//     }
// }

// fn main() {
//     assert_eq!(
//         "(1.987, 2.983)",
//         format!(
//             "{}",
//             Position {
//                 longitude: 1.987,
//                 latitude: 2.983,
//             }
//         ),
//     );
// }

// use std::fmt::{self, Formatter};
// struct Point {
//     x: i32,
//     y: i32,
// }

// impl fmt::Display for Point {
//     fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
//         write!(f, "({}, {})", self.x, self.y)
//     }
// }

// #[cfg(test)]
// mod tests {
//     use super::*;
//     #[test]
//     fn point_impl_display() {
//         assert_eq!("(2, 3)", format!("{}", Point { x: 2, y: 3 }));
//     }
// }
