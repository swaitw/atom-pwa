import { useEffect, useState } from "react";
import { create } from "zustand";

interface ShouldAnimateStore {
  animations: Record<string, boolean>;
  markAsAnimated: (key: string) => void;
}

const useShouldAnimateStore = create<ShouldAnimateStore>((update) => ({
  animations: {},

  markAsAnimated: (key: string) => {
    update((state) => ({
      animations: {
        ...state.animations,
        [key]: true,
      },
    }));
  },
}));

export function useShouldAnimate(key: string) {
  const hasBeenAnimated = useShouldAnimateStore(
    (state) => state.animations[key] || false,
  );
  const markAsAnimated = useShouldAnimateStore((state) => state.markAsAnimated);

  useEffect(() => {
    markAsAnimated(key);
  }, [key, markAsAnimated]);

  const [shouldAnimate] = useState(!hasBeenAnimated);
  return shouldAnimate;
}
