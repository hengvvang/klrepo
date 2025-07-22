{ config, lib, ... }:

{
  # work 主机特定配置
  config = lib.mkIf (config.host == "work") {
    myHome = {
      develop = {
        # devenv 项目环境管理配置 - work 主机
        devenv = {
          enable = true;        # 启用 devenv
          autoSwitch = true;    # 启用自动环境切换（direnv）
          shell = "fish";       # 使用 fish shell
          templates = false;    # 工作环境轻量级配置
          cache = true;         # 启用构建缓存优化
        };
        # 工作环境的开发配置
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
      
      # 包管理配置
      pkgs = {
        enable = true;                # 启用用户包管理
        # 工具包配置 - 月相主题设计
        toolkits = {
          enable = true;              # 启用工具包模块
          waxingCrescent.enable = true;  # 🌒 峨眉月 - 基础家庭工具
          firstQuarter.enable = true;    # 🌓 上弦月 - 开发和终端工具
          waxingGibbous.enable = true;   # 🌔 盈凸月 - 高级工具套件
          fullMoon.enable = true;        # 🌕 满月 - 完整工具生态 (工作需要)
        };
        # 应用程序配置 - 月相主题设计
        apps = {
          enable = true;              # 启用应用程序模块
          waningCrescent.enable = true;  # 🌘 残月 - 基础应用核心
          lastQuarter.enable = true;     # 🌗 下弦月 - 开发和终端应用
          waningGibbous.enable = true;   # 🌖 亏凸月 - 桌面生产力套件 (工作需要)
          newMoon.enable = true;         # 🌑 新月 - 完整应用生态 (工作需要)
        };
      };

      profiles = {

        fonts = {
          preset = "tokyo";  # 专业字体配置
        };

        stylix = {
          enable = false;
          polarity = "dark";
          wallpapers = {
            enable = true;
            preset = "sea";
          };
          fonts = {
            enable = true;
            # 使用默认字体配置，也可以自定义
          };
          targets = {
            enable = true;
            terminals = {
              alacritty.enable = false;  # 避免与现有 alacritty 配置冲突
              kitty.enable = true;
            };
            editors = {
              vim.enable = true;
              neovim.enable = true;
            };
            tools = {
              tmux.enable = true;
              bat.enable = true;
              fzf.enable = true;
            };
            desktop = {
              gtk.enable = true;
            };
            browsers = {
              firefox.enable = true;
            };
          };
        };
      };
    };
  };
}
