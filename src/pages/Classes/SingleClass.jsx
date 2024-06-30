import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaBook,
  FaLanguage,
  FaLevelUpAlt,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaTelegram,
  FaArrowLeft,
} from "react-icons/fa";
import { MdTimelapse, MdTimeline } from "react-icons/md";

const SingleClass = () => {
  const classes = useLoaderData();
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const navigate = useNavigate();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();

  // IF USER NOT LOGIN
  const handleSelect = (id) => {
    if (isLoading) return;
    if (!currentUser) {
      alert("Silahkan login terlebih dahulu");
      return navigate("/login");
    }

    // GET ENROLLED CLASSES
    axiosSecure
      .get(`/enrolled-classes/${currentUser.email}`)
      .then((res) => setEnrolledClasses(res.data))
      .catch((err) => console.log(err));

    // GET CART ITEM
    axiosSecure
      .get(`/cart-item/${id}?email=${currentUser.email}`)
      .then((res) => {
        setIsLoading(false);
        if (res.data.classId === id) {
          return alert("Sudah dipilih");
        } else if (enrolledClasses.find((item) => item.classes._id === id)) {
          return alert("Sudah bergabung");
        } else {
          const data = {
            classId: id,
            userMail: currentUser.email,
            date: new Date(),
          };
          axiosSecure
            .post("/add-to-cart", data, {
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
              },
            })
            .then((res) => {
              alert("Berhasil menambahkan kelas");
              // console.log(res.data);
            })
            .catch((err) => {
              // console.log(err);
              alert("Gagal menambahkan kelas");
              return navigate("/classes");
            });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        // console.log(err);
      });
  };

  return (
    <>
      <div
        className="font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto"
        data-new-gr-c-s-check-loaded="14.1157.0"
        data-gr-ext-installed
      >
        {/* THIS HEADER */}
        <div className="relative py-20 mt-20 bg-cover bg-center bg-no-repeat rounded-lg shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400"></div>
          <div className="container mx-auto text-center text-white relative">
            <h2 className="text-4xl font-bold">Detail Kelas</h2>
          </div>
        </div>

        <div className="nav-tab-wrapper tabs section-padding mt-8 bg-gray-50 dark:bg-zinc-900 shadow-md rounded-lg mb-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-6 md:gap-8px">
              {/* LEFT */}
              <div className="lg:col-span-8 col-span-12 p-4">
                <div className="single-course-details">
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={() => navigate(-1)}
                      className=" text-secondary flex items-center py-2 px-1 hover:text-red-500"
                    >
                      <FaArrowLeft className="mr-2" />
                      Kembali
                    </button>
                  </div>
                  <div className="xl:h-[470] h-[350px] mb-10 course-main-thumb">
                    <img
                      src={classes?.image}
                      alt="image.jpg"
                      className="rounded-md object-full w-full h-full block"
                    />
                  </div>
                  <h2 className="text-3xl mb-2 font-bold font-sans">{classes?.name}</h2>

                  <div className="author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
                    <div className="flex space-x-4 items-center group">
                      <div className="flex-none">
                      </div>
                      <div className="flex-1">
                        <p className="text-secondary">
                          Tutor
                          <a href="#" className="text-black dark:text-white font-sans">
                            : {classes.tutorName}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className="text-secondary">
                        Update terakhir:
                        <a href="#" className="text-black dark:text-white ml-1 font-sans">
                          {new Date(classes.submitted).toLocaleDateString()}
                        </a>
                      </span>
                    </div>
                  </div>

                  <div id="tabs-content">
                    <div id="tab1" className="tab-content">
                      <div>
                        <h3 className="text-2xl mt-8 font-semibold font-sans">
                          Deskripsi Kelas
                        </h3>
                        <div className="mt-4 text-justify dark:text-white font-sans">
                          {classes.description
                            .split("\n")
                            .map((paragraph, index) => (
                              <p key={index} className="mb-4">
                                {paragraph}
                              </p>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-4 col-span-12 md:mt-10 p-6">
                <div className="space-y-8">
                  <div className="widget custom-text space-y-5">
                    <ul className="grid gap-1 md:grid-cols-1">
                      <h1 className="font-semibold text-xl mb-4 font-sans">
                        Informasi Selengkapnya :
                      </h1>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-b py-2">
                        <div className="flex items-center space-x-2">
                          <MdTimelapse className="inline-flex text-secondary" />
                          <span className="font-semibold text-black dark:text-white">
                            Waktu:
                          </span>
                        </div>
                        <span className="text-base md:text-right sm:ml-auto">
                          Menyesuaikan siswa
                        </span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-b py-2">
                        <div className="flex items-center space-x-2">
                          <MdTimeline className="inline-flex text-secondary" />
                          <span className="font-semibold text-black dark:text-white">
                            Durasi:
                          </span>
                        </div>
                        <span className="text-base md:text-right sm:ml-auto">
                          90 menit / pertemuan
                        </span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-b py-2">
                        <div className="flex items-center space-x-3">
                          <FaBook className="inline-flex text-secondary" />
                          <span className="font-semibold text-black dark:text-white">
                            Metode:
                          </span>
                        </div>
                        <span className="text-base md:text-right sm:ml-auto">
                          Offline & Online
                        </span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-b py-2">
                        <div className="flex items-center space-x-2">
                          <FaLevelUpAlt className="inline-flex text-secondary" />
                          <span className="font-semibold text-black dark:text-white">
                            Jenjang pendidikan:
                          </span>
                        </div>
                        <span className="text-base md:text-right sm:ml-auto">
                          TK, SD, SMP & SMA
                        </span>
                      </li>
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-b py-2">
                        <div className="flex items-center space-x-3">
                          <FaLanguage className="inline-flex text-secondary" />
                          <span className="font-semibold text-black dark:text-white">
                            Bahasa:
                          </span>
                        </div>
                        <span className="text-base md:text-right sm:ml-auto">
                          Indonesia & Inggris
                        </span>
                      </li>
                    </ul>

                    <h3 className="text-xl font-bold">Rp{classes.price} / pertemuan</h3>
                    <button
                      onClick={() => handleSelect(classes._id)}
                      title={
                        (role === "admin" || role === "tutor") &&
                        classes.availableSeats < 1
                          ? "Tutor/Admin tidak bisa memilih"
                          : "Kamu dapat memilih kelas"
                      }
                      disabled={
                        role === "admin" ||
                        role === "tutor" ||
                        classes.availableSeats < 1
                      }
                      className="btn btn-primary w-full py-2 px-6 text-white bg-secondary hover:bg-red-600 rounded"
                    >
                      Daftar Sekarang!
                    </button>
                    <div className="flex space-x-4 items-center pt-3">
                      <span className="font-semibold">Bagikan:</span>
                      <a
                        href="https://facebook.com"
                        className="flex h-8 w-8 bg-blue-500 hover:bg-blue-700 text-white rounded-full items-center justify-center"
                      >
                        <FaFacebook className="w-4 h-4" />
                      </a>
                      <a
                        href="https://x.com"
                        className="flex h-8 w-8 bg-blue-400 hover:bg-blue-600 text-white rounded-full items-center justify-center"
                      >
                        <FaTwitter className="w-4 h-4" />
                      </a>
                      <a
                        href="https://whatsapp.com"
                        className="flex h-8 w-8 bg-green-400 hover:bg-green-600 text-white rounded-full items-center justify-center"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                      </a>
                      <a
                        href="https://telegram.com"
                        className="flex h-8 w-8 bg-blue-500 hover:bg-blue-700 text-white rounded-full items-center justify-center"
                      >
                        <FaTelegram className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleClass;
