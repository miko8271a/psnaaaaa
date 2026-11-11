import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.miko.psnproxy",
  appName: "PSN Proxy Login",
  webDir: "dist",
  server: {
    allowNavigation: [
      "signin.playstation.net",
      "*.playstation.net",
      "*.sony.com",
      "*.sonyentertainmentnetwork.com",
      "*.okta.com",
      "*.oktacdn.com",
    ],
  },
  ios: {
    allowsLinkPreview: false,
  },
};

export default config;
