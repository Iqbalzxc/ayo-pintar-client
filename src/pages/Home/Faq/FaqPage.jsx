import React, { useState } from "react";
import { GoChevronUp, GoChevronDown } from "react-icons/go";

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

const Faq = () => {
  return <div></div>;
  const [activeKey, setActiveKey] = useState(null);

  const toggleAccordion = (eventKey) => {
    setActiveKey((prevKey) => (prevKey === eventKey ? null : eventKey));
  };

  return (
    <div className="faq">
      <h1 className="text-4xl font-bold text-center dark:text-white">
        <span className="text-secondary">Frequently Asked</span> Question
      </h1>
      <div className="w-[40%] text-center mx-auto my-4">
        <p className="text-black dark:text-white">Pertanyaan yang sering diajukan</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5 mb-10">
        {faq.map((data) => (
          <div key={data.id}>
            <div
              className="bg-gray-100 dark:bg-zinc-900 rounded p-4 shadow-md transition duration-300 transform hover:-translate-y-1 flex justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion(data.eventKey)}
            >
              <h3 className="text-base font-semibold dark:text-white">
                {data.question}
              </h3>
              <span className="text-xl dark:text-white">
                {activeKey === data.eventKey ? (
                  <GoChevronUp />
                ) : (
                  <GoChevronDown />
                )}
              </span>
            </div>
            {activeKey === data.eventKey && (
              <div className="bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-200 p-4 mt-2">
                {data.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;