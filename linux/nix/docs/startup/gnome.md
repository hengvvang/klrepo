> 下面是需要注意的一些配置
```nix
{ config, lib, pkgs, ... }:

{

  time.timeZone = "Asia/Shanghai";

   i18n.defaultLocale = "zh_CN.UTF-8";
   i18n.inputMethod = {
	 type = "fcitx5";
	 enable = true;
 	 fcitx5.addons = with pkgs; [
	 fcitx5-chinese-addons
	 fcitx5-gtk
	 fcitx5-rime
	 fcitx5-nord
	];
   };


   users.users.hengvvang = {
    isNormalUser = true;
     extraGroups = [ "wheel" ]; # Enable ‘sudo’ for the user.
     packages = with pkgs; [
       tree
     ];
   };
   
  # List packages installed in system profile.
   environment.systemPackages = [
     pkgs.vim
     pkgs.wget
     pkgs.firefox
     pkgs.clash-verge-rev 
     pkgs.zed-editor
     pkgs.vscode
     pkgs.google-chrome
     pkgs.shadowsocks-rust
     pkgs.spotify
     pkgs.obs-studio 
     pkgs.qq
     pkgs.wechat-uos
     pkgs.fish
     pkgs.nushell
     pkgs.git
     pkgs.rustup
     pkgs.htop

     # gnome desktop environment configuration

     # # extentsion ##
     # required
     pkgs.gnome-tweaks

     # recommand
     pkgs.gnomeExtensions.user-themes
     pkgs.gnomeExtensions.blur-my-shell
     pkgs.gnomeExtensions.extension-list
     pkgs.gnomeExtensions.dash-to-dock
     pkgs.gnomeExtensions.logo-menu
     pkgs.gnomeExtensions.kimpanel # fcitx need;   recommand extension: Fcitx HUD
   ];

  nix.settings.substituters = lib.mkForce [ "https://mirrors.tuna.tsinghua.edu.cn/nix-channels/store"];
  nixpkgs.config.allowUnfree = true;
  system.stateVersion = "25.05"; # Did you read the comment?

}
```
