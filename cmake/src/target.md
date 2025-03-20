以下是关于 CMake 中“目标”（Target）的全面且详尽的介绍，内容围绕“一切皆目标”理念展开，针对每种目标类型（可执行目标、库目标、自定义目标）分别模块化介绍其所有相关配置项。我将确保不遗漏任何细节，提供每个配置项的语法、使用场景、示例和注意事项。结构分为三大层级：**目标类型总览**、**每种目标的详细配置模块**、**综合实践**，以确保逻辑清晰、内容完整。

---

## 一、目标类型总览
CMake 中的目标是构建系统的核心，分为以下三种主要类型：
1. **可执行目标（Executable Target）**：由 `add_executable` 定义，用于生成可执行文件。
2. **库目标（Library Target）**：由 `add_library` 定义，包括静态库、动态库、模块库和接口库。
3. **自定义目标（Custom Target）**：由 `add_custom_target` 定义，用于执行特定任务，不生成文件。

每种目标类型都有独特的配置项，但也共享一些通用的配置方法（如属性设置、依赖管理）。以下按类型逐一展开。

---

## 二、每种目标的详细配置模块

### 2.1 可执行目标（Executable Target）
可执行目标用于生成可执行程序（如 `.exe` 或 Linux 可执行文件），是最常见的构建目标。

#### 2.1.1 创建可执行目标
- **命令**：`add_executable`
- **语法**：`add_executable(<name> [WIN32] [MACOSX_BUNDLE] [EXCLUDE_FROM_ALL] source1 [source2 ...])`
- **参数**：
  - `<name>`：目标名称，唯一标识。
  - `WIN32`：Windows 上生成 GUI 程序（无控制台）。
  - `MACOSX_BUNDLE`：macOS 上生成 `.app` 应用程序束。
  - `EXCLUDE_FROM_ALL`：从默认构建目标（如 `make all`）中排除。
  - `source1 [source2 ...]`：源文件列表。
- **示例**：
  ```cmake
  add_executable(myapp main.c)
  add_executable(myapp_gui WIN32 gui_main.c)
  ```

#### 2.1.2 源文件管理
- **命令**：`target_sources`
- **语法**：`target_sources(<target> [PRIVATE | PUBLIC | INTERFACE] source1 [source2 ...])`
- **范围**：
  - `PRIVATE`：仅当前目标使用。
  - `PUBLIC`：当前目标及其依赖者使用（可执行目标通常无需此项）。
  - `INTERFACE`：仅依赖者使用（不适用于可执行目标）。
- **示例**：
  ```cmake
  add_executable(myapp main.c)
  target_sources(myapp PRIVATE extra.c utils.c)
  ```
- **注意**：源文件可以是 `.c`、`.cpp`、`.h` 等，CMake 自动识别语言。

#### 2.1.3 依赖管理
- **命令**：`target_link_libraries`
- **语法**：`target_link_libraries(<target> [PRIVATE | PUBLIC | INTERFACE] item1 [item2 ...])`
- **用途**：指定链接的库（目标或外部库）。
- **示例**：
  ```cmake
  add_executable(myapp main.c)
  target_link_libraries(myapp PRIVATE mylib pthread)
  ```
- **命令**：`add_dependencies`
- **语法**：`add_dependencies(<target> dep1 [dep2 ...])`
- **示例**：
  ```cmake
  add_custom_target(gen_code COMMAND ./gen.sh)
  add_executable(myapp main.c)
  add_dependencies(myapp gen_code)
  ```

#### 2.1.4 属性配置
- **命令**：`set_target_properties`
- **语法**：`set_target_properties(<target> PROPERTIES prop1 value1 [prop2 value2] ...)`
- **常用属性**：
  - `OUTPUT_NAME`：输出文件名。
  - `RUNTIME_OUTPUT_DIRECTORY`：输出路径。
  - `CXX_STANDARD`：C++ 标准（如 11、17）。
  - `WIN32_EXECUTABLE`：是否为 Windows GUI 程序。
- **示例**：
  ```cmake
  set_target_properties(myapp PROPERTIES
      OUTPUT_NAME "myprogram"
      RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin"
      CXX_STANDARD 17
  )
  ```

#### 2.1.5 编译与链接配置
- **命令**：`target_compile_options`
- **语法**：`target_compile_options(<target> [PRIVATE | PUBLIC | INTERFACE] option1 [option2 ...])`
- **示例**：
  ```cmake
  target_compile_options(myapp PRIVATE -Wall -O2)
  ```
- **命令**：`target_compile_definitions`
- **语法**：`target_compile_definitions(<target> [PRIVATE | PUBLIC | INTERFACE] def1 [def2 ...])`
- **示例**：
  ```cmake
  target_compile_definitions(myapp PRIVATE DEBUG=1)
  ```
- **命令**：`target_include_directories`
- **语法**：`target_include_directories(<target> [PRIVATE | PUBLIC | INTERFACE] dir1 [dir2 ...])`
- **示例**：
  ```cmake
  target_include_directories(myapp PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/include)
  ```
- **命令**：`target_link_options`
- **语法**：`target_link_options(<target> [PRIVATE | PUBLIC | INTERFACE] option1 [option2 ...])`
- **示例**：
  ```cmake
  target_link_options(myapp PRIVATE -static)
  ```

#### 2.1.6 自定义命令
- **命令**：`add_custom_command`
- **语法**：`add_custom_command(TARGET <target> PRE_BUILD | PRE_LINK | POST_BUILD COMMAND cmd ...)`
- **选项**：
  - `PRE_BUILD`：构建前执行（仅部分生成器支持）。
  - `PRE_LINK`：链接前执行。
  - `POST_BUILD`：构建后执行。
- **示例**：
  ```cmake
  add_custom_command(TARGET myapp POST_BUILD COMMAND echo "Build complete")
  ```

---

### 2.2 库目标（Library Target）
库目标用于生成库文件，包括静态库、动态库、模块库和接口库。

#### 2.2.1 创建库目标
- **命令**：`add_library`
- **语法**：`add_library(<name> [STATIC | SHARED | MODULE | INTERFACE] [EXCLUDE_FROM_ALL] source1 [source2 ...])`
- **类型**：
  - `STATIC`：静态库（`.a`）。
  - `SHARED`：动态库（`.so`、`.dll`）。
  - `MODULE`：动态加载模块。
  - `INTERFACE`：接口库，无构建产物，仅传递属性。
- **示例**：
  ```cmake
  add_library(mylib STATIC src/lib.c)
  add_library(myshared SHARED src/lib.c)
  add_library(myinterface INTERFACE)
  ```

#### 2.2.2 源文件管理
- **命令**：`target_sources`
- **语法**：`target_sources(<target> [PRIVATE | PUBLIC | INTERFACE] source1 [source2 ...])`
- **示例**：
  ```cmake
  add_library(mylib STATIC src/lib.c)
  target_sources(mylib PRIVATE src/helper.c)
  ```
- **接口库特殊性**：`INTERFACE` 库无源文件，仅用作属性传递。

#### 2.2.3 依赖管理
- **命令**：`target_link_libraries`
- **语法**：`target_link_libraries(<target> [PRIVATE | PUBLIC | INTERFACE] item1 [item2 ...])`
- **示例**：
  ```cmake
  add_library(mylib STATIC src/lib.c)
  target_link_libraries(mylib PUBLIC anotherlib)
  ```
- **命令**：`add_dependencies`
- **语法**：`add_dependencies(<target> dep1 [dep2 ...])`
- **示例**：
  ```cmake
  add_library(mylib STATIC src/lib.c)
  add_dependencies(mylib gen_code)
  ```

#### 2.2.4 属性配置
- **命令**：`set_target_properties`
- **语法**：`set_target_properties(<target> PROPERTIES prop1 value1 [prop2 value2] ...)`
- **常用属性**：
  - `OUTPUT_NAME`：输出文件名。
  - `LIBRARY_OUTPUT_DIRECTORY`：动态库输出路径。
  - `ARCHIVE_OUTPUT_DIRECTORY`：静态库输出路径。
  - `VERSION`：库版本（如 `1.2.3`）。
  - `SOVERSION`：共享库兼容性版本。
- **示例**：
  ```cmake
  set_target_properties(mylib PROPERTIES
      OUTPUT_NAME "mylib_v1"
      ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib"
      VERSION 1.2.3
      SOVERSION 1
  )
  ```

#### 2.2.5 编译与链接配置
- **命令**：`target_compile_options`
- **语法**：`target_compile_options(<target> [PRIVATE | PUBLIC | INTERFACE] option1 [option2 ...])`
- **示例**：
  ```cmake
  target_compile_options(mylib PRIVATE -fPIC)
  ```
- **命令**：`target_compile_definitions`
- **语法**：`target_compile_definitions(<target> [PRIVATE | PUBLIC | INTERFACE] def1 [def2 ...])`
- **示例**：
  ```cmake
  target_compile_definitions(mylib PUBLIC MYLIB_EXPORTS)
  ```
- **命令**：`target_include_directories`
- **语法**：`target_include_directories(<target> [PRIVATE | PUBLIC | INTERFACE] dir1 [dir2 ...])`
- **示例**：
  ```cmake
  target_include_directories(mylib PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/include)
  ```
- **命令**：`target_link_options`
- **语法**：`target_link_options(<target> [PRIVATE | PUBLIC | INTERFACE] option1 [option2 ...])`
- **示例**：
  ```cmake
  target_link_options(mylib PRIVATE -shared)
  ```

#### 2.2.6 自定义命令
- **命令**：`add_custom_command`
- **语法**：`add_custom_command(TARGET <target> PRE_BUILD | PRE_LINK | POST_BUILD COMMAND cmd ...)`
- **示例**：
  ```cmake
  add_custom_command(TARGET mylib POST_BUILD COMMAND echo "Library built")
  ```

---

### 2.3 自定义目标（Custom Target）
自定义目标不生成文件，用于执行特定任务，如测试、清理等。

#### 2.3.1 创建自定义目标
- **命令**：`add_custom_target`
- **语法**：`add_custom_target(<name> [ALL] [COMMAND cmd [args]] [DEPENDS dep] [WORKING_DIRECTORY dir] [COMMENT comment] [VERBATIM])`
- **参数**：
  - `<name>`：目标名称。
  - `ALL`：默认构建。
  - `COMMAND`：执行的命令。
  - `DEPENDS`：依赖的文件或目标。
  - `WORKING_DIRECTORY`：命令执行目录。
  - `COMMENT`：执行时的提示信息。
  - `VERBATIM`：确保命令按原样传递。
- **示例**：
  ```cmake
  add_custom_target(run_tests
      COMMAND ./run_tests.sh
      WORKING_DIRECTORY ${CMAKE_BINARY_DIR}
      COMMENT "Running tests"
  )
  ```

#### 2.3.2 依赖管理
- **命令**：`add_dependencies`
- **语法**：`add_dependencies(<target> dep1 [dep2 ...])`
- **示例**：
  ```cmake
  add_executable(myapp main.c)
  add_custom_target(run_tests COMMAND ./myapp)
  add_dependencies(run_tests myapp)
  ```
- **注意**：自定义目标无法使用 `target_link_libraries`。

#### 2.3.3 属性配置
- **命令**：`set_target_properties`
- **语法**：`set_target_properties(<target> PROPERTIES prop1 value1 [prop2 value2] ...)`
- **适用属性**：较少，通常为元数据，如 `EXCLUDE_FROM_ALL`。
- **示例**：
  ```cmake
  set_target_properties(run_tests PROPERTIES EXCLUDE_FROM_ALL TRUE)
  ```

#### 2.3.4 自定义命令集成
- **命令**：`add_custom_command`
- **语法**：`add_custom_command(OUTPUT out COMMAND cmd ...)`（与自定义目标配合生成文件）
- **示例**：
  ```cmake
  add_custom_command(OUTPUT generated.c COMMAND ./gen.sh)
  add_custom_target(gen_source DEPENDS generated.c)
  ```

---

## 三、综合实践
### 3.1 完整示例
```cmake
cmake_minimum_required(VERSION 3.10)
project(MyProject CXX)

# 可执行目标
add_executable(myapp main.c)
target_sources(myapp PRIVATE src/extra.c)
target_include_directories(myapp PRIVATE include)
target_compile_options(myapp PRIVATE -Wall -O2)
target_compile_definitions(myapp PRIVATE APP_VERSION="1.0")
set_target_properties(myapp PROPERTIES
    OUTPUT_NAME "myprogram"
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin"
    CXX_STANDARD 17
)
add_custom_command(TARGET myapp POST_BUILD COMMAND echo "App built")

# 库目标
add_library(mylib STATIC src/lib.c)
target_sources(mylib PRIVATE src/helper.c)
target_include_directories(mylib PUBLIC include)
target_compile_options(mylib PRIVATE -fPIC)
target_link_libraries(mylib PRIVATE pthread)
set_target_properties(mylib PROPERTIES
    OUTPUT_NAME "mylib_v1"
    ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib"
    VERSION 1.0.0
    SOVERSION 1
)
target_link_libraries(myapp PRIVATE mylib)

# 自定义目标
add_custom_target(run_tests
    COMMAND ${CMAKE_BINARY_DIR}/bin/myprogram --test
    DEPENDS myapp
    COMMENT "Running tests"
)
```

### 3.2 最佳实践
- **命名清晰**：目标名称反映其功能。
- **范围控制**：使用 `PRIVATE`、`PUBLIC`、`INTERFACE` 明确依赖范围。
- **路径管理**：使用 `${CMAKE_*}` 变量确保跨平台兼容。

---

## 四、总结
CMake 的“一切皆目标”通过可执行目标、库目标和自定义目标的模块化配置，覆盖了从源文件到输出的所有构建需求。上述内容详细介绍了每种目标的创建、源文件、依赖、属性、编译链接和自定义命令，确保无一遗漏。无论是简单脚本还是复杂工程，这一体系都能提供强大支持。

如需更具体场景或进一步优化，请告诉我！
