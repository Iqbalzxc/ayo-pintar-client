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
      axiosSecure.get(`/enrolled-classes/${currentUser.email}`)
        .then((res) => {
          console.log("Response from server:", res.data); // Debugging
          setData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching enrolled classes:", err); // Debugging
        });
    }
  }, [currentUser]);

  return (
    <div>
      <h1 className="text-4xl my-6 text-center font-bold">Kelas <span className="text-secondary">Saya</span></h1>
      {data.length === 0 ? (
        <p className="text-center">Tidak ada kelas yang diikuti</p>
      ) : (
        <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div key={index} className="bg-white shadow-md h-96 mx-3 rounded-3xl flex md:flex-row justify-around items-center overflow-hidden sm:flex-grow sm:h-52 sm:w-3/5">
              <img
                src={item.classes.image}
                alt=""
                className="h-1/2 w-full sm:h=full sm:w-1/2 object-cover"
              />
              <div className="flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2">
                <div>
                  <h1>{item.classes.name}</h1>
                  <p>{item.classes.tutorName}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-bold text-gray-500">{item.classes.price}</p>
                  <Link to={`/dashboard/class-details`}>
                    <button className="bg-secondary font-bold rounded-xl mr-5 text-white px-3 py-1 shadow-md">Lihat</button>
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