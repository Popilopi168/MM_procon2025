// New TextAliveProvider component to handle initialization
import { useEffect, useRef } from "react";
import { Player } from "textalive-app-api";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

export default function TextAliveProvider({ children }) {
  const { setPlayer, setReady, setPhrase, setBeat } = useContext(PlayerContext);
  const playerRef = useRef(null);
  const mediaElementRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!mediaElementRef.current || initialized.current) return;
    initialized.current = true;

    console.log("Initializing TextAlive player...");

    const player = new Player({
      app: { 
        token: "djzM9MqQFAfcSiWs"
      },
      mediaElement: mediaElementRef.current,
      mediaBannerPosition: "bottom left"
    });

    playerRef.current = player;
    setPlayer(player);

    // Set up mutation observer to detect when audio element is added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === "AUDIO") {
            console.log("Audio element detected!");
            setTimeout(() => setReady(true), 500);
          }
        });
      });
    });

    observer.observe(mediaElementRef.current, {
      childList: true,
      subtree: true
    });

    player.addListener({
      onAppReady: () => {
        console.log("TextAlive app ready");
        
        player.createFromSongUrl("https://piapro.jp/t/ULcJ/20250205120202", {
          video: {
            beatId: 4694275,
            chordId: 2830730,
            repetitiveSegmentId: 2946478,
            lyricId: 67810,
            lyricDiffId: 20654
          }
        })
        .then(() => console.log("Song loaded"))
        .catch(err => console.error("Failed to load song:", err));
      },
      
      onVideoReady: (video) => {
        console.log("Video ready, duration:", video.duration);
      },
      
      onTimeUpdate: (position) => {
        if (!player.video) return;
        const phrase = player.video.findPhrase(position);
        if (phrase) setPhrase(phrase);
        const beat = player.findBeat(position);
        setBeat(beat?.position ?? 0);
      },
      
      onPlay: () => console.log("Playing"),
      onPause: () => console.log("Paused"),
      onError: (err) => console.error("TextAlive error:", err)
    });

    return () => {
      observer.disconnect();
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [setPlayer, setReady, setPhrase, setBeat]);

  return (
    <>
      {/* Hidden container for TextAlive's media element */}
      <div 
        ref={mediaElementRef} 
        style={{ position: 'fixed', top: '0px', left: '0px' }}
      />
      {children}
    </>
  );
}