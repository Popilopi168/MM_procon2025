// hooks/useGestureDetection.js
import { useEffect, useRef, useState } from 'react';

export default function useGestureDetection(isEnabled = true, checkInterval = 2000) {
  const videoRef = useRef(null);
  const [currentGesture, setCurrentGesture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const handsRef = useRef(null);
  const cameraRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isEnabled) {
      setIsLoading(false);
      return;
    }

    let mounted = true;

    const initializeGestureDetection = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Wait for MediaPipe to be available
        let attempts = 0;
        while ((!window.Hands || !window.Camera) && attempts < 10) {
          await new Promise(resolve => setTimeout(resolve, 500));
          attempts++;
        }

        if (!window.Hands || !window.Camera) {
          throw new Error('MediaPipe failed to load. Please check your internet connection.');
        }

        const video = videoRef.current;
        if (!video || !mounted) return;

        // Initialize MediaPipe Hands
        const hands = new window.Hands({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          }
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 0, // Simplest model for performance
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.5
        });

        let lastDetectionTime = 0;

        hands.onResults((results) => {
          if (!mounted) return;

          const now = Date.now();
          // Only process results every checkInterval milliseconds
          if (now - lastDetectionTime < checkInterval) return;
          lastDetectionTime = now;

          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const landmarks = results.multiHandLandmarks[0];
            const gesture = detectGesture(landmarks);
            
            if (gesture !== 'none') {
              console.log('Gesture detected:', gesture);
              setCurrentGesture(gesture);
              
              // Clear gesture after 3 seconds
              setTimeout(() => {
                if (mounted) {
                  setCurrentGesture(null);
                }
              }, 3000);
            }
          }
        });

        handsRef.current = hands;

        // Initialize camera
        const camera = new window.Camera(video, {
          onFrame: async () => {
            if (mounted && hands && video.readyState >= 2) {
              await hands.send({ image: video });
            }
          },
          width: 320,
          height: 240
        });

        cameraRef.current = camera;
        await camera.start();
        
        if (mounted) {
          setIsLoading(false);
          console.log('Gesture detection initialized');
        }
      } catch (err) {
        console.error('Gesture detection error:', err);
        if (mounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    initializeGestureDetection();

    return () => {
      mounted = false;
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      if (cameraRef.current) {
        cameraRef.current.stop();
        cameraRef.current = null;
      }
      
      if (handsRef.current) {
        handsRef.current.close();
        handsRef.current = null;
      }
    };
  }, [isEnabled, checkInterval]);

  // Gesture detection logic
  const detectGesture = (landmarks) => {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    const indexBase = landmarks[5];
    const middleBase = landmarks[9];
    const ringBase = landmarks[13];
    const pinkyBase = landmarks[17];
    const palmBase = landmarks[0];

    // Peace sign (✌️)
    const indexUp = indexTip.y < indexBase.y - 0.1;
    const middleUp = middleTip.y < middleBase.y - 0.1;
    const ringDown = ringTip.y > ringBase.y - 0.05;
    const pinkyDown = pinkyTip.y > pinkyBase.y - 0.05;

    if (indexUp && middleUp && ringDown && pinkyDown) {
      return 'peace';
    }

    // Thumbs up (👍)
    const thumbUp = thumbTip.y < palmBase.y - 0.1;
    const allFingersDown = 
      indexTip.y > indexBase.y &&
      middleTip.y > middleBase.y &&
      ringTip.y > ringBase.y &&
      pinkyTip.y > pinkyBase.y;

    if (thumbUp && allFingersDown) {
      return 'thumbsUp';
    }

    // Open palm (✋)
    const allFingersUp = 
      indexTip.y < indexBase.y - 0.05 &&
      middleTip.y < middleBase.y - 0.05 &&
      ringTip.y < ringBase.y - 0.05 &&
      pinkyTip.y < pinkyBase.y - 0.05;

    if (allFingersUp) {
      return 'openPalm';
    }

    // Fist (✊)
    const allFingersDownForFist = 
      indexTip.y > indexBase.y &&
      middleTip.y > middleBase.y &&
      ringTip.y > ringBase.y &&
      pinkyTip.y > pinkyBase.y &&
      Math.abs(thumbTip.x - indexBase.x) < 0.1;

    if (allFingersDownForFist) {
      return 'fist';
    }

    return 'none';
  };

  return {
    videoRef,
    currentGesture,
    isLoading,
    error
  };
}