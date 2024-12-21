import React from "react";

const ReportCard = () => {
  return (
    <div className="h-[400px] w-[500px] bg-gray-200 rounded-lg flex flex-col p-5">
      <div className="w-[100%] text-base font-light mb-5">Nccs</div>
      <div className="flex">
        <img
          src="https://images.squarespace-cdn.com/content/v1/573365789f726693272dc91a/1704992146415-CI272VYXPALWT52IGLUB/AdobeStock_201419293.jpeg?format=1500w"
          alt="image"
          className="h-max w-max rounded-lg"
        />
        <div className="flex flex-col">
          <img
            src="https://cdn.shopify.com/s/files/1/0274/7288/7913/files/MicrosoftTeams-image_32.jpg?v=1705315718"
            alt=""
            className="h-[50%] w-[50%] rounded-lg"
          />
          <img
            src="https://imageio.forbes.com/blogs-images/laurenfix/files/2018/04/Pothole-damage.png?format=png&width=595"
            alt=""
            className="h-[50%] w-[50%] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
