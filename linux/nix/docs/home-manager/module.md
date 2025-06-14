`Home Mananger` 作为模块使用；
---

# NixOS Module
> As a module within a NixOS system configuration

## 全部在 `configuration.nix` 中配置
  - 文件结构
  ```
  root
  |
  |--etc
  |   |--nixos
  |   |   |--hardware-configuration.nix
  |   |   |
  |   |   |--configuration.nix  // homemanager 在这里配置
  ```


## 使用 `home.nix` 模块化配置
  - 文件结构
  ```
  root
  |
  |--etc
  |   |--nixos
  |   |   |--hardware-configuration.nix
  |   |   |
  |   |   |--configuration.nix
  |   |   |
  |   |   |--home.nix
  ```


# Darwin Module
> As a module within a nix-darwin system configuration.
