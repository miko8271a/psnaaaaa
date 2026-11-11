import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  loadAccounts,
  saveAccounts,
  sonySignInUrl,
  type SavedAccount,
} from "../accountStorage";
import { loadProxyConfig, proxySummary } from "../proxyStorage";

const IP_CHECK = "https://api.ipify.org?format=json";

function newId(): string {
  return crypto.randomUUID();
}

export default function LoginPage() {
  const proxy = loadProxyConfig();
  const [ip, setIp] = useState<string | null>(null);
  const [ipError, setIpError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [accounts, setAccounts] = useState<SavedAccount[]>(() => loadAccounts());
  const [newEmail, setNewEmail] = useState("");

  const proxyReady = proxy.enabled && proxy.host && proxy.port;

  async function checkIp() {
    setChecking(true);
    setIpError(null);
    try {
      const res = await fetch(IP_CHECK);
      const data = (await res.json()) as { ip: string };
      setIp(data.ip);
    } catch {
      setIpError("Could not reach IP check service.");
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    void checkIp();
  }, []);

  function addAccount(e: FormEvent) {
    e.preventDefault();
    const email = newEmail.trim();
    if (!email.includes("@")) return;
    const next = [
      ...accounts,
      { id: newId(), email, label: email.split("@")[0] ?? email },
    ];
    setAccounts(next);
    saveAccounts(next);
    setNewEmail("");
  }

  function removeAccount(id: string) {
    const next = accounts.filter((a) => a.id !== id);
    setAccounts(next);
    saveAccounts(next);
  }

  return (
    <div className="stack">
      <section className="card">
        <h2>PSN sign-in</h2>
        <p>
          Proxy: <strong>{proxySummary(proxy)}</strong>
        </p>
        {!proxyReady ? (
          <p className="warn banner">
            Set proxy in <Link to="/proxy">Proxy</Link>, then Wi‑Fi steps in{" "}
            <Link to="/guide">iOS setup</Link>.
          </p>
        ) : (
          <p className="muted">
            Wi‑Fi proxy on, then pick an account — Sony opens with your email filled. You enter
            password on Sony&apos;s site (CAPTCHA / 2FA there).
          </p>
        )}
      </section>

      <section className="card">
        <h3>Your accounts (this phone only)</h3>
        <form className="form inline-add" onSubmit={addAccount}>
          <input
            type="email"
            placeholder="Sign-in email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            autoComplete="email"
          />
          <button type="submit" className="btn secondary">
            Add
          </button>
        </form>
        <ul className="account-list">
          {accounts.map((a) => (
            <li key={a.id}>
              <a className="btn primary account-btn" href={sonySignInUrl(a.email)}>
                {a.email}
              </a>
              <button
                type="button"
                className="btn ghost"
                onClick={() => removeAccount(a.id)}
                aria-label="Remove"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        {accounts.length === 0 ? (
          <p className="muted">Add each email you use for PSN — tap to sign in.</p>
        ) : null}
      </section>

      <section className="card">
        <h3>Connection check</h3>
        {ip ? (
          <p className="ip-display">
            Public IP: <code>{ip}</code>
          </p>
        ) : null}
        {ipError ? <p className="warn">{ipError}</p> : null}
        <button type="button" className="btn secondary" disabled={checking} onClick={checkIp}>
          {checking ? "Checking…" : "Refresh IP"}
        </button>
      </section>
    </div>
  );
}
