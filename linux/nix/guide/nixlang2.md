## Nix 语言语法详解


### 1. 基础语法规则
Nix 语言的核心是**表达式**，整个程序是一个大表达式，由子表达式组成。以下是基本规则：

- **表达式导向**：没有传统意义上的“语句”，所有代码都求值为一个值。
- **不可变性**：所有绑定（变量、属性等）都是不可变的。
- **注释**：
  - 单行：`# 这是单行注释`
  - 多行：`/* 这是多行注释 */`
- **标识符**：
  - 合法字符：字母、数字、下划线 `_`、连字符 `-`。
  - 示例：`myVar`, `package-name`, `foo_bar_2`。
  - 注意：连字符 `-` 是合法的，这与其他语言不同。
- **分隔符**：
  - 属性集键值对用分号 `;` 分隔（如 `{ x = 1; y = 2; }`）。
  - 列表元素用空格分隔，无需逗号（如 `[ 1 2 3 ]`）。

#### 示例 1：基本表达式和注释
```nix
# 计算简单的数学表达式
let
  x = 10;  # 绑定 x 为 10
  y = 20;
in
  x + y  # 输出 30

/* 多行注释示例
   这是一个复杂的表达式
*/
let
  name = "Nix";  # 字符串绑定
in
  "Hello, ${name}!"  # 输出 "Hello, Nix!"
```

#### 示例 2：标识符和分隔符
```nix
{
  package-name = "my-app";  # 连字符合法
  version_1 = 1.0;         # 下划线合法
  dependencies = [ "lib1" "lib2" ];  # 列表用空格分隔
}
```

---

### 2. 数据类型
Nix 支持多种数据类型，所有类型都是动态类型（运行时检查）。以下逐一讲解。

#### 2.1 基本类型
- **整数**（Integer）：如 `42`, `-10`。
- **浮点数**（Float）：如 `3.14`, `-0.001`。
- **布尔值**（Boolean）：`true`, `false`。
- **字符串**（String）：
  - 单行字符串：用双引号 `"` 包裹，如 `"hello"`.
  - 插值：使用 `${expression}` 嵌入表达式。
  - 多行字符串：用双单引号 `''` 包裹，自动剥离缩进。
- **空值**（Null）：`null`，表示无值。
- **路径**（Path）：
  - 表示文件系统路径，如 `./file.nix`, `/etc/nixos`, `<nixpkgs>`。
  - 路径会被 Nix 解析为 `/nix/store` 中的唯一路径。

##### 示例 3：基本类型
```nix
let
  int = 42;
  float = 3.14;
  bool = true;
  str = "Hello, ${toString int}!";  # 插值
  multiLine = ''
    Line 1
    Line 2
  '';
  nullVal = null;
  path = ./myfile.txt;
in
  {
    integer = int;          # 42
    floating = float;       # 3.14
    boolean = bool;         # true
    string = str;           # "Hello, 42!"
    multiline = multiLine;   # "Line 1\nLine 2\n"
    nullValue = nullVal;    # null
    filePath = path;        # /path/to/myfile.txt
  }
```

##### 示例 4：字符串插值和多行字符串
```nix
let
  user = "Alice";
  version = 1.0;
  config = ''
    user: ${user}
    version: ${toString version}
    # This is a comment
  '';
in
  config
# 输出：
# user: Alice
# version: 1.0
# # This is a comment
```

##### 示例 5：路径
```nix
let
  localFile = ./config.nix;  # 相对路径
  nixpkgs = <nixpkgs>;       # NIX_PATH 环境变量解析
  absolute = /etc/nixos;     # 绝对路径
in
  [ localFile nixpkgs absolute ]
```

#### 2.2 复合类型
- **列表**（List）：
  - 用方括号 `[]` 包裹，元素以空格分隔。
  - 支持任意类型，动态长度。
- **属性集**（Attribute Set）：
  - 类似 JSON 对象，用花括号 `{}` 包裹，键值对以分号 `;` 分隔。
  - 键可以是标识符或字符串，值是任意表达式。
- **函数**（Function）：
  - 语法：`param: body` 或 `{ param1, param2 }: body`。
  - 支持柯里化和属性集参数。

##### 示例 6：列表
```nix
let
  numbers = [ 1 2 3 ];
  mixed = [ 1 "two" true [ 4 5 ] ];
  empty = [];
in
  {
    numbers = numbers;         # [ 1 2 3 ]
    mixed = mixed;             # [ 1 "two" true [ 4 5 ] ]
    emptyList = empty;         # []
    first = builtins.elemAt numbers 0;  # 1
    length = builtins.length numbers;   # 3
  }
```

##### 示例 7：属性集
```nix
let
  person = {
    name = "Alice";
    age = 30;
    address = {
      city = "Wonderland";
      zip = "12345";
    };
  };
in
  {
    fullName = person.name;          # "Alice"
    city = person.address.city;      # "Wonderland"
    dynamic = person."${"name"}";    # "Alice"（动态键）
    hasAge = person ? "age";         # true（检查键是否存在）
  }
```

##### 示例 8：动态键
```nix
let
  key = "version";
in
  {
    "${key}" = "1.0";
    fixed = "2.0";
  }
# 输出 { version = "1.0"; fixed = "2.0"; }
```

##### 示例 9：函数
```nix
let
  double = x: x * 2;
  add = x: y: x + y;
  sumAttrs = { a, b }: a + b;
in
  {
    doubled = double 5;                    # 10
    added = add 3 4;                       # 7
    summed = sumAttrs { a = 1; b = 2; };   # 3
  }
```

#### 2.3 特殊类型
- **推导**（Derivation）：
  - 通过 `derivation` 函数创建，表示一个构建任务。
  - 用于定义软件包的构建过程。
- **Lambda 和 PrimOp**：
  - 用户定义函数是 Lambda（如 `x: x + 1`）。
  - 内置函数是 PrimOp，由 C++ 实现（如 `builtins.toString`）。

##### 示例 10：推导
```nix
derivation {
  name = "hello-world";
  system = "x86_64-linux";
  builder = "/bin/sh";
  args = [ "-c" "echo Hello, World! > $out" ];
}
# 输出一个 /nix/store/...-hello-world 的路径
```

---

### 3. 操作符
Nix 支持多种操作符，按优先级从高到低排列：

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

#### 示例 11：操作符
```nix
let
  set1 = { a = 1; b = 2; };
  set2 = { b = 3; c = 4; };
  list1 = [ 1 2 ];
  list2 = [ 3 4 ];
in
  {
    attrAccess = set1.a;              # 1
    hasAttr = set1 ? "b";             # true
    listConcat = list1 ++ list2;      # [ 1 2 3 4 ]
    arith = 10 * 2 + 3;               # 23
    strConcat = "hello" + "world";    # "helloworld"
    logic = true && !false;           # true
    attrMerge = set1 // set2;         # { a = 1; b = 3; c = 4; }
  }
```

#### 示例 12：逻辑蕴含
```nix
let
  a = true;
  b = false;
in
  a -> b  # 等价于 !a || b，输出 false
```

---

### 4. 表达式
Nix 语言由各种表达式组成，下面逐一讲解。

#### 4.1 let 表达式
- 定义局部绑定，语法：
  ```nix
  let
    name1 = value1;
    name2 = value2;
  in
    expression
  ```
- 绑定不可变，作用域仅限于 `in` 后的表达式。

##### 示例 13：let 绑定
```nix
let
  x = 10;
  y = 20;
  sum = x + y;
in
  "The sum is ${toString sum}"  # 输出 "The sum is 30"
```

##### 示例 14：嵌套 let
```nix
let
  outer = 1;
in
  let
    inner = outer + 2;
  in
    inner  # 输出 3
```

#### 4.2 with 表达式
- 将属性集的键引入当前作用域，简化访问。
- 语法：
  ```nix
  with set; expression
  ```

##### 示例 15：with 简化访问
```nix
let
  pkgs = {
    vim = "vim-package";
    git = "git-package";
  };
in
  with pkgs; [ vim git ]  # 输出 [ "vim-package" "git-package" ]
```

##### 示例 16：with 和 let 结合
```nix
let
  config = { user = "Alice"; port = 8080; };
in
  with config; {
    message = "User: ${user}, Port: ${toString port}";
  }
# 输出 { message = "User: Alice, Port: 8080"; }
```

#### 4.3 if 表达式
- 条件表达式，必须有 `else` 分支。
- 语法：
  ```nix
  if condition then expression1 else expression2
  ```

##### 示例 17：if 表达式
```nix
let
  x = 5;
in
  if x > 0 then "positive" else "non-positive"  # 输出 "positive"
```

##### 示例 18：嵌套 if
```nix
let
  score = 85;
in
  if score >= 90 then "A"
  else if score >= 80 then "B"
  else "C"  # 输出 "B"
```

#### 4.4 assert 表达式
- 运行时断言，语法：
  ```nix
  assert condition; expression
  ```

##### 示例 19：assert
```nix
let
  x = 10;
in
  assert x > 0; x * 2  # 输出 20
```

##### 示例 20：assert 失败
```nix
assert false; "never reached"  # 抛出错误
```

#### 4.5 inherit 表达式
- 从其他作用域引入绑定，简化属性集定义。
- 语法：
  ```nix
  inherit name;
  inherit (set) name1 name2;
  ```

##### 示例 21：inherit
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

##### 示例 22：inherit 在模块中
```nix
let
  config = { enable = true; };
in
  {
    myModule = {
      inherit (config) enable;
    };
  }  # 输出 { myModule = { enable = true; }; }
```

#### 4.6 import 表达式
- 导入其他 Nix 文件的求值结果。
- 语法：
  ```nix
  import path
  ```

##### 示例 23：import 文件
```nix
# file.nix
{ version = "1.0"; }

# main.nix
let
  file = import ./file.nix;
in
  file.version  # 输出 "1.0"
```

##### 示例 24：import nixpkgs
```nix
let
  pkgs = import <nixpkgs> {};
in
  pkgs.vim  # 返回 vim 软件包
```

---

### 5. 函数
函数是 Nix 的核心，支持多种定义方式。

#### 5.1 单参数函数
- 语法：`param: body`。

##### 示例 25：单参数函数
```nix
let
  square = x: x * x;
in
  square 5  # 输出 25
```

#### 5.2 多参数函数（柯里化）
- 语法：`x: y: body`。

##### 示例 26：多参数函数
```nix
let
  add = x: y: x + y;
in
  add 3 4  # 输出 7
```

##### 示例 27：部分应用
```nix
let
  add = x: y: x + y;
  add5 = add 5;  # 部分应用
in
  add5 3  # 输出 8
```

#### 5.3 属性集参数函数
- 语法：`{ param1, param2, ... }: body`。
- 支持默认值和可变参数。

##### 示例 28：属性集参数
```nix
let
  sum = { a, b }: a + b;
in
  sum { a = 1; b = 2; }  # 输出 3
```

##### 示例 29：默认值
```nix
let
  greet = { name, greeting ? "Hello" }: "${greeting}, ${name}!";
in
  [
    (greet { name = "Alice"; })           # "Hello, Alice!"
    (greet { name = "Bob"; greeting = "Hi"; })  # "Hi, Bob!"
  ]
```

##### 示例 30：可变参数
```nix
let
  ignoreExtras = { a, ... }: a;
in
  ignoreExtras { a = 1; b = 2; c = 3; }  # 输出 1
```

#### 5.4 函数作为值
- 函数可以赋值、传递或返回。

##### 示例 31：函数作为返回值
```nix
let
  makeAdder = x: (y: x + y);
in
  (makeAdder 5) 3  # 输出 8
```

##### 示例 32：高阶函数
```nix
let
  applyTwice = f: x: f (f x);
  double = x: x * 2;
in
  applyTwice double 5  # 输出 20（5 * 2 * 2）
```

---

### 6. 内置函数
Nix 提供大量内置函数，通过 `builtins` 访问。以下是常用函数的示例。

#### 示例 33：类型转换
```nix
{
  str = builtins.toString 42;        # "42"
  json = builtins.toJSON { a = 1; }; # "{\"a\":1}"
}
```

#### 示例 34：列表操作
```nix
let
  lst = [ 1 2 3 ];
in
  {
    len = builtins.length lst;         # 3
    first = builtins.elemAt lst 0;     # 1
    concat = lst ++ [ 4 5 ];           # [ 1 2 3 4 5 ]
  }
```

#### 示例 35：属性集操作
```nix
let
  set = { a = 1; b = 2; };
in
  {
    keys = builtins.attrNames set;     # [ "a" "b" ]
    hasA = builtins.hasAttr "a" set;   # true
  }
```

#### 示例 36：文件操作
```nix
{
  content = builtins.readFile ./example.txt;  # 读取文件内容
  url = builtins.fetchurl "https://example.com/file.txt";  # 下载文件
}
```

---

### 7. 模块系统
NixOS 使用模块系统组织配置，模块包含 `imports`、`options` 和 `config`。

#### 示例 37：简单模块
```nix
{
  imports = [ ./other.nix ];
  options.myService.enable = mkOption {
    type = types.bool;
    default = false;
    description = "Enable my service";
  };
  config = mkIf config.myService.enable {
    environment.systemPackages = [ pkgs.myApp ];
  };
}
```

#### 示例 38：模块组合
```nix
# base.nix
{
  options.baseConfig = mkOption { type = types.attrs; default = {}; };
}

# service.nix
{
  imports = [ ./base.nix ];
  config.baseConfig = { enable = true; port = 8080; };
}
```

---

### 8. 实际用例
以下是 Nix 语言在实际场景中的应用示例。

#### 示例 39：定义软件包
```nix
{ stdenv, fetchurl }:
stdenv.mkDerivation {
  name = "my-app-1.0";
  src = fetchurl {
    url = "https://example.com/my-app-1.0.tar.gz";
    sha256 = "abcdef...";
  };
  buildPhase = ''
    make
  '';
  installPhase = ''
    mkdir -p $out/bin
    cp my-app $out/bin
  '';
}
```

#### 示例 40：shell.nix 开发环境
```nix
{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  buildInputs = [
    pkgs.python3
    pkgs.nodejs
    pkgs.go
  ];
  shellHook = ''
    echo "Welcome to your dev environment!"
  '';
}
```

#### 示例 41：NixOS 配置
```nix
{
  imports = [ <nixpkgs/nixos/modules/services/web-servers/nginx.nix> ];
  services.nginx = {
    enable = true;
    virtualHosts."example.com" = {
      root = "/var/www";
    };
  };
  environment.systemPackages = with pkgs; [ vim git ];
}
```

#### 示例 42：Flake 定义
```nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
  };
  outputs = { self, nixpkgs, ... }: {
    nixosConfigurations.mySystem = nixpkgs.lib.nixosSystem {
      system = "x86_64-linux";
      modules = [
        {
          networking.hostName = "my-nixos";
          environment.systemPackages = with nixpkgs.legacyPackages.x86_64-linux; [ firefox ];
        }
      ];
    };
  };
}
```

---

### 9. 调试和错误处理
- **调试**：使用 `builtins.trace` 打印调试信息。
- **错误处理**：使用 `assert`, `throw`, 或 `abort`。

#### 示例 43：调试
```nix
let
  x = 5;
in
  builtins.trace "x is ${toString x}" (x * 2)  # 打印 "x is 5"，输出 10
```

#### 示例 44：抛出错误
```nix
let
  x = 0;
in
  if x == 0 then builtins.throw "x cannot be zero!" else x
```

---

### 10. 注意事项和最佳实践
- **避免过度使用 `with`**：可能降低代码可读性。
- **明确依赖**：在函数参数中显式声明依赖（如 `{ pkgs, ... }`）。
- **使用 Flakes**：现代 Nix 项目推荐使用 Flakes 提高可重现性。
- **测试表达式**：使用 `nix repl` 交互式调试：
  ```bash
  $ nix repl
  nix-repl> let x = 1; in x + 2
  3
