import { useMemo, useState } from "react";
import { loadProxyConfig } from "../proxyStorage";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function GuidePage() {
  const proxy = loadProxyConfig();
  const [copied, setCopied] = useState<string | null>(null);

  const lines = useMemo(() => {
    const items = [
      `Server: ${proxy.host || "(set host in Proxy tab)"}`,
      `Port: ${proxy.port || "(set port)"}`,
    ];
    if (proxy.username) items.push(`Username: ${proxy.username}`);
    if (proxy.password) items.push(`Password: ••••••`);
    return items;
  }, [proxy]);

  async function onCopy(label: string, value: string) {
    const ok = await copyText(value);
    if (ok) {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    }
  }

  return (
    <div className="stack">
      <section className="card">
        <h2>iPhone Wi‑Fi proxy setup</h2>
        <p className="muted">
          Safari and in-app browsers on iOS respect the Wi‑Fi HTTP proxy. Set it once before you
          sign in to PSN.
        </p>
        <ol className="guide-steps">
          <li>Open <strong>Settings</strong> → <strong>Wi‑Fi</strong>.</li>
          <li>Tap the <strong>ⓘ</strong> next to your connected network.</li>
          <li>Scroll to <strong>HTTP Proxy</strong> → <strong>Configure Proxy</strong> → <strong>Manual</strong>.</li>
          <li>Enter the server and port from below (and authentication if your provider requires it).</li>
          <li>Tap <strong>Save</strong>, then return here and open <strong>Sign in</strong>.</li>
        </ol>
      </section>

      <section className="card">
        <h3>Your saved values</h3>
        <ul className="copy-list">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div className="copy-actions">
          {proxy.host ? (
            <button
              type="button"
              className="btn secondary"
              onClick={() => onCopy("host", proxy.host)}
            >
              Copy host
            </button>
          ) : null}
          {proxy.port ? (
            <button
              type="button"
              className="btn secondary"
              onClick={() => onCopy("port", proxy.port)}
            >
              Copy port
            </button>
          ) : null}
          {proxy.username ? (
            <button
              type="button"
              className="btn secondary"
              onClick={() => onCopy("user", proxy.username)}
            >
              Copy username
            </button>
          ) : null}
        </div>
        {copied ? <p className="ok banner">Copied {copied}.</p> : null}
      </section>

      <section className="card note">
        <h3>After login</h3>
        <p>
          Turn off the manual proxy in Wi‑Fi settings when you are done so normal browsing is not
          routed through the proxy.
        </p>
      </section>
    </div>
  );
}
