import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <main className="w-full h-screen flex-center">
      <SignUp
        appearance={{
          variables: {
            colorBackground: "transparent",
            colorText: "#E5D9F2",
            colorInputBackground: "#131313",
            colorInputText: "#E5D9F2",
          },
          elements: {
            socialButtonsBlockButton__github: {
              border: "#fff",
            },
          },
        }}
      />
    </main>
  );
};

export default SignUpPage;
