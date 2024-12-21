import ReportCard from "@/app/(main)/_components/ReportCard";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <div className="bg-gray-100 h-max w-[90vw] mx-10 my-5 rounded-lg poppins italic text-3xl text-gray-500 font-light pl-[30vw] pt-8 pb-8">
        {"Your Road, Our Responsibility!"}
      </div>
      <div className="bg-gray-100 h-max w-[90vw] rounded-lg poppins p-8 mx-[5vw] my-5">
        <p className="text-3xl poppins mb-5 text-center font-light">Reports</p>
        <div className="grid grid-cols-3 gap-y-5">
          <ReportCard />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
