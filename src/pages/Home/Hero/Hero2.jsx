import React from "react";
import { Link } from "react-router-dom";
import bgImg from "../../../assets/home/banner-2.jpg";

// DESIGN START HERO SECTION 2
const Hero2 = () => {
  return (
    <div
      className="min-h-screen bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60">
        <div>
          <div className="space-y-4">
            <p className="md:text-4xl text-2xl">Pilihan <span className="text-secondary">Terbaik</span></p>
            <h1 className="md:text-7xl text-4xl font-bold">
              Bagi Putra-Putri Anda
            </h1>
            <div className="md:w-1/2 text-justify pr-8">
              <p>
              Kami menawarkan pengalaman pembelajaran yang menyenangkan dengan tutor yang kompeten dan telaten. Kami juga menyediakan waktu yang fleksibel serta tutor yang datang ke rumah. Kami memahami bahwa setiap siswa memiliki kebutuhan belajar yang unik, oleh karena itu, kami menyediakan pendekatan yang personal dan adaptif untuk memastikan kesuksesan akademik mereka.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <Link to="/register">
                <button className="px-7 py-3 rounded-lg bg-secondary font-bold uppercase hover:bg-red-600">
                  Daftar Segera!
                </button>
              </Link>
              <Link to="/classes">
                <button className="px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase">
                  Lihat Kelas/Pelajaran
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
