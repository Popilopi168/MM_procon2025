// components/GestureDisplay.jsx
import { useEffect, useState } from 'react';

const gestureInfo = {
  peace: { emoji: '✌️', name: 'Peace' },
  thumbsUp: { emoji: '👍', name: 'Thumbs Up' },
  openPalm: { emoji: '✋', name: 'Open Palm' },
  fist: { emoji: '✊', name: 'Fist' }
};

export default function GestureDisplay({ gesture }) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayGesture, setDisplayGesture] = useState(null);

  useEffect(() => {
    if (gesture && gestureInfo[gesture]) {
      setDisplayGesture(gesture);
      setIsVisible(true);

      // Hide after animation
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [gesture]);

  if (!isVisible || !displayGesture || !gestureInfo[displayGesture]) return null;

  const info = gestureInfo[displayGesture];

  return (
    <div className={`
      fixed top-20 left-1/2 transform -translate-x-1/2
      bg-black/90 text-white px-8 py-6 rounded-2xl shadow-2xl
      transition-all duration-500 z-50
      ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
    `}>
      <div className="flex items-center gap-4">
        <span className="text-5xl animate-bounce">{info.emoji}</span>
        <div>
          <p className="text-lg font-bold">Gesture Detected</p>
          <p className="text-2xl">{info.name}</p>
        </div>
      </div>
    </div>
  );
}