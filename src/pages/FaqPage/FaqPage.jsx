import React, { useState } from "react";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { FiSearch, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

const faq = [
  {
    id: 1,
    eventKey: 0,
    question: "Bagaimana cara daftar sebagai siswa Bimbel & Privat Ayo Pintar?",
    answer:
      "Silahkan melakukan pendaftaran di halaman registrasi.",
  },
  {
    id: 2,
    eventKey: 1,
    question: "Apakah tutor di Bimbel & Privat Ayo Pintar kompeten?",
    answer:
      "Ya, tutor di Bimbel & Privat Ayo Pintar kompeten yang berpengalaman mengajar di bidangnya.",
  },
  {
    id: 3,
    eventKey: 2,
    question: "Bagaimana cara melihat kelasnya?",
    answer:
      "Silahkan melihat di halaman kelas.",
  },
  {
    id: 4,
    eventKey: 3,
    question: "Pembayaran bisa melalui apa saja?",
    answer:
      "Pembayaran dapat dilakukan melalui transfer Bank BRI 4190 0101 4378 533 a/n. Muhammad Iqbal Nugraha  .",
  },
  {
    id: 5,
    eventKey: 4,
    question: "Apakah tersedia Kelas Privat?",
    answer:
      "Ya, kami menyediakan kelas privat untuk siswa yang ingin belajar.",
  },
  {
    id: 6,
    eventKey: 5,
    question: "Bagaimana cara daftar sebagai tutor?",
    answer:
      "Silahkan anda dapat mengunjungi halaman dashboard.",
  },
];

const FaqPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeKey, setActiveKey] = useState(null);

  const toggleAccordion = (id) => {
    setActiveKey((prevKey) => (prevKey === id ? null : id));
  };

  const filteredFaqs = faq.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="md:w-[80%] mx-auto my-36">
      <h1 className="text-4xl font-bold text-center mb-2 dark:text-white">
        <span className="text-secondary">Frequently Asked</span> Questions
      </h1>
      <p className="text-center text-black dark:text-white mb-8">
        Pertanyaan yang sering diajukan
      </p>
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 w-full rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-zinc-800 dark:text-white pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 dark:bg-zinc-900 rounded p-4 shadow-md transition duration-300 transform hover:-translate-y-1"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion(item.id)}
              >
                <h3 className="text-lg font-semibold dark:text-white">
                  {item.question}
                </h3>
                <span className="text-xl dark:text-white">
                  {activeKey === item.id ? <GoChevronUp /> : <GoChevronDown />}
                </span>
              </div>
              {activeKey === item.id && (
                <p className="text-gray-700 dark:text-gray-300 mt-4 px-4 text-justify">
                  {item.answer}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300">
            No FAQs found.
          </p>
        )}
      </div>
      <div className="mt-10 text-center">
        <Link
          to="https://wa.me/6285872893120"
          className="bg-secondary text-white px-5 py-3 rounded-full shadow hover:bg-secondary-dark transition inline-flex items-center"
        >
          <FiPhone className="mr-2" /> Contact Support
        </Link>
      </div>
    </div>
  );
};

export default FaqPage;
