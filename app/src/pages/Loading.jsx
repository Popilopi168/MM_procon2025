// Updated Loading.jsx to remove GestureContext
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import FullScreenSpinner from "../components/FullScreenSpinner";

export default function Loading() {
  const { isReady } = useContext(PlayerContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isReady) {
      navigate("/stream" + window.location.search);
    }
  }, [isReady, navigate]);

  return <FullScreenSpinner text="Loading music & lyrics…" />;
}