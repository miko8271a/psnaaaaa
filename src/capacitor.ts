import { Capacitor } from "@capacitor/core";

export function isNativeShell(): boolean {
  return Capacitor.isNativePlatform();
}

export function isIosHomeScreenWebApp(): boolean {
  return (
    !isNativeShell() &&
    (window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator &&
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true))
  );
}
