# nixosConfiguration
- 安装 flake
  - 编辑配置 configuration.nix
    ```
    { config, pkgs, ...}:

    {
    ......

    nix.settings.experimental-features = [ "nix-command" "flake" ];

    }
    ```

    - sudo nixos-rebuild switch


- 在 home 目录下创建 my-nix-flake 文件夹统一管理
  ```
  mkdir my-nix-flake
  ```
  - 创建 my-nix-flake/nixos 目录 并将 configuration.nix 和 hardware-configuration.nix 文件复制到此处让flake管理
    ```
    mkdir -p my-nix-flake/nixos
    cp /etc/nixos/configuration.nix /home/my-nix-flake/nixos
    cp /etc/nixos/hardware-configuration.nix /home/my-nix-flake/nixos
    ```

  - 创建 my-nix-flake/home-manager 目录 并将 home.nix 和 home.nix 引用的文件 复制到此处让flake管理
    ```
    mkdir -p my-nix-flake/home-manager
    cp ~/.config/nixpkgs/home.nix /home/my-nix-flake/home-manager
    cp ~/.config/nixpkgs/apps/ /home/my-nix-flake/home-manger
    ```



- 配置 flake.nix 文件

  - 初始化 flake.nix 文件
    ```
    nix flake init
    ```

  - 编辑配置 flake.nix 文件
     ```
     {
       description = "...";

       inputs = {
         nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
         home-manager = {
           url = github:nix-community/home-manager;
           inputs.nixpkgs.follows = "nixpkgs";
         };
       };

       outputs = { nixpkgs, home-manager,  ... }:
       let
         system = "x86_64-linux";
       in
       {
         nixosConfigurations = {
           <hostName> = nixpkgs.lib.nixosSystem {
             inherit system;
             modules = [
               ./nixos/configuration.nix
               home-manager.nixosModules.home-manager
               {
                 home-manager = {
                   useUserPackages = true;
                   useGlobalPkgs = true;
                   users.<userName> = ./home-manager/home.nix;
                 };
               }
             ];
           };
         };
       };
     }

     ```
- 使用 flake 进行构建
  - nixos
    ```
    sudo nixos-rebuild switch --flake '<path_to_flake.nix>#<hostName>
    ```
