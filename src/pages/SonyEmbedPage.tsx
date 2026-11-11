import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SONY_SIGN_IN_URL } from "../openSony";

export default function SonyEmbedPage() {
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShowFallback(true), 3500);
    return () => window.clearTimeout(t);
  }, []);

  const loadInSameView = useCallback(() => {
    // Same webview as the home-screen app — never target="_blank".
    window.location.replace(SONY_SIGN_IN_URL);
  }, []);

  return (
    <div className="sony-embed">
      <div className="sony-embed-bar">
        <button type="button" className="back-link" onClick={() => navigate("/login")}>
          ← Back to app
        </button>
        <span className="muted">PSN sign-in</span>
      </div>

      <iframe
        ref={iframeRef}
        title="PlayStation sign-in"
        className="sony-frame"
        src={SONY_SIGN_IN_URL}
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-modals"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setShowFallback(false)}
      />

      {showFallback ? (
        <div className="card">
          <p className="muted">Frame slow or blocked? Load Sony in this same app window (not a new Safari).</p>
          <button type="button" className="btn primary" onClick={loadInSameView}>
            Load login in this window
          </button>
        </div>
      ) : null}

      <p className="fine-print in-embed">
        Everything stays in this app. Use <Link to="/login">Back</Link> after sign-in (browser back also works).
      </p>
    </div>
  );
}
