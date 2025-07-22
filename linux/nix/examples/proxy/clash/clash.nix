
{ config, lib, pkgs, ... }:

let
  cfg = config.mySystem.services.network.proxy.clash;
  
  # 默认配置文件内容
  defaultConfig = ''
    # Clash 基础配置
    port: 7890
    socks-port: 7891
    mixed-port: ${toString cfg.mixedPort}
    redir-port: 7892
    
    # TUN 模式配置
    tun:
      enable: ${if cfg.tunMode then "true" else "false"}
      stack: system
      dns-hijack:
        - 198.18.0.2:53
      auto-route: true
      auto-detect-interface: true
    
    # 允许局域网连接
    allow-lan: true
    bind-address: '*'
    mode: rule
    log-level: info
    
    # RESTful API
    external-controller: 0.0.0.0:${toString cfg.webPort}
    secret: ""
    
    # DNS 配置
    dns:
      enable: true
      listen: 0.0.0.0:53
      ipv6: false
      enhanced-mode: fake-ip
      fake-ip-range: 198.18.0.1/16
      fake-ip-filter:
        - '*.lan'
        - localhost.ptlogin2.qq.com
      nameserver:
        - 223.5.5.5
        - 114.114.114.114
      fallback:
        - 8.8.8.8
        - 1.1.1.1
        - tls://dns.cloudflare.com:853
    
    # 基础代理组
    proxy-groups:
      - name: "🚀 手动切换"
        type: select
        proxies:
          - DIRECT
      - name: "🎯 全球直连"
        type: select
        proxies:
          - DIRECT
      - name: "🐟 漏网之鱼"
        type: select
        proxies:
          - "🚀 手动切换"
          - DIRECT
    
    # 基础规则
    rules:
      - DOMAIN-SUFFIX,local,DIRECT
      - IP-CIDR,127.0.0.0/8,DIRECT
      - IP-CIDR,172.16.0.0/12,DIRECT
      - IP-CIDR,192.168.0.0/16,DIRECT
      - IP-CIDR,10.0.0.0/8,DIRECT
      - GEOIP,CN,🎯 全球直连
      - MATCH,🐟 漏网之鱼
  '';
in
{
  config = lib.mkIf cfg.enable {
    # 安装 Clash Meta 和管理工具
    environment.systemPackages = with pkgs; [
      clash-meta
      # mihomo
      curl
      (writeShellScriptBin "clash-ctl" ''
        #!/usr/bin/env bash
        
        case "$1" in
          start)
            echo "启动 Clash 服务..."
            sudo systemctl start clash
            ;;
          stop)
            echo "停止 Clash 服务..."
            sudo systemctl stop clash
            ;;
          restart)
            echo "重启 Clash 服务..."
            sudo systemctl restart clash
            ;;
          status)
            systemctl status clash
            ;;
          logs)
            journalctl -u clash -f
            ;;
          update)
            echo "更新订阅配置..."
            sudo systemctl start clash-subscription-update
            ;;
          test)
            echo "测试代理连接..."
            curl -x http://127.0.0.1:${toString cfg.mixedPort} -I http://www.google.com
            ;;
          ui)
            echo "Clash Web UI: http://localhost:${toString cfg.webPort}"
            ;;
          *)
            echo "用法: clash-ctl {start|stop|restart|status|logs|update|test|ui}"
            echo ""
            echo "命令说明:"
            echo "  start   - 启动 Clash 服务"
            echo "  stop    - 停止 Clash 服务"
            echo "  restart - 重启 Clash 服务"
            echo "  status  - 查看服务状态"
            echo "  logs    - 查看实时日志"
            echo "  update  - 更新订阅配置"
            echo "  test    - 测试代理连接"
            echo "  ui      - 显示 Web UI 地址"
            ;;
        esac
      '')
    ];

    # 创建配置目录和文件
    systemd.tmpfiles.rules = [
      "d /etc/clash 0755 root root -"
      "d /var/lib/clash 0755 root root -"
      "d /var/log/clash 0755 root root -"
    ];

    # 创建默认配置文件
    environment.etc."clash/config.yaml" = lib.mkIf (cfg.subscriptionUrl == null) {
      text = defaultConfig;
      mode = "0644";
    };

    # 订阅更新服务
    systemd.services.clash-subscription-update = lib.mkIf (cfg.subscriptionUrl != null) {
      description = "Update Clash subscription";
      
      serviceConfig = {
        Type = "oneshot";
        User = "root";
        Group = "root";
      };
      
      script = ''
        set -e
        
        SUBSCRIPTION_URL="${cfg.subscriptionUrl}"
        CONFIG_FILE="${cfg.configPath}"
        BACKUP_FILE="$CONFIG_FILE.backup.$(date +%Y%m%d_%H%M%S)"
        
        echo "正在更新 Clash 订阅配置..."
        echo "订阅链接: $SUBSCRIPTION_URL"
        
        # 备份当前配置
        if [ -f "$CONFIG_FILE" ]; then
          cp "$CONFIG_FILE" "$BACKUP_FILE"
          echo "已备份当前配置到: $BACKUP_FILE"
        fi
        
        # 下载新配置
        if ${pkgs.curl}/bin/curl -L -f -o "$CONFIG_FILE.tmp" "$SUBSCRIPTION_URL"; then
          mv "$CONFIG_FILE.tmp" "$CONFIG_FILE"
          echo "订阅配置更新成功!"
          
          # 重启 Clash 服务 (如果在运行)
          if systemctl is-active --quiet clash; then
            echo "重启 Clash 服务..."
            systemctl restart clash
          fi
        else
          echo "订阅配置下载失败!"
          # 恢复备份
          if [ -f "$BACKUP_FILE" ]; then
            mv "$BACKUP_FILE" "$CONFIG_FILE"
            echo "已恢复备份配置"
          fi
          exit 1
        fi
        
        # 清理旧备份 (保留最近5个)
        find /etc/clash -name "config.yaml.backup.*" -type f | sort -r | tail -n +6 | xargs -r rm -f
      '';
    };

    # 订阅更新定时器
    systemd.timers.clash-subscription-update = lib.mkIf (cfg.subscriptionUrl != null) {
      description = "Update Clash subscription timer";
      
      timerConfig = {
        OnCalendar = cfg.updateInterval;
        Persistent = true;
        RandomizedDelaySec = "10m";
      };
      
      wantedBy = [ "timers.target" ];
    };

    # Clash 主服务
    systemd.services.clash = {
      description = "Clash daemon";
      after = [ "network.target" ] ++ lib.optional (cfg.subscriptionUrl != null) "clash-subscription-update.service";
      wants = lib.optional (cfg.subscriptionUrl != null) "clash-subscription-update.service";
      wantedBy = lib.optional cfg.autoStart "multi-user.target";
      
      serviceConfig = {
        Type = "simple";
        ExecStart = "${pkgs.clash-meta}/bin/clash-meta -d /var/lib/clash -f ${cfg.configPath}";
        ExecReload = "${pkgs.coreutils}/bin/kill -HUP $MAINPID";
        Restart = "on-failure";
        RestartSec = 5;
        User = "root";
        Group = "root";
        
        # 安全设置
        NoNewPrivileges = true;
        ProtectSystem = "strict";
        ProtectHome = true;
        ReadWritePaths = [ "/var/lib/clash" "/etc/clash" "/var/log/clash" ];
        
        # 网络权限 (TUN 模式需要)
        AmbientCapabilities = [ "CAP_NET_ADMIN" "CAP_NET_RAW" ];
        CapabilityBoundingSet = [ "CAP_NET_ADMIN" "CAP_NET_RAW" ];
        
        # 日志配置
        StandardOutput = "journal";
        StandardError = "journal";
      };
      
      preStart = ''
        # 检查配置文件
        if [ ! -f ${cfg.configPath} ]; then
          echo "错误: Clash 配置文件不存在: ${cfg.configPath}"
          ${if cfg.subscriptionUrl != null then ''
            echo "正在下载订阅配置..."
            if ${pkgs.curl}/bin/curl -L -f -o ${cfg.configPath} "${cfg.subscriptionUrl}"; then
              echo "订阅配置下载成功"
            else
              echo "订阅配置下载失败，使用默认配置"
              cat > ${cfg.configPath} << 'EOF'
        ${defaultConfig}
        EOF
            fi
          '' else ''
            echo "使用默认配置"
            cat > ${cfg.configPath} << 'EOF'
        ${defaultConfig}
        EOF
          ''}
        fi
        
        # 验证配置文件
        if ! ${pkgs.clash-meta}/bin/clash-meta -t -f ${cfg.configPath}; then
          echo "警告: 配置文件验证失败，但仍将尝试启动"
        fi
      '';
    };

    # TUN 模式系统配置（IP 转发由 virtualInterface 模块统一管理）
    boot.kernel.sysctl = lib.mkIf cfg.tunMode {
      "net.core.default_qdisc" = "fq";
      "net.ipv4.tcp_congestion_control" = "bbr";
    };

    # 防火墙配置
    networking.firewall = {
      allowedTCPPorts = [ cfg.webPort cfg.mixedPort ];
      allowedUDPPorts = [ cfg.mixedPort ];
      # TUN 模式需要的额外配置
      extraCommands = lib.mkIf cfg.tunMode ''
        # 允许 Clash TUN 接口流量
        iptables -I INPUT -i clash+ -j ACCEPT
        iptables -I FORWARD -i clash+ -j ACCEPT
        iptables -I FORWARD -o clash+ -j ACCEPT
      '';
    };

    # 系统环境变量 (仅在非 TUN 模式时设置)
    environment.variables = lib.mkIf (!cfg.tunMode) {
      HTTP_PROXY = "http://127.0.0.1:${toString cfg.mixedPort}";
      HTTPS_PROXY = "http://127.0.0.1:${toString cfg.mixedPort}";
      ALL_PROXY = "socks5://127.0.0.1:${toString cfg.mixedPort}";
    };
  };
}
