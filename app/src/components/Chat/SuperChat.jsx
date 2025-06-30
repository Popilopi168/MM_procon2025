import { useEffect, useState } from "react";
import lyricIcon from "../../assets/lyric_icon.png";

export default function SuperChat({ superMsg }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!superMsg) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 5000);  // hide after 5 s
    return () => clearTimeout(t);
  }, [superMsg]);

  if (!visible) return null;

  return (
    <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-2xl animate-pulse flex flex-row gap-2">
        <img src={lyricIcon} alt="avatar" className="w-5 h-5 rounded-full" />
      {superMsg}
    </div>
  );
}
