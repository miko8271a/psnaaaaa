# PSN Proxy Login (iOS-friendly)

Mobile web app to save HTTP/HTTPS proxy settings, apply them on iPhone Wi‑Fi, and open Sony’s official PSN / Sony account sign-in page.

## Why Wi‑Fi proxy on iPhone?

iOS does not let third-party apps set a system-wide proxy for Safari. The supported approach is **Settings → Wi‑Fi → Configure Proxy → Manual**, then sign in on Sony’s website.

## Develop

```bash
npm install
npm run dev
```

Open http://127.0.0.1:5173

## Native iOS (optional)

See `ios-app/README.md` for a SwiftUI shell that opens Sony sign-in in a `WKWebView` (uses the same Wi‑Fi proxy once configured).

## Security

- Credentials for **PSN** are entered only on `my.account.sony.com`.
- Proxy username/password are stored in **localStorage** on the device only.
