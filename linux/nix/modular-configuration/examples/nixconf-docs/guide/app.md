好的，我们来梳理一下如何使用这个配置以及如何添加新软件。

## 一、如何使用这个配置（回顾）

1.  **应用系统配置**：
    -   在你想要配置的主机上（比如 `work`），打开终端。
    -   运行：`sudo nixos-rebuild switch --flake .#work`
    -   这会根据 [`hosts/work/configuration.nix`](hosts/work/configuration.nix ) 构建整个系统并切换到新配置。

2.  **应用用户配置**：
    -   以目标用户身份（比如 `yurii`）登录或使用 `sudo -u yurii`。
    -   运行：`home-manager switch --flake .#yurii@work`
    -   这会根据 [`hosts/work/home.nix`](hosts/work/home.nix ) 构建并应用该用户的家目录配置。

## 二、如何安装一个软件

你有两个主要的选择，取决于你想让这个软件对谁可用：

**选项 1：为特定主机上的所有用户安装（系统级安装）**

-   **在哪里修改**：编辑对应主机的 `configuration.nix` 文件。例如，要给 `work` 主机安装软件，编辑 [`hosts/work/configuration.nix`](hosts/work/configuration.nix )。
-   **如何修改**：找到 `environment.systemPackages` 列表，并将你想要安装的软件包（来自 `pkgs`）添加到列表中。

    **示例**：假设你想在 `work` 主机上安装 `htop`。

    ```nix
    // filepath: c:\Users\hengvvang\Desktop\nixconf\hosts\work\configuration.nix
    { pkgs, ... }: {
      # ... existing code ...

      environment.systemPackages = with pkgs; [
        # ... existing packages like pciutils, cifs-utils ...
        htop # <--- 添加这一行
      ];

      # ... rest of the configuration ...
    }
    ```

-   **应用更改**：修改完文件后，在该主机上运行 `sudo nixos-rebuild switch --flake .#work`。

**选项 2：仅为特定用户安装（用户级安装）**

-   **在哪里修改**：编辑对应用户的 `home.nix` 文件。例如，要给 `work` 主机上的 `yurii` 用户安装软件，编辑 [`hosts/work/home.nix`](hosts/work/home.nix )。
-   **如何修改**：找到 `home.packages` 列表（如果不存在，你需要创建它），并将你想要安装的软件包（来自 `pkgs`）添加到列表中。

    **示例**：假设你想为 `yurii@work` 安装 `cowsay`。

    ```nix
    // filepath: c:\Users\hengvvang\Desktop\nixconf\hosts\work\home.nix
    { pkgs, ... }: {
      # ... existing code ...

      home.packages = with pkgs; [
        # ... other user-specific packages ...
        cowsay # <--- 添加这一行
      ];

      # ... rest of the configuration ...

      # 确保 home.stateVersion 设置了
      home.stateVersion = "23.05"; # 或者你使用的版本
    }
    ```

-   **应用更改**：修改完文件后，以该用户身份运行 `home-manager switch --flake .#yurii@work`。

**如何选择？**

-   如果是一个系统工具、服务、或者你希望所有用户都能使用的图形应用，通常放在 `environment.systemPackages` (选项 1)。
-   如果是一个仅特定用户使用的工具、开发库、或者你想独立于系统管理的用户应用，通常放在 `home.packages` (选项 2)。

**查找软件包名称**：

你可以使用以下方式查找 Nixpkgs 中的软件包名称：
-   NixOS 官方包搜索网站：[https://search.nixos.org/packages](https://search.nixos.org/packages)
-   命令行工具（如果安装了 `nix-index`，来自你的 inputs）：`nix-locate bin/htop` 或 `nix search nixpkgs htop`
