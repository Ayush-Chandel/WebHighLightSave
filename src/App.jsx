// src/popup/App.jsx
import { useEffect, useState } from "react";

function App() {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(['highlights'], (result) => {
      setHighlights(result.highlights || []);
    });
  }, []);

  const deleteHighlight = (index) => {
    const updated = highlights.filter((_, i) => i !== index);
    setHighlights(updated);
    chrome.storage.local.set({ highlights: updated });
  };

  return (
    <div className="p-4 w-80 h-96 overflow-y-auto bg-white">
      <h1 className="text-xl font-bold mb-4">Saved Highlights</h1>
      {highlights.length === 0 ? (
        <p>No highlights yet.</p>
      ) : (
        highlights.map((h, i) => (
          <div key={i} className="mb-4 p-2 border rounded shadow mt-4">
            <p className="text-sm">{h.text}</p>
            <a href={h.url} target="_blank" rel="noreferrer" className="text-blue-500 text-xs">
              Visit Page
            </a>
            <p className="block mt-2  text-xs">{h.createdAt}</p>
            <button onClick={() => deleteHighlight(i)} className="block mt-2 text-red-500 text-xs">
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
