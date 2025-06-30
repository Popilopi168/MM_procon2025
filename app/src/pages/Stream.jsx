import { useContext, useState, useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";

import ChatContainer from "../components/Chat/ChatContainer";
import SuperChat from "../components/Chat/SuperChat";

// import useHandGesture from "../hooks/useHandGesture";

export default function Stream() {
    const { player, currentPhrase, isReady } = useContext(PlayerContext);
    const [superMsg, setSuper] = useState(null);
    const [started, setStarted] = useState(false);
    const inp = useRef(null);

    const clickToStart = () => {
        if (!isReady) return;                   // wait for onVideoReady
        if (!player?.mediaElement) {            // still null? abort
          console.warn("mediaElement not attached yet");
          return;
        }
        player.requestPlay()
              .then(() => setStarted(true))
              .catch(console.error);
      };
      
  
    const send = () => {
      const val = inp.current.value.trim();
      if (!val) return;
      setSuper(val);
      inp.current.value = "";
    };

  // your gesture hook (only if hasAccess=true)
  const hasAccess = new URLSearchParams(window.location.search).get("hasAccess")==="true";
//   const videoRef = hasAccess ? useHandGesture(handleGesture) : null;


return (
    <div className="h-screen flex">
      {isReady && !started && (
      <button
        onClick={clickToStart}
        className="absolute inset-0 flex items-center justify-center
                   bg-black/60 text-white text-2xl">
        ▶ Tap to start
      </button>)}

      {/* video / Miku area */}
      <section className="flex-grow relative bg-black/10">
        {/* <video … /> */}
        
      </section>

      {/* chat column */}
      <aside className="w-96 flex flex-col bg-gradient-to-b from-[#001d70] to-[#032250]">
      <SuperChat superMsg={superMsg} />
        <div className="flex-grow overflow-hidden">
          <ChatContainer phrase={currentPhrase} />
        </div>

        <div className="bg-white p-4 flex gap-2">
          <input ref={inp} className="flex-grow border p-2 rounded" />
          <button onClick={send}
                  className="px-4 py-2 bg-[#004098] text-white rounded">
            Send
          </button>
        </div>
      </aside>
    </div>
  );
}
 