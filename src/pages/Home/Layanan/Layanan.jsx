import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import Layanan1 from "../../../assets/home/layanan/layanan-1.jpg";
import Layanan2 from "../../../assets/home/layanan/layanan-2.jpg";
import Layanan3 from "../../../assets/home/layanan/layanan-3.jpg";

SwiperCore.use([Pagination, Navigation]);

const layananData = [
  {
    id: 1,
    description:
      "Di Bimbel Ayo Pintar, kami menawarkan akses ke tutor-tutor favorit yang berkualitas. Para tutor kami dipilih secara ketat berdasarkan pengalaman & keahlian.",
    image: Layanan1,
    name: "Tutor Favorit Berkualitas",
    category: "Pendidikan",
  },
  {
    id: 2,
    description:
      "Kami menyediakan berbagai kelas untuk setiap tingkatan pendidikan mulai dari TK, SD hingga SMA, yang dirancang untuk memenuhi kebutuhan belajar siswa secara komprehensif.",
    image: Layanan2,
    name: "Beragam Kelas Berkualitas",
    category: "Smart",
  },
  {
    id: 3,
    description:
      "Solusi teknologi kami menyediakan platform pembelajaran online yang interaktif dan mudah digunakan.",
    image: Layanan3,
    name: "Platform Pembelajaran Online",
    category: "Online Learning",
  },
];

const Layanan = () => {
  return (
    <div className="max-w-full mx-auto my-36 px-4">
      <h1 className="text-5xl font-bold text-center dark:text-white">
        <span className="text-secondary">Layanan</span> Kami
      </h1>
      <div className="w-[40%] text-center mx-auto my-4 mb-9">
        <p className="text-gray-500">Temukan layanan kami yang menarik</p>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={8}
        pagination={{ clickable: true }}
        navigation={true}
        allowTouchMove={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          992: { slidesPerView: 2, spaceBetween: 50 },
          1200: { slidesPerView: 3, spaceBetween: 50 },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {layananData.map((layanan) => (
          <SwiperSlide
            key={layanan.id}
            className="shadow-md bg-gray-100 dark:bg-zinc-900 rounded-lg px-8 mx-auto w-full md:w-72 mb-2"
          >
            <div className="rounded-lg p-5 mb-2">
              <div className="h-52 pr-5 overflow-y-auto mt-2">
                <p className="text-lg text-justify font-semibold text-gray-800 dark:text-gray-300">
                  "{layanan.description}"
                </p>
              </div>
              <hr className="border-gray-300 dark:border-gray-600 mb-3" />
              <div className="flex items-center">
                <img
                  src={layanan.image}
                  alt={layanan.name}
                  className="rounded-full w-14 h-15 mr-4"
                />
                <div>
                  <h5 className="text-lg font-semibold text-gray-800 dark:text-slate-300">
                    {layanan.name}
                  </h5>
                  <p className="font-semibold text-gray-600">
                    {layanan.category}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Layanan;
