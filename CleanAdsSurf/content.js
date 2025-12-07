(async () => {
  try {
    const response = await chrome.runtime.sendMessage({
      type: "getState",
      tabUrl: window.location.href
    });

    if (response && response.domainEnabled === false) {
      console.info("CleanAdsSurf: protection disabled on this domain.");
      return;
    }

    if (!response || !response.globalEnabled) {
      return;
    }

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.transferSize === 0 && entry.decodedBodySize === 0 && entry.name) {
          const url = entry.name;
          const isAd = /doubleclick|googlesyndication|adservice|adsafeprotected|taboola|outbrain|criteo|adnxs|pubmatic|amazon-adsystem/.test(url);
          if (isAd) {
            chrome.runtime.sendMessage({ type: "recordBlocked" }).catch(() => {});
          }
        }
      }
    });

    observer.observe({ entryTypes: ["resource"] });
  } catch (error) {
    console.warn("CleanAdsSurf content script error:", error);
  }
})();