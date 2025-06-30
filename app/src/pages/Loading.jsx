import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import usePreloadPlayer from "../utils/preloader";
import FullScreenSpinner from "../components/FullScreenSpinner";

export default function Loading() {
  usePreloadPlayer();                         // kick off SDK + hook
  const { isReady } = useContext(PlayerContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isReady) {
      navigate("/stream" + window.location.search);
    }
  }, [isReady]);

  return <>
  <FullScreenSpinner text="Loading music & lyrics…" />
  </>;
}
