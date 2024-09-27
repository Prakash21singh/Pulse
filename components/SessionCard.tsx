"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { IconWindowMaximize } from "@tabler/icons-react";
import { SessionCardProp } from "@/types";

const SessionCard = ({
  id,
  topic,
  description,
  initialTime,
  remainingTime: initialRemainingTime,
  isPaused,
  status,
}: SessionCardProp) => {
  const [remainingTime, setRemainingTime] = useState(
    initialRemainingTime ?? initialTime
  );
  const [isActive, setIsActive] = useState(!isPaused);
  const [isPiPActive, setIsPiPActive] = useState(false);
  const initialProgress = initialRemainingTime
    ? initialRemainingTime
    : initialTime;
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Reference for the canvas element
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60 / 1000);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          setProgress(((initialTime - newTime) / initialTime) * 100);
          return newTime;
        });
      }, 1000);
    }

    // Pause timer when it reaches 0
    if (remainingTime === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, remainingTime]);

  useEffect(() => {
    setIsActive(!isPaused);
  }, [isPaused]);

  const resetTimer = () => {
    setRemainingTime(initialTime);
    setProgress(0);
    setIsActive(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const scale = window.devicePixelRatio; // Get the device pixel ratio
        const width = 170;
        const height = 170;

        canvas.width = width * scale; // Set the scaled width
        canvas.height = height * scale; // Set the scaled height
        ctx.scale(scale, scale); // Scale the context

        const progress = remainingTime / initialTime;
        const radius = width / 2 - 25;
        const centerX = width / 2;
        const centerY = height / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 6;
        ctx.stroke();

        // Draw progress circle
        ctx.beginPath();
        ctx.arc(
          centerX,
          centerY,
          radius,
          -Math.PI / 2,
          -Math.PI / 2 + 2 * Math.PI * progress,
          false
        );
        ctx.strokeStyle = "#7776B3";
        ctx.lineWidth = 6;
        ctx.stroke();

        // Draw the remaining time in the center
        ctx.fillStyle = "#E5D9F2";
        ctx.font = "bold 28px Poppins";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(formatTime(remainingTime), centerX, centerY);
      }
    }
  }, [remainingTime]);

  const enterPiPMode = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      try {
        // If video is already in PiP, exit PiP first
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        }

        // Capture canvas stream
        const videoStream = canvas.captureStream();
        video.srcObject = videoStream;

        // Play the video before requesting PiP
        await video.play();

        // Now request Picture-in-Picture
        await video.requestPictureInPicture();

        // Set PiP as active
        setIsPiPActive(true);
      } catch (error) {
        console.error("Failed to enter Picture-in-Picture mode:", error);
      }
    }
  };

  useEffect(() => {
    const handlePiPExit = () => {
      setIsPiPActive(false);
    };

    document.addEventListener("leavepictureinpicture", handlePiPExit);

    return () => {
      document.removeEventListener("leavepictureinpicture", handlePiPExit);
    };
  }, []);

  return (
    <div className="w-full bg-gradient-custom h-96 transition-all rounded-xl overflow-hidden p-4 flex flex-col items-center justify-center relative">
      <div className="absolute w-[100px] h-[100px] bg-[#c7c7c7] opacity-15 blur-lg shadow-[0_0_50px_white] rounded-xl transform -rotate-[40deg] left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] "></div>
      <h3 className="text-xl font-semibold">{topic}</h3>
      {description && (
        <p className="text-white-3/40 w-[50%] mx-auto text-center line-clamp-1 ">
          {description}
        </p>
      )}

      <svg className="w-[60%]  my-3 " viewBox="0 0 100 100">
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#4A90E2", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#D93E5B", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>

        {/* Draw the ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke={`url(#progressGradient)`}
          strokeWidth="4"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#7776B3"
          strokeWidth="4"
          strokeDasharray={`${progress * 282.6} ${282.6}`} // 282.6 is the circumference of the circle
          strokeDashoffset={282.6} // Start at the full circumference
        />

        {/* Draw the timer in the center */}
        <text
          x="50"
          y="50"
          fill="#E5D9F2"
          fontSize="20" // Updated font size
          fontWeight="bold" // Set font weight to bold
          fontFamily="Poppins"
          textAnchor="middle"
          dominantBaseline="middle">
          {formatTime(remainingTime)}
        </text>

        {/* Draw minute markers */}
        {Array.from({ length: 60 }).map((_, index) => (
          <line
            key={index}
            x1="50"
            y1="5"
            x2="50"
            y2="10"
            stroke="#3a3a3a"
            strokeWidth="1"
            transform={`rotate(${index * 6} 50 50)`}
          />
        ))}
      </svg>

      <div className="flex space-x-4">
        <Button
          onClick={() => setIsActive(true)}
          disabled={isActive}
          className="bg-black-1 hover:bg-yellow-1/50 text-blue-400 font-light py-2 px-4 rounded">
          <Play className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => setIsActive(false)}
          disabled={!isActive}
          className=" text-blue-400 font-light py-2 px-4 rounded">
          <Pause className="w-5 h-5" />
        </Button>
        <Button
          onClick={resetTimer}
          className="bg-gray-800 hover:bg-gray-700 text-blue-400 font-light py-2 px-4 rounded">
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {isActive && (
        <Button
          onClick={enterPiPMode}
          className="bg-blue-500 hover:bg-blue-600 text-white hover:bg-black-2/30 font-light py-2 px-4 rounded absolute right-0 top-0">
          <IconWindowMaximize className="w-5 h-5 inline-block " />
        </Button>
      )}

      <p className="text-sm text-black-2 mt-4 tracking-widest ">{status}</p>

      {/* Video Element */}
      <video ref={videoRef} style={{ display: "none" }} />
      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        width="300"
        height="250"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default SessionCard;
