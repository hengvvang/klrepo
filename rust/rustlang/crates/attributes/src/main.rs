// Attributes   --- metadata --->> rust codes
// Outer Attributes  #![...]   functions stuctures enumerates modules
// Inner Attributes  #[...]    current scope  whole modules/whole file
// #[cfg(...)] #[inline] #[deprecated]  compiler control
// #[derive(...)] #[proc_macro] code generates
// #[doc(...)] #[test] #[rustfmt::skip]
// #[serde(...)] #[thiserror::Error]
// #[mut_use] #[allow(...)] #[deny(...)] #[warn(...)]
// #[attribute_name]
// #[attribute_name(key = "value")]
// #[allow(dead_code)]
// #![no_std]
//
//
//
//
//
fn main() {
    println!("Hello, world!");
}

#[test]
fn test_add() {
    assert_eq!(2 + 2, 4);
}

// #[no_mangle]
// pub extern "C" fn my_function() {}

//[attribute_name(value)]
// #[path = "custom_mode.rs"]
// mod my_moudule

#[repr(C)]
struct MyStruct {
    x: i32,
    y: i32,
}

// [attribute_name(key = value)]
// #[deprecated(since = "1.0.0", note = "Use new_feature instead")]

// #[cfg(target_os = "linux")]
// #[cfg_attr(target_os = "linux", allow(dead_code))]

// #[cfg(target_os = "linux")]
// #[cfg(target_os = "windows", target_arch = "x86_64", target_feature= "my_feature", test)]
// #[cfg_attr(target_os = "linux", allow(dead_code))]

// #[inline]
// #[inline(always)]
// #[inline(never)]
