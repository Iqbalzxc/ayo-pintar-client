import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto my-36 px-4">
      <h1 className="text-5xl font-bold text-center dark:text-white mb-8">
        <span className="text-secondary">Tentang</span> Kami
      </h1>
      <div className="w-20 mx-auto my-5 border-b-2 border-secondary"></div>

      <div className="my-10">
        <h2 className="text-2xl font-bold text-center dark:text-white mb-4">
          Sejarah
        </h2>
        <p className="text-gray-600 leading-relaxed text-center">
          Ayo Pintar merupakan aplikasi di bidang pendidikan yang dibuat dengan
          tujuan sebagai platform bimbingan belajar. Berdiri pada tahun 2022 di
          Kota Cirebon, Jawa Barat, awalnya sebagai tempat bimbingan belajar
          berbasis offline. Kini, Ayo Pintar telah berkembang menjadi aplikasi
          yang dapat diakses secara online. Kami menyediakan mentor yang ahli
          dan berpengalaman untuk siswa dari berbagai tingkatan pendidikan.
        </p>
      </div>

      <div className="my-10">
        <h2 className="text-2xl font-bold text-center dark:text-white mb-4">
          Visi
        </h2>
        <p className="text-gray-600 leading-relaxed text-center">
          Menjadi platform bimbingan belajar terdepan yang memberikan akses
          pendidikan berkualitas secara online untuk meningkatkan potensi
          akademik dan pengembangan diri siswa di seluruh Indonesia.
        </p>
      </div>

      <div className="my-10">
        <h2 className="text-2xl font-bold text-center dark:text-white mb-4">
          Misi
        </h2>
        <p className="text-gray-600 leading-relaxed text-center">
          Menyediakan pembelajaran yang interaktif dengan menyediakan tutor
          terbaik dan lingkungan belajar yang mendukung pembelajaran siswa.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;