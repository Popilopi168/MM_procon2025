import './output.css';
import { useNavigate } from "react-router-dom";
import logo from "./assets/camera_icon.png";

function App() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center text-center justify-center bg-[#fefef0] text-[#070203]">
      <img src={logo} className="p-8" alt="logo"/>
      <p >
      このウェブサイトでは、リアルタイムの手のジェスチャーによる操作を実現するために、カメラへのアクセスが必要です。 私たちはユーザーのプライバシーを尊重しており、カメラへのアクセスは一時的にブラウザ内でのみ行われます。映像は記録・保存・サーバーへの送信はされず、すべてのジェスチャー認識はお使いの端末上でローカルに処理されます。
      </p>
      <p className="font-inter text-[32px] tracking-normal">
      To enable real-time hand gesture interaction on this website, this website requires the access of your camera. We respect your privacy  and access your device's camera temporarily within your browser only. Your video is not recorded, stored, or sent to any server — all gesture recognition happens locally on your device.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/loading")}
          className="bg-black text-white px-6 py-2 rounded"
        >
          GO
        </button>
        <button
          onClick={() => navigate("/loading")}
          className="bg-white text-black border border-black px-6 py-2 rounded"
        >
          GO without camera
        </button>
      </div>
    </div>
  );
}

export default App;
