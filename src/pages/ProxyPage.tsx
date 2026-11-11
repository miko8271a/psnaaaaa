import { FormEvent, useState } from "react";
import {
  loadProxyConfig,
  saveProxyConfig,
  type ProxyConfig,
  type ProxyType,
} from "../proxyStorage";

export default function ProxyPage() {
  const [config, setConfig] = useState<ProxyConfig>(() => loadProxyConfig());
  const [saved, setSaved] = useState(false);

  function update<K extends keyof ProxyConfig>(key: K, value: ProxyConfig[K]) {
    setConfig((c) => ({ ...c, [key]: value }));
    setSaved(false);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    saveProxyConfig(config);
    setSaved(true);
  }

  return (
    <div className="stack">
      <section className="card">
        <h2>Proxy settings</h2>
        <p className="muted">
          Enter the HTTP or HTTPS proxy you want PSN traffic to use. On iPhone, these same values
          go into Wi‑Fi → Configure Proxy → Manual.
        </p>

        <form className="form" onSubmit={onSubmit}>
          <label className="switch-row">
            <span>Use proxy for PSN login</span>
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) => update("enabled", e.target.checked)}
            />
          </label>

          <label>
            Type
            <select
              value={config.type}
              onChange={(e) => update("type", e.target.value as ProxyType)}
            >
              <option value="http">HTTP</option>
              <option value="https">HTTPS</option>
            </select>
          </label>

          <label>
            Host
            <input
              type="text"
              inputMode="url"
              autoComplete="off"
              placeholder="proxy.example.com"
              value={config.host}
              onChange={(e) => update("host", e.target.value.trim())}
            />
          </label>

          <label>
            Port
            <input
              type="number"
              inputMode="numeric"
              placeholder="8080"
              value={config.port}
              onChange={(e) => update("port", e.target.value)}
            />
          </label>

          <fieldset>
            <legend>Authentication (optional)</legend>
            <label>
              Username
              <input
                type="text"
                autoComplete="username"
                value={config.username}
                onChange={(e) => update("username", e.target.value)}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                autoComplete="current-password"
                value={config.password}
                onChange={(e) => update("password", e.target.value)}
              />
            </label>
          </fieldset>

          <button type="submit" className="btn primary">
            Save proxy
          </button>
          {saved ? <p className="ok banner">Saved on this device.</p> : null}
        </form>
      </section>

      <section className="card note">
        <h3>SOCKS or VPN?</h3>
        <p>
          iOS Wi‑Fi manual proxy supports HTTP/HTTPS only. For SOCKS5, use a VPN or proxy app that
          creates a system tunnel, then sign in from the Login tab.
        </p>
      </section>
    </div>
  );
}
