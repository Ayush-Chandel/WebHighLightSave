//It is the content script
let popupButton;

document.addEventListener('mouseup', (e) => {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();
  
  if (selectedText.length > 0) {
    if (!popupButton) {
      popupButton = document.createElement('button');
      popupButton.innerText = "Save Highlight?";
      popupButton.style.position = 'absolute';
      popupButton.style.zIndex = 10000;
      popupButton.style.background = 'grey';
      popupButton.style.border = '1px solid black';
      popupButton.style.padding = '5px';
      popupButton.style.cursor = 'pointer';
      popupButton.style.fontSize = '14px';
      popupButton.style.borderRadius = '5px';
      document.body.appendChild(popupButton);

      popupButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({
          type: 'SAVE_HIGHLIGHT',
          payload: {
            text: selectedText,
            url: window.location.href
          }
        });
        popupButton.remove();
        popupButton = null;
        selection.removeAllRanges();
      });
    }

    popupButton.style.top = `${e.pageY + 10}px`;
    popupButton.style.left = `${e.pageX + 10}px`;
  } else if (popupButton) {
    popupButton.remove();
    popupButton = null;
  }
});

