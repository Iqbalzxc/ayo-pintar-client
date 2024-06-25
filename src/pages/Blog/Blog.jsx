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
<<<<<<< HEAD
  const blogPosts = [
    {
      id: 1,
      title: "Tips Efektif Belajar Secara Online",
      author: "Muhammad Iqbal Nugraha",
      date: "June 1, 2024",
      content: `
        <p>Belajar secara online telah menjadi norma baru di masa sekarang, terutama dengan pandemi COVID-19 yang mendorong banyak aktivitas menjadi virtual. Berikut ini adalah beberapa tips efektif untuk belajar secara online:</p>
        <ol>
          <li>Siapkan lingkungan belajar yang nyaman dan minim gangguan.</li>
          <li>Atur jadwal belajar yang terstruktur dan konsisten.</li>
          <li>Gunakan teknologi untuk berinteraksi dengan pengajar dan sesama siswa.</li>
          <li>Manfaatkan berbagai sumber belajar online yang tersedia.</li>
        </ol>
        <p>Dengan menerapkan tips di atas, Anda dapat meningkatkan produktivitas dan hasil belajar Anda secara signifikan.</p>
      `,
    },
    {
      id: 2,
      title: "Pentingnya Pendidikan Karakter di Sekolah",
      author: "Muhammad Leon Surya Putra",
      date: "June 5, 2024",
      content: `
        <p>Pendidikan karakter merupakan bagian penting dari pendidikan yang tidak hanya fokus pada pengetahuan akademis, tetapi juga pengembangan nilai-nilai moral dan kepribadian yang baik. Beberapa alasan mengapa pendidikan karakter penting di sekolah:</p>
        <ul>
          <li>Membentuk kepribadian yang baik dan bertanggung jawab.</li>
          <li>Mendorong kerjasama dan sikap empati.</li>
          <li>Menanamkan nilai-nilai integritas dan etika dalam berperilaku.</li>
        </ul>
        <p>Secara keseluruhan, pendidikan karakter membantu siswa menjadi individu yang lebih baik dan siap menghadapi tantangan di masa depan.</p>
      `,
    },
    {
      id: 3,
      title: "Teknologi dan Perkembangan Pendidikan",
      author: "Ikhtifadudin Al Ghifari R",
      date: "June 10, 2024",
      content: `
        <p>Teknologi telah membawa dampak signifikan dalam dunia pendidikan, dari mulai peningkatan aksesibilitas, inovasi metode pengajaran, hingga pembelajaran berbasis digital. Berikut adalah beberapa dampak positif teknologi dalam pendidikan:</p>
        <ol>
          <li>Meningkatkan aksesibilitas pendidikan bagi semua lapisan masyarakat.</li>
          <li>Memungkinkan pembelajaran jarak jauh dan kolaborasi antar siswa dari berbagai daerah.</li>
          <li>Menyediakan sumber daya belajar yang lebih bervariasi dan interaktif.</li>
        </ol>
        <p>Teknologi tidak hanya mengubah cara kita belajar, tetapi juga membuka peluang baru untuk mengembangkan potensi siswa secara lebih efektif.</p>
      `,
=======
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
>>>>>>> 888ddce985ab820a716b6dd9deae7bec0b508685
    },
  ];

  return (
<<<<<<< HEAD
    <div>
      <div className="md:w-[80%] mx-auto my-20">
        <h1 className="text-4xl font-bold text-center dark:text-white">
          <span className="text-secondary">Blog</span> Ayo Pintar
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">{post.title}</h2>
            <p className="text-gray-600 mb-2">Penulis: {post.author}</p>
            <p className="text-gray-600 mb-2">Tanggal: {post.date}</p>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
=======
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
>>>>>>> 888ddce985ab820a716b6dd9deae7bec0b508685
        ))}
      </div>
    </div>
  );
};

export default Blog;
