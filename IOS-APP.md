# Real iPhone app (login stays inside — not separate Safari)

**Apple blocks Sony login inside “Add to Home Screen” web icons.** That is why Safari opens separately.

## Option A — Safari bookmark (no Mac build)

1. Open **https://miko8271a.github.io/psnaaaaa/** in **Safari** (not the home icon).
2. **Share → Add Bookmark**.
3. Login stays in that Safari tab.

## Option B — Native shell (best)

On a Mac with Xcode:

```bash
npm install
npm run build
npx cap sync ios
npx cap open ios
```

Run on your iPhone. `allowNavigation` in `capacitor.config.ts` keeps PlayStation login inside the app.
