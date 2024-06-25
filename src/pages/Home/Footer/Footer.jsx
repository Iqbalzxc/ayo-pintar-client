import React from "react";
import { Link } from "react-router-dom";
import FAQ from "../Faq/Faq";
import Testimoni from "../Testimonial/Testimonial";
import AboutUs from "../AboutUs/AboutUs";
import OurTeam from "../OurTeam/OurTeam";
const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Alamat Kami</h2>
            <p>Jl. Ahmad Yamin No. 123, Kota Cirebon, Indonesia</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Hubungi Kami</h2>
            <p>Email: AyoPintar@gmail.com</p>
            <p>Telepon: (123) 456-7890</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link to="/Faq">FAQ</Link>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link to="/Testimonial">Testimoni</Link>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link to="/AboutUs">Tentang Kami</Link>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link to="/OurTeam">Tim Kami</Link>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link to="/Faq">Instagram</Link>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link to="/Faq">Facebook</Link>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link to="/Faq">Twitter</Link>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link to="/Faq">Blog</Link>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link to="/Faq">Tutor Favorit</Link>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link to="/Faq">Kelas</Link>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link to="/Faq">Blog</Link>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link to="/Faq">Tutor Favorit</Link>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link to="/Faq">Kelas</Link>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Link to="/Faq">Kelas</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
