import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto my-36 px-4 p-1">
      <h1 className="text-5xl font-bold text-center dark:text-white mb-8">
        <span className="text-secondary">Tentang</span> Kami
      </h1>
      <div className="w-20 mx-auto my-5 border-b-2 border-secondary"></div>

      <div className="my-10">
        <h2 className="text-2xl font-bold text-center mb-4 text-secondary">
          Sejarah
        </h2>
        <p className="text-black dark:text-white leading-relaxed text-center font-semibold">
        Dimulai dari kegelisahan orang tua yang mengeluhkan biaya les privat yang mahal serta kesulitan harus mengantar anak-anak ke tempat les. Sebagai solusi, kami menyediakan pembelajaran dengan harga terjangkau dan guru yang datang ke rumah sesuai dengan jadwal yang cocok dengan kesibukan anak-anak.
        </p>
      </div>

      <div className="my-10">
        <h2 className="text-2xl font-bold text-center mb-4 text-secondary">
          Visi
        </h2>
        <p className="text-black dark:text-white leading-relaxed text-center font-semibold">
        Menjadikan anak bangsa pintar dengan belajar di Bimbel & Privat Ayo Pintar.
        </p>
      </div>

      <div className="my-10">
        <h2 className="text-2xl font-bold text-center text-secondary mb-4">
          Misi
        </h2>
        <p className="text-black dark:text-white leading-relaxed text-center font-semibold">
          1.) Menyediakan layanan pendidikan dan pembelajaran terbaik serta terjangkau bagi siswa.
          2.) Memastikan pengajar yang kompeten bagi siswa.
          3.) Menyediakan waktu pembelajaran yang fleksibel.
          4.) Memberikan pengajaran privat di rumah.
          5.) Mengimplementasikan sistem manajemen yang mengutamakan kepuasan pelanggan.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;