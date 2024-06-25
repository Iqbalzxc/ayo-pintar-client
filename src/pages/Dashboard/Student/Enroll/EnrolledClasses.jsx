import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";
import { Link } from "react-router-dom";

const EnrolledClasses = () => {
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();

  useEffect(() => {
    if (currentUser?.email) {
      console.log("Fetching enrolled classes for email:", currentUser.email);
      axiosSecure
        .get(`/enrolled-classes/${currentUser.email}`)
        .then((res) => {
          console.log("Response from server:", res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching enrolled classes:", err);
        });
    }
  }, [currentUser]);

  return (
    <div className="container mx-auto p-4 mt-20 md:mt-6">
      <h1 className="text-2xl md:text-4xl my-6 text-center font-bold ">
        Kelas <span className="text-secondary">Saya</span>
      </h1>
      {data.length === 0 ? (
        <p className="text-center">Tidak ada kelas yang diikuti</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-3xl flex flex-col justify-between overflow-hidden"
            >
              <img
                src={item.classes.image}
                alt={item.classes.name}
                className="h-48 w-full object-cover"
              />
              <div className="flex-1 w-full flex flex-col items-start justify-between p-4">
                <div className="w-full">
                  <h1 className="text-lg font-semibold mt-2">
                    {item.classes.name}
                  </h1>
                  <p>By {item.classes.tutorName}</p>
                </div>
                <div className="flex w-full mt-4 items-center justify-between">
                  <p className="font-bold text-gray-500 mb-2">{`Rp${item.classes.price.toLocaleString(
                    "id-ID"
                  )}`}</p>
                  <Link to={`/dashboard/class-details?id=${item.classes._id}`}>
                    <button className="bg-secondary font-bold rounded-xl text-white px-3 py-1 shadow-md">
                      Lihat
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledClasses;
