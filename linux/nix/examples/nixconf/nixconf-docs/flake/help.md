下面是这个 Nix Flake 配置的详细使用方法：

## 1. 先决条件

- **安装 Nix**: 确保你的系统上安装了 Nix。
- **启用 Flakes**: Nix 需要启用 Flakes 功能。如果你是 NixOS 用户，可以在 `configuration.nix` 中添加：
  ```nix
  nix.settings.experimental-features = [ "nix-command" "flakes" ];
  ```
  然后运行 `sudo nixos-rebuild switch`。如果是其他 Linux 或 macOS，可能需要在 Nix 配置文件（如 `/etc/nix/nix.conf` 或 `~/.config/nix/nix.conf`）中添加 `experimental-features = nix-command flakes` 并重启 Nix daemon。

## 2. 获取和更新配置

- **获取配置**: 如果你还没有这个配置，可以使用 `git clone <仓库地址>` 将其克隆到本地。
- **进入目录**: `cd nixconf` (假设你的项目目录名为 nixconf)。
- **更新依赖**: 第一次使用或想要更新所有外部依赖（`inputs` 中定义的）到最新版本（根据 flake.nix 中的 URL 规则），可以运行：
  ```sh
  nix flake update
  ```
  这会更新 flake.lock 文件，锁定新的依赖版本。

## 3. 应用 NixOS 系统配置

- **选择目标主机**: 查看 [`flake.nix`](flake.nix ) 中 `outputs.nixosConfigurations` 下定义的主机名，例如 `laptop`, `work`, `vps`。
- **构建并切换 (常用)**: 在目标主机上，运行以下命令来构建新配置并立即切换到它：
  ```sh
  # 假设你要应用 'work' 主机的配置
  sudo nixos-rebuild switch --flake .#work
  ```
  - `.` 表示使用当前目录下的 Flake。
  - `#work` 指向 `outputs.nixosConfigurations.work`。
- **仅构建**: 如果只想构建配置而不切换：
  ```sh
  nixos-rebuild build --flake .#work
  # 或者使用 nix build
  nix build .#work
  ```
  构建结果会保存在 `./result` 符号链接指向的 Nix store 路径中。
- **测试配置**: 构建配置并在虚拟机中启动测试：
  ```sh
  nixos-rebuild test --flake .#work
  ```
- **安装新系统**: 如果你在 NixOS 安装环境中，可以使用此 Flake 来安装系统：
  ```sh
  # 假设 /mnt 是挂载的目标根分区
  nixos-install --root /mnt --flake .#work
  ```

## 4. 应用 Home Manager 用户配置

- **选择目标用户**: 查看 [`flake.nix`](flake.nix ) 中 `outputs.homeConfigurations` 下定义的用户名和主机组合，例如 `"yurii@laptop"`, `"yurii@work"`。
- **构建并切换**: 以目标用户身份（或使用 `sudo -u <用户名>`），运行：
  ```sh
  # 假设你要应用 'yurii@work' 的配置
  home-manager switch --flake .#yurii@work
  ```
  - 这会构建用户的家目录配置并激活它。

## 5. 构建和运行自定义包

- **查看可用包**: 查看 [`flake.nix`](flake.nix ) 中 `outputs.packages.<你的系统架构>` 下定义的包，例如 `astalshell`。
- **构建包**:
  ```sh
  # 构建 astalshell 包
  nix build .#astalshell
  ```
  构建结果位于 `./result`。
- **运行包 (临时)**: 如果包是可执行的，可以直接运行它，Nix 会在需要时先构建它：
  ```sh
  # 运行 astalshell
  nix run .#astalshell -- <传递给程序的参数>
  ```
  这不会将包安装到你的系统中，只是在临时环境中运行。

## 6. 使用自定义模块

- **NixOS 模块**: 在 `hosts/<主机名>/configuration.nix` 文件中，可以通过 `imports` 语句导入 [`nixosModules`](nixosModules ) 目录下的模块。通常 [`flake.nix`](flake.nix ) 中的 `mkSystem` 函数可能已经自动包含了 `outputs.nixosModules.default`，具体取决于 default.nix 的实现。
  ```nix
  # 在 configuration.nix 中
  { inputs, ... }: {
    imports = [
      # 假设 mkSystem 已经注入了 inputs.self.nixosModules.default
      # 或者直接引用相对路径
      ../../nixosModules/my-custom-module.nix
      ./hardware-configuration.nix
    ];
    # ... 使用模块定义的选项
  }
  ```
- **Home Manager 模块**: 类似地，在 `hosts/<主机名>/home.nix` 文件中，可以通过 `imports` 导入 [`homeManagerModules`](homeManagerModules ) 目录下的模块。
  ```nix
  # 在 home.nix 中
  { inputs, ... }: {
    imports = [
      # 假设 mkHome 已经注入了 inputs.self.homeManagerModules.default
      # 或者直接引用相对路径
      ../../homeManagerModules/my-custom-hm-module.nix
    ];
    # ... 使用模块定义的选项
  }
  ```

## 7. 添加新主机或用户

- **添加新主机**:
    1. 在 [`hosts`](hosts ) 目录下创建一个新的子目录，例如 `hosts/server/`。
    2. 在新目录中创建 `configuration.nix`（和可选的 `hardware-configuration.nix`）。
    3. 在 [`flake.nix`](flake.nix ) 的 `outputs.nixosConfigurations` 中添加新条目：`server = mkSystem ./hosts/server/configuration.nix;`。
- **添加新用户配置**:
    1. 在对应主机的目录下创建 `home.nix` 文件（如果尚不存在）。
    2. 在 [`flake.nix`](flake.nix ) 的 `outputs.homeConfigurations` 中添加新条目：`"newuser@server" = mkHome "x86_64-linux" ./hosts/server/home.nix;`。

## 总结

这个 Flake 提供了一个结构化的方式来管理多个 NixOS 系统和用户的配置。通过 [`flake.nix`](flake.nix ) 作为统一入口，使用 `nixos-rebuild` 和 `home-manager` 命令配合 `#` 引用来部署不同的配置，使用 `nix build/run` 来处理自定义包。自定义模块则通过 `imports` 在具体配置中复用。
