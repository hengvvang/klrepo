{ config, lib, pkgs, ... }:

{
  options.mySystem.services.network.proxy.v2ray = {
    enable = lib.mkEnableOption "V2Ray 代理服务";
    
    # TUN 模式配置
    tunMode = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "启用 TUN 模式透明代理";
    };
    
    configPath = lib.mkOption {
      type = lib.types.str;
      default = "/etc/v2ray/config.json";
      description = "V2Ray 配置文件路径";
    };
    
    httpPort = lib.mkOption {
      type = lib.types.int;
      default = 8080;
      description = "V2Ray HTTP 代理端口";
    };
    
    socksPort = lib.mkOption {
      type = lib.types.int;
      default = 1080;
      description = "V2Ray SOCKS5 代理端口";
    };
    
    # TUN 模式专用端口
    tunPort = lib.mkOption {
      type = lib.types.int;
      default = 10808;
      description = "V2Ray TUN 模式端口";
    };
    
    subscriptionUrl = lib.mkOption {
      type = lib.types.nullOr lib.types.str;
      default = null;
      description = "V2Ray 订阅链接 URL";
    };
    
    autoStart = lib.mkOption {
      type = lib.types.bool;
      default = true;
      description = "系统启动时自动启动 V2Ray";
    };
    
    updateInterval = lib.mkOption {
      type = lib.types.str;
      default = "daily";
      description = "订阅更新间隔 (systemd timer 格式)";
    };
  };

  imports = [
    ./v2ray.nix
  ];

}
