// pages/Stream.jsx
import { useContext, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import useGestureDetection from "../hooks/useGestureDetection";
import GestureDisplay from "../components/GestureDisplay";

import ChatContainer from "../components/Chat/ChatContainer";
import SuperChat from "../components/Chat/SuperChat";

import miku from "../assets/miku.png";
import miku_openmouse from "../assets/miku_openmouse.png";
import miku_closemouse from "../assets/miku_closemouse.png";
import right_arm from "../assets/right_arm.png";
import wave from "../assets/wave.png";
import peace from "../assets/peace.png";
import Five from "../components/Five";
import exit from "../assets/exit_icon.png";
import { BackgroundBeams } from "../components/BackgroundBeams";

export default function Stream() {
    const { player, currentPhrase, isReady, isSinging } = useContext(PlayerContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [superMsg, setSuper] = useState(null);
    const [started, setStarted] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const inp = useRef(null);

    // Check if user has camera access
    const hasAccess = new URLSearchParams(location.search).get("hasAccess") === "true";

    // Initialize gesture detection (auto-starts if camera access is granted and stream started)
    const { 
        videoRef, 
        currentGesture,
        isLoading: isGestureLoading,
        error: gestureError
    } = useGestureDetection(hasAccess && started, 2000); // Check every 2 seconds

    const clickToStart = async () => {
        if (!isReady || !player || isInitializing) {
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
        <div className="h-screen flex relative bg-gradient-to-b from-black to-[#001d70]">
            <BackgroundBeams />
            <button className="absolute w-[50px] h-[50px] top-5 left-5 z-20">
                <img src={exit} onClick={() => navigate("/home"+ window.location.search)}/>
            </button>
            {/* Hidden video element for camera feed */}
            {hasAccess && (
                <video 
                    ref={videoRef} 
                    style={{ display: 'none' }}
                    autoPlay
                    playsInline
                    muted
                />
            )}

            {/* Gesture status indicator */}
            {hasAccess && started && (
                <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full text-sm z-40 ${
                    gestureError ? 'bg-red-500/80' : 
                    isGestureLoading ? 'bg-yellow-500/80' : 'bg-green-500/80'
                } text-white`}>
                    <div className={`w-2 h-2 rounded-full ${
                        isGestureLoading ? 'bg-white animate-pulse' : 'bg-white'
                    }`} />
                    {gestureError ? 'Camera error' :
                     isGestureLoading ? 'Initializing...' : 'Gesture detection active'}
                </div>
            )}

            {/* Error display */}
            {gestureError && hasAccess && (
                <div className="absolute top-16 right-4 bg-red-500/90 text-white p-3 rounded-lg text-sm max-w-xs z-40">
                    <p className="font-bold">Error:</p>
                    <p>{gestureError}</p>
                </div>
            )}

            {/* Gesture display */}
            <GestureDisplay gesture={currentGesture} />

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
                    {hasAccess && (
                        <div className="text-sm text-gray-300 mt-4">
                            Gesture detection will start automatically
                        </div>
                    )}
                </button>
            )}

            {/* miku stream */}
            <section className="flex-grow relative">
            <img src={miku} alt="miku" className="p-8 absolute top-10 left-5 w-full h-full object-cover animate-breathing" />
            <img src={isSinging ? miku_openmouse : miku_closemouse} alt="miku" className="p-8 absolute top-10 left-5 w-full h-full object-cover" />               
            <img src={currentGesture==="openPalm" ? wave : currentGesture==="peace" ? peace : right_arm} alt="miku" className="p-8 absolute top-10 left-5 w-full h-full object-cover" />               
                <Five />
                {started && currentPhrase && (
                    <div className="speech-bubble absolute top-20 left-20 
                                    text-white text-xl bg-[#001d70] px-8 py-4 rounded-lg
                                    max-w-[200px] text-center">
                        {currentPhrase.text}
                    </div>
                )}
            </section>

            <div className="flex flex-row p-8 z-20">
                <div className="w-96 flex flex-col bg-gradient-to-b from-[#001d70] to-[#032250] rounded-lg">
                    <SuperChat superMsg={superMsg} />
                    <div className="flex-grow overflow-hidden">
                        <ChatContainer phrase={currentPhrase} />
                    </div>

                    <div className="bg-[#FEFFEF] p-4 flex gap-2 rounded-b-lg">
                        <input 
                            ref={inp} 
                            className="flex-grow border-2 border-[#004098] p-2 rounded-3xl"
                            placeholder="Type a message..."
                            onKeyPress={(e) => e.key === 'Enter' && send()}
                        />
                        <button 
                            onClick={send}
                            className="px-4 py-2 bg-[#004098] text-white rounded-3xl hover:bg-[#003080] transition-colors"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}