# 全部在 home.nix 里配置

  - 文件结构
    ```
    root /
    |
    |--home ~
    |   |
    |   |--.config
    |   |   |
    |   |   |--nixpkgs
    |   |   |   |
    |   |   |   |--home.nix
    ```

### 使用方法

- 设置通道
  ```
  sudo nix-channel --add https://github.com/nix-community/home-manager/archive/master.tar.gz home-manager
  sudo nix-channel --update
  ```
- 安装 home-manager
  ```
  nix-shell '<home-manager>' -A install     // 提供 home-manager cli
  ```

- 创建并配置 home.nix
  1. 在 `~/.config/nixpkgs/home.nix` 下创建 home.nix
    ```
    touch ~/.config/nixpkgs/home.nix
    ```
  2. 编辑 home.nix 文件
    ```
    {config, pkgs, ...}:

    {
      home.username = "<userName>"
      home.homeDirectory = "/home/<userName>";
      home.stateVersion = "25.05";
      home.packages = [ pkgs.atool pkgs.httpie ];
    }

4. 安装并验证
  ```
  home-manager switch
  http --version  //输出版本号
  which http  //输出存储位置  /home/userName/.nix-profile/bin/http
  ```
5. 编辑`home.nix`,安装和配置更多应用
    ```
    {config, pkgs, ...}:

    {
      home.username = "<userName>"
      home.homeDirectory = "/home/<userName>";
      home.stateVersion = "25.05";
      home.packages = [ pkgs.atool pkgs.httpie ];
      programs.zsh = {
        enable = true;
        enableCompletion = true;
        enableAutosuggestions = true;
        enableSyntaxHighlighting = true;
        on-my-zsh = {
          enable = true;
          plugins = [ "docker-compose" "docker" ];
          theme = "dst";
        }
        initExtra = ''
          bindkey '^f' autosuggest-accept
        '';
      };
      program-fzf = {
        enable = true;
        enableZshIntegration = true;
      };

      home.stateVersion = "25.05";
      programs.home-manager.enable = true;
    }

6. 安装并验证
  ```
  home-manager switch
  zsh
  cat ~/.zshrc  // 这里的配置是根据上面的 home.nix 中配置生成的
  ```










# `home.nix`  + `./app/zsh.nix` + `./app/macro.nix`

  - 文件结构
    ```
    root /
    |
    |--home ~
    |   |
    |   |--.config
    |   |   |
    |   |   |--nixpkgs
    |   |   |   |
    |   |   |   |--home.nix
    |   |   |   |
    |   |   |   |--apps
    |   |   |   |   |
    |   |   |   |   |--zsh.nix
    |   |   |   |   |
    |   |   |   |   |--git.nix
    |   |   |   |   |
    |   |   |   |   |--...
    ```

### 使用方法

- 设置通道
  ```
  sudo nix-channel --add https://github.com/nix-community/home-manager/archive/master.tar.gz home-manager
  sudo nix-channel --update
  ```
- 单独安装 home-manager
  ```
  nix-shell '<home-manager>' -A install     // 提供 home-manager cli
  ```

- 创建并配置 home.nix
  1. 在 `~/.config/nixpkgs/home.nix` 下创建 home.nix
    ```
    touch ~/.config/nixpkgs/home.nix
    ```
  2. 编辑 home.nix 文件, 导入你将要添加的模块
    ```
    {config, pkgs, ...}:

    {
      imports = [
        ./apps/zsh.nix
      ];
      home.username = "<userName>";
      home.homeDirectory = "/home/<userName>";
      home.stateVersion = "25.05";
      home.packages = [ pkgs.atool pkgs.httpie ];
      programs.home-manager.enable = true;
    }

- 创建并配置 `./apps/zsh.nix`
  1. 在 `~/.config/nixpkgs/apps/` 下创建 zsh.nix
    ```
    touch ~/.config/nixpkgs/zsh.nix
    ```
  2. 编辑 zsh.nix 文件
    ```
    {
      programs.zsh = {
        enable = true;
        enableCompletion = true;
        enableAutosuggestions = true;
        enableSyntaxHighlighting = true;
        on-my-zsh = {
          enable = true;
          plugins = [ "docker-compose" "docker" ];
          theme = "dst";
        }
        initExtra = ''
          bindkey '^f' autosuggest-accept
        '';
      };
      program-fzf = {
        enable = true;
        enableZshIntegration = true;
      };
    }
    ```

- 安装并验证
  ```
  home-manager switch
  zsh
  cat ~/.zshrc  // 这里的配置是根据上面的 home.nix 中配置生成的
  ```




> --------二周目----------- 继续示例配置 micro 编辑器
- 创建并配置 `./apps/micro.nix`
  1. 在 `~/.config/nixpkgs/apps/` 下创建 zsh.nix
    ```
    touch ~/.config/nixpkgs/micro.nix
    ```
  2. 编辑 micro.nix 文件
    ```
    {
      programs.micro = {
        enable = true;
        settings = {
          colorscheme = true;
          mkparents = true;
          softwrap = true;
          tabmovement = true;
          tabsize = 2;
          tabstospaces = true;
          autosu = true;
        };
      };
    }
    ```

- 安装并验证
  ```
  home-manager switch
  micro
  ```
