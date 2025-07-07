import { BeatLoader } from "react-spinners";
import { BackgroundBeams } from "../components/BackgroundBeams";

export default function FullScreenSpinner({ text }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#001d70] to-[#032250]">
        <BackgroundBeams />
        <div className="flex flex-col items-center gap-4">
        <p className="text-[#EAB633] text-6xl font-bold">{text}</p>
        <BeatLoader color="#EAB633" />       

        <ul className="text-[#FEFFEF] text-sm p-5 font-light bg-white/10 rounded-lg">
          <li>Try these gestures!</li>
          <li>✌️ Peace</li>
          <li>👍 Thumbs Up</li>
          <li>✋ Open Palm</li>
          <li>✊ Fist</li>
        </ul>
        </div>
      </div>
    );
  }
  