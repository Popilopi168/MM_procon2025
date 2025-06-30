import { useEffect, useContext, useRef } from "react";
import { Player } from "textalive-app-api";
import { PlayerContext } from "../context/PlayerContext";

export default function useTextAlive() {
  const { setPlayer, setReady, setPhrase, setBeat } = useContext(PlayerContext);
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) return;

    const player = new Player({
      app: { token: "djzM9MqQFAfcSiWs" },
      mediaBannerPosition: "bottom right"
    });

    playerRef.current = player;
    setPlayer(player);

    player.addListener({
      onAppReady: () => {
        // pick a song – here we use a fixed mp3 for brevity
        player.createFromSongUrl("https://songle.jp/songs/a7a0a6399/u", 
        {
            video: {
              // 音楽地図訂正履歴
              beatId: 4694275,
              chordId: 2830730,
              repetitiveSegmentId: 2946478,
    
              // 歌詞URL: https://piapro.jp/t/DPXV
              // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FULcJ%2F20250205120202
              lyricId: 67810,
              lyricDiffId: 20654
            }
        });
      },
      onVideoReady: () => {
        console.log("Video and media files ready");
        setReady(true);
      },
      onTimeUpdate: (pos) => {
        const phrase = player.video.findPhrase(pos);
        if (phrase) setPhrase(phrase);
        setBeat(player.findBeat(pos)?.position ?? 0);
      }
    });

    return () => player.dispose();
  }, []);

  return playerRef.current;
}
