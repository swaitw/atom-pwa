import { BRANCH, COMMIT_HASH } from "#src/constants";
import * as SentrySDK from "@sentry/react";
import { useEffect } from "react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

export function initSentry() {
  if (import.meta.env.DEV) {
    return;
  }

  SentrySDK.init({
    dsn: "https://8c979cf560094d8aac2aa531d72a8a62@o524893.ingest.sentry.io/5638124",
    tunnel: "/api/sentry",
    integrations: [
      SentrySDK.browserTracingIntegration(),
      SentrySDK.reactRouterV6BrowserTracingIntegration({
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
    ],
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
    release: `${COMMIT_HASH}`,
    environment: `${BRANCH}`,
  });
}
