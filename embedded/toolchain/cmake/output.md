1. CMake 输出目录的基本概念
CMake 在构建项目时会生成多种类型的文件，包括：
	•	可执行文件（如 my_app 或 my_app.exe）：由 add_executable 创建。
	•	动态库（如 .so, .dll）：由 add_library 创建的共享库。
	•	静态库（如 .a, .lib）：由 add_library 创建的归档文件。
	•	中间文件（如 .o 或 .obj）：编译过程中生成的临时对象文件。
CMake 默认将这些文件放在构建目录（CMAKE_BINARY_DIR）的子目录中，但你可以通过变量自定义它们的输出位置。

2. 控制输出目录的核心变量
CMake 提供了以下变量来控制输出目录：
	•	CMAKE_RUNTIME_OUTPUT_DIRECTORY
	◦	控制可执行文件（add_executable 生成的文件）的输出路径。
	◦	示例：my_app, my_app.exe。
	•	CMAKE_LIBRARY_OUTPUT_DIRECTORY
	◦	控制动态库（add_library(... SHARED) 生成的 .so, .dll 等）的输出路径。
	•	CMAKE_ARCHIVE_OUTPUT_DIRECTORY
	◦	控制静态库（add_library(... STATIC) 生成的 .a, .lib 等）的输出路径。
这些变量可以设置为全局值，影响所有目标（targets）。你也可以为特定目标单独设置输出目录。
配置特定构建类型
对于多配置生成器（如 Visual Studio 或 Ninja Multi-Config），可以为不同构建类型（如 Debug、Release）分别设置：
	•	CMAKE_RUNTIME_OUTPUT_DIRECTORY_（如 CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG）
	•	CMAKE_LIBRARY_OUTPUT_DIRECTORY_
	•	CMAKE_ARCHIVE_OUTPUT_DIRECTORY_

3. 如何在 `CMakeLists.txt` 中定义输出目录
以下是详细的实现步骤和代码：
3.1 全局设置输出目录
在 CMakeLists.txt 中使用 set 命令定义输出目录：
# 设置所有可执行文件输出到 bin 目录
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin")

# 设置所有动态库输出到 lib 目录
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")

# 设置所有静态库输出到 lib 目录
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")
	•	${CMAKE_BINARY_DIR} 是运行 cmake 时指定的构建目录（例如 ./build）。
	•	路径可以是绝对路径（如 /usr/local/bin）或相对路径（如 bin），建议使用相对路径以保持项目可移植性。
3.2 为特定目标设置输出目录
如果只想为某些目标自定义输出目录，可以使用 set_target_properties：
# 创建一个可执行文件目标
add_executable(my_app main.c)

# 为 my_app 设置特定的输出目录
set_target_properties(my_app PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/custom_bin"
)
	•	这里 my_app 的输出目录被设置为 custom_bin，而其他目标仍使用默认或全局设置。
3.3 支持多配置构建
为 Debug 和 Release 配置分别设置输出目录：
# Debug 配置
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG "${CMAKE_BINARY_DIR}/bin/debug")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY_DEBUG "${CMAKE_BINARY_DIR}/lib/debug")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY_DEBUG "${CMAKE_BINARY_DIR}/lib/debug")

# Release 配置
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_RELEASE "${CMAKE_BINARY_DIR}/bin/release")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY_RELEASE "${CMAKE_BINARY_DIR}/lib/release")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY_RELEASE "${CMAKE_BINARY_DIR}/lib/release")
	•	在构建时，CMake 会根据当前配置（cmake --build . --config Debug 或 --config Release）选择对应的目录。
3.4 确保输出目录存在
CMake 不会自动创建这些目录，你需要显式创建它们。可以使用 file(MAKE_DIRECTORY) 命令：
# 创建输出目录
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/bin")
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/lib")
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/bin/debug")
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/bin/release")
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/lib/debug")
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/lib/release")
	•	这会在配置阶段（运行 cmake 时）创建目录。
	•	如果目录已经存在，MAKE_DIRECTORY 不会报错。

4. 不同内容的输出目录设置
以下是针对不同类型内容的具体示例：
4.1 可执行文件
# 定义可执行文件
add_executable(my_app main.c)

# 全局设置
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin")

# 或为特定目标设置
set_target_properties(my_app PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin/my_app_dir"
)
	•	my_app 将输出到 bin 或 bin/my_app_dir。
4.2 动态库
# 定义动态库
add_library(my_shared_lib SHARED lib.c)

# 全局设置
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")

# 或为特定目标设置
set_target_properties(my_shared_lib PROPERTIES
    LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib/shared"
)
	•	libmy_shared_lib.so 将输出到 lib 或 lib/shared。
4.3 静态库
# 定义静态库
add_library(my_static_lib STATIC lib.c)

# 全局设置
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")

# 或为特定目标设置
set_target_properties(my_static_lib PROPERTIES
    ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib/static"
)
	•	libmy_static_lib.a 将输出到 lib 或 lib/static。
4.4 自定义文件（如脚本或资源文件）
如果需要将其他文件（如配置文件、脚本）复制到输出目录，可以使用 configure_file 或 file(COPY)：
# 复制单个文件到输出目录
configure_file(config.ini "${CMAKE_BINARY_DIR}/bin/config.ini" COPYONLY)

# 复制整个目录到输出目录
file(COPY "resources/" DESTINATION "${CMAKE_BINARY_DIR}/bin/resources")
	•	这会将 config.ini 或 resources 目录复制到 bin 下。

5. 完整示例 `CMakeLists.txt`
以下是一个综合示例，涵盖多种情况：
cmake_minimum_required(VERSION 3.10)
project(MyProject)

# 设置全局输出目录
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")

# 为多配置设置输出目录
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG "${CMAKE_BINARY_DIR}/bin/debug")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_RELEASE "${CMAKE_BINARY_DIR}/bin/release")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY_DEBUG "${CMAKE_BINARY_DIR}/lib/debug")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY_RELEASE "${CMAKE_BINARY_DIR}/lib/release")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY_DEBUG "${CMAKE_BINARY_DIR}/lib/debug")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY_RELEASE "${CMAKE_BINARY_DIR}/lib/release")

# 创建输出目录
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/bin")
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/lib")
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/bin/debug")
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/bin/release")
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/lib/debug")
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/lib/release")

# 添加可执行文件
add_executable(my_app main.c)

# 添加动态库
add_library(my_shared_lib SHARED lib.c)

# 添加静态库
add_library(my_static_lib STATIC static_lib.c)

# 为特定目标设置自定义输出目录
set_target_properties(my_app PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin/custom"
)

# 复制资源文件
configure_file(config.ini "${CMAKE_BINARY_DIR}/bin/config.ini" COPYONLY)
file(COPY "resources/" DESTINATION "${CMAKE_BINARY_DIR}/bin/resources")
运行示例
	1	创建构建目录并进入： mkdir build && cd build
	2
	3	配置项目： cmake ..
	4
	5	构建项目： cmake --build .
	6	 或指定配置： cmake --build . --config Debug
	7	cmake --build . --config Release
	8
输出结果
	•	my_app 输出到 build/bin/custom（因为有特定设置）。
	•	libmy_shared_lib.so 输出到 build/lib（或 lib/debug, lib/release）。
	•	libmy_static_lib.a 输出到 build/lib（或 lib/debug, lib/release）。
	•	config.ini 和 resources/ 输出到 build/bin。

6. 额外细节和注意事项
	•	路径分隔符：CMake 自动处理路径分隔符（Windows 用 \，Linux 用 /），无需手动调整。
	•	中间文件：无法通过上述变量控制 .o 文件的输出，它们默认放在 CMakeFiles 子目录中。
	•	命令行覆盖：可以在运行 cmake 时用 -D 参数覆盖变量： cmake -DCMAKE_RUNTIME_OUTPUT_DIRECTORY=/custom/path ..
	•
	•	调试：如果输出目录未生效，检查变量是否拼写正确，或是否被后续代码覆盖。
