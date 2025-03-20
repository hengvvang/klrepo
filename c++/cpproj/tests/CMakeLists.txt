# 使用说明：
# 1. 本文件用于配置单元测试的构建，生成测试可执行文件。
# 2. 添加GoogleTest或其他测试框架作为依赖。
# 3. 添加所有测试文件（如test_main.cpp、test_core.cpp）到add_executable()。
# 4. 链接GoogleTest和自定义库，确保测试可以访问库的功能。
# 5. 当添加新模块（如audio）时：
#    - 在tests/中添加对应的测试文件（如test_audio.cpp）。
#    - 在add_executable()中添加新测试文件。
#    - 在target_link_libraries()中链接新模块的库（如mylib_audio）。
# 6. 运行测试：ctest -C Debug --test-dir build

# 添加GoogleTest子目录（假设已下载到third_party/）
add_subdirectory(${CMAKE_SOURCE_DIR}/third_party/googletest googletest)

# 添加测试可执行文件，命名为tests
add_executable(tests
  # 测试框架入口文件
  test_main.cpp
  # 核心模块的测试文件
  test_core.cpp
  # 工具模块的测试文件
  test_utils.cpp
  # 数学模块的测试文件
  test_math.cpp
  # 图形模块的测试文件
  test_graphics.cpp
)

# 链接GoogleTest和自定义库（私有，仅对当前目标有效）
target_link_libraries(tests PRIVATE
  # GoogleTest主库
  gtest
  # GoogleTest测试入口库
  gtest_main
  # 核心库
  mylib_core
  # 工具库
  mylib_utils
  # 数学库
  mylib_math
  # 图形库
  mylib_graphics
)

# 添加测试目标，指定测试名称和运行命令
add_test(NAME unit_tests COMMAND tests)