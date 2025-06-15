# nix 是一个软件包管理器 software package manager
-
    ```
    nix shell 'nixpkgs#python310'
    ```
- configurations.nix
    ```
    environment.systemPackages = with pkgs;
   [
   emacs
   vim
   ]
    ```
# nix 是一个构建工具
- derivation
    - Meta information
    - input
    - build steps
    - output
-
    ```
    nix build 'nixpkgs#vim'
    ```
-
    - prepare
        ```
        environment.systemPackages =
        [
        pkgs.nom
        pkgs.nix-output-monitor
        ]
    ```
    nom build 'nixpkgs#python312'
    ```
# NixOS 是一个声明式 Linux 发行版
- traditional linux distributions install KDE desktop environment
    1. install
        - sudo pacman install -Syu ...
    2. enable
        - sudo systmctl enable xxx.services
    3. config
