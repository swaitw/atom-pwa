interface Window {
  AtomNative?: {
    isHybrid?: () => boolean;
    getDebugMode?: () => boolean;
    getSystemLanguage?: () => string | undefined;
    rateApp?: (openMarket?: boolean) => void;
  };
  __DEBUG__?: boolean;
}

declare module "*.po" {
  export const messages: Record<string, string>;
}
