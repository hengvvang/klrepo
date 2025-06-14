# 全部在 home.nix 里配置
  - 文件结构
  ```
  root /
  |
  |--home ~
  |   |
  |   |--.config
  |   |   |
  |   |   |--nixpkgs
  |   |   |   |
  |   |   |   |--home.nix
  ```
# 模块化
  - 文件结构
  ```
  root /
  |
  |--home ~
  |   |
  |   |--.config
  |   |   |
  |   |   |--nixpkgs
  |   |   |   |
  |   |   |   |--home.nix
  |   |   |   |
  |   |   |   |--apps
  |   |   |   |   |
  |   |   |   |   |--zsh.nix
  |   |   |   |   |
  |   |   |   |   |--git.nix
  |   |   |   |   |
  |   |   |   |   |--...
  ```
