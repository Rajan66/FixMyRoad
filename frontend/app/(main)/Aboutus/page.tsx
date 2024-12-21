"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Page() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  const isHeroInView = useInView(heroRef);
  const isImageInView = useInView(imageRef);
  const isContentInView = useInView(contentRef);

  return (
    <div className="mb-4">
      <div
        style={{
          backgroundImage: `url("https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-6/471164126_983046233843537_1598030844897089331_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHNmjjpmNJnEsWAPB6FaoGCR9p2VZdtCetH2nZVl20J66sJZTNIxNy7V3ycVNSnM84t1nzhld3zNlYb4qjr8bkO&_nc_ohc=bKd4DRm1F5AQ7kNvgHCJF-u&_nc_zt=23&_nc_ht=scontent.fktm1-1.fna&_nc_gid=AQQLItKkFhlnXC-zmCzChdG&oh=00_AYBWxtacyzOtMaoQ6mzbJsEfMRQP9INHhavJ42jR-o6VUQ&oe=676C9C7E")`,
        }}
        className="top-0 lg:h-screen bg-cover bg-center bg-no-repeat h-[600px] w-full relative z-0 mb"
      >
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute z-10 top-[30%] left-[45%] text-white bg-transparent border-2 border-white backdrop-blur-xl p-5 rounded-xl"
        >
          <h1 className="text-4xl">About Us</h1>
        </motion.div>
      </div>

      <div className="flex items-center justify-center mt-10">
        <div className="self-stretch text-center w-[850px] h-auto justify-normal">
          <p className="font-sans font-extralight text-xl">
            Welcome to FixmyRoad, a community-driven platform dedicated to
            improving road safety and infrastructure. We empower citizens to
            report potholes and other road hazards quickly and efficiently,
            ensuring that local authorities are alerted and take timely action.
            Our mission is to create safer roads for everyone by fostering
            collaboration between communities and municipal teams. Together,
            let’s pave the way for smoother, safer journeys!
          </p>
          <button className="p-3 mt-5 border border-solid border-black transition-all duration-300 ease-in-out hover:text-white hover:bg-yellow-800">
            Learn More <i className="fa fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* Second Section */}
      <div className="grid gap-4 grid-cols-2 grid-rows-1 top-0 mt-[50px]">
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, x: -200 }}
          animate={isImageInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
          className="ml-[6.25rem]"
        >
          <img
            src="https://images.squarespace-cdn.com/content/v1/573365789f726693272dc91a/1704992146415-CI272VYXPALWT52IGLUB/AdobeStock_201419293.jpeg?format=1500w"
            alt="Road Safety Illustration"
          />
        </motion.div>
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, x: 200 }}
          animate={isContentInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
          className="self-center mr-[150px] ml-11"
        >
          <h2 className="font-quicksand font-extrabold text-3xl">
            Why Choose FixmyRoad?
          </h2>
          <p className="mt-5 font-roboto">
            - Simplify pothole reporting with just a few clicks.
            <br />
            - Promote safer roads and reduce accidents.
            <br />
            - Strengthen collaboration between communities and authorities.
            <br />
            - Create lasting impacts on road safety and infrastructure.
            <br />- Together, let's fix our roads for a better future.
          </p>
          <button className="p-3 mt-5 border border-solid border-black transition-all duration-300 ease-in-out hover:text-white hover:bg-blue-600">
            Get Started <i className="fa fa-arrow-right"></i>
          </button>
        </motion.div>
      </div>
      {/* third section */}
      <div className="grid gap-2 grid-cols-2 grid-rows-1 top-0 mt-[50px]">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, x: -200 }}
          animate={isContentInView ? { opacity: 1, x: 100 } : {}}
          transition={{ duration: 1 }}
          className="self-center mr-[150px] ml-11"
        >
          <h2 className="font-quicksand font-extrabold text-3xl">
            Why Choose FixmyRoad?
          </h2>
          <p className="mt-5 font-roboto">
            - Simplify pothole reporting with just a few clicks.
            <br />
            - Promote safer roads and reduce accidents.
            <br />
            - Strengthen collaboration between communities and authorities.
            <br />
            - Create lasting impacts on road safety and infrastructure.
            <br />- Together, let's fix our roads for a better future.
          </p>
          <button className="p-3 mt-5 border border-solid border-black transition-all duration-300 ease-in-out hover:text-white hover:bg-blue-600">
            Get Started <i className="fa fa-arrow-right"></i>
          </button>
        </motion.div>
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, x: 200 }}
          animate={isImageInView ? { opacity: 1, x: -50 } : {}}
          transition={{ duration: 1 }}
          className="ml-[6.25rem]"
        >
          <img
            src="https://propertymanagerinsider.com/wp-content/uploads/2021/08/Worker-Performing-Commercial-Pothole-Repair-Services-Using-Hot-Mix-Asphalt-1024x683.jpg"
            alt="Road Safety Illustration"
          />
        </motion.div>
      </div>
    </div>
  );
}
