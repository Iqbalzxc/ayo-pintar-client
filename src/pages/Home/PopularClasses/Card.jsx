import React from "react";
import { Link } from "react-router-dom";

// CARD POPULAR CLASS
const Card = ({ item }) => {
  const { _id, name, image, availableSeats, price, totalEnrolled } = item;

  return (
    <div className="shadow-lg rounded-xl p-4 flex flex-col justify-between border border-secondary overflow-hidden m-4 hover:border-4 hover:border-secondary transition-all duration-300">
      <img
        className="w-full h-56 object-cover rounded-t-xl"
        src={image}
        alt={name}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-3 dark:text-white">{name}</h2>
        <p className="text-gray-500 flex items-center">
          Kuota tersedia: {availableSeats}
        </p>
        <p className="text-gray-500 flex items-center">
          Siswa terdaftar: {totalEnrolled}
        </p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-green-500 text-xl font-bold">Rp. {price}</p>
          <Link to={`class/${_id}`}>
            <button className="px-8 py-2 bg-secondary rounded-xl text-white font-bold hover:bg-secondary-dark transition-colors duration-300">
              Pilih
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
