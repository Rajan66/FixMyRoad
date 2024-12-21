"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
export default function Navbar(props: any) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [topNavbar, setTopNavbar] = useState(true);
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < 100) {
      setTopNavbar(true);
    } else {
      setTopNavbar(false);
    }
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <div>
      <nav
<<<<<<< HEAD
        className={`font-sans text-black hover:text-white-300 w-full top-0   z-50 p-1 px-8 bg-transparent overflow-auto border-b border-solid border-gray-300 transition-all duration-200 ease-in-out ${
=======
        className={`font-sans text-black hover:text-white-300  w-full top-0 z-50 p-1 px-8 bg-transparent overflow-auto border-b border-solid border-gray-300 transition-all duration-200 ease-in-out ${
>>>>>>> 943fb99ff6f619748caae86d311212294478a545
          showNavbar
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        }`}
      >
        <Link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <ul className="flex justify-around items-center list-none mt-4 p-0 font-medium">
          {/* Logo Item */}
          <li className="mt-0">
            {/* <img
              src={Logo}
              alt="logo"
              className="h-14 w-35" // Adjust the height as needed
            /> */}
          </li>

          {/* Navigation Items */}
          <li className=" py-2 cursor-pointer relative group">
            <span className="relative ">
              <Link href="/">Home</Link>
            </span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </li>
          <li className=" py-2 cursor-pointer relative group">
            <Link href="/report" className="relative ">
              Report
            </Link>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </li>
          <li className=" py-2 cursor-pointer relative group">
<<<<<<< HEAD
            <Link href="/viewmap" className="relative ">
=======
            <Link href="/location" className="relative ">
>>>>>>> 943fb99ff6f619748caae86d311212294478a545
              View Map
            </Link>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </li>

          <li className=" py-2 cursor-pointer relative group">
            <Link href="/location" className="relative ">
              Quick Stat
            </Link>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </li>

          {/* Search Icon */}
          <li>
            <i className="fa fa-fw fa-search cursor-pointer "></i>
          </li>
        </ul>
      </nav>
    </div>
  );
}
