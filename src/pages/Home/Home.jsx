import React from "react";
import HeroContainer from "./Hero/HeroContainer";
import Gallery from "./Gallery/Gallery";
import PopularClasses from "./PopularClasses/PopularClasses";
import PopularTutor from "./PopularTutor/PopularTutor";
import useAuth from "../../hooks/useAuth";
import Testimonial from "./Testimonial/Testimonial";
import Faq from "./Faq/FaqPage";

// HOME
const Home = () => {
  console.log(import.meta.env.VITE_APIKEY);
  const { user } = useAuth();
  console.log(user);
  return (
    <section>
      <HeroContainer />
      <div className="max-w-screen-xl mx-auto">
        <Gallery />
        <PopularClasses />
        <PopularTutor />
        <Testimonial />
        <Faq />
      </div>
    </section>
  );
};

export default Home;
