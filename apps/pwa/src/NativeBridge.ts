type BridgeType = NonNullable<typeof window.AtomNative>;

type PlatformMethods = {
  [key in keyof BridgeType]-?: NonNullable<BridgeType[key]>;
};

const platformMethods: PlatformMethods = {
  getDebugMode: () => import.meta.env.DEV,
  isHybrid: () => false,
  getSystemLanguage: () => window.navigator.language,
  rateApp: (openMarket = false) => {
    if (openMarket && /android/i.test(navigator.userAgent)) {
      window.open("market://details?id=tk.horusgoul.valenciasquimicas");
    }
  },
};

type AtomNative = NonNullable<typeof window.AtomNative>;

class NativeBridge {
  private cache = new Map<string, unknown>();

  constructor() {
    window.__DEBUG__ = this.getDebugMode();
  }

  public isHybrid() {
    return this.execCached("isHybrid", [], []);
  }

  public getDebugMode() {
    return this.execCached("getDebugMode", [], []);
  }

  public getSystemLanguage() {
    return this.execCached("getSystemLanguage", [], []);
  }

  public rateApp(openMarket = false) {
    return this.exec("rateApp", [], [openMarket]);
  }

  public supportsNativeMethod(_methodName: keyof AtomNative) {
    return !!window.AtomNative?.[_methodName];
  }

  private exec<T extends keyof AtomNative>(
    methodName: T,
    nativeArgs: Parameters<NonNullable<AtomNative[T]>>,
    fallbackArgs: Parameters<NonNullable<PlatformMethods[T]>>,
  ): ReturnType<NonNullable<AtomNative[T]>> {
    const nativeMethod = window.AtomNative?.[methodName];

    if (nativeMethod) {
      this.debug(`Calling native method ${methodName} with args:`, nativeArgs);
    } else {
      this.debug(
        `Calling fallback method ${methodName} with args:`,
        fallbackArgs,
      );
    }

    return (
      nativeMethod
        ? nativeMethod.bind(window.AtomNative)(...nativeArgs)
        : platformMethods[methodName](...fallbackArgs)
    ) as ReturnType<NonNullable<AtomNative[T]>>;
  }

  private execCached<T extends keyof AtomNative>(
    methodName: T,
    nativeArgs: Parameters<NonNullable<AtomNative[T]>>,
    fallbackArgs: Parameters<NonNullable<PlatformMethods[T]>>,
  ): ReturnType<NonNullable<AtomNative[T]>> {
    const cacheKey = `${methodName}(${nativeArgs.join(",")},${fallbackArgs.join(
      ",",
    )})`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as ReturnType<NonNullable<AtomNative[T]>>;
    }

    const result = this.exec(methodName, nativeArgs, fallbackArgs);

    this.cache.set(cacheKey, result);

    return result;
  }

  private debug(...args: unknown[]) {
    if (window.__DEBUG__) {
      console.log("[NativeBridge]", ...args);
    }
  }
}

export default new NativeBridge();
