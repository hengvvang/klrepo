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


```

需要软件：

GNOME Tweaks--使主题修改更加容易一个工具

安装主题：

下载主题：mac themes下载链接：https://www.gnome-look.org/p/1241688/

这里下载的是McOS-MJV-Dark-mode-Gnome-3.30-1.1.tar.xz版本

安装步骤：

在home目录下创建文件夹命令为：.themes

将下载好的主题包放进.themes这个文件夹

打开Tweaks工具，在Appearance选项中themes下的AppLications选择列表选中刚下载好的主题包名称

mac-icons：

下载链接：https://www.gnome-look.org/p/1102582

下载版本：macOS.tar.xz

install-mac-icons：

home目录创建.icons文件夹

将下载好的图标icon放至这个文件夹

打开Tweaks工具，在Appearance选项中themes下的icons选择列表选中刚下载好的icon包名称

鼠标光标主题cursors：

下载链接：https://www.gnome-look.org/p/1148692

下载版本：capitaine-cursors-r2.1.tar.gz

安装cursors：

将下载好的包，放进.icons文件夹

打开Tweaks工具，在Appearance选项中themes下的cursor选择列表选中刚下载好的cursor包名称

mac壁纸：

下载链接：http://cdn.osxdaily.com/wp-content/uploads/2018/06/macos-mojave-night-lightened-r.jpg

其他：http://osxdaily.com/2018/08/03/25-new-macos-mojave-wallpapers/

安装plank：sudo apt install plank

安装Plank PreFerences

下载Plank Dock主题：

下载链接：https://www.gnome-look.org/p/1248226/

下载版本：macOS Mojave Night.zip

打开plank，调整到底部，图标大小，鼠标移上时缩放大小

安装Dock主题包：

将包放到home目录下的.local/share/plank/themes目录下。

打开plank PreFerences选择主题包为macOS Mojave Night

安装Tweaks的dock设置扩展包：

命令：sudo apt-get install chrome-gnome-shell安装后打开下面的链接在浏览器中开启

安装链接：https://extensions.gnome.org/extension/307/dash-to-dock/

打开Tweaks在Extensions中的Dash to dock 点击设置图标，进行调整
```
