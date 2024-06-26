import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import Card from "./Card";

// POPULAR CLASS
const PopularClasses = () => {
  const axiosFetch = useAxiosFetch();
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    const fetchClasses = async () => {
      const response = await axiosFetch.get("/classes");
      // console.log(response.data);
      setClasses(response.data);
    };

    fetchClasses();
  }, []);

  // console.log(classes);
  return (
    <div className="md:w-[80] mx-auto my-36">
      <h1 className="text-5xl font-bold text-center dark:text-white">
        <span className="text-secondary">Kelas/Pelajaran</span> Paling Diminati
      </h1>
      <div className="w-[40%] text-center mx-auto my-4">
        <p className="text-black dark:text-white">
          Berikut ini merupakan kelas yang paling sering diikuti oleh siswa.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.slice(0, 6).map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/classes">
          <button className="px-6 py-3 text-white bg-secondary duration-300 rounded-full hover:bg-red-700">
            Lihat Semua Kelas
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularClasses;
