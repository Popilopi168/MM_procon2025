import { useNavigate } from "react-router-dom";
import redirectTutorial from "../assets/redirect_tutorial.png";
import redirectCamera from "../assets/redirect_camera.png";

function Home() {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-[#001d70] items-center justify-center h-screen gap-12">
        <button className="absolute top-5 left-5">
            <img src={redirectTutorial} onClick={() => navigate("/onboarding"+ window.location.search)}/>
        </button>
        <button className="absolute top-5 right-5">
            <img src={redirectCamera} onClick={() => navigate("/")}/>
        </button>

        <h1 className="text-4xl text-[#EAB633] font-bold">初音ミク マジカルミライ スベシャル 歌枠</h1>
        <button className="rounded-3xl text-[#FEFFEF] bg-[#EAB633] px-4 py-2" onClick={() => navigate("/loading"+ window.location.search)}>
            JOIN →
        </button>
    </div>
   );
}

export default Home;