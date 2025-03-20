// macro_rules! macro_name {
//     (pattern1) => { expansion1 };
//     (pattern2) => { expansion2 };
// }
// pattern  ---> $name:kind
// $($name:kind),* 0, >1  $($name:kind),+ >=1
//  $x_1:expr
// $typei32:ty
// $paths:path
// $stamte:stmt
//

macro_rules! my_vec {
    () => {
        Vec::new()
    };
    ($elem:expr) => {
        {let mut v = Vec::new();
        v.push($elem);
        v}
    };
    ($($elem:expr),*) => {
       { let mut v = Vec::new();
        $(
            v.push($elem);
        )*
        v
       }
    };
}

fn main() {
    let v1: Vec<i32> = my_vec!();
    let mut v2: Vec<i32> = my_vec!(42);
    let mut v3: Vec<i32> = my_vec!(1, 2, 3);
    println!("{:?}", v1);
    println!("{:?}", v2);
    println!("{:?}", v3);
}
