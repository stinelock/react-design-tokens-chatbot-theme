import React from 'react';
import { createRoot } from 'react-dom/client';
import posthog from 'posthog-js';
import App from './App.jsx';
import TokenTypesSlide from './TokenTypesSlide.jsx';
import TokenChainSlide from './TokenChainSlide.jsx';
import './tokens.css';
import './styles.css';

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST;

if (posthogKey && posthogHost) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    defaults: '2026-05-30',
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
    logs: {
      serviceName: 'design-tokens-chatbot',
      environment: import.meta.env.MODE,
    },
  });
} else if (import.meta.env.DEV) {
  const missingVariable = posthogKey ? 'VITE_POSTHOG_HOST' : 'VITE_POSTHOG_KEY';
  throw new Error(`${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`);
}

const slide = new URLSearchParams(window.location.search).get('slide');
const page = slide === '6' ? <TokenTypesSlide /> : slide === '7' ? <TokenChainSlide /> : <App />;
createRoot(document.getElementById('root')).render(page);
