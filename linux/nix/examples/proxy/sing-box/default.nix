{ config, lib, pkgs, ... }:

{
  options.mySystem.services.network.proxy.sing-box = {
    enable = lib.mkEnableOption "sing-box 代理服务";
    
    configPath = lib.mkOption {
      type = lib.types.str;
      default = "/etc/sing-box/config.json";
      description = "sing-box 配置文件路径";
    };
    
    webPort = lib.mkOption {
      type = lib.types.int;
      default = 9091;
      description = "sing-box Web UI 端口";
    };
    
    mixedPort = lib.mkOption {
      type = lib.types.int;
      default = 7891;
      description = "sing-box HTTP/SOCKS5 混合端口";
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
      description = "系统启动时自动启动 sing-box";
    };
    
    updateInterval = lib.mkOption {
      type = lib.types.str;
      default = "daily";
      description = "订阅更新间隔 (systemd timer 格式)";
    };
    
    logLevel = lib.mkOption {
      type = lib.types.enum [ "trace" "debug" "info" "warn" "error" "fatal" "panic" ];
      default = "info";
      description = "日志级别";
    };
  };

  imports = [
    ./sing-box.nix
  ];
}
