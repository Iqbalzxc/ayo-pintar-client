import React from "react";
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
            <p className="md:text-4xl text-2xl">Pilihan Terbaik Tes 2</p>
            <h1 className="md:text-7xl text-4xl font-bold">
              Bagi Putra-Putri Anda Tes 2
            </h1>
            <div className="md:w-1/2">
              <p>
                Merupakan Bimbel & Privat terbaik di Kota & Kabupaten Cirebon
                yang menawarkan pembelajaran terbaik dan menyenangkan untuk
                semua. Disamping itu, kami menawarkan harga yang terjangkau yang
                sesuai prinsip kami yakni Pendidikan ialah hak untuk semua
                orang.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <button className="px-7 py-3 rounded-lg bg-secondary font-bold uppercase">
                Daftar Segera!
              </button>
              <button className="px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase">
                Lihat Kelas/Pelajaran
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
