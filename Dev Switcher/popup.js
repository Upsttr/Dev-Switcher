document.getElementById('createCookieBtn').addEventListener('click', function() {
  const selectedValue = document.getElementById('cookieSelect').value;
  chrome.runtime.sendMessage({ action: "setCookie", value: selectedValue }, function() {
    saveSelectedValue(selectedValue); 
    updateStatus(); 
  });
});

document.getElementById('deleteCookieBtn').addEventListener('click', function() {
  chrome.runtime.sendMessage({ action: "removeCookie" }, updateStatus);
});

document.getElementById('createPwEnabledCookieBtn').addEventListener('click', function() {
  chrome.runtime.sendMessage({ action: "setPwEnabledCookie" }, updateStatus);
});

function saveSelectedValue(value) {
  chrome.storage.local.set({ selectedDev: value });
}

function restoreSelectedValue() {
  chrome.storage.local.get('selectedDev', function(result) {
    const selectedValue = result.selectedDev || 'dev-1'; // Значение по умолчанию
    document.getElementById('cookieSelect').value = selectedValue;
  });
}

function updateStatus() {
  const devUrl = "https://dev17.mostbet.com";
  const prodUrl = "https://mostbet.com";

  chrome.cookies.get({ url: devUrl, name: "PW_DEV" }, function(cookie) {
    const devStatusElement = document.getElementById('devStatus');
    if (cookie) {
      devStatusElement.textContent = `Текущий dev - ${cookie.value}`;
    } else {
      devStatusElement.textContent = "Текущий dev - Не установлен";
    }
  });

  chrome.cookies.get({ url: prodUrl, name: "pw_enabled" }, function(cookie) {
    const prodStatusElement = document.getElementById('prodStatus');
    if (cookie) {
      prodStatusElement.textContent = "pw_enabled - ON";
      prodStatusElement.classList.add('on');
      prodStatusElement.classList.remove('off');
    } else {
      prodStatusElement.textContent = "pw_enabled - OFF";
      prodStatusElement.classList.add('off');
      prodStatusElement.classList.remove('on');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  restoreSelectedValue(); 
  updateStatus(); 
});
