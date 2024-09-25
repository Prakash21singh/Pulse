"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, PictureInPicture2 } from "lucide-react";
import { IconWindowMaximize } from "@tabler/icons-react";

interface IProp {
  id: number;
  topic: string;
  description: string | null;
  initialTime: number;
  remainingTime: number | null;
  isPaused: boolean;
  status: string;
  creatorId: string;
  createdAt: Date;
}

const SessionCard = ({
  id,
  topic,
  description,
  initialTime,
  remainingTime: initialRemainingTime,
  isPaused,
  status,
}: IProp) => {
  const [remainingTime, setRemainingTime] = useState(
    initialRemainingTime ?? initialTime
  );
  const [isActive, setIsActive] = useState(!isPaused);
  const [isPiPActive, setIsPiPActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1000);
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

  // Synchronize timer state based on isPaused prop
  useEffect(() => {
    setIsActive(!isPaused);
  }, [isPaused]);

  // Reset to initial time
  const resetTimer = () => {
    setRemainingTime(initialTime);
    setIsActive(false); // Timer should not run immediately after reset
  };

  // Draw circular progress and countdown on canvas
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

  // Function to enter PiP mode
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

  // Handle PiP exit event
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
    <div className="w-full timer-bg h-96 border border-dashed border-white-2/30 hover:border-white-1/40 transition-all rounded-md p-4 flex flex-col items-center justify-center relative">
      <h3 className="text-xl font-semibold">{topic}</h3>
      {description && (
        <p className="text-white-3/40 w-[50%] mx-auto text-center line-clamp-1 ">
          {description}
        </p>
      )}
      <canvas ref={canvasRef} className="max-w-[250px] w-[60%] " />

      <div className="flex space-x-4">
        <Button
          onClick={() => setIsActive(true)}
          disabled={isActive}
          className="bg-gray-800 hover:bg-gray-700 text-blue-400 font-light py-2 px-4 rounded">
          <Play className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => setIsActive(false)}
          disabled={!isActive}
          className="bg-gray-800 hover:bg-gray-700 text-blue-400 font-light py-2 px-4 rounded">
          <Pause className="w-5 h-5" />
        </Button>
        <Button
          onClick={resetTimer}
          className="bg-gray-800 hover:bg-gray-700 text-blue-400 font-light py-2 px-4 rounded">
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      <Button
        onClick={enterPiPMode}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-light py-2 px-4 rounded absolute right-0 top-0">
        <IconWindowMaximize className="w-5 h-5 inline-block mr-2" />
      </Button>

      <video ref={videoRef} className="hidden" />

      <p className="text-sm text-black-2 mt-4 tracking-widest ">{status}</p>
    </div>
  );
};

export default SessionCard;
