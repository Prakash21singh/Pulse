import BottomBar from "@/components/BottomBar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full h-screen relative flex overflow-hidden">
      <span className="w-1/2 h-full rounded-full bg-white-1/10 blur-[200px] absolute -left-[30%] -bottom-1/2"></span>
      <div className="w-full h-full container text-white-1">{children}</div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <BottomBar />
      </div>
    </section>
  );
};

export default RootLayout;
