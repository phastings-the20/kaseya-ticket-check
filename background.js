// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'notification') {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'images/icon48.png',
        title: 'Kaseya Ticket Alert',
        message: message.message
      });
    }
  });
  