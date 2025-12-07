const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bindEvents();
  loadState();
});

function cacheElements() {
  els.globalToggle = document.getElementById("global-toggle");
  els.refresh = document.getElementById("refresh");
  els.themeToggle = document.getElementById("theme-toggle");
  els.today = document.getElementById("today-count");
  els.total = document.getElementById("total-count");
  els.historyBars = document.getElementById("history-bars");
  els.historyList = document.getElementById("history-list");
  els.domains = document.getElementById("domains");
  els.statusDot = document.getElementById("status-dot");
  els.statusText = document.getElementById("status-text");
  els.speedVpnLink = document.querySelector('.nav-link');
}

function bindEvents() {
  els.refresh.addEventListener("click", loadState);
  
  if (els.speedVpnLink) {
    els.speedVpnLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = chrome.runtime.getURL("dashboard/speed.html");
    });
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

  els.globalToggle.addEventListener("change", async (event) => {
    const enabled = event.target.checked;
    els.globalToggle.disabled = true;
    try {
      await chrome.runtime.sendMessage({ type: "toggleGlobal", enabled });
      await loadState();
    } catch (error) {
      setStatus("offline", "Unable to update global protection");
    } finally {
      els.globalToggle.disabled = false;
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
    const state = await chrome.runtime.sendMessage({ type: "getState" });
    if (!state || state.error) {
      setStatus("offline", "Unable to sync with service worker");
      return;
    }
    updateUI(state);
  } catch (error) {
    setStatus("offline", "Unable to load state");
  }
}

function updateUI(state) {
  const { globalEnabled, stats, history, domainControls, theme } = state;
  els.globalToggle.checked = Boolean(globalEnabled);
  els.globalToggle.disabled = false;

  const todayCount = stats?.today ?? 0;
  const totalCount = stats?.total ?? 0;
  els.today.textContent = todayCount;
  els.total.textContent = totalCount;

  setStatus(globalEnabled ? "online" : "paused", deriveStatusText(state));

  renderHistory(history || [], todayCount);
  renderDomains(domainControls || {});
  applyTheme(theme);
}

function deriveStatusText(state) {
  if (!state?.globalEnabled) {
    return "Protection paused globally.";
  }
  return "Shield is active across your browsing.";
}

function setStatus(mode, text) {
  els.statusDot.classList.remove("online", "paused", "offline");
  els.statusDot.classList.add(mode || "offline");
  els.statusText.textContent = text;
}

function renderHistory(history, todayCount) {
  const todayKey = formatDateKey(new Date());
  const mergedHistory = mergeHistoryWithToday(history, todayKey, todayCount);

  renderHistoryBars(mergedHistory, todayKey);
  renderHistoryList(mergedHistory, todayKey);
}

function mergeHistoryWithToday(history, todayKey, todayCount) {
  const map = new Map();
  (history || []).forEach((entry) => {
    if (entry?.date) {
      map.set(entry.date, entry.blocked || 0);
    }
  });

  // Prefer recorded history for today; use live count if not yet persisted.
  if (!map.has(todayKey)) {
    map.set(todayKey, todayCount || 0);
  }

  return Array.from(map.entries())
    .map(([date, blocked]) => ({ date, blocked }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));
}

function renderHistoryBars(history, todayKey) {
  const dates = [];
  const now = new Date();
  for (let i = 13; i >= 0; i -= 1) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    dates.push(formatDateKey(date));
  }

  const map = new Map(history.map((entry) => [entry.date, entry.blocked || 0]));
  const series = dates.map((dateKey) => ({
    label: formatShortDay(dateKey),
    value: map.get(dateKey) || 0,
    active: dateKey === todayKey
  }));

  drawBars(els.historyBars, series);
}

function renderHistoryList(history, todayKey) {
  els.historyList.innerHTML = "";
  const entries = history
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 14);

  entries.forEach((entry) => {
    const row = document.createElement("div");
    row.className = "history-row";

    const date = document.createElement("div");
    date.className = "date";
    date.textContent =
      entry.date === todayKey
        ? "Today"
        : new Date(`${entry.date}T00:00:00`).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric"
          });

    const count = document.createElement("div");
    count.className = "count";
    count.textContent = entry.blocked || 0;

    row.appendChild(date);
    row.appendChild(count);
    els.historyList.appendChild(row);
  });
}

function drawBars(container, series) {
  container.innerHTML = "";
  const max = Math.max(...series.map((item) => item.value), 1);

  series.forEach((item) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${Math.max(6, (item.value / max) * 100)}%`;
    if (item.active) {
      bar.style.boxShadow = "0 0 14px rgba(31, 197, 165, 0.4)";
    }

    const value = document.createElement("div");
    value.className = "value";
    value.textContent = item.value;

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = item.label;

    bar.appendChild(value);
    bar.appendChild(label);
    container.appendChild(bar);
  });
}

function renderDomains(domainControls) {
  els.domains.innerHTML = "";
  const entries = Object.entries(domainControls || {});
  if (!entries.length) {
    const empty = document.createElement("div");
    empty.className = "note";
    empty.textContent =
      "No domain overrides yet. Use the popup to toggle protection per site.";
    els.domains.appendChild(empty);
    return;
  }

  entries
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .forEach(([domain, enabled]) => {
      const row = document.createElement("div");
      row.className = "domain-row";

      const name = document.createElement("div");
      name.className = "domain-name";
      name.textContent = domain;

      const chip = document.createElement("div");
      chip.className = `chip ${enabled === false ? "off" : ""}`;
      chip.textContent = enabled === false ? "Bypassed" : "Protected";

      row.appendChild(name);
      row.appendChild(chip);
      els.domains.appendChild(row);
    });
}

function applyTheme(theme) {
  const mode = theme === "light" ? "light" : "dark";
  document.body.dataset.theme = mode;
  els.themeToggle.textContent = mode === "light" ? "L" : "D";
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatShortDay(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);
  return date.toLocaleDateString(undefined, { weekday: "short" });
}
