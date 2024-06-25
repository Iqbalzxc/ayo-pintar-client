import React from "react";
import image1 from "../../../assets/gallery/image1.jpg";
import image2 from "../../../assets/gallery/image2.jpg";
import image3 from "../../../assets/gallery/image3.jpg";

const Gallery = () => {
  return (
    <div className="md:w-4/5 mx-auto my-36">
      <h1 className="text-4xl font-bold text-center dark:text-white mb-8">
        <span className="text-secondary">Dokumentasi</span> Pembelajaran
      </h1>

      <div className="w-[50%] text-center mx-auto my-10">
        <p className="text-gray-500">
          Berikut ini merupakan dokumentasi pembelajaran Ayo Pintar
        </p>
      </div>

      {/* Image container */}
      <div className="md:grid grid-cols-3 gap-10">
        <div className="col-span-1">
          <img
            src={image1}
            alt="Image 1"
            className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div className="col-span-1">
          <img
            src={image2}
            alt="Image 2"
            className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div className="col-span-1">
          <img
            src={image3}
            alt="Image 3"
            className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
