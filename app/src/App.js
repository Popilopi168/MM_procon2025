import './App.css';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#fefef0] text-[#070203] px-6">
      <p className="mb-4 text-center">
        To enable real-time hand gesture interaction on this website...
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/loading")}
          className="bg-[#3B3C50] text-white px-6 py-2 rounded"
        >
          GO
        </button>
        <button
          onClick={() => navigate("/loading")}
          className="bg-white text-[#3B3C50] border border-[#3B3C50] px-6 py-2 rounded"
        >
          GO without camera
        </button>
      </div>
    </div>
  );
}

export default App;
