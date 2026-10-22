declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters?: Record<string, string | number | boolean>,
    ) => void;
  }
}

export function trackContactClick(method: "whatsapp" | "email" | "phone") {
  if (typeof window === "undefined") return;

  window.gtag?.("event", `${method}_click`, {
    contact_method: method,
    page_path: window.location.pathname,
  });
}

export function trackLeadGenerated() {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "generate_lead", {
    currency: "INR",
    page_path: window.location.pathname,
  });
}

export function trackFormStart() {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "form_start", {
    page_path: window.location.pathname,
  });
}
