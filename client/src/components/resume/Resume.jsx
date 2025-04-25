import React from "react";
import ResumeChat from "./ResumeChat";
const ResumeChecker = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col'>
        <h2 className='text-xl md:text-4xl font-bold mt-2 uppercase text-gray-600'>
          Get your ATS Score Free
        </h2>
        <p className=' flex-1 ml-auto text-xs'>
          Powered by <span className='italic'>Gemini Model</span>
        </p>
      </div>
      <div className='flex-1 min-h-[42vw] bg-slate-300 mt-4 w-[80vw] rounded-2xl shadow-md'>
        <ResumeChat />
      </div>
    </div>
  );
};

export default ResumeChecker;
