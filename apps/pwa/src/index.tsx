import "./NativeBridge";

import * as ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "hammerjs";

import { initSentry } from "@/services/sentry";
import { loadFlags } from "@/services/flags";
import App from "./components/App";
import invariant from "invariant";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { messages as enMessages } from "#locale/en/messages.po";

if (import.meta.env.DEV) {
  import("./index.css");
}

loadFlags();
initSentry();

const rootElement = document.getElementById("root");

invariant(rootElement, "Root element not found");

i18n.load("en", enMessages);
i18n.activate("en");

ReactDOM.createRoot(rootElement).render(
  <I18nProvider i18n={i18n}>
    <BrowserRouter basename="/" future={{ v7_startTransition: true }}>
      <App />
    </BrowserRouter>
  </I18nProvider>,
);

let preview = false;

window.addEventListener("message", (event) => {
  const data = event.data;

  if (data === "enable-preview") {
    preview = true;
  }
});

window.addEventListener("click", () => {
  if (preview) {
    window.parent.postMessage("click", "*");
  }
});
