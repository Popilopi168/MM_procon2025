import { useState, useEffect } from "react";

export default function useChatMessages(phrase) {
  const [msgs, setMsgs] = useState([]);

  // add new lyric whenever phrase changes
  useEffect(() => {
    if (!phrase) return;
    setMsgs((prev) => [...prev, { id: crypto.randomUUID(), text: phrase.text }]);
  }, [phrase]);

  // remove items that scrolled out (helper run by ChatContainer)
  const purge = (id) => setMsgs((prev) => prev.filter((m) => m.id !== id));

  return [msgs, purge];
}
