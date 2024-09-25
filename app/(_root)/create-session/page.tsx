"use client";
import React from "react";
import { CreateSession } from "@/components/forms/CreateSession";

const Focus = () => {
  return (
    <div className="w-full h-full p-3 flex flex-col items-start justify-start">
      <h1 className="text-3xl font-bold">Focus Session</h1>
      <div className="w-full h-full flex items-center justify-center">
        <CreateSession />
      </div>
    </div>
  );
};

export default Focus;
