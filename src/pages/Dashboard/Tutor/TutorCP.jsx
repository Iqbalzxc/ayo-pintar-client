import React from "react";
import bgImg from "../../../assets/dashboard/welcome.png";

const TutorCP = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-full my-5 mt-24 md:mt-6 flex justify-center items-center">
        <img src={bgImg} alt="image.jpg" className="md:w-1/2" />
      </div>
    </div>
  );
};

export default TutorCP;