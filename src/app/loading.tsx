import React from "react";
import "@/app/spinner.css";

const Spinner = () => {
  return (
    <div className="w-full h-full flex-col gap-4 flex items-center justify-center">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Spinner;
