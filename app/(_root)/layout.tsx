"use client";
import BottomBar from "@/components/BottomBar";
import TopBar from "@/components/TopBar";
import { SignedIn } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full h-dvh relative flex flex-col overflow-hidden">
      <TopBar />
      <div className="absolute right-7 top-7 hidden md:block">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <span className="w-1/2 h-full rounded-full bg-white-1/10 blur-[200px] absolute -left-[30%] -bottom-1/2"></span>
      <div className="w-full h-full container text-white-1">{children}</div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <BottomBar />
      </div>
      <div className="absolute md:hidden bottom-0 right-0">
        <SignedIn>
          <div className="p-4 text-center">
            <UserButton
              appearance={{
                variables: {
                  colorText: "#fff",
                },
                layout: {
                  animations: true,
                },
              }}
            />
          </div>
        </SignedIn>
      </div>
    </section>
  );
};

export default RootLayout;
