// components/GestureDisplay.jsx
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import like from "../assets/like.png";
import light from "../assets/light_stick.png";

const gestureInfo = {
  peace:    { emoji: '✌️', name: 'Peace', image: like },
  thumbsUp: { emoji: '👍', name: 'Thumbs Up', image: like },
  openPalm: { emoji: '✋', name: 'Open Palm', image: like },
  fist:     { emoji: '✊', name: 'Fist', image: light }
};

export default function GestureDisplay({ gesture }) {
  // Controls the central pop-up
  const [isVisible, setIsVisible] = useState(false);
  const [displayGesture, setDisplayGesture] = useState(null);

  // Array of falling emoji tokens
  const [falling, setFalling] = useState([]);

  // Whenever a valid gesture arrives...
  useEffect(() => {
    if (!gesture || !gestureInfo[gesture]) return;

    const info = gestureInfo[gesture];

    // 1) Show the pop-up
    setDisplayGesture(gesture);
    setIsVisible(true);
    const popupTimer = setTimeout(() => setIsVisible(false), 2500);

    // 2) Spawn ~15 falling emojis
    const newEmojis = Array.from({ length: 15 }).map((_, i) => ({
      id: `${gesture}-${Date.now()}-${i}`,
      emoji: info.emoji,
      image: info.image,
      // random horizontal position [% of viewport]
      x: Math.random() * 100,
      // random delay before this one starts falling (0–1s)
      delay: Math.random(),
      // random duration of fall (2–4s)
      duration: 2 + Math.random() * 2
    }));
    setFalling((prev) => [...prev, ...newEmojis]);

    return () => {
      clearTimeout(popupTimer);
    };
  }, [gesture]);

  // Remove each emoji once its fall animation is done
  const handleFallComplete = (id) => {
    setFalling((prev) => prev.filter((e) => e.id !== id));
  };

  if (!displayGesture || !gestureInfo[displayGesture]) {
    return null;
  }
  const info = gestureInfo[displayGesture];

  return (
    <>
      {/* Central pop-up */}
      {isVisible && (
        <div className={`
          fixed top-20 left-1/2 transform -translate-x-1/2
          bg-black/90 text-white px-8 py-6 rounded-2xl shadow-2xl
          transition-transform transition-opacity duration-500 z-50
          ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}>
          <div className="flex items-center gap-4">
            <span className="text-3xl animate-bounce">{info.emoji}</span>
            <div>
              <p className="text-md font-bold">Gesture Detected</p>
              <p className="text-sm">{info.name} ~</p>
            </div>
          </div>
        </div>
      )}

      {/* Falling images */}
      {(displayGesture=="fist" || displayGesture=="thumbsUp") && falling.map(({ id, image, x, delay, duration }) => (
        <motion.div
          key={id}
          initial={{ y: -50, opacity: 1 }}
          animate={{ y: '110vh', opacity: 0 }}
          transition={{ delay, duration, ease: 'linear' }}
          onAnimationComplete={() => handleFallComplete(id)}
          style={{
            position: 'fixed',
            top: 0,
            left: `${x}vw`,
            pointerEvents: 'none',
            zIndex: 45
          }}
        >
          <img src={image} alt="" className="w-8 h-8" />
        </motion.div>
      ))}
    </>
  );
}
