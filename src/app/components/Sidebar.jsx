import React from "react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex h-screen m-2 rounded-3xl p-3 space-y-5 items-center content-center">
      <div className="space-y-3 w-full h-1/3 mt-8">
        {" "}
        {/* Logo TecNM*/}
        <div className="text-black text-4xl text-center font-semibold rounded-2xl mb-2">
          Anet
        </div>
        <div className="w-full h-1 bg-black rounded-full"></div>
      </div>
      <div className="flex flex-row h-1/3 content-end">
    
      </div>
    </div>
  );
};

export default Sidebar;