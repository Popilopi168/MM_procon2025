import { createContext, useState, useMemo } from "react";

export const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [player, setPlayer]         = useState(null);
  const [isReady, setReady]         = useState(false);
  const [currentPhrase, setPhrase]  = useState(null);
  const [beat, setBeat]             = useState(0);
  const [isSinging, setIsSinging] = useState(false);
  
  const value = useMemo(
    () => ({ player, isReady, currentPhrase, beat, isSinging,
             setPlayer, setReady, setPhrase, setBeat, setIsSinging }),
    [player, isReady, currentPhrase, beat, isSinging]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}
