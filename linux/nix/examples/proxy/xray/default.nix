{ config, lib, pkgs, ... }:

{
  options.mySystem.services.network.proxy.xray = {
    enable = lib.mkEnableOption "Xray 代理服务";
    
    # TUN 模式配置
    tunMode = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "启用 TUN 模式透明代理";
    };
    
    configPath = lib.mkOption {
      type = lib.types.str;
      default = "/etc/xray/config.json";
      description = "Xray 配置文件路径";
    };
    
    httpPort = lib.mkOption {
      type = lib.types.int;
      default = 8081;
      description = "Xray HTTP 代理端口";
    };
    
    socksPort = lib.mkOption {
      type = lib.types.int;
      default = 1081;
      description = "Xray SOCKS5 代理端口";
    };
    
    # TUN 模式专用端口
    tunPort = lib.mkOption {
      type = lib.types.int;
      default = 10809;
      description = "Xray TUN 模式端口";
    };
    
    subscriptionUrl = lib.mkOption {
      type = lib.types.nullOr lib.types.str;
      default = null;
      description = "Xray 订阅链接 URL";
    };
    
    autoStart = lib.mkOption {
      type = lib.types.bool;
      default = true;
      description = "系统启动时自动启动 Xray";
    };
    
    updateInterval = lib.mkOption {
      type = lib.types.str;
      default = "daily";
      description = "订阅更新间隔 (systemd timer 格式)";
    };
  };

  imports = [
    ./xray.nix
  ];

}
