import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <main className="w-full h-screen flex-center relative">
      <SignIn
        appearance={{
          variables: {
            colorBackground: "transparent",
            colorText: "#fff",
            colorInputBackground: "#131313",
            colorInputText: "#fff",
          },
        }}
      />
    </main>
  );
};

export default SignInPage;
