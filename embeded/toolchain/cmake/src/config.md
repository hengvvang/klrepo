## CMake 配置项全解（优化版）

### 输出结构说明
- **一级模块**: 按功能划分为大类（如项目基本信息、目标配置等）。
- **二级分组**: 在每个模块内按子功能或逻辑分组（如“目标定义”和“目标属性”）。

---

### 1. 项目基本信息
定义项目的元数据和基本要求。

#### 1.1 项目元数据
##### `cmake_minimum_required`
- **作用**: 指定CMake最低版本。
- **语法**: `cmake_minimum_required(VERSION <major>.<minor>[.<patch>] [FATAL_ERROR])`
- **参数**:
  - `VERSION <major>.<minor>[.<patch>]`: 最低版本号。
    - `<major>`: 主版本（如 3）。
    - `<minor>`: 次版本（如 20）。
    - `<patch>`: 补丁版本（可选，如 1）。
  - `FATAL_ERROR`: 若版本不满足则报错（可选）。
- **场景**: 确保项目在支持的CMake版本上运行。
- **示例**: `cmake_minimum_required(VERSION 3.20 FATAL_ERROR)`

##### `project`
- **作用**: 定义项目名称、版本和语言。
- **语法**: `project(<name> [VERSION <major>.<minor>.<patch>.<tweak>] [DESCRIPTION <desc>] [HOMEPAGE_URL <url>] [LANGUAGES <lang1> <lang2> ...])`
- **参数**:
  - `<name>`: 项目名称（必填）。
  - `VERSION <major>.<minor>.<patch>.<tweak>`: 版本号。
    - `<major>`: 主版本。
    - `<minor>`: 次版本。
    - `<patch>`: 补丁版本。
    - `<tweak>`: 微调版本（可选）。
  - `DESCRIPTION <desc>`: 项目描述（可选）。
  - `HOMEPAGE_URL <url>`: 项目主页URL（可选，CMake 3.12+）。
  - `LANGUAGES <lang1> <lang2> ...`: 支持语言。
    - 选项: `C`, `CXX`, `Fortran`, `ASM`, `CUDA`, `Java`（默认 `C CXX`）。
- **场景**: 设置项目基本信息。
- **示例**: `project(MyApp VERSION 1.0.0 DESCRIPTION "Sample app" LANGUAGES CXX)`

#### 1.2 语言标准
##### `set(CMAKE_C_STANDARD)`
- **作用**: 设置C标准。
- **语法**: `set(CMAKE_C_STANDARD <version>)`
- **参数**:
  - `<version>`: C标准版本。
    - 选项: `90`, `99`, `11`, `17`。
- **场景**: 指定C代码编译标准。
- **示例**: `set(CMAKE_C_STANDARD 11)`

##### `set(CMAKE_C_STANDARD_REQUIRED)`
- **作用**: 是否强制C标准。
- **语法**: `set(CMAKE_C_STANDARD_REQUIRED <value>)`
- **参数**:
  - `<value>`: 是否强制。
    - 选项: `ON`（强制），`OFF`（不强制）。
- **场景**: 防止编译器使用其他标准。
- **示例**: `set(CMAKE_C_STANDARD_REQUIRED ON)`

##### `set(CMAKE_C_EXTENSIONS)`
- **作用**: 是否启用C编译器扩展。
- **语法**: `set(CMAKE_C_EXTENSIONS <value>)`
- **参数**:
  - `<value>`: 是否启用。
    - 选项: `ON`（启用），`OFF`（禁用）。
- **场景**: 控制C编译器扩展行为。
- **示例**: `set(CMAKE_C_EXTENSIONS OFF)`

##### `set(CMAKE_CXX_STANDARD)`
- **作用**: 设置C++标准。
- **语法**: `set(CMAKE_CXX_STANDARD <version>)`
- **参数**:
  - `<version>`: C++标准版本。
    - 选项: `98`, `11`, `14`, `17`, `20`, `23`。
- **场景**: 指定C++代码编译标准。
- **示例**: `set(CMAKE_CXX_STANDARD 17)`

##### `set(CMAKE_CXX_STANDARD_REQUIRED)`
- **作用**: 是否强制C++标准。
- **语法**: `set(CMAKE_CXX_STANDARD_REQUIRED <value>)`
- **参数**: 同上。
- **场景**: 确保C++标准一致性。
- **示例**: `set(CMAKE_CXX_STANDARD_REQUIRED ON)`

##### `set(CMAKE_CXX_EXTENSIONS)`
- **作用**: 是否启用C++编译器扩展。
- **语法**: `set(CMAKE_CXX_EXTENSIONS <value>)`
- **参数**: 同上。
- **场景**: 控制C++编译器扩展。
- **示例**: `set(CMAKE_CXX_EXTENSIONS OFF)`

#### 1.3 规律总结
- **命名**: 以 `CMAKE_` 开头，表示全局设置。
- **层级**: 从版本要求到语言标准，逐步细化。
- **一致性**: C和C++配置项对称设计。

---

### 2. 构建配置与输出路径
控制构建类型和文件输出。

#### 2.1 构建类型
##### `set(CMAKE_BUILD_TYPE)`
- **作用**: 指定构建类型。
- **语法**: `set(CMAKE_BUILD_TYPE <type>)`
- **参数**:
  - `<type>`: 构建类型。
    - 选项: `Debug`, `Release`, `RelWithDebInfo`, `MinSizeRel`。
- **场景**: 调试或优化构建。
- **示例**: `set(CMAKE_BUILD_TYPE Release)`

#### 2.2 输出路径
##### `set(CMAKE_RUNTIME_OUTPUT_DIRECTORY)`
- **作用**: 设置可执行文件输出路径。
- **语法**: `set(CMAKE_RUNTIME_OUTPUT_DIRECTORY <path>)`
- **参数**:
  - `<path>`: 输出目录（绝对或相对）。
- **场景**: 集中管理可执行文件。
- **示例**: `set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)`

##### `set(CMAKE_LIBRARY_OUTPUT_DIRECTORY)`
- **作用**: 设置动态库输出路径。
- **语法**: `set(CMAKE_LIBRARY_OUTPUT_DIRECTORY <path>)`
- **参数**: 同上。
- **场景**: 集中管理动态库。
- **示例**: `set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)`

##### `set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY)`
- **作用**: 设置静态库输出路径。
- **语法**: `set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY <path>)`
- **参数**: 同上。
- **场景**: 集中管理静态库。
- **示例**: `set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)`

##### `set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_<CONFIG>)`
- **作用**: 为特定构建配置设置可执行文件输出路径。
- **语法**: `set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_<CONFIG> <path>)`
- **参数**:
  - `<CONFIG>`: 配置类型（大写，如 `DEBUG`, `RELEASE`）。
  - `<path>`: 输出路径。
- **场景**: 区分不同构建类型的输出。
- **示例**: `set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG ${CMAKE_BINARY_DIR}/bin/debug)`

#### 2.3 规律总结
- **层次**: 全局路径和配置特定路径分层。
- **命名**: `CMAKE_*_OUTPUT_DIRECTORY` 统一表示输出路径。
- **扩展性**: 支持配置级别细化。

---

### 3. 目标管理
定义和管理构建目标。

#### 3.1 目标定义
##### `add_executable`
- **作用**: 创建可执行目标。
- **语法**: `add_executable(<name> [WIN32] [MACOSX_BUNDLE] [EXCLUDE_FROM_ALL] <source1> <source2> ...)`
- **参数**:
  - `<name>`: 目标名称。
  - `WIN32`: 生成Windows GUI程序（可选）。
  - `MACOSX_BUNDLE`: 生成macOS应用束（可选）。
  - `EXCLUDE_FROM_ALL`: 不包含在默认构建（可选）。
  - `<source1> <source2> ...`: 源文件列表。
- **场景**: 定义主程序。
- **示例**: `add_executable(MyApp src/main.cpp)`

##### `add_library`
- **作用**: 创建库目标。
- **语法**: `add_library(<name> [STATIC|SHARED|MODULE] [EXCLUDE_FROM_ALL] <source1> <source2> ...)`
- **参数**:
  - `<name>`: 库名称。
  - `STATIC`: 静态库。
  - `SHARED`: 动态库。
  - `MODULE`: 模块库（如插件）。
  - `EXCLUDE_FROM_ALL`: 不包含在默认构建（可选）。
  - `<source1> <source2> ...`: 源文件列表。
- **场景**: 创建可重用库。
- **示例**: `add_library(MyLib STATIC src/lib.cpp)`

#### 3.2 目标属性
##### `target_include_directories`
- **作用**: 为目标添加包含目录。
- **语法**: `target_include_directories(<target> [PUBLIC|PRIVATE|INTERFACE] <dir1> <dir2> ...)`
- **参数**:
  - `<target>`: 目标名称。
  - `PUBLIC`: 目标及其依赖可见。
  - `PRIVATE`: 仅目标可见。
  - `INTERFACE`: 仅依赖可见。
  - `<dir1> <dir2> ...`: 目录列表。
- **场景**: 指定头文件路径。
- **示例**: `target_include_directories(MyApp PUBLIC include)`

##### `target_link_directories`
- **作用**: 为目标添加链接目录。
- **语法**: `target_link_directories(<target> [PUBLIC|PRIVATE|INTERFACE] <dir1> <dir2> ...)`
- **参数**: 同上。
- **场景**: 指定库文件路径。
- **示例**: `target_link_directories(MyApp PRIVATE lib)`

##### `target_link_libraries`
- **作用**: 为目标链接库。
- **语法**: `target_link_libraries(<target> [PUBLIC|PRIVATE|INTERFACE] <lib1> <lib2> ...)`
- **参数**: 同上。
- **场景**: 链接依赖库。
- **示例**: `target_link_libraries(MyApp PRIVATE MyLib)`

##### `target_compile_options`
- **作用**: 为目标添加编译选项。
- **语法**: `target_compile_options(<target> [PUBLIC|PRIVATE|INTERFACE] <option1> <option2> ...)`
- **参数**: 同上。
- **场景**: 设置目标编译标志。
- **示例**: `target_compile_options(MyApp PRIVATE -Wall -O2)`

##### `target_compile_definitions`
- **作用**: 为目标添加预定义宏。
- **语法**: `target_compile_definitions(<target> [PUBLIC|PRIVATE|INTERFACE] <def1> <def2> ...)`
- **参数**: 同上。
- **场景**: 定义条件编译宏。
- **示例**: `target_compile_definitions(MyApp PUBLIC DEBUG_MODE)`

#### 3.3 规律总结
- **分组**: 目标定义和属性分离。
- **命名**: `target_*` 表示目标级配置。
- **作用域**: `PUBLIC`/`PRIVATE`/`INTERFACE` 贯穿属性设置。

---

### 4. 依赖管理
处理外部依赖和全局配置。

#### 4.1 外部依赖
##### `find_package`
- **作用**: 查找外部包。
- **语法**: `find_package(<name> [version] [EXACT] [QUIET] [REQUIRED] [COMPONENTS <comp1> <comp2> ...])`
- **参数**:
  - `<name>`: 包名称。
  - `<version>`: 版本号（可选）。
  - `EXACT`: 版本需完全匹配（可选）。
  - `QUIET`: 抑制警告（可选）。
  - `REQUIRED`: 找不到则报错（可选）。
  - `COMPONENTS <comp1> <comp2> ...`: 组件列表（可选）。
- **场景**: 集成第三方库。
- **示例**: `find_package(Boost 1.70 REQUIRED COMPONENTS filesystem)`

#### 4.2 全局配置（较老方式）
##### `include_directories`
- **作用**: 添加全局包含目录。
- **语法**: `include_directories([BEFORE|AFTER] <dir1> <dir2> ...)`
- **参数**:
  - `BEFORE`: 插入列表开头。
  - `AFTER`: 插入列表末尾（默认）。
  - `<dir1> <dir2> ...`: 目录列表。
- **场景**: 全局设置头文件路径。
- **示例**: `include_directories(BEFORE include)`

##### `link_directories`
- **作用**: 添加全局链接目录。
- **语法**: `link_directories([BEFORE|AFTER] <dir1> <dir2> ...)`
- **参数**: 同上。
- **场景**: 全局设置库路径。
- **示例**: `link_directories(AFTER lib)`

#### 4.3 规律总结
- **层次**: 从全局到模块化（`find_package` 更现代）。
- **命名**: 无前缀表示全局，`find_` 表示查找。
- **趋势**: 推荐目标级配置替代全局配置。

---

### 5. 逻辑控制
实现条件和动态配置。

#### 5.1 条件判断
##### `if`
- **作用**: 条件判断。
- **语法**: `if(<condition>) ... elseif(<condition>) ... else() ... endif()`
- **参数**:
  - `<condition>`: 条件表达式。
    - 支持: 变量、比较（`EQUAL`, `LESS`, `STREQUAL`）、逻辑（`AND`, `OR`）。
- **场景**: 根据条件调整配置。
- **示例**: `if(CMAKE_BUILD_TYPE STREQUAL "Debug") message("Debug mode") endif()`

#### 5.2 用户选项
##### `option`
- **作用**: 定义用户可配置选项。
- **语法**: `option(<name> "description" <value>)`
- **参数**:
  - `<name>`: 选项名称。
  - `"description"`: 描述文本。
  - `<value>`: 默认值（`ON` 或 `OFF`）。
- **场景**: 提供构建选项。
- **示例**: `option(ENABLE_TESTS "Enable tests" OFF)`

##### `set(... CACHE)`
- **作用**: 定义缓存变量。
- **语法**: `set(<name> <value> CACHE <type> "description" [FORCE])`
- **参数**:
  - `<name>`: 变量名。
  - `<value>`: 默认值。
  - `<type>`: 类型（`BOOL`, `STRING`, `PATH`, `FILEPATH`）。
  - `"description"`: 描述。
  - `FORCE`: 强制覆盖（可选）。
- **场景**: 设置可调整参数。
- **示例**: `set(INSTALL_DIR "/usr/local" CACHE PATH "Install path")`

#### 5.3 规律总结
- **功能**: 条件和选项分离。
- **命名**: 无特定前缀，逻辑清晰。
- **灵活性**: 支持动态配置。

---

### 6. 模块化管理
支持项目分解和复用。

#### 6.1 子目录
##### `add_subdirectory`
- **作用**: 添加子目录。
- **语法**: `add_subdirectory(<dir> [binary_dir] [EXCLUDE_FROM_ALL])`
- **参数**:
  - `<dir>`: 子目录路径。
  - `<binary_dir>`: 构建输出目录（可选）。
  - `EXCLUDE_FROM_ALL`: 不包含在默认构建（可选）。
- **场景**: 管理模块化项目。
- **示例**: `add_subdirectory(src/core)`

#### 6.2 文件包含
##### `include`
- **作用**: 包含外部CMake文件。
- **语法**: `include(<file> [OPTIONAL] [RESULT_VARIABLE <var>])`
- **参数**:
  - `<file>`: 文件路径。
  - `OPTIONAL`: 文件不存在不报错（可选）。
  - `RESULT_VARIABLE <var>`: 存储加载结果（可选）。
- **场景**: 复用配置。
- **示例**: `include(config.cmake OPTIONAL)`

#### 6.3 规律总结
- **命名**: `add_` 和 `include` 表示添加。
- **层次**: 子目录和文件包含互补。
- **模块化**: 支持大型项目分解。

---

### 7. 安装与打包
定义构建产物的安装规则。

#### 7.1 目标安装
##### `install(TARGETS)`
- **作用**: 安装目标文件。
- **语法**: `install(TARGETS <target1> <target2> ... [RUNTIME DESTINATION <dir>] [LIBRARY DESTINATION <dir>] [ARCHIVE DESTINATION <dir>])`
- **参数**:
  - `<target1> <target2> ...`: 目标列表。
  - `RUNTIME DESTINATION <dir>`: 可执行文件路径。
  - `LIBRARY DESTINATION <dir>`: 动态库路径。
  - `ARCHIVE DESTINATION <dir>`: 静态库路径。
- **场景**: 安装可执行文件或库。
- **示例**: `install(TARGETS MyApp RUNTIME DESTINATION bin)`

#### 7.2 文件和目录安装
##### `install(FILES)`
- **作用**: 安装指定文件。
- **语法**: `install(FILES <file1> <file2> ... DESTINATION <dir> [PERMISSIONS <perm>])`
- **参数**:
  - `<file1> <file2> ...`: 文件列表。
  - `DESTINATION <dir>`: 目标路径。
  - `PERMISSIONS <perm>`: 权限（`OWNER_READ`, `GROUP_WRITE` 等）。
- **场景**: 安装配置文件。
- **示例**: `install(FILES readme.txt DESTINATION doc)`

##### `install(DIRECTORY)`
- **作用**: 安装目录。
- **语法**: `install(DIRECTORY <dir1> <dir2> ... DESTINATION <dir> [FILES_MATCHING PATTERN <pattern>])`
- **参数**:
  - `<dir1> <dir2> ...`: 目录列表。
  - `DESTINATION <dir>`: 目标路径。
  - `FILES_MATCHING PATTERN <pattern>`: 文件匹配模式（如 `*.h`）。
- **场景**: 安装头文件目录。
- **示例**: `install(DIRECTORY include/ DESTINATION include FILES_MATCHING PATTERN "*.h")`

#### 7.3 规律总结
- **命名**: `install` 统一表示安装。
- **分组**: 目标和文件分离。
- **灵活性**: 支持细粒度控制。

---

### 8. 自定义与测试
扩展构建过程和测试支持。

#### 8.1 自定义命令
##### `add_custom_target`
- **作用**: 添加自定义目标。
- **语法**: `add_custom_target(<name> COMMAND <cmd> [DEPENDS <dep1> <dep2> ...] [WORKING_DIRECTORY <dir>])`
- **参数**:
  - `<name>`: 目标名称。
  - `COMMAND <cmd>`: 执行命令。
  - `DEPENDS <dep1> <dep2> ...`: 依赖项。
  - `WORKING_DIRECTORY <dir>`: 工作目录。
- **场景**: 执行额外任务。
- **示例**: `add_custom_target(Docs COMMAND make doc)`

##### `add_custom_command`
- **作用**: 为目标添加自定义命令。
- **语法**: `add_custom_command(TARGET <target> <PRE_BUILD|PRE_LINK|POST_BUILD> COMMAND <cmd>)`
- **参数**:
  - `<target>`: 目标名称。
  - `PRE_BUILD`: 构建前。
  - `PRE_LINK`: 链接前。
  - `POST_BUILD`: 构建后。
  - `COMMAND <cmd>`: 执行命令。
- **场景**: 插入构建步骤。
- **示例**: `add_custom_command(TARGET MyApp POST_BUILD COMMAND echo "Done")`

#### 8.2 测试支持
##### `enable_testing`
- **作用**: 启用测试支持。
- **语法**: `enable_testing()`
- **参数**: 无。
- **场景**: 初始化测试框架。
- **示例**: `enable_testing()`

##### `add_test`
- **作用**: 添加测试。
- **语法**: `add_test(NAME <name> COMMAND <cmd> [WORKING_DIRECTORY <dir>])`
- **参数**:
  - `NAME <name>`: 测试名称。
  - `COMMAND <cmd>`: 测试命令。
  - `WORKING_DIRECTORY <dir>`: 工作目录（可选）。
- **场景**: 定义单元测试。
- **示例**: `add_test(NAME UnitTest COMMAND MyTest)`

#### 8.3 规律总结
- **命名**: `add_` 表示添加动作。
- **分组**: 自定义和测试分离。
- **扩展性**: 支持复杂构建流程。

---

### 9. 编译器与平台
控制编译器和平台行为。

#### 9.1 编译器选择
##### `set(CMAKE_C_COMPILER)`
- **作用**: 指定C编译器。
- **语法**: `set(CMAKE_C_COMPILER <compiler>)`
- **参数**:
  - `<compiler>`: 编译器路径或名称（如 `gcc`）。
- **场景**: 使用特定C编译器。
- **示例**: `set(CMAKE_C_COMPILER /usr/bin/gcc)`

##### `set(CMAKE_CXX_COMPILER)`
- **作用**: 指定C++编译器。
- **语法**: `set(CMAKE_CXX_COMPILER <compiler>)`
- **参数**: 同上。
- **场景**: 使用特定C++编译器。
- **示例**: `set(CMAKE_CXX_COMPILER /usr/bin/g++)`

#### 9.2 编译标志
##### `set(CMAKE_C_FLAGS)`
- **作用**: 设置全局C编译标志。
- **语法**: `set(CMAKE_C_FLAGS "<flags>")`
- **参数**:
  - `<flags>`: 编译选项字符串。
- **场景**: 设置C编译选项。
- **示例**: `set(CMAKE_C_FLAGS "-Wall")`

##### `set(CMAKE_CXX_FLAGS)`
- **作用**: 设置全局C++编译标志。
- **语法**: `set(CMAKE_CXX_FLAGS "<flags>")`
- **参数**: 同上。
- **场景**: 设置C++编译选项。
- **示例**: `set(CMAKE_CXX_FLAGS "-Wall -O2")`

##### `set(CMAKE_C_FLAGS_<CONFIG>)`
- **作用**: 为特定配置设置C编译标志。
- **语法**: `set(CMAKE_C_FLAGS_<CONFIG> "<flags>")`
- **参数**:
  - `<CONFIG>`: 配置类型（如 `DEBUG`, `RELEASE`）。
  - `<flags>`: 编译选项。
- **场景**: 区分C编译标志。
- **示例**: `set(CMAKE_C_FLAGS_DEBUG "-g")`

##### `set(CMAKE_CXX_FLAGS_<CONFIG>)`
- **作用**: 为特定配置设置C++编译标志。
- **语法**: `set(CMAKE_CXX_FLAGS_<CONFIG> "<flags>")`
- **参数**: 同上。
- **场景**: 区分C++编译标志。
- **示例**: `set(CMAKE_CXX_FLAGS_RELEASE "-O3")`

#### 9.3 规律总结
- **命名**: `CMAKE_*_COMPILER` 和 `CMAKE_*_FLAGS` 分工明确。
- **层次**: 编译器和标志分离。
- **对称性**: C和C++配置对称。

---

## 复杂项目示例
（结构同前，优化根 `CMakeLists.txt`）

### 根 `CMakeLists.txt`
```cmake
cmake_minimum_required(VERSION 3.20 FATAL_ERROR)
project(ComplexApp VERSION 1.0.0 DESCRIPTION "A complex app" LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

set(CMAKE_BUILD_TYPE Release)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)

option(ENABLE_LOGGING "Enable logging" ON)
set(CMAKE_CXX_FLAGS "-Wall" CACHE STRING "Global CXX flags" FORCE)

if(ENABLE_LOGGING)
  find_package(spdlog REQUIRED)
endif()

add_subdirectory(src/core)
add_subdirectory(src/utils)
add_subdirectory(tests)

add_executable(ComplexApp src/main.cpp)
target_include_directories(ComplexApp PUBLIC src)
target_link_libraries(ComplexApp PRIVATE Core Utils)
if(ENABLE_LOGGING)
  target_link_libraries(ComplexApp PRIVATE spdlog::spdlog)
endif()
target_compile_definitions(ComplexApp PRIVATE APP_VERSION="${PROJECT_VERSION}")

install(TARGETS ComplexApp RUNTIME DESTINATION bin)
install(DIRECTORY src/ DESTINATION include FILES_MATCHING PATTERN "*.h")

add_custom_target(GenerateData COMMAND python3 ${CMAKE_SOURCE_DIR}/scripts/generate_data.py)
add_dependencies(ComplexApp GenerateData)
```

---

## 总体规律总结
1. **命名规则**:
   - `CMAKE_` 前缀: 全局配置。
   - `target_` 前缀: 目标属性。
   - `add_` 前缀: 添加目标或动作。
2. **模块化**:
   - 配置项按功能分组，支持从全局到目标的细化。
3. **作用域**:
   - `PUBLIC` / `PRIVATE` / `INTERFACE` 贯穿目标配置。
4. **路径管理**:
   - 输出和安装路径支持变量（如 `${CMAKE_BINARY_DIR}`）。
5. **扩展性**:
   - 通过 `find_package` 和 `add_subdirectory` 集成外部资源。
