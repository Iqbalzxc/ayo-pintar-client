import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="md:w-[80%] mx-auto my-4">
        <div className="lg:flex lg:justify-between">
          {/* Bagian Logo dan Informasi Kontak */}
          <div className="w-full lg:w-1/4 mb-12 lg:mb-0">
            <h1 className="text-2xl inline-flex gap-3 items-center font-bold">
              Ayo Pintar{" "}
              <img
                src="/ayo-pintar-logo.png"
                alt="Ayo Pintar"
                className="w-8 h-8"
              />
            </h1>
            <p className="font-bold text-[13px] tracking-[8px]">
              Smart Learning
            </p>

            <div className="mt-6">
              <p className="text-white">
                Jl. Ahmad Yamin No. 123, Kota Cirebon, Indonesia
              </p>
            </div>
          </div>

          {/* Bagian Menu */}
          <div className="w-full lg:w-4 mb-8 lg:mb-0">
            <h5 className="text-lg font-bold mb-3">Menu</h5>
            <ul>
              <li>
                <a
                  href="/"
                  className="block text-gray-300 hover:text-secondary"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/tutors"
                  className="block text-gray-300 hover:text-secondary"
                >
                  Tutor
                </a>
              </li>
              <li>
                <a
                  href="/classes"
                  className="block text-gray-300 hover:text-secondary"
                >
                  Kelas
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="block text-gray-300 hover:text-secondary"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="block text-gray-300 hover:text-secondary"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Bagian Kontak kami */}
          <div className="w-full lg:w-1/5 mb-8 lg:mb-0">
            <h5 className="text-lg font-bold mb-4">Kontak kami</h5>
            <ul>
              <li>
                <a
                  href="https://wa.me/6285872893120"
                  className="flex items-center text-gray-300 hover:text-secondary"
                >
                  <FaWhatsapp className="mr-2" />
                  +62 858-7289-3120 (Iqbal)
                </a>
              </li>
              <li>
                <a
                  href="mailto:person-email@gmail.com"
                  className="flex items-center text-gray-300 hover:text-secondary"
                >
                  <FaEnvelope className="mr-2" />
                  AyoPintar@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Bagian Subscribe dan Media Sosial */}
          <div className="w-full lg:w-1/4">
            <h5 className="text-lg font-bold mb-4">
              Subscribe untuk info Menarik
            </h5>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Email Anda"
                className="bg-gray-800 text-gray-100 px-4 py-2 rounded-l-md focus:outline-none"
              />
              <button className="bg-secondary px-4 py-2 rounded-r-md text-white font-semibold">
                Subscribe
              </button>
            </div>
            <div className="flex items-center text-2xl">
              <a
                href="https://facebook.com"
                className="text-gray-300 hover:text-secondary mr-4"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/bimbelcirebon.ayopintar/?hl=en"
                className="text-gray-300 hover:text-secondary mr-4"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com"
                className="text-gray-300 hover:text-secondary mr-4"
              >
                <FaTwitter />
              </a>
              <a href="" className="text-gray-300 hover:text-secondary">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Bagian Kredit */}
        <hr className="border-gray-800 my-8" />
        <p className="text-center text-gray-300">
          &copy; 2024 Ayo Pintar. Sanber Foundation. Tim Ayo Pintar.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
