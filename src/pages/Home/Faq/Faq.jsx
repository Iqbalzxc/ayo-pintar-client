import React, { useState } from "react";
import { GoChevronUp, GoChevronDown } from "react-icons/go";

const faq = [
  {
    id: 1,
    eventKey: 0,
    question: "Apakah ini Berlangganan?",
    answer:
      "text1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    eventKey: 1,
    question: "Bagaimana Sistem Belajarnya?",
    answer:
      "text2 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    eventKey: 2,
    question: "Apakah boleh Ganti Tutor jika tidak cocok?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 4,
    eventKey: 3,
    question: "Apakah Ada Grup Diskusi?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 5,
    eventKey: 4,
    question: "Apakah tersedia Kelas Privat?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 6,
    eventKey: 5,
    question: "Bagaimana cara daftar sebagai siswa les privat?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 7,
    eventKey: 6,
    question: "Apakah Saya Boleh Mendownload Videonya?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 8,
    eventKey: 7,
    question: "Apakah boleh ganti Kelas ketika sudah Membeli?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const Faq = () => {
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
        <p className="text-gray-500">Pertanyaan yang sering diajukan</p>
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
