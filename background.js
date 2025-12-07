const STORAGE_KEYS = ["globalEnabled", "domainControls", "stats", "history", "theme"];
const HISTORY_DAYS_TO_KEEP = 14;

const BASE_RULES = [
  {
    id: 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||doubleclick.net^",
      resourceTypes: ["script", "image", "xmlhttprequest"],
      excludedInitiatorDomains: ["youtube.com", "youtu.be", "m.youtube.com"]
    }
  },
  {
    id: 2,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||googlesyndication.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"],
      excludedInitiatorDomains: ["youtube.com", "youtu.be", "m.youtube.com"]
    }
  },
  {
    id: 3,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||adservice.google.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"],
      excludedInitiatorDomains: ["youtube.com", "youtu.be", "m.youtube.com"]
    }
  },
  {
    id: 4,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||adsafeprotected.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"],
      excludedInitiatorDomains: ["youtube.com", "youtu.be", "m.youtube.com"]
    }
  },
  {
    id: 5,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||taboola.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"],
      excludedInitiatorDomains: ["youtube.com", "youtu.be", "m.youtube.com"]
    }
  },
  {
    id: 6,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||outbrain.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"],
      excludedInitiatorDomains: ["youtube.com", "youtu.be", "m.youtube.com"]
    }
  },
  {
    id: 7,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||criteo.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"],
      excludedInitiatorDomains: ["youtube.com", "youtu.be", "m.youtube.com"]
    }
  },
  {
    id: 8,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||scorecardresearch.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"],
      excludedInitiatorDomains: ["youtube.com", "youtu.be", "m.youtube.com"]
    }
  },
  {
    id: 9,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||ads.google.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"],
      excludedInitiatorDomains: ["youtube.com", "youtu.be", "m.youtube.com"]
    }
  },
  {
    id: 10,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||pagead2.googlesyndication.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"],
      excludedInitiatorDomains: ["youtube.com", "youtu.be", "m.youtube.com"]
    }
  },
  {
    id: 11,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||amazon-adsystem.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"],
      excludedInitiatorDomains: ["youtube.com", "youtu.be", "m.youtube.com"]
    }
  },
  {
    id: 12,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||advertising.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"]
    }
  },
  {
    id: 13,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||adnxs.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"]
    }
  },
  {
    id: 14,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||pubmatic.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"]
    }
  },
  {
    id: 15,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||rubiconproject.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"]
    }
  },
  {
    id: 16,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||openx.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"]
    }
  },
  {
    id: 17,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||bidswitch.net^",
      resourceTypes: ["script", "image", "xmlhttprequest"]
    }
  },
  {
    id: 18,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||smaato.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"]
    }
  },
  {
    id: 19,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||sonobi.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"]
    }
  },
  {
    id: 20,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*adtrack*",
      resourceTypes: ["script", "xmlhttprequest", "image"],
      excludedInitiatorDomains: ["youtube.com", "youtu.be", "m.youtube.com"]
    }
  },
  {
    id: 21,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*://*/ads/*",
      resourceTypes: ["image", "script", "xmlhttprequest"],
      excludedInitiatorDomains: ["youtube.com", "youtu.be", "googlevideo.com"]
    }
  },
  {
    id: 22,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*://*/?*ads*",
      resourceTypes: ["xmlhttprequest", "image", "script"]
    }
  },
  {
    id: 23,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*://*/*ad.js*",
      resourceTypes: ["script"]
    }
  },
  {
    id: 24,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*banner*",
      resourceTypes: ["image", "script", "xmlhttprequest"]
    }
  },
  {
    id: 25,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*tracking*",
      resourceTypes: ["script", "xmlhttprequest"]
    }
  },
  {
    id: 26,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*facebook.com/tr*",
      resourceTypes: ["script", "image", "xmlhttprequest"]
    }
  },
  {
    id: 27,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||analytics.google.com^",
      resourceTypes: ["script", "xmlhttprequest"]
    }
  },
  {
    id: 28,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||connect.facebook.net^",
      resourceTypes: ["script", "image"]
    }
  },
  {
    id: 29,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||platform.twitter.com^",
      resourceTypes: ["script"]
    }
  },
  {
    id: 30,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||cdn.segment.com^",
      resourceTypes: ["script"]
    }
  },
  {
    id: 40,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||malwaredelivery.com^",
      resourceTypes: ["script", "xmlhttprequest", "main_frame", "sub_frame"]
    }
  },
  {
    id: 41,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||ransomwaretracker.com^",
      resourceTypes: ["script", "xmlhttprequest", "main_frame", "sub_frame"]
    }
  },
  {
    id: 42,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*://*/*.exe*",
      resourceTypes: ["main_frame", "sub_frame", "xmlhttprequest"]
    }
  },
  {
    id: 43,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*://*/*.apk*",
      resourceTypes: ["main_frame", "sub_frame", "xmlhttprequest"]
    }
  },
  {
    id: 50,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*popup*",
      resourceTypes: ["sub_frame", "script"]
    }
  },
  {
    id: 51,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*modal*",
      resourceTypes: ["sub_frame", "script"]
    }
  },
  {
    id: 52,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*overlay*",
      resourceTypes: ["sub_frame", "script"]
    }
  },
  {
    id: 53,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||popads.net^",
      resourceTypes: ["script", "sub_frame"]
    }
  },
  {
    id: 54,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||popcash.net^",
      resourceTypes: ["script", "sub_frame"]
    }
  },
  {
    id: 55,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||ypn.com^",
      resourceTypes: ["script", "sub_frame"]
    }
  },
  {
    id: 56,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||juicyads.com^",
      resourceTypes: ["script", "sub_frame"]
    }
  },
  {
    id: 57,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||propeller.ads^",
      resourceTypes: ["script", "sub_frame"]
    }
  },
  {
    id: 58,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||clicksor.com^",
      resourceTypes: ["script", "sub_frame"]
    }
  },
  {
    id: 59,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*exit*",
      resourceTypes: ["sub_frame", "script"]
    }
  },
  {
    id: 60,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||googleadservices.com^",
      resourceTypes: ["script", "sub_frame", "image"]
    }
  },
  {
    id: 61,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||media.net^",
      resourceTypes: ["script", "image", "xmlhttprequest"]
    }
  },
  {
    id: 62,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||contextweb.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"]
    }
  },
  {
    id: 63,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||teads.tv^",
      resourceTypes: ["script", "image", "sub_frame"]
    }
  },
  {
    id: 64,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||vidible.tv^",
      resourceTypes: ["script", "sub_frame"]
    }
  },
  {
    id: 65,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||springserve.com^",
      resourceTypes: ["script", "sub_frame"]
    }
  },
  {
    id: 66,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||adsterra.com^",
      resourceTypes: ["script", "sub_frame", "image"]
    }
  },
  {
    id: 67,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||adtilt.com^",
      resourceTypes: ["script", "sub_frame"]
    }
  },
  {
    id: 68,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*://*/?*popup*",
      resourceTypes: ["sub_frame", "script"]
    }
  },
  {
    id: 69,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*://*/?*modal*",
      resourceTypes: ["sub_frame", "script"]
    }
  },
  {
    id: 70,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*://*/popup/*",
      resourceTypes: ["sub_frame", "script"]
    }
  },
  {
    id: 71,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*://*/modal/*",
      resourceTypes: ["sub_frame", "script"]
    }
  },
  {
    id: 72,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*video*ad*",
      resourceTypes: ["sub_frame", "script", "xmlhttprequest"]
    }
  },
  {
    id: 73,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*player*ad*",
      resourceTypes: ["sub_frame", "script", "xmlhttprequest"]
    }
  },
  {
    id: 74,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||freestar.com^",
      resourceTypes: ["script", "sub_frame", "image"]
    }
  },
  {
    id: 75,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||conversantmedia.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"]
    }
  },
  {
    id: 76,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*install*opera*",
      resourceTypes: ["script", "image", "sub_frame"]
    }
  },
  {
    id: 77,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*install*browser*",
      resourceTypes: ["script", "image", "sub_frame"]
    }
  },
  {
    id: 78,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*get*opera*",
      resourceTypes: ["script", "image", "sub_frame"]
    }
  },
  {
    id: 79,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*download*browser*",
      resourceTypes: ["script", "image", "sub_frame"]
    }
  },
  {
    id: 80,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*promo*browser*",
      resourceTypes: ["script", "image", "sub_frame"]
    }
  },
  {
    id: 81,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||api.opera.com^",
      resourceTypes: ["script", "image", "xmlhttprequest"]
    }
  },
  {
    id: 82,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*notification*ad*",
      resourceTypes: ["script", "image", "sub_frame"]
    }
  },
  {
    id: 83,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*prompt*install*",
      resourceTypes: ["script", "image", "sub_frame"]
    }
  },
  {
    id: 84,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*upgrade*browser*",
      resourceTypes: ["script", "image", "sub_frame"]
    }
  }
];

chrome.runtime.onInstalled.addListener(() => {
  bootstrap();
});

chrome.runtime.onStartup.addListener(() => {
  bootstrap();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || !message.type) {
    return;
  }

  switch (message.type) {
    case "getState":
      handleGetState(message)
        .then(sendResponse)
        .catch(() => sendResponse({ error: true }));
      return true;
    case "toggleGlobal":
      handleToggleGlobal(message.enabled)
        .then(sendResponse)
        .catch(() => sendResponse({ error: true }));
      return true;
    case "toggleDomain":
      handleToggleDomain(message.domain, message.enabled)
        .then(sendResponse)
        .catch(() => sendResponse({ error: true }));
      return true;
    case "setTheme":
      handleSetTheme(message.theme)
        .then(sendResponse)
        .catch(() => sendResponse({ error: true }));
      return true;
    case "refreshStats":
      refreshStats()
        .then(sendResponse)
        .catch(() => sendResponse({ error: true }));
      return true;
    default:
      break;
  }
});

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(async () => {
  await recordBlockedRequest();
});

async function bootstrap() {
  try {
    const state = await ensureDefaults();
    await applyRules(state);
  } catch (error) {
    console.error("Bootstrap error:", error);
  }
}

async function ensureDefaults() {
  const stored = await chrome.storage.local.get(STORAGE_KEYS);
  const todayKey = getDateKey();
  const globalEnabled =
    stored.globalEnabled === undefined ? true : stored.globalEnabled;
  const domainControls = stored.domainControls || {};
  const theme = stored.theme === "light" ? "light" : "dark";
  const normalized = normalizeStatsAndHistory(
    stored.stats,
    stored.history,
    todayKey
  );

  await chrome.storage.local.set({
    globalEnabled,
    domainControls,
    theme,
    stats: normalized.stats,
    history: normalized.history
  });

  return {
    globalEnabled,
    domainControls,
    theme,
    stats: normalized.stats,
    history: normalized.history
  };
}

async function handleGetState(message) {
  const state = await ensureDefaults();
  const domain = extractDomain(message.tabUrl);
  const domainEnabled = isDomainProtected(state, domain);

  return {
    ...state,
    domain,
    domainEnabled
  };
}

async function handleToggleGlobal(enabled) {
  const state = await ensureDefaults();
  const nextState = { ...state, globalEnabled: Boolean(enabled) };

  await chrome.storage.local.set({ globalEnabled: nextState.globalEnabled });
  await applyRules(nextState);
  notifyStateUpdated();

  return { globalEnabled: nextState.globalEnabled };
}

async function handleToggleDomain(domain, enabled) {
  if (!domain) {
    return { error: true };
  }

  const state = await ensureDefaults();
  const domainControls = { ...(state.domainControls || {}) };
  domainControls[domain] = Boolean(enabled);

  await chrome.storage.local.set({ domainControls });
  const nextState = { ...state, domainControls };
  await applyRules(nextState);
  notifyStateUpdated();

  return {
    domainEnabled: isDomainProtected(nextState, domain),
    domainControls
  };
}

async function handleSetTheme(theme) {
  const nextTheme = theme === "light" ? "light" : "dark";
  await chrome.storage.local.set({ theme: nextTheme });
  notifyStateUpdated();
  return { theme: nextTheme };
}

async function refreshStats() {
  const state = await ensureDefaults();
  return { stats: state.stats, history: state.history };
}

async function recordBlockedRequest() {
  const todayKey = getDateKey();
  const stored = await chrome.storage.local.get(["stats", "history"]);
  const normalized = normalizeStatsAndHistory(
    stored.stats,
    stored.history,
    todayKey
  );

  const stats = normalized.stats;
  const history = normalized.history;

  const updatedStats = {
    today: stats.today + 1,
    total: stats.total + 1,
    lastResetDate: todayKey
  };

  const historyEntryIndex = history.findIndex(
    (entry) => entry.date === todayKey
  );
  if (historyEntryIndex >= 0) {
    history[historyEntryIndex].blocked = (history[historyEntryIndex].blocked || 0) + 1;
  } else {
    history.push({ date: todayKey, blocked: 1 });
  }

  const trimmedHistory = pruneHistory(history);

  await chrome.storage.local.set({
    stats: updatedStats,
    history: trimmedHistory
  });

  notifyStateUpdated();
}

async function applyRules(state) {
  const { globalEnabled, domainControls } =
    state || (await ensureDefaults());

  const youtubeExcludedDomains = [
    "youtube.com",
    "youtu.be",
    "m.youtube.com",
    "googlevideo.com",
    "videodelivery.net"
  ];

  const userExcludedDomains = Object.entries(domainControls || {})
    .filter(([, enabled]) => enabled === false)
    .map(([domain]) => domain);

  let removeRuleIds = [];
  try {
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    removeRuleIds = existingRules.map((rule) => rule.id);
  } catch (error) {
    console.warn("Could not get existing rules:", error);
  }

  if (!globalEnabled) {
    if (removeRuleIds.length > 0) {
      try {
        await chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds
        });
      } catch (error) {
        console.error("Failed to remove rules:", error);
      }
    }
    return;
  }

  const rules = BASE_RULES.map((rule) => {
    const isAdRule = [1, 2, 3, 4, 5, 6, 7, 8, 20, 21].includes(rule.id);
    const ruleYoutubeExclusions = isAdRule ? youtubeExcludedDomains : [];
    
    const ruleExcludedDomains = rule.condition.excludedInitiatorDomains || [];
    const mergedExcludedDomains = [...new Set([...ruleExcludedDomains, ...ruleYoutubeExclusions, ...userExcludedDomains])];
    
    const newCondition = { ...rule.condition };
    delete newCondition.excludedDomains;
    
    if (mergedExcludedDomains.length) {
      newCondition.excludedInitiatorDomains = mergedExcludedDomains;
    }
    
    return {
      ...rule,
      condition: newCondition
    };
  });

  try {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds,
      addRules: rules
    });
  } catch (error) {
    console.error("Failed to update declarative net request rules:", error);
    throw error;
  }
}

function isDomainProtected(state, domain) {
  if (!state.globalEnabled) {
    return false;
  }
  if (!domain) {
    return state.globalEnabled;
  }

  const override = state.domainControls?.[domain];
  if (override === false) {
    return false;
  }
  if (override === true) {
    return true;
  }

  return state.globalEnabled;
}

function normalizeStatsAndHistory(stats, history, todayKey) {
  const safeStats = stats || {};
  const safeHistory = Array.isArray(history) ? history.slice() : [];
  let { today = 0, total = 0, lastResetDate } = safeStats;

  today = Number.isFinite(today) ? today : 0;
  total = Number.isFinite(total) ? total : 0;

  if (lastResetDate && lastResetDate !== todayKey) {
    const existingIndex = safeHistory.findIndex(
      (entry) => entry.date === lastResetDate
    );
    if (existingIndex >= 0) {
      safeHistory[existingIndex].blocked = today;
    } else {
      safeHistory.push({ date: lastResetDate, blocked: today });
    }
    today = 0;
  }

  if (!lastResetDate) {
    lastResetDate = todayKey;
  }

  const trimmedHistory = pruneHistory(safeHistory);

  return {
    stats: { today, total, lastResetDate },
    history: trimmedHistory
  };
}

function pruneHistory(history) {
  const sorted = history
    .filter((entry) => entry && entry.date)
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  if (sorted.length <= HISTORY_DAYS_TO_KEEP) {
    return sorted;
  }

  return sorted.slice(sorted.length - HISTORY_DAYS_TO_KEEP);
}

function extractDomain(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch (err) {
    return null;
  }
}

function getDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function notifyStateUpdated() {
  chrome.runtime.sendMessage({ type: "stateUpdated" }, () => {
    // Ignore errors when no listeners are active.
    void chrome.runtime.lastError;
  });
}
