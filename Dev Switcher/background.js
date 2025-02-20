chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const devUrl = "https://dev17.mostbet.com";
  const prodUrl = "https://mostbet.com";
  const secondDomainUrl = "https://ntcdl0i.com"; 

  if (request.action === "setCookie") {
    chrome.cookies.set({
      url: devUrl,
      name: "PW_DEV",
      value: request.value
    }, function(cookie) {
      console.log("Кука PW_DEV установлена на dev:", cookie);
    });
  } else if (request.action === "removeCookie") {
    chrome.cookies.remove({ url: devUrl, name: "PW_DEV" }, function(details) {
      console.log("Кука PW_DEV удалена:", details);
    });
  } else if (request.action === "setPwEnabledCookie") {

    chrome.cookies.get({ url: prodUrl, name: "pw_enabled" }, function(cookie) {
      if (!cookie) {
        chrome.cookies.set({
          url: prodUrl,
          name: "pw_enabled",
          value: "1"
        }, function(cookie) {
          console.log("Кука pw_enabled установлена на mostbet.com:", cookie);
        });
      }
    });

    chrome.cookies.get({ url: secondDomainUrl, name: "pw_enabled" }, function(cookie) {
      if (!cookie) {
        chrome.cookies.set({
          url: secondDomainUrl,
          name: "pw_enabled",
          value: "1"
        }, function(cookie) {
          console.log("Кука pw_enabled установлена на ntcdl0i.com:", cookie);
        });
      }
    });
  }
});
