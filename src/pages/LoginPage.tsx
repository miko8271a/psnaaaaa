import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadProxyConfig, proxySummary } from "../proxyStorage";

const SONY_SIGN_IN = "https://my.account.sony.com/sonyacct/signin/";
const IP_CHECK = "https://api.ipify.org?format=json";

export default function LoginPage() {
  const proxy = loadProxyConfig();
  const [ip, setIp] = useState<string | null>(null);
  const [ipError, setIpError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

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

  return (
    <div className="stack">
      <section className="card">
        <h2>PSN sign-in</h2>
        <p>
          Proxy profile: <strong>{proxySummary(proxy)}</strong>
        </p>
        {!proxyReady ? (
          <p className="warn banner">
            Configure and enable your proxy first, then apply it in{" "}
            <Link to="/guide">iOS Wi‑Fi settings</Link>.
          </p>
        ) : (
          <p className="muted">
            Make sure you completed the Wi‑Fi proxy steps. Then open Sony&apos;s sign-in page.
          </p>
        )}
      </section>

      <section className="card">
        <h3>Connection check</h3>
        <p className="muted">
          Compare this IP with and without Wi‑Fi proxy to confirm traffic is exiting through your
          proxy.
        </p>
        {ip ? <p className="ip-display">Current public IP: <code>{ip}</code></p> : null}
        {ipError ? <p className="warn">{ipError}</p> : null}
        <button type="button" className="btn secondary" disabled={checking} onClick={checkIp}>
          {checking ? "Checking…" : "Refresh IP"}
        </button>
      </section>

      <a className="btn primary large" href={SONY_SIGN_IN}>
        Continue to Sony sign-in
      </a>

      <p className="fine-print">
        You will leave this app and open Sony&apos;s official login. Two-factor and CAPTCHA are
        handled by Sony.
      </p>
    </div>
  );
}
