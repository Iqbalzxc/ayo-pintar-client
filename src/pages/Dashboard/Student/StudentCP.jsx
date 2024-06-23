import React from "react";
import useUser from "../../../hooks/useUser";
import WelcomeImg from "../../../assets/dashboard/urban-welcome.svg";
import { Link } from "react-router-dom";

const StudentCP = () => {
  const { currentUser } = useUser();
  return (
    <div className="h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-center mb-4">
          <img
            onContextMenu={(e) => e.preventDefault()}
            src={WelcomeImg}
            alt="welcome.jpg"
            className="h-[200px] w-auto"
            placeholder="blur"
          />
        </div>
        <h1 className="text-2xl sm:text-4xl capitalize font-bold text-center mb-2">
          Hi,{" "}
          <span className="text-secondary">
            {currentUser?.name}!
          </span>{" "}
          Selamat datang
        </h1>
        <p className="text-center text-base py-2">
          Ini adalah halaman dashboard anda.
        </p>

        <div className="text-center">
          <h2 className="font-bold mb-2">
            Kamu dapat mengakses halaman dari sini
          </h2>
          <div className="space-y-2">
            <Link to="/dashboard/enrolled-class" className="block border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-4 py-2">
              Kelas Saya
            </Link>
            <Link to="/dashboard/my-selected" className="block border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-4 py-2">
              Pilihan Saya
            </Link>
            <Link to="/dashboard/my-payments" className="block border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-4 py-2">
              Riwayat Pembayaran
            </Link>
            <Link to="/dashboard/apply-tutor" className="block border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-4 py-2">
              Daftar Sebagai Tutor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCP;
