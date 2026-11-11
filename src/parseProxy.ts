import type { ProxyConfig } from "./proxyStorage";

/** Parses `user:pass@host:port` or `host:port`. */
export function parseProxyLine(raw: string): Partial<ProxyConfig> | null {
  const line = raw.trim();
  if (!line) return null;

  const withAuth = /^([^:@]+):([^@]+)@([^:]+):(\d+)\s*$/i.exec(line);
  if (withAuth) {
    return {
      username: withAuth[1],
      password: withAuth[2],
      host: withAuth[3],
      port: withAuth[4],
      type: "http",
      enabled: true,
    };
  }

  const hostPort = /^([^:]+):(\d+)\s*$/i.exec(line);
  if (hostPort) {
    return {
      host: hostPort[1],
      port: hostPort[2],
      type: "http",
      enabled: true,
    };
  }

  return null;
}
