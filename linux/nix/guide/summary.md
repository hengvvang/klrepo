# NixOS Guide
> Description: A basic introduction on building a NixOS config on your personal machine
> Author: __youtuber__ Matthias benaets

# NixOS
- Introduction
    - Linux distribution based on Nix packages manager
    - Support declarative reproducible system configuraton
    - "Unbreakable"
        - Boot to specific configuraton generations. (as mentioned above - reproducible)
    - nix-store: no /lib & /usr/lib  almost no-existant /bin & /usr/bin. -> /nix/store
    - nix-env: install packages at user level without having to change system state

- Getting Started
    - NixOS website
        - [NixOS]()
        - [Manual]()
            - Downloads -> NixOS -> More -> Manual
        - [Unstable]()
            - Downloads -> NixOS -> More -> also available
    - Burning ISO
    - Booting into ISO
        - Via USB
        - Virt-Manager
    - partitioning
- Initial Configuration
    - Generate
    - Configuration.nix
        - Argument on how to evaluate config:
            {config, pkgs, ...}:
        - Pull in other file used withinthe config:
            import = [./hardware-configuration.nix];
        - Boot
        - NetWorking
        - Internationalisation
        - Display Manager/Desktop Environments/Windows Managers...
        - Hardware
        - Users
        - Packages
        - StateVersion
    - Hardware-configuration.nix
- Installation
- Declaring packages, services, settings, etc...
- Extras

# Home-Manager
- Introdcution
- Getting Started
    - Initial
    - NixOS Modules
        - Add to configruation.Nix
        ```
        let
        in
        {
            imports = [ <home-manager/nixos> ];
            users.users.<name> = {
                inNormalUser = true;
            }
            home-manager.users.<name> = { pkgs, ...}: {
                home.packages = [ pkgs.atool pkgs.httpie ];
            };
        }
    - Standalone
- Configuration
- Dotfiles


# Flakes
- Introdcution
- Getting Started
- Configuration
- Updating
- Flake on fresh install

# Personal Config

# Resources
