import React from "react";
import LandingPage from "./_components/LandingPage";
import Hero from "@/components/Home/list/Hero";
import Navbar from "../../components/Header/Navbar";

// This is route = "/"
// Home page components goes here
const page = () => {
  return (
    <div>
      <LandingPage />
      <Hero />
    </div>
  );
};

export default page;
