chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("chat.openai.com/c/")) {
    const queryParameters = tab.url.split("/c/")[1];

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      chatId: queryParameters,
    });
    // const queryParameters = tab.url.split("?")[1];
    // const urlParameters = new URLSearchParams(queryParameters);

    // chrome.tabs.sendMessage(tabId, {
    //   type: "NEW",
    //   videoId: urlParameters.get("v"),
    // });
  }
});
