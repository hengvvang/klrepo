**Python 语法详解**

**1. 基本结构与规则**

* **缩进 (Indentation):**
    * Python 最具特色的地方在于使用**缩进**来定义代码块（如函数体、循环体、条件语句块等），而不是像 C/Java 那样使用花括号 `{}`。
    * 通常推荐使用 **4 个空格**作为一级缩进。
    * 同一代码块内的语句必须具有相同的缩进量。
    * 缩进错误会导致 `IndentationError`。

    ```python
    # 正确的缩进
    def greet(name):
        if name: # 开始 if 代码块，需要缩进
            print(f"Hello, {name}!") # if 块内的语句
        else: # else 代码块，与 if 对齐
            print("Hello there!") # else 块内的语句
        # 函数体的结束，回到上一级缩进

    # 错误的缩进 (会导致 IndentationError)
    # def greet_bad(name):
    # print("Hello") # 缺少缩进
    ```

* **注释 (Comments):**
    * **单行注释:** 使用 `#` 号开始，`#` 之后到行尾的内容都会被忽略。
    * **多行注释:** Python 没有专门的多行注释语法，但通常使用三个单引号 `'''` 或三个双引号 `"""` 包裹的字符串字面量来达到多行注释的效果（严格来说，这叫文档字符串 Docstring，如果它出现在模块、函数、类或方法的开头）。

    ```python
    # 这是单行注释
    x = 10 # 也可以在代码后面加注释

    '''
    这是
    一个
    多行注释（文档字符串）。
    '''

    """
    这也是一个
    多行注释（文档字符串）。
    """
    def my_function():
        """这是一个函数的文档字符串，用于解释函数功能。"""
        pass # pass 是一个空语句，表示什么也不做
    ```

* **语句分隔:**
    * 通常，一条语句占据一行。
    * 如果想在一行内写多条语句，可以用分号 `;` 分隔（但不推荐，影响可读性）。
    * 如果一条语句太长，可以使用反斜杠 `\` 进行换行，或者利用括号 `()`, `[]`, `{}` 的特性自然换行。

    ```python
    a = 1; b = 2; print(a + b) # 不推荐

    # 使用反斜杠换行
    total = 1 + \
            2 + \
            3
    print(total) # 输出 6

    # 利用括号自然换行 (推荐)
    my_list = [
        1, 2, 3,
        4, 5, 6,
    ]
    result = (1 + 2 + 3 +
              4 + 5 + 6)
    print(result) # 输出 21
    ```

* **标识符 (Identifiers):**
    * 变量、函数、类、模块等的名称。
    * 必须以字母（a-z, A-Z）或下划线 `_` 开头。
    * 后面可以跟字母、数字（0-9）或下划线。
    * 区分大小写 (`myVar` 和 `myvar` 是不同的标识符）。
    * 不能是 Python 的关键字（保留字）。
    * **命名约定 (非强制，但强烈推荐):**
        * 变量名、函数名：小写字母和下划线 (snake_case)，如 `my_variable`, `calculate_sum`。
        * 类名：首字母大写的驼峰式 (CapWords/PascalCase)，如 `MyClass`, `HttpRequest`。
        * 常量名：全大写字母和下划线 (UPPER_CASE_WITH_UNDERSCORES)，如 `PI`, `MAX_CONNECTIONS`。
        * 私有变量/方法（约定俗成）：以单下划线开头，如 `_internal_value`。
        * 名称修饰（避免命名冲突）：以双下划线开头，如 `__private_method`（会被解释器改名）。
        * 特殊方法/属性（魔术方法）：以双下划线开头和结尾，如 `__init__`, `__str__`。

* **关键字 (Keywords):**
    * Python 中有特殊含义的保留字，不能用作标识符。
    * 可以使用 `keyword` 模块查看所有关键字：
        ```python
        import keyword
        print(keyword.kwlist)
        # 输出类似: ['False', 'None', 'True', 'and', 'as', 'assert', ...]
        ```

**2. 数据类型 (Data Types)**

Python 是动态类型语言，变量不需要预先声明类型，类型是在赋值时确定的。

* **数值类型 (Numeric Types):**
    * **整数 (int):** 任意大小的整数，如 `10`, `-5`, `0`, `999999999999999999`。
    * **浮点数 (float):** 小数，如 `3.14`, `-0.5`, `1.0`, `2e3` (科学计数法 $2 \times 10^3$)。
    * **复数 (complex):** 形如 `a + bj`，其中 a 是实部，b 是虚部。如 `3+4j`, `5j`。

* **布尔类型 (Boolean Type):**
    * 只有两个值：`True` 和 `False` (注意首字母大写)。
    * 在条件判断中常用。
    * `True` 对应数值 1，`False` 对应数值 0。

* **None 类型 (NoneType):**
    * 只有一个值：`None`。
    * 表示空值、缺失值或无意义的值。

* **序列类型 (Sequence Types):**
    * **字符串 (str):**
        * 表示文本数据，不可变序列。
        * 用单引号 `'...'`、双引号 `"..."` 或三引号 `'''...'''`/`"""..."""` 包裹。三引号可以跨行。
        * 支持索引、切片、拼接 (`+`)、重复 (`*`) 等操作。
        * 常用方法：`strip()`, `split()`, `join()`, `upper()`, `lower()`, `find()`, `replace()`, `format()` 等。
        * **f-string (格式化字符串字面量, Python 3.6+):** 推荐的格式化方式。
            ```python
            name = "Alice"
            age = 30
            message = f"My name is {name} and I am {age} years old."
            print(message) # 输出: My name is Alice and I am 30 years old.
            ```
    * **列表 (list):**
        * 有序、可变的元素集合。
        * 用方括号 `[]` 定义，元素用逗号 `,` 分隔。
        * 可以包含不同类型的元素。
        * 支持索引、切片、添加 (`append()`, `insert()`)、删除 (`remove()`, `pop()`, `del`)、修改等操作。
        * 常用方法：`sort()`, `reverse()`, `count()`, `index()`, `extend()` 等。
            ```python
            my_list = [1, "hello", 3.14, True, [5, 6]]
            my_list[1] = "world" # 修改元素
            my_list.append(None) # 添加元素
            print(my_list[0])    # 输出: 1
            print(my_list[1:3])  # 输出: ['world', 3.14]
            ```
    * **元组 (tuple):**
        * 有序、**不可变**的元素集合。
        * 用圆括号 `()` 定义，元素用逗号 `,` 分隔。
        * 如果元组只有一个元素，需要在元素后加逗号，如 `(1,)`。
        * 支持索引、切片。因为不可变，通常用于存储不希望被修改的数据，或作为字典的键。
            ```python
            my_tuple = (1, "a", 2.5)
            print(my_tuple[0]) # 输出: 1
            # my_tuple[0] = 100 # 会报错 TypeError
            single_element_tuple = (42,)
            ```

* **映射类型 (Mapping Type):**
    * **字典 (dict):**
        * 无序（Python 3.7+ 为插入顺序）的键值对 (key-value) 集合。
        * 用花括号 `{}` 定义，键值对格式为 `key: value`，用逗号 `,` 分隔。
        * 键 (key) 必须是**不可变类型**（如 int, float, str, tuple），且必须唯一。
        * 值 (value) 可以是任意类型。
        * 通过键来访问、添加、修改、删除值。
        * 常用方法：`keys()`, `values()`, `items()`, `get()`, `pop()`, `update()` 等。
            ```python
            person = {"name": "Bob", "age": 25, "city": "New York"}
            print(person["name"]) # 输出: Bob
            person["age"] = 26   # 修改值
            person["job"] = "Engineer" # 添加键值对
            print(person.get("country", "USA")) # get方法，如果键不存在可返回默认值
            for key, value in person.items():
                print(f"{key}: {value}")
            ```

* **集合类型 (Set Types):**
    * **集合 (set):**
        * 无序、不重复的元素集合。
        * 用花括号 `{}` 定义，元素用逗号 `,` 分隔。或者使用 `set()` 函数创建。
        * **注意:** 创建空集合必须用 `set()`，因为 `{}` 创建的是空字典。
        * 主要用于成员检测和消除重复元素。
        * 支持集合运算：并集 (`|` 或 `union()`)、交集 (`&` 或 `intersection()`)、差集 (`-` 或 `difference()`)、对称差集 (`^` 或 `symmetric_difference()`)。
            ```python
            my_set = {1, 2, 3, 3, 2}
            print(my_set) # 输出: {1, 2, 3} (顺序可能不同)
            empty_set = set()
            print(1 in my_set) # 输出: True
            set1 = {1, 2, 3}
            set2 = {3, 4, 5}
            print(set1 | set2) # 输出: {1, 2, 3, 4, 5}
            print(set1 & set2) # 输出: {3}
            ```
    * **冻结集合 (frozenset):**
        * 不可变的集合。
        * 创建后不能添加或删除元素。
        * 由于不可变，可以作为字典的键或集合中的元素。
            ```python
            frozen = frozenset([1, 2, 3])
            # frozen.add(4) # 会报错 AttributeError
            my_dict = {frozen: "value"}
            ```

**3. 变量与赋值**

* **赋值语句:** 使用等号 `=` 将右侧的值赋给左侧的变量。
    ```python
    x = 10
    name = "Python"
    my_list = [1, 2, 3]
    ```
* **多重赋值:**
    ```python
    a, b, c = 1, 2, 3
    x = y = z = 0 # 所有变量指向同一个对象 0
    ```
* **变量交换:**
    ```python
    a, b = b, a # 无需临时变量即可交换 a 和 b 的值
    ```
* **增量赋值:** 适用于数值类型和某些序列类型。
    ```python
    count = 0
    count += 1 # 等价于 count = count + 1
    my_list = [1]
    my_list += [2, 3] # 等价于 my_list.extend([2, 3]) 或 my_list = my_list + [2, 3]
    name = "Py"
    name += "thon" # 等价于 name = name + "thon"
    # 还有 -=, *=, /=, //=, %=, **=, &=, |=, ^=, <<=, >>=
    ```

**4. 运算符 (Operators)**

* **算术运算符:** `+` (加), `-` (减), `*` (乘), `/` (浮点除), `//` (整数除), `%` (取模), `**` (幂)。
* **比较运算符:** `==` (等于), `!=` (不等于), `>` (大于), `<` (小于), `>=` (大于等于), `<=` (小于等于)。返回 `True` 或 `False`。
* **逻辑运算符:** `and` (逻辑与), `or` (逻辑或), `not` (逻辑非)。
    * **短路求值:** `and` 和 `or` 具有短路行为。
        * `x and y`: 如果 `x` 为假，则不计算 `y`，直接返回 `x` 的值；否则返回 `y` 的值。
        * `x or y`: 如果 `x` 为真，则不计算 `y`，直接返回 `x` 的值；否则返回 `y` 的值。
* **赋值运算符:** `=`, `+=`, `-=`, `*=`, `/=`, `//=`, `%=`, `**=`, `&=`, `|=`, `^=`, `<<=`, `>>=`。
* **位运算符:** `&` (按位与), `|` (按位或), `^` (按位异或), `~` (按位取反), `<<` (左移), `>>` (右移)。通常用于整数操作。
* **成员运算符:** `in`, `not in`。检查元素是否存在于序列（str, list, tuple, set, dict 的键）中。
    ```python
    print(1 in [1, 2, 3]) # True
    print("a" not in "hello") # True
    print("key" in {"key": "value"}) # True (检查键)
    ```
* **身份运算符:** `is`, `is not`。检查两个变量是否引用内存中**同一个对象**。
    ```python
    a = [1, 2]
    b = [1, 2]
    c = a
    print(a == b) # True (值相等)
    print(a is b) # False (不是同一个对象)
    print(a is c) # True (引用同一个对象)
    # 对于小的整数和短字符串，Python 为了优化可能会缓存它们，导致 is 返回 True
    x = 5
    y = 5
    print(x is y) # 通常为 True
    s1 = "hi"
    s2 = "hi"
    print(s1 is s2) # 通常为 True
    ```
* **运算符优先级:** Python 有明确的运算符优先级规则（例如 `**` > `*`/`/` > `+`/`-` > `比较运算符` > `not` > `and` > `or`）。建议使用括号 `()` 来明确运算顺序，提高可读性。

**5. 控制流 (Control Flow)**

* **条件语句 (if-elif-else):**
    ```python
    score = 75
    if score >= 90:
        print("Excellent")
    elif score >= 60: # 可以有零个或多个 elif
        print("Pass")
    else: # else 是可选的
        print("Fail")

    # 单行 if (三元运算符/条件表达式)
    result = "Pass" if score >= 60 else "Fail"
    print(result)
    ```

* **循环语句 (Loops):**
    * **for 循环:** 用于遍历可迭代对象（如 list, tuple, str, set, dict, range 对象等）。
        ```python
        # 遍历列表
        fruits = ["apple", "banana", "cherry"]
        for fruit in fruits:
            print(fruit)

        # 遍历字符串
        for char in "Python":
            print(char, end=" ") # 输出: P y t h o n
        print()

        # 使用 range() 生成数字序列
        for i in range(5): # 0, 1, 2, 3, 4
            print(i)
        for i in range(1, 6): # 1, 2, 3, 4, 5
            print(i)
        for i in range(0, 10, 2): # 0, 2, 4, 6, 8 (步长为 2)
            print(i)

        # 遍历字典
        person = {"name": "Bob", "age": 25}
        for key in person: # 默认遍历键
            print(key, person[key])
        for value in person.values(): # 遍历值
            print(value)
        for key, value in person.items(): # 遍历键值对 (推荐)
            print(f"{key}: {value}")

        # for...else 语句: 当 for 循环正常结束（没有被 break 中断）时，执行 else 块
        for i in range(3):
            print(i)
        else:
            print("Loop finished normally")

        nums = [1, 2, 3, 4]
        for num in nums:
            if num == 5:
                print("Found 5!")
                break
        else:
            print("5 not found in the list") # 如果 break 被执行，else 不会执行
        ```
    * **while 循环:** 当条件为真时，重复执行代码块。
        ```python
        count = 0
        while count < 5:
            print(count)
            count += 1

        # while...else 语句: 当 while 循环条件变为 False 而正常结束（没有被 break 中断）时，执行 else 块
        n = 5
        while n > 0:
            print(n)
            n -= 1
            # if n == 2: break # 如果在这里 break，else 不会执行
        else:
            print("While loop finished normally")
        ```

* **循环控制语句:**
    * **break:** 立即终止**当前**循环（for 或 while），跳出循环体。
    * **continue:** 跳过当前循环的剩余部分，直接进入下一次迭代。
    * **pass:** 空语句，占位符，表示什么都不做。用于语法上需要语句但逻辑上不需要任何操作的地方。
        ```python
        for i in range(10):
            if i == 5:
                break # 当 i 等于 5 时，跳出循环
            if i % 2 == 0:
                continue # 如果 i 是偶数，跳过下面的 print，进入下一次循环
            print(i) # 只会打印 1, 3

        def my_empty_function():
            pass # 函数体不能为空，用 pass 占位
        ```

**6. 函数 (Functions)**

* **定义函数:** 使用 `def` 关键字。
    ```python
    def function_name(parameters):
        """Optional docstring explaining the function."""
        # 函数体 (indented)
        statements
        return value # Optional return statement
    ```
* **调用函数:** 使用函数名加括号 `()`，并传入参数。
    ```python
    def add(a, b):
        """Returns the sum of a and b."""
        return a + b

    result = add(5, 3) # 调用函数
    print(result) # 输出: 8
    ```
* **参数 (Parameters/Arguments):**
    * **位置参数 (Positional Arguments):** 按顺序传递。
    * **关键字参数 (Keyword Arguments):** 通过 `name=value` 的形式传递，顺序可以不一致。
    * **默认参数值 (Default Argument Values):** 在定义函数时为参数指定默认值。调用时可以不传该参数。
        ```python
        def greet(name, greeting="Hello"): # greeting 有默认值
            print(f"{greeting}, {name}!")

        greet("Alice")             # 使用默认 greeting: Hello, Alice!
        greet("Bob", "Hi")         # 提供 greeting: Hi, Bob!
        greet(name="Charlie")      # 使用关键字参数和默认值: Hello, Charlie!
        greet(greeting="Good morning", name="David") # 关键字参数顺序可变
        ```
        **注意:** 默认值在函数定义时只计算一次。如果默认值是可变对象（如列表），可能会导致意外行为。推荐使用 `None` 作为默认值，并在函数内部创建新对象。
        ```python
        # 不推荐的写法
        # def append_to_list(item, my_list=[]):
        #     my_list.append(item)
        #     return my_list

        # 推荐的写法
        def append_to_list(item, my_list=None):
            if my_list is None:
                my_list = []
            my_list.append(item)
            return my_list
        ```
    * **可变位置参数 (`*args`):** 收集任意数量的位置参数到一个元组中。
        ```python
        def sum_all(*numbers): # numbers 会是一个元组
            total = 0
            for num in numbers:
                total += num
            return total

        print(sum_all(1, 2, 3))       # 输出: 6
        print(sum_all(10, 20, 30, 40)) # 输出: 100
        ```
    * **可变关键字参数 (`**kwargs`):** 收集任意数量的关键字参数到一个字典中。
        ```python
        def print_info(**info): # info 会是一个字典
            for key, value in info.items():
                print(f"{key}: {value}")

        print_info(name="Eve", age=28, city="London")
        # 输出:
        # name: Eve
        # age: 28
        # city: London
        ```
    * **参数顺序:** 定义函数时，参数顺序必须是：位置参数 -> 默认参数 -> `*args` -> 关键字参数 -> `**kwargs`。
    * **仅位置参数 (Positional-Only Arguments, /):** Python 3.8+，`/` 左边的参数只能通过位置传递。
    * **仅关键字参数 (Keyword-Only Arguments, *):** `*` 后面的参数（或 `*args` 后面的参数）只能通过关键字传递。
        ```python
        def func(pos1, pos2, /, pos_or_kw, *, kw1, kw2):
            # pos1, pos2: 只能位置传递
            # pos_or_kw: 可以位置或关键字传递
            # kw1, kw2: 只能关键字传递
            print(pos1, pos2, pos_or_kw, kw1, kw2)

        # func(1, 2, 3, kw1=4, kw2=5) # 正确
        # func(1, 2, pos_or_kw=3, kw1=4, kw2=5) # 正确
        # func(pos1=1, pos2=2, ...) # 错误, pos1, pos2 不能用关键字
        # func(1, 2, 3, 4, 5) # 错误, kw1, kw2 必须用关键字
        ```
* **返回值 (Return Value):**
    * 使用 `return` 语句返回值。
    * 如果没有 `return` 语句，或者 `return` 后面没有值，函数默认返回 `None`。
    * 可以返回任何类型的对象，包括元组（用于返回多个值）。
        ```python
        def get_point():
            return 10, 20 # 返回一个元组 (10, 20)

        x, y = get_point() # 解包元组
        print(x, y) # 输出: 10 20
        ```
* **作用域 (Scope):**
    * **LEGB 规则:** Python 查找变量的顺序：**L**ocal (函数内部) -> **E**nclosing function locals (闭包) -> **G**lobal (模块级别) -> **B**uilt-in (Python 内建函数和常量)。
    * **global 关键字:** 在函数内部修改全局变量。
    * **nonlocal 关键字:** 在嵌套函数内部修改外层（非全局）函数的变量。
        ```python
        x = 100 # Global variable

        def outer():
            y = 10 # Enclosing function local
            def inner():
                nonlocal y # Modify enclosing variable
                global x   # Modify global variable
                z = 1 # Local variable
                y += 1
                x += 1
                print(f"Inner: x={x}, y={y}, z={z}")
            inner()
            print(f"Outer: x={x}, y={y}") # y has been modified by inner

        outer()
        print(f"Global: x={x}") # x has been modified
        ```
* **匿名函数 (Lambda Functions):**
    * 使用 `lambda` 关键字创建小型、临时的、单表达式函数。
    * 语法：`lambda arguments: expression`
    * 表达式的值是函数的返回值。
    ```python
    add = lambda a, b: a + b
    print(add(3, 4)) # 输出: 7

    # 常用于需要函数作为参数的地方，如 sorted, map, filter
    points = [(1, 5), (3, 2), (2, 8)]
    points.sort(key=lambda point: point[1]) # 按 y 坐标排序
    print(points) # 输出: [(3, 2), (1, 5), (2, 8)]
    ```

**7. 模块和包 (Modules and Packages)**

* **模块 (Module):** 一个 `.py` 文件就是一个模块。包含 Python 定义和语句。
* **包 (Package):** 包含多个模块的文件夹。该文件夹必须包含一个 `__init__.py` 文件（可以为空），以表示它是一个包。
* **导入 (Importing):**
    * `import module_name`: 导入整个模块，通过 `module_name.item` 访问。
    * `import module_name as alias`: 导入模块并给它一个别名。
    * `from module_name import item1, item2`: 从模块导入指定的项目（函数、类、变量）。可以直接使用 `item1`。
    * `from module_name import item as item_alias`: 导入指定项目并给它别名。
    * `from module_name import *`: 导入模块的所有公共项目（不推荐，可能导致命名冲突）。
    ```python
    # example.py
    PI = 3.14159
    def circle_area(radius):
        return PI * radius * radius

    # main.py
    import example # 方式一
    print(example.PI)
    print(example.circle_area(10))

    import example as ex # 方式二
    print(ex.PI)

    from example import PI, circle_area # 方式三
    print(PI)
    print(circle_area(5))

    from example import circle_area as area # 方式四
    print(area(2))

    # from example import * # 方式五 (不推荐)
    # print(PI)
    # print(circle_area(1))
    ```
* **`if __name__ == "__main__":`**
    * 当一个 `.py` 文件被直接运行时，其内置变量 `__name__` 的值是 `"__main__"`。
    * 当它被作为模块导入时，`__name__` 的值是模块名。
    * 这个结构用于包含只想在文件直接运行时执行的代码（例如测试代码或主程序入口）。
    ```python
    # example.py
    def main_function():
        print("Main function in example.py")

    print(f"example.py __name__: {__name__}")

    if __name__ == "__main__":
        # 这部分代码只有在直接运行 example.py 时执行
        print("example.py is being run directly")
        main_function()
    else:
        # 这部分代码在 example.py 被导入时执行
        print("example.py is being imported")
    ```

**8. 输入和输出 (Input/Output)**

* **输出:** `print()` 函数。
    * 可以打印多个值，默认用空格分隔。
    * `sep` 参数控制分隔符。
    * `end` 参数控制结尾字符（默认是换行符 `\n`）。
    * 可以将输出重定向到文件 `file` 参数。
    ```python
    print("Hello", "world", sep=", ", end="!\n") # 输出: Hello, world!
    with open("output.txt", "w") as f:
        print("Write to file", file=f)
    ```
* **输入:** `input()` 函数。
    * 提示用户输入，并返回用户输入的**字符串**。
    * 如果需要其他类型，需要手动转换（如 `int()`, `float()`）。
    ```python
    name = input("Enter your name: ")
    age_str = input("Enter your age: ")
    try:
        age = int(age_str)
        print(f"Hello, {name}! You are {age} years old.")
    except ValueError:
        print("Invalid age input. Please enter a number.")
    ```

**9. 错误和异常处理 (Error and Exception Handling)**

* **语法错误 (Syntax Errors):** 代码不符合 Python 语法规则，解释器在运行前就会发现。
* **异常 (Exceptions):** 代码在运行时发生的错误（如 `ZeroDivisionError`, `TypeError`, `NameError`, `IndexError`, `KeyError`, `FileNotFoundError` 等）。
* **`try...except...else...finally` 语句:** 用于处理可能引发异常的代码。
    * **`try` 块:** 包含可能出错的代码。
    * **`except` 块:** 如果 `try` 块中发生指定类型的异常，则执行该块。可以有多个 `except` 块来处理不同类型的异常，或者一个 `except` 块处理多个异常（用元组 `(Exception1, Exception2)`）。`except Exception as e:` 可以捕获通用异常并获取异常对象。
    * **`else` 块 (可选):** 如果 `try` 块**没有**发生异常，则执行该块。
    * **`finally` 块 (可选):** 无论 `try` 块中是否发生异常，**总是**会执行该块。通常用于资源清理（如关闭文件）。
    ```python
    try:
        num = int(input("Enter a number: "))
        result = 10 / num
    except ValueError:
        print("Invalid input. Please enter a number.")
    except ZeroDivisionError:
        print("Cannot divide by zero.")
    except Exception as e: # 捕获其他未预料到的异常
        print(f"An unexpected error occurred: {e}")
        print(f"Error type: {type(e)}")
    else:
        print(f"Result is: {result}")
    finally:
        print("Execution finished.") # 总会执行
    ```
* **`raise` 语句:** 手动引发一个异常。
    ```python
    def check_age(age):
        if age < 0:
            raise ValueError("Age cannot be negative.")
        # ... rest of the function ...

    try:
        check_age(-5)
    except ValueError as e:
        print(f"Error: {e}")
    ```
* **断言 (Assertion):** `assert` 语句用于检查条件是否为真，如果为假则引发 `AssertionError`。主要用于调试，确保程序内部状态符合预期。生产环境中通常会禁用断言。
    ```python
    x = 10
    assert x > 0, "x should be positive" # 如果 x <= 0，会引发 AssertionError
    ```

**10. 面向对象编程 (Object-Oriented Programming - OOP)**

* **类 (Class):** 定义对象的蓝图或模板。使用 `class` 关键字。
* **对象 (Object)/实例 (Instance):** 根据类创建的具体实体。
* **构造函数 (`__init__`)**: 特殊方法，在创建对象时自动调用，用于初始化对象的状态（属性）。`self` 参数代表实例本身。
* **属性 (Attribute):** 对象的数据（变量）。
    * **实例属性:** 每个对象独有的属性，在 `__init__` 中通过 `self.attribute_name = value` 定义。
    * **类属性:** 类所有对象共享的属性，在类定义内部、方法外部定义。
* **方法 (Method):** 类中定义的函数，操作对象的数据。第一个参数通常是 `self`。
    * **实例方法:** 操作实例属性，第一个参数是 `self`。
    * **类方法 (`@classmethod`):** 操作类属性，第一个参数是 `cls`（代表类本身）。
    * **静态方法 (`@staticmethod`):** 与类或实例的状态无关的工具函数，不需要 `self` 或 `cls` 参数。
* **继承 (Inheritance):** 一个类（子类/派生类）可以继承另一个类（父类/基类）的属性和方法。使用 `class ChildClass(ParentClass):` 定义。
* **`super()` 函数:** 在子类中调用父类的方法（通常是 `__init__`）。
* **多态 (Polymorphism):** 不同类的对象可以响应相同的方法调用。
* **封装 (Encapsulation):** 将数据（属性）和操作数据的方法（方法）捆绑在一起（在类中）。通过访问控制（如约定使用下划线 `_` 或 `__`）隐藏内部实现细节。
* **魔术方法 (Magic Methods / Dunders):** 以双下划线开头和结尾的特殊方法，如 `__init__`, `__str__` (返回对象的字符串表示), `__repr__` (返回对象的开发者友好表示), `__len__`, `__eq__` (比较), `__add__` (加法) 等。它们允许自定义类的行为，使其能像内建类型一样工作（例如，使用 `+` 运算符）。

```python
class Dog:
    # 类属性
    species = "Canis familiaris"

    # 构造函数 (实例方法)
    def __init__(self, name, age):
        # 实例属性
        self.name = name
        self.age = age
        self._secret = "This is a secret" # 约定为内部使用

    # 实例方法
    def bark(self):
        print(f"{self.name} says Woof!")

    # 另一个实例方法
    def description(self):
        return f"{self.name} is {self.age} years old."

    # 特殊方法 __str__
    def __str__(self):
        return f"Dog(name={self.name}, age={self.age})"

    # 类方法
    @classmethod
    def get_species(cls):
        return cls.species

    # 静态方法
    @staticmethod
    def is_cute():
        return True

# 创建对象 (实例化)
my_dog = Dog("Buddy", 3)
your_dog = Dog("Lucy", 5)

# 访问属性和调用方法
print(my_dog.name)       # 输出: Buddy
print(your_dog.age)        # 输出: 5
my_dog.bark()            # 输出: Buddy says Woof!
print(my_dog.description()) # 输出: Buddy is 3 years old.

# 访问类属性
print(Dog.species)       # 输出: Canis familiaris
print(my_dog.species)    # 也可以通过实例访问，但不推荐修改

# 调用类方法和静态方法
print(Dog.get_species()) # 输出: Canis familiaris
print(Dog.is_cute())     # 输出: True

# 打印对象时调用 __str__
print(my_dog)            # 输出: Dog(name=Buddy, age=3)

# 继承示例
class GoldenRetriever(Dog): # 继承自 Dog 类
    def __init__(self, name, age, color="Golden"):
        super().__init__(name, age) # 调用父类的 __init__
        self.color = color

    # 重写 (Override) 父类方法
    def bark(self):
        print(f"{self.name} (Golden Retriever) says Gentle Woof!")

    # 新增方法
    def fetch(self):
        print(f"{self.name} is fetching!")

golden = GoldenRetriever("Goldie", 2)
print(golden.name)       # 继承自 Dog
print(golden.color)      # 子类新增属性
golden.bark()            # 调用重写后的方法
golden.fetch()           # 调用子类新增方法
print(golden)            # 继承并使用 Dog 的 __str__ 方法
```

**11. 文件操作 (File Handling)**

* **`open()` 函数:** 打开文件，返回文件对象。常用模式：`'r'` (读，默认), `'w'` (写，覆盖), `'a'` (追加), `'b'` (二进制模式), `'+'` (读写)。
* **`with` 语句 (上下文管理器):** 推荐使用 `with` 语句处理文件，它能确保文件在操作完成后（即使发生异常）自动关闭。
    ```python
    # 写文件 (覆盖)
    try:
        with open("myfile.txt", "w", encoding="utf-8") as f: # encoding='utf-8' 处理中文等字符
            f.write("Hello, Python!\n")
            f.write("This is the second line.\n")
            lines = ["Third line\n", "Fourth line\n"]
            f.writelines(lines)
    except IOError as e:
        print(f"Error writing file: {e}")

    # 读文件
    try:
        with open("myfile.txt", "r", encoding="utf-8") as f:
            # 读取整个文件内容
            content = f.read()
            print("--- Read all ---")
            print(content)

            # # 或者按行读取 (文件指针会移动)
            # f.seek(0) # 将指针移回文件开头
            # print("--- Read line by line ---")
            # for line in f: # 迭代文件对象是最高效的按行读取方式
            #     print(line, end='') # print 自带换行，文件行尾也有换行，用 end='' 避免双重换行

            # # 或者读取所有行到列表
            # f.seek(0)
            # lines_list = f.readlines()
            # print("\n--- Read lines into list ---")
            # print(lines_list)
    except FileNotFoundError:
        print("File not found.")
    except IOError as e:
        print(f"Error reading file: {e}")

    # 追加内容
    try:
        with open("myfile.txt", "a", encoding="utf-8") as f:
            f.write("Appending a new line.\n")
    except IOError as e:
        print(f"Error appending to file: {e}")
    ```

**12. 推导式 (Comprehensions)**

提供了一种简洁的方式来创建列表、字典或集合。

* **列表推导式 (List Comprehension):**
    ```python
    # 创建 0-9 的平方列表
    squares = [x**2 for x in range(10)]
    print(squares) # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

    # 加入条件过滤
    even_squares = [x**2 for x in range(10) if x % 2 == 0]
    print(even_squares) # [0, 4, 16, 36, 64]
    ```
* **字典推导式 (Dictionary Comprehension):**
    ```python
    # 创建数字及其平方的字典
    square_dict = {x: x**2 for x in range(5)}
    print(square_dict) # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
    ```
* **集合推导式 (Set Comprehension):**
    ```python
    # 创建 0-9 平方的集合 (自动去重)
    square_set = {x**2 for x in [-1, 0, 1, 2, 2, 3]}
    print(square_set) # {0, 1, 4, 9}
    ```
* **生成器表达式 (Generator Expression):**
    * 语法类似列表推导式，但使用圆括号 `()`。
    * 不立即创建整个序列，而是返回一个**生成器对象**，按需生成值（惰性求值），节省内存。
    ```python
    squares_gen = (x**2 for x in range(1000000)) # 这是一个生成器对象
    # print(squares_gen) # <generator object <genexpr> at ...>
    # print(list(squares_gen)) # 转换为列表才会计算所有值 (可能消耗大量内存)
    # 可以直接迭代生成器
    total = sum(squares_gen) # 高效计算总和
    print(total)
    ```

**13. 生成器 (Generators)**

* 使用 `yield` 关键字的函数是生成器函数。
* 调用生成器函数返回一个生成器对象（迭代器）。
* 每次迭代（如在 `for` 循环中或使用 `next()`）时，函数从上次离开的地方继续执行，直到遇到 `yield`，`yield` 后面的值作为本次迭代的结果返回。函数状态被保存。
* 当函数执行完毕或遇到 `return` 时，生成器停止迭代，引发 `StopIteration` 异常。
* 非常适合处理大数据流或无限序列，因为它们是惰性求值的。

```python
def count_up_to(n):
    i = 1
    while i <= n:
        yield i # 暂停并返回值，下次从这里继续
        i += 1
    print("Generator finished") # 函数结束时打印

counter = count_up_to(3) # 返回生成器对象
print(type(counter))   # <class 'generator'>

print(next(counter)) # 输出: 1
print(next(counter)) # 输出: 2
print(next(counter)) # 输出: 3
# print(next(counter)) # 再次调用 next 会引发 StopIteration，并打印 "Generator finished"

# 更常见的用法是 for 循环
for number in count_up_to(4):
    print(number)
# 输出:
# 1
# 2
# 3
# 4
# Generator finished
```

**14. 装饰器 (Decorators)**

* 本质上是一个函数，它接收一个函数作为参数，并返回一个新的函数（通常是包装了原函数的函数）。
* 使用 `@decorator_name` 语法糖应用在函数或方法定义之前。
* 常用于：日志记录、访问控制、性能测试、缓存、事务处理等，实现代码复用和功能增强，而不修改原函数代码。

```python
import functools
import time

# 定义一个装饰器函数
def timer_decorator(func):
    @functools.wraps(func) # 保留原函数的元信息 (如 __name__, __doc__)
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs) # 调用原函数
        end_time = time.perf_counter()
        print(f"Function '{func.__name__}' took {end_time - start_time:.4f} seconds")
        return result
    return wrapper

# 应用装饰器
@timer_decorator
def slow_function(delay):
    """A function that sleeps for a while."""
    time.sleep(delay)
    return "Done sleeping"

# 调用被装饰的函数
output = slow_function(1.5) # 会自动计时并打印时间
print(output)
print(slow_function.__name__) # 输出: slow_function (因为用了 functools.wraps)
print(slow_function.__doc__)  # 输出: A function that sleeps for a while.

# 不使用 @ 语法糖的等价写法:
# def slow_function(delay): ...
# slow_function = timer_decorator(slow_function)
# slow_function(1.5)
```

**15. 上下文管理器 (Context Managers) 和 `with` 语句**

* `with` 语句用于简化资源管理（如文件、网络连接、锁等），确保资源在使用后正确释放（即使发生错误）。
* 任何实现了 `__enter__()` 和 `__exit__()` 特殊方法的对象都可以用在 `with` 语句中。
    * `__enter__()`: 在进入 `with` 代码块之前执行，返回值（如果有）赋给 `as` 子句的变量。
    * `__exit__(exc_type, exc_val, exc_tb)`: 在退出 `with` 代码块时执行（无论是否发生异常）。如果发生异常，异常信息会传递给这三个参数；如果正常退出，它们都是 `None`。如果 `__exit__` 返回 `True`，则异常被抑制（不再向外传播）。
* `contextlib` 模块提供了创建上下文管理器的便捷方式（如 `@contextmanager` 装饰器）。

```python
# 文件对象是内建的上下文管理器
with open("temp.txt", "w") as f:
    f.write("Using with statement")
# 文件在这里自动关闭

# 自定义上下文管理器
class MyContextManager:
    def __enter__(self):
        print("Entering context")
        return self # 返回值赋给 'as' 后的变量

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Exiting context")
        if exc_type:
            print(f"An error occurred: {exc_type}, {exc_val}")
        # return False # 默认返回 None (等效于 False)，异常会继续传播
        # return True # 如果返回 True，异常会被抑制

with MyContextManager() as manager:
    print("Inside context")
    # x = 1 / 0 # 取消注释这行会看到 __exit__ 处理异常

# 使用 contextlib.contextmanager
from contextlib import contextmanager

@contextmanager
def managed_resource(name):
    print(f"Acquiring resource: {name}")
    try:
        yield name # yield 之前是 __enter__，yield 的值赋给 'as'
        print(f"Using resource: {name}")
    finally:
        # yield 之后是 __exit__
        print(f"Releasing resource: {name}")

with managed_resource("MyResource") as res:
    print(f"Working with {res}")
```

**16. 类型提示 (Type Hinting, Python 3.5+)**

* 允许为变量、函数参数和返回值添加类型注解。
* **目的:** 提高代码可读性和可维护性，方便静态分析工具（如 MyPy）检查类型错误。
* **注意:** Python 解释器**默认不强制执行**类型提示，它仍然是动态类型语言。
* 使用冒号 `:` 添加类型，使用箭头 `->` 注明函数返回值类型。
* `typing` 模块提供了更复杂的类型（如 `List`, `Dict`, `Tuple`, `Optional`, `Union`, `Any` 等）。

```python
from typing import List, Dict, Optional, Union

def greet(name: str) -> str:
    return f"Hello, {name}"

def process_data(data: List[Dict[str, Union[int, str]]]) -> None:
    for item in data:
        print(item)

user_id: int = 101
price: Optional[float] = None # price 可以是 float 或 None

message: str = greet("World")
print(message)

data_list: List[Dict[str, Union[int, str]]] = [
    {"id": 1, "value": "apple"},
    {"id": 2, "value": 100}
]
process_data(data_list)

# Python 3.9+ 可以直接使用 list, dict 等作为类型提示
# def process_data(data: list[dict[str, int | str]]) -> None: ...
# Python 3.10+ 可以使用 | 表示 Union
# price: float | None = None
```

**17. 异步编程 (Async IO - `async`/`await`, Python 3.5+)**

* 用于编写高并发、I/O 密集型程序的语法。
* **`async def`:** 定义一个协程函数 (coroutine function)。调用它返回一个协程对象，而不是立即执行。
* **`await`:** 在协程函数内部使用，等待另一个协程完成。它会暂停当前协程的执行，让事件循环去执行其他任务，直到等待的协程完成。只能在 `async def` 函数内部使用。
* **事件循环 (Event Loop):** 异步编程的核心，负责调度和执行协程。`asyncio` 模块提供了事件循环实现。

```python
import asyncio
import time

async def say_after(delay: float, what: str) -> None:
    print(f"'{what}' waiting {delay}s...")
    await asyncio.sleep(delay) # await: 暂停协程，但不阻塞整个程序
    print(what)

async def main(): # 主协程
    print(f"Started at {time.strftime('%X')}")

    # 创建任务 (并发执行)
    task1 = asyncio.create_task(say_after(1, 'hello'))
    task2 = asyncio.create_task(say_after(2, 'world'))

    # 等待任务完成
    print("Tasks created, waiting...")
    await task1 # 等待 task1 完成
    await task2 # 等待 task2 完成
    # 注意：上面的 await 会按顺序等待，如果想同时运行并等待它们全部完成，可以：
    # await asyncio.gather(task1, task2)

    print(f"Finished at {time.strftime('%X')}")

# 运行主协程 (需要启动事件循环)
if __name__ == "__main__":
    # Python 3.7+
    asyncio.run(main())
    # 旧版本可能需要:
    # loop = asyncio.get_event_loop()
    # loop.run_until_complete(main())
    # loop.close()
```

**18. 结构化模式匹配 (Structural Pattern Matching - `match`/`case`, Python 3.10+)**

* 类似于其他语言中的 `switch` 语句，但功能更强大，可以匹配数据结构。
* `match` 后面跟要匹配的对象。
* `case` 后面跟模式 (pattern)。
    * **字面量模式:** 匹配具体的值 (数字, 字符串, `True`, `False`, `None`)。
    * **变量模式:** 匹配任何值并将其绑定到变量名（除非该名称是已知的常量或 `_`）。`_` 是通配符，匹配任何值但不绑定。
    * **常量模式:** 匹配预定义的常量。
    * **序列模式:** 匹配列表或元组，如 `[x, y]`, `(a, *rest, b)`。
    * **映射模式:** 匹配字典，如 `{"key1": val1, "key2": val2}`。
    * **类模式:** 匹配特定类的实例，并可以提取属性，如 `Point(x=px, y=py)`。
    * **OR 模式:** 使用 `|` 连接多个模式，如 `case 401 | 403 | 404:`。
    * **AS 模式:** 将匹配的值绑定到一个名字，如 `case [x, y] as point:`。
    * **守卫 (Guard):** 在 `case` 模式后添加 `if condition`，只有条件满足时才匹配。
* 按顺序检查 `case`，第一个匹配成功的块会被执行，然后 `match` 语句结束（没有 C 语言 `switch` 的“fall-through”行为）。

```python
def http_status(status: int):
    match status:
        case 200:
            return "OK"
        case 404:
            return "Not Found"
        case 418:
            return "I'm a teapot"
        case code if 400 <= code < 500: # 守卫
            return f"Client Error: {code}"
        case code if 500 <= code < 600:
            return f"Server Error: {code}"
        case _: # 通配符 (默认情况)
            return f"Unknown status code: {status}"

print(http_status(200)) # OK
print(http_status(404)) # Not Found
print(http_status(403)) # Client Error: 403
print(http_status(500)) # Server Error: 500
print(http_status(999)) # Unknown status code: 999

def process_point(point):
    match point:
        case (0, 0):
            print("Origin")
        case (x, 0):
            print(f"On X-axis at {x}")
        case (0, y):
            print(f"On Y-axis at {y}")
        case (x, y):
            print(f"Point at ({x}, {y})")
        case _:
            print("Not a point tuple")

process_point((0, 0))
process_point((5, 0))
process_point((0, -3))
process_point((2, 4))
process_point([1, 2]) # Not a point tuple

from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])

def process_data_structure(data):
    match data:
        case []:
            print("Empty list")
        case [x] | (x,): # OR 模式
            print(f"Single element: {x}")
        case [x, y]:
            print(f"List with two elements: {x}, {y}")
        case {"type": "user", "name": name, "age": age}: # 映射模式
            print(f"User: {name}, Age: {age}")
        case Point(x=px, y=py) if px == py: # 类模式 + 守卫
            print(f"Point on diagonal: x=y={px}")
        case Point(x=px, y=py): # 类模式
            print(f"Generic Point: x={px}, y={py}")
        case _:
            print("Unknown data structure")

process_data_structure([])
process_data_structure([10])
process_data_structure((20,))
process_data_structure([1, 2])
process_data_structure({"type": "user", "name": "Alice", "age": 30})
process_data_structure(Point(5, 5))
process_data_structure(Point(3, 7))
process_data_structure("a string")
```

**总结与进一步学习**

以上内容覆盖了 Python 的绝大部分核心语法。然而，Python 的强大之处还在于其丰富的标准库（如 `os`, `sys`, `re`, `json`, `datetime`, `math`, `random`, `collections`, `itertools` 等）和庞大的第三方库生态（如 `requests`, `numpy`, `pandas`, `matplotlib`, `django`, `flask`, `tensorflow`, `pytorch` 等）。

要真正掌握 Python，除了理解语法，还需要：

1.  **大量练习:** 编写代码解决实际问题。
2.  **熟悉标准库:** 了解常用模块的功能和用法。
3.  **学习数据结构与算法:** 理解如何在 Python 中高效地组织和处理数据。
4.  **掌握面向对象设计:** 学习如何设计健壮、可维护的类。
5.  **阅读官方文档:** Python 官方文档 ([https://docs.python.org/3/](https://docs.python.org/3/)) 是最权威、最全面的参考资料。
6.  **了解 PEPs (Python Enhancement Proposals):** 理解 Python 语言的设计理念和发展方向（如 PEP 8 代码风格指南）。
7.  **学习使用虚拟环境和包管理工具 (如 `venv`, `pip`, `conda`):** 管理项目依赖。
8.  **探索感兴趣领域的库:** 根据你的目标（Web 开发、数据科学、机器学习、自动化等）深入学习相关库。
