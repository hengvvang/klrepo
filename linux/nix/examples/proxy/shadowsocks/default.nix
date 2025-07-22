{ config, lib, pkgs, ... }:


{
  options.mySystem.services.network.proxy.shadowsocks = {
    enable = lib.mkEnableOption "Shadowsocks-rust 代理服务";
    
    configPath = lib.mkOption {
      type = lib.types.str;
      default = "/etc/shadowsocks/config.json";
      description = "Shadowsocks 配置文件路径";
    };
    
    localPort = lib.mkOption {
      type = lib.types.int;
      default = 1082;
      description = "Shadowsocks 本地 SOCKS5 端口";
    };
    
    subscriptionUrl = lib.mkOption {
      type = lib.types.nullOr lib.types.str;
      default = null;
      description = "Shadowsocks 订阅链接 URL";
    };
    
    autoStart = lib.mkOption {
      type = lib.types.bool;
      default = true;
      description = "系统启动时自动启动 Shadowsocks";
    };
    
    updateInterval = lib.mkOption {
      type = lib.types.str;
      default = "daily";
      description = "订阅更新间隔 (systemd timer 格式)";
    };
  };

  imports = [
    ./shadowsocks.nix
  ];
 
}
