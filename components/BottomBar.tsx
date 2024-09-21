"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { links } from "@/constants";

const BottomBar = () => {
  return (
    <div className="flex items-center justify-center h-fit w-full">
      <FloatingDock desktopClassName="" items={links} />
    </div>
  );
};

export default BottomBar;
