import React from "react";
import HeroContainer from "./Hero/HeroContainer";
import Gallery from "./Gallery/Gallery";
import PopularClasses from "./PopularClasses/PopularClasses";
import PopularTutor from "./PopularTutor/PopularTutor";
import useAuth from "../../hooks/useAuth";


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
      </div>
    </section>
  );
};

export default Home;
