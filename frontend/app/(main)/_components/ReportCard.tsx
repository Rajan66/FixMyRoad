"use client";
import React from "react";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useGetAllReport } from "@/hooks/reportQueries";

const ReportCard = () => {
  const { data: reportData } = useGetAllReport();
  console.log(reportData);

  return (
    <div className="h-[400px] w-[400px] bg-gray-200 rounded-lg flex flex-col p-5 relative">
      <div className="w-[100%] text-base font-light mb-5 flex items-center justify-between ">
        <div className="flex items-center">
          <CircleUserRound className="mr-2" />
          Nccs
        </div>
        <div className="">Paknajol, Kathmandu</div>
      </div>
      <div className="flex h-[65%]">
        <img
          src="https://images.squarespace-cdn.com/content/v1/573365789f726693272dc91a/1704992146415-CI272VYXPALWT52IGLUB/AdobeStock_201419293.jpeg?format=1500w"
          alt="image"
          className="h-[100%] w-[100%] rounded-lg"
        />
        {/* <div className="flex flex-col h-[90%] ml-1">
          <img
            src="https://cdn.shopify.com/s/files/1/0274/7288/7913/files/MicrosoftTeams-image_32.jpg?v=1705315718"
            alt=""
            className="h-[50%] w-max"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-qov-Ystb4TXdJh_v8Fu9HoPO1pi4_CyDNQ&s"
            alt=""
            className="h-[50%] w-max mt-1"
          />
        </div> */}
      </div>
      <div className="mt-2"></div>
      <div className="mt-2">Report Count: 10</div>
      <div className="mt-2">Severity: High</div>
      <Link href="/reportPage">
        <div className="absolute  bottom-8 right-8 bg-gray-300 p-2 rounded-sm hover:scale-105">
          View More
        </div>
      </Link>
    </div>
  );
};

export default ReportCard;
