import React from "react";
import { Link } from "react-router-dom";

import Instagram from "../../../assets/home/Footer/instagram.jpg";
import LogoIcon from "../../../assets/home/Footer/logo.jpg";
import Facebook from "../../../assets/home/Footer/facebook.jpg";
import Twitter from "../../../assets/home/Footer/twitter.jpg";

const Footer = () => {
  return (
    <footer className="bg-secondary py-8 rounded">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Ayo Pintar */}
          <div className="md:col-span-1 flex flex-col items-center md:flex-row md:items-start md:mb-4">
            <img
              src={LogoIcon}
              alt="Logo"
              className="w-12 md:w-16 mb-2 md:mb-0 md:mr-2"
            />
            <div className="text-center md:text-left">
              <a
                href="https://ayo-pintar.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-white"
              >
                Ayo Pintar
              </a>
              <div className="mt-2">
                <h2 className="text-lg font-semibold mb-2 text-white">Alamat Kami :</h2>
                <p className="text-white">Jl. Ahmad Yamin No. 123, Kota Cirebon, Indonesia</p>
              </div>
            </div>
          </div>

          {/* Hubungi Kami */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold mb-4 text-white underline">Hubungi Kami</h2>
            <p className="text-white">Email: AyoPintar@gmail.com</p>
            <p className="text-white">WhatsApp: +62 123456789 (Admin)</p>
          </div>

          {/* Produk dan Panduan */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold mb-4 text-white underline">Layanan dan Panduan</h2>
            <ul className="space-y-2">
              <li>
                <Link className="text-white" to="/faq">FAQ</Link>
              </li>
              <li>
                <Link className="text-white" to="/blog">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Sosial Media */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold mb-4 text-white underline">Sosial Media</h2>
            <ul className="space-y-2">
              <li>
                <a className="text-white"
                  href="https://www.instagram.com/bimbelcirebon.ayopintar/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={Instagram}
                    alt="Instagram"
                    className="w-6 h-6 inline-block mr-1 text-white"
                  />{" "}
                  Instagram
                </a>
              </li>
              <li>
                <Link className="text-white" to="/https://facebook.com">
                  <img
                    src={Facebook}
                    alt="Facebook"
                    className="w-6 h-6 inline-block mr-1 text-white"
                  />{" "}
                  Facebook
                </Link>
              </li>
              <li>
                <Link className="text-white" to="https://x.com">
                  <img
                    src={Twitter}
                    alt="Twitter"
                    className="w-6 h-6 inline-block mr-1 text-white"
                  />{" "}
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Hak Cipta dan Kredit */}
        <div className="mt-8 text-center text-sm text-white font-bold">
          <p>© 2024 Ayo Pintar. Sanber Foundation. Tim Ayo Pintar.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;