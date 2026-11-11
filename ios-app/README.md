# PSN Proxy Login — SwiftUI (Xcode)

Optional native iPhone app that keeps Sony sign-in inside a `WKWebView`. **Proxy still must be set in iOS Wi‑Fi settings** (same values as the web app).

## Requirements

- Xcode 15+
- iPhone or simulator running iOS 17+

## Create project in Xcode

1. **File → New → Project → iOS → App**
2. Product name: `PSNProxyLogin`
3. Interface: SwiftUI, Language: Swift
4. Copy `PSNProxyLoginApp.swift`, `ContentView.swift`, and `SonySignInWebView.swift` from this folder into the target (replace generated files).

## Run

1. On your iPhone, set **Wi‑Fi → HTTP Proxy → Manual** using your proxy host/port.
2. Build and run the app.
3. Tap **Sign in to PSN** — the official Sony page loads in the web view.

## App Store notes

- Do not use private Settings URLs.
- You are only embedding Sony’s public login URL; follow Sony and Apple guidelines.
