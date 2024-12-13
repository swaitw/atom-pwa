interface Window {
  AtomNative?: {
    isHybrid?: () => boolean;
    getDebugMode?: () => boolean;
    getSystemLanguage?: () => string | undefined;
    rateApp?: (openMarket?: boolean) => void;
  };
  __DEBUG__?: boolean;
}
