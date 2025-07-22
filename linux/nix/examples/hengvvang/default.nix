{ config, pkgs, lib, ... }:

{
  imports = [
    # 使用新的模块化配置
    ../../home
    # 导入不同主机配置
    ./laptop.nix
    ./daily.nix
    ./work.nix
  ];
  
  # 主机选项
  options.host = lib.mkOption {
    type = lib.types.enum [ "laptop" "daily" "work" ];
    default = "laptop";
    description = "Host type";
  };
  
  # 基础通用配置
  config = {
    # 允许非自由软件
    nixpkgs.config.allowUnfree = true;
    
    home.username = "hengvvang";
    home.homeDirectory = "/home/hengvvang";
    home.stateVersion = "25.05";
    
    # 通用配置 - 所有主机共享
    myHome = {
      develop.enable = true;
      dotfiles.enable = true;
      profiles.enable = true;
    };
    
    programs.home-manager.enable = true;
  };
}
