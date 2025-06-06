**什么是 GitHub Actions？**

GitHub Actions 是 GitHub 提供的一个强大的自动化平台。它允许你在 GitHub 仓库中自动化各种软件开发工作流程，例如构建（Build）、测试（Test）、打包（Package）、发布（Release）和部署（Deploy）你的代码，以及执行其他自定义任务。

这些自动化任务被称为 **工作流（Workflows）**，它们由一系列 **作业（Jobs）** 组成，而每个作业又包含多个 **步骤（Steps）**。步骤可以运行脚本命令，也可以使用预先构建好的可重用单元，称为 **操作（Actions）**。

**核心概念：**

1.  **工作流 (Workflow):**
    * 一个可配置的自动化过程，定义在仓库的 `.github/workflows/` 目录下的 YAML 文件中。
    * 一个仓库可以有多个工作流，每个工作流可以执行不同的任务。
    * 由一个或多个作业组成。

2.  **事件 (Event):**
    * 触发工作流运行的特定活动。例如 `push`（推送到仓库）、`pull_request`（发起拉取请求）、`schedule`（定时触发）、`workflow_dispatch`（手动触发）等。

3.  **作业 (Job):**
    * 工作流中的一个执行单元，在一系列步骤的集合。
    * 默认情况下，工作流中的多个作业是并行运行的。你可以设置依赖关系，使它们按顺序运行。
    * 每个作业都在一个 **运行器 (Runner)** 环境中运行。

4.  **步骤 (Step):**
    * 作业中的单个任务。
    * 可以运行 shell 命令 (`run`)，或者使用一个 **操作 (Action)** (`uses`)。
    * 作业中的步骤按顺序执行。

5.  **操作 (Action):**
    * 可重用的代码单元，是工作流的基本构建块。
    * 可以是你自己仓库中的脚本、公共仓库中的操作（例如 GitHub 官方或社区提供的），或者是一个 Docker 容器镜像。
    * 大大简化了工作流的编写，例如 `actions/checkout` 用于检出代码，`actions/setup-node` 用于设置 Node.js 环境。

6.  **运行器 (Runner):**
    * 执行工作流作业的服务器。
    * GitHub 提供托管的运行器（Ubuntu Linux, macOS, Windows）。
    * 你也可以配置自己的 **自托管运行器 (Self-hosted Runner)**。

**工作流文件 (Workflow File):**

* 必须存储在仓库根目录下的 `.github/workflows/` 目录中。
* 使用 YAML 语法编写。
* 文件名可以是任意的，但通常以 `.yml` 或 `.yaml` 结尾。

---

**示例 1：一个简单的工作流**

假设我们想在每次向仓库 `push` 代码时，打印一条问候信息。

**文件路径：** `.github/workflows/simple-greeting.yml`

```yaml
# 工作流的名称，会显示在 GitHub 仓库的 Actions 选项卡中
name: Simple Greeting Workflow

# 触发工作流的事件
# 这里设置为当有 'push' 事件发生到任何分支时触发
on: push

# 定义工作流包含的作业
jobs:
  # 作业的唯一 ID ('greeting_job' 是我们自定义的 ID)
  greeting_job:
    # 指定运行该作业的运行器环境
    # 'ubuntu-latest' 表示使用最新版的 Ubuntu Linux 运行器
    runs-on: ubuntu-latest

    # 定义该作业包含的步骤
    steps:
      # 第一个步骤：使用 'name' 字段为步骤提供一个可读的名称
      - name: Print Greeting Message
        # 使用 'run' 关键字执行 shell 命令
        run: echo "Hello, GitHub Actions! This workflow was triggered by a push."

      # 第二个步骤：可以运行多行命令
      - name: Print Multi-line Message
        run: |
          echo "This is the second step."
          echo "Workflow execution continues..."
```

**配置文件解释：**

* `name: Simple Greeting Workflow`: 定义工作流的名称。
* `on: push`: 指定触发条件。这里是任何 `push` 操作。你可以更精确地指定分支，例如 `on: push: branches: [ main ]` 只在 `main` 分支有 `push` 时触发。
* `jobs:`: 开始定义作业列表。
* `greeting_job:`: 定义一个名为 `greeting_job` 的作业。
* `runs-on: ubuntu-latest`: 指定这个作业在 GitHub 托管的最新 Ubuntu 运行器上执行。
* `steps:`: 开始定义这个作业的步骤列表。
* `- name: Print Greeting Message`: 定义步骤的名称，方便在日志中识别。
* `run: echo "..."`: 执行一个单行 shell 命令。
* `run: |`: 使用 `|` 可以执行多行 shell 命令。

---

**示例 2：一个典型的 CI (持续集成) 工作流**

假设我们有一个 Node.js 项目，我们希望在每次向 `main` 分支 `push` 或者向 `main` 分支发起 `pull_request` 时，自动执行以下操作：

1.  检出代码。
2.  设置 Node.js 环境（比如 Node.js 18.x 和 20.x）。
3.  安装项目依赖。
4.  运行测试。

**文件路径：** `.github/workflows/node-ci.yml`

```yaml
name: Node.js CI

# 触发条件：
# 1. push 到 main 分支
# 2. 对 main 分支发起 pull_request
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  # 作业 ID: build_and_test
  build_and_test:
    runs-on: ubuntu-latest

    # 使用 'strategy' 和 'matrix' 可以在多个配置下运行作业
    # 这里我们将在 Node.js 18.x 和 20.x 两个版本下分别运行此作业
    strategy:
      matrix:
        node-version: [18.x, 20.x]
        # 你还可以添加其他 matrix 变量，例如操作系统：
        # os: [ubuntu-latest, windows-latest]

    steps:
      # 步骤 1: 检出代码
      # 使用 GitHub 官方提供的 'checkout' action
      - name: Checkout repository
        uses: actions/checkout@v4 # '@v4' 指定使用该 action 的 v4 版本

      # 步骤 2: 设置 Node.js 环境
      # 使用 GitHub 官方提供的 'setup-node' action
      - name: Set up Node.js ${{ matrix.node-version }} # 在名称中使用变量
        uses: actions/setup-node@v4
        with:
          # 'with' 关键字用于向 action 传递参数
          # '${{ matrix.node-version }}' 引用上面 matrix 中定义的变量
          node-version: ${{ matrix.node-version }}
          # 可选：缓存 npm 依赖项以加快后续构建速度
          cache: 'npm'

      # 步骤 3: 安装依赖项
      # 'npm ci' 通常比 'npm install' 更快、更可靠，用于 CI 环境
      - name: Install dependencies
        run: npm ci

      # 步骤 4: 运行测试 (假设你的 package.json 中定义了 "test" 脚本)
      - name: Run tests
        run: npm test

      # 示例：使用环境变量和 secrets
      # 假设你在仓库设置中定义了一个名为 'API_KEY' 的 Secret
      - name: Example using secrets and env variables
        env:
          # 将仓库 Secret 'API_KEY' 赋值给环境变量 'MY_API_KEY'
          MY_API_KEY: ${{ secrets.API_KEY }}
          # 定义一个普通的环境变量
          NODE_ENV: production
        run: |
          echo "Running with NODE_ENV=${NODE_ENV}"
          # 注意：永远不要直接打印 Secret 的值！这里只是演示如何使用它
          # 例如，你可能会在这里运行一个需要 API Key 的脚本
          if [ -n "$MY_API_KEY" ]; then
            echo "API Key secret is set (but not shown)."
          else
            echo "API Key secret is not set."
          fi
```

**配置文件解释 (新增部分):**

* `on: push: branches: [ main ]` 和 `on: pull_request: branches: [ main ]`: 更精确地定义了触发条件。
* `strategy: matrix: node-version: [18.x, 20.x]`: 定义了一个构建矩阵。这个作业会并行运行两次，一次 `node-version` 是 `18.x`，另一次是 `20.x`。这对于测试代码在不同环境下的兼容性非常有用。
* `uses: actions/checkout@v4`: 使用了一个名为 `actions/checkout` 的预定义操作来获取仓库代码。`@v4` 是该操作的版本号。使用 `uses` 是 GitHub Actions 的核心特性，让你能够轻松复用社区或官方提供的功能。
* `uses: actions/setup-node@v4`: 使用 `actions/setup-node` 操作来安装指定版本的 Node.js。
* `with: node-version: ${{ matrix.node-version }}`: `with` 用于向 `action` 传递输入参数。`${{ <expression> }}` 是 GitHub Actions 的表达式语法，这里引用了 `matrix` 中定义的 `node-version` 变量。
* `with: cache: 'npm'`: 这是一个 `setup-node` 操作的可选参数，用于缓存 `npm` 的依赖包，可以显著加快后续工作流的运行速度。
* `run: npm ci`: 运行标准的 `npm` 命令来安装依赖。
* `run: npm test`: 运行测试脚本。
* `env:`: 定义环境变量。
* `MY_API_KEY: ${{ secrets.API_KEY }}`: `secrets` 是 GitHub Actions 提供的安全存储敏感信息（如 API 密钥、密码）的方式。你需要在仓库的 `Settings > Secrets and variables > Actions` 中预先定义好 `API_KEY` 这个 Secret。工作流通过 `${{ secrets.SECRET_NAME }}` 来引用它，它的值不会在日志中显示出来。

---

**总结和关键点：**

* **自动化：** GitHub Actions 的核心是自动化开发流程中的重复性任务。
* **集成：** 与 GitHub 平台紧密集成，易于根据代码事件触发。
* **灵活性：** 支持多种操作系统、多种语言环境，并且可以通过 `matrix` 策略进行多环境测试。
* **可重用性：** 通过 `actions` 市场，可以方便地使用和共享自动化单元。
* **安全性：** 提供 `secrets` 来管理敏感信息。
* **位置：** 所有工作流定义在 `.github/workflows/` 目录下的 YAML 文件中。
* **语法：** 掌握基本的 YAML 语法以及 GitHub Actions 的特定关键字（`name`, `on`, `jobs`, `runs-on`, `steps`, `uses`, `run`, `with`, `env`, `secrets`）是关键。
