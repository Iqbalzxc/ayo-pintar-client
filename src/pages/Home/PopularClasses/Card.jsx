import React from "react";
import { Link } from "react-router-dom";


// CARD POPULAR CLASS
const Card = ({ item }) => {
  // console.log(item)
  const { _id, name, image, availableSeats, price, totalEnrolled } = item;
  // console.log(id)

  return (
    <div className="shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4 hover:border-4 hover:border-secondary">
      <img src={image} alt="image.jpg" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">{name}</h2>
        <p className="text-gray-600 mb-2">Kuota tersedia: {availableSeats}</p>
        <p className="text-gray-600 mb-2">Harga: {price}</p>
        <p className="text-gray-600 mb-2">Siswa terdaftar: {totalEnrolled}</p>
        <Link to={`class/${_id}`} className="text-center mt-2">
          <button className="px-2 w-full py-1 bg-secondary rounded-xl text-white font-bold mt-2">
            Pilih
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
