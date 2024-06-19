import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { BiHome, BiHomeAlt, BiLogInCircle, BiSelectMultiple } from "react-icons/bi";
import { FaHome, FaUsers } from "react-icons/fa";
import { IoLogOut, IoSchoolSharp } from "react-icons/io5";
import { IoMdDoneAll } from "react-icons/io";
import { BsFillPostcardFill } from "react-icons/bs";
import { GiFigurehead } from "react-icons/gi";
import { SiGoogleclassroom, SiInstructure } from "react-icons/si";
import { TbBolt, TbBrandAppleArcade, TbLogin } from "react-icons/tb";
import { MdExplore, MdPayments, MdPending, MdPendingActions } from "react-icons/md";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Scroll from "../hooks/UseScroll";
import { CircleLoader } from "react-spinners";


// ADMIN NAV ITEMS
const adminNavItems = [
  {
    to: "/dashboard/admin-home",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Beranda",
  },
  {
    to: "/dashboard/manage-users",
    icon: <FaUsers className="text-2xl" />,
    label: "Kelola Pengguna",
  },
  {
    to: "/dashboard/manage-class",
    icon: <BsFillPostcardFill className="text-2xl" />,
    label: "Kelola Kelas",
  },
  {
    to: "/dashboard/manage-tutor",
    icon: <TbBrandAppleArcade className="text-2xl" />,
    label: "Kelola Tutor",
  },
];


// DEFAULT MENU ITEMS
const lastMenuItems = [
  {
    to: "/",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Beranda",
  },
  { to: "/trending", icon: <TbBolt className="text-2xl" />, label: "Trending" },
  {
    to: "/browse",
    icon: <GiFigurehead className="text-2xl" />,
    label: "Mengikuti",
  },
];


// TUTOR NAV ITEMS
const tutorNavItems = [
  {
    to: "/dashboard/tutor-cp",
    icon: <BiHome className="text-2xl" />,
    label: "Beranda",
  },
  {
    to: "/dashboard/add-classes",
    icon: <MdExplore className="text-2xl" />,
    label: "Tambahkan Kelas",
  },
  {
    to: "/dashboard/my-classes",
    icon: <IoSchoolSharp className="text-2xl" />,
    label: "Kelas Saya",
  },
  {
    to: "/dashboard/my-pending",
    icon: <MdPendingActions className="text-2xl" />,
    label: "Menunggu Konfirmasi",
  },
  {
    to: "/dashboard/my-approved",
    icon: <IoMdDoneAll className="text-2xl" />,
    label: "Kelas yang Disetujui",
  },
];


// USER NAV ITEMS
const students = [
  {
    to: "/dashboard/student-cp",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Beranda",
  },
  {
    to: "/dashboard/enrolled-class",
    icon: <SiGoogleclassroom className="text-2xl" />,
    label: "Kelas Terdaftar",
  },
  {
    to: "/dashboard/my-selected",
    icon: <BiSelectMultiple className="text-2xl" />,
    label: "Kelas Pilihan",
  },
  {
    to: "/dashboard/my-payments",
    icon: <MdPayments className="text-2xl" />,
    label: "Riwayat Pembayaran",
  },
  {
    to: "/dashboard/apply-tutor",
    icon: <SiInstructure className="text-2xl" />,
    label: "Daftar Tutor",
  },
];


const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const { loader, logout } = useAuth();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const role = currentUser?.role;


  // HANDLE LOGOUT ALERT
  const handleLogout = () => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Anda akan keluar dari sesi ini",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, keluar!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(
            Swal.fire({
              title: "Berhasil keluar!",
              text: "Kamu baru saja keluar.",
              icon: "success",
            })
          )
          .catch((error) => console.log(error));
      }
      navigate("/");
    });
  };


  // CONST ROLE = "USER";


  if (loader) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircleLoader color="#F97777" size={50} />
      </div>
    );
  }

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72 overflow-y-auto" : "w-[90px] overflow-auto"
        } bg-pink-100 h-screen p-5 md:block hidden pt-8 relative duration-300`}
      >
        <div className="flex gap-4 items-center">
          <img
            onClick={() => setOpen(!open)}
            src="/ayo-pintar-logo.png"
            alt="logo.jpg"
            className={`cursor-pointer h-[40px] duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <Link to="/">
            <h1
              onClick={() => setOpen(!open)}
              className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Ayo Pintar
            </h1>{" "}
          </Link>
        </div>


        {/* NAVLINKS ADMIN ROLE */}
        {role === "admin" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-500 uppercase ${!open && "hidden"}`}>
              <small>MENU</small>
            </p>
            {role === "admin" &&
              adminNavItems.map((menuItem, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={menuItem.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive ? "bg-red-500 text-white" : "text-black"
                      } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                    }
                  >
                    {menuItem.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {menuItem.label}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}


        {/* NAVLINKS TUTOR ROLE */}
        {role === "tutor" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-500 uppercase ${!open && "hidden"}`}>
              <small>MENU</small>
            </p>
            {tutorNavItems.map((menuItem, index) => (
              <li key={index} className="mb-2">
                <NavLink
                  to={menuItem.to}
                  className={({ isActive }) =>
                    `flex ${
                      isActive ? "bg-red-500 text-white" : "text-black"
                    } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                  }
                >
                  {menuItem.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {menuItem.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}


        {/* NAVLINKS TUTOR ROLE */}
        {role === "user" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-500 uppercase ${!open && "hidden"}`}>
              <small>MENU</small>
            </p>
            {students.map((menuItem, index) => (
              <li key={index} className="mb-2">
                <NavLink
                  to={menuItem.to}
                  className={({ isActive }) =>
                    `flex ${
                      isActive ? "bg-red-500 text-white" : "text-black"
                    } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                  }
                >
                  {menuItem.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {menuItem.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        <ul className="pt-6">
          <p className={`ml-3 text-gray-500 uppercase ${!open && "hidden"}`}>
            <small>NAVIGASI</small>
          </p>
          {lastMenuItems.map((menuItem, index) => (
            <li key={index} className="mb-2">
              <NavLink
                to={menuItem.to}
                className={({ isActive }) =>
                  `flex ${
                    isActive ? "bg-red-500 text-white" : "text-black"
                  } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                }
              >
                {menuItem.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menuItem.label}
                </span>
              </NavLink>
            </li>
          ))}

          <li>
            <button
              onClick={() => handleLogout()}
              className="flex duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4"
            >
              <TbLogin className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </button>
          </li>
        </ul>
      </div>

      <div className="h-screen overscroll-y-auto px-8 flex-1">
        <Scroll />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
