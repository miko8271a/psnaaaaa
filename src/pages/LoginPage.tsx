import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  loadAccounts,
  saveAccounts,
  type SavedAccount,
} from "../accountStorage";
import { openSonySignIn, probeSonyReachability, SONY_SIGN_IN_URL } from "../openSony";
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
  const [probes, setProbes] = useState<
    Awaited<ReturnType<typeof probeSonyReachability>> | null
  >(null);

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
    void probeSonyReachability().then(setProbes);
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
        <h2>Sign in (inside this app)</h2>
        <p className="muted">
          Opens an in-app full-screen login page — you are not thrown out to Safari.
        </p>
        <button type="button" className="btn primary large" onClick={openSonySignIn}>
          Open Sony login in app
        </button>
        <Link to="/sony" className="btn secondary">
          Or use Login screen tab
        </Link>
      </section>

      <section className="card">
        <h3>Auto checks</h3>
        <p>
          Proxy: <strong>{proxySummary(proxy)}</strong>
        </p>
        {ip ? (
          <p className="ip-display">
            Public IP: <code>{ip}</code>
          </p>
        ) : null}
        {ipError ? <p className="warn">{ipError}</p> : null}
        <button type="button" className="btn secondary" disabled={checking} onClick={checkIp}>
          Refresh IP
        </button>
        <ul className="copy-list">
          {probes?.map((p) => (
            <li key={p.url}>
              {p.ok ? "✓" : "✗"} {p.detail}
            </li>
          ))}
        </ul>
        {!proxyReady ? (
          <p className="muted">
            Optional: <Link to="/proxy">Proxy</Link> +{" "}
            <Link to="/guide">Wi‑Fi setup</Link>.
          </p>
        ) : null}
      </section>

      <section className="card">
        <h3>Saved emails</h3>
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
              <button
                type="button"
                className="btn primary account-btn"
                onClick={openSonySignIn}
              >
                {a.email}
              </button>
              <button
                type="button"
                className="btn ghost"
                onClick={() => removeAccount(a.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <p className="fine-print">Sony URL: {SONY_SIGN_IN_URL}</p>
      </section>
    </div>
  );
}
