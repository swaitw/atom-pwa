import { useTestSettings } from "#src/hooks/useTestSettings";
import { useCallback } from "react";

export function usePeriodicTableTestSettings() {
  return useTestSettings(
    "periodicTable",
    "ptTest",
    useCallback(() => true, []),
  );
}
