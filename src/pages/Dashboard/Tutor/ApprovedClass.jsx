import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";

// MOMENT INDONESIA
import "moment/locale/id";

// SET LOCAL KE INDONESIA
moment.locale("id");

const ApprovedClass = () => {
  const [classes, setClasses] = useState([]);
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!isLoading) {
      axiosSecure
        .get(`/classes/${currentUser?.email}`)
        .then((res) => {
          // FILTER STATUS "APPROVED"
          const approvedClasses = res.data.filter(
            (cls) => cls.status === "approved"
          );
          setClasses(approvedClasses);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoading, currentUser, axiosSecure]);

  return (
    <div className="container mx-auto px-4 mt-24 md:mt-6">
      <div className="my-9">
        <h1 className="text-4xl font-bold text-center">
          Kelas <span className="text-secondary">Disetujui</span>
        </h1>
        <div>
          <p className="text-[12px] text-center my-2">
            Kamu bisa melihat semua kelas yang telah disetujui disini
          </p>
        </div>
      </div>

      <div>
        {classes.length === 0 ? (
          <div className="text-center text-2xl font-bold mt-10">
            Tidak ada kelas yang disetujui
          </div>
        ) : (
          <div>
            {classes.map((cls, index) => (
              <div
                key={index}
                className="mb-5 hover:ring ring-secondary duration-200 focus:ring rounded-lg"
              >
                <div className="bg-white flex flex-col md:flex-row rounded-lg gap-4 md:gap-8 shadow p-4">
                  <div className="flex-shrink-0">
                    <img
                      src={cls.image}
                      alt="Gambar"
                      className="h-48 w-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full">
                    <h2 className="text-[21px] font-bold text-secondary border-b pb-2 mb-2">
                      {cls.name}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h1 className="font-bold mb-3">Detail Kelas : </h1>
                        <h1 className="text-secondary my-2">
                          <span className="text-black">Total Murid</span> :{" "}
                          {cls.totalEnrolled ? cls.totalEnrolled : 0}
                        </h1>
                        <h1 className="text-secondary">
                          <span className="text-black">Kuota Tersedia</span> :{" "}
                          {cls.availableSeats}
                        </h1>
                        <h1 className="text-secondary my-2">
                          <span className="text-black ">Status</span> :{" "}
                          <span
                            className={`font-bold ${
                              cls.status === "approved"
                                ? "text-green-500"
                                : "text-red-600"
                            }`}
                          >
                            {cls.status}
                          </span>
                        </h1>
                      </div>
                      <div>
                        <h1 className="text-secondary my-2">
                          <span className="text-black">Harga</span> : Rp
                          {cls.price}
                        </h1>
                        <h1 className="text-secondary my-2">
                          <span className="text-black">Tanggal Submit</span> :{" "}
                          <span>
                            {cls.submitted
                              ? moment(cls.submitted).format("DD MMMM YYYY")
                              : "Tidak ada data"}
                          </span>
                        </h1>
                      </div>
                      <div className="md:col-span-2 flex flex-col md:flex-row gap-2">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/feedback/${cls._id}`)
                          }
                          className="px-3 bg-orange-400 font-bold py-1 text-white rounded-lg"
                        >
                          Lihat Feedback
                        </button>
                        <button className="px-3 bg-green-500 font-bold py-1 text-white rounded-lg">
                          Lihat Detail
                        </button>
                        <button
                          className="px-3 bg-secondary font-bold py-1 text-white rounded-lg"
                          onClick={() =>
                            navigate(`/dashboard/update/${cls._id}`)
                          }
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovedClass;
