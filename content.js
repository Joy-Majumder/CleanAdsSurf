(async () => {
  try {
    const response = await chrome.runtime.sendMessage({
      type: "getState",
      tabUrl: window.location.href
    });

    if (response && response.domainEnabled === false) {
      console.info("CleanAdsSurf: protection disabled on this domain.");
    }
  } catch (error) {
  }
})();