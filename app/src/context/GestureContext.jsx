import { createContext, useState, useMemo } from "react";

export const GestureContext = createContext(null);

export function GestureProvider({ children }) {
  const [isModelReady, setModelReady] = useState(false);
  const [currentGesture, setGesture]  = useState(null);
  const [isHandDetected, setIsHandDetected] = useState(false);

  const value = useMemo(
    () => ({ isModelReady, currentGesture, setModelReady, setGesture, setIsHandDetected, isHandDetected }),
    [ isModelReady, currentGesture ]
  );

  return <GestureContext.Provider value={value}>{children}</GestureContext.Provider>;
}
