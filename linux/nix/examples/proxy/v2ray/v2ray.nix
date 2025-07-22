{ config, lib, pkgs, ... }:

let
  cfg = config.mySystem.services.network.proxy.v2ray;
  
  # 默认配置文件内容 
  defaultConfig = ''
    {
      "log": {
        "access": "/var/log/v2ray/access.log",
        "error": "/var/log/v2ray/error.log",
        "loglevel": "info"
      },
      "inbounds": [
        {
          "tag": "http",
          "port": ${toString cfg.httpPort},
          "protocol": "http",
          "settings": {
            "allowTransparent": false
          }
        },
        {
          "tag": "socks",
          "port": ${toString cfg.socksPort},
          "protocol": "socks",
          "settings": {
            "auth": "noauth",
            "udp": true
          }
        }${lib.optionalString cfg.tunMode '',
        {
          "tag": "tun",
          "port": ${toString cfg.tunPort},
          "protocol": "dokodemo-door",
          "settings": {
            "address": "127.0.0.1",
            "network": "tcp,udp",
            "followRedirect": true
          },
          "sniffing": {
            "enabled": true,
            "destOverride": ["http", "tls"]
          },
          "streamSettings": {
            "sockopt": {
              "tproxy": "redirect"
            }
          }
        }''}
      ],
      "outbounds": [
        {
          "tag": "direct",
          "protocol": "freedom"
        },
        {
          "tag": "blocked",
          "protocol": "blackhole"
        }
      ],
      "routing": {
        "rules": [
          {
            "type": "field",
            "ip": ["geoip:private"],
            "outboundTag": "direct"
          },
          {
            "type": "field",
            "ip": ["geoip:cn"],
            "outboundTag": "direct"
          }
        ]
      }
    }
  '';

  # TUN 模式配置文件内容
  tunConfig = ''
    {
      "log": {
        "access": "/var/log/v2ray/access.log",
        "error": "/var/log/v2ray/error.log",
        "loglevel": "info"
      },
      "inbounds": [
        {
          "tag": "tun-in",
          "protocol": "dokodemo-door",
          "port": ${toString cfg.tunPort},
          "settings": {
            "address": "127.0.0.1",
            "network": "tcp,udp",
            "followRedirect": true
          },
          "sniffing": {
            "enabled": true,
            "destOverride": ["http", "tls"]
          },
          "streamSettings": {
            "sockopt": {
              "tproxy": "redirect"
            }
          }
        },
        {
          "tag": "http",
          "port": ${toString cfg.httpPort},
          "protocol": "http",
          "settings": {
            "allowTransparent": false
          }
        },
        {
          "tag": "socks",
          "port": ${toString cfg.socksPort},
          "protocol": "socks",
          "settings": {
            "auth": "noauth",
            "udp": true
          }
        }
      ],
      "outbounds": [
        {
          "tag": "direct",
          "protocol": "freedom"
        },
        {
          "tag": "blocked",
          "protocol": "blackhole"
        }
      ],
      "routing": {
        "rules": [
          {
            "type": "field",
            "ip": ["geoip:private"],
            "outboundTag": "direct"
          },
          {
            "type": "field",
            "ip": ["geoip:cn"],
            "outboundTag": "direct"
          }
        ]
      }
    }
  '';
in
{
  config = lib.mkIf cfg.enable {
    # 安装 V2Ray 和管理工具
    environment.systemPackages = with pkgs; [
      v2ray
      curl
      jq  # JSON 处理工具
      (writeShellScriptBin "v2ray-ctl" ''
        #!/usr/bin/env bash
        
        case "$1" in
          start)
            echo "启动 V2Ray 服务..."
            sudo systemctl start v2ray
            ;;
          stop)
            echo "停止 V2Ray 服务..."
            sudo systemctl stop v2ray
            ;;
          restart)
            echo "重启 V2Ray 服务..."
            sudo systemctl restart v2ray
            ;;
          status)
            systemctl status v2ray
            ;;
          logs)
            journalctl -u v2ray -f
            ;;
          update)
            echo "更新订阅配置..."
            sudo systemctl start v2ray-subscription-update
            ;;
          test)
            echo "测试代理连接..."
            curl -x http://127.0.0.1:${toString cfg.httpPort} -I http://www.google.com
            ;;
          config)
            echo "V2Ray 配置文件: ${cfg.configPath}"
            echo "HTTP 代理: http://127.0.0.1:${toString cfg.httpPort}"
            echo "SOCKS5 代理: socks5://127.0.0.1:${toString cfg.socksPort}"
            ;;
          *)
            echo "用法: v2ray-ctl {start|stop|restart|status|logs|update|test|config}"
            echo ""
            echo "命令说明:"
            echo "  start   - 启动 V2Ray 服务"
            echo "  stop    - 停止 V2Ray 服务"
            echo "  restart - 重启 V2Ray 服务"
            echo "  status  - 查看服务状态"
            echo "  logs    - 查看实时日志"
            echo "  update  - 更新订阅配置"
            echo "  test    - 测试代理连接"
            echo "  config  - 显示配置信息"
            ;;
        esac
      '')
    ];

    # 创建配置目录和文件
    systemd.tmpfiles.rules = [
      "d /etc/v2ray 0755 root root -"
      "d /var/lib/v2ray 0755 root root -"
      "d /var/log/v2ray 0755 root root -"
    ];

    # 创建默认配置文件
    environment.etc."v2ray/config.json" = lib.mkIf (cfg.subscriptionUrl == null) {
      text = if cfg.tunMode then tunConfig else defaultConfig;
      mode = "0644";
    };

    # 订阅更新服务
    systemd.services.v2ray-subscription-update = lib.mkIf (cfg.subscriptionUrl != null) {
      description = "Update V2Ray subscription";
      
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
        
        echo "正在更新 V2Ray 订阅配置..."
        echo "订阅链接: $SUBSCRIPTION_URL"
        
        # 备份当前配置
        if [ -f "$CONFIG_FILE" ]; then
          cp "$CONFIG_FILE" "$BACKUP_FILE"
          echo "已备份当前配置到: $BACKUP_FILE"
        fi
        
        # 下载新配置
        if ${pkgs.curl}/bin/curl -L -f -o "$CONFIG_FILE.tmp" "$SUBSCRIPTION_URL"; then
          # 验证 JSON 格式
          if ${pkgs.jq}/bin/jq empty "$CONFIG_FILE.tmp" 2>/dev/null; then
            mv "$CONFIG_FILE.tmp" "$CONFIG_FILE"
            echo "订阅配置更新成功!"
            
            # 重启 V2Ray 服务 (如果在运行)
            if systemctl is-active --quiet v2ray; then
              echo "重启 V2Ray 服务..."
              systemctl restart v2ray
            fi
          else
            echo "订阅配置格式错误，使用备份配置"
            rm -f "$CONFIG_FILE.tmp"
            if [ -f "$BACKUP_FILE" ]; then
              mv "$BACKUP_FILE" "$CONFIG_FILE"
            fi
            exit 1
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
        find /etc/v2ray -name "config.json.backup.*" -type f | sort -r | tail -n +6 | xargs -r rm -f
      '';
    };

    # 订阅更新定时器
    systemd.timers.v2ray-subscription-update = lib.mkIf (cfg.subscriptionUrl != null) {
      description = "Update V2Ray subscription timer";
      
      timerConfig = {
        OnCalendar = cfg.updateInterval;
        Persistent = true;
        RandomizedDelaySec = "10m";
      };
      
      wantedBy = [ "timers.target" ];
    };

    # V2Ray 主服务
    systemd.services.v2ray = {
      description = "V2Ray daemon";
      after = [ "network.target" ] ++ lib.optional (cfg.subscriptionUrl != null) "v2ray-subscription-update.service";
      wants = lib.optional (cfg.subscriptionUrl != null) "v2ray-subscription-update.service";
      wantedBy = lib.optional cfg.autoStart "multi-user.target";
      
      serviceConfig = {
        Type = "simple";
        ExecStart = "${pkgs.v2ray}/bin/v2ray run -c ${cfg.configPath}";
        Restart = "on-failure";
        RestartSec = 5;
        User = "root";
        Group = "root";
        
        # 安全设置
        NoNewPrivileges = true;
        ProtectSystem = "strict";
        ProtectHome = true;
        ReadWritePaths = [ "/var/lib/v2ray" "/etc/v2ray" "/var/log/v2ray" ];
        
        # TUN 模式需要的网络权限
        AmbientCapabilities = lib.optional cfg.tunMode "CAP_NET_ADMIN";
        CapabilityBoundingSet = lib.optional cfg.tunMode "CAP_NET_ADMIN";
        
        # 日志配置
        StandardOutput = "journal";
        StandardError = "journal";
      };
      
      preStart = ''
        # 检查配置文件
        if [ ! -f ${cfg.configPath} ]; then
          echo "错误: V2Ray 配置文件不存在: ${cfg.configPath}"
          ${if cfg.subscriptionUrl != null then ''
            echo "正在下载订阅配置..."
            if ${pkgs.curl}/bin/curl -L -f -o ${cfg.configPath} "${cfg.subscriptionUrl}"; then
              echo "订阅配置下载成功"
            else
              echo "订阅配置下载失败，使用默认配置"
              cat > ${cfg.configPath} << 'EOF'
        ${if cfg.tunMode then tunConfig else defaultConfig}
        EOF
            fi
          '' else ''
            echo "使用默认配置"
            cat > ${cfg.configPath} << 'EOF'
        ${if cfg.tunMode then tunConfig else defaultConfig}
        EOF
          ''}
        fi
        
        # 验证配置文件
        if ! ${pkgs.v2ray}/bin/v2ray test -c ${cfg.configPath}; then
          echo "警告: 配置文件验证失败，但仍将尝试启动"
        fi
      '';
    };

    # 防火墙配置
    networking.firewall = {
      allowedTCPPorts = [ cfg.httpPort cfg.socksPort ] ++ lib.optional cfg.tunMode cfg.tunPort;
      allowedUDPPorts = [ cfg.socksPort ] ++ lib.optional cfg.tunMode cfg.tunPort;
      # TUN 模式需要的额外配置
      extraCommands = lib.mkIf cfg.tunMode ''
        # 允许 V2Ray TUN 接口流量
        iptables -I INPUT -i v2ray-tun -j ACCEPT
        iptables -I FORWARD -i v2ray-tun -j ACCEPT
        iptables -I FORWARD -o v2ray-tun -j ACCEPT
      '';
    };

    # TUN 模式系统配置
    boot.kernel.sysctl = lib.mkIf cfg.tunMode {
      "net.ipv4.ip_forward" = 1;
      "net.ipv6.conf.all.forwarding" = 1;
      "net.core.default_qdisc" = "fq";
      "net.ipv4.tcp_congestion_control" = "bbr";
    };

    # 系统环境变量 (仅在非 TUN 模式时设置)
    environment.variables = lib.mkIf (!cfg.tunMode) {
      HTTP_PROXY = "http://127.0.0.1:${toString cfg.httpPort}";
      HTTPS_PROXY = "http://127.0.0.1:${toString cfg.httpPort}";
      ALL_PROXY = "socks5://127.0.0.1:${toString cfg.socksPort}";
    };
  };
}
