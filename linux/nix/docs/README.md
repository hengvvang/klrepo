NixOS 配置的复杂度主要来源于几个方面
- 系统配置的多样性
  - 可以单独 configuration.nix 配置整个系统
  - 可以增加 home-manager 配置不同用户配置
  - 可以增加 flake 的使用
- home-manager 既可以单独使用，又可以作为模块使用
