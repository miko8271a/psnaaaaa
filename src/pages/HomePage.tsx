import { Link } from "react-router-dom";
import { loadProxyConfig, proxySummary } from "../proxyStorage";


export default function HomePage() {
  const proxy = loadProxyConfig();
  const ready = proxy.enabled && proxy.host.trim() && proxy.port.trim();

  return (
    <div className="stack">
      <section className="card hero-card">
        <h2>Sign in to PSN through your proxy</h2>
        <p>
          <strong>Do not use Add to Home Screen</strong> for login — iPhone sends Sony to a new
          Safari. Use a <strong>Safari bookmark</strong> or the <strong>Capacitor iOS app</strong> in
          this repo.
        </p>
      </section>

      <section className="card">
        <h3>Status</h3>
        <dl className="status-list">
          <div>
            <dt>Proxy profile</dt>
            <dd>{proxySummary(proxy)}</dd>
          </div>
          <div>
            <dt>Ready for login</dt>
            <dd className={ready ? "ok" : "warn"}>
              {ready ? "Yes — apply iOS steps in Guide" : "Add proxy details first"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="card steps">
        <h3>Quick start</h3>
        <ol>
          <li>
            <Link to="/proxy">Save your proxy</Link> (host, port, optional username/password).
          </li>
          <li>
            <Link to="/guide">Follow the iOS guide</Link> to set the same proxy on your Wi‑Fi network.
          </li>
          <li>
            <Link to="/login">Open Sony sign-in</Link> and log in with your PSN account.
          </li>
        </ol>
      </section>

      <Link to="/sony" className="btn primary">
        Open Sony sign-in in app
      </Link>

      <p className="fine-print">
        Uses signin.playstation.net (not my.account.sony.com — that URL often errors on phones).
      </p>
    </div>
  );
}
