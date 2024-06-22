import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import img from "../../assets/home/foto-profile.jpg";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    axiosFetch
      .get("/tutors")
      .then((data) => {
        setTutors(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axiosFetch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTutors = tutors.filter((tutor) => {
    const name = tutor.name ? tutor.name.toLowerCase() : "";
    const title = tutor.title ? tutor.title.toLowerCase() : "";
    const university = tutor.university ? tutor.university.toLowerCase() : "";

    return (
      name.includes(searchQuery.toLowerCase()) ||
      title.includes(searchQuery.toLowerCase()) ||
      university.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="md:w-[80%] mx-auto my-36">
      <h1 className="text-5xl font-bold text-center dark:text-white">
        <span className="text-secondary">Tutor</span> Favorit
      </h1>
      <div className="w-[40%] text-center mx-auto my-4">
        <p className="text-gray-500">
          Berikut ini merupakan Tutor favorit yang dipilih siswa.
        </p>
      </div>

      <div className="w-[70%] mx-auto mt-8">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Cari Tutor..."
            className="w-full p-2 border border-gray-300 rounded pl-10 focus:outline-none focus:ring-2 focus:ring-secondary dark:border-gray-700 dark:bg-zinc-800 dark:text-white"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      {filteredTutors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-[90%] gap-4 mx-auto mt-20">
          {filteredTutors.map((tutor, i) => (
            <div
              key={i}
              className="flex dark:text-white dark:bg-zinc-900 hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-8 rounded-md"
            >
              <div className="flex-col flex gap-6 md:gap-8">
                <img
                  className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                  src={tutor.photoUrl || img}
                  alt="tutor.jpg"
                />
                <div className="flex flex-col text-center">
                  <p className="font-medium text-lg dark:text-white text-gray-800">
                    {tutor?.name}
                  </p>
                  <p className="text-gray-500">{tutor?.email}</p>
                  <p className="text-gray-500 mb-4">{tutor?.title}</p>
                  <p className="text-gray-500 mb-4">{tutor?.university}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-300">
          Tidak ada tutor yang tersedia
        </p>
      )}
    </div>
  );
};

export default Tutors;
