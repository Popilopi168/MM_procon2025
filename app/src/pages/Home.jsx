import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

  return <div>
    <h1>初音ミク マジカルミライ スベシャル 歌枠</h1>
    <button className="rounded-3xl text-[#FEFFEF] border border-[#EAB633] px-4 py-2" onClick={() => navigate("/loading")}>
JOIN →
    </button>
    </div>;
}

export default Home;