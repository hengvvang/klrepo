### 零、TypeScript 核心概念回顾

  * **静态类型系统**: 在编译时检查类型，减少运行时错误。
  * **JavaScript 超集**: 兼容 JavaScript 语法，并在此基础上添加新特性。
  * **编译**: TypeScript 代码（`.ts`, `.tsx`）通过 TypeScript 编译器（`tsc`）编译成 JavaScript 代码。
  * **类型推断**: 编译器自动推断变量和表达式的类型。
  * **代码编辑器集成**: 提供强大的自动补全、重构和错误提示。

-----

### 一、基础类型 (Basic Types) - 深入细节

除了之前介绍的基础类型，我们补充和深化一些细节：

1.  **`number`**:

      * 包括 IEEE 754 标准下的双精度 64 位浮点值。
      * 支持十进制、十六进制 (`0x`)、二进制 (`0b`)、八进制 (`0o`) 字面量。
      * `NaN` (Not a Number) 和 `Infinity` 也属于 `number` 类型。

    <!-- end list -->

    ```typescript
    let num: number = 100;
    let infinity: number = Infinity;
    let notANumber: number = NaN;
    ```

2.  **`bigint`**:

      * 用于表示和操作超出 `Number.MAX_SAFE_INTEGER` (2\<sup\>53\</sup\> - 1) 的大整数。
      * 通过在整数字面量后加 `n` 或调用 `BigInt()` 函数创建。
      * 不能与 `number` 类型混合运算，需要显式转换。
      * 需要 `target` 编译选项设置为 `ES2020` 或更高。

    <!-- end list -->

    ```typescript
    let bigIntValue: bigint = 9007199254740991n;
    let anotherBigInt = BigInt("12345678901234567890");
    // let wrong: bigint = bigIntValue + 10; // Error: Operator '+' cannot be applied to types 'bigint' and 'number'.
    let correct: bigint = bigIntValue + 10n; // OK
    ```

3.  **`string`**:

      * 支持单引号 (`'`)、双引号 (`"`) 和模板字符串 (`` ` ``)。
      * 模板字符串支持嵌入表达式 `${expr}` 和多行文本。

4.  **`boolean`**: `true` 或 `false`。

5.  **`symbol` 和 `unique symbol`**:

      * `symbol` 类型的值通过 `Symbol()` 构造函数获得，是唯一的、不可变的。
      * `unique symbol` 是 `symbol` 的子类型，只能通过 `Symbol()` 调用或 `Symbol.for()` 产生，并且必须用 `const` 声明或 `readonly static` 属性。它用于表示绝对唯一的符号，常用于需要确保属性键唯一性的场景。
      * 需要 `target` 设置为 `ES2015` 或更高。

    <!-- end list -->

    ```typescript
    const sym1 = Symbol("key"); // type is typeof sym1 (a unique symbol type)
    let sym2: symbol = Symbol("key"); // type is symbol
    const sym3: unique symbol = Symbol("another key");

    // unique symbol as object property key
    const uniqueKey = Symbol("uniqueId");
    interface MyInterface {
        [uniqueKey]: number; // Use unique symbol as index signature key
    }
    let obj: MyInterface = {
        [uniqueKey]: 123
    };
    ```

6.  **`null` 和 `undefined`**:

      * 它们各自有自己的类型：`null` 和 `undefined`。
      * **`strictNullChecks: false` (默认或旧配置)**: `null` 和 `undefined` 可以赋值给任何类型。
      * **`strictNullChecks: true` (推荐)**: `null` 和 `undefined` 只能赋值给 `any`, `unknown`, `void` 和它们自身类型。其他类型需要使用联合类型（如 `string | null`）来显式允许 `null` 或 `undefined`。

7.  **`void`**:

      * 主要用于表示函数没有返回值。
      * `void` 类型的变量只能赋值 `undefined` (或 `null` 如果 `strictNullChecks` 为 `false`)。
      * 注意 `void` 函数类型和返回 `undefined` 的函数类型的区别：
        ```typescript
        function returnsVoid(): void { console.log('Hi'); } // No return value expected
        function returnsUndefined(): undefined { return undefined; } // Must explicitly return undefined

        let resultVoid = returnsVoid(); // typeof resultVoid is 'undefined' at runtime
        let resultUndef = returnsUndefined(); // typeof resultUndef is 'undefined' at runtime

        let v: void = undefined;
        // let u: undefined = v; // Error if strictNullChecks: true
        ```

8.  **`never`**:

      * 表示永远不会发生的值的类型。
      * 用于：
          * 总是抛出异常的函数。
          * 无限循环（无法到达终点）的函数。
          * 类型收窄后不可能存在的类型（用于穷尽检查）。

    <!-- end list -->

    ```typescript
    function exhaustiveCheck(param: never) {
        // This function should never be called if all cases are handled
        console.error("Should not reach here!", param);
    }

    type ShapeEx = { kind: "circle"; radius: number } | { kind: "square"; size: number };

    function getArea(shape: ShapeEx) {
        switch (shape.kind) {
            case "circle": return Math.PI * shape.radius ** 2;
            case "square": return shape.size ** 2;
            default:
                // If a new shape kind is added, compiler will error here
                // because 'shape' will not be 'never'
                exhaustiveCheck(shape);
        }
    }
    ```

9.  **`any`**:

      * 动态类型，绕过所有类型检查。
      * 任何值都可以赋给 `any`，`any` 类型的值也可以赋给任何类型（除了 `never`）。
      * 可以对 `any` 类型的值进行任何操作，编译器不检查。
      * 应极力避免使用，除非必要（如与旧 JS 代码交互）。`unknown` 是更安全的选择。

10. **`unknown`**:

      * 类型安全的 `any`。任何值都可以赋给 `unknown`。
      * 不能对 `unknown` 类型的值执行任何操作（如访问属性、调用方法）。
      * `unknown` 类型的值不能赋值给其他类型（除了 `any` 和 `unknown`），除非通过类型断言或类型守卫（`typeof`, `instanceof`, 自定义守卫）进行了类型细化。

    <!-- end list -->

    ```typescript
    let val: unknown;
    if (typeof val === 'string') {
        console.log(val.toUpperCase()); // OK within the guard
    }
    // console.log(val.length); // Error: Object is of type 'unknown'.
    ```

11. **`object`, `Object`, `{}`**:

      * `object`: 表示任何非原始类型（不是 `string`, `number`, `bigint`, `boolean`, `symbol`, `null`, `undefined`）。
      * `Object`: 表示 JavaScript 的 `Object` 类型。几乎包含所有值（包括原始类型，因为它们会被自动装箱）。通常应避免使用 `Object`，因为它不够具体。
      * `{}`: 空对象类型。表示一个没有任何自身属性的对象。理论上可以赋给它任何非 `null`/`undefined` 的值（因为所有值都有 `toString` 等方法），但实际操作其属性会受限。通常也应避免使用，倾向于使用 `object` 或更具体的类型。`Record<string, never>` 有时是更好的“空对象”表示。

    <!-- end list -->

    ```typescript
    let obj1: object;
    obj1 = { prop: 0 }; // OK
    obj1 = [1, 2]; // OK (array is object)
    // obj1 = 42; // Error
    // obj1 = "string"; // Error
    // obj1 = null; // Error if strictNullChecks
    // obj1 = undefined; // Error if strictNullChecks

    let obj2: Object;
    obj2 = { prop: 0 }; // OK
    obj2 = 42; // OK (autoboxing)
    obj2 = "string"; // OK
    obj2 = null; // OK (historical reasons)
    obj2 = undefined; // OK (historical reasons)

    let obj3: {};
    obj3 = { prop: 0 }; // OK
    obj3 = 42; // OK
    obj3 = "string"; // OK
    // obj3.prop = 1; // Error: Property 'prop' does not exist on type '{}'.
    ```

12. **数组 (Array) 和元组 (Tuple)**:

      * 数组 `T[]` 或 `Array<T>`: 长度可变，所有元素类型相同。
      * 元组 `[T1, T2, ..., Tn]`: 固定长度，每个位置的元素类型可以不同。
      * 元组支持可选元素 (`?`) 和剩余元素 (`...T[]`)：
        ```typescript
        let tupleOptional: [string, number?] = ["hello"]; // OK, second element is optional
        tupleOptional = ["world", 123]; // OK
        // tupleOptional = ["only", 1, 2]; // Error: Too many elements

        let tupleRest: [number, ...string[]] = [1, "a", "b", "c"]; // First is number, rest are strings
        // let tupleRestWrong: [number, ...string[], boolean] = [1, "a", "b", true]; // Error: Rest element must be last
        ```
      * `readonly` 修饰符可用于数组和元组：
        ```typescript
        const readonlyArr: readonly number[] = [1, 2, 3];
        const readonlyTuple: readonly [string, number] = ["hi", 1];
        // readonlyArr[0] = 10; // Error
        // readonlyTuple.push("extra"); // Error (no mutating methods)
        ```

-----

### 二、接口 (Interfaces) - 深入细节

1.  **基本用途**: 定义对象结构（属性、方法）、函数类型、数组类型（通过索引签名）、类契约。
2.  **可选属性 (`?`)**: 如前述。
3.  **只读属性 (`readonly`)**: 属性只能在对象创建时（或在类的构造函数内）赋值。
4.  **函数类型**: 如前述。
5.  **索引签名 (Index Signatures)**:
      * `[index: number]: Type` 或 `[key: string]: Type`。
      * 一个接口可以同时有数字和字符串索引签名，但数字索引签名的返回值类型必须是字符串索引签名返回值类型的子类型（因为 JavaScript 会将数字索引转为字符串索引访问）。
      * 接口中定义的具名属性的类型，必须是字符串索引签名类型的子类型。
    <!-- end list -->
    ```typescript
    interface HybridIndex {
        [key: string]: number | string; // String index signature allows number or string
        [index: number]: number; // Numeric index signature requires number (number is subtype of number | string)
        length: number; // OK, number is subtype of number | string
        // name: boolean; // Error: boolean is not assignable to 'number | string'
    }
    ```
6.  **类实现接口 (`implements`)**:
      * 类必须实现接口中声明的所有属性和方法。
      * `implements` 只检查实例部分的类型，不检查构造函数和静态部分。
    <!-- end list -->
    ```typescript
    interface ClockConstructor { // Interface for the constructor
        new (hour: number, minute: number): ClockInstance;
    }
    interface ClockInstance { // Interface for the instance
        tick(): void;
    }

    // Class implementing the instance interface
    class DigitalClock implements ClockInstance {
        constructor(h: number, m: number) { }
        tick() { console.log("beep beep"); }
    }

    // Function using the constructor interface
    function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInstance {
        return new ctor(hour, minute);
    }
    let digital = createClock(DigitalClock, 12, 17);
    ```
7.  **接口继承 (`extends`)**:
      * 一个接口可以继承一个或多个接口，合并所有父接口的成员。
      * 如果继承的接口有同名成员但类型不兼容，会产生错误。
      * 接口可以继承类：这会继承类的成员（包括 `public`, `protected`），但不包括实现。它还会继承类的 `private` 和 `protected` 成员的 *类型*，这意味着只有该类或其子类才能实现这个接口。
    <!-- end list -->
    ```typescript
    class Control {
        private state: any;
    }
    interface SelectableControl extends Control { // Inherits 'state' type structure
        select(): void;
    }
    // class Button extends Control implements SelectableControl { // OK
    //     select() {}
    // }
    // class ImageControl implements SelectableControl { // Error: Property 'state' is missing
    //     select() {}
    // }
    ```
8.  **声明合并 (Declaration Merging)**:
      * 同名的 `interface` 声明会自动合并。后面的接口成员会添加到前面已有的接口中。
      * 对于同名非函数成员，要求类型必须一致。
      * 对于同名函数成员，会被视为函数重载，后面的重载排在前面。
    <!-- end list -->
    ```typescript
    interface Box {
        height: number;
        width: number;
        scale(factor: number): void;
    }
    interface Box {
        // height: string; // Error: Subsequent property declarations must have the same type.
        width: number; // OK
        length: number;
        scale(factor: string): void; // Adds an overload
    }
    let box: Box = { height: 5, width: 6, length: 7, scale: (factor: number | string) => {} };
    ```
9.  **接口 vs 类型别名 (`type`)**:
      * **扩展性**: 接口可以通过声明合并进行扩展，类型别名不行。如果你需要定义可扩展的结构（如插件系统），接口更合适。类可以 `implements` 接口或类型别名（如果别名是对象形状）。
      * **灵活性**: 类型别名更灵活，可以表示联合类型、交叉类型、元组、映射类型等任何类型，接口主要用于描述对象形状。`type MyUnion = string | number;` 是合法的，`interface MyUnion ...` 则不行。
      * **递归引用**: 类型别名在递归引用自身时可能需要一些技巧（如 `type List<T> = T & { next?: List<T> }`），接口可以直接递归引用。
      * **错误提示**: 接口通常在错误消息中提供更清晰的名称，类型别名有时会显示原始的结构。
      * **性能**: 非常复杂的类型别名在编译时可能比接口有轻微性能影响（通常可忽略）。
      * **一般建议**: 定义公共 API 的对象形状或类契约时优先使用 `interface`；定义联合、元组、函数类型或需要映射类型等复杂类型时使用 `type`。

-----

### 三、类 (Classes) - 深入细节

1.  **构造函数 (Constructor)**:

      * `constructor` 方法，用于创建和初始化类实例。
      * 可以有访问修饰符 (`public`, `private`, `protected`)，`protected constructor` 意味着类不能被直接实例化，只能被继承。
      * 可以重载（但实现签名只有一个，需要覆盖所有重载签名）。
      * 参数属性 (`public/private/protected/readonly name: type`) 是语法糖。

    <!-- end list -->

    ```typescript
    class Base {
        protected constructor() {} // Cannot be instantiated directly
    }
    class Derived extends Base {
        constructor() { super(); } // OK to call protected constructor from subclass
    }
    // let b = new Base(); // Error
    let d = new Derived(); // OK
    ```

2.  **属性 (Properties)**:

      * 实例属性、静态属性 (`static`)。
      * 访问修饰符 (`public`, `private`, `protected`)。
      * 只读属性 (`readonly`)。
      * **`#` 私有字段 (ECMAScript Private Fields)**:
          * 使用 `#` 前缀声明，是真正的运行时私有（不是 TypeScript 的编译时检查）。
          * 需要 `target` 设置为 `ES2015` 或更高。
          * 访问必须带 `#` (`this.#privateField`)。
          * 与 TypeScript 的 `private` 不同：`#` 是硬私有，子类和外部都无法访问；`private` 是软私有，编译时检查，运行时仍然可访问（技术上）。
        <!-- end list -->
        ```typescript
        class HardPrivate {
            #hardPrivateField = "secret";
            getSecret() { return this.#hardPrivateField; }
        }
        let hp = new HardPrivate();
        // console.log(hp.#hardPrivateField); // Syntax Error or Property '#hardPrivateField' is not accessible outside class 'HardPrivate'
        ```

3.  **方法 (Methods)**:

      * 实例方法、静态方法 (`static`)。
      * 访问修饰符。
      * 可以包含 `this` 参数类型注解 (`method(this: MyClass, ...args)`).
      * 箭头函数作为类属性，可以自动绑定 `this` 上下文。

    <!-- end list -->

    ```typescript
    class MyClassWithThis {
        name = "MyClass";
        regularMethod() {
            console.log(this.name); // 'this' depends on how it's called
        }
        arrowMethod = () => {
            console.log(this.name); // 'this' is lexically bound to the instance
        }
    }
    let instance = new MyClassWithThis();
    let regular = instance.regularMethod;
    let arrow = instance.arrowMethod;
    regular(); // Prints undefined or throws (in strict mode) because 'this' is global/undefined
    arrow();   // Prints "MyClass"
    ```

4.  **访问器 (Accessors - Getters/Setters)**:

      * 使用 `get` 和 `set` 关键字定义属性的读写行为。
      * 可以有不同的访问修饰符。
      * `setter` 不能有返回类型注解。
      * `getter` 必须有返回类型注解（或能推断）。

    <!-- end list -->

    ```typescript
    class EmployeeWithAccessor {
        private _fullName: string = "";

        get fullName(): string {
            console.log("Getter called");
            return this._fullName;
        }

        set fullName(newName: string) {
            console.log("Setter called");
            if (newName && newName.length > 0) {
                this._fullName = newName;
            } else {
                throw new Error("Name cannot be empty");
            }
        }
    }
    let empAcc = new EmployeeWithAccessor();
    empAcc.fullName = "Bob Smith"; // Calls setter
    console.log(empAcc.fullName); // Calls getter
    ```

5.  **继承 (`extends`)**:

      * 子类继承父类的 `public` 和 `protected` 成员。
      * 子类构造函数必须调用 `super()`。
      * 可以重写 (`override`) 父类方法。TypeScript 4.3+ 支持 `override` 关键字，确保确实是在重写父类成员，防止意外拼写错误。

    <!-- end list -->

    ```typescript
    class BaseOverride {
        greet() { console.log("Hello"); }
    }
    class DerivedOverride extends BaseOverride {
        override greet() { // Using 'override' keyword
            console.log("Hi");
            super.greet(); // Call base method
        }
        // override misspelt() {} // Error: This member cannot have an 'override' modifier because it is not declared in the base class 'BaseOverride'.
    }
    ```

6.  **静态成员 (Static Members)**:

      * 属于类本身，通过 `ClassName.memberName` 访问。
      * 包括静态属性、静态方法、静态 getter/setter。
      * TypeScript 4.4+ 支持静态初始化块 (`static { ... }`)，用于执行更复杂的静态初始化逻辑。

    <!-- end list -->

    ```typescript
    class WithStaticBlock {
        static staticProp: number;
        static { // Static initialization block
            console.log("Static block executed");
            try {
                // Complex initialization
                WithStaticBlock.staticProp = Date.now() % 100;
            } catch {
                WithStaticBlock.staticProp = -1;
            }
        }
    }
    console.log(WithStaticBlock.staticProp);
    ```

7.  **抽象类 (`abstract`)**:

      * 不能被实例化，只能作为基类被继承。
      * 可以包含抽象成员（方法、属性、访问器），这些成员没有实现，必须在派生类中实现。

    <!-- end list -->

    ```typescript
    abstract class AbstractLogger {
        abstract log(message: string): void; // Abstract method
        abstract get level(): string; // Abstract getter
        printDate(): void { // Concrete method
            console.log(new Date().toISOString());
        }
    }
    class ConcreteLogger extends AbstractLogger {
        log(message: string): void { // Implement abstract method
            console.log(`[${this.level}] ${message}`);
        }
        get level(): string { // Implement abstract getter
            return "INFO";
        }
    }
    // let logger = new AbstractLogger(); // Error
    let logger = new ConcreteLogger();
    logger.log("System started");
    ```

-----

### 四、函数 (Functions) - 深入细节

1.  **类型注解**: 参数类型、返回值类型 (`: type`)。
2.  **函数类型表达式**: `(param1: type, param2: type) => returnType`。
3.  **可选参数 (`?`)** 和 **默认参数 (`= defaultValue`)**:
      * 可选参数必须在必选参数之后。
      * 默认参数可以在任何位置，但如果在必选参数前，调用时需要传 `undefined` 占位。
4.  **剩余参数 (`...restName: type[]`)**: 必须是最后一个参数。
5.  **`this` 参数**:
      * 在参数列表首位声明 `this: Type`，用于指定函数内部 `this` 的类型。它不计入实际参数个数。
      * 对回调函数特别有用，确保 `this` 上下文正确。
      * 箭头函数 `() => {}` 的 `this` 是词法绑定的（捕获定义时的 `this`），而 `function` 关键字定义的函数 `this` 是动态绑定的（取决于调用方式）。
6.  **函数重载 (Overloads)**:
      * 提供多个函数签名，一个实现签名。
      * 实现签名必须兼容所有重载签名。
      * 编译器按顺序查找第一个匹配的重载签名进行类型检查。
      * 实现签名对外部调用者不可见。
7.  **`void` vs `undefined` 返回类型**:
      * `void` 表示函数不打算返回值（即使它实际可能返回 `undefined`）。调用者不应该关心其返回值。
      * `undefined` 表示函数明确返回 `undefined`。
      * 类型为 `() => void` 的函数可以赋值给类型为 `() => undefined` 的变量（反之不行，除非 `strictNullChecks` 关闭）。
8.  **`never` 返回类型**: 用于永不正常返回的函数。
9.  **上下文类型 (Contextual Typing)**:
      * 当函数表达式或箭头函数赋值给一个变量、作为参数传递，或在其他具有明确类型的位置时，TypeScript 会尝试根据上下文推断参数类型和（有时）返回类型。
    <!-- end list -->
    ```typescript
    window.onclick = function(event) { // 'event' type is inferred as MouseEvent from context
        console.log(event.button); // OK
    };
    ```
10. **断言函数 (Assertion Functions - `asserts`)**:
      * 一种特殊函数，如果函数正常返回，则表示某个条件为真。用于类型细化。
      * 返回类型为 `asserts condition`，例如 `asserts value is string` 或 `asserts value !== null`。
    <!-- end list -->
    ```typescript
    function assertIsString(val: any): asserts val is string {
        if (typeof val !== "string") {
            throw new Error("Not a string!");
        }
    }
    function processValue(input: unknown) {
        assertIsString(input);
        // 'input' is now known to be 'string' in the code following the assertion
        console.log(input.toUpperCase());
    }
    ```
11. **类型谓词函数 (Type Predicate Functions - `is`)**:
      * 返回 `parameterName is Type` 的函数，用于自定义类型守卫。
    <!-- end list -->
    ```typescript
    interface Cat { meow(): void; }
    interface Dog { bark(): void; }
    function isCat(animal: Cat | Dog): animal is Cat { // Type predicate
        return typeof (animal as Cat).meow === 'function';
    }
    function makeSound(animal: Cat | Dog) {
        if (isCat(animal)) {
            animal.meow(); // 'animal' is Cat here
        } else {
            animal.bark(); // 'animal' is Dog here
        }
    }
    ```

-----

### 五、泛型 (Generics) - 深入细节

1.  **泛型函数、泛型接口、泛型类**: 如前述，使用 `<T>` 定义类型参数。
2.  **泛型约束 (`extends`)**:
      * `T extends U`: 限制 `T` 必须是 `U` 或其子类型。
      * `T extends keyof U`: 限制 `T` 必须是 `U` 的属性名联合类型。
3.  **泛型参数默认值 (`<T = DefaultType>`)**:
    ```typescript
    interface Container<T = string> { // Default type for T is string
        value: T;
    }
    let stringContainer: Container = { value: "hello" }; // T defaults to string
    let numberContainer: Container<number> = { value: 123 }; // Explicitly number
    ```
4.  **在泛型约束中使用类型参数**:
    ```typescript
    function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] { ... }
    ```
5.  **泛型与类类型**:
      * 使用构造函数签名 `{ new(...args: any[]): T }` 来引用泛型类类型。
    <!-- end list -->
    ```typescript
    function create<T>(c: { new (): T }): T {
        return new c();
    }
    class MyGenericClass<U> { constructor(public value: U) {} }
    // Cannot directly use MyGenericClass<number> here as it refers to instance type
    // Need more complex setup or factory function if constructor takes args and is generic
    ```
6.  **条件类型 (`T extends U ? X : Y`)**: 见高级类型部分。
7.  **`infer` 关键字**: 在条件类型的 `extends` 子句中，用于推断类型变量。见高级类型部分。
8.  **泛型递归**: 泛型类型可以引用自身。
    ```typescript
    type Tree<T> = {
        value: T;
        children?: Tree<T>[];
    };
    ```
9.  **协变 (Covariance) / 逆变 (Contravariance) / 不变 (Invariance) / 双变 (Bivariance)**:
      * 这些概念描述了泛型类型参数如何影响类型的子类型关系。
      * **协变**: 如果 `Dog extends Animal`，则 `Array<Dog>` 是 `Array<Animal>` 的子类型。（例如，数组、只读属性）
      * **逆变**: 如果 `Dog extends Animal`，则 `(animal: Animal) => void` 是 `(dog: Dog) => void` 的子类型。（例如，函数参数）
      * **不变**: 即使 `Dog extends Animal`，`ReadWrite<Dog>` 和 `ReadWrite<Animal>` 之间也没有子类型关系。（例如，可读写的属性）
      * **双变 (不安全)**: TypeScript 对函数参数的默认行为（在 `strictFunctionTypes: false` 时）是双变的，即既是协变又是逆变，这可能导致类型不安全。`strictFunctionTypes: true` (包含在 `strict` 中) 强制函数参数为逆变。
      * 理解这些有助于理解泛型和函数类型如何交互。

-----

### 六、枚举 (Enums) - 深入细节

1.  **数字枚举 (Numeric Enums)**:
      * 默认情况下，成员从 0 开始递增。可以手动指定初始值。
      * 支持反向映射：可以通过值获取成员名 (`Color[1]` -\> `"Green"`)。
      * 可以是常量成员 (编译时确定值) 或计算成员 (运行时计算值)。常量枚举成员会被内联（如果使用 `const enum`）。
    <!-- end list -->
    ```typescript
    enum Direction { Up = 1, Down, Left, Right }
    let dirName = Direction[2]; // "Down"
    let dirVal = Direction.Left; // 3
    ```
2.  **字符串枚举 (String Enums)**:
      * 每个成员必须用字符串字面量或另一个字符串枚举成员初始化。
      * 没有反向映射。
      * 提供更好的可读性和调试体验（运行时值是字符串）。
    <!-- end list -->
    ```typescript
    enum EvidenceType { STR = "STRING", NUM = "NUMBER" }
    let type: EvidenceType = EvidenceType.STR; // "STRING"
    ```
3.  **异构枚举 (Heterogeneous Enums)**:
      * 混合字符串和数字成员。不推荐使用。
    <!-- end list -->
    ```typescript
    enum Mixed { No = 0, Yes = "YES" }
    ```
4.  **常量枚举 (`const enum`)**:
      * 使用 `const` 关键字声明。
      * 所有成员必须是常量成员。
      * 在编译后会被完全移除，成员的使用处会被内联为具体的值。
      * 可以提高性能，但没有运行时对象，不能进行反向映射。
    <!-- end list -->
    ```typescript
    const enum FileAccess { Read = 1, Write = 2 }
    let access = FileAccess.Read; // Compiled to: let access = 1;
    ```
5.  **枚举作为类型**: 枚举类型本身可以作为类型使用，表示该枚举所有成员的值的联合。
    ```typescript
    enum ShapeKind { Circle, Square }
    interface Circle { kind: ShapeKind.Circle; radius: number; }
    interface Square { kind: ShapeKind.Square; sideLength: number; }
    type Shape = Circle | Square;
    ```

-----

### 七、字面量类型 (Literal Types) 与模板字面量类型 (Template Literal Types)

1.  **字面量类型**: `string`, `number`, `boolean` 的具体值可以作为类型。
    ```typescript
    type Result = "success" | "failure" | "pending";
    type OneToFive = 1 | 2 | 3 | 4 | 5;
    ```
2.  **模板字面量类型**: (TypeScript 4.1+)
      * 基于字符串字面量类型，通过模板字符串语法创建新的字符串字面量类型。
      * 可以与联合类型、泛型等结合，非常强大。
    <!-- end list -->
    ```typescript
    type EmailLocaleIDs = "welcome_email" | "email_heading";
    type FooterLocaleIDs = "footer_title" | "footer_sendoff";
    type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`; // "welcome_email_id" | "email_heading_id" | ...

    type PropEventSource<T extends { [k: string]: any }> = {
        [K in keyof T as `${string & K}Changed`]: (newValue: T[K]) => void // Creates event names like "propNameChanged"
    };
    interface Person { name: string; age: number; }
    type PersonEvents = PropEventSource<Person>; // { nameChanged: (newValue: string) => void; ageChanged: (newValue: number) => void; }

    // Uppercase, Lowercase, Capitalize, Uncapitalize intrinsic string manipulation types
    type Loud = Uppercase<"hello">; // "HELLO"
    type Quiet = Lowercase<Loud>; // "hello"
    ```

-----

### 八、联合类型 (Union Types) 与 交叉类型 (Intersection Types) - 深入细节

1.  **联合类型 (`|`)**: 值可以是几种类型之一。访问成员时只能访问所有联合成员共有的成员，除非使用类型守卫进行细化。
2.  **交叉类型 (`&`)**: 合并多个类型，值必须同时满足所有类型的要求。
      * 合并对象类型：结果包含所有类型的成员。
      * 合并原始类型：通常结果是 `never` (e.g., `string & number` is `never`)。
3.  **类型守卫 (Type Guards)**:
      * `typeof`: 对原始类型 (`string`, `number`, `boolean`, `symbol`, `bigint`, `undefined`, `function`) 和 `object` 有效。注意 `typeof null` 是 `"object"`。
      * `instanceof`: 检查原型链，用于类实例。右侧必须是构造函数。
      * `in`: 检查对象是否具有某个属性（或其原型链上有）。`'prop' in obj`。
      * 字面量类型守卫: `if (x === "value") { ... }`
      * 可辨识联合守卫: `switch (shape.kind) { ... }`
      * 自定义类型守卫 (`is` 谓词函数)。
      * 断言函数 (`asserts`).
4.  **联合类型的分布特性 (Distributive Conditional Types)**: 当条件类型中的 `T` 是泛型且直接用在 `extends` 左侧时，如果传入联合类型，条件类型会分别应用到联合类型的每个成员上，然后将结果联合起来。
    ```typescript
    type ToArray<T> = T extends any ? T[] : never;
    type StrArrOrNumArr = ToArray<string | number>; // string[] | number[] (distributed)

    type ToArrayNonDist<T> = [T] extends [any] ? T[] : never; // Wrap T in tuple to prevent distribution
    type StrOrNumArr = ToArrayNonDist<string | number>; // (string | number)[]
    ```

-----

### 九、类型别名 (Type Aliases) - 深入细节

1.  使用 `type` 关键字创建新名称。
2.  可以表示任何类型：原始类型、对象、联合、交叉、元组、函数、泛型、映射、条件等。
3.  不可声明合并。
4.  在递归引用方面有时比接口更灵活或需要不同技巧。
    ```typescript
    // Recursive type alias for JSON values
    type JsonValue =
      | string
      | number
      | boolean
      | null
      | JsonValue[]
      | { [key: string]: JsonValue };
    ```

-----

### 十、高级类型 (Advanced Types) - 深入细节

1.  **索引类型 (`keyof T`, `T[K]`)**: 如前述。
2.  **映射类型 (`{ [P in K]: Type }`)**:
      * 基于现有类型创建新类型。
      * `in` 后面通常是 `keyof T` 或其他字符串/数字字面量联合类型。
      * 可以添加/移除修饰符 (`readonly`, `?`)，使用 `+` 或 `-` 前缀。
      * 可以通过 `as` 子句重新映射键名 (`as NewKeyType`)。
    <!-- end list -->
    ```typescript
    type Getters<T> = {
        [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] // Map 'prop' to 'getProp'
    };
    interface Point { x: number; y: number; }
    type PointGetters = Getters<Point>; // { getX: () => number; getY: () => number; }

    type RemoveKindField<T> = {
        [K in keyof T as Exclude<K, "kind">]: T[K] // Remove 'kind' property
    };
    ```
3.  **条件类型 (`T extends U ? X : Y`)**:
      * 根据类型关系选择类型。
      * `infer` 关键字: 在 `extends` 子句中声明一个待推断的类型变量 `R` (`... infer R ...`)。如果匹配成功，`R` 将被推断出来并在真分支 (`X`) 中使用。常用于提取函数返回类型、参数类型、Promise 解析类型、数组元素类型等。
    <!-- end list -->
    ```typescript
    type Flatten<T> = T extends Array<infer Item> ? Item : T; // Get array item type
    type GetPromiseResult<T> = T extends Promise<infer R> ? R : T; // Get Promise resolved type

    type FirstArg<T> = T extends (arg1: infer A, ...rest: any[]) => any ? A : never; // Get first argument type
    type MyFunc = (a: number, b: string) => void;
    type Arg1 = FirstArg<MyFunc>; // number
    ```
4.  **`never` 类型的使用**:
      * 在条件类型中，`never` 可以用于过滤联合类型 (`Exclude`, `Extract` 的实现)。
      * 表示不可能的状态或路径（穷尽检查）。
5.  **`unknown` 类型的使用**:
      * 作为类型安全的 `any`，用于处理不确定类型的值。
      * 强制进行类型检查或断言才能使用。
6.  **`this` 类型**:
      * 在类或接口的方法中，`this` 关键字表示当前实例的类型。
      * 可以在方法的返回类型中使用 `this`，实现链式调用时的类型安全（返回的是当前实例的具体类型，而不是基类类型）。
    <!-- end list -->
    ```typescript
    class Calculator {
        value = 0;
        add(operand: number): this { // Return type 'this'
            this.value += operand;
            return this;
        }
    }
    class ScientificCalculator extends Calculator {
        sin(): this {
            this.value = Math.sin(this.value);
            return this;
        }
    }
    let calc = new ScientificCalculator()
        .add(10) // Returns ScientificCalculator
        .sin()   // Returns ScientificCalculator
        .add(5); // Returns ScientificCalculator
    ```
7.  **索引访问类型 (`T[K]`)**: `T[keyof T]` 可以获取 `T` 所有属性值的联合类型。
8.  **实例化表达式 (Instantiation Expressions)**: (TypeScript 4.7+)
      * 允许在不实际调用的情况下，为泛型函数或泛型类提供类型参数，从而获得一个具体的签名或类型。
    <!-- end list -->
    ```typescript
    function makePair<T, U>(x: T, y: U) { return { x, y }; }
    const numberStringPairMaker = makePair<number, string>; // Type is (x: number, y: string) => { x: number; y: string; }
    let pair = numberStringPairMaker(1, "hello");

    type Container<T> = { value: T };
    const StringContainer = Container<string>; // Type is { value: string; }
    let strContainer: StringContainer = { value: "test" };
    ```

-----

### 十一、模块 (Modules) - 深入细节

1.  **ES6 模块 (`import`/`export`)**:
      * `export { name1, name2 }` (命名导出)
      * `export default expression` (默认导出，每个模块最多一个)
      * `import { name1, name2 as alias } from './module'` (命名导入，可重命名)
      * `import DefaultName from './module'` (导入默认导出)
      * `import * as namespace from './module'` (命名空间导入)
      * `import './module'` (副作用导入，仅执行模块代码)
      * `export * from './module'` (重新导出所有命名导出)
      * `export { name1, name2 } from './module'` (重新导出部分命名导出)
      * `export { default } from './module'` (重新导出默认导出)
2.  **动态导入 (`import()`)**:
      * 返回一个 Promise，解析为模块的命名空间对象。用于代码分割和按需加载。
      * 返回类型是 `Promise<typeof import("./module")>`。
    <!-- end list -->
    ```typescript
    async function loadModule() {
        const utils = await import('./utils'); // Returns Promise<typeof utils>
        utils.doSomething();
        const defaultExport = (await import('./config')).default; // Access default export
    }
    ```
3.  **CommonJS 互操作**:
      * TypeScript 可以导入 CommonJS 模块。
      * `esModuleInterop: true` (推荐): 允许 `import Default from 'module'` 语法导入 CommonJS 的 `module.exports`。编译器会生成辅助代码。
      * `esModuleInterop: false`: 需要使用 `import * as moment from 'moment'` 或 `import moment = require('moment')`。
      * `export =` 和 `import Name = require('module')`: TypeScript 特有的语法，用于导出/导入 CommonJS 模块（尤其是在旧的 `.d.ts` 文件中），现在较少在新代码中使用。
4.  **模块解析 (Module Resolution)**:
      * 编译器如何查找 `import` 的模块文件。
      * 策略：`Classic` (旧，不推荐) 或 `Node` (模拟 Node.js 的 `require` 解析逻辑，更常用)。
      * `baseUrl` 和 `paths` 配置项用于设置路径别名。
5.  **环境模块 (`declare module "module-name" { ... }`)**: 在 `.d.ts` 文件中声明没有自带类型定义的 JavaScript 模块的形状。
6.  **全局模块与脚本**: 没有 `import` 或 `export` 的 `.ts` 文件被视为全局脚本，其内容在全局作用域。添加任意 `import` 或 `export` 即可将其转为模块。
7.  **`/// <reference ... />` 三斜线指令**:
      * `/// <reference path="..." />`: 声明文件间的依赖关系（旧方式）。
      * `/// <reference types="..." />`: 声明对 `@types` 包或其他类型定义包的依赖。
      * `/// <reference lib="..." />`: 类似 `tsconfig.json` 中的 `lib` 选项，引入内置库类型。

-----

### 十二、声明文件 (`.d.ts`) - 深入细节

1.  **用途**: 为 JavaScript 代码提供类型信息。
2.  **编写内容**:
      * 使用 `declare` 关键字声明变量 (`var`, `let`, `const`)、函数、类、枚举、命名空间、模块。
      * 接口 (`interface`) 和类型别名 (`type`) 不需要 `declare`。
      * `declare global { ... }`: 扩充全局作用域。
      * `declare module 'module-name' { ... }`: 声明一个模块的 API。
      * `export as namespace LibraryName;`: 用于 UMD 模块，声明全局变量名。
3.  **发布**: 通常与 JS 库一起发布，或发布到 DefinitelyTyped (`@types`) 仓库。

-----

### 十三、JSX / TSX 支持

1.  TypeScript 支持在 `.tsx` 文件中嵌入 JSX 语法。
2.  需要配置 `tsconfig.json`:
      * `"jsx": "react"`: 编译为 `React.createElement` 调用。
      * `"jsx": "react-jsx"`: 新的 JSX 转换，编译为 `_jsx` 调用（需要 React 17+）。
      * `"jsx": "react-native"`: 保留 JSX 供 React Native 处理。
      * `"jsx": "preserve"`: 保留 JSX 供下游工具（如 Babel）处理。
3.  需要定义 JSX 元素的类型（通常通过 `@types/react` 或类似库提供 `JSX` 命名空间）。

-----

### 十四、装饰器 (Decorators) - 深入细节 (实验性)

1.  **启用**: `"experimentalDecorators": true`。 `"emitDecoratorMetadata": true` (可选，用于元数据反射)。
2.  **种类**:
      * **类装饰器 (`@decorator`)**: 应用于类构造函数。接收构造函数作为参数。可以返回一个新的构造函数来替换原来的。
      * **方法装饰器 (`@decorator`)**: 应用于方法。接收 `target` (类的原型或构造函数)、`propertyKey` (方法名)、`descriptor` (属性描述符) 三个参数。可以修改属性描述符。
      * **访问器装饰器 (`@decorator`)**: 应用于 `getter` 或 `setter`。参数同方法装饰器。
      * **属性装饰器 (`@decorator`)**: 应用于属性。接收 `target` (类的原型或构造函数)、`propertyKey` (属性名) 两个参数。不能直接修改属性描述符，通常用于记录元数据。
      * **参数装饰器 (`@decorator`)**: 应用于方法或构造函数的参数。接收 `target` (类的原型或构造函数)、`propertyKey` (方法名，构造函数为 `undefined`)、`parameterIndex` (参数在参数列表中的索引) 三个参数。主要用于记录元数据。
3.  **装饰器工厂**: 返回装饰器函数的函数，可以接收参数自定义装饰器行为。
    ```typescript
    function MyDecorator(config: any) { // Decorator Factory
        return function(target: any, ...) { // Actual Decorator
            // ... use config
        }
    }
    ```
4.  **求值顺序**: 同一位置的多个装饰器，从下往上（或从右往左）求值（工厂函数先执行），然后装饰器函数从上往下（或从左往右）执行。实例成员装饰器先于静态成员，参数装饰器先于方法/属性装饰器。
5.  **元数据反射 (`reflect-metadata`)**:
      * 需要安装 `reflect-metadata` 包并 `import "reflect-metadata";`。
      * 启用 `emitDecoratorMetadata` 后，编译器会利用 `design:type`, `design:paramtypes`, `design:returntype` 等键名自动添加类型元数据，装饰器可以通过 `Reflect.getMetadata` 读取。
    <!-- end list -->
    ```typescript
    import "reflect-metadata";

    function Injectable(): ClassDecorator { return target => {}; }
    function Inject(token: any): ParameterDecorator {
        return (target, propertyKey, parameterIndex) => {
            const paramTypes = Reflect.getMetadata("design:paramtypes", target, propertyKey);
            // ... use paramTypes[parameterIndex] ...
        }
    }

    @Injectable()
    class MyService {}

    class MyComponent {
        constructor(@Inject(MyService) private service: MyService) {} // Decorator uses metadata
    }
    ```
6.  **注意**: 装饰器是实验性特性，语法和行为在未来可能改变（ECMAScript 标准化仍在进行中）。

-----

### 十五、其他特性与编译器指令

1.  **类型保护 (`is` / `asserts`)**: 见函数和高级类型部分。
2.  **Mixins**: TypeScript 支持通过类表达式和接口合并等模式模拟 Mixin 行为。
3.  **迭代器和生成器**:
      * 可以为 `for...of` 循环、扩展运算符 `...` 等提供类型支持。
      * `Iterable<T>`: 表示可迭代对象。
      * `Iterator<T>`: 表示迭代器对象。
      * `IterableIterator<T>`: 同时实现两者。
      * 生成器函数 (`function*`) 的返回类型是 `IterableIterator<YieldedType>`。
    <!-- end list -->
    ```typescript
    function* numberGenerator(): IterableIterator<number> {
        yield 1;
        yield 2;
    }
    for (const num of numberGenerator()) { // num is inferred as number
        console.log(num);
    }
    ```
4.  **`Promise` 和 `async/await`**:
      * `Promise<T>` 表示最终产生 `T` 类型结果的异步操作。
      * `async` 函数的返回类型总是 `Promise<ResolvedType>`。
      * `await` 会解开 `Promise` 的类型。
    <!-- end list -->
    ```typescript
    async function fetchData(): Promise<string> {
        const response = await fetch("/api/data");
        const data = await response.text();
        return data; // Automatically wrapped in Promise<string>
    }
    async function process() {
        const result = await fetchData(); // result is string
        console.log(result.toUpperCase());
    }
    ```
5.  **编译器注释指令**:
      * `// @ts-nocheck`: 告诉编译器不要检查当前文件。
      * `// @ts-check`: (在 JS 文件中) 告诉编译器检查当前文件（需要 `allowJs` 开启）。
      * `// @ts-ignore` 或 `// @ts-expect-error`: 忽略下一行产生的编译错误。`@ts-expect-error` 如果下一行没有错误，则它本身会报错。
    <!-- end list -->
    ```typescript
    // @ts-ignore
    console.log(undeclaredVariable); // Compiler ignores this error

    let x: number = "hello"; // @ts-expect-error: Type 'string' is not assignable to type 'number'. (This comment prevents the error line from being reported)
    ```

-----
