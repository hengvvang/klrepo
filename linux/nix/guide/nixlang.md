Nix 语言是一种专为 Nix 包管理器设计的领域特定语言（DSL），用于声明软件包的构建过程和系统配置。它是纯函数式、惰性求值、动态类型的编程语言，语法简洁但功能强大，专注于描述软件包的依赖和构建逻辑。以下是 Nix 语言语法的详细说明，涵盖其基本结构、数据类型、表达式、函数、控制结构等，并尽量保持清晰和系统化。

---

### 1. **Nix 语言概述**
- **特性**：
  - **纯函数式**：无副作用，相同的输入总是产生相同的输出。
  - **惰性求值**：表达式只有在需要时才被求值，优化性能。
  - **动态类型**：类型在运行时检查，无需显式类型声明。
  - **领域特定**：主要用于描述软件包构建、依赖管理和系统配置。
- **用途**：
  - 定义软件包（通过 `derivation` 函数）。
  - 配置 NixOS 系统（通过模块系统）。
  - 创建开发环境（通过 `shell.nix`）。
- **交互式调试**：
  - 使用 `nix repl` 命令进入交互式环境，测试表达式：
    ```bash
    $ nix repl
    nix-repl> 1 + 2
    3
    ```

---

### 2. **基本语法规则**
- **表达式**：Nix 语言的核心是表达式，没有传统意义上的“语句”。整个程序是一个大表达式，由子表达式组成。
- **不可变性**：所有值（包括变量绑定）都是不可变的，一旦定义不可修改。
- **注释**：
  - 单行注释：`# 这是单行注释`
  - 多行注释：`/* 这是多行注释 */`
- **标识符**：
  - 由字母、数字、下划线 `_`、连字符 `-` 组成。
  - 示例：`myVar`, `package-name`, `foo_bar`。
  - 连字符在标识符中是合法的，这与其他语言不同。[](https://anillc.cn/2022/08/27/nix-lang-tutorial/)
- **分隔符**：
  - 属性集使用分号 `;` 分隔键值对（类似 JSON 的逗号 `,`）。[](https://io.bhe.ink/2023/06/17/Getting-Started-with-Nix-Language-A-Beginner-s-Guide/)
  - 列表元素之间用空格分隔，无需逗号。

---

### 3. **数据类型**
Nix 语言支持以下基本数据类型，所有类型都是动态类型：

#### 3.1 **基本类型**
- **整数**（Integer）：如 `42`, `-10`。
- **浮点数**（Float）：如 `3.14`, `-0.001`。
- **布尔值**（Boolean）：`true`, `false`。
- **字符串**（String）：
  - 用双引号括起来：`"hello world"`。
  - 支持字符串插值：`${expression}`，如：
    ```nix
    let name = "Alice"; in "Hello, ${name}!"  # 输出 "Hello, Alice!"
    ```
  - 多行字符串（Indented String）：
    - 使用双单引号 `''` 包裹，支持缩进自动剥离：
      ```nix
      ''
        Hello,
        World!
      ''
      # 输出 "Hello,\nWorld!\n"
      ```
- **空值**（Null）：`null`，表示无值。
- **路径**（Path）：
  - 表示文件系统路径，独立于字符串类型。
  - 语法：
    - 相对路径：`./file.nix`, `../dir`。
    - 绝对路径：`/home/user/file`。
    - 特殊路径：`<nixpkgs>`（依赖 `NIX_PATH` 环境变量解析）。
  - 示例：
    ```nix
    ./myfile  # 相对路径
    /etc/nixos  # 绝对路径
    ```
  - 路径会被 Nix 转换为 `/nix/store` 中的唯一路径。[](https://nixos-cn.org/tutorials/lang/QuickOverview.html)

#### 3.2 **复合类型**
- **列表**（List）：
  - 用方括号 `[]` 包裹，元素以空格分隔。
  - 元素可以是任意类型，动态长度。
  - 示例：
    ```nix
    [ 1 "two" true [ 4 5 ] ]
    ```
  - 访问：使用 `builtins.elemAt` 函数，如 `builtins.elemAt [1 2 3] 0` 返回 `1`。
- **属性集**（Attribute Set）：
  - 类似 JSON 对象，用花括号 `{}` 包裹，键值对以分号 `;` 分隔。
  - 键是标识符或字符串，值是任意表达式。
  - 示例：
    ```nix
    {
      name = "Alice";
      age = 30;
      nested = { x = 1; };
    }
    ```
  - 访问：
    - 点号语法：`set.name`。
    - 动态访问：`set."${key}"`。
  - 动态键：
    ```nix
    let key = "name"; in { "${key}" = "Bob"; }  # { name = "Bob"; }
    ```
- **函数**（Function）：
  - 函数是一等公民，可作为值传递、返回或赋值。
  - 语法：`param: body` 或 `{ param1, param2 }: body`。
  - 示例：
    ```nix
    x: x + 1  # 接收 x，返回 x + 1
    { a, b }: a + b  # 接收属性集 { a, b }，返回 a + b
    ```

#### 3.3 **特殊类型**
- **推导**（Derivation）：
  - 通过内置函数 `derivation` 创建，表示一个构建任务。
  - 示例：
    ```nix
    derivation {
      name = "my-package";
      system = "x86_64-linux";
      builder = "/bin/sh";
      args = [ "-c" "echo hello > $out" ];
    }
    ```
  - 推导是 Nix 的核心，用于定义软件包的构建过程。[](https://www.rectcircle.cn/posts/nix-3-nix-dsl/)
- **Lambda** 和 **PrimOp**：
  - 函数分为用户定义的 Lambda（如 `x: x + 1`）和内置的 PrimOp（由 C++ 实现，如 `builtins.toString`）。[](https://nixos-cn.org/tutorials/lang/QuickOverview.html)

---

### 4. **表达式**
Nix 程序由表达式组成，表达式可以嵌套，最终求值为一个值。

#### 4.1 **基本表达式**
- 字面量：如 `42`, `"hello"`, `true`, `[ 1 2 3 ]`, `{ x = 1; }`。
- 标识符：如 `myVar`, `package-name`。
- 路径：如 `./file.nix`, `<nixpkgs>`。

#### 4.2 **操作符**
Nix 支持以下操作符，按优先级从高到低排列：

| 操作符          | 描述                              | 示例                     |
|-----------------|-----------------------------------|--------------------------|
| `.`             | 属性访问                          | `set.name`               |
| `?`             | 检查属性是否存在                  | `set ? "name"`           |
| `++`            | 列表拼接                          | `[ 1 2 ] ++ [ 3 4 ]`     |
| `*`, `/`, `%`   | 算术运算                          | `4 * 2`, `10 / 3`        |
| `+`, `-`        | 算术运算或字符串拼接              | `1 + 2`, `"a" + "b"`     |
| `!`             | 逻辑非                            | `!true`                  |
| `==`, `!=`      | 相等性比较                        | `1 == 1`, `"a" != "b"`   |
| `<`, `>`, `<=`, `>=` | 比较运算                     | `1 < 2`                  |
| `&&`, `||`      | 逻辑与、或                        | `true && false`          |
| `->`            | 逻辑蕴含                          | `true -> false`          |
| `//`            | 属性集合并（右边覆盖左边）        | `{ a = 1; } // { a = 2; }` |

- **注意**：
  - 字符串拼接使用 `+`，如 `"hello" + "world"`。
  - 属性集合并 `//` 会覆盖同名键，右边优先。

#### 4.3 **函数调用**
- 语法：`function argument` 或 `function { key = value; }`。
- 示例：
  ```nix
  let
    add = x: y: x + y;
    sum = { a, b }: a + b;
  in
    [ (add 1 2) (sum { a = 1; b = 2; }) ]
  # 输出 [ 3 3 ]
  ```

#### 4.4 **let 表达式**
- 用于定义局部绑定，语法：
  ```nix
  let
    name = value;
    ...
  in
    expression
  ```
- 示例：
  ```nix
  let
    x = 1;
    y = 2;
  in
    x + y  # 输出 3
  ```
- 绑定是不可变的，类似数学中的“定义”而非变量赋值。[](https://nixos-cn.org/tutorials/lang/QuickOverview.html)

#### 4.5 **with 表达式**
- 将属性集的键引入当前作用域，简化访问。
- 语法：
  ```nix
  with set; expression
  ```
- 示例：
  ```nix
  let
    pkgs = { a = 1; b = 2; };
  in
    with pkgs; a + b  # 输出 3
  ```
- **注意**：过度使用 `with` 可能降低代码可读性。

#### 4.6 **if 表达式**
- 条件表达式，必须有 `else` 分支（因为 Nix 要求所有表达式有值）。
- 语法：
  ```nix
  if condition then expression1 else expression2
  ```
- 示例：
  ```nix
  let x = 5; in
  if x > 0 then "positive" else "non-positive"  # 输出 "positive"
  ```

#### 4.7 **assert 表达式**
- 用于运行时断言，语法：
  ```nix
  assert condition; expression
  ```
- 示例：
  ```nix
  assert 1 < 2; "ok"  # 输出 "ok"
  assert 1 > 2; "ok"  # 抛出错误
  ```

#### 4.8 **inherit 表达式**
- 用于从其他作用域引入绑定，简化属性集定义。
- 语法：
  ```nix
  inherit name;
  inherit (set) name1 name2;
  ```
- 示例：
  ```nix
  let
    x = 1;
    pkgs = { a = 2; b = 3; };
  in
    {
      inherit x;
      inherit (pkgs) a b;
    }  # 输出 { x = 1; a = 2; b = 3; }
  ```

#### 4.9 **import 表达式**
- 导入其他 Nix 文件的求值结果。
- 语法：
  ```nix
  import path
  ```
- 示例：
  ```nix
  import ./file.nix  # 导入 file.nix 的内容
  import <nixpkgs>   # 导入 NIX_PATH 中的 nixpkgs
  ```
- 如果路径是目录，自动加载 `default.nix`。[](https://nixos-cn.org/tutorials/lang/QuickOverview.html)

---

### 5. **函数**
Nix 的函数是核心特性，支持以下定义方式：

#### 5.1 **单参数函数**
- 语法：`param: body`。
- 示例：
  ```nix
  x: x * 2  # 接收 x，返回 x * 2
  (x: x * 2) 3  # 输出 6
  ```

#### 5.2 **多参数函数（Currying）**
- Nix 使用柯里化（Currying）实现多参数函数。
- 语法：`x: y: body`（等价于 `x: (y: body)`）。
- 示例：
  ```nix
  x: y: x + y
  (x: y: x + y) 1 2  # 输出 3
  ```

#### 5.3 **属性集参数函数**
- 接收属性集作为参数，语法：`{ param1, param2, ... }: body`。
- 示例：
  ```nix
  { a, b }: a + b
  ({ a, b }: a + b) { a = 1; b = 2; }  # 输出 3
  ```
- **参数校验**：Nix 会检查属性集是否包含所有必需的键，缺少或多余的键会报错。
- **默认值**：
  ```nix
  { a, b ? 0 }: a + b
  ({ a, b ? 0 }: a + b) { a = 1; }  # 输出 1
  ```
- **可变参数**：使用 `...` 接受额外参数：
  ```nix
  { a, ... }: a
  ({ a, ... }: a) { a = 1; b = 2; }  # 输出 1
  ```

#### 5.4 **函数作为值**
- 函数可以赋值、传递或作为返回值。
- 示例：
  ```nix
  let
    makeAdder = x: (y: x + y);
  in
    (makeAdder 5) 3  # 输出 8
  ```

---

### 6. **内置函数和操作**
Nix 提供大量内置函数（PrimOps），通过 `builtins` 属性集访问。常用函数包括：

- **类型转换**：
  - `builtins.toString`: 将值转换为字符串，如 `builtins.toString 42` 返回 `"42"`。
  - `builtins.toJSON`: 将值转换为 JSON 字符串。
- **列表操作**：
  - `builtins.length`: 返回列表长度，如 `builtins.length [1 2 3]` 返回 `3`。
  - `builtins.elemAt`: 访问列表元素，如 `builtins.elemAt [1 2 3] 1` 返回 `2`。
  - `builtins.concatLists`: 合并列表，如 `builtins.concatLists [[1] [2 3]]` 返回 `[1 2 3]`。
- **属性集操作**：
  - `builtins.attrNames`: 返回属性集的键列表，如 `builtins.attrNames { a = 1; b = 2; }` 返回 `["a" "b"]`。
  - `builtins.hasAttr`: 检查键是否存在，如 `builtins.hasAttr "a" { a = 1; }` 返回 `true`。
- **文件系统**：
  - `builtins.readFile`: 读取文件内容，如 `builtins.readFile ./file.txt`。
  - `builtins.fetchurl`: 下载 URL 内容。
- **推导相关**：
  - `derivation`: 创建推导，定义构建任务。
  - `builtins.storePath`: 引用 `/nix/store` 中的路径。

完整内置函数列表见官方文档：https://nixos.org/manual/nix/stable/language/builtins.html。[](https://io.bhe.ink/2023/06/17/Getting-Started-with-Nix-Language-A-Beginner-s-Guide/)

---

### 7. **模块系统**
NixOS 使用模块系统组织配置，模块是特殊的 Nix 文件，包含以下部分：
- **imports**: 导入其他模块，如 `imports = [ ./module.nix ];`。
- **options**: 声明配置选项，如：
  ```nix
  options.myOption = mkOption {
    type = types.bool;
    default = false;
    description = "Enable my feature";
  };
  ```
- **config**: 定义配置行为，如：
  ```nix
  config = mkIf config.myOption.enable {
    environment.systemPackages = [ pkgs.vim ];
  };
  ```
- 示例：
  ```nix
  {
    imports = [ ./other.nix ];
    options.myModule.enable = mkOption { type = types.bool; default = false; };
    config = mkIf config.myModule.enable {
      systemd.services.myService = { ... };
    };
  }
  ```

模块系统是 NixOS 配置的核心，允许声明式和可重用的系统配置。[](https://nixos-cn.org/tutorials/module-system/intro.html)

---

### 8. **惰性求值**
- Nix 只在需要时计算表达式，未使用的绑定不会被求值。
- 示例：
  ```nix
  let
    a = abort "never called";  # 不会执行
    b = "hello";
  in
    b  # 输出 "hello"
  ```
- 惰性求值提高性能，尤其在处理大型 `nixpkgs` 时。[](https://www.rectcircle.cn/posts/nix-3-nix-dsl/)

---

### 9. **纯函数性**
- Nix 语言的所有操作都是纯函数式的，无副作用。
- 文件系统和网络操作通过 `/nix/store` 的哈希机制间接实现纯函数性：
  - 输入路径被复制到 `/nix/store`，生成唯一哈希。
  - 输出路径基于输入和构建逻辑生成，确保可重现性。[](https://www.rectcircle.cn/posts/nix-3-nix-dsl/)

---

### 10. **常见模式和惯例**
- **属性集解构**：
  ```nix
  { config, pkgs, ... }: {
    environment.systemPackages = [ pkgs.vim ];
  }
  ```
- **flake.nix**：
  - Nix Flakes 是现代 Nix 的标准，结构如下：
    ```nix
    {
      inputs = {
        nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
      };
      outputs = { self, nixpkgs, ... }: {
        nixosConfigurations.mySystem = nixpkgs.lib.nixosSystem {
          system = "x86_64-linux";
          modules = [ ./configuration.nix ];
        };
      };
    }
    ```
- **shell.nix**：
  - 定义开发环境：
    ```nix
    { pkgs ? import <nixpkgs> {} }:
    pkgs.mkShell {
      buildInputs = [ pkgs.python3 pkgs.nodejs ];
    }
    ```

---

### 11. **错误处理**
- Nix 没有传统的异常处理，使用 `abort` 或 `throw` 终止执行：
  ```nix
  builtins.throw "Something went wrong!"  # 抛出错误
  abort "Fatal error"  # 终止求值
  ```
- 断言（`assert`）用于运行时检查：
  ```nix
  assert x > 0; x * 2
  ```

---

### 12. **学习资源**
- 官方文档：
  - Nix 语言基础：https://nix.dev/tutorials/nix-language[](https://nix.dev/tutorials/nix-language.html)
  - Nix 手册：https://nixos.org/manual/nix/stable/language/index.html[](https://io.bhe.ink/2023/06/17/Getting-Started-with-Nix-Language-A-Beginner-s-Guide/)
  - Nix Pills：https://nixos.org/guides/nix-pills/
- 社区资源：
  - NixOS 中文：https://nixos-cn.org/[](https://nixos-cn.org/tutorials/lang/)
  - NixOS & Flakes Book：https://nixos-and-flakes.thiscute.world/[](https://thiscute.world/posts/nixos-and-flake-basics/)
- 实践：
  - 使用 `nix repl` 实验语法。
  - 阅读 `nixpkgs` 中的包定义（如 `<nixpkgs>/pkgs`）。

---

### 13. **注意事项**
- **语法差异**：
  - 分号 `;` 在属性集中分隔键值对，类似其他语言的逗号 `,`。[](https://io.bhe.ink/2023/06/17/Getting-Started-with-Nix-Language-A-Beginner-s-Guide/)
  - 列表无需逗号，空格分隔元素。
- **调试**：
  - 使用 `nix repl` 测试表达式。
  - 使用 `builtins.trace` 打印调试信息：
    ```nix
    builtins.trace "Debug: x = ${toString x}" x
    ```
- **局限性**：
  - Nix 不是通用编程语言，专注于包管理和配置。
  - 缺乏强大的函数查找工具，需依赖文档。[](https://io.bhe.ink/2023/06/17/Getting-Started-with-Nix-Language-A-Beginner-s-Guide/)

---

### 14. **总结**
Nix 语言通过简单的语法实现强大的功能，核心在于表达式、函数和属性集。其纯函数式和惰性求值的特性确保了构建的可重现性，特别适合包管理和系统配置。掌握 Nix 语法需要理解其函数式编程范式和领域特定设计，建议通过 `nix repl` 和实际项目（如编写 `shell.nix` 或 NixOS 配置）实践。

如果需要更具体的示例或某部分语法的深入讲解，请告诉我！