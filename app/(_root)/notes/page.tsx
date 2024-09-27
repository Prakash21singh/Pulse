import CreateNote from "@/components/CreateNote";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";
const Timer = () => {
  return (
    <div className="w-full h-full p-3">
      <h1 className="text-3xl font-bold ">Notes</h1>
      <div className="w-full h-[90%] flex flex-col items-center justify-end relative">
        <CreateNote />
      </div>
    </div>
  );
};

export default Timer;
