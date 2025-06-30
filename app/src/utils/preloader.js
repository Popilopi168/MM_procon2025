// utils/preloader.js
import useTextAlive from "../hooks/useTextAlive";

export default function usePreloadPlayer() {
  // merely calling the hook starts the player boot sequence
  useTextAlive();
}
