import React from "react";
import { ClipboardList, CircleCheckBig, ClockAlert } from "lucide-react";
import ReportCard from "../_components/ReportCard";

const page = () => {
  return (
    <div>
      <div className="bg-gray-100 h-max w-[90vw] mx-[5vw] my-5 rounded-lg   pl-[30vw] pt-8 pb-8 flex gap-x-5">
        <div className="flex flex-col bg-gray-300 rounded-xl p-8">
          <div className="flex text-xl items-center w-28 ">
            <ClipboardList />
            <p>REPORTS</p>
          </div>
          <p className="text-4xl text-center">100</p>
        </div>
        <div className="flex flex-col bg-gray-300 rounded-xl p-8">
          <div className="flex text-xl items-center w-28">
            <CircleCheckBig />
            SOLVED
          </div>
          <p className="text-4xl text-center">20</p>
        </div>
        <div className="flex flex-col bg-gray-300 rounded-xl p-8">
          <div className="flex text-xl items-center w-28">
            <ClockAlert />
            PENDING
          </div>
          <p className="text-4xl text-center">80</p>
        </div>
      </div>
      <div className="bg-gray-100 h-max w-[90vw] rounded-lg poppins p-8 mx-[5vw] my-5">
        <p className="text-3xl poppins mb-5 ml-[40%] font-light ">
          Recent Reports
        </p>
        <div className="grid grid-cols-3 gap-y-5">
          <ReportCard />
          <ReportCard />
          <ReportCard />
          <ReportCard />
          <ReportCard />
          <ReportCard />
        </div>
      </div>
    </div>
  );
};

export default page;
