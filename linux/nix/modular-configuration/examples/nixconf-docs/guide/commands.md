好的，这是关于 `nixos-rebuild` 和 `home-manager switch` 命令在你的 Flake 配置中的使用指南：

## `nixos-rebuild` 命令指南 (管理整个 NixOS 系统)

`nixos-rebuild` 用于构建和管理整个 NixOS 系统的配置。它会读取 [`flake.nix`](flake.nix ) 中 `outputs.nixosConfigurations` 下定义的系统配置。

**基本用法:**

```bash
sudo nixos-rebuild <子命令> --flake <Flake路径>#<主机名>
```

-   **`sudo`**: 通常需要管理员权限来修改系统配置。
-   **`<子命令>`**: 最常用的有：
    -   `switch`: **构建新配置并立即切换到它**。这是最常用的命令，用于应用更改。
    -   `boot`: 构建新配置并将其设置为**下次启动时默认加载**的配置（但当前系统不变）。
    -   `test`: 构建新配置并在**虚拟机中启动测试**，不影响当前系统。
    -   `build`: **仅构建配置**，生成系统 derivation 到 Nix store，但不激活或设置为启动项。结果通常在 `./result` 符号链接中。
-   **`--flake <Flake路径>#<主机名>`**:
    -   `<Flake路径>`: 通常是 `.`，表示使用当前目录下的 [`flake.nix`](flake.nix )。也可以是 Git URL 或其他 Flake 引用。
    -   `#<主机名>`: 引用 `outputs.nixosConfigurations` 下的键名，例如 `#work`, `#laptop`, `#vps`。

**示例 (基于你的配置):**

1.  **应用 `work` 主机的配置并立即切换:**
    ```bash
    sudo nixos-rebuild switch --flake .#work
    ```
    *这会读取 [`hosts/work/configuration.nix`](hosts/work/configuration.nix ) 并应用更改。*

2.  **构建 `laptop` 主机的配置，设为下次启动项:**
    ```bash
    sudo nixos-rebuild boot --flake .#laptop
    ```

3.  **测试 `vps` 主机的配置:**
    ```bash
    nixos-rebuild test --flake .#vps
    ```
    *(测试通常不需要 `sudo`)*

## `home-manager switch` 命令指南 (管理用户家目录配置)

`home-manager switch` 用于构建和管理特定用户的家目录配置（dotfiles、用户服务、用户安装的包等）。它会读取 [`flake.nix`](flake.nix ) 中 `outputs.homeConfigurations` 下定义的配置。

**基本用法:**

```bash
home-manager switch --flake <Flake路径>#<用户名@主机名>
```

-   **`home-manager switch`**: 这是主要命令，它会构建用户的配置并立即激活它（创建符号链接、启动用户 systemd 服务等）。
-   **运行身份**: **必须以目标用户的身份运行此命令**，或者使用 `sudo -u <用户名> home-manager ...`。不能使用 `sudo` 直接运行，因为它需要修改用户的家目录。
-   **`--flake <Flake路径>#<用户名@主机名>`**:
    -   `<Flake路径>`: 通常是 `.`。
    -   `#<用户名@主机名>`: 引用 `outputs.homeConfigurations` 下的键名，例如 `#yurii@work`, `#yurii@laptop`。

**示例 (基于你的配置):**

1.  **应用 `yurii` 用户在 `work` 主机上的配置:**
    *(假设你当前就是 `yurii` 用户)*
    ```bash
    home-manager switch --flake .#yurii@work
    ```
    *这会读取 [`hosts/work/home.nix`](hosts/work/home.nix ) 并应用更改。*

2.  **如果你是其他用户 (比如 root)，想应用 `yurii` 在 `laptop` 上的配置:**
    ```bash
    sudo -u yurii home-manager switch --flake .#yurii@laptop
    ```

**总结工作流程:**

1.  **修改系统配置**: 编辑 [`hosts/<主机名>/configuration.nix`](hosts/work/configuration.nix )。
2.  **应用系统更改**: 运行 `sudo nixos-rebuild switch --flake .#<主机名>`。
3.  **修改用户配置**: 编辑 [`hosts/<主机名>/home.nix`](hosts/work/home.nix )。
4.  **应用用户更改**: 以该用户身份运行 `home-manager switch --flake .#<用户名@主机名>`。
