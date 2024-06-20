import React, { useState } from "react";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { FiSearch, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

const faq = [
  {
    id: 1,
    question: "Apakah ini Berlangganan?",
    answer:
      "text1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    question: "Bagaimana Sistem Belajarnya?",
    answer:
      "text2 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    question: "Apakah boleh Ganti Tutor jika tidak cocok?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 4,
    question: "Apakah Ada Grup Diskusi?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 5,
    question: "Apakah tersedia Kelas Privat?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 6,
    question: "Bagaimana cara daftar sebagai siswa les privat?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 7,
    question: "Apakah Saya Boleh Mendownload Videonya?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 8,
    question: "Apakah boleh ganti Kelas ketika sudah Membeli?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
      <p className="text-center text-gray-500 mb-8">
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
          to="#"
          className="bg-secondary text-white px-5 py-3 rounded-full shadow hover:bg-secondary-dark transition inline-flex items-center"
        >
          <FiPhone className="mr-2" /> Contact Support
        </Link>
      </div>
    </div>
  );
};

export default FaqPage;
