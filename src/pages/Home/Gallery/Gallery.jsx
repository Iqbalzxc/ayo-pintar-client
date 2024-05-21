import React from "react";
import image1 from "../../../assets/gallery/image1.jpg";
import image2 from "../../../assets/gallery/image2.jpg";

const Gallery = () => {
  return (
    <div className="md:w-[80%] mx-auto my-28">
      <div className="md:w-[80%] mx-auto my-28">
        <h1 className="text-5xl font-bold text-center">Pembelajaran</h1>
      </div>

      {/* Image container */}
      <div className="md:grid grid-cols-6 gap-4">
        <div className="col-span-3">
          <img
            src={image1}
            alt="Images.png"
            className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div className="col-span-3 grid grid-rows-3 gap-4">
          <div className="row-span-2">
            <img
              src={image2}
              alt="Images.png"
              className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img
                src={image2}
                alt="Images.png"
                className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div>
              <img
                src={image2}
                alt="Images.png"
                className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
