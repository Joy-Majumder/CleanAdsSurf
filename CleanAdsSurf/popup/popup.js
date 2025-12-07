const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bindEvents();
  loadState();
});

function cacheElements() {
  els.globalToggle = document.getElementById("global-toggle");
  els.domainToggle = document.getElementById("domain-toggle");
  els.domainName = document.getElementById("domain-name");
  els.domainStatus = document.getElementById("domain-status");
  els.todayCount = document.getElementById("today-count");
  els.totalCount = document.getElementById("total-count");
  els.refreshButton = document.getElementById("refresh-button");
  els.statusDot = document.getElementById("status-dot");
  els.statusText = document.getElementById("status-text");
  els.themeToggle = document.getElementById("theme-toggle");
  els.pulseToday = document.getElementById("pulse-today");
  els.pulseTotal = document.getElementById("pulse-total");
  els.pulseIntensity = document.getElementById("pulse-intensity");
  els.pulseMode = document.getElementById("pulse-mode");
  els.pulseVisual = document.getElementById("pulse-visual");
  els.speedVpnBtn = document.querySelector('.btn-primary');
  els.dashboardBtn = document.querySelector('.btn-secondary');
}

function bindEvents() {
  els.globalToggle.addEventListener("change", async (event) => {
    const enabled = event.target.checked;
    disableToggles(true);
    try {
      await chrome.runtime.sendMessage({ type: "toggleGlobal", enabled });
      await loadState();
    } catch (error) {
      setStatus("offline", "Unable to update global protection");
    } finally {
      disableToggles(false);
    }
  });

  els.domainToggle.addEventListener("change", async (event) => {
    const enabled = event.target.checked;
    const domain = els.domainName.dataset.domain || "";
    disableToggles(true);
    try {
      await chrome.runtime.sendMessage({
        type: "toggleDomain",
        domain,
        enabled
      });
      await loadState();
    } catch (error) {
      setStatus("offline", "Unable to update domain control");
    } finally {
      disableToggles(false);
    }
  });

  els.refreshButton.addEventListener("click", loadState);
  
  if (els.speedVpnBtn) {
    els.speedVpnBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      chrome.tabs.create({ url: chrome.runtime.getURL("dashboard/speed.html") });
    });
  } else {
    console.warn("Speed VPN button not found");
  }
  
  if (els.dashboardBtn) {
    els.dashboardBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      chrome.tabs.create({ url: chrome.runtime.getURL("dashboard/dashboard.html") });
    });
  } else {
    console.warn("Dashboard button not found");
  }
  
  els.themeToggle.addEventListener("click", async () => {
    const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
    try {
      await chrome.runtime.sendMessage({ type: "setTheme", theme: nextTheme });
      applyTheme(nextTheme);
    } catch (error) {
      setStatus("offline", "Unable to update theme");
    }
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message && message.type === "stateUpdated") {
      loadState();
    }
  });
}

async function loadState() {
  try {
    const tab = await getActiveTab();
    const response = await chrome.runtime.sendMessage({
      type: "getState",
      tabUrl: tab?.url
    });

    if (!response || response.error) {
      setStatus("offline", "Unable to sync with service worker");
      return;
    }

    updateUI(response);
  } catch (error) {
    setStatus("offline", "Unable to load state");
  }
}

function updateUI(state) {
  const { globalEnabled, domainEnabled, domain, stats, theme } = state;

  els.globalToggle.checked = Boolean(globalEnabled);
  els.globalToggle.disabled = false;

  els.domainName.textContent = domain || "Unavailable";
  els.domainName.dataset.domain = domain || "";

  els.domainToggle.checked = Boolean(domainEnabled);
  els.domainToggle.disabled = !domain || !globalEnabled;

  els.domainStatus.textContent = buildDomainStatus(globalEnabled, domainEnabled);
  els.todayCount.textContent = stats?.today ?? 0;
  els.totalCount.textContent = stats?.total ?? 0;

  setStatus(globalEnabled ? "online" : "paused", deriveStatusText(state));
  renderPulse(stats || {}, globalEnabled);
  applyTheme(theme);
}

function buildDomainStatus(globalEnabled, domainEnabled) {
  if (!globalEnabled) {
    return "Global protection is paused.";
  }
  return domainEnabled
    ? "Protection active on this domain."
    : "Protection disabled for this domain.";
}

function deriveStatusText(state) {
  if (!state.globalEnabled) {
    return "Protection paused everywhere.";
  }
  if (!state.domainEnabled) {
    return "Bypassed on this domain.";
  }
  return "Shield ready and blocking.";
}

function disableToggles(disabled) {
  els.globalToggle.disabled = disabled;
  els.domainToggle.disabled = disabled || !els.domainName.dataset.domain;
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

function setStatus(mode, text) {
  els.statusDot.classList.remove("online", "paused", "offline");
  els.statusDot.classList.add(mode || "offline");
  els.statusText.textContent = text;
}

function applyTheme(theme) {
  const mode = theme === "light" ? "light" : "dark";
  document.body.dataset.theme = mode;
  els.themeToggle.textContent = mode === "light" ? "L" : "D";
}

function renderPulse(stats, globalEnabled) {
  const today = Number(stats.today) || 0;
  const total = Number(stats.total) || 0;
  const intensityScore = Math.min(100, Math.round(Math.log10(today + 1) * 35));
  const mode = !globalEnabled
    ? "Shield paused"
    : intensityScore > 70
    ? "High vigilance"
    : intensityScore > 35
    ? "Active guard"
    : "Shield steady";

  els.pulseToday.textContent = today;
  els.pulseTotal.textContent = total;
  els.pulseIntensity.textContent = `${intensityScore}%`;
  els.pulseMode.textContent = mode;

  const scale = 0.9 + Math.min(0.5, intensityScore / 140);
  els.pulseVisual.style.setProperty("--pulse-scale", scale.toFixed(2));
}
