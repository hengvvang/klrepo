`Home Mananger` 作为模块使用；
---

# NixOS Module
> As a module within a NixOS system configuration

## 全部在 `configuration.nix` 中配置
> 混合系统配置和用户配置使用  `就是所有的home配置全都在 configuration.nix 里面配置`
  - 文件结构
    ```
    root
    |
    |--etc
    |   |--nixos
    |   |   |--hardware-configuration.nix
    |   |   |
    |   |   |--configuration.nix  // homemanager 在这里配置
    ```

### 使用方法

- 设置通道
  ```
  sudo nix-channel --add https://github.com/nix-community/home-manager/archive/master.tar.gz home-manager //添加home-manager通道
  sudo nix-channel --update //更新通道
  ```

- 配置  configuration.nix;
  1. `imports = [ <home-manager/nixos>` ]

  2. `users.users.<userName>.isNormalUser = true`

  3. `home-manager.users.<userName> = { pkgs, ...}: {
      home.packages = [ pkgs.atool pkgs.httpie ];
      home.stateVersion = "25.05";
      }`

  - `EXAMPLES`
    ```
    { config, pkgs, ...}:

    {
      imports =
        [
          ./hardware-configuration.nix
          <home-manager/nixos>
        ]

        ...

        users.users.<userName> = {
          isNormalUser = true;
          descirption = "...";
          extraGroups = [ "wheel" ];
          packages = with pkgs; [];
        };

        home-manager.users.<userName> = { pkgs, ...}: {
          home.packages = [ pkgs.atool pkgs.httpie ];
          home.stateVersion = "25.05";
        };
    }
    ```
4. 安装并验证
  ```
  sudo nixos-rebuild switch
  http --version  //输出版本号
  which http  //输出存储位置  /home/userName/.nix-profile/bin/http
  ```


## configuration.nix + home.nix
> 分离用户配置和系统配置，使用 `home.nix` 模块化配置
  - 文件结构
    ```
    root
    |
    |--etc
    |   |--nixos
    |   |   |--hardware-configuration.nix
    |   |   |
    |   |   |--configuration.nix
    |   |   |
    |   |   |--home.nix
    ```
### 使用方法

- 设置通道
  ```
  sudo nix-channel --add https://github.com/nix-community/home-manager/archive/master.tar.gz home-manager //添加home-manager通道
  sudo nix-channel --update //更新通道
  ```

- 配置  configuration.nix;
  1. `imports = [ <home-manager/nixos>` ]

  2. `users.users.<userName>.isNormalUser = true`

  3. `home-manager = {
      userGlobalPkgs = true;
      useUserPackages = true;
      user.<userName> = import ./home.nix;
      };`

  }`
  - `EXAMPLES`
    ```
    { config, pkgs, ...}:

    {
      imports =
        [
          ./hardware-configuration.nix
          <home-manager/nixos>
        ]

        ...

        users.users.<userName> = {
          isNormalUser = true;
          descirption = "...";
          extraGroups = [ "wheel" ];
          packages = with pkgs; [];
        };
        home-manager = {
          userGlobalPkgs = true;
          useUserPackages = true;
          users.<userName> = import ./home.nix;
        };
    }
    ```
- 创建并配置 home.nix
  1. 在 /etc/nixos/ 下创建 home.nix
    ```
    touch /etc/nixos/home.nix
    ```
  2. 编辑 home.nix 文件
    ```
    {config, pkgs, ...}:

    {
      home.username = "<userName>"
      home.homeDirectory = "/home/<userName>";
      home.stateVersion = "25.05";
      home.packages = { pkgs.atool pkgs.httpie };
    }

4. 安装并验证
  ```
  sudo nixos-rebuild switch
  http --version  //输出版本号
  which http  //输出存储位置  /home/userName/.nix-profile/bin/http
  ```


# Darwin Module
> As a module within a nix-darwin system configuration.
