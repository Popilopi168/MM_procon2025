// components/GestureIndicator.jsx
import { useEffect, useState } from 'react';

export default function GestureIndicator({ gesture }) {
  const [show, setShow] = useState(false);
  
  const gestureInfo = {
    peace: { emoji: '✌️', text: '盛り上げます!', color: 'bg-yellow-500' },
    thumbsUp: { emoji: '👍', text: 'いいね!', color: 'bg-green-500' },
    fist: { emoji: '✊', text: 'すごい', color: 'bg-blue-500' },
    openPalm: { emoji: '✋', text: 'wave', color: 'bg-purple-500' }
  };

  useEffect(() => {
    if (gesture && gesture !== 'none') {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [gesture]);

  if (!show || !gesture || gesture === 'none') return null;

  const info = gestureInfo[gesture];
  if (!info) return null;

  return (
    <div className={`
      fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      ${info.color} text-white px-8 py-4 rounded-lg shadow-2xl
      transition-all duration-300 scale-100 opacity-100
      flex items-center gap-4 z-50
    `}>
      <span className="text-4xl animate-bounce">{info.emoji}</span>
      <span className="text-xl font-bold">{info.text}</span>
    </div>
  );
}