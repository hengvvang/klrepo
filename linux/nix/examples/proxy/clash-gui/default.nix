{ config, lib, pkgs, ... }:

{
  options.mySystem.services.network.proxy.clash-gui = {
    enable = lib.mkEnableOption "Clash GUI 客户端支持";
    
    # TUN 模式配置
    tunMode = lib.mkOption {
      type = lib.types.bool;
      default = true;
      description = "启用 TUN 模式虚拟网卡";
    };
    
    # 权限配置
    capabilities = lib.mkOption {
      type = lib.types.bool;
      default = true;
      description = "为应用程序设置网络管理权限";
    };
    
    # 客户端选择
    client = lib.mkOption {
      type = lib.types.enum [ "clash-verge-rev" "clash-nyanpasu" "flclash" ];
      default = "clash-verge-rev";
      description = "选择 Clash 客户端实现";
    };
  };

  imports = [
    ./clash-gui.nix
  ];
}
