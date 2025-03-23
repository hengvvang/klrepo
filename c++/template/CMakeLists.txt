# 使用说明：
# 1. 本文件是项目的根CMakeLists.txt，用于配置整个项目的全局设置。
# 2. 指定C++标准、编译器、生成器（如Ninja），并设置警告和调试选项。
# 3. 添加子目录（如src/、lib/、tests/、third_party/）以模块化管理。
# 4. 当添加新模块或库时，需要在add_subdirectory()中添加对应的子目录。
# 5. 运行CMake命令：cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug -G Ninja
# 6. 构建项目：ninja -C build

# 设置CMake最低版本要求，确保使用较新的CMake功能
cmake_minimum_required(VERSION 3.22)

# 定义项目名称、版本和支持的语言（C++）
project(MyProject VERSION 1.0 LANGUAGES CXX)

# 设置C++标准为C++20
set(CMAKE_CXX_STANDARD 20)

# 强制使用指定的C++标准（不使用低于或高于的版本）
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 禁用编译器特定的C++扩展（如GNU扩展），确保代码可移植性
set(CMAKE_CXX_EXTENSIONS OFF)

# 指定C编译器为Clang
set(CMAKE_C_COMPILER clang)

# 指定C++编译器为Clang++
set(CMAKE_CXX_COMPILER clang++)

# 指定生成器为Ninja，提高构建速度
set(CMAKE_GENERATOR Ninja)

# 添加编译选项，启用所有警告、额外警告和严格的代码检查
add_compile_options(-Wall -Wextra -Wpedantic)

# 根据构建类型（Debug或Release）设置编译选项
if(CMAKE_BUILD_TYPE STREQUAL "Debug")
  # 在Debug模式下，启用调试符号（-g），禁用优化（-O0）
  add_compile_options(-g -O0)
endif()

# 设置可执行文件的输出目录为build/bin
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

# 设置动态库和静态库的输出目录为build/lib
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)

# 设置归档文件（如静态库）的输出目录为build/lib
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)

# 添加源代码子目录，包含src/CMakeLists.txt
add_subdirectory(src)

# 添加自定义库子目录，包含lib/CMakeLists.txt
add_subdirectory(lib)

# 启用CTest测试功能，用于运行单元测试
# enable_testing()

# 添加测试子目录，包含tests/CMakeLists.txt
# add_subdirectory(tests)

# 添加第三方库子目录，包含third_party/CMakeLists.txt（可选）
# add_subdirectory(third_party)