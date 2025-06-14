Home Manager can be used in three primary ways:

1. Using the standalone `home-manager` tool. For platforms other than NixOS and
   Darwin, this is the only available choice. It is also recommended for people
   on [NixOS][] or Darwin that want to manage their home directory independently
   of the system as a whole. See ["Standalone installation" in the
   manual][manual standalone install] for instructions on how to perform this
   installation.

1. As a module within a NixOS system configuration. This allows the user
   profiles to be built together with the system when running `nixos-rebuild`.
   See ["NixOS module" in the manual][manual nixos install] for a description of
   this setup.

1. As a module within a [nix-darwin] system configuration. This allows the user
   profiles to be built together with the system when running `darwin-rebuild`.
   See ["nix-darwin module" in the manual][manual nix-darwin install] for a
   description of this setup.

Home Manager provides both the channel-based setup and the flake-based one. See
[Nix Flakes][manual nix flakes] for a description of the flake-based setup.

---
- Use home manager
  - Config folders (where we can find home.nix):
      NixOS module: /etc/nixos
      Standalone: ~/.config/nixpkgs/

  - Update nix channel:
      NixOS: sudo nix-channel --update
      Home manager: nix-channel --update

  - Apply home manager changes command:
      NixOS module: sudo nixos-rebuild switch
      Standalone: home-manager switch
