import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { DialogActions } from "@mui/material";
import { AiOutlineCheck } from "react-icons/ai";
import {
  FaBook,
  FaLanguage,
  FaLevelUpAlt,
  FaTimes,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { GiClassicalKnowledge } from "react-icons/gi";
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

        <div className="nav-tab-wrapper tabs section-padding mt-8 bg-gray-100 dark:bg-neutral-700 shadow-md rounded-lg">
          <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-6 md:gap-8px">
              {/* THIS LEFT */}
              <div className="lg:col-span-8 col-span-12">
                <div className="single-course-details">
                  <div className="xl:h-[470] h-[350px] mb-10 course-main-thumb">
                    <img
                      src={classes?.image}
                      alt="image.jpg"
                      className="rounded-md object-full w-full h-full block"
                    />
                  </div>
                  <h2 className="text-2xl mb-2">{classes?.name}</h2>

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

                  <div className="nav-tab-wrapper mt-12">
                    <ul id="tabs-nav" className="course-tab mb-8">
                      <li className="active">
                        <a href="#tab1"></a>
                      </li>
                      <li className="active">
                        <a href="#tab2"></a>
                      </li>
                      <li className="active">
                        <a href="#tab3"></a>
                      </li>
                      <li className="active">
                        <a href="#tab4"></a>
                      </li>
                    </ul>

                    <div id="tabs-content">
                      <div id="tab1" className="tab-content">
                        <div>
                          <h3 className="text-2xl mt-8">Deskripsi kelas</h3>
                          <p className="mt-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Magni, officiis perferendis? Deserunt animi
                            nisi assumenda est eius delectus tempore omnis! Sint
                            perferendis, vitae provident illo laboriosam totam
                            eligendi eius voluptatum.
                          </p>
                          <div className="bg-[#F8F8F8] dark:bg-pink-500 space-y-6 p-8 rounded-md my-8">
                            <h4 className="text-2xl">Apa yang kamu pelajari</h4>
                            <ul className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                              <li className="flex space-x-3">
                                <div className="text-xl flex-none relative top-1 text-green-500">
                                  <AiOutlineCheck />
                                </div>
                                <div className="flex-1">Bagaimana belajar</div>
                              </li>
                              <li className="flex space-x-3">
                                <div className="text-xl flex-none relative top-1 text-green-500">
                                  <AiOutlineCheck />
                                </div>
                                <div className="flex-1">Bagaimana belajar</div>
                              </li>
                              <li className="flex space-x-3">
                                <div className="text-xl flex-none relative top-1 text-green-500">
                                  <AiOutlineCheck />
                                </div>
                                <div className="flex-1">Bagaimana belajar</div>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-2xl">Apa yang kamu pelajari</h4>
                            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
                              <div className="bg-white dark:bg-zinc-800 rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                <span className="flex-none">
                                  <img src="/logo.png" alt="logo.jpg" />
                                </span>
                                <span className="flex-1 text-black dark:text-white">
                                  Pelajari bidang 1
                                </span>
                              </div>

                              <div className="bg-white dark:bg-zinc-800 rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                <span className="flex-none">
                                  <img src="/logo.png" alt="logo.jpg" />
                                </span>
                                <span className="flex-1 text-black dark:text-white">
                                  Pelajari bidang 2
                                </span>
                              </div>

                              <div className="bg-white dark:bg-zinc-800 rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                <span className="flex-none">
                                  <img src="/logo.png" alt="logo.jpg" />
                                </span>
                                <span className="flex-1 text-black dark:text-white">
                                  Pelajari bidang 2
                                </span>
                              </div>

                              <div className="bg-white dark:bg-zinc-800 rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                <span className="flex-none">
                                  <img src="/logo.png" alt="logo.jpg" />
                                </span>
                                <span className="flex-1 text-black dark:text-white">
                                  Pelajari bidang 3
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div id="tab2" className="tab-content">
                        <div>
                          <h3 className="text-2xl mt-8">Plan belajar</h3>
                          <p className="mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Sint voluptatum quaerat praesentium modi ex
                            itaque porro eum quas repudiandae inventore nisi,
                            numquam officiis a blanditiis. Possimus quis
                            asperiores eveniet sequi!.
                            <br /> <br /> Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Tempora doloribus debitis, ut
                            nulla aut laboriosam aliquam itaque maxime quisquam
                            numquam!
                          </p>
                          <div className="bg-[#F8F8F8] dark:bg-pink-500 space-y-6 p-8 rounded-md my-8">
                            <h4 className="text-2xl">
                              Kelas atau pelajaran ini cocok untuk pemula
                            </h4>
                          </div>

                          <div>
                            <h4 className="text-2xl">Apa yang kamu pelajari</h4>
                            <p className="mt-4">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Dolores odit laudantium
                              similique nobis nesciunt perferendis molestiae
                              sint, quasi suscipit veniam.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* THIS RIGHT */}
              <div className="container mx-auto">
                <div className="flex flex-wrap -mx-1">
                  <div className="lg:col-span-8 col-span-12 mt-8 md:mt-0">
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
                        <h3 className="text-xl font-bold">
                          Rp. {classes.price}
                        </h3>
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
                        <ul className="grid gap-1 md:grid-cols-1">
                          <li className="flex justify-between items-center border-t border-b py-2">
                            <div className="flex items-center space-x-3">
                              <FaUser className="inline-flex text-secondary" />
                              <span className="font-semibold text-black dark:text-white">
                                Tutor :
                              </span>
                            </div>
                            <span className="text-base">
                              {classes.tutorName}
                            </span>
                          </li>
                          <li className="flex justify-between items-center border-t border-b py-2">
                            <div className="flex items-center space-x-3">
                              <FaUsers className="inline-flex text-secondary" />
                              <span className="font-semibold text-black dark:text-white">
                                Siswa terdaftar:
                              </span>
                            </div>
                            <span className="text-base">
                              {classes.totalEnrolled}
                            </span>
                          </li>
                          <li className="flex justify-between items-center border-t border-b py-2">
                            <div className="flex items-center space-x-3">
                              <MdTimelapse className="inline-flex text-secondary" />
                              <span className="font-semibold text-black dark:text-white">
                                Waktu:
                              </span>
                            </div>
                            <span className="text-base">
                              Menyesuaikan murid/siswa
                            </span>
                          </li>
                          <li className="flex justify-between items-center border-t border-b py-2">
                            <div className="flex items-center space-x-3">
                              <MdTimeline className="inline-flex text-secondary" />
                              <span className="font-semibold text-black dark:text-white">
                                Durasi:
                              </span>
                            </div>
                            <span className="text-base">
                              1,5 Jam (2 pertemuan/minggu)
                            </span>
                          </li>
                          <li className="flex justify-between items-center border-t border-b py-2">
                            <div className="flex items-center space-x-3">
                              <FaBook className="inline-flex text-secondary" />
                              <span className="font-semibold text-black dark:text-white">
                                Metode:
                              </span>
                            </div>
                            <span className="text-base">offline & online</span>
                          </li>
                          <li className="flex justify-between items-center border-t border-b py-2">
                            <div className="flex items-center space-x-3">
                              <FaLevelUpAlt className="inline-flex text-secondary" />
                              <span className="font-semibold text-black dark:text-white">
                                Jenjang pendidikan:
                              </span>
                            </div>
                            <span className="text-base">TK, SD, SMP & SMA</span>
                          </li>
                          <li className="flex justify-between items-center border-t border-b py-2">
                            <div className="flex items-center space-x-3">
                              <FaLanguage className="inline-flex text-secondary" />
                              <span className="font-semibold text-black dark:text-white">
                                Bahasa:
                              </span>
                            </div>
                            <span className="text-base">Indonesia</span>
                          </li>
                        </ul>

                        <div className="flex space-x-4 items-center pt-3">
                          <span className="font-semibold">Dibagikan:</span>
                          {[...Array(4)].map((_, index) => (
                            <a href="#" key={index} className="flex h-10 w-10">
                              <img
                                src="/logo.png"
                                alt=""
                                className="w-full h-full object-cover rounded"
                              />
                            </a>
                          ))}
                        </div>
                      </div>

                      <div className="widget p-4 bg-white dark:bg-zinc-800 rounded shadow-md">
                        <h4 className="widget-title text-lg font-bold mb-4">
                          Kelas terkait
                        </h4>
                        <ul className="space-y-4">
                          <li className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                            <div className="w-20 h-20 rounded overflow-hidden">
                              <img
                                src={bannerImg1}
                                alt="Kelas terkait"
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-black">
                                Passion di
                              </div>
                              <span className="text-secondary font-semibold">
                                1.000.000
                              </span>
                            </div>
                          </li>
                          <li className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                            <div className="w-20 h-20 rounded overflow-hidden">
                              <img
                                src={bannerImg2}
                                alt="Kelas terkait"
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-black">
                                Passion di
                              </div>
                              <span className="text-secondary font-semibold">
                                1.000.000
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0"></div>
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
