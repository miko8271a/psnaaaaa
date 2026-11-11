import { useNavigate } from "react-router-dom";
import { SONY_SIGN_IN_URL } from "../openSony";

export default function SonyEmbedPage() {
  const navigate = useNavigate();

  function openInThisApp() {
    // Sony blocks iframes (verified with Playwright). Same tab = same home-screen app, not a new Safari.
    window.location.assign(SONY_SIGN_IN_URL);
  }

  return (
    <div className="stack">
      <section className="card">
        <h2>PSN login</h2>
        <p className="muted">
          Sony does not allow login inside a small frame (it stays blank on iPhone). Login opens
          full-screen in <strong>this same app window</strong> — not a separate Safari app.
        </p>
        <button type="button" className="btn primary large" onClick={openInThisApp}>
          Continue to PlayStation login
        </button>
        <button type="button" className="btn secondary" onClick={() => navigate("/login")}>
          ← Back
        </button>
      </section>
      <p className="fine-print">
        After sign-in, open the <strong>PSN Proxy Login</strong> icon again for proxy settings.
        Do not tap links that open a new tab.
      </p>
    </div>
  );
}
