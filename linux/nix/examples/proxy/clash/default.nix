{ config, lib, pkgs, ... }:

{
  options.mySystem.services.network.proxy.clash = {
    enable = lib.mkEnableOption "Clash 代理服务";
    
    configPath = lib.mkOption {
      type = lib.types.str;
      default = "/etc/clash/config.yaml";
      description = "Clash 配置文件路径";
    };
    
    webPort = lib.mkOption {
      type = lib.types.int;
      default = 9090;
      description = "Clash Web UI 端口";
    };
    
    mixedPort = lib.mkOption {
      type = lib.types.int;
      default = 7890;
      description = "Clash HTTP/SOCKS5 混合端口";
    };
    
    tunMode = lib.mkOption {
      type = lib.types.bool;
      default = true;
      description = "启用 TUN 模式";
    };
    
    subscriptionUrl = lib.mkOption {
      type = lib.types.nullOr lib.types.str;
      default = null;
      description = "订阅链接 URL";
    };
    
    autoStart = lib.mkOption {
      type = lib.types.bool;
      default = true;
      description = "系统启动时自动启动 Clash";
    };
    
    updateInterval = lib.mkOption {
      type = lib.types.str;
      default = "daily";
      description = "订阅更新间隔 (systemd timer 格式)";
    };
  };

  imports = [
    ./clash.nix
  ];
}
