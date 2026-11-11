export type ProxyType = "http" | "https";

export interface ProxyConfig {
  enabled: boolean;
  host: string;
  port: string;
  type: ProxyType;
  username: string;
  password: string;
}

const STORAGE_KEY = "psn-proxy-config";

const defaultConfig: ProxyConfig = {
  enabled: false,
  host: "",
  port: "",
  type: "http",
  username: "",
  password: "",
};

export function loadProxyConfig(): ProxyConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultConfig };
    return { ...defaultConfig, ...JSON.parse(raw) };
  } catch {
    return { ...defaultConfig };
  }
}

export function saveProxyConfig(config: ProxyConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function proxySummary(config: ProxyConfig): string {
  if (!config.host || !config.port) return "Not configured";
  const auth =
    config.username.trim().length > 0
      ? `${config.username}@${config.host}`
      : config.host;
  return `${config.type.toUpperCase()} · ${auth}:${config.port}`;
}
