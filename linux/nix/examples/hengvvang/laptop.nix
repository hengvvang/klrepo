{ config, lib, ... }:

{
  # laptop 主机特定配置
  config = lib.mkIf (config.host == "laptop") {
    myHome = {
      develop = {
        # devenv 项目环境管理配置
        devenv = {
          enable = true;        # 启用 devenv
          autoSwitch = true;    # 启用自动环境切换（direnv）
          shell = "fish";       # 使用 fish shell
          templates = true;     # 安装项目模板工具（完整功能）
          cache = true;         # 启用构建缓存优化
        };
        # 按语言直接配置
        rust = {
          enable = true;
          embedded.enable = true;   # 启用 Rust 嵌入式开发
        };
        python.enable = true;
        javascript.enable = true;
        typescript.enable = true;
        cpp = {
          enable = true;
          embedded.enable = true;   # 启用 C/C++ 嵌入式开发
        };
      };

      dotfiles = {
        enable = true;  # 启用 dotfiles 模块
        vim.enable = true;
        zsh.enable = true;
        bash.enable = true;
        fish.enable = true;
        nushell.enable = true;
        ghostty.enable = true;
        alacritty.enable = false;
        tmux.enable = true;
        git.enable = true;
        lazygit.enable = true;
        starship.enable = true;
        qutebrowser.enable = false;
        obs-studio.enable = false;
        zed.enable = false;
        vscode.enable = false;
        yazi = {
          enable = true;
          method = "external";
        };
        zellij = {
          enable = true;
          method = "external";
        };
        rio = {
          enable = true;
          method = "homemanager";
        };
        rmpc = {
          enable = true;
          method = "external";
        };
      };

      services = {
        media = {
          # MPD 用户级音乐服务配置
          mpd = {
            enable = true;                        # 启用用户级 MPD 服务
            musicDirectory = "${config.home.homeDirectory}/Music";  # 音乐目录
            port = 6600;                          # MPD 端口
            autoStart = true;                     # 开机自动启动
            clients = {
              mpc = true;                         # 安装 mpc 命令行客户端
              ncmpcpp = true;                     # 安装 ncmpcpp 终端客户端
            };
          };
        };
      };

      pkgs = {
        enable = true;
        toolkits = {
          enable = true;              # 启用工具包模块
          waxingCrescent.enable = true;  # 🌒 峨眉月
          firstQuarter.enable = true;    # 🌓 上弦月
          waxingGibbous.enable = true;   # 🌔 盈凸月
          fullMoon.enable = false;       # 🌕 满月
        };
        apps = {
          waningCrescent.enable = true;  # 🌘 残月
          lastQuarter.enable = true;     # 🌗 下弦月
          waningGibbous.enable = false;  # 🌖 亏凸月
          newMoon.enable = false;        # 🌑 新月
        };
      };

      profiles = {
        enable = true;
        fonts = {
          enable = true;
          preset = "tokyo";
        };
        stylix = {
          enable = true;                      # ✅ 启用 Stylix 主题系统
          polarity = "dark";

          # 🎨 启用自定义颜色配置
          colors = {
            enable = true;                    # ✅ 启用自定义颜色
            scheme = "dark-elegant";
          };

          wallpapers = {
            enable = false;                    # ✅ 启用壁纸
            # preset = "tokyo";
            # custom = {
            #   url = "https://example.com/path/to/your/wallpaper.jpg";  # ✅ 自定义壁纸 URL
            #   position = "center";  # ✅ 壁纸位置（center, fill, stretch 等）
            # };
          };

          fonts = {
            enable = false;
            names = {
              monospace = "JetBrainsMono Nerd Font Mono";  # ✅ 优质等宽字体
              sansSerif = "Noto Sans";                     # ✅ 现代无衬线字体
              serif = "Noto Serif";                        # ✅ 经典衬线字体
              emoji = "Noto Color Emoji";                  # ✅ 彩色表情字体
            };
            sizes = {
              terminal = 16;      # ✅ 终端字体大小（适合开发）
              applications = 12;  # ✅ 应用字体大小（舒适阅读）
              desktop = 12;       # ✅ 桌面字体大小（界面元素）
              popups = 12;        # ✅ 弹窗字体大小（提示信息）
            };
          };

          targets = {
            enable = true;

            terminals = {
              alacritty.enable = false;
              kitty.enable = false;
            };

            editors = {
              vim.enable = true;
              neovim.enable = false;
            };

            tools = {
              tmux.enable = true;
              bat.enable = true;
              fzf.enable = true;
            };

            desktop = {
              gtk.enable = true;              # ✅ 启用 GTK 主题（应用一致性）
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
