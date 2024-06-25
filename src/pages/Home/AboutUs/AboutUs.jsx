import React from "react";

const AboutUs = () => {
  return (
    <div className="md:w-[80%] mx-auto my-32">
      <h1 className="text-4xl font-bold text-center dark:text-white">
        <span className="text-secondary">Tentang</span> Kami
      </h1>
      <div className="w-[30%] mx-auto my-5 border-b-2 border-secondary"></div>

      <div className="md:w-[100%] mx-auto my-10">
        <h2 className="text-2xl font-bold text-center dark:text-white mb-4">
          Sejarah
        </h2>
        <p className="text-gray-600 text-center leading-relaxed">
          Ayo Pintar merupakan aplikasi di bidang pendidikan yang dibuat dengan
          tujuan sebagai platform bimbingan belajar. Berdiri pada tahun 2022 di
          Kota Cirebon, Jawa Barat, awalnya sebagai tempat bimbingan belajar
          berbasis offline. Kini, Ayo Pintar telah berkembang menjadi aplikasi
          yang dapat diakses secara online. Kami menyediakan mentor yang ahli
          dan berpengalaman untuk siswa dari berbagai tingkatan pendidikan.
        </p>
      </div>

      <div className="md:w-[100%] mx-auto my-10">
        <h2 className="text-2xl font-bold text-center dark:text-white mb-4">
          Visi
        </h2>
        <p className="text-gray-600 text-center leading-relaxed">
          Mencerdaskan kehidupan bangsa Indonesia
        </p>
      </div>

      <div className="md:w-[100%] mx-auto my-10">
        <h2 className="text-2xl font-bold text-center dark:text-white mb-4">
          Misi
        </h2>
        <p className="text-gray-600 text-center leading-relaxed">
          Menyediakan pembelajaran yang interaktif tanpa membuat ngantuk dengan
          menyediakan tutor terbaik dan lingkungan belajar yang mendukung
          pembelajaran siswa
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
