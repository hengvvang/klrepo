# 使用说明：
# 1. 本文件用于配置自定义库的构建，生成静态库或动态库。
# 2. 为每个库（如mylib_core、mylib_utils）创建一个add_library()目标。
# 3. 指定头文件路径，确保其他模块或主程序能找到库的头文件。
# 4. 当添加新库（如mylib_audio）时：
#    - 创建新库的add_library()目标。
#    - 指定新库的头文件路径（target_include_directories）。
#    - 在src/CMakeLists.txt或tests/CMakeLists.txt中链接新库。
# 5. 使用PUBLIC关键字确保头文件路径对依赖库的目标可见。

# 添加核心库（静态库）
add_library(mylib_core STATIC
  # 核心库的实现文件
  mylib_core/mylib_core.cpp
)

# 指定核心库的头文件搜索路径（公开，对依赖库的目标可见）
target_include_directories(mylib_core PUBLIC
  # 公共头文件目录（include/），用于查找库的头文件
  ${CMAKE_SOURCE_DIR}/include
  # 当前库目录，用于查找库的私有头文件
  ${CMAKE_CURRENT_SOURCE_DIR}
)

# 添加工具库（静态库）
add_library(mylib_utils STATIC
  # 工具库的实现文件
  mylib_utils/mylib_utils.cpp
)

# 指定工具库的头文件搜索路径（公开，对依赖库的目标可见）
target_include_directories(mylib_utils PUBLIC
  # 公共头文件目录（include/），用于查找库的头文件
  ${CMAKE_SOURCE_DIR}/include
  # 当前库目录，用于查找库的私有头文件
  ${CMAKE_CURRENT_SOURCE_DIR}
)

# 添加数学库（静态库）
add_library(mylib_math STATIC
  # 数学库的实现文件
  mylib_math/mylib_math.cpp
)

# 指定数学库的头文件搜索路径（公开，对依赖库的目标可见）
target_include_directories(mylib_math PUBLIC
  # 公共头文件目录（include/），用于查找库的头文件
  ${CMAKE_SOURCE_DIR}/include
  # 当前库目录，用于查找库的私有头文件
  ${CMAKE_CURRENT_SOURCE_DIR}
)

# 添加图形库（静态库）
add_library(mylib_graphics STATIC
  # 图形库的实现文件
  mylib_graphics/mylib_graphics.cpp
)

# 指定图形库的头文件搜索路径（公开，对依赖库的目标可见）
target_include_directories(mylib_graphics PUBLIC
  # 公共头文件目录（include/），用于查找库的头文件
  ${CMAKE_SOURCE_DIR}/include
  # 当前库目录，用于查找库的私有头文件
  ${CMAKE_CURRENT_SOURCE_DIR}
)