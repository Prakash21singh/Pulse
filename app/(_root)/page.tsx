export default function Home() {
  return (
    <div className="w-full lg:p-3 h-full flex-center">
      {/* <h1 className="text-3xl font-bold">Track With Pulse</h1> */}
      <div className="relative w-full lg:w-[600px] h-[150px] lg:h-[250px] rounded-lg p-0.5 bg-gradient-radial from-white to-[#0c0d0d]">
        <div className="absolute w-1.5 aspect-square bg-white rounded-full shadow-[0_0_10px_white] right-[10%] top-[10%] z-10 animate-moveDot"></div>
        <div className="relative flex flex-col items-center justify-center w-full h-full bg-gradient-radial from-[#444444] to-[#0c0d0d] border border-[#202222] rounded-[9px] text-white">
          <div className="absolute w-[200px] h-[30px] bg-[#c7c7c7] opacity-40 blur-lg shadow-[0_0_50px_white] rounded-full transform -rotate-[40deg] top-15 left-0 origin-[10%]"></div>
          <div className="font-bold text-2xl lg:text-4xl bg-gradient-to-r from-black to-white bg-clip-text text-white-2/80">
            Pulse
          </div>
          <p className="text-sm lg:text-base font-semibold text-white-2/30">
            The Next Way to Track Progress
          </p>
          <div className="absolute w-full h-[1px] top-[10%] bg-gradient-to-r from-white-2 to-[#1d1f1f]"></div>
          <div className="absolute w-full h-[1px] lg:bottom-[10%] bottom-[16%] bg-[#2c2c2c]"></div>
          <div className="absolute h-full w-[1px] left-[9%] lg:left-[5%] bg-gradient-to-b from-white-1 to-[#222424]"></div>
          <div className="absolute h-full w-[1px] right-[10%] bg-[#2c2c2c]"></div>
        </div>
      </div>
    </div>
  );
}
