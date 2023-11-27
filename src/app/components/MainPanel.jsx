import React from "react";

const MainPanel = () => {
  return (
    <div className="flex flex-row space-x-20 p-5 bg-white h-max w-max rounded-3xl backdrop-blur-3xl">
      <div className="space-y-2">
        <div className="font-extrabold text-black text-3xl">140.10.0.0/21</div>
        <div className="font-extrabold text-black text-2xl">255.255.0.0</div>
        <div className="font-extrabold text-black text-2xl">Up to 2047 hosts</div>
      </div>

      <div className="text-black text-3xl text-center justify-center h-max">
        GRAFICA DE USO
      </div>
    </div>
  );
};

export default MainPanel;
