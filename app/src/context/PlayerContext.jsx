import { createContext, useState, useMemo } from "react";

export const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [player, setPlayer]         = useState(null);
  const [isReady, setReady]         = useState(false);
  const [currentPhrase, setPhrase]  = useState(null);
  const [beat, setBeat]             = useState(0);

  const value = useMemo(
    () => ({ player, isReady, currentPhrase, beat,
             setPlayer, setReady, setPhrase, setBeat }),
    [player, isReady, currentPhrase, beat]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}
