import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import chat from "../assets/chat_tutorial_icon.png";
import sc from "../assets/sc_tutorial_icon.png";
import next from "../assets/next_icon.png";
import prev from "../assets/previous_icon.png";
import gesture from "../assets/gesture_tutorial_icon.png";

function Onboarding() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const hasAccess = queryParams.get("hasAccess") === "true";
  const [currentPage, setCurrentPage] = useState(0);

  function handleNext() {
    setCurrentPage(currentPage + 1);
  }

  function handlePrev() {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div>
        <div className="absolute top-6 right-6">
            <button 
                className="rounded-3xl text-[#FEFFEF] border border-[#FEFFEF] px-4 py-2 hover:opacity-70 transition-opacity duration-300"
                onClick={() => navigate(`/home?hasAccess=${hasAccess}`)}
            >
                SKIP →
            </button>
        </div>
        { currentPage == 0 && 
            <div className="h-screen flex flex-row items-center justify-center bg-[#EAB633] gap-12 ">
                <img className="w-[83px] p-2" />
                <div className="flex flex-col items-center text-center font-inter gap-4">
                    {/* Chat tutorial */}
                    <div className="flex flex-col p-2 max-w-4xl text-[#070203] gap-3">
                        <p>「ミクの歌配信風ストリーム」は、他の配信ルームと同じようにチャットやスーパーチャットを送ることができる、ライブ配信風のプラットフォームです。</p>
                        <p>"Miku's Singing Stream" is a livestream-like platform where you can send chats and super chats just like in any other livestream room.</p>
                    </div>
                    <div className="flex flex-row gap-6 p-4">
                        <img src={chat} className="object-fill" />
                        <img src={sc} className="object-fill" />
                    </div>
                    <div className="flex flex-col p-2 max-w-4xl text-[#FEFFEF] gap-3">
                        <p>* すべての機能は無料です。配信の雰囲気を楽しんでもらうための仕掛けなので、料金が発生することは一切ありません。</p>
                        <p>* All the feature are free. We just use the idea of streaming. We are not going to charge you for anything </p>
                    </div>
            
                </div>
                {hasAccess ? 
                    <button onClick={handleNext}>
                        <img src={next} className="w-[83px] p-2" />
                    </button> : <img className="w-[83px] p-2" />
                 } 
            </div>
        }
        { currentPage == 1 && 
            <div className="h-screen flex flex-row items-center justify-center bg-[#EAB633] gap-12">
                <button onClick={handlePrev}>
                    <img src={prev} className="w-[83px] p-2" />
                </button>
                <div className="flex flex-col items-center text-center font-inter gap-4">
                    {/* Chat tutorial */}
                    <div className="flex flex-col p-2 max-w-4xl text-[#070203] gap-3">
                        <p>ちなみに、このサイトは昔ながらのライブ配信以上のものです。特別な機能をご用意しました。</p>
                        <p>Meanwhile, this site is more than a classical livestream. We prepare a special feature for you.</p>
                    </div>
                    <div className="flex flex-row gap-6 p-8 max-w-5xl">
                        <img src={gesture} className="" />
                    </div>           
                </div>
                <img className="w-[83px] p-2" />
            </div>    
        }
        {hasAccess && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1">
                {/* Left Bar */}
                <div className={`w-24 h-2 rounded-full transition-opacity duration-300 ${currentPage === 0 ? "bg-[#FEFFEF] opacity-100" : "bg-[#FEFFEF] opacity-40"}`} />
                
                {/* Right Bar */}
                <div className={`w-24 h-2 rounded-full transition-opacity duration-300 ${currentPage === 1 ? "bg-[#FEFFEF] opacity-100" : "bg-[#FEFFEF] opacity-40"}`} />
            </div>
        )}
    </div>
  );
}

export default Onboarding;
