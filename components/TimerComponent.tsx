"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

export default function FocusTimer() {
  const initialTime = 5 * 60; // 5 minutes in seconds
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          setProgress(((initialTime - newTime) / initialTime) * 100);
          return newTime;
        });
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time]);

  const toggleTimer = () => setIsRunning(!isRunning);

  // Calculate minutes and seconds
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <>
      <div className="w-80 bg-[#2a2a2a] rounded-lg p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-semibold">Focus session</h2>
        </div>
        <div className="relative flex-grow flex items-center justify-center">
          <svg className="w-[70%] h-full" viewBox="0 0 100 100">
            <circle
              className="stroke-current"
              strokeWidth="4"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke={`url(#progressGradient)`}
            />
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
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white-1 text-4xl font-bold">
              {String(minutes).padStart(2, "0")}:
              <span className="text-4xl font-bold">
                {String(seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-white text-sm mb-4">
            {isRunning ? "Pause focus session" : "Start focus session"}
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTimer}
              className="bg-[#bb86fc] hover:bg-[#a174e0] text-black w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              aria-label={
                isRunning ? "Pause focus session" : "Start focus session"
              }>
              {isRunning ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 4h4v16H6zM14 4h4v16h-4z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3l14 9-14 9V3z"
                  />
                </svg>
              )}
            </button>
            <button
              className="text-white opacity-70 hover:opacity-100 transition-opacity"
              aria-label="More options">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
