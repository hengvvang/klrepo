好的，我们来详细对比一下 TypeScript 和 Rust 的类型系统，并在此基础上深入探讨 TypeScript 类型系统的所有主要特性和使用方法。

**TypeScript 与 Rust 类型系统核心对比**

| 特性          | TypeScript                                           | Rust                                                   |
| :------------ | :--------------------------------------------------- | :----------------------------------------------------- |
| **类型检查**  | 编译时 (Compile-time)                                | 编译时 (Compile-time)                                  |
| **类型系统**  | 渐进式 (Gradual), 结构化 (Structural)                | 静态 (Static), 强类型 (Strong), 标称式 (Nominal, 主要) |
| **目标**      | 为 JavaScript 添加类型，提高大型项目可维护性         | 内存安全、性能、并发性，无需垃圾回收器                 |
| **运行时**    | 编译为 JavaScript，在 JS 引擎中运行                  | 编译为本地机器码，直接在操作系统上运行                 |
| **Null 处理** | `null`, `undefined` (可通过 `strictNullChecks` 控制) | `Option<T>` 枚举 (`Some(T)` 或 `None`)                 |
| **错误处理**  | 异常 (Exceptions), `any`, `unknown`, 返回特定值      | `Result<T, E>` 枚举 (`Ok(T)` 或 `Err(E)`)              |
| **可变性**    | `let` (可变), `const` (绑定不可变，内容可能可变)     | `let` (不可变), `let mut` (可变)                       |
| **主要范式**  | 面向对象, 函数式                                     | 命令式, 函数式, 面向对象 (通过 Trait 实现)             |
| **核心理念**  | 尽可能兼容 JavaScript 生态，灵活                     | 零成本抽象，所有权与借用系统保证内存安全               |

**核心差异解读:**

1.  **结构化 vs 标称式 (Structural vs Nominal):**

    - **TypeScript (结构化):** 如果两个类型具有相同的结构（相同的属性名和类型），它们就被认为是兼容的，即使它们的名字不同或没有显式关系。这使得与鸭子类型 (duck typing) 的 JavaScript 代码协作更方便。
    - **Rust (标称式为主):** 类型兼容性基于类型的名称。即使两个 `struct` 有完全相同的字段，它们也是不同的类型，除非它们是同一个定义的类型。Trait (类似于接口) 提供了行为上的抽象。

2.  **渐进式 vs 静态/强类型:**

    - **TypeScript (渐进式):** 你可以在项目中逐步引入类型，允许部分代码是动态类型的 (`any`)，部分是静态类型的。类型检查主要在编译时，运行时是纯 JavaScript。
    - **Rust (静态/强类型):** 所有变量必须有明确的类型（编译器可以推断一部分），类型在编译时严格检查，并且类型信息会影响编译后的代码（如内存布局）。不允许隐式类型转换。

3.  **Null/错误处理:**
    - **TypeScript:** 依赖 `null` 和 `undefined`，以及 JavaScript 的异常机制。`strictNullChecks` 选项强制显式处理 `null`/`undefined`。`unknown` 类型提供了比 `any` 更安全的处理未知值的方式。
    - **Rust:** 通过 `Option<T>` 和 `Result<T, E>` 枚举在类型系统中显式地表示值的存在与否以及操作的成功与否，强制开发者在编译时处理这些情况，极大地减少了空指针和未处理异常的风险。

现在，让我们详细深入 TypeScript 的类型系统：

**TypeScript 类型系统详解**

**1. 基础类型 (Basic Types)**

这些是 JavaScript 中可用的原始数据类型，TypeScript 为它们提供了静态类型注解。

- **`string`**: 表示文本数据。
  ```typescript
  let message: string = "Hello, TypeScript!";
  ```
- **`number`**: 表示数字，包括整数和浮点数。
  ```typescript
  let count: number = 42;
  let price: number = 99.99;
  ```
- **`boolean`**: 表示逻辑值 `true` 或 `false`。
  ```typescript
  let isActive: boolean = true;
  ```
- **`null`**: 表示一个有意的空值或对象不存在。
  ```typescript
  let data: null = null;
  ```
- **`undefined`**: 表示一个未初始化的值。
  ```typescript
  let notAssigned: undefined = undefined;
  // 通常变量声明未赋值时，默认为 undefined
  let maybeValue: string | undefined;
  ```
  - **注意:** 在 `strictNullChecks` 编译选项关闭时，`null` 和 `undefined` 可以赋值给任何类型。开启后，它们只能赋值给 `void` 或它们各自的类型（或包含它们的联合类型）。推荐始终开启 `strictNullChecks`。
- **`bigint`**: 表示大于 `2^53 - 1` 的整数。需要目标编译环境支持 (如 ES2020)。
  ```typescript
  // 需要在 tsconfig.json 中设置 target 为 ES2020 或更高
  // let bigNum: bigint = 100n;
  ```
- **`symbol`**: 表示全局唯一的引用值，通常用作对象属性的键。需要目标编译环境支持 (如 ES2015)。
  ```typescript
  // 需要在 tsconfig.json 中设置 target 为 ES2015 或更高
  // const sym: symbol = Symbol("key");
  // let obj = { [sym]: "value" };
  ```

**2. 数组 (Arrays)**

表示元素类型的有序集合。

- **语法 1: `Type[]`** (推荐)
  ```typescript
  let list: number[] = [1, 2, 3];
  let names: string[] = ["Alice", "Bob"];
  ```
- **语法 2: `Array<Type>`** (泛型语法)
  ```typescript
  let list: Array<number> = [1, 2, 3];
  let names: Array<string> = ["Alice", "Bob"];
  ```
- **多维数组:**
  ```typescript
  let matrix: number[][] = [
    [1, 2],
    [3, 4],
  ];
  ```

**3. 元组 (Tuples)**

表示一个已知元素数量和类型的数组，各元素的类型不必相同。顺序和类型都固定。

```typescript
let person: [string, number]; // 声明一个包含 string 和 number 的元组
person = ["Alice", 30]; // 正确
// person = [30, "Alice"]; // 错误 - 类型顺序不对
// person = ["Alice", 30, true]; // 错误 - 元素数量不对

// 访问元素
console.log(person[0]); // "Alice" (类型为 string)
console.log(person[1]); // 30 (类型为 number)

// 可选元组元素 (需要 TS 3.0+)
let point: [number, number, number?];
point = [10, 20];
point = [10, 20, 30];

// Rest 元素 (需要 TS 3.0+)
type StringNumberBooleans = [string, number, ...boolean[]];
let snb: StringNumberBooleans = ["hello", 1, true, false, true];
```

**4. 对象类型 (Object Types)**

有多种方式描述对象的结构：

- **匿名对象类型:** 直接在类型注解中描述结构。
  ```typescript
  function printCoord(pt: { x: number; y: number }) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
  }
  printCoord({ x: 3, y: 7 });
  ```
- **接口 (Interfaces):** (详见后面)
- **类型别名 (Type Aliases):** (详见后面)

**5. 特殊 TypeScript 类型**

- **`any`**: 万能类型，表示任意类型。使用 `any` 会**失去 TypeScript 的类型检查保护**，应尽量避免使用。它允许你像在纯 JavaScript 中那样操作变量。

  ```typescript
  let notSure: any = 4;
  notSure = "maybe a string instead";
  notSure = false; // okay, definitely a boolean
  // 可以调用任意方法，访问任意属性，编译时不报错，但运行时可能出错
  // notSure.ifItExists(); // 编译通过，运行时可能失败
  // notSure.toFixed(); // 编译通过，如果 notSure 当前是数字则运行正常
  ```

  - **使用场景:** 逐步迁移旧 JS 代码、处理无法预知结构的第三方库或数据。
  - **对比 Rust:** Rust 没有直接对应的 `any`。虽然有 `unsafe` 代码块可以绕过一些检查，但其目的和使用场景完全不同。Rust 更倾向于使用泛型、Trait 或特定的枚举来处理不确定性。

- **`unknown`**: 类型安全的 `any` 版本 (TS 3.0+)。表示一个不确定类型的值。在对 `unknown` 类型的值执行任何操作之前，**必须**进行类型检查（类型收窄）或类型断言。

  ```typescript
  let maybe: unknown;
  maybe = 10;
  maybe = "hello";

  // const num: number = maybe; // 错误：不能将 unknown 分配给 number

  if (typeof maybe === "number") {
    const num: number = maybe; // 正确：在类型检查后，TS 知道 maybe 是 number
    console.log(num * 2);
  } else if (typeof maybe === "string") {
    console.log(maybe.toUpperCase()); // 正确：在类型检查后，TS 知道 maybe 是 string
  }

  // 也可以使用类型断言，但需谨慎
  const upperCaseName = (maybe as string).toUpperCase(); // 如果 maybe 不是 string 会运行时报错
  ```

  - **对比 Rust:** `unknown` 的思想更接近 Rust 强制处理 `Option<T>` 和 `Result<T, E>` 的方式，即在编译时强制你处理不确定性，而不是像 `any` 那样推迟到运行时。

- **`void`**: 通常用作函数的返回值类型，表示该函数**不返回任何有意义的值**。

  ```typescript
  function warnUser(): void {
    console.log("This is my warning message");
    // return undefined; // 可以，但通常省略
    // return null; // 错误 (除非 strictNullChecks 关闭)
    // return "hello"; // 错误
  }
  let unusable: void = undefined; // 只能赋值给 undefined (或 null 在 strictNullChecks 关闭时)
  ```

- **`never`**: 表示**永远不会出现的值**的类型。通常用于：

  - 抛出异常的函数。
  - 无限循环的函数（不会正常结束）。
  - 类型收窄后，逻辑上不可能出现的变量类型。

  ```typescript
  // 函数抛出异常
  function error(message: string): never {
    throw new Error(message);
  }

  // 函数无限循环
  function infiniteLoop(): never {
    while (true) {}
  }

  // 用于穷尽检查 (Exhaustiveness Checking)
  type Shape = Circle | Square;
  interface Circle {
    kind: "circle";
    radius: number;
  }
  interface Square {
    kind: "square";
    sideLength: number;
  }

  function getArea(shape: Shape): number {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2;
      case "square":
        return shape.sideLength ** 2;
      default:
        // 如果未来添加了新的 Shape 类型（如 Triangle）但没有在这里处理
        // `exhaustiveCheck` 会是 never 类型，但新类型无法赋值给 never
        // 这会在编译时产生错误，提醒你处理新的 case
        const _exhaustiveCheck: never = shape;
        return _exhaustiveCheck;
    }
  }
  ```

**6. 类型推断 (Type Inference)**

如果你没有显式地写类型注解，TypeScript 会尝试根据上下文推断出变量的类型。

```typescript
let age = 30; // 推断为 number
let name = "Alice"; // 推断为 string
let isActive = true; // 推断为 boolean

// 函数返回值类型也可以推断
function add(a: number, b: number) {
  // 返回值推断为 number
  return a + b;
}

// 如果没有初始化值且没有上下文，会推断为 any (除非开启 noImplicitAny)
// let something; // 推断为 any (不好!)
// let something: string; // 显式声明更好

// const 声明的原始类型会推断为字面量类型
const myName = "Bob"; // 推断为 "Bob" (字面量类型)
const myAge = 40; // 推断为 40
```

**7. 类型断言 (Type Assertions)**

当你比 TypeScript 编译器更清楚某个值的类型时，可以使用类型断言来“告诉”编译器。它**只在编译时起作用**，不会改变运行时的行为，也不进行任何运行时检查。如果断言错误，运行时可能会出错。

- **语法 1: `as` 语法** (推荐，尤其在 JSX/TSX 文件中)
  ```typescript
  let someValue: unknown = "this is a string";
  let strLength: number = (someValue as string).length;
  ```
- **语法 2: 尖括号语法 `<Type>`**
  ```typescript
  let someValue: unknown = "this is a string";
  let strLength: number = (<string>someValue).length;
  ```
- **注意:** 不要滥用类型断言，它会掩盖潜在的类型错误。优先使用类型守卫 (Type Guards) 进行类型收窄。

**8. 字面量类型 (Literal Types)**

允许你将变量的类型限制为某个具体的字符串、数字或布尔值。

```typescript
let specificString: "hello";
// specificString = "hello"; // 正确
// specificString = "world"; // 错误

let specificNumber: 123;
// specificNumber = 123; // 正确
// specificNumber = 456; // 错误

let specificBoolean: true;
// specificBoolean = true; // 正确
// specificBoolean = false; // 错误

// 常与联合类型一起使用，限制变量只能取几个特定的值
type CardinalDirection = "North" | "East" | "South" | "West";
let direction: CardinalDirection;
direction = "North"; // 正确
// direction = "N"; // 错误
```

**9. 联合类型 (Union Types)**

表示一个值可以是几种类型之一，使用 `|` 分隔。

```typescript
let value: string | number;
value = "Hello";
value = 123;
// value = true; // 错误

function printId(id: number | string) {
  console.log("Your ID is: " + id);
  // 如果要调用特定类型的方法，需要先收窄类型
  if (typeof id === "string") {
    // 在这个块中，id 被认为是 string 类型
    console.log(id.toUpperCase());
  } else {
    // 在这个块中，id 被认为是 number 类型
    console.log(id.toFixed(2));
  }
}
```

- **类型收窄 (Narrowing):** TypeScript 编译器可以通过 `typeof`, `instanceof`, 属性检查 (`in`), 字面量类型检查 (`===`), 或自定义类型守卫 (Type Guards) 来确定联合类型变量在特定代码块中的具体类型。

**10. 交叉类型 (Intersection Types)**

将多个类型合并为一个类型，新类型具有所有成员类型的特性。使用 `&` 分隔。

```typescript
interface Colorful {
  color: string;
}
interface CircleShape {
  radius: number;
}

type ColorfulCircle = Colorful & CircleShape;

let cc: ColorfulCircle = {
  color: "red",
  radius: 10,
};
// cc 必须同时具有 color 和 radius 属性

// 对于原始类型，交叉通常没有意义或导致 never
// type NumStr = number & string; // 类型为 never
```

**11. 枚举 (Enums)**

用于定义一组命名的常量。

- **数字枚举 (Numeric Enums):** 默认情况下，成员会从 0 开始自增编号。可以手动指定值。

  ```typescript
  enum Direction {
    Up, // 0
    Down, // 1
    Left, // 2
    Right, // 3
  }
  let dir: Direction = Direction.Up; // dir 的值是 0

  enum ResponseStatus {
    No = 0,
    Yes = 1,
  }

  enum FileAccess {
    None,
    Read = 1 << 1, // 2
    Write = 1 << 2, // 4
    ReadWrite = Read | Write, // 6
  }
  ```

  - 数字枚举会被编译成一个**反向映射**的对象，可以通过值找到名称，也可以通过名称找到值。

- **字符串枚举 (String Enums):** 每个成员必须用字符串字面量或另一个字符串枚举成员初始化。没有反向映射。
  ```typescript
  enum LogLevel {
    Error = "ERROR",
    Warn = "WARN",
    Info = "INFO",
    Debug = "DEBUG",
  }
  let level: LogLevel = LogLevel.Info; // level 的值是 "INFO"
  ```
- **常量枚举 (Const Enums):** 使用 `const enum` 定义。它们在编译时会被完全移除，只留下使用的值。可以提高性能，但不能有计算成员。
  ```typescript
  const enum Colors {
    Red,
    Green,
    Blue,
  }
  let myColor = Colors.Red; // 编译后会变成 let myColor = 0;
  ```
- **对比 Rust:** Rust 的 `enum` (代数数据类型，Sum Type) 比 TS 的枚举强大得多。Rust 的枚举成员可以携带不同类型的数据，常与 `match` 表达式一起使用，实现强大的模式匹配和状态表示。TS 的枚举更像是命名常量的集合。

**12. 接口 (Interfaces)**

用于定义对象的“形状”（结构契约），也可以用于定义函数类型或强制类实现某些结构。

- **对象形状:**

  ```typescript
  interface Point {
    readonly x: number; // 只读属性
    y: number;
    z?: number; // 可选属性
  }

  let p1: Point = { x: 10, y: 20 };
  // p1.x = 5; // 错误: Cannot assign to 'x' because it is a read-only property.
  p1.y = 30; // 正确
  let p2: Point = { x: 1, y: 2, z: 3 }; // 正确
  ```

- **函数类型:**
  ```typescript
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }
  let mySearch: SearchFunc;
  mySearch = function (src, sub) {
    return src.search(sub) > -1;
  };
  ```
- **可索引类型 (Indexable Types):** 描述可以通过索引（如数字或字符串）访问的类型。

  ```typescript
  interface StringArray {
    [index: number]: string; // 数字索引签名
  }
  let myArray: StringArray = ["Bob", "Fred"];
  let first = myArray[0]; // string

  interface Dictionary {
    [key: string]: any; // 字符串索引签名
    length: number; // 可以有其他确定名称的属性，但类型需兼容索引签名
  }
  let myDict: Dictionary = { prop1: "value1", length: 1 };
  ```

- **类实现接口 (Class Implementing Interface):**

  ```typescript
  interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
  }

  class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
      this.currentTime = d;
    }
    constructor(h: number, m: number) {} // 构造函数不属于接口检查部分
  }
  ```

- **接口继承 (Extending Interfaces):** 一个接口可以继承一个或多个接口。
  ```typescript
  interface Shape {
    color: string;
  }
  interface PenStroke {
    penWidth: number;
  }
  interface Square extends Shape, PenStroke {
    sideLength: number;
  }
  let s: Square = { color: "blue", sideLength: 10, penWidth: 5.0 };
  ```
- **声明合并 (Declaration Merging):** 同名的 `interface` 声明会自动合并。这在扩展已有接口时很有用。
  ```typescript
  interface Box {
    height: number;
  }
  interface Box {
    width: number;
  }
  // 合并后 Box 接口要求 { height: number; width: number; }
  let b: Box = { height: 5, width: 6 };
  ```
- **对比 Rust:** TS `interface` 主要关注对象的结构 (Shape)。Rust 的 `trait` 更侧重于行为 (Behavior)，定义类型必须实现的方法。Rust 的 `struct` 或 `enum` 定义数据的结构。虽然都可以用于抽象，但哲学和侧重点不同。

**13. 类型别名 (Type Aliases)**

使用 `type` 关键字给一个类型起一个新的名字。可以用于原始类型、联合类型、交叉类型、元组、对象类型、函数类型等。

```typescript
type Point = {
  // 对象类型别名
  x: number;
  y: number;
};
type ID = string | number; // 联合类型别名
type StringOrNumberArray = (string | number)[]; // 复杂类型别名
type Tree<T> = {
  // 泛型类型别名
  value: T;
  left?: Tree<T>;
  right?: Tree<T>;
};

let id1: ID = "abc";
let id2: ID = 123;
let p: Point = { x: 1, y: 2 };

// 类型别名和接口的区别:
// 1. 接口只能描述对象、函数、类的结构；类型别名更通用。
// 2. 接口可以声明合并；类型别名不行（同名会报错）。
// 3. 接口使用 `extends` 继承；类型别名通过交叉类型 `&` 组合。
// 习惯上，定义公共 API 的形状（特别是对象的）倾向于用 interface，因为它可扩展。
// 定义联合、交叉、元组或只是给复杂类型一个短名称时，常用 type。
```

**14. 函数 (Functions)**

TypeScript 为函数的参数和返回值添加类型。

- **参数类型和返回值类型:**
  ```typescript
  function greet(name: string, age: number): string {
    return `Hello ${name}, you are ${age} years old.`;
  }
  ```
- **函数类型表达式:**

  ```typescript
  type MathOperation = (x: number, y: number) => number;

  let addFunc: MathOperation = (a, b) => a + b;
  let subtractFunc: MathOperation = (a, b) => a - b;
  ```

- **可选参数 (`?`):** 必须在必选参数之后。
  ```typescript
  function buildName(firstName: string, lastName?: string): string {
    if (lastName) return firstName + " " + lastName;
    else return firstName;
  }
  ```
- **默认参数:** 为参数提供默认值，如果调用时未提供该参数或提供了 `undefined`。带有默认值的参数被视为可选。
  ```typescript
  function calculateRate(base: number, rate: number = 0.05): number {
    return base * rate;
  }
  calculateRate(1000); // 使用默认 rate 0.05
  calculateRate(1000, 0.07); // rate 是 0.07
  ```
- **剩余参数 (`...`):** 将不定数量的参数收集到一个数组中。必须是最后一个参数。
  ```typescript
  function sumAll(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
  }
  sumAll(1, 2, 3, 4); // 10
  ```
- **`this` 参数:** 显式指定函数中 `this` 的类型。它是一个假参数，只用于类型检查，必须放在参数列表的最前面。
  ```typescript
  interface Card {
    suit: string;
    card: number;
  }
  interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card; // 指定 this 类型为 Deck
  }
  let deck: Deck = {
    /* ... */
  };
  let cardPicker = deck.createCardPicker();
  let pickedCard = cardPicker(); // 确保调用时 this 指向 deck
  ```
- **函数重载 (Overloads):** 为同一个函数提供多个函数类型定义（重载签名），以根据不同的参数类型和数量执行不同的操作。实现签名必须与所有重载签名兼容。
  ```typescript
  // 重载签名
  function process(input: string): string[];
  function process(input: number): number;
  // 实现签名 (参数类型通常使用 any 或联合类型，内部再做判断)
  function process(input: string | number): string[] | number {
    if (typeof input === "string") {
      return input.split("");
    } else {
      return input * input;
    }
  }
  const letters = process("hello"); // 类型是 string[]
  const squared = process(10); // 类型是 number
  ```

**15. 类 (Classes)**

TypeScript 支持 ES6 的类语法，并添加了类型注解和一些特性。

- **字段和方法:**

  ```typescript
  class Greeter {
    greeting: string; // 字段（成员变量）

    constructor(message: string) {
      // 构造函数
      this.greeting = message;
    }

    greet(): string {
      // 方法
      return "Hello, " + this.greeting;
    }
  }
  let greeter = new Greeter("world");
  ```

- **继承 (`extends`):**
  ```typescript
  class Animal {
    move(distanceInMeters: number = 0) {
      console.log(`Animal moved ${distanceInMeters}m.`);
    }
  }
  class Dog extends Animal {
    bark() {
      console.log("Woof! Woof!");
    }
    move(distanceInMeters = 5) {
      // 方法重写
      console.log("Running...");
      super.move(distanceInMeters); // 调用父类方法
    }
  }
  const dog = new Dog();
  dog.bark();
  dog.move(10);
  ```
- **访问修饰符:**

  - `public` (默认): 成员可以在任何地方访问。
  - `private`: 成员只能在声明它的类内部访问。子类也不能访问。
  - `protected`: 成员可以在声明它的类及其子类内部访问。

  ```typescript
  class Person {
    public name: string;
    private age: number;
    protected id: string;

    constructor(name: string, age: number, id: string) {
      this.name = name;
      this.age = age;
      this.id = id;
    }
    public getAge() {
      return this.age;
    } // 可以通过公共方法访问私有成员
  }
  class Employee extends Person {
    constructor(
      name: string,
      age: number,
      id: string,
      public department: string
    ) {
      super(name, age, id);
      console.log(this.id); // 可以访问 protected 成员 id
      // console.log(this.age); // 错误: age 是 private
    }
  }
  let emp = new Employee("Alice", 30, "E123", "Sales");
  console.log(emp.name); // OK
  // console.log(emp.age); // 错误
  // console.log(emp.id); // 错误 (protected 成员在类外部不可访问)
  ```

  - **注意:** 这些修饰符只在编译时强制执行，编译后的 JavaScript 代码中没有真正的私有性（尽管有提案如 `#private` 字段正在成为标准）。
  - **对比 Rust:** Rust 的隐私基于模块 (`mod`)，`pub` 关键字控制项（函数、结构体、字段等）的可见性。没有 `protected`。隐私性在编译时严格强制，并且影响链接。

- **只读修饰符 (`readonly`):** 字段只能在声明时或构造函数中初始化。
  ```typescript
  class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor(theName: string) {
      this.name = theName; // OK: 在构造函数中赋值
    }
    // setName(newName: string) {
    //   this.name = newName; // 错误: name 是 readonly
    // }
  }
  ```
- **参数属性 (Parameter Properties):** 在构造函数参数前添加访问修饰符（`public`, `private`, `protected`, `readonly`），可以简化类的声明和初始化。

  ```typescript
  class Product {
    // public name: string; // 不需要这样写了
    // private price: number; // 不需要这样写了

    constructor(
      public name: string,
      private price: number,
      readonly id: string
    ) {
      // 构造函数体可以为空，或者只包含其他逻辑
      // TS 会自动创建同名的成员变量，并将参数值赋给它们
    }

    getPrice(): number {
      return this.price; // 可以访问 private 成员
    }
  }
  let p = new Product("Laptop", 1200, "P987");
  console.log(p.name); // "Laptop"
  // console.log(p.price); // 错误
  console.log(p.id); // "P987"
  // p.id = "X123"; // 错误: readonly
  ```

- **静态属性和方法 (`static`):** 属于类本身而不是类的实例。通过类名访问。
  ```typescript
  class Grid {
    static origin = { x: 0, y: 0 }; // 静态属性
    calculateDistanceFromOrigin(point: { x: number; y: number }) {
      let xDist = point.x - Grid.origin.x; // 访问静态属性
      let yDist = point.y - Grid.origin.y;
      return Math.sqrt(xDist * xDist + yDist * yDist);
    }
    static computeArea(width: number, height: number): number {
      // 静态方法
      return width * height;
    }
  }
  console.log(Grid.origin);
  console.log(Grid.computeArea(10, 5));
  let grid1 = new Grid();
  // console.log(grid1.origin); // 错误: origin 是静态的
  ```
- **抽象类 (`abstract`):** 不能被实例化的基类，用于定义通用结构和行为，可能包含抽象方法（只有签名，没有实现），子类必须实现这些抽象方法。

  ```typescript
  abstract class Department {
    constructor(public name: string) {}

    printName(): void {
      console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
  }

  class AccountingDepartment extends Department {
    constructor() {
      super("Accounting and Auditing"); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
      // 实现抽象方法
      console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
      console.log("Generating accounting reports...");
    }
  }

  // let department: Department; // 可以创建抽象类型的引用
  // department = new Department("Finance"); // 错误: 不能创建抽象类的实例
  let department = new AccountingDepartment(); // 正确
  department.printName();
  department.printMeeting();
  // department.generateReports(); // 错误: department 类型是 Department，没有 generateReports 方法
  // 如果需要调用子类特有方法，需要将变量声明为子类类型或进行类型断言/检查
  (department as AccountingDepartment).generateReports();
  ```

**16. 泛型 (Generics)**

创建可重用的组件，这些组件可以处理多种类型而不是单一类型。

- **泛型函数:**
  ```typescript
  function identity<T>(arg: T): T {
    // T 是类型变量
    return arg;
  }
  let output1 = identity<string>("myString"); // 显式指定 T 为 string
  let output2 = identity("myString"); // 类型推断，T 被推断为 string
  let output3 = identity<number>(123); // 显式指定 T 为 number
  let output4 = identity(123); // 类型推断，T 被推断为 number
  ```
- **泛型变量:**
  ```typescript
  function loggingIdentity<T>(arg: T[]): T[] {
    // 使用类型变量 T 作为类型的一部分
    console.log(arg.length);
    return arg;
  }
  function loggingIdentityArray<T>(arg: Array<T>): Array<T> {
    // 另一种写法
    console.log(arg.length);
    return arg;
  }
  ```
- **泛型类型 (接口或类型别名):**

  ```typescript
  interface GenericIdentityFn<T> {
    (arg: T): T;
  }
  let myIdentity: GenericIdentityFn<number> = identity; // T 是 number

  type Result<DataT, ErrorT> =
    | { status: "success"; data: DataT }
    | { status: "error"; error: ErrorT };
  ```

- **泛型类:**

  ```typescript
  class GenericNumber<NumType> {
    zeroValue: NumType;
    add: (x: NumType, y: NumType) => NumType;
  }
  let myGenericNumber = new GenericNumber<number>();
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = function (x, y) {
    return x + y;
  };

  let stringNumeric = new GenericNumber<string>();
  stringNumeric.zeroValue = "";
  stringNumeric.add = function (x, y) {
    return x + y;
  };
  ```

- **泛型约束 (`extends`):** 限制泛型类型变量必须符合某种结构或类型。
  ```typescript
  interface Lengthwise {
    length: number;
  }
  // 约束 T 必须有 length 属性
  function loggingIdentityWithConstraint<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); // 现在可以安全访问 length
    return arg;
  }
  loggingIdentityWithConstraint({ length: 10, value: 3 }); // OK
  loggingIdentityWithConstraint("hello"); // OK (string 有 length)
  loggingIdentityWithConstraint([1, 2, 3]); // OK (array 有 length)
  // loggingIdentityWithConstraint(123); // 错误: number 没有 length 属性
  ```
- **在泛型约束中使用类型参数:**
  ```typescript
  function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }
  let x = { a: 1, b: "hello", c: true };
  getProperty(x, "a"); // 返回 number
  getProperty(x, "b"); // 返回 string
  // getProperty(x, "d"); // 错误: "d" 不是 'a'|'b'|'c' 中的一个
  ```
- **泛型默认类型:**
  ```typescript
  interface Container<T = string> {
    // T 默认是 string
    value: T;
  }
  let c1: Container = { value: "abc" }; // T 是 string (默认)
  let c2: Container<number> = { value: 123 }; // T 是 number
  ```
- **对比 Rust:** Rust 的泛型也非常强大，编译时通过**单态化 (Monomorphization)** 实现零成本抽象（为每个具体类型生成专用代码）。Rust 使用 `trait` 来约束泛型参数（类似 TS 的 `extends` 约束）。

**17. 高级类型 (Advanced Types)**

- **`keyof` 类型操作符:** 获取一个类型的所有公共属性名称组成的联合类型。
  ```typescript
  interface Person {
    name: string;
    age: number;
  }
  type PersonKeys = keyof Person; // Type is "name" | "age"
  let key: PersonKeys = "name";
  // key = "address"; // 错误
  ```
- **`typeof` 类型操作符:** 获取一个变量或属性的类型。用在类型上下文中。

  ```typescript
  let s = "hello";
  let n: typeof s; // n 的类型是 string

  type Predicate = (x: unknown) => boolean;
  type K = ReturnType<Predicate>; // K 的类型是 boolean (ReturnType 是内置条件类型)

  const person = { name: "Alice", age: 30 };
  type PersonType = typeof person; // PersonType 是 { name: string, age: number }
  ```

- **索引访问类型 (Indexed Access Types) / 查找类型 (Lookup Types): `T[K]`**
  ```typescript
  interface Person {
    name: string;
    age: number;
  }
  type AgeType = Person["age"]; // Type is number
  type NameOrAge = Person["name" | "age"]; // Type is string | number
  type Keys = keyof Person;
  type PropertyTypes = Person[Keys]; // Type is string | number
  ```
- **条件类型 (Conditional Types): `T extends U ? X : Y`** (TS 2.8+)
  允许根据类型关系（`extends`）在两种类型中选择一种。常用于泛型中。

  ```typescript
  interface IdLabel {
    id: number;
  }
  interface NameLabel {
    name: string;
  }

  // 定义一个条件类型
  type NameOrId<T extends number | string> = T extends number
    ? IdLabel
    : NameLabel;

  function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "unimplemented";
  }

  let a = createLabel("typescript"); // a 的类型是 NameLabel
  let b = createLabel(2.8); // b 的类型是 IdLabel
  let c = createLabel(Math.random() > 0.5 ? "hello" : 42); // c 的类型是 NameLabel | IdLabel

  // 内置条件类型示例：
  // Exclude<T, U> -- 从 T 中剔除可以赋值给 U 的类型。
  type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
  // Extract<T, U> -- 提取 T 中可以赋值给 U 的类型。
  type T1 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
  // NonNullable<T> -- 从 T 中剔除 null 和 undefined。
  type T2 = NonNullable<string | number | undefined | null>; // string | number
  // ReturnType<T> -- 获取函数类型 T 的返回值类型。
  type T3 = ReturnType<() => string>; // string
  // InstanceType<T> -- 获取构造函数类型 T 的实例类型。
  type T4 = InstanceType<typeof String>; // String
  ```

- **`infer` 关键字:** 在条件类型的 `extends` 子句中，用于声明一个待推断的类型变量。

  ```typescript
  // 推断数组元素的类型
  type Flatten<T> = T extends Array<infer Item> ? Item : T;
  type Str = Flatten<string[]>; // string
  type Num = Flatten<number>; // number

  // 推断函数返回值的类型 (ReturnType 的简化实现)
  type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
    ? Return
    : never;
  type NumRet = GetReturnType<() => number>; // number
  type StrRet = GetReturnType<(x: string) => string>; // string
  type BoolRet = GetReturnType<(a: boolean, b: boolean) => boolean[]>; // boolean[]

  // 推断 Promise 的解析类型
  type UnpackPromise<T> = T extends Promise<infer ResolvedType>
    ? ResolvedType
    : T;
  type ResultType = UnpackPromise<Promise<string>>; // string
  type OtherType = UnpackPromise<number>; // number
  ```

- **映射类型 (Mapped Types): `[P in K]: Type`** (TS 2.1+)
  基于一个现有类型，创建一个新类型，新类型的属性与旧类型相同，但类型可能被转换。

  ```typescript
  interface Person {
    name: string;
    age: number;
  }

  // 将所有属性变为只读
  type ReadonlyPerson = {
    readonly [P in keyof Person]: Person[P];
  };
  // 内置 Readonly<T> 实现类似功能
  type ReadonlyPersonUtil = Readonly<Person>;

  // 将所有属性变为可选
  type PartialPerson = {
    [P in keyof Person]?: Person[P];
  };
  // 内置 Partial<T> 实现类似功能
  type PartialPersonUtil = Partial<Person>;

  // Pick: 从类型 T 中选择一组属性 K
  type PersonName = Pick<Person, "name">; // { name: string; }

  // Omit: 从类型 T 中移除一组属性 K (TS 3.5+)
  type PersonWithoutAge = Omit<Person, "age">; // { name: string; }

  // Record<K, T>: 创建一个对象类型，其属性键是 K 中的类型，属性值是 T 类型
  type StringMap = Record<string, number>;
  let map: StringMap = { a: 1, b: 2 };

  // 可以添加或移除修饰符 (+/- readonly, +/- ?)
  type Mutable<T> = {
    -readonly [P in keyof T]: T[P]; // 移除 readonly
  };
  type Concrete<T> = {
    [P in keyof T]-?: T[P]; // 移除可选 '?'
  };
  type Optional<T> = {
    [P in keyof T]+?: T[P]; // 添加可选 '?' (同 Partial)
  };

  // 重新映射键名 (TS 4.1+)
  type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
  };
  interface User {
    name: string;
    age: number;
  }
  type UserGetters = Getters<User>; // { getName: () => string; getAge: () => number; }
  ```

- **模板字面量类型 (Template Literal Types)** (TS 4.1+)
  允许基于字符串字面量类型创建新的字符串字面量类型。

  ```typescript
  type World = "world";
  type Greeting = `hello ${World}`; // Type is "hello world"

  type EmailLocaleIDs = "welcome_email" | "email_heading";
  type FooterLocaleIDs = "footer_title" | "footer_sendoff";
  type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
  // Type is "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

  type Lang = "en" | "ja" | "pt";
  type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
  // Type is "en_welcome_email_id" | "en_email_heading_id" | ... | "pt_footer_sendoff_id"

  // 与映射类型结合，重命名属性
  type PropEventSource<T> = {
    // 对于 T 中的每个属性 K (必须是 string)，创建一个新的属性 `on${Capitalize<K>}Change`
    on<K extends string & keyof T>(
      eventName: `${K}Changed`,
      callback: (newValue: T[K]) => void
    ): void;
  };
  declare function makeWatchedObject<T>(obj: T): T & PropEventSource<T>;
  const personWatcher = makeWatchedObject({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26,
  });
  personWatcher.on("firstNameChanged", (newName) => {
    console.log(`new name is ${newName.toUpperCase()}`);
  });
  // personWatcher.on("firstName", () => {}); // Error: "firstName" is not "firstNameChanged"
  // personWatcher.on("ageChanged", newAge => { if(newAge < 0) {} }); // Error: newAge is number, no length property
  ```

**18. 类型守卫 (Type Guards)**

用于在运行时检查类型，并告知 TypeScript 编译器在某个作用域内变量的具体类型。

- **`typeof` 类型守卫:** 适用于 `string`, `number`, `bigint`, `boolean`, `symbol`, `undefined`, `object`, `function`。
  ```typescript
  function printAll(strs: string | string[] | null) {
    if (typeof strs === "object" && strs !== null) {
      // typeof null is "object"
      for (const s of strs) {
        // TS 知道 strs 是 string[]
        console.log(s);
      }
    } else if (typeof strs === "string") {
      // TS 知道 strs 是 string
      console.log(strs);
    } else {
      // TS 知道 strs 是 null
    }
  }
  ```
- **`instanceof` 类型守卫:** 用于检查一个值是否是某个类的实例。右侧必须是构造函数。
  ```typescript
  class Fish {
    swim() {}
  }
  class Bird {
    fly() {}
  }
  function move(pet: Fish | Bird) {
    if (pet instanceof Fish) {
      pet.swim(); // TS 知道 pet 是 Fish
    } else {
      pet.fly(); // TS 知道 pet 是 Bird
    }
  }
  ```
- **`in` 操作符守卫:** 检查对象（或其原型链）上是否存在某个属性。

  ```typescript
  interface Admin {
    name: string;
    privileges: string[];
  }
  interface Employee {
    name: string;
    startDate: Date;
  }
  type UnknownEmployee = Employee | Admin;

  function printEmployeeInformation(emp: UnknownEmployee) {
    console.log("Name: " + emp.name);
    if ("privileges" in emp) {
      // 检查是否存在 privileges 属性
      console.log("Privileges: " + emp.privileges); // TS 知道 emp 是 Admin
    }
    if ("startDate" in emp) {
      console.log("Start Date: " + emp.startDate); // TS 知道 emp 是 Employee
    }
  }
  ```

- **字面量类型守卫 (`===`, `==`, `!==`, `!=`):** 使用等值判断来收窄基于字面量类型的联合类型。

  ```typescript
  type Shape = Circle | Square;
  interface Circle {
    kind: "circle";
    radius: number;
  }
  interface Square {
    kind: "square";
    sideLength: number;
  }

  function getArea(shape: Shape) {
    if (shape.kind === "circle") {
      return Math.PI * shape.radius ** 2; // TS 知道 shape 是 Circle
    } else {
      return shape.sideLength ** 2; // TS 知道 shape 是 Square
    }
  }
  ```

- **自定义类型守卫 (User-Defined Type Guards):** 创建一个返回类型谓词 (`parameterName is Type`) 的函数。

  ```typescript
  class Fish {
    swim() {}
    name = "fish";
  }
  class Bird {
    fly() {}
    name = "bird";
  }

  // 自定义类型守卫函数
  function isFish(pet: Fish | Bird): pet is Fish {
    // 返回一个布尔值，并且函数签名指明了如果返回 true，参数 pet 的类型是 Fish
    return (pet as Fish).swim !== undefined;
    // 更安全的检查可能是 return pet.name === 'fish'; （假设 name 是可靠的判别属性）
  }

  function processPet(pet: Fish | Bird) {
    if (isFish(pet)) {
      pet.swim(); // TS 知道 pet 是 Fish
    } else {
      pet.fly(); // TS 知道 pet 是 Bird
    }
  }
  ```

**19. 模块 (Modules)**

TypeScript 遵循 ES Modules 标准 (`import`/`export`) 来组织代码。任何包含顶级 `import` 或 `export` 的文件都被视为一个模块。

```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}
export const PI = 3.14159;

// main.ts
import { add, PI } from "./math"; // 导入
console.log(add(1, 2));
console.log(PI);

// 默认导出/导入
// utils.ts
export default function log(message: string): void {
  console.log(message);
}
// app.ts
import logger from "./utils"; // 导入默认导出
logger("App started");

// 导入所有导出到一个对象
import * as mathLib from "./math";
console.log(mathLib.add(3, 4));
console.log(mathLib.PI);
```

- **命名空间 (Namespaces):** 早期 TypeScript 使用 `namespace` (或 `internal module`) 来组织代码，避免全局作用域污染。现在推荐使用 ES Modules。但在声明文件 (`.d.ts`) 或组织大型项目内部结构时仍可能用到。

**20. 声明文件 (`.d.ts`)**

当你想在 TypeScript 项目中使用纯 JavaScript 库时，你需要声明文件 (`.d.ts`) 来告诉 TypeScript 编译器这个库的类型信息（变量、函数、类、接口等）。

- 可以手动编写。
- 可以通过 DefinitelyTyped 社区项目获取 (`@types/package-name`)。
- 有些库自带声明文件。

```typescript
// my-js-lib.d.ts (示例)
declare var myLibGlobalVar: string;
declare function myLibFunction(options: MyLibOptions): void;
declare interface MyLibOptions {
  settingA: boolean;
  settingB?: number;
}
declare module "my-module-lib" {
  // 为一个模块提供类型
  export function doSomething(): string;
  export interface Config {
    /* ... */
  }
}
```

**21. `tsconfig.json`**

TypeScript 项目的配置文件，用于指定编译选项、包含/排除的文件等。一些关键选项：

- `target`: 指定编译输出的 ECMAScript 版本 (e.g., "ES5", "ES2016", "ESNext").
- `module`: 指定模块系统 (e.g., "CommonJS", "ESNext", "AMD").
- `outDir`: 输出目录。
- `rootDir`: 输入文件的根目录。
- `strict`: 启用所有严格类型检查选项 (推荐)。包括：
  - `noImplicitAny`: 不允许隐式的 `any` 类型。
  - `strictNullChecks`: 严格的 `null` 和 `undefined` 检查。
  - `strictFunctionTypes`: 更严格的函数类型兼容性检查。
  - `strictBindCallApply`: 对 `bind`, `call`, `apply` 方法进行更严格的类型检查。
  - `strictPropertyInitialization`: 强制在构造函数中初始化类属性（除非它们是可选的或有 `undefined` 类型）。
  - `noImplicitThis`: 不允许 `this` 表达式具有隐式 `any` 类型。
- `esModuleInterop`: 允许更方便地导入 CommonJS 模块。
- `skipLibCheck`: 跳过对库声明文件 (`.d.ts`) 的类型检查。
- `paths`: 路径映射，用于模块解析。
- `typeRoots`, `types`: 指定类型声明文件的查找位置。

**总结 TypeScript 类型系统特点:**

- **灵活性与安全性平衡:** 旨在为 JavaScript 提供类型安全，但通过 `any`、类型断言等提供了逃生舱口，允许渐进式采用和与动态 JS 代码集成。
- **强大的类型推断:** 减少了显式类型注解的需要。
- **丰富的类型构造能力:** 联合类型、交叉类型、字面量类型、泛型、条件类型、映射类型等提供了表达复杂类型结构的强大工具。
- **结构化类型系统:** 基于形状匹配，利于与现有 JavaScript 模式（如鸭子类型）兼容。
- **优秀工具支持:** 强大的 IDE 集成（自动补全、重构、错误检查）。
- **编译时检查:** 类型错误在开发阶段就能发现，而不是等到运行时。

与 Rust 相比，TypeScript 的类型系统更侧重于在 JavaScript 这个动态语言的基础上**增强开发时**的可靠性和可维护性，其类型信息在编译后基本被擦除。而 Rust 的类型系统是其**核心特性**的一部分，深度集成到语言设计中，不仅用于编译时检查，还支撑了内存安全（所有权与借用）、并发安全和零成本抽象等**运行时**相关的保证。选择哪种语言取决于项目的具体需求、目标平台和对性能、安全性的要求。
