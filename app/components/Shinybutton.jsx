import React from "react";

const ShinyButton = ({ val, onclick, cl }) => {
  return (
    <>
      <style>{`
        @keyframes rotate {
          100% {
            transform: rotate(1turn);
          }
        }
        .rainbow::before {
          content: '';
          position: absolute;
          z-index: -2;
          left: -50%;
          top: -50%;
          width: 200%;
          height: 200%;
          background-position: 100% 50%;
          background-repeat: no-repeat;
          background-size: 50% 30%;
          filter: blur(6px);
          background-image: linear-gradient(#FF0A7F,#780EFF);
          animation: rotate 4s linear infinite;
        }
      `}</style>

      <div className="rainbow relative z-0 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
        <button
          onClick={onclick}
          className={`px-8 text-sm py-2.5 text-white rounded-full font-medium ${
            cl ? cl : "bg-gray-800"
          }`}
        >
          {val}
        </button>
      </div>
    </>
  );
};

export default ShinyButton;
