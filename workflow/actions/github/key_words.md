```
GitHub Actions (自动化平台)
│
├── 核心概念 (Core Concepts)
│   ├── 工作流 (Workflow): 自动化流程的定义 (.yml 文件)
│   ├── 事件 (Event): 触发工作流的原因 (如 push, pull_request)
│   ├── 作业 (Job): 工作流中的执行单元，包含步骤
│   ├── 步骤 (Step): 作业中的具体任务 (运行命令或 Action)
│   ├── 操作 (Action): 可重用的自动化代码单元 (如 actions/checkout)
│   └── 运行器 (Runner): 执行作业的环境 (如 ubuntu-latest)
│
├── 工作流文件结构 (`.github/workflows/*.yml`)
│   │
│   ├── 顶级关键字 (Top-Level Keywords)
│   │   ├── name:       工作流名称 (易于识别)
│   │   ├── on:         触发事件定义 (何时运行)
│   │   │   ├── push, pull_request, schedule, workflow_dispatch, ... (具体事件)
│   │   │   └── branches, tags, paths, types, inputs, ... (事件过滤器和配置)
│   │   ├── jobs:       包含所有作业的容器
│   │   ├── env:        工作流级别的环境变量
│   │   └── permissions: 工作流级别 GITHUB_TOKEN 的权限
│   │
│   └── 作业定义 (`jobs.<job_id>: ...`)
│       │
│       ├── `<job_id>`: 作业的唯一标识符 (如 `build`, `test`)
│       │
│       └── 作业级关键字 (Job-Level Keywords)
│           ├── name:          作业显示名称
│           ├── runs-on:       指定运行器 (如 `ubuntu-latest`)
│           ├── needs:         定义作业依赖关系 (控制执行顺序)
│           ├── if:            作业的条件执行语句
│           ├── strategy:      定义构建策略 (如矩阵)
│           │   ├── matrix:        配置矩阵 (多环境测试)
│           │   ├── fail-fast:     矩阵中快速失败选项
│           │   └── max-parallel:  矩阵最大并行数
│           ├── env:           作业级别的环境变量
│           ├── outputs:       定义作业输出 (供后续作业使用)
│           ├── steps:         包含该作业所有步骤的列表
│           ├── timeout-minutes: 作业超时时间 (分钟)
│           └── permissions:   作业级别 GITHUB_TOKEN 的权限
│
└── 步骤定义 (`steps: - ...`)
    │
    ├── `-`:          步骤列表中的一项
    │
    └── 步骤级关键字 (Step-Level Keywords)
        ├── id:              步骤唯一标识符 (用于引用输出/状态)
        ├── name:            步骤显示名称
        ├── uses:            指定要使用的 Action (可重用代码)
        │   └── with:          传递给 Action 的输入参数
        ├── run:             要执行的命令行脚本
        ├── if:              步骤的条件执行语句
        ├── env:             步骤级别的环境变量
        ├── working-directory: 步骤执行的工作目录
        ├── shell:           指定执行 `run` 命令的 shell
        ├── continue-on-error: 步骤失败时是否继续执行作业 (布尔值)
        └── timeout-minutes:   步骤超时时间 (分钟)

```

**树状图说明:**

1.  **顶层:** 是 GitHub Actions 这个平台本身及其核心的设计理念。
2.  **第二层:** 分解为核心概念和工作流文件的基本结构。
3.  **第三层及以下:**
    * 详细列出了工作流文件中的主要**关键字**。
    * 按照关键字的作用范围（**顶级**、**作业级**、**步骤级**）进行组织。
    * 对于像 `on` 和 `strategy` 这样有子配置项的关键字，也展示了其下一层常见的配置。
    * 像 `uses` 和 `with`、`run` 这样密切相关的关键字被放在一起表示其关联性。


**1. 顶级关键字 (Workflow Level)**

* `name`
    * **作用:** 定义工作流的名称。这个名称会显示在你的仓库的 "Actions" 选项卡中。如果省略，GitHub 会使用工作流文件的相对路径作为名称。
    * **示例:**
        ```yaml
        name: CI Pipeline for Production
        ```

* `on`
    * **作用:** 定义触发工作流运行的事件。这是工作流的入口点。
    * **用法:** 可以是单个事件、事件数组或包含更详细配置（如分支、标签、路径过滤，事件类型等）的映射。
    * **常见事件:** `push`, `pull_request`, `schedule` (定时), `workflow_dispatch` (手动触发), `release`, `page_build` 等。
    * **示例:**
        ```yaml
        # 简单触发：push 到任何分支时
        on: push

        # 复杂触发：push 到 main 或 dev 分支，或者对 main 分支发起 PR 时
        on:
          push:
            branches:
              - main
              - dev
            paths: # 仅当特定路径文件变化时触发
              - 'src/**'
          pull_request:
            branches: [ main ]
            types: [ opened, synchronize, reopened ] # PR 的具体活动类型
          schedule:
            - cron: '30 5 * * 1-5' # 周一到周五 UTC 5:30 运行
          workflow_dispatch: # 允许手动触发
            inputs: # 可选：定义手动触发时的输入参数
              logLevel:
                description: 'Log level'
                required: true
                default: 'warning'
        ```

* `env` (顶级)
    * **作用:** 定义可用于工作流中所有作业和步骤的环境变量。
    * **示例:**
        ```yaml
        name: Global Environment
        on: push
        env:
          GLOBAL_VAR: 'Available everywhere'
        jobs:
          # ... jobs can access ${{ env.GLOBAL_VAR }}
        ```

* `jobs`
    * **作用:** 包含工作流中要执行的所有作业。工作流必须至少有一个作业。
    * **结构:** 一个映射 (map)，其中每个键是一个唯一的 `job_id`。
    * **示例:**
        ```yaml
        jobs:
          build:
            # ... build job configuration ...
          test:
            # ... test job configuration ...
        ```

* `permissions` (顶级)
    * **作用:** 为整个工作流运行中使用的 `GITHUB_TOKEN` 设置权限。可以限制 Token 的访问范围，提高安全性。
    * **示例:**
        ```yaml
        name: Secure Workflow
        on: push
        permissions:
          contents: read # 只允许读取仓库内容
          packages: write # 允许写入 GitHub Packages
        jobs:
          # ...
        ```

**2. 作业关键字 (Job Level - 在 `jobs.<job_id>` 下)**

* `<job_id>` (例如 `build`, `test`)
    * **作用:** 作业的唯一标识符。必须以字母或 `_` 开头，并且只能包含字母数字字符、`-` 或 `_`。
    * **示例:** `jobs: my_first_job: ...`

* `name` (作业级别)
    * **作用:** 作业的显示名称，会显示在 GitHub UI 上。
    * **示例:** `jobs: build: name: Build Application ...`

* `runs-on`
    * **作用:** 指定运行该作业的运行器 (runner) 类型。可以是 GitHub 托管的运行器或自托管运行器。
    * **常见值:** `ubuntu-latest`, `windows-latest`, `macos-latest`, `self-hosted`, 或更具体的版本如 `ubuntu-22.04`。也可以是标签组合 `[self-hosted, linux, x64]`。
    * **示例:** `runs-on: ubuntu-latest`

* `needs`
    * **作用:** 定义作业之间的依赖关系。当前作业只有在 `needs` 列出的所有作业成功完成后才会开始。
    * **用法:** 可以是单个 `job_id` 或 `job_id` 数组。
    * **示例:**
        ```yaml
        jobs:
          build:
            # ...
          test:
            needs: build # test 作业会在 build 作业成功后运行
            # ...
          deploy:
            needs: [build, test] # deploy 作业会在 build 和 test 都成功后运行
            # ...
        ```

* `if` (作业级别)
    * **作用:** 条件执行。只有当 `if` 条件评估为 `true` 时，作业才会运行。通常使用 GitHub 上下文和表达式。
    * **示例:** `if: github.ref == 'refs/heads/main'` (仅当事件发生在 main 分支时运行此作业)

* `env` (作业级别)
    * **作用:** 定义仅在该作业内可用的环境变量。会覆盖工作流级别的同名 `env`。
    * **示例:** `jobs: test: env: NODE_ENV: test ...`

* `strategy`
    * **作用:** 定义作业的构建策略，最常用的是 `matrix` 策略，用于在不同配置组合下运行作业。
    * **子关键字:**
        * `matrix`: 定义配置矩阵。
        * `fail-fast`: (布尔值) 如果设置为 `true` (默认)，则矩阵中任何一个作业失败，GitHub 会立即取消所有进行中的和待处理的同一矩阵作业。设置为 `false` 则允许所有作业运行完成，无论其他作业是否失败。
        * `max-parallel`: (整数) 允许同时运行的最大作业数。
    * **示例:**
        ```yaml
        strategy:
          fail-fast: false
          matrix:
            os: [ubuntu-latest, windows-latest]
            node: [18, 20]
            include: # 额外添加组合
              - os: ubuntu-latest
                node: 16
            exclude: # 排除特定组合
              - os: windows-latest
                node: 18
        ```

* `outputs` (作业级别)
    * **作用:** 定义作业的输出。这些输出可被依赖于此作业的其他作业 (`needs`) 使用。
    * **用法:** 值通常来自作业内某个步骤的输出。
    * **示例:**
        ```yaml
        jobs:
          build:
            runs-on: ubuntu-latest
            outputs:
              build_artifact_name: ${{ steps.package.outputs.artifact_name }}
            steps:
              - id: package # 给步骤一个 ID
                run: echo "::set-output name=artifact_name::my-app-${{ github.sha }}"
          deploy:
            needs: build
            runs-on: ubuntu-latest
            steps:
              - run: echo "Deploying ${{ needs.build.outputs.build_artifact_name }}"
        ```

* `steps`
    * **作用:** 包含该作业要按顺序执行的一系列任务（步骤）。
    * **结构:** 一个步骤对象 (`-`) 的列表。
    * **示例:** `steps: - name: ... - uses: ... - run: ...`

* `timeout-minutes` (作业级别)
    * **作用:** 作业在被自动取消前可以运行的最长时间（分钟）。默认 360 分钟（6 小时）。
    * **示例:** `timeout-minutes: 15`

* `continue-on-error` (作业级别，不常用，通常在步骤级别)
    * **作用:** 如果设置为 `true`，即使此作业失败，依赖于它的其他作业（如果 `if` 条件允许）仍可能运行。

* `permissions` (作业级别)
    * **作用:** 为单个作业设置 `GITHUB_TOKEN` 的权限，会覆盖工作流级别的设置。
    * **示例:** `jobs: release: permissions: contents: write ...`

**3. 步骤关键字 (Step Level - 在 `steps` 列表的每个 `-` 项下)**

* `-` (破折号)
    * **作用:** 标记步骤列表中的一个独立步骤。

* `id`
    * **作用:** 为步骤分配一个唯一标识符。用于在同一作业的其他步骤中引用该步骤的输出 (`outputs`) 或结论 (`conclusion`)。
    * **示例:** `- id: build_step ...`

* `name` (步骤级别)
    * **作用:** 步骤的可读名称，显示在日志中。
    * **示例:** `- name: Install NPM Dependencies`

* `uses`
    * **作用:** 指定要运行的 **Action**。Action 是可重用的代码单元。可以是公共仓库的操作、同一仓库的操作或 Docker 镜像。
    * **语法:** `{owner}/{repo}@{ref}`, `./path/to/action`, `docker://image:tag`
    * **示例:** `uses: actions/checkout@v4`, `uses: ./my-custom-action`

* `with`
    * **作用:** 为 `uses` 指定的 Action 提供输入参数。
    * **结构:** 一个键值对映射。
    * **示例:**
        ```yaml
        - uses: actions/setup-node@v4
          with:
            node-version: '18'
            cache: 'npm'
        ```

* `run`
    * **作用:** 在运行器的 shell 中执行命令行程序。可以是单行或多行命令。
    * **示例 (单行):** `run: npm install`
    * **示例 (多行):**
        ```yaml
        run: |
          echo "Starting build..."
          npm run build
        ```

* `if` (步骤级别)
    * **作用:** 条件执行。只有当 `if` 条件评估为 `true` 时，步骤才会运行。
    * **示例:** `if: success() && matrix.os == 'ubuntu-latest'` (仅当之前步骤成功且矩阵变量 os 是 ubuntu 时运行)

* `env` (步骤级别)
    * **作用:** 定义仅在该步骤内可用的环境变量。会覆盖作业级别和工作流级别的同名 `env`。
    * **示例:** `- name: Run Script with API Key env: API_KEY: ${{ secrets.MY_API_KEY }} run: ./scripts/deploy.sh`

* `continue-on-error` (步骤级别)
    * **作用:** 如果设置为 `true`，即使此步骤失败（退出码非 0），作业也会继续执行后续步骤。默认为 `false`。
    * **示例:** `- name: Optional Test run: npm run optional-test continue-on-error: true`

* `timeout-minutes` (步骤级别)
    * **作用:** 步骤在被自动取消前可以运行的最长时间（分钟）。
    * **示例:** `- name: Long Running Task timeout-minutes: 120 run: ./long-task.sh`

* `working-directory`
    * **作用:** 指定 `run` 命令执行的目录。默认是仓库的根目录。
    * **示例:** `working-directory: ./backend run: npm install`

* `shell`
    * **作用:** 指定用于执行 `run` 命令的 shell。可以是 `bash`, `pwsh` (PowerShell), `python`, `sh`, `cmd`, `pwsh`。默认值取决于运行器操作系统。
    * **示例:** `shell: bash run: | set -e # Exit immediately if a command exits with a non-zero status. echo "Hello"`
