import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ClassDetails = () => {
  const [data, setData] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      axiosSecure.get(`/class/${id}`)
        .then((res) => {
          console.log("Response from server:", res.data); 
          setData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching class details:", err); 
        });
    }
  }, [id, axiosSecure]);

  if (!data) {
    return <p className="flex h-screen items-center justify-center">Loading...</p>;
  }

  return (
    <div className="container mx-auto my-12 p-6 max-w-4xl bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">{data.name}</h1>
      <img src={data.image} alt={data.name} className="w-full h-64 object-cover rounded-lg mb-6 shadow-md" />
      <p className="text-lg font-semibold mb-1 text-gray-900">By tutor : {data.tutorName}</p>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">{data.description}</p>
      <p className="text-lg font-semibold mb-4 text-gray-900">Klik dibawah untuk bergabung ke grup pembelajaran😉</p>
      <a
        href={data.groupWaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-secondary text-white text-center font-bold py-3 px-5 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
      >
        Join Grup Whatsapp
      </a>
    </div>
  );
};

export default ClassDetails;