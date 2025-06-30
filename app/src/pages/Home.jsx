import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

  return <div className="flex flex-col items-center justify-center h-screen gap-12">
    <h1 className="text-4xl font-bold">初音ミク マジカルミライ スベシャル 歌枠</h1>
    <button className="rounded-3xl text-[#FEFFEF] border border-[#EAB633] px-4 py-2" onClick={() => navigate("/loading"+ window.location.search)}>
        JOIN →
    </button>
    </div>;
}

export default Home;