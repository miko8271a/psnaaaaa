import { useNavigate } from "react-router-dom";
import { isIosHomeScreenWebApp, isNativeShell } from "../capacitor";
import { SONY_SIGN_IN_URL } from "../openSony";

export default function SonyEmbedPage() {
  const navigate = useNavigate();
  const homeScreenWeb = isIosHomeScreenWebApp();
  const native = isNativeShell();

  function openLogin() {
    window.location.href = SONY_SIGN_IN_URL;
  }

  return (
    <div className="stack">
      <section className="card">
        <h2>PSN login</h2>

        {homeScreenWeb && !native ? (
          <p className="warn banner">
            iPhone <strong>web icons</strong> always throw Sony into a <strong>new Safari</strong>.
            Apple does not allow Sony login inside that icon. Use the <strong>real iOS app</strong>{" "}
            (Xcode / Capacitor in repo) or open this site as a <strong>Safari tab</strong> instead
            of Add to Home Screen.
          </p>
        ) : (
          <p className="muted">
            {native
              ? "Native app: login stays inside this app."
              : "Opens PlayStation login in this browser tab."}
          </p>
        )}

        <button type="button" className="btn primary large" onClick={openLogin}>
          Continue to PlayStation login
        </button>
        <button type="button" className="btn secondary" onClick={() => navigate("/login")}>
          ← Back
        </button>
      </section>

      {homeScreenWeb ? (
        <section className="card note">
          <h3>Stay in one app (fix)</h3>
          <ol>
            <li>Delete the Home Screen icon.</li>
            <li>
              In <strong>Safari</strong>, open{" "}
              <strong>https://miko8271a.github.io/psnaaaaa/</strong>
            </li>
            <li>
              <strong>Share → Add to Bookmark</strong> (not Home Screen), or build{" "}
              <strong>ios-app</strong> in Xcode.
            </li>
          </ol>
        </section>
      ) : null}
    </div>
  );
}
