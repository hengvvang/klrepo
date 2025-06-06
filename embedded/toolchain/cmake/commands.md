# CMake 终端命令按功能分类

CMake 的终端命令通过 `cmake` 可执行文件调用，主要用于配置、生成、构建、安装和管理项目。
以下是按功能的逻辑分类：

1. **项目配置与生成命令**
   用于初始化项目、生成构建系统文件。
   - `cmake -S <source-dir> -B <build-dir>`
   - `cmake -G <generator>`
   - `cmake -D <var>=<value>`
   - `cmake -C <initial-cache>`
   - `cmake -U <var>`
   - `cmake --preset <preset>`

2. **构建与安装命令**
   用于执行构建和安装目标。
   - `cmake --build <build-dir>`
   - `cmake --install <build-dir>`
   - `cmake --open <build-dir>`

3. **查询与调试命令**
   用于获取帮助、版本信息或调试。
   - `cmake --help`
   - `cmake --version`
   - `cmake --find-package`

4. **文件与环境操作命令**
   通过 `-E` 提供跨平台工具集。
   - `cmake -E <command>`

---

### 二、详细命令说明

以下是每个命令的详细介绍，按功能分类逻辑展开，包含所有子命令和选项。

#### 1. 项目配置与生成命令
这些命令用于设置项目环境、生成构建系统，是 CMake 工作流的核心。

##### 1.1 `cmake -S <source-dir> -B <build-dir>`
- **功能**：从源目录配置项目并生成构建系统到指定目录。
- **语法**：
  ```
  cmake -S <source-dir> -B <build-dir> [options]
  ```
- **选项**：
  - `-S <source-dir>`：源目录路径（含 `CMakeLists.txt`）。
  - `-B <build-dir>`：构建目录路径（输出生成文件）。
  - `-G <generator>`：指定生成器（见 1.2）。
  - `-D <var>=<value>`：定义缓存变量（见 1.3）。
  - `-C <initial-cache>`：加载缓存文件（见 1.4）。
  - `-U <var>`：删除缓存变量（见 1.5）。
  - `-A <platform>`：指定平台（如 `x64`，仅限 Visual Studio）。
  - `-Wdev` / `-Wno-dev`：启用/禁用开发者警告。
  - `--fresh`：清除缓存并重新配置（3.24+）。
  - `--preset <preset>`：使用预设配置（见 1.6）。
- **使用场景**：初始化新项目或更新配置。
- **示例**：
  ```bash
  # 基本配置
  cmake -S . -B build

  # 指定生成器和变量
  cmake -S src -B build -G "Ninja" -DCMAKE_BUILD_TYPE=Release
  ```
- **逻辑说明**：`-S` 和 `-B` 是现代 CMake 的推荐方式，明确分离源代码和构建输出。

##### 1.2 `cmake -G <generator>`
- **功能**：指定构建系统生成器。
- **语法**：
  ```
  cmake -G <generator> [options] <source-dir>
  ```
- **常用生成器**：
  - `"Unix Makefiles"`：生成 Makefile（Linux/Unix）。
  - `"Ninja"`：生成 Ninja 文件（跨平台）。
  - `"Visual Studio 17 2022"`：生成 VS 2022 项目。
  - `"Xcode"`：生成 Xcode 项目（macOS）。
- **选项**：
  - `-A <platform>`：指定架构（如 `Win32`、`x64`）。
  - `-T <toolset>`：指定工具集（如 `v143`，Visual Studio）。
- **使用场景**：选择适合平台的构建工具。
- **示例**：
  ```bash
  # 使用 Ninja
  cmake -G "Ninja" -S . -B build

  # 使用 VS 2022，x64 架构
  cmake -G "Visual Studio 17 2022" -A x64 -S . -B build
  ```
- **逻辑说明**：生成器决定后续构建工具，运行 `cmake --help` 可查看本地支持的生成器。

##### 1.3 `cmake -D <var>=<value>`
- **功能**：设置或修改缓存变量。
- **语法**：
  ```
  cmake -D <var>=<value> [options] -S <source-dir> -B <build-dir>
  ```
- **选项**：可多次使用 `-D` 设置多个变量。
- **使用场景**：自定义构建选项（如编译器标志、安装路径）。
- **示例**：
  ```bash
  # 设置单个变量
  cmake -D CMAKE_BUILD_TYPE=Debug -S . -B build

  # 设置多个变量
  cmake -D CMAKE_CXX_COMPILER=g++ -D MY_OPTION=ON -S . -B build
  ```
- **逻辑说明**：变量存储在 `CMakeCache.txt`，影响配置行为。

##### 1.4 `cmake -C <initial-cache>`
- **功能**：加载初始缓存文件。
- **语法**：
  ```
  cmake -C <initial-cache> -S <source-dir> -B <build-dir>
  ```
- **选项**：`<initial-cache>` 是 `.cmake` 文件，含变量定义。
- **使用场景**：批量设置变量，避免多次 `-D`。
- **示例**：
  ```bash
  # 加载 mycache.cmake
  cmake -C mycache.cmake -S . -B build
  # mycache.cmake 示例：
  # set(CMAKE_BUILD_TYPE "Release" CACHE STRING "")
  ```
- **逻辑说明**：补充 `-D`，适合复杂项目。

##### 1.5 `cmake -U <var>`
- **功能**：删除缓存中的变量。
- **语法**：
  ```
  cmake -U <var> -S <source-dir> -B <build-dir>
  ```
- **选项**：支持通配符（如 `"CMAKE_*"`）。
- **使用场景**：重置错误配置。
- **示例**：
  ```bash
  # 删除单个变量
  cmake -U CMAKE_BUILD_TYPE -S . -B build

  # 删除匹配变量
  cmake -U "MY_*" -S . -B build
  ```
- **逻辑说明**：与 `-D` 配合使用，确保缓存干净。

##### 1.6 `cmake --preset <preset>`
- **功能**：使用预设配置（3.19+）。
- **语法**：
  ```
  cmake --preset <preset> [options]
  ```
- **选项**：
  - `<preset>`：预设名称，定义在 `CMakePresets.json` 中。
  - `--list-presets`：列出可用预设。
- **使用场景**：简化复杂配置。
- **示例**：
  ```bash
  # 使用 debug 预设
  cmake --preset debug

  # 列出预设
  cmake --list-presets
  # CMakePresets.json 示例：
  # {
  #   "version": 3,
  #   "configurePresets": [
  #     {"name": "debug", "generator": "Ninja", "binaryDir": "build/debug"}
  #   ]
  # }
  ```
- **逻辑说明**：预设整合 `-S`、`-B`、`-G` 等，适合团队协作。

#### 2. 构建与安装命令
这些命令用于执行构建和部署成果。

##### 2.1 `cmake --build <build-dir>`
- **功能**：执行构建。
- **语法**：
  ```
  cmake --build <build-dir> [options]
  ```
- **选项**：
  - `<build-dir>`：构建目录。
  - `--target <target>`：指定目标（如 `all`、`clean`）。
  - `--config <cfg>`：指定配置（如 `Debug`、`Release`）。
  - `-j <n>`：并行任务数。
  - `--verbose`：显示详细输出。
  - `--clean-first`：先清理再构建。
- **使用场景**：编译项目。
- **示例**：
  ```bash
  # 构建所有目标
  cmake --build build

  # 构建特定目标，4 个并行任务
  cmake --build build --target myapp -j 4 --config Release
  ```
- **逻辑说明**：调用底层工具（如 `make` 或 `ninja`），抽象化构建过程。

##### 2.2 `cmake --install <build-dir>`
- **功能**：执行安装。
- **语法**：
  ```
  cmake --install <build-dir> [options]
  ```
- **选项**：
  - `<build-dir>`：构建目录。
  - `--prefix <path>`：安装前缀。
  - `--config <cfg>`：指定配置。
  - `--component <comp>`：指定组件。
  - `--strip`：剥离调试符号。
- **使用场景**：部署构建成果。
- **示例**：
  ```bash
  # 默认安装
  cmake --install build

  # 指定前缀和配置
  cmake --install build --prefix /usr/local --config Release
  ```
- **逻辑说明**：依赖 `CMakeLists.txt` 中的 `install()` 规则。

##### 2.3 `cmake --open <build-dir>`
- **功能**：打开构建目录中的项目文件。
- **语法**：
  ```
  cmake --open <build-dir>
  ```
- **使用场景**：快速启动 IDE（如 Visual Studio）。
- **示例**：
  ```bash
  cmake --open build
  ```
- **逻辑说明**：仅对支持的生成器（如 VS、Xcode）有效。

#### 3. 查询与调试命令
这些命令用于获取信息或调试。

##### 3.1 `cmake --help`
- **功能**：显示帮助信息。
- **语法**：
  ```
  cmake --help [topic]
  ```
- **子命令**：
  - 无参数：列出所有选项。
  - `--help-command <cmd>`：查看命令详情。
  - `--help-variable <var>`：查看变量详情。
  - `--help-module <mod>`：查看模块详情。
  - `--help-property <prop>`：查看属性详情。
- **使用场景**：学习和调试。
- **示例**：
  ```bash
  # 基本帮助
  cmake --help

  # 查看 if 命令
  cmake --help-command if
  ```
- **逻辑说明**：提供全面的参考资料。

##### 3.2 `cmake --version`
- **功能**：显示 CMake 版本。
- **语法**：
  ```
  cmake --version
  ```
- **使用场景**：确认安装版本。
- **示例**：
  ```bash
  cmake --version
  # 输出: cmake version 3.28.1
  ```
- **逻辑说明**：简单但必要。

##### 3.3 `cmake --find-package`
- **功能**：以包查找模式运行（用于脚本）。
- **语法**：
  ```
  cmake --find-package -D <var>=<value> [options]
  ```
- **选项**：
  - `-D NAME=<pkg>`：包名。
  - `-D COMPILER_ID=<id>`：编译器 ID。
- **使用场景**：测试 `find_package()`。
- **示例**：
  ```bash
  cmake --find-package -D NAME=Boost -D COMPILER_ID=GNU
  ```
- **逻辑说明**：模拟 `CMakeLists.txt` 中的包查找。

#### 4. 文件与环境操作命令
通过 `-E` 提供跨平台工具。

##### 4.1 `cmake -E <command>`
- **功能**：执行内置工具命令。
- **语法**：
  ```
  cmake -E <command> [args]
  ```
- **子命令**：
  - `capabilities`：显示 CMake 能力。
  - `chdir <dir> <cmd>`：切换目录并执行命令。
  - `copy <src> <dst>`：复制文件。
  - `copy_directory <src> <dst>`：复制目录。
  - `create_symlink <old> <new>`：创建符号链接。
  - `echo <text>`：打印文本。
  - `env <var>=<value> <cmd>`：设置环境变量并执行。
  - `make_directory <dir>`：创建目录。
  - `remove <file>`：删除文件。
  - `remove_directory <dir>`：删除目录。
  - `rename <old> <new>`：重命名文件。
  - `time <cmd>`：测量命令时间。
  - `touch <file>`：更新文件时间戳。
- **使用场景**：脚本中文件操作。
- **示例**：
  ```bash
  # 复制文件
  cmake -E copy source.txt dest.txt

  # 创建目录
  cmake -E make_directory mydir

  # 测量时间
  cmake -E time ls
  ```
- **逻辑说明**：`-E` 是独立的工具集，跨平台通用。
