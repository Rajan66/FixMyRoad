"use client";
import { CircleUserRound, ArrowUp, ArrowDown } from "lucide-react";
import React, { useState } from "react";
import Carousel from "../_components/Carousel";
import Description from "../_components/Description";

//demo data
const images = [
  "https://cdn.shopify.com/s/files/1/0274/7288/7913/files/MicrosoftTeams-image_32.jpg?v=1705315718",
  "https://imageio.forbes.com/blogs-images/laurenfix/files/2018/04/Pothole-damage.png?format=png&width=595",
  "https://images.squarespace-cdn.com/content/v1/573365789f726693272dc91a/1704992146415-CI272VYXPALWT52IGLUB/AdobeStock_201419293.jpeg?format=1500w",
];

const reviews = [
  {
    username: "JohnDoe",
    review: "Need work Asap!",
    date: "2024-12-20",
  },
  {
    username: "JaneSmith",
    review: "Very disturbing.",
    date: "2024-12-18",
  },
  {
    username: "MikeBrown",
    review: "infront of my home.",
    date: "2024-12-15",
  },
];
const page = () => {
  return (
    <div>
      <div className="bg-gray-200 w-[50vw] h-[85vh] mx-auto mt-2 mb-5 py-6 px-16 rounded-xl shadow-lg">
        <div className="text-xl font-light mb-5 flex justify-between">
          <div className="flex items-center">
            <CircleUserRound className="mr-2" />
            {/* {report.name} */}
            Ram bahadur
          </div>
          <div>Unsolved</div>
        </div>
        {/* carousel */}
        <Carousel images={images} />
        {/* // */}
        <div className="mt-4 flex justify-between">
          <div className="bg-gray-400 p-2 rounded-xl w-max flex">
            <button className="hover:text-white transition ease-in-out hover:-translate-y-1 duration-200">
              <ArrowUp />
            </button>
            21
            <button className="hover:text-white transition ease-in-out hover:translate-y-1 duration-200">
              <ArrowDown />
            </button>
          </div>
          <p className="text-xl">Paknajol, Kathmandu</p>
        </div>
        <div className="mt-4 flex justify-between">
          <p className="text-xl">Report Count: 10</p>
          <p className="text-xl">Severity: High</p>
        </div>
      </div>
      <div>
        <Description reviews={reviews} />
      </div>
    </div>
  );
};

export default page;
