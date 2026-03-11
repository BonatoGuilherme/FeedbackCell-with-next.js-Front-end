import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./components/lib/react-query";
import * as Sentry from "@sentry/react";
import App from "./App";
import "./index.css";
import { bootstrapUniqueCodeCapture } from "./components/lib/unique-code";

bootstrapUniqueCodeCapture();

Sentry.init({
  dsn: "https://6ff2555f703f00274e614fafaa78567b@o4510561451245568.ingest.us.sentry.io/4510561458257920",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
