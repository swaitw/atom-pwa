import NativeBridge from "@/NativeBridge";
import { useFlagStore } from "./flags";

export function loadHybridSafeInsets() {
  const flags = useFlagStore.getState();

  if (!flags.isHybrid) {
    return;
  }

  if (!flags.isAndroid) {
    return;
  }

  const insetJson = NativeBridge.getSafeInset();
  if (!insetJson) {
    return;
  }

  const values = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  try {
    const inset = JSON.parse(insetJson);
    Object.assign(values, inset);

    // Apply pixel ratio
    values.top /= window.devicePixelRatio;
    values.bottom /= window.devicePixelRatio;
    values.left /= window.devicePixelRatio;
    values.right /= window.devicePixelRatio;
  } catch {
    // noop
  }

  const root = document.documentElement;

  root.style.setProperty("--safe-area-inset-top", `${values.top}px`);
  root.style.setProperty("--safe-area-inset-right", `${values.right}px`);
  root.style.setProperty("--safe-area-inset-bottom", `${values.bottom}px`);
  root.style.setProperty("--safe-area-inset-left", `${values.left}px`);
}
