import "./input.css";
import { useNavigate } from "react-router-dom";
import logo from "./assets/camera_icon.png";

function App() {
  const navigate = useNavigate();

  const requestCameraAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      return true;
    } catch (error) {
      console.error("Camera access denied or failed:", error);
      return false;
    }
  };
  

  return (
    <div className="h-screen flex flex-col items-center text-center justify-center bg-[#fefef0] text-[#070203] font-inter">
      <img src={logo} className="p-16" alt="logo" />
      <p className="p-2 max-w-5xl">
        このウェブサイトでは、リアルタイムの手のジェスチャーによる操作を実現するために、カメラへのアクセスが必要です。
        私たちはユーザーのプライバシーを尊重しており、カメラへのアクセスは一時的にブラウザ内でのみ行われます。映像は記録・保存・サーバーへの送信はされず、すべてのジェスチャー認識はお使いの端末上でローカルに処理されます。
      </p>
      <p className="p-2 max-w-5xl">
        To enable real-time hand gesture interaction on this website, this
        website requires the access of your camera. We respect your privacy and
        access your device's camera temporarily within your browser only. Your
        video is not recorded, stored, or sent to any server — all gesture
        recognition happens locally on your device.
      </p>
      <div className="flex gap-6 p-16">
        <button
          onClick={ async () => {
            const hasAccess = await requestCameraAccess();
            if (hasAccess) {
              navigate("/onboarding?hasAccess=true");
            } else {
              navigate("/onboarding?hasAccess=false");
            }
          }}
          className="text-white rounded-3xl px-6 py-2 bg-[#3B3C50]"
        >
          GO →
        </button>
        <button
          onClick={() => navigate("/onboarding?hasAccess=false")}
          className="rounded-3xl text-[#3B3C50] border border-[#3B3C50] px-6"
        >
          GO without camera →
        </button>
      </div>
    </div>
  );
}

export default App;
