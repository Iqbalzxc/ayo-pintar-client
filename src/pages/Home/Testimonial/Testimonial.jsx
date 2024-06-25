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
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente",
    image: People1,
    name: "People 1",
    school: "Universitas Indonesia",
  },
  {
    id: 2,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente",
    image: People2,
    name: "People 2",
    school: "Institut Teknologi Bandung",
  },
  {
    id: 3,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta",
    image: People3,
    name: "People 3",
    school: "Universitas Gadjah Mada",
  },
  {
    id: 4,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta qua",
    image: People1,
    name: "People 4",
    school: "SMP Negeri 1 Jakarta",
  },
  {
    id: 5,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse",
    image: People2,
    name: "People 5",
    school: "SMA Negeri 8 Jakarta",
  },
  {
    id: 6,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit",
    image: People3,
    name: "People 6",
    school: "SD Negeri 1 Surabaya",
  },
  {
    id: 7,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo",
    image: People1,
    name: "People 7",
    school: "Universitas Airlangga",
  },
  {
    id: 8,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo",
    image: People2,
    name: "People 8",
    school: "SMP Negeri 2 Bandung",
  },
  {
    id: 9,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum,",
    image: People3,
    name: "People 9",
    school: "SMA Negeri 3 Bandung",
  },
];

const Testimonial = () => {
  return (
    <div className="md:w-[80] mx-auto my-36">
      <h1 className="text-5xl font-bold text-center dark:text-white">
        Testimonial
      </h1>
      <div className="w-[40%] text-center mx-auto my-4 mb-9">
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <Swiper
        style={{
          "--swiper-navigation-color": "#F97777",
          "--swiper-pagination-color": "#F97777",
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
            className="shadow-md bg-slate-50 dark:bg-zinc-900 rounded-lg px-8 mx-auto w-72 md:w-auto mb-2"
          >
            <div className="rounded-lg p-5 mb-2">
              <div className="h-40 pr-5 overflow-y-auto">
                <p className="text-base text-justify font-semibold text-gray-800 dark:text-gray-300 mt-5">
                  "{testimonial.desc}"
                </p>
              </div>
              <hr className="border-gray-300 dark:border-gray-600 my-2" />
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-full w-14 h-14 mr-4"
                />
                <div>
                  <h5 className="text-base font-semibold text-gray-800 dark:text-slate-300">
                    {testimonial.name}
                  </h5>
                  <p className="text-sm font-semibold text-gray-500">
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
