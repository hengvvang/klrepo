{ config, lib, pkgs, ... }:

{
  options.mySystem.services.network.proxy = {
    enable = lib.mkEnableOption "代理服务支持";
  };

  imports = [
    ./clash
    ./clash-gui
    ./v2ray
    ./xray
    ./shadowsocks
    ./sing-box
  ];

}
