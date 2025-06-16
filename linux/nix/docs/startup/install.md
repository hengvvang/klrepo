## 通过图形化界面分区后....
  - 重点注意事项
  	•	EFI 分区已经存在，不需要重新格式化它。
  	•	你已经保留了 Windows 分区，所以不用担心双系统冲突。
  	•	安装完成后，NixOS 的引导器（GRUB/Systemd-boot）会被安装到 EFI 分区中，你可以选择是否引导 Windows。

## 手动挂载 + 安装

1. 正确挂载分区结构
> 你需要挂载目标系统根目录 /mnt，并将 EFI 和其他挂载点也创建好：

  - 查看磁盘分区情况
    ```
    lsblk
    ```
    ```
    分区	   文件系统	 用途	  UUID	挂载情况

    nvme0n1p5	vfat	EFI 引导分区	B325-C1CD	被挂载到了 Calamares 临时目录 /tmp/.../boot
    nvme0n1p6	swap	Swap	-	[SWAP] 启用中
    nvme0n1p7	btrfs	根文件系统	00a68ebb…	/tmp/... 临时挂载中
    nvme0n1p3, p4	ntfs	Windows 分区	其他 UUID	不相关，保留 Windows 系统使用
    ```

  - 挂载根分区
    ```
    mount -t btrfs /dev/nvme0n1p7 /mnt
    ```

  - 创建并挂载 EFI 引导分区
    ```
    mkdir -p /mnt/boot
    mount /dev/nvme0n1p5 /mnt/boot
    ```

  - 开启 swap
    ```
    swapon /dev/nvme0n1p6
    ```

2. 自动生成 NixOS 配置文件
  ```
  nixos-generate-config --root /mnt
  ```
这将会生成 /mnt/etc/nixos/configuration.nix 等配置文件。



# 配置 configuration.nix
  - required
  - 配置镜像源
  尽量用下面的
  ```
  nix.settings.substituters = [ "https://mirrors.tuna.tsinghua.edu.cn/nix-channels/store" ];
  ```
  OR  
  ```
  # load `lib` into namespace at the file head with `{ config, pkgs, lib, ... }:`
  nix.settings.substituters = lib.mkForce [ "https://mirrors.tuna.tsinghua.edu.cn/nix-channels/store" ];
  ```
  - 配置用户
    ```
    users.users.hengvvang = {
    isNormalUser = true;
     extraGroups = [ "wheel" ]; # Enable ‘sudo’ for the user.
     packages = with pkgs; [
       tree
     ];
    };
      ```
  - 推荐
      ```
        environment.systemPackages = [
    pkgs.vim
  ];
      
      ```
{
  nixpkgs.config.allowUnfree = true;
}
      ```
3. 开始安装 NixOS
  - 安装系统
    ```
    nixos-install --option substituters "https://mirrors.tuna.tsinghua.edu.cn/nix-channels/store"
    ```

4. 安装完成后会提示你设置 root 密码，

5. 设置用户密码
  ```
  nixos-enter --root /mnt -c 'passwd hengvvang'
  ```
  OR
  ```
  nixos-enter --root /mnt

  # 然后在进入的 shell 中：
  useradd -m hengvvang
  passwd hengvvang

  ```



如果 NixOS 没有自动识别 Windows，可以在 configuration.nix 中添加：
```
boot.loader.grub = {
  enable = true;
  version = 2;
  efiSupport = true;
  efiInstallAsRemovable = false;
  devices = [ "nodev" ];
  useOSProber = true;
};
```
