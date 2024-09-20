"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const session = useSession();
  return (
    <div className="w-full bg-gray-900 h-52">
      <div>{JSON.stringify(session)}</div>
      <button onClick={() => signIn()}>Signin </button>
      <button onClick={() => signOut()}>Logout </button>
    </div>
  );
};

export default page;
