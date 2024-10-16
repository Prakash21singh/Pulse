"use client";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React from "react";

const page = () => {
  return (
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className="collaborative-room">This is collaborating room</div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default page;
