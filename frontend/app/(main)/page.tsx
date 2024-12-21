import React from "react";
import LandingPage from "./_components/LandingPage";
import Navbar from "../../components/Header/Navbar";

// This is route = "/"
// Home page components goes here
const page = () => {
  return (
    <div>
      <Navbar />
      <LandingPage />
    </div>
  );
};

export default page;
