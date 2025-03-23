# 使用说明：
# 1. 本文件用于配置源代码的构建，生成主程序的可执行文件。
# 2. 添加所有源文件（main.cpp和模块的.cpp文件）到add_executable()。
# 3. 指定头文件路径，确保编译器能找到头文件。
# 4. 链接自定义库，确保主程序可以使用库的功能。
# 5. 当添加新模块（如audio/）时：
#    - 在add_executable()中添加新模块的.cpp文件（如audio/audio.cpp）。
#    - 更新target_include_directories()（如果需要新头文件路径）。
# 6. 当添加新库时，在target_link_libraries()中添加新库名称。

# 添加可执行文件，指定项目名称（MyProject）及其源文件
add_executable(${PROJECT_NAME}
  # 主程序入口文件
  main.cpp
  # 核心模块的实现文件
  core/core.cpp
  # 工具模块的实现文件
  utils/utils.cpp
  # 数学模块的实现文件
  math/math.cpp
  # 图形模块的实现文件
  graphics/graphics.cpp
  # 网络模块的实现文件
  network/network.cpp
)

# 指定头文件搜索路径（私有，仅对当前目标有效）
target_include_directories(${PROJECT_NAME} PRIVATE
  # 源代码目录（src/），用于查找模块的头文件
  ${CMAKE_SOURCE_DIR}/src
  # 公共头文件目录（include/），用于查找库的头文件
  ${CMAKE_SOURCE_DIR}/include
)

# 链接自定义库（私有，仅对当前目标有效）
target_link_libraries(${PROJECT_NAME} PRIVATE
  # 核心库
  mylib_core
  # 工具库
  mylib_utils
  # 数学库
  mylib_math
  # 图形库
  mylib_graphics
)