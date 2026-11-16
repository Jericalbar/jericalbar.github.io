/* =========================================================
   PORTFOLIO VISITOR & RESUME TRACKER (analytics.js)
   ========================================================= */
(function () {
  const ANALYTICS_CONFIG = {
    // 1. Ilagay ang Google Analytics 4 Measurement ID mo (hal. "G-ABC123XYZ")
    ga4Id: "G-XXXXXXXXXX",

    // 2. O ilagay ang GoatCounter subdomain mo (hal. "jericalbar")
    goatCounterSubdomain: ""
  };

  const hasGA4 =
    ANALYTICS_CONFIG.ga4Id &&
    ANALYTICS_CONFIG.ga4Id !== "G-XXXXXXXXXX";

  const hasGoatCounter =
    ANALYTICS_CONFIG.goatCounterSubdomain &&
    ANALYTICS_CONFIG.goatCounterSubdomain.trim() !== "";

  if (hasGA4) {
    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.ga4Id}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", ANALYTICS_CONFIG.ga4Id);
  }

  if (hasGoatCounter) {
    const sub = ANALYTICS_CONFIG.goatCounterSubdomain.trim();
    const gcScript = document.createElement("script");
    gcScript.async = true;
    gcScript.setAttribute("data-goatcounter", `https://${sub}.goatcounter.com/count`);
    gcScript.src = "https://gc.zgo.at/count.js";
    document.head.appendChild(gcScript);
  }

  function trackEvent(eventName, label) {
    if (hasGA4 && typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        event_category: "Portfolio Engagement",
        event_label: label
      });
    }

    if (
      hasGoatCounter &&
      window.goatcounter &&
      typeof window.goatcounter.count === "function"
    ) {
      window.goatcounter.count({
        path: `event-${eventName}`,
        title: label,
        event: true
      });
    }
  }

  function initEventTracking() {
    document.querySelectorAll('a[href*="CV.pdf"]').forEach((link) => {
      link.addEventListener("click", () => {
        trackEvent("resume_download", "Jeric Albar CV.pdf");
      });
    });

    const openBtn = document.getElementById("openPortfolioBtn");
    if (openBtn) {
      openBtn.addEventListener("click", () => {
        trackEvent("open_portfolio", "Entered Main Portfolio");
      });
    }

    document.querySelectorAll(".project-card-link").forEach((card) => {
      card.addEventListener("click", () => {
        const title = card.querySelector("h3")?.textContent?.trim() || card.getAttribute("href");
        trackEvent("project_click", title);
      });
    });

    document.querySelectorAll('a[href^="mailto:"], a[href*="github.com"]').forEach((link) => {
      link.addEventListener("click", () => {
        trackEvent("contact_link_click", link.getAttribute("href"));
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initEventTracking);
  } else {
    initEventTracking();
  }
})();
