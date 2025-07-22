{ config, lib, ... }:

{
  # daily 主机特定配置
  config = lib.mkIf (config.host == "daily") {
    myHome = {
      develop = {
        # devenv 项目环境管理配置 - daily 主机
        devenv = {
          enable = true;        # 启用 devenv
          autoSwitch = true;    # 启用自动环境切换（direnv）
          shell = "fish";       # 使用 fish shell
          templates = false;    # 轻量级配置，不安装额外模板工具
          cache = true;         # 启用构建缓存优化
        };
        rust.enable = true;
        python.enable = true;
        javascript.enable = true;
        typescript.enable = true;
        cpp.enable = true;
      };
      
      dotfiles = {
        vim.enable = true;
        zsh.enable = true;
        bash.enable = true;
        fish.enable = true;
        nushell.enable = true;
        yazi.enable = true;
        ghostty.enable = true;
        alacritty.enable = true;
        tmux.enable = true;
        git.enable = true;
        lazygit.enable = true;
        starship.enable = true;
      };


      pkgs = {
        enable = true;                # 启用用户包管理
        toolkits = {
          enable = true;              # 启用工具包模块
          waxingCrescent.enable = true;  # 🌒 峨眉月
          firstQuarter.enable = true;    # 🌓 上弦月
          waxingGibbous.enable = false;   # 🌔 盈凸月
          fullMoon.enable = false;       # 🌕 满月
        };
        apps = {
          enable = true;              # 启用应用程序模块
          waningCrescent.enable = true;  # 🌘 残月
          lastQuarter.enable = true;     # 🌗 下弦月
          waningGibbous.enable = true;   # 🌖 亏凸月
          newMoon.enable = false;        # 🌑 新月
        };
      };

      
      profiles = {
        fonts = {
          preset = "bauhaus";
        };
        stylix = {
          enable = true;
          polarity = "dark";
          wallpapers = {
            enable = true;
            #preset = "maori";
            custom = ./../../home/profiles/stylix/wallpapers/swirl-loop.jpeg;
          };
          fonts = {
            enable = true;
            # 使用默认字体配置，也可以自定义
          };
          targets = {
            enable = true;
            terminals = {
              alacritty.enable = false;
              kitty.enable = false;
            };
            editors = {
              vim.enable = false;
              neovim.enable = false;
            };
            tools = {
              tmux.enable = false;
              bat.enable = false;
              fzf.enable = false;
            };
            desktop = {
              gtk.enable = false;
            };
            browsers = {
              firefox.enable = false;
            };
            inputMethods = {
              fcitx5.enable = true;
            };
          };
        };
      };
    };
  };
}
