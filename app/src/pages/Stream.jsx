// Simplified Stream.jsx
import { useContext, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { GestureContext } from "../context/GestureContext";
import GestureIndicator from "../components/GestureIndicator";
import useGestureUtils from "../utils/gestureUtils";

import ChatContainer from "../components/Chat/ChatContainer";
import SuperChat from "../components/Chat/SuperChat";

export default function Stream() {
    const { player, currentPhrase, isReady } = useContext(PlayerContext);
    const { currentGesture, isModelReady } = useContext(GestureContext);
    const [superMsg, setSuper] = useState(null);
    const [started, setStarted] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const inp = useRef(null);
    const location = useLocation();

    // Check if user has camera access
    const hasAccess = new URLSearchParams(location.search).get("hasAccess") === "true";
    
    // Initialize gesture detection (hook must always be called)
    const { videoRef, canvasRef } = useGestureUtils(hasAccess);

    const clickToStart = async () => {
        if (!isReady || !player || isInitializing || !isModelReady) {
            console.warn("Not ready to play");
            return;
        }

        setIsInitializing(true);

        try {
            await player.requestPlay();
            setStarted(true);
            console.log("Playback started");
        } catch (error) {
            console.error("Play failed:", error);
            // Simple retry
            setTimeout(async () => {
                try {
                    await player.requestPlay();
                    setStarted(true);
                } catch (e) {
                    console.error("Retry failed:", e);
                }
            }, 1000);
        } finally {
            setIsInitializing(false);
        }
    };

    const send = () => {
        const val = inp.current.value.trim();
        if (!val) return;
        setSuper(val);
        inp.current.value = "";
    };

    if (!isReady) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading TextAlive...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex">
            {/* Hidden video and canvas for gesture detection */}
            <video
                ref={videoRef}
                style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '1px', height: '1px' }}
                autoPlay
                playsInline
                muted
            />
            <canvas
                ref={canvasRef}
                style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '1px', height: '1px' }}
            />
            
            {/* Gesture action indicator */}
            <GestureIndicator 
                gesture={currentGesture}
            />

            {/* Gesture control overlay */}
            {currentGesture && started && hasAccess && (
                <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-lg z-40">
                    <h3 className="text-lg font-bold mb-2">Gesture Controls:</h3>
                    <ul className="space-y-1 text-sm">
                        <li>✌️ Peace - Send super chat</li>
                        <li>👍 Thumbs up - Volume up</li>
                        <li>✊ Fist - Play/Pause</li>
                        <li>✋ Open palm - Show this menu</li>
                    </ul>
                </div>
            )}

            {!started && (
                <button
                    onClick={clickToStart}
                    className="absolute inset-0 flex flex-col items-center justify-center
                               bg-black/60 text-white z-10 cursor-pointer"
                    disabled={isInitializing}
                >
                    <div className="text-4xl mb-4">
                        {isInitializing ? "⏳" : "▶"}
                    </div>
                    <div className="text-2xl">
                        {isInitializing ? "Starting..." : "Tap to start"}
                    </div>
                </button>
            )}

            <section className="flex-grow relative bg-black/10">
                {started && currentPhrase && (
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 
                                    text-white text-3xl bg-black/50 px-8 py-4 rounded-lg
                                    max-w-4xl text-center">
                        {currentPhrase.text}
                    </div>
                )}
            </section>

            <aside className="w-96 flex flex-col bg-gradient-to-b from-[#001d70] to-[#032250]">
                <SuperChat superMsg={superMsg} />
                <div className="flex-grow overflow-hidden">
                    <ChatContainer phrase={currentPhrase} />
                </div>

                <div className="bg-[#FEFFEF] p-4 flex gap-2">
                    <input 
                        ref={inp} 
                        className="flex-grow border-2 border-[#004098] p-2 rounded-3xl"
                        placeholder="Send a superchat..."
                        onKeyPress={(e) => e.key === 'Enter' && send()}
                    />
                    <button 
                        onClick={send}
                        className="px-4 py-2 bg-[#004098] text-white rounded-3xl hover:bg-[#003080] transition-colors"
                    >
                        Send
                    </button>
                </div>
            </aside>
        </div>
    );
}