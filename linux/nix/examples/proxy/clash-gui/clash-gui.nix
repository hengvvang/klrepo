{ config, lib, pkgs, ... }:

let
  cfg = config.mySystem.services.network.proxy.clash-gui;
  
  # 根据选择的客户端获取包
  clientPackage = {
    "clash-verge-rev" = pkgs.clash-verge-rev or null;
    "clash-nyanpasu" = pkgs.clash-nyanpasu or null;
    "flclash" = pkgs.flclash or null;
  }.${cfg.client};
  
  # 客户端二进制文件名
  clientBinary = {
    "clash-verge-rev" = "clash-verge";
    "clash-nyanpasu" = "clash-nyanpasu";
    "flclash" = "flclash";
  }.${cfg.client};
in
{
  config = lib.mkIf cfg.enable {
    # === 依赖检查 ===
    assertions = [
      {
        assertion = clientPackage != null;
        message = "选择的 Clash 客户端 '${cfg.client}' 在当前 nixpkgs 中不可用";
      }
      {
        assertion = cfg.tunMode -> config.mySystem.services.network.virtualInterface.enable;
        message = "TUN 模式需要启用虚拟网卡支持 (mySystem.services.network.virtualInterface.enable = true)";
      }
    ];
    
    # === 安装客户端包 ===
    environment.systemPackages = lib.optionals (clientPackage != null) [
      clientPackage
    ];
    
    # === 权限配置 ===
    security.wrappers = lib.mkIf (cfg.capabilities && clientPackage != null && cfg.tunMode) {
      ${clientBinary} = {
        owner = "root";
        group = "root";
        capabilities = "cap_net_admin,cap_net_raw=+eip";
        source = "${clientPackage}/bin/${clientBinary}";
      };
    };
    
    # === 用户组配置 ===
    users.groups.clash-users = {};
    
    # === 系统配置优化 ===
    boot.kernel.sysctl = lib.mkIf cfg.tunMode {
      # 网络性能优化
      "net.core.default_qdisc" = "fq";
      "net.ipv4.tcp_congestion_control" = "bbr";
      
      # 连接跟踪优化
      "net.netfilter.nf_conntrack_max" = 1048576;
      "net.netfilter.nf_conntrack_tcp_timeout_established" = 7200;
    };
    
    # === 防火墙优化 ===
    networking.firewall = lib.mkIf cfg.tunMode {
      # 允许 Clash 相关接口
      extraCommands = ''
        # 允许 Clash TUN 接口流量
        iptables -I INPUT -i clash+ -j ACCEPT
        iptables -I FORWARD -i clash+ -j ACCEPT
        iptables -I FORWARD -o clash+ -j ACCEPT
        
        # 允许本地代理端口
        iptables -I INPUT -s 127.0.0.0/8 -j ACCEPT
        iptables -I INPUT -s ::1/128 -j ACCEPT
      '';
    };
  };
}
