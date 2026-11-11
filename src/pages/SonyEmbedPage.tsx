import { useState } from "react";
import { Link } from "react-router-dom";
import { SONY_SIGN_IN_URL } from "../openSony";

export default function SonyEmbedPage() {
  const [embedBlocked, setEmbedBlocked] = useState(false);

  return (
    <div className="sony-embed">
      <div className="sony-embed-bar">
        <Link to="/login" className="back-link">
          ← Back to app
        </Link>
        <span className="muted">PSN sign-in</span>
      </div>

      {!embedBlocked ? (
        <iframe
          title="PlayStation sign-in"
          className="sony-frame"
          src={SONY_SIGN_IN_URL}
          referrerPolicy="no-referrer-when-downgrade"
          onError={() => setEmbedBlocked(true)}
        />
      ) : null}

      {embedBlocked ? (
        <div className="card">
          <p>Sony blocked embedded view. Open login inside this browser (you stay in the app tab).</p>
          <a className="btn primary" href={SONY_SIGN_IN_URL} target="_self" rel="noopener">
            Open login here
          </a>
        </div>
      ) : null}

      <p className="fine-print in-embed">
        If the frame is empty, tap{" "}
        <a href={SONY_SIGN_IN_URL} target="_self" rel="noopener">
          open login in this tab
        </a>
        . We do not send you to another app unless you choose Safari below.
      </p>
      <a
        className="btn secondary small-link"
        href={SONY_SIGN_IN_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Optional: open in Safari
      </a>
    </div>
  );
}
