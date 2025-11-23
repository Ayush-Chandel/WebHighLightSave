
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'SAVE_HIGHLIGHT') {
      chrome.storage.local.get(['highlights'], (result) => {
        const highlights = result.highlights || [];
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });
        highlights.push({
          text: message.payload.text,
          url: message.payload.url,
          createdAt: formattedDate
        });
        chrome.storage.local.set({ highlights });
      });
    }
  });
  