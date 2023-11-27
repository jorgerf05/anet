import React from "react";

const Card = ({ title, subtitles }) => {
  return (
    <div className={`w-max rounded-2xl bg-gray-200 shadow-xl h-full p-5 bg-emerald-100`}>
      <div className="text-black font-extrabold text-xl">{title}</div>
      {subtitles.map((subtitle) => (
        <div className="text-gray-500 font-medium text-sm" key={subtitle}>{subtitle}</div>
      ))}
    </div>
  );
};

export default Card;
