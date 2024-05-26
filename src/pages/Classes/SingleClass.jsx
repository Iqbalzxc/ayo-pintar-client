import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { DialogActions } from "@mui/material";
import { FaBook, FaLanguage, FaLevelUpAlt, FaTimes, FaUser, FaUsers } from "react-icons/fa";
import { GiClassicalKnowledge } from "react-icons/gi";
import { MdBookOnline, MdTimelapse, MdTimeline } from "react-icons/md";
import bannerImg1 from "../../assets/home/banner-1.jpg";
import bannerImg2 from "../../assets/home/banner-2.jpg";

const SingleClass = () => {
  const lesson = useLoaderData();
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
              return navigate('/classes')
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

        <div className="nav-tab-wrapper tabs section-padding mt-8 bg-gray-100 shadow-md rounded-lg">
          <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-6 md:gap-8">


              {/* THIS LEFT */}
              <div className="lg:col-span-8 col-span-12">
                <div className="single-course-details">
                  <div className="xl:h-[470] h-[350px] mb-10 course-main-thumb">
                    <img
                      src={lesson?.image}
                      alt="image.jpg"
                      className="rounded-md object-full w-full h-full block"
                    />
                  </div>
                  <h2 className="text-2xl mb-2">{lesson?.name}</h2>

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
                          <a href="#" className="text-black">
                            : {lesson.tutorName}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className="text-secondary">
                        Update terakhir:
                        <a href="#" className="text-black ml-1">
                          {new Date(lesson.submitted).toLocaleDateString()}
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
                                <div className="flex-none relative top-1">
                                  <img src="/correct-mark.png" alt="" />
                                </div>
                                <div className="flex-1">Bagaimana belajar</div>
                              </li>

                              <li className="flex space-x-3">
                                <div className="flex-none relative top-1">
                                  <img src="/correct-mark.png" alt="" />
                                </div>
                                <div className="flex-1">Bagaimana belajar</div>
                              </li>

                              <li className="flex space-x-3">
                                <div className="flex-none relative top-1">
                                  <img src="/correct-mark.png" alt="" />
                                </div>
                                <div className="flex-1">Bagaimana belajar</div>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-2xl">Apa yang kamu pelajari</h4>
                            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
                              <div className="bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                <span className="flex-none">
                                  <img src="/logo.png" alt="logo.jpg" />
                                </span>
                                <span className="flex-1 text-black">
                                  Pelajari bidang 1
                                </span>
                              </div>

                              <div className="bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                <span className="flex-none">
                                  <img src="/logo.png" alt="logo.jpg" />
                                </span>
                                <span className="flex-1 text-black">
                                  Pelajari bidang 2
                                </span>
                              </div>

                              <div className="bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                <span className="flex-none">
                                  <img src="/logo.png" alt="logo.jpg" />
                                </span>
                                <span className="flex-1 text-black">
                                  Pelajari bidang 2
                                </span>
                              </div>

                              <div className="bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                <span className="flex-none">
                                  <img src="/logo.png" alt="logo.jpg" />
                                </span>
                                <span className="flex-1 text-black">
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
              <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0"></div>
              <div className="sidebarWrapper space-y-[30px]">
                <div className="widget custom-text space-y-5">
                  <a className="h-[220px] rounded relative block" href="#">
                    <img
                      src={lesson.image}
                      alt=""
                      className="block w-full h-full object-cover rounded"
                    />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <img src="/play.png" alt="" />
                    </div>
                  </a>
                  <h3>{lesson.price}</h3>
                  <button
                    onClick={() => handleSelect(lesson._id)}
                    title={
                      role === "admin" || role === "tutor"
                        ? "Tutor/Admin tidak bisa memilih"
                          ? lesson.availableSeats < 1
                          : "Tidak ada kelas tersedia"
                        : "Kamu dapat memilih kelas"
                    }
                    disabled={
                      role === "admin" ||
                      role === "tutor" ||
                      lesson.availableSeats < 1
                    }
                    className="btn btn-primary w-full text-center bg-secondary py-2 px-6 text-white"
                  >
                    Daftar sekarang
                  </button>
                  <ul className="list">
                    <li className="flex space-x-3 border-b border-gray-200 mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
                      <div className="flex-1 space-x-3 flex items-center">
                        <FaUser className="inline-flex" />
                        <div className="text-black font-semibold">Tutor</div>
                      </div>
                      <div className="flex-none">{lesson.tutorName}</div>
                    </li>

                    <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                      <div className="flex-1 space-x-3 flex items-center">
                        <FaUsers className="inline-flex" />
                        <div className="text-black font-semibold">
                          Siswa terdaftar
                        </div>
                      </div>
                      <div className="flex-none">{lesson.totalEnrolled}</div>
                    </li>

                    <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                      <div className="flex-1 space-x-3 flex items-center">
                        <MdTimelapse className="inline-flex" />
                        <div className="text-black font-semibold">Waktu</div>
                      </div>
                      <div className="flex-none">
                        Menyesuaikan kebutuhan murid/siswa
                      </div>
                    </li>

                    <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                      <div className="flex-1 space-x-3 flex items-center">
                        <MdTimeline className="inline-flex" />
                        <div className="text-black font-semibold">Durasi</div>
                      </div>
                      <div className="flex-none">
                        1,5 Jam (2 pertemuan/minggu)
                      </div>
                    </li>

                    <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                      <div className="flex-1 space-x-3 flex items-center">
                        <FaBook className="inline-flex" />
                        <div className="text-black font-semibold">Metode</div>
                      </div>
                      <div className="flex-none">
                        Tatap muka & bisa request via online
                      </div>
                    </li>

                    <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                      <div className="flex-1 space-x-3 flex items-center">
                        <FaLevelUpAlt className="inline-flex" />
                        <div className="text-black font-semibold">
                          Jenjang pendidikan
                        </div>
                      </div>
                      <div className="flex-none">TK, SD, SMP & SMA</div>
                    </li>

                    <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                      <div className="flex-1 space-x-3 flex items-center">
                        <FaLanguage className="inline-flex" />
                        <div className="text-black font-semibold">Bahasa</div>
                      </div>
                      <div className="flex-none">Indonesia</div>
                    </li>
                  </ul>

                  <ul className="flex space-x-4 items-center pt-3">
                    <li className="text-black font-semibold">Dibagikan</li>
                    <li>
                      <a href="#" className="flex h-10 w-10">
                        <img src="/logo.png" alt="" />
                      </a>
                    </li>

                    <li>
                      <a href="#" className="flex h-10 w-10">
                        <img src="/logo.png" alt="" />
                      </a>
                    </li>

                    <li>
                      <a href="#" className="flex h-10 w-10">
                        <img src="/logo.png" alt="" />
                      </a>
                    </li>

                    <li>
                      <a href="#" className="flex h-10 w-10">
                        <img src="/logo.png" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="widget">
                  <h4 className="widget-title">Kelas terkait</h4>
                  <ul className="list">
                    <li className="flex space-x-4 border-[#ECECEC] mb-6 pb-6 last:pb-0 last:mb-0 last:border-0 border-b">
                      <div className="flex-none">
                        <div className="h-20 w-20 rounded">
                          <img
                            src={bannerImg1}
                            alt=""
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex space-x-3 mb-2">
                          <iconify-icon
                            icon="heroicons:star-20-solid"
                            className="text-tertiary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="heroicons:star-20-solid"
                            className="text-tertiary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="heroicons:star-20-solid"
                            className="text-tertiary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="heroicons:star-20-solid"
                            className="text-tertiary"
                          ></iconify-icon>
                          <iconify-icon
                            icon="heroicons:star-20-solid"
                            className="text-tertiary"
                          ></iconify-icon>
                        </div>
                        <div className="mb-1 font-semibold text-black">
                          Pasion di
                        </div>
                        <span className="text-secondary font-semibold">
                          1.000.000
                        </span>
                      </div>
                    </li>

                    <li className="flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
                      <div className="flex-none">
                        <div className="h-20 w-20 rounded">
                          <img
                            src={bannerImg2}
                            alt=""
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="mb-1 font-semibold text-black">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleClass;