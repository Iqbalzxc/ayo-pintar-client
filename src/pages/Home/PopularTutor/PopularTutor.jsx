import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import img from "../../../assets/home/foto-profile.jpg";

// POPULAR TUTOR
const PopularTutor = () => {
  const [tutors, setTutors] = useState([]);
  const axiosFetch = useAxiosFetch();
  useEffect(() => {
    axiosFetch
      .get("/popular-tutors")
      .then((data) => {
        setTutors(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="md:w-[80] mx-auto my-36">
        <h1 className="text-5xl font-bold text-center dark:text-white">
          <span className="text-secondary">Tutor</span> Favorit
        </h1>
        <div className="w-[40%] text-center mx-auto my-4">
          <p className="text-gray-500">
            Berikut ini merupakan Tutor favorit yang dipilih siswa.
          </p>
        </div>
      </div>

      {tutors ? (
        <>
          <div className="grid md-28 md:grid-cols-2 lg:grid-cols-4 w-[90%] gap-4 mx-auto">
            {tutors?.slice(0, 4).map((tutor, i) => (
              <div
                key={i}
                className="flex dark:text-white hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-10 md:px-8 rounded-md"
              >
                <div className="flex-col flex gap-6 md:gap-8">
                  <img
                    className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                    src={tutor?.tutor?.photoUrl || `${img}`}
                    alt="tutor.jpg"
                  />

                  <div className="flex flex-col text-center">
                    <p className="font-medium text-lg dark:text-white text-gray-800">
                      {tutor?.tutor?.name}
                    </p>
                    <p className="text-gray-500 whitespace-nowrap">Tutor</p>
                    <p className="text-gray-500 mb-4 whitespace-nowrap">
                      {" "}
                      Total Murid: {tutor?.totalEnrolled}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p>Tidak ada tutor yang tersedia</p>
        </>
      )}
    </div>
  );
};

export default PopularTutor;
