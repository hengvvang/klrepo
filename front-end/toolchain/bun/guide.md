Bun 是一个现代的、速度极快的 JavaScript 工具链，集成了运行时、包管理器、打包器和测试运行器。它的目标是提供极致的性能和开发者体验。

**1. 安装 Bun**

首先，你需要安装 Bun。官方推荐使用以下命令（适用于 macOS, Linux, WSL）：

```bash
curl -fsSL https://bun.sh/install | bash
```

安装完成后，你可能需要根据提示配置环境变量，或者重启你的终端。你可以通过运行 `bun --version` `bun -v`来验证安装是否成功。

如果你使用 Windows，可以通过 `npm` 或 `yarn` 安装（需要先安装 Node.js）：

```bash
npm install -g bun
# 或者
yarn global add bun
```

**2. Bun 的核心功能**

Bun 作为一个一体化的工具，主要包含以下几个核心功能：

- **JavaScript/TypeScript 运行时 (Runtime):**

  - 可以直接运行 `.js`, `.ts`, `.jsx`, `.tsx` 文件，无需预编译。
  - 命令：`bun run <文件名>`
  - 示例：`bun run index.ts` 或 `bun index.ts`
  - 它内置了许多 Web 标准 API（如 `Workspace`, `WebSocket`, `ReadableStream`）和 Node.js 兼容的 API。
  - 以极高的性能著称。

- **包管理器 (Package Manager):**

  - 用来替代 `npm`, `yarn`, `pnpm`。
  - **安装依赖:** `bun install` 或 `bun i`
    - 速度非常快，读取 `package.json` 并安装依赖。
    - 生成或更新 `bun.lockb`（二进制锁文件，取代 `package-lock.json` 或 `yarn.lock`）。
  - **添加依赖:** `bun add <包名>` (添加到 `dependencies`) 或 `bun add -d <包名>` (添加到 `devDependencies`)。
  - **移除依赖:** `bun remove <包名>`。
  - **更新依赖:** `bun update <包名>` 或 `bun update` (更新所有)。
  - **全局添加:** `bun add -g <包名>`。
  - 支持 `workspaces`。

- **打包器 (Bundler):**

  - 可以将你的代码（JS/TS/CSS 等）打包成可在浏览器、Node.js 或 Bun 环境运行的文件。
  - 命令：`bun build <入口文件...> --outdir <输出目录>`
  - 示例：`bun build ./src/index.ts --outdir ./dist --target browser`
  - 支持 Tree Shaking、Minification、Source Maps 等。
  - 目标环境 (`--target`) 可以是 `browser`, `node`, `bun`。

- **测试运行器 (Test Runner):**
  - 提供了一个与 Jest 兼容的快速测试环境。
  - 命令：`bun test` 或 `bun t`
  - 会自动查找项目中的测试文件（如 `*.test.ts`, `*_test.js` 等）。
  - 支持 `describe`, `it`, `expect` 等 API。
  - 常用选项：`--watch` (监听文件变化自动重跑测试), `--coverage` (生成测试覆盖率报告)。

**3. 创建项目 (`bun create`)**

`bun create` 是 Bun 提供的脚手架命令，用于快速基于模板创建新项目。它会自动从模板源（如官方模板、npm 上的 `create-*` 包或 GitHub 仓库）拉取代码，并自动运行 `bun install` 安装依赖。

**基本语法:**

```bash
bun create <template> [<destination>]
```

- `<template>`: 你想要使用的模板名称或来源。
- `[<destination>]`: (可选) 新项目存放的目录名。如果省略，通常会提示你输入或使用模板名作为目录名。

**模板来源和示例:**

- **官方内置模板:** Bun 提供了一些官方模板。最基础的是 `bun-init`，用于创建一个简单的 Bun 项目（可以通过 `bun init` 命令直接使用）。

  ```bash
  # 创建一个基础的 Bun 项目 (等同于 bun init)
  bun create bun-init my-basic-app
  cd my-basic-app
  bun run index.ts # 运行示例文件
  ```

- **流行的框架/库模板:** Bun 可以直接使用许多流行框架的官方 `create-*` 脚手架包（它会自动映射）。

  - **React:**
    ```bash
    # bun create react my-react-app
    bun create react-app react-proj
    # 或者使用 Vite 的 React 模板
    # bun create vite my-react-app --template react-ts
    ```
  - **Next.js:**
    ```bash
    # bun create next my-nextjs-app
    bun create next-app nextjs-proj
    ```
  - **Vue.js:**
    ```bash
    # bun create vue my-vue-app
    bun create vue-app my-vue-app
    # 或者使用 Vite 的 Vue 模板
    # bun create vite my-vue-app --template vue-ts
    ```
  - **Svelte / SvelteKit:**
    ```bash
    # bun create svelte my-svelte-app
    bun create svelte-app my-svelte-app
    # 创建 SvelteKit 项目
    # bun create svelte my-sveltekit-app # 它会启动 SvelteKit 的交互式安装程序
    ```
  - **Astro:**
    ```bash
    bun create astro my-astro-app
    ```
  - **ElysiaJS (Bun 原生的 Web 框架):**
    ```bash
    bun create elysia my-elysia-app
    ```
  - **Hono (可在多种环境运行的 Web 框架):**
    ```bash
    bun create hono my-hono-app
    ```
  - **Vite 项目 (可以选择不同模板):**

    ```bash
    # 创建一个基于 Vite 的 React + TypeScript 项目
    bun create vite my-vite-react-ts-app --template react-ts

    # 创建一个基于 Vite 的 Vue + TypeScript 项目
    bun create vite my-vite-vue-ts-app --template vue-ts
    ```

    (你可以通过 `npm create vite -- --template list` 查看所有可用 Vite 模板)

- **使用 GitHub 仓库作为模板:** 你可以直接使用 GitHub 上的任何公开仓库作为模板。

  ```bash
  # 使用某个用户的某个仓库作为模板
  bun create <github用户名>/<仓库名> my-project-from-gh

  # 示例：使用某个特定的 React 模板仓库
  # bun create some-user/react-starter my-react-starter-app

  # 还可以指定分支、标签或提交 hash
  bun create <用户名>/<仓库名>#<分支名/标签名/commit-hash> my-project-branch
  ```

  这对于使用团队内部的模板或社区提供的特定配置模板非常方便。

**`bun create` 的工作流程:**

1.  **解析模板:** Bun 会判断 `<template>` 是官方模板、npm 包 (`create-<template>`) 还是 GitHub 仓库 (`user/repo`)。
2.  **下载模板:** 从相应的来源下载模板文件。对于 npm 包，它会执行对应的 `create-*` 命令。对于 GitHub 仓库，它会克隆仓库。
3.  **复制文件:** 将模板文件复制到指定的 `<destination>` 目录。
4.  **安装依赖:** 自动在目标目录中运行 `bun install`。

**4. 其他常用命令**

- **运行 `package.json` 中的脚本:**

  ```bash
  bun run <script-name>
  ```

  例如，如果 `package.json` 中有 `"dev": "vite"`，则运行 `bun run dev`。这通常比 `npm run` 更快。

- **直接执行 npm 包的二进制文件 (类似 `npx`):**

  ```bash
  bunx <package-command> [args...]
  ```

  例如，要临时运行 `cowsay` 包：

  ```bash
  bunx cowsay "Hello from Bun!"
  ```

  如果本地没有安装该包，`bunx` 会临时下载并执行它。

- **Bun Shell (`$``):**
  Bun 还引入了一个实验性的、跨平台的 Shell，你可以在 JavaScript/TypeScript 文件中直接使用 `$`` 来执行 shell 命令。

  ```typescript
  // example.ts
  import { $ } from "bun";

  // 执行命令并获取输出
  const output = await $`ls -l`.text();
  console.log(output);

  // 可以链式调用
  await $`echo "Hello" > file.txt`;
  await $`cat file.txt`;

  // 也可以在脚本中使用
  // bun run script.ts
  ```

**总结**

Bun 旨在通过一个高性能、集成的工具链来简化 JavaScript 开发。它的核心优势在于速度和易用性。`bun create` 命令使得基于各种模板快速启动新项目变得非常简单高效。

**建议:**

- 由于 Bun 仍在快速发展中，建议经常查阅 [Bun 官方文档](https://bun.sh/docs) 获取最新信息和更详细的 API 说明。
- 尝试将 Bun 用于你的新项目或现有项目中（例如，仅作为包管理器或测试运行器），体验其带来的性能提升。

希望这份详细介绍能帮助你更好地理解和使用 Bun！
