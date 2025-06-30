import { BeatLoader } from "react-spinners";

export default function FullScreenSpinner({ text }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="flex flex-col items-center gap-4">
          <BeatLoader />
          <p className="text-white">{text}</p>
        </div>
      </div>
    );
  }
  