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
            <div key={index} className="bg-white shadow-md mx-3 rounded-3xl flex flex-col md:flex-row justify-between items-center overflow-hidden sm:flex-grow">
              <img
                src={item.classes.image}
                alt=""
                className="h-48 w-full md:w-1/2 object-cover"
              />
              <div className="flex-1 w-full flex flex-col items-start justify-between h-full p-4 md:p-6">
                <div className="w-full">
                  <h1 className="text-lg font-semibold mt-2 md:mt-0">{item.classes.name}</h1>
                  <p>By {item.classes.tutorName}</p>
                </div>
                <div className="flex flex-col w-full mt-4">
                  <p className="font-bold text-gray-500 mb-2">{`Rp${item.classes.price.toLocaleString('id-ID')}`}</p>
                  {/* <Link to={`/dashboard/class-details`}> */}
                  <Link to={`/dashboard/class-details?id=${item.classes._id}`}>
                    <button className="bg-secondary font-bold rounded-xl text-white px-3 py-1 shadow-md">Lihat</button>
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