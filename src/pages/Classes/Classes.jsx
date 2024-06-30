import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import useUser from "../../hooks/useUser";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();

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
                  // console.log(err);
                  alert("Gagal menambahkan kelas, silahkan coba lagi");
                });
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredClasses = classes.filter((cls) => {
    const name = cls.name ? cls.name.toLowerCase() : "";
    const tutorName = cls.tutorName ? cls.tutorName.toLowerCase() : "";

    return (
      name.includes(searchQuery.toLowerCase()) ||
      tutorName.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <div className="mt-36 pt-3">
        <h1 className="text-5xl font-bold text-center text-secondary">Kelas</h1>
      </div>

      <div className="w-[60%] mx-auto mt-8">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Cari Kelas..."
            className="w-full p-2 border border-gray-300 rounded pl-10 focus:outline-none focus:ring-2 focus:ring-secondary dark:border-gray-700 dark:bg-zinc-800 dark:text-white"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      <div className="my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredClasses.map((cls, index) => (
          <div
            key={index}
            className={`relative hover:translate-y-2 duration-150 hover:ring-2 hover:ring-secondary w-64 mx-auto ${
              cls.availableSeats < 1 ? "bg-red-300" : "bg-white"
            } dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
          >
            <div className="relative h-48">
              <img
                src={cls.image}
                alt={cls.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="px-6 py-2">
              <h3 className="font-semibold mb-1 dark:text-white">{cls.name}</h3>
              <p className="text-gray-500 text-xs">Tutor: {cls.tutorName}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-500 text-xs">
                  Kuota tersedia: {cls.availableSeats}
                </span>
                <span className="text-green-500 font-semibold">
                  Rp{cls.price} <span className="text-black dark:text-white">/ Pertemuan</span>
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