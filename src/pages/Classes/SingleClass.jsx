import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { DialogActions } from "@mui/material";
import {
  FaBook,
  FaLanguage,
  FaLevelUpAlt,
  FaUser,
  FaUsers,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa";
import { MdBookOnline, MdTimelapse, MdTimeline } from "react-icons/md";
import bannerImg1 from "../../assets/home/banner-1.jpg";
import bannerImg2 from "../../assets/home/banner-2.jpg";

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
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
              alert("Gagal menambahkan kelas");
              return navigate("/classes");
            });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
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
        <div className="breadcrumbs bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-20 mt-20 section-padding bg-cover bg-center bg-no-repeat">
          <div className="container mx-auto text-center text-white">
            <h2 className="text-4xl font-bold">Detail Kelas</h2>
          </div>
        </div>

        <div className="nav-tab-wrapper tabs section-padding mt-8 bg-gray-100 dark:bg-zinc-900 shadow-md rounded-lg">
          <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-6 md:gap-8px">
              {/* THIS LEFT */}
              <div className="lg:col-span-8 col-span-12 p-4">
                <div className="single-course-details">
                  <div className="xl:h-[470] h-[350px] mb-10 course-main-thumb">
                    <img
                      src={classes?.image}
                      alt="image.jpg"
                      className="rounded-md object-full w-full h-full block"
                    />
                  </div>
                  <h2 className="text-3xl mb-2 font-bold">{classes?.name}</h2>

                  <div className="author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
                    <div className="flex space-x-4 items-center group">
                      <div className="flex-none">
                        <div className="h-12 w-12 rounded">
                          <img
                            src={
                              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            }
                            alt="image.jpg"
                            className="object-cover w-full h-full rounded"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-secondary">
                          Tutor
                          <a href="#" className="text-black dark:text-white">
                            : {classes.tutorName}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className="text-secondary">
                        Update terakhir:
                        <a href="#" className="text-black dark:text-white ml-1">
                          {new Date(classes.submitted).toLocaleDateString()}
                        </a>
                      </span>
                    </div>
                  </div>

                  <div id="tabs-content">
                    <div id="tab1" className="tab-content">
                      <div>
                        <h3 className="text-2xl mt-8 font-semibold">
                          Deskripsi Kelas
                        </h3>
                        <div className="mt-4 text-justify dark:text-white">
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

              {/* THIS RIGHT */}
              <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0 p-6">
                <div className="space-y-8">
                  <div className="widget custom-text space-y-5">
                    <a
                      href="#"
                      className="block rounded relative overflow-hidden"
                    >
                      <img
                        src={classes.image}
                        alt=""
                        className="max-w-sm h-full object-cover rounded"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img src="/play.png" alt="" className="w-16 h-16" />
                      </div>
                    </a>

                    <ul className="grid gap-1 md:grid-cols-1">
                      <li className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-b py-2">
                        <div className="flex items-center space-x-2">
                          <MdTimelapse className="inline-flex text-secondary" />
                          <span className="font-semibold text-black dark:text-white">
                            Waktu:
                          </span>
                        </div>
                        <span className="text-base md:text-right sm:ml-auto">
                          Menyesuaikan murid/siswa
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
                          1,5 Jam (2 pertemuan/minggu)
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
                          offline & online
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
                          Indonesia
                        </span>
                      </li>
                    </ul>

                    <h3 className="text-xl font-bold">Rp. {classes.price}</h3>
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
                      className="btn btn-primary w-full py-2 px-6 text-white bg-secondary hover:bg-red-400"
                    >
                      Daftar sekarang
                    </button>
                    <div className="flex space-x-4 items-center pt-3">
                      <span className="font-semibold">Bagikan:</span>
                      <a
                        href="#"
                        className="flex h-8 w-8 bg-blue-500 hover:bg-blue-700 text-white rounded-full items-center justify-center"
                      >
                        <FaFacebook className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
                        className="flex h-8 w-8 bg-blue-400 hover:bg-blue-600 text-white rounded-full items-center justify-center"
                      >
                        <FaTwitter className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
                        className="flex h-8 w-8 bg-green-400 hover:bg-green-600 text-white rounded-full items-center justify-center"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
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
