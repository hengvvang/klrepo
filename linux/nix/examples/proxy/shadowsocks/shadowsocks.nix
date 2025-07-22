{ config, lib, pkgs, ... }:

let
  cfg = config.mySystem.services.network.proxy.shadowsocks;
  
  # 默认配置文件内容
  defaultConfig = ''
    {
      "server": "127.0.0.1",
      "server_port": 8388,
      "local_address": "127.0.0.1",
      "local_port": ${toString cfg.localPort},
      "password": "default_password",
      "timeout": 300,
      "method": "aes-256-gcm",
      "mode": "tcp_and_udp"
    }
  '';
in
{
  config = lib.mkIf cfg.enable {
    # 安装 Shadowsocks-rust 和管理工具
    environment.systemPackages = with pkgs; [
      shadowsocks-rust
      curl
      jq  # JSON 处理工具
      (writeShellScriptBin "ss-ctl" ''
        #!/usr/bin/env bash
        
        case "$1" in
          start)
            echo "启动 Shadowsocks 服务..."
            sudo systemctl start shadowsocks
            ;;
          stop)
            echo "停止 Shadowsocks 服务..."
            sudo systemctl stop shadowsocks
            ;;
          restart)
            echo "重启 Shadowsocks 服务..."
            sudo systemctl restart shadowsocks
            ;;
          status)
            systemctl status shadowsocks
            ;;
          logs)
            journalctl -u shadowsocks -f
            ;;
          update)
            echo "更新订阅配置..."
            sudo systemctl start shadowsocks-subscription-update
            ;;
          test)
            echo "测试代理连接..."
            curl -x socks5://127.0.0.1:${toString cfg.localPort} -I http://www.google.com
            ;;
          config)
            echo "Shadowsocks 配置文件: ${cfg.configPath}"
            echo "SOCKS5 代理: socks5://127.0.0.1:${toString cfg.localPort}"
            ;;
          *)
            echo "用法: ss-ctl {start|stop|restart|status|logs|update|test|config}"
            echo ""
            echo "命令说明:"
            echo "  start   - 启动 Shadowsocks 服务"
            echo "  stop    - 停止 Shadowsocks 服务"
            echo "  restart - 重启 Shadowsocks 服务"
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
      "d /etc/shadowsocks 0755 root root -"
      "d /var/lib/shadowsocks 0755 root root -"
      "d /var/log/shadowsocks 0755 root root -"
    ];

    # 创建默认配置文件
    environment.etc."shadowsocks/config.json" = lib.mkIf (cfg.subscriptionUrl == null) {
      text = defaultConfig;
      mode = "0644";
    };

    # 订阅更新服务
    systemd.services.shadowsocks-subscription-update = lib.mkIf (cfg.subscriptionUrl != null) {
      description = "Update Shadowsocks subscription";
      
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
        
        echo "正在更新 Shadowsocks 订阅配置..."
        echo "订阅链接: $SUBSCRIPTION_URL"
        
        # 备份当前配置
        if [ -f "$CONFIG_FILE" ]; then
          cp "$CONFIG_FILE" "$BACKUP_FILE"
          echo "已备份当前配置到: $BACKUP_FILE"
        fi
        
        # 下载新配置 (可能是 SIP008 格式或直接的 JSON)
        if ${pkgs.curl}/bin/curl -L -f -o "$CONFIG_FILE.tmp" "$SUBSCRIPTION_URL"; then
          # 尝试验证 JSON 格式
          if ${pkgs.jq}/bin/jq empty "$CONFIG_FILE.tmp" 2>/dev/null; then
            mv "$CONFIG_FILE.tmp" "$CONFIG_FILE"
            echo "订阅配置更新成功!"
            
            # 重启 Shadowsocks 服务 (如果在运行)
            if systemctl is-active --quiet shadowsocks; then
              echo "重启 Shadowsocks 服务..."
              systemctl restart shadowsocks
            fi
          else
            # 可能是 base64 编码的订阅链接，尝试解码
            if command -v base64 >/dev/null; then
              echo "尝试解码 base64 订阅链接..."
              if base64 -d "$CONFIG_FILE.tmp" > "$CONFIG_FILE.decoded" 2>/dev/null; then
                # 这里可以添加更多订阅格式的处理逻辑
                echo "订阅格式需要手动处理"
                rm -f "$CONFIG_FILE.tmp" "$CONFIG_FILE.decoded"
                if [ -f "$BACKUP_FILE" ]; then
                  mv "$BACKUP_FILE" "$CONFIG_FILE"
                fi
                exit 1
              fi
            fi
            
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
        find /etc/shadowsocks -name "config.json.backup.*" -type f | sort -r | tail -n +6 | xargs -r rm -f
      '';
    };

    # 订阅更新定时器
    systemd.timers.shadowsocks-subscription-update = lib.mkIf (cfg.subscriptionUrl != null) {
      description = "Update Shadowsocks subscription timer";
      
      timerConfig = {
        OnCalendar = cfg.updateInterval;
        Persistent = true;
        RandomizedDelaySec = "10m";
      };
      
      wantedBy = [ "timers.target" ];
    };

    # Shadowsocks 主服务
    systemd.services.shadowsocks = {
      description = "Shadowsocks daemon";
      after = [ "network.target" ] ++ lib.optional (cfg.subscriptionUrl != null) "shadowsocks-subscription-update.service";
      wants = lib.optional (cfg.subscriptionUrl != null) "shadowsocks-subscription-update.service";
      wantedBy = lib.optional cfg.autoStart "multi-user.target";
      
      serviceConfig = {
        Type = "simple";
        ExecStart = "${pkgs.shadowsocks-rust}/bin/sslocal -c ${cfg.configPath}";
        Restart = "on-failure";
        RestartSec = 5;
        User = "root";
        Group = "root";
        
        # 安全设置
        NoNewPrivileges = true;
        ProtectSystem = "strict";
        ProtectHome = true;
        ReadWritePaths = [ "/var/lib/shadowsocks" "/etc/shadowsocks" "/var/log/shadowsocks" ];
        
        # 日志配置
        StandardOutput = "journal";
        StandardError = "journal";
      };
      
      preStart = ''
        # 检查配置文件
        if [ ! -f ${cfg.configPath} ]; then
          echo "错误: Shadowsocks 配置文件不存在: ${cfg.configPath}"
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
        if ! ${pkgs.jq}/bin/jq empty ${cfg.configPath} 2>/dev/null; then
          echo "警告: 配置文件格式验证失败，但仍将尝试启动"
        fi
      '';
    };

    # 防火墙配置
    networking.firewall = {
      allowedTCPPorts = [ cfg.localPort ];
      allowedUDPPorts = [ cfg.localPort ];
    };

    # 系统环境变量
    environment.variables = {
      # Shadowsocks 使用 SOCKS5 代理
      ALL_PROXY = "socks5://127.0.0.1:${toString cfg.localPort}";
    };
  };
}
