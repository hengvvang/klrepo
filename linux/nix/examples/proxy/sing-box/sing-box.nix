{ config, lib, pkgs, ... }:

let
  cfg = config.mySystem.services.network.proxy.sing-box;
  
  # 默认配置文件内容
  defaultConfig = builtins.toJSON {
    log = {
      level = cfg.logLevel;
      output = "/var/log/sing-box/sing-box.log";
      timestamp = true;
    };
    
    dns = {
      servers = [
        {
          tag = "dns_proxy";
          address = "1.1.1.1";
          address_resolver = "dns_resolver";
        }
        {
          tag = "dns_direct";
          address = "223.5.5.5";
          address_resolver = "dns_resolver";
          detour = "direct";
        }
        {
          tag = "dns_local";
          address = "local";
          detour = "direct";
        }
        {
          tag = "dns_resolver";
          address = "223.5.5.5";
          detour = "direct";
        }
        {
          tag = "dns_block";
          address = "rcode://success";
        }
      ];
      rules = [
        {
          domain_suffix = [ ".lan" ".local" "localhost" ];
          server = "dns_local";
        }
        {
          geosite = [ "cn" ];
          server = "dns_direct";
        }
        {
          geosite = [ "category-ads-all" ];
          server = "dns_block";
          disable_cache = true;
        }
      ];
      final = "dns_proxy";
      strategy = "prefer_ipv4";
    };
    
    inbounds = [
      {
        tag = "mixed-in";
        type = "mixed";
        listen = "::";
        listen_port = cfg.mixedPort;
        sniff = true;
        sniff_override_destination = true;
        domain_strategy = "prefer_ipv4";
      }
    ] ++ lib.optionals cfg.tunMode [
      {
        tag = "tun-in";
        type = "tun";
        interface_name = "sing-box";
        inet4_address = "172.19.0.1/30";
        inet6_address = "fdfe:dcba:9876::1/126";
        mtu = 9000;
        auto_route = true;
        strict_route = true;
        sniff = true;
        sniff_override_destination = true;
        domain_strategy = "prefer_ipv4";
      }
    ];
    
    outbounds = [
      {
        tag = "proxy";
        type = "selector";
        outbounds = [ "direct" ];
      }
      {
        tag = "direct";
        type = "direct";
      }
      {
        tag = "block";
        type = "block";
      }
      {
        tag = "dns-out";
        type = "dns";
      }
    ];
    
    route = {
      geoip = {
        download_url = "https://github.com/SagerNet/sing-geoip/releases/latest/download/geoip.db";
        download_detour = "direct";
      };
      geosite = {
        download_url = "https://github.com/SagerNet/sing-geosite/releases/latest/download/geosite.db";
        download_detour = "direct";
      };
      rules = [
        {
          protocol = "dns";
          outbound = "dns-out";
        }
        {
          geosite = [ "category-ads-all" ];
          outbound = "block";
        }
        {
          geosite = [ "cn" ];
          geoip = [ "cn" ];
          outbound = "direct";
        }
        {
          geosite = [ "geolocation-!cn" ];
          outbound = "proxy";
        }
      ];
      final = "proxy";
      auto_detect_interface = true;
    };
    
    experimental = {
      clash_api = {
        external_controller = "127.0.0.1:${toString cfg.webPort}";
        external_ui = "ui";
        external_ui_download_url = "https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip";
        external_ui_download_detour = "direct";
        secret = "";
        default_mode = "rule";
      };
      cache_file = {
        enabled = true;
        path = "/var/lib/sing-box/cache.db";
        cache_id = "sing-box";
        store_fakeip = true;
      };
    };
  };
in
{
  config = lib.mkIf cfg.enable {
    # 安装 sing-box 和管理工具
    environment.systemPackages = with pkgs; [
      sing-box
      curl  # 用于下载订阅
      jq    # 用于处理 JSON 配置
      (writeShellScriptBin "sing-box-ctl" ''
        #!/usr/bin/env bash
        
        case "$1" in
          start)
            echo "启动 sing-box 服务..."
            sudo systemctl start sing-box
            ;;
          stop)
            echo "停止 sing-box 服务..."
            sudo systemctl stop sing-box
            ;;
          restart)
            echo "重启 sing-box 服务..."
            sudo systemctl restart sing-box
            ;;
          status)
            systemctl status sing-box
            ;;
          logs)
            journalctl -u sing-box -f
            ;;
          check)
            echo "检查配置文件..."
            ${pkgs.sing-box}/bin/sing-box check -c ${cfg.configPath}
            ;;
          format)
            echo "格式化配置文件..."
            ${pkgs.sing-box}/bin/sing-box format -c ${cfg.configPath} -w
            ;;
          update)
            echo "更新订阅配置..."
            sudo systemctl start sing-box-subscription-update
            ;;
          test)
            echo "测试代理连接..."
            curl -x http://127.0.0.1:${toString cfg.mixedPort} -I http://www.google.com
            ;;
          ui)
            echo "sing-box Web UI: http://localhost:${toString cfg.webPort}"
            ;;
          geoip)
            echo "更新 GeoIP 数据库..."
            sudo -u sing-box ${pkgs.sing-box}/bin/sing-box geoip download -c ${cfg.configPath}
            ;;
          geosite)
            echo "更新 GeoSite 数据库..."
            sudo -u sing-box ${pkgs.sing-box}/bin/sing-box geosite download -c ${cfg.configPath}
            ;;
          *)
            echo "用法: sing-box-ctl {start|stop|restart|status|logs|check|format|update|test|ui|geoip|geosite}"
            echo ""
            echo "命令说明:"
            echo "  start   - 启动 sing-box 服务"
            echo "  stop    - 停止 sing-box 服务"
            echo "  restart - 重启 sing-box 服务"
            echo "  status  - 查看服务状态"
            echo "  logs    - 查看实时日志"
            echo "  check   - 检查配置文件"
            echo "  format  - 格式化配置文件"
            echo "  update  - 更新订阅配置"
            echo "  test    - 测试代理连接"
            echo "  ui      - 显示 Web UI 地址"
            echo "  geoip   - 更新 GeoIP 数据库"
            echo "  geosite - 更新 GeoSite 数据库"
            ;;
        esac
      '')
    ];

    # 创建 sing-box 用户
    users.users.sing-box = {
      isSystemUser = true;
      group = "sing-box";
      description = "sing-box daemon user";
      home = "/var/lib/sing-box";
      createHome = true;
    };

    users.groups.sing-box = {};

    # 创建配置目录和文件
    systemd.tmpfiles.rules = [
      "d /etc/sing-box 0755 root root -"
      "d /var/lib/sing-box 0755 sing-box sing-box -"
      "d /var/log/sing-box 0755 sing-box sing-box -"
    ];

    # 创建默认配置文件
    environment.etc."sing-box/config.json" = lib.mkIf (cfg.subscriptionUrl == null) {
      text = defaultConfig;
      mode = "0644";
    };

    # 订阅更新服务
    systemd.services.sing-box-subscription-update = lib.mkIf (cfg.subscriptionUrl != null) {
      description = "Update sing-box subscription";
      
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
        
        echo "正在更新 sing-box 订阅配置..."
        echo "订阅链接: $SUBSCRIPTION_URL"
        
        # 备份当前配置
        if [ -f "$CONFIG_FILE" ]; then
          cp "$CONFIG_FILE" "$BACKUP_FILE"
          echo "已备份当前配置到: $BACKUP_FILE"
        fi
        
        # 下载新配置
        if ${pkgs.curl}/bin/curl -L -f -o "$CONFIG_FILE.tmp" "$SUBSCRIPTION_URL"; then
          # 验证 JSON 格式
          if ${pkgs.jq}/bin/jq . "$CONFIG_FILE.tmp" > /dev/null 2>&1; then
            mv "$CONFIG_FILE.tmp" "$CONFIG_FILE"
            chown sing-box:sing-box "$CONFIG_FILE"
            echo "订阅配置更新成功!"
            
            # 重启 sing-box 服务 (如果在运行)
            if systemctl is-active --quiet sing-box; then
              echo "重启 sing-box 服务..."
              systemctl restart sing-box
            fi
          else
            echo "订阅配置 JSON 格式验证失败!"
            rm -f "$CONFIG_FILE.tmp"
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
        find /etc/sing-box -name "config.json.backup.*" -type f | sort -r | tail -n +6 | xargs -r rm -f
      '';
    };

    # 订阅更新定时器
    systemd.timers.sing-box-subscription-update = lib.mkIf (cfg.subscriptionUrl != null) {
      description = "Update sing-box subscription timer";
      
      timerConfig = {
        OnCalendar = cfg.updateInterval;
        Persistent = true;
        RandomizedDelaySec = "10m";
      };
      
      wantedBy = [ "timers.target" ];
    };

    # sing-box 主服务
    systemd.services.sing-box = {
      description = "sing-box daemon";
      after = [ "network.target" ] ++ lib.optional (cfg.subscriptionUrl != null) "sing-box-subscription-update.service";
      wants = lib.optional (cfg.subscriptionUrl != null) "sing-box-subscription-update.service";
      wantedBy = lib.optional cfg.autoStart "multi-user.target";
      
      serviceConfig = {
        Type = "simple";
        ExecStart = "${pkgs.sing-box}/bin/sing-box run -c ${cfg.configPath}";
        ExecReload = "${pkgs.coreutils}/bin/kill -HUP $MAINPID";
        Restart = "on-failure";
        RestartSec = 5;
        User = "sing-box";
        Group = "sing-box";
        
        # 安全设置
        NoNewPrivileges = true;
        ProtectSystem = "strict";
        ProtectHome = true;
        ReadWritePaths = [ "/var/lib/sing-box" "/var/log/sing-box" ];
        ReadOnlyPaths = [ "/etc/sing-box" ];
        
        # 网络权限 (TUN 模式需要)
        AmbientCapabilities = [ "CAP_NET_ADMIN" "CAP_NET_RAW" ];
        CapabilityBoundingSet = [ "CAP_NET_ADMIN" "CAP_NET_RAW" ];
        
        # 日志配置
        StandardOutput = "journal";
        StandardError = "journal";
        SyslogIdentifier = "sing-box";
      };
      
      preStart = ''
        # 检查配置文件
        if [ ! -f ${cfg.configPath} ]; then
          echo "错误: sing-box 配置文件不存在: ${cfg.configPath}"
          ${if cfg.subscriptionUrl != null then ''
            echo "正在下载订阅配置..."
            if ${pkgs.curl}/bin/curl -L -f -o ${cfg.configPath} "${cfg.subscriptionUrl}"; then
              echo "订阅配置下载成功"
              chown sing-box:sing-box ${cfg.configPath}
            else
              echo "订阅配置下载失败，使用默认配置"
              cat > ${cfg.configPath} << 'EOF'
        ${defaultConfig}
        EOF
              chown sing-box:sing-box ${cfg.configPath}
            fi
          '' else ''
            echo "使用默认配置"
            cat > ${cfg.configPath} << 'EOF'
        ${defaultConfig}
        EOF
            chown sing-box:sing-box ${cfg.configPath}
          ''}
        fi
        
        # 验证配置文件
        if ! ${pkgs.sing-box}/bin/sing-box check -c ${cfg.configPath}; then
          echo "错误: sing-box 配置文件验证失败"
          exit 1
        fi
        
        # 确保文件权限正确
        chown sing-box:sing-box ${cfg.configPath}
      '';
    };

    # TUN 模式系统配置
    boot.kernel.sysctl = lib.mkIf cfg.tunMode {
      "net.ipv4.ip_forward" = 1;
      "net.ipv6.conf.all.forwarding" = 1;
      "net.core.default_qdisc" = "fq";
      "net.ipv4.tcp_congestion_control" = "bbr";
    };

    # 防火墙配置
    networking.firewall = {
      allowedTCPPorts = [ cfg.webPort cfg.mixedPort ];
      allowedUDPPorts = [ cfg.mixedPort ];
      # TUN 模式需要的额外配置
      extraCommands = lib.mkIf cfg.tunMode ''
        # 允许 sing-box TUN 接口流量
        iptables -I INPUT -i sing-box -j ACCEPT
        iptables -I FORWARD -i sing-box -j ACCEPT
        iptables -I FORWARD -o sing-box -j ACCEPT
      '';
    };

    # 系统环境变量 (可选)
    environment.variables = lib.mkIf (!cfg.tunMode) {
      HTTP_PROXY = "http://127.0.0.1:${toString cfg.mixedPort}";
      HTTPS_PROXY = "http://127.0.0.1:${toString cfg.mixedPort}";
      ALL_PROXY = "socks5://127.0.0.1:${toString cfg.mixedPort}";
    };
  };
}
