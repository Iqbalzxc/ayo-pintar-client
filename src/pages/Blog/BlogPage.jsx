import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCalendarAlt, FaTag, FaShareAlt, FaArrowLeft } from "react-icons/fa";
import { SiWhatsapp, SiFacebook, SiTelegram, SiTwitter } from "react-icons/si";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import img1 from "../../assets/home/blog/img1.jpg";
import img2 from "../../assets/home/blog/img2.jpg";
import img3 from "../../assets/home/blog/img3.jpg";
import img4 from "../../assets/home/blog/img4.jpg";
import img5 from "../../assets/home/blog/img5.jpg";
import img6 from "../../assets/home/blog/img6.jpg";

SwiperCore.use([Pagination]);

const articles = [
  {
    id: 1,
    title: "Strategi Efektif dalam Belajar Matematika untuk Anak Sekolah Dasar",
    tags: ["Matematika", "Belajar Efektif", "Sekolah Dasar"],
    date: "June 10, 2024",
    content:
      "Belajar matematika bisa menjadi menyenangkan dengan strategi yang tepat. Artikel ini membahas beberapa metode yang bisa Anda coba untuk membantu anak Anda belajar matematika dengan lebih efektif. Mulai dari penggunaan permainan edukatif hingga teknik belajar kelompok, temukan cara-cara menarik untuk mengajarkan matematika kepada anak Anda. Pastikan anak memiliki waktu yang cukup untuk beristirahat, bermain, dan belajar dengan seimbang. Menggunakan alat bantu visual seperti gambar dan diagram juga dapat mempermudah anak dalam memahami konsep matematika yang kompleks.",
    image: img1,
  },
  {
    id: 2,
    title: "Teknik Menulis Cerita Menarik untuk Siswa Sekolah Menengah",
    tags: ["Menulis", "Kreativitas", "Sekolah Menengah"],
    date: "June 15, 2024",
    content:
      "Menulis cerita tidak hanya membutuhkan imajinasi, tetapi juga teknik yang baik. Temukan cara untuk menulis cerita yang menarik dan memikat pembaca. Artikel ini membahas beberapa teknik penting dalam menulis cerita, termasuk penggunaan dialog yang efektif, pengembangan karakter, dan pembuatan plot yang menarik. Penting juga untuk membaca banyak buku dan memperhatikan gaya penulisan penulis terkenal. Menggunakan peta pikiran untuk merencanakan cerita sebelum mulai menulis dapat membantu menyusun alur cerita yang koheren dan menarik.",
    image: img2,
  },
  {
    id: 3,
    title:
      "Strategi Meningkatkan Keterampilan Bahasa Inggris Anak dengan Bimbel",
    tags: ["Bahasa Inggris", "Keterampilan Berbicara", "Bimbel"],
    date: "June 20, 2024",
    content:
      "Bimbingan belajar dapat membantu anak meningkatkan keterampilan bahasa Inggris mereka dengan lebih efektif. Simak tips berikut tentang bagaimana bimbel bisa menjadi solusi terbaik untuk meningkatkan kemampuan berbicara, menulis, dan memahami bahasa Inggris. Memanfaatkan media interaktif seperti video dan aplikasi belajar bahasa dapat membuat proses belajar menjadi lebih menyenangkan. Selain itu, penting untuk anak sering berlatih berbicara dengan teman atau guru untuk meningkatkan kepercayaan diri dalam menggunakan bahasa Inggris secara aktif.",
    image: img3,
  },
  {
    id: 4,
    title:
      "Penggunaan Teknologi dalam Pembelajaran Fisika di Sekolah Menengah Atas",
    tags: ["Fisika", "Teknologi", "Sekolah Menengah Atas"],
    date: "June 25, 2024",
    content:
      "Teknologi dapat menjadi alat yang hebat dalam mengajar fisika. Artikel ini membahas beberapa cara penggunaan teknologi di kelas fisika, termasuk penggunaan simulasi komputer, video pembelajaran, dan alat peraga digital untuk membuat pembelajaran lebih interaktif dan menarik. Menggunakan aplikasi simulasi dapat membantu siswa memahami konsep yang abstrak dengan cara yang lebih konkret. Selain itu, melakukan eksperimen virtual dapat memberikan pengalaman belajar yang mendalam tanpa memerlukan peralatan yang mahal atau berbahaya.",
    image: img4,
  },
  {
    id: 5,
    title: "Metode Belajar Bahasa Mandarin untuk Anak Usia Dini",
    tags: ["Bahasa Mandarin", "Metode Belajar", "Anak Usia Dini"],
    date: "June 30, 2024",
    content:
      "Mengajarkan bahasa Mandarin pada anak usia dini memerlukan metode yang tepat. Temukan beberapa metode yang bisa Anda coba untuk membantu anak belajar bahasa Mandarin dengan cara yang menyenangkan dan efektif. Dari penggunaan lagu hingga permainan edukatif, artikel ini akan memberi Anda banyak ide. Menggunakan cerita dan buku bergambar juga dapat membuat proses belajar lebih menarik bagi anak. Konsistensi dalam penggunaan bahasa Mandarin di rumah sehari-hari juga sangat penting untuk meningkatkan kemampuan bahasa anak.",
    image: img5,
  },
  {
    id: 6,
    title: "Strategi Sukses dalam Belajar IPA untuk Siswa Sekolah Dasar",
    tags: ["IPA", "Belajar Efektif", "Sekolah Dasar"],
    date: "July 5, 2024",
    content:
      "Belajar IPA bisa menjadi tantangan bagi siswa SD. Berikut adalah beberapa strategi yang bisa membantu mereka sukses. Mulai dari eksperimen sederhana hingga metode belajar visual, artikel ini akan memberikan banyak tips yang bisa langsung diterapkan di rumah atau di kelas. Menggunakan benda-benda sehari-hari dalam eksperimen dapat membuat pembelajaran lebih relevan dan menarik bagi siswa. Selain itu, mengajarkan konsep IPA melalui cerita atau film edukatif dapat membantu anak memahami materi dengan lebih baik.",
    image: img6,
  },
];

const BlogPage = () => {
  const { id } = useParams();
  const article = articles.find((article) => article.id === parseInt(id));

  if (!article) {
    return <div>Artikel tidak ditemukan.</div>;
  }

  const [showShareButtons, setShowShareButtons] = useState(false);

  const toggleShareButtons = () => {
    setShowShareButtons(!showShareButtons);
  };

  const recommendedArticles = articles.filter(
    (article) => article.id !== parseInt(id)
  );

  const shareArticle = (platform) => {
    switch (platform) {
      case "whatsapp":
        alert("Sharing on WhatsApp");
        break;
      case "facebook":
        alert("Sharing on Facebook");
        break;
      case "telegram":
        alert("Sharing on Telegram");
        break;
      case "twitter":
        alert("Sharing on Twitter");
        break;
      default:
        break;
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-36 p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-lg">
      <div className="mb-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-secondary hover:text-red-700 focus:outline-none"
        >
          <FaArrowLeft className="mr-2" /> Kembali
        </button>
      </div>
      <h1 className="text-4xl md:text-3xl sm:text-2xl font-bold dark:text-white mb-4">
        {article.title}
      </h1>
      <div className="flex items-center mb-6">
        <FaCalendarAlt className="text-gray-500 mr-2" />
        <span className="text-sm text-gray-400">{article.date}</span>
      </div>
      <img
        className="w-full h-64 object-cover object-center mb-6 rounded"
        src={article.image}
        alt={article.title}
      />
      <div className="flex flex-wrap mb-6">
        {article.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 dark:bg-neutral-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2"
          >
            <FaTag className="inline mr-1" /> {tag}
          </span>
        ))}
      </div>
      <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        {article.content}
      </p>
      <div className="flex justify-end items-center mt-6">
        <div className="flex items-center">
          <span
            className="text-secondary hover:text-red-500 cursor-pointer"
            onClick={toggleShareButtons}
          >
            <FaShareAlt className="inline-block mr-2" />
            Bagikan
          </span>
          {showShareButtons && (
            <div className="flex space-x-2 text-xl ml-3">
              <button
                onClick={() => shareArticle("whatsapp")}
                className="text-green-700 hover:text-green-300 focus:outline-none transition duration-300"
              >
                <SiWhatsapp className="inline-block" />
              </button>
              <button
                onClick={() => shareArticle("facebook")}
                className="text-blue-800 hover:text-blue-300 focus:outline-none transition duration-300"
              >
                <SiFacebook className="inline-block" />
              </button>
              <button
                onClick={() => shareArticle("telegram")}
                className="text-cyan-600 hover:text-cyan-300 focus:outline-none transition duration-300"
              >
                <SiTelegram className="inline-block" />
              </button>
              <button
                onClick={() => shareArticle("twitter")}
                className="text-cyan-500 hover:text-cyan-300 focus:outline-none transition duration-300"
              >
                <SiTwitter className="inline-block" />
              </button>
            </div>
          )}
        </div>
      </div>
      <hr className="mt-10" />

      {/* Bagian Rekomendasi Artikel */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white mt-4">
        Artikel Lainnya:
      </h2>
      <Swiper
        style={{
          "--swiper-pagination-color": "#F97777",
        }}
        spaceBetween={10}
        slidesPerView={3}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {recommendedArticles.map((article) => (
          <SwiperSlide key={article.id}>
            <Link key={article.id} to={`/blog/${article.id}`} className="block">
              <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-neutral-800 mx-auto hover:shadow-xl mb-10">
                <div className="relative overflow-hidden h-40">
                  <img
                    className="w-full h-full object-cover object-center absolute top-0 left-0"
                    src={article.image}
                    alt={article.title}
                  />
                </div>
                <div className="px-3 py-2">
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="text-gray-500 mr-2 text-xs" />
                    <span className="text-xs text-gray-400">
                      {article.date}
                    </span>
                  </div>
                  <div className="font-bold text-sm dark:text-white">
                    {article.title.length > 40
                      ? `${article.title.substring(0, 40)}...`
                      : article.title}
                  </div>
                </div>
                <div className="pb-2">
                  <Link
                    to={`/blog/${article.id}`}
                    className="text-secondary hover:underline block text-center text-xs"
                  >
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogPage;
