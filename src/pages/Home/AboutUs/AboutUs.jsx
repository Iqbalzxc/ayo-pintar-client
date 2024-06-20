import React from "react";

const AboutUs = () => {
  return (
    <div className="md:w-[80%] mx-auto my-32">
      <h1 className="text-4xl font-bold text-center dark:text-white">
        <span className="text-secondary">Tentang</span> Kami
        <div className="w-[30%] mx-auto my-5"></div>
        <p className="text-gray-500 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </h1>

      <div className="md:w-[100%] mx-auto my-10">
        <h1 className="text-2xl font-bold dark:text-white">Sejarah</h1>

        <div className="w-[100%] mx-auto my-1">
          <p className="text-gray-500">
            Ayo Pintar merupakan aplikasi dibidang pendidikan yang dibuat dengan
            tujuan sebagai platfrom bimbingan belajar, Awal Berdiri pada tahun
            2022 atau satu setengah tahun lalu tepatnya di Kota Cirebon Jawa
            Barat, saat pertama kali dibuat, Ayo Pintar merupakan sebuah tempat
            bimbingan belajar berbasis luring, kini sudah berkembang dan dapat
            diakses lewat aplikasi. Ayo Pintar juga menyediakan mentor mentor
            yang berpengalaman dari kalangan mahasiswa yang ahli dalam mengajar.
            Ayo Pintar diperuntukan bagi siswa dari TK, SD, SMP, dan SMA.
          </p>

          <div className="md:w-[100%] mx-auto my-10">
            <h1 className="text-2xl font-bold dark:text-white">Visi</h1>

            <div className="w-[100%] mx-auto my-1">
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>

              <div className="md:w-[100%] mx-auto my-10">
                <h1 className="text-2xl font-bold dark:text-white">Misi</h1>

                <div className="w-[100%] mx-auto my-1">
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
