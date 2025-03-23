# WSL  -->  Windows Subsystem for Linux

# Windows Subsystem for Linux (WSL)

## 一、WSL 概述
### 1.1 定义与背景
- **什么是 WSL**？
  - WSL 是微软开发的一项技术，允许在 Windows 上运行原生 Linux 环境，无需传统虚拟机或双启动。
  - 通过操作系统级虚拟化或轻量级虚拟机实现，提供 Linux 命令行工具和应用程序支持。
- **发展历程**：
  - **WSL 1**（2016 年）：基于翻译层，将 Linux 系统调用映射到 Windows。
  - **WSL 2**（2019 年）：引入完整 Linux 内核，基于 Hyper-V 技术。
- **用途**：
  - 开发者：运行 Linux 工具（如 Git、GCC）。
  - 系统管理员：测试脚本和配置。
  - 教育：学习 Linux 系统。

### 1.2 WSL 1 与 WSL 2 对比
| 特性                | WSL 1                     | WSL 2                     |
|---------------------|---------------------------|---------------------------|
| **架构**            | 系统调用翻译层            | 轻量级虚拟机 + Linux 内核 |
| **性能**            | 跨文件系统访问快          | Linux 文件系统更快        |
| **兼容性**          | 部分系统调用不支持        | 完整 Linux 内核支持       |
| **资源占用**        | 低                        | 较高（虚拟机开销）        |
| **Docker 支持**     | 不支持                    | 支持                      |
| **GUI 支持**        | 需额外配置                | WSLg（Windows 11）原生支持|

### 1.3 系统要求
- **操作系统**：
  - WSL 1：Windows 10 1607+。
  - WSL 2：Windows 10 2004+（Build 19041）或 Windows 11。
- **硬件**：
  - 支持虚拟化（Intel VT-x/AMD-V，BIOS 中启用）。
  - 建议 4GB+ 内存，8GB+ 更佳。
- **权限**：管理员权限用于安装和配置。

---

## 二、安装与配置
### 2.1 安装 WSL
#### 2.1.1 启用 WSL
- **一键安装**（推荐）：
  ```powershell
  wsl --install
  ```
  - 功能：启用 WSL、安装 WSL 2 组件、下载默认发行版（通常为 Ubuntu）。
  - 要求：Windows 10 2004+ 或 Windows 11。
  - 后续：需重启系统。
- **手动启用**：
  1. 打开“控制面板” -> “程序和功能” -> “启用或关闭 Windows 功能”。
  2. 勾选：
     - **适用于 Linux 的 Windows 子系统**（WSL 1 基础）。
     - **虚拟机平台**（WSL 2 必需）。
  3. 重启系统。
- **验证**：
  ```powershell
  Get-WindowsOptionalFeature -Online | Where-Object {$_.FeatureName -like "*Linux*"}
  ```

#### 2.1.2 安装 Linux 发行版
- **通过 Microsoft Store**：
  - 搜索并安装：Ubuntu、Debian、Kali Linux、openSUSE、Alpine 等。
  - 首次启动：设置用户名和密码。
- **通过命令行**：
  1. 查看可用发行版：
     ```powershell
     wsl --list --online
     ```
     输出示例：
     ```
     NAME                   FRIENDLY NAME
     Ubuntu-22.04          Ubuntu 22.04 LTS
     Debian                Debian GNU/Linux
     kali-linux            Kali Linux Rolling
     ```
  2. 安装：
     ```powershell
     wsl --install -d <发行版名称>
     ```
     示例：
     ```powershell
     wsl --install -d Ubuntu-22.04
     ```
- **初始化**：首次运行会创建默认用户账户。

#### 2.1.3 设置 WSL 版本
- **检查版本**：
  ```powershell
  wsl -l -v
  ```
  输出示例：
  ```
    NAME                   STATE           VERSION
  * Ubuntu-22.04          Running         2
    Debian                Stopped         1
  ```
- **设置默认版本**：
  ```powershell
  wsl --set-default-version 2
  ```
- **转换发行版版本**：
  ```powershell
  wsl --set-version <发行版名称> <版本号>
  ```
  示例：
  ```powershell
  wsl --set-version Debian 2
  ```

#### 2.1.4 更新 WSL
- **检查并更新**：
  ```powershell
  wsl --update
  ```
- **回滚**：
  ```powershell
  wsl --update --rollback
  ```

### 2.2 配置 WSL
- **全局配置文件**：`C:\Users\<用户名>\.wslconfig`
  - 示例：
    ```
    [wsl2]
    memory=8GB            # 内存限制
    processors=4          # CPU 核心数
    swap=2GB              # 交换空间
    localhostForwarding=true # 本地端口转发
    kernel=C:\custom\kernel # 自定义内核路径
    ```
- **发行版配置文件**：`/etc/wsl.conf`
  - 示例：
    ```
    [automount]
    enabled=true          # 自动挂载 Windows 驱动器
    root=/mnt             # 挂载根目录
    options="metadata"    # 支持 Linux 文件权限

    [network]
    generateHosts=true    # 生成 /etc/hosts
    generateResolvConf=true # 生成 /etc/resolv.conf
    ```

---

## 三、WSL 命令全解
以下是 `wsl.exe` 的所有命令、参数和用法，按功能分类。

### 3.1 基本操作
- **`wsl`**：
  - 启动默认发行版的 Shell。
  - 示例：
    ```powershell
    wsl
    ```
- **`--help` 或 `-h`**：
  - 显示帮助信息。
  - 示例：
    ```powershell
    wsl --help
    ```

### 3.2 发行版管理
- **`--list` 或 `-l`**：
  - 列出所有发行版。
  - 示例：
    ```powershell
    wsl -l
    ```
- **`--list --verbose` 或 `-l -v`**：
  - 显示详细信息。
  - 示例：
    ```powershell
    wsl -l -v
    ```
- **`--list --online` 或 `-l -o`**：
  - 列出在线可用发行版。
- **`--set-default` 或 `-s`**：
  - 设置默认发行版。
  - 示例：
    ```powershell
    wsl -s Ubuntu-22.04
    ```
- **`--distribution` 或 `-d`**：
  - 指定发行版运行。
  - 示例：
    ```powershell
    wsl -d Debian
    ```

### 3.3 安装与卸载
- **`--install`**：
  - 安装 WSL 或指定发行版。
  - 参数：
    - `--distribution <名称>`：指定发行版。
    - `--no-launch`：安装后不启动。
  - 示例：
    ```powershell
    wsl --install -d kali-linux --no-launch
    ```
- **`--unregister`**：
  - 删除发行版及其数据。
  - 示例：
    ```powershell
    wsl --unregister Ubuntu-22.04
    ```

### 3.4 版本管理
- **`--version`**：
  - 显示 WSL 版本。
  - 示例：
    ```powershell
    wsl --version
    ```
- **`--set-version`**：
  - 更改发行版版本。
  - 示例：
    ```powershell
    wsl --set-version Debian 1
    ```
- **`--set-default-version`**：
  - 设置新发行版默认版本。
  - 示例：
    ```powershell
    wsl --set-default-version 2
    ```

### 3.5 执行命令
- **`--exec` 或 `-e`**：
  - 在默认发行版执行命令。
  - 示例：
    ```powershell
    wsl -e whoami
    ```
- **结合 `-d`**：
  - 在指定发行版执行。
  - 示例：
    ```powershell
    wsl -d Ubuntu-22.04 -e ls
    ```
- **`--user` 或 `-u`**：
  - 以指定用户运行。
  - 示例：
    ```powershell
    wsl -u root -d Debian
    ```

### 3.6 系统控制
- **`--shutdown`**：
  - 关闭所有 WSL 实例。
  - 示例：
    ```powershell
    wsl --shutdown
    ```
- **`--status`**：
  - 显示 WSL 状态。
  - 示例：
    ```powershell
    wsl --status
    ```

### 3.7 导入与导出
- **`--export`**：
  - 导出发行版为 TAR 文件。
  - 示例：
    ```powershell
    wsl --export Ubuntu-22.04 C:\Backup\ubuntu.tar
    ```
- **`--import`**：
  - 导入发行版。
  - 参数：
    - `--version <版本号>`：指定 WSL 版本。
  - 示例：
    ```powershell
    wsl --import MyUbuntu C:\WSL\MyUbuntu ubuntu.tar --version 2
    ```

### 3.8 更新与调试
- **`--update`**：
  - 更新 WSL。
  - 参数：
    - `--rollback`：回滚到先前版本。
    - `--web-download`：从 Web 下载更新。
  - 示例：
    ```powershell
    wsl --update --web-download
    ```
- **`--verbose`**：
  - 显示详细输出。
  - 示例：
    ```powershell
    wsl --install --verbose
    ```

### 3.9 未覆盖的细节
- **`--cd`**（Windows 11 22H2+）：
  - 设置 WSL 启动时的默认目录。
  - 示例：
    ```powershell
    wsl --cd C:\Users\user\project -d Ubuntu-22.04
    ```
- **`--mount`**（实验性）：
  - 挂载物理磁盘到 WSL 2。
  - 示例：
    ```powershell
    wsl --mount \\.\PHYSICALDRIVE0
    ```
- **`--unmount`**：
  - 卸载挂载的磁盘。
  - 示例：
    ```powershell
    wsl --unmount
    ```

---

## 四、功能与使用
### 4.1 文件系统
- **Windows 文件访问**：
  - 路径：`/mnt/<驱动器字母>`。
  - 示例：
    ```bash
    cat /mnt/c/Windows/notepad.exe
    ```
- **Linux 文件访问**：
  - 路径：`\\wsl$\<发行版名称>`。
  - 示例：
    ```powershell
    explorer.exe \\wsl$\Ubuntu-22.04\home\user
    ```
- **权限管理**：
  - WSL 2 支持 Linux 元数据（需在 `wsl.conf` 中启用 `options="metadata"`）。

### 4.2 运行命令
- **Linux 命令**：
  - 示例：
    ```bash
    sudo apt update
    grep "pattern" file.txt
    ```
- **调用 Windows 程序**：
  - 示例：
    ```bash
    /mnt/c/Windows/System32/calc.exe
    ```

### 4.3 GUI 支持
- **WSL 1**：
  - 配置 X 服务器（如 VcXsrv）：
    ```bash
    export DISPLAY=$(awk '/nameserver/{print $2}' /etc/resolv.conf):0
    ```
  - 示例：
    ```bash
    sudo apt install x11-apps
    xeyes
    ```
- **WSL 2（WSLg）**：
  - Windows 11 原生支持。
  - 示例：
    ```bash
    sudo apt install gedit
    gedit
    ```

### 4.4 网络
- **IP 配置**：
  - 查看：
    ```bash
    ip addr show eth0
    ```
  - WSL 2 使用 NAT，IP 动态分配。
- **端口转发**：
  - 示例：
    ```powershell
    netsh interface portproxy add v4tov4 listenport=8080 connectport=8080 connectaddress=<WSL_IP>
    ```

### 4.5 Docker 与容器
- **安装**：启用 Docker Desktop 的 WSL 2 后端。
- **运行**：
  ```bash
  docker run -it alpine sh
  ```

---

## 五、高级用法
### 5.1 自定义内核
- **步骤**：
  1. 下载或编译 Linux 内核（https://github.com/microsoft/WSL2-Linux-Kernel）。
  2. 在 `.wslconfig` 中指定：
     ```
     [wsl2]
     kernel=C:\custom\bzImage
     ```
  3. 重启 WSL：
     ```powershell
     wsl --shutdown
     ```

### 5.2 迁移发行版
- **导出**：
  ```powershell
  wsl --export Ubuntu-22.04 D:\Backup\ubuntu.tar
  ```
- **导入**：
  ```powershell
  wsl --import NewUbuntu D:\WSL\NewUbuntu D:\Backup\ubuntu.tar
  ```

### 5.3 磁盘管理
- **挂载磁盘**：
  ```powershell
  wsl --mount \\.\PHYSICALDRIVE0 --partition 1
  ```
- **查看挂载**：
  ```bash
  lsblk
  ```

---

## 六、疑难解答
- **WSL 不响应**：
  - 重启：
    ```powershell
    wsl --shutdown
    ```
- **文件访问慢**：
  - 建议将项目存储在 Linux 文件系统中。
- **网络问题**：
  - 检查 `/etc/resolv.conf`，手动设置 DNS：
    ```bash
    echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
    ```

---

## 七、附加资源
- **官方文档**：https://docs.microsoft.com/en-us/windows/wsl/
- **社区支持**：GitHub WSL 仓库、Reddit WSL 社区。
- **工具推荐**：
  - VS Code + WSL 扩展。
  - Windows Terminal。

---

这是一份极其详尽的 WSL 指南，涵盖了所有命令、功能和细节。如果需要更深入的某个部分（如自定义内核的编译步骤），请告诉我！
