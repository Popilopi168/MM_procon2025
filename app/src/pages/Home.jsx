import { useNavigate } from "react-router-dom";
import redirectTutorial from "../assets/redirect_tutorial.png";
import redirectCamera from "../assets/redirect_camera.png";
import cover from "../assets/cover.png";
import star from "../assets/star.png";

function Home() {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-[#001d70] items-center justify-center h-screen gap-12 bg-gradient-to-b from-[#001d70] to-black">
        <img src={star} className="absolute top-1/2 left-5 -translate-y-1/2 w-[15%]"/>
        <img src={star} className="absolute top-1/2 right-5 -translate-y-1/2 w-[15%]"/>
        <button className="absolute top-5 left-5 hover:opacity-70 transition-opacity duration-300">
            <img src={redirectTutorial} onClick={() => navigate("/onboarding"+ window.location.search)}/>
        </button>
        <button className="absolute top-5 right-5 hover:opacity-70 transition-opacity duration-300">
            <img src={redirectCamera} onClick={() => navigate("/")}/>
        </button>

        <h1 className="text-5xl text-[#EAB633] font-bold mt-12">初音ミク マジカルミライ スベシャル 歌枠</h1>
        <img src={cover} className="w-[65%]"></img>
        <button className="rounded-3xl text-[#FEFFEF] bg-[#EAB633] px-4 py-2 hover:opacity-70 transition-opacity duration-300 z-20" 
            onClick={() => navigate("/loading"+ window.location.search)}
            >
                JOIN →
        </button>
    </div>
   );
}

export default Home;