import React from "react";

const Blog = () => {
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
    },
  ];

  return (
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
        ))}
      </div>
    </div>
  );
};

export default Blog;
