import React, { useContext, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();

  const handleHover = (index) => setHoveredCard(index);

  useEffect(() => {
    axiosFetch
      .get("/classes")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, [axiosFetch]);

  const handleSelect = (id) => {
    if (!currentUser) {
      alert("Silahkan login terlebih dahulu");
      navigate("/login");
      return;
    }

    axiosSecure
      .get(`/enrolled-classes/${currentUser.email}`)
      .then((res) => {
        setEnrolledClasses(res.data);

        axiosSecure
          .get(`/cart-item/${id}?email=${currentUser.email}`)
          .then((res) => {
            if (res.data.classId === id) {
              alert("Sudah dipilih");
            } else if (
              enrolledClasses.some((item) => item.classes._id === id)
            ) {
              alert("Sudah bergabung");
            } else {
              const data = {
                classId: id,
                userMail: currentUser.email,
                date: new Date(),
              };

              axiosSecure
                .post("/add-to-cart", data)
                .then((res) => {
                  alert("Berhasil menambahkan kelas");
                })
                .catch((err) => {
                  console.log(err);
                  alert("Gagal menambahkan kelas, silahkan coba lagi");
                });
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="mt-20 pt-3">
        <h1 className="text-4xl font-bold text-center text-secondary">Kelas</h1>
      </div>

      <div className="my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {classes.map((cls, index) => (
          <div
            key={index}
            className={`relative hover:translate-y-2 duration-150 hover:ring-2 hover:ring-secondary w-64 mx-auto ${
              cls.availableSeats < 1 ? "bg-red-300" : "bg-white"
            } dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
          >
            <div className="relative h-48">
              <div
                className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${
                  hoveredCard === index ? "opacity-60" : ""
                }`}
              />
              <img
                src={cls.image}
                alt={cls.name}
                className="object-cover w-full h-full"
              />
              <Transition
                show={hoveredCard === index}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => handleSelect(cls._id)}
                    title={
                      currentUser &&
                      (currentUser.role === "admin" ||
                        currentUser.role === "tutor")
                        ? "Tutor/Admin tidak bisa memilih"
                        : cls.availableSeats < 1
                        ? "Tidak ada kuota yang tersedia"
                        : "Kamu dapat memilih kelas ini"
                    }
                    disabled={
                      currentUser &&
                      (currentUser.role === "admin" ||
                        currentUser.role === "tutor" ||
                        cls.availableSeats < 1)
                    }
                    className="px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700"
                  >
                    Pilih
                  </button>
                </div>
              </Transition>
            </div>
            <div className="px-6 py-2">
              <h3 className="font-semibold mb-1">{cls.name}</h3>
              <p className="text-gray-500 text-xs">Tutor: {cls.tutorName}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-600 text-xs">
                  Kuota tersedia: {cls.availableSeats}
                </span>
                <span className="text-green-500 font-semibold">
                  Rp. {cls.price}
                </span>
              </div>
              <Link to={`/class/${cls._id}`}>
                <button className="px-4 py-2 mt-4 mb-2 w-full text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">
                  Lihat
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
