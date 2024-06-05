import React from "react";
import useUser from "../../../hooks/useUser";
import WelcomeImg from "../../../assets/dashboard/urban-welcome.svg";
import { Link } from "react-router-dom";
const StudentCP = () => {
  const { currentUser } = useUser();
  return (
    <div className="h-screen flex justify-center items-center p-2">
      <div>
        <div>
          <div>
            <img
              onContextMenu={(e) => e.preventDefault()}
              src={WelcomeImg}
              alt="welcome.jpg"
              className="h-[200px]"
              placeholder="blur"
            />
          </div>
          <h1 className="text-4xl capitalize font-bold">
            {" "}
            Hi,{" "}
            <span className="text-secondary items-stretch">
              {currentUser?.name}!
            </span>{" "}
            Selamat datang
          </h1>
          <p className="text-center text-base py-2">
            Ini adalah halaman dashboard anda.
          </p>

          <div className="text-center">
            <h2 className="font-bold">
              Kamu dapat mengakses halaman dari sini
            </h2>
            <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1 flex-wrap">
              <Link to="/dashboard/enrolled-class">Kelas Saya</Link>
            </div>
            <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
              <Link to="/dashboard/my-selected">Pilihan Saya</Link>
            </div>
            <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
              <Link to="/dashboard/my-payments">Riwayat Pembayaran</Link>
            </div>
            <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
              <Link to="/dashboard/apply-tutor">Daftar Sebagai Tutor</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCP;
