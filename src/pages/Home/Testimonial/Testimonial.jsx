import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import People1 from "../../../assets/home/testimonial/people-1.jpg";
import People2 from "../../../assets/home/testimonial/people-2.jpg";
import People3 from "../../../assets/home/testimonial/people-3.jpg";
import SwiperCore, { Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Pagination, Navigation]);

const testimonialData = [
  {
    id: 1,
    desc: "Berkat Ayo Pintar anak saya lolos masuk ke SMA yang diinginkannya",
    image: People1,
    name: "Azzura Starlee",
    school: "SMAN 1 Cirebon",
  },
  {
    id: 2,
    desc: "Alhamdulillah, anak saya senang sekali belajar di Ayo Pintar karena tutornya sangat menyenangkan dalam mengajar",
    image: People2,
    name: "Boedi",
    school: "SMPN 1 Cirebon",
  },
  {
    id: 3,
    desc: "Terima kasih Ayo Pintar. Mimpi saya sekarang terwujud menggapai PTN impian",
    image: People3,
    name: "Raden Surya",
    school: "UIN SSC Cirebon",
  },
  {
    id: 4,
    desc: "Terima kasih Ayo Pintar. Mimpi anak saya sekarang terwujud menggapai PTN impiannya",
    image: People1,
    name: "Evi",
    school: "Universitas Singaperbangsa Karawang",
  },
];

const Testimonial = () => {
  return (
    <div className="md:w-[80] mx-auto my-36">
      <h1 className="text-5xl font-bold text-center text-secondary dark:text-secondary">
        Testimoni
      </h1>
      <div className="w-[40%] text-center mx-auto my-4 mb-9">
        <p className="text-black dark:text-white">
          Berikut testimoni dari pengguna Ayo Pintar
        </p>
      </div>

      <Swiper
        style={{
          "--swiper-navigation-color": "#f1f1f1",
          "--swiper-pagination-color": "#f1f1f1",
        }}
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
        {testimonialData.map((testimonial) => (
          <SwiperSlide
            key={testimonial.id}
            className="shadow-md bg-secondary dark:bg-zinc-900 rounded-lg px-8 mx-auto w-72 md:w-auto mb-2"
          >
            <div className="rounded-lg p-5 mb-2">
              <div className="h-52 pr-5 overflow-y-auto mt-2 ">
                <p className="text-lg text-justify font-semibold text-white dark:text-white">
                  "{testimonial.desc}"
                </p>
              </div>
              <hr className="border-white dark:border-white" />
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-full w-14 h-15 mr-4"
                />
                <div>
                  <h5 className="text-lg font-semibold text-white dark:text-white">
                    {testimonial.name}
                  </h5>
                  <p className="font-semibold text-white">
                    {testimonial.school}
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

export default Testimonial;
