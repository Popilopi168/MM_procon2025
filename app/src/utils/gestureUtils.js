import { useEffect, useRef, useContext } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import hand_landmarker_task from "../model/hand_landmarker.task";
import { GestureContext } from "../context/GestureContext";
import detectGesture from "./detectGesture";

const useGestureUtils = (hasAccess = true) => {
  console.log("useGestureUtils hook called, hasAccess:", hasAccess);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { setModelReady, setGesture, setIsHandDetected } =
    useContext(GestureContext);

  useEffect(() => {
    let handLandmarker;
    let animationFrameId;

    const initializeHandDetection = async () => {
      try {
        console.log("Initializing hand detection...");
        console.log("Loading MediaPipe vision...");
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        console.log("Vision loaded");
        console.log("Creating hand landmarker...");
        handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: hand_landmarker_task },
          numHands: 2,
          runningMode: "video",
        });
        setModelReady(true);
        console.log("Model ready");
        detectHands();
      } catch (error) {
        console.error("Error initializing hand detection:", error);
        console.error("Error details:", error.message);
        console.error("Error stack:", error.stack);
      }
    };

    const drawLandmarks = (landmarksArray) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      landmarksArray.forEach((landmarks) => {
        landmarks.forEach((landmark) => {
          const x = landmark.x * canvas.width;
          const y = landmark.y * canvas.height;

          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI); // Draw a circle for each landmark
          ctx.fill();
        });
      });
    };

    const detectHands = () => {
      if (
        videoRef.current &&
        videoRef.current.readyState >= 2 &&
        handLandmarker
      ) {
        const detections = handLandmarker.detectForVideo(
          videoRef.current,
          performance.now()
        );
        const isHandPresent = detections.handednesses.length > 0;
        setIsHandDetected(isHandPresent);

        // Assuming detections.landmarks is an array of landmark objects
        if (detections.landmarks && detections.landmarks.length > 0) {
          drawLandmarks(detections.landmarks);

          // Gesture detection logic
          const detectedGesture = detectGesture(detections.landmarks);
          if (detectedGesture) {
            setGesture(detectedGesture);
          } else {
            setGesture(null);
          }
        } else {
          setGesture(null);
        }
      }
      animationFrameId = requestAnimationFrame(detectHands);
    };

    const startWebcam = async () => {
      console.log("Starting webcam...");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        console.log("Webcam stream obtained");
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await initializeHandDetection();
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    if (hasAccess) {
      startWebcam();
    } else {
      console.log("Skipping webcam initialization - no camera access");
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
      if (handLandmarker) {
        handLandmarker.close();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [setModelReady, setGesture, setIsHandDetected, hasAccess]);

  return { videoRef, canvasRef };
};

export default useGestureUtils;
