"use client";
import React from "react";
import { IconPlus } from "@tabler/icons-react";
import { CreateSession } from "@/components/forms/CreateSession";

const Focus = () => {
  return (
    <div className="w-full h-full p-3">
      <h1 className="text-3xl font-bold">Focus Session</h1>
      <div className="w-full h-full grid grid-cols-4 overflow-auto items-start place-items-start ">
        <CreateSession />
      </div>
    </div>
  );
};

export default Focus;
