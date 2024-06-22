import React from "react";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import { Link } from "react-router-dom";
import Img1 from "../../assets/home/blog/img1.jpg";
import Img2 from "../../assets/home/blog/img2.jpg";
import Img3 from "../../assets/home/blog/img3.jpg";
import Img4 from "../../assets/home/blog/img4.jpg";
import Img5 from "../../assets/home/blog/img5.jpg";
import Img6 from "../../assets/home/blog/img6.jpg";

const Blog = () => {
  const blog = [
    {
      id: 1,
      title:
        "Strategi Efektif dalam Belajar Matematika untuk Anak Sekolah Dasar",
      tags: ["Matematika", "Belajar Efektif", "Sekolah Dasar"],
      date: "June 10, 2024",
      image: Img1,
    },
    {
      id: 2,
      title: "Teknik Menulis Cerita Menarik untuk Siswa Sekolah Menengah",
      tags: ["Menulis", "Kreativitas", "Sekolah Menengah"],
      date: "June 15, 2024",
      image: Img2,
    },
    {
      id: 3,
      title:
        "Strategi Meningkatkan Keterampilan Bahasa Inggris Anak dengan Bimbel",
      tags: ["Bahasa Inggris", "Keterampilan Berbicara", "Bimbel"],
      date: "June 20, 2024",
      image: Img3,
    },
    {
      id: 4,
      title:
        "Penggunaan Teknologi dalam Pembelajaran Fisika di Sekolah Menengah Atas",
      tags: ["Fisika", "Teknologi", "Sekolah Menengah Atas"],
      date: "June 25, 2024",
      image: Img4,
    },
    {
      id: 5,
      title: "Metode Belajar Bahasa Mandarin untuk Anak Usia Dini",
      tags: ["Bahasa Mandarin", "Metode Belajar", "Anak Usia Dini"],
      date: "June 30, 2024",
      image: Img5,
    },
    {
      id: 6,
      title: "Strategi Sukses dalam Belajar IPA untuk Siswa Sekolah Dasar",
      tags: ["IPA", "Belajar Efektif", "Sekolah Dasar"],
      date: "July 5, 2024",
      image: Img6,
    },
  ];

  return (
    <div className="md:w-[80%] mx-auto my-36">
      <h1 className="text-5xl font-bold text-center dark:text-white">
        <span className="text-secondary">Blog</span> Ayo Pintar
      </h1>
      <div className="w-[80%] text-center mx-auto my-4">
        <p className="text-gray-500">
          Berikut ini merupakan dokumentasi pembelajaran dan kelas yang diikuti.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-16 mt-10">
        {blog.map((article) => (
          <Link key={article.id} to={`/blog/${article.id}`} className="block">
            <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-neutral-800 mx-auto transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl">
              <div className="relative overflow-hidden h-44">
                <img
                  className="w-full h-full object-cover object-center absolute top-0 left-0"
                  src={article.image}
                  alt={article.title}
                />
              </div>
              <div className="px-6 py-2">
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-400">{article.date}</span>
                </div>
                <div className="font-bold text-lg dark:text-white">
                  {article.title.length > 50
                    ? `${article.title.substring(0, 50)}...`
                    : article.title}
                </div>
              </div>
              <div className="px-6 pt-2 pb-2">
                <div className="flex flex-wrap">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 dark:bg-neutral-600 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2 transition duration-300 ease-in-out transform hover:scale-110"
                    >
                      <FaTag className="inline mr-1" /> {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/blog/${article.id}`}
                  className="text-secondary hover:underline mb-2 block text-center"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
