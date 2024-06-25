import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Switch } from "@mui/material";
import { motion } from "framer-motion";
import photoUrl from "../../assets/home/foto-profile.jpg";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../../utilities/providers/AuthProvider";
import Swal from "sweetalert2";

const navLinks = [
  { name: "Home", route: "/" },
  { name: "Tutor", route: "/tutors" },
  { name: "Kelas", route: "/classes" },
  { name: "Blog", route: "/blog" },
  { name: "FAQ", route: "/faq" },
];

const theme = createTheme({
  palette: { primary: { main: "#ff0000" }, secondary: { main: "#00ff00" } },
});

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navBg, setNavBg] = useState("bg-transparent backdrop-filter backdrop-blur-xl");

  const { logout, user } = useContext(AuthContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const darkClass = "dark";
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add(darkClass);
    } else {
      root.classList.remove(darkClass);
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsHome(location.pathname === "/");
    setIsLogin(location.pathname === "/login");
    setIsFixed(location.pathname === "/register" || location.pathname === "/login");
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollPosition > 100) {
      if (isHome) {
        setNavBg("bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black");
      } else {
        setNavBg("bg-white dark:bg-black dark:text-white text-black");
      }
    } else {
      setNavBg(isHome || location.pathname === "/" ? "bg-transparent backdrop-filter backdrop-blur-xl" : "bg-white dark:bg-black dark:text-white text-white");
    }
  }, [scrollPosition]);

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Logged out");
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
          .then(() => {
            Swal.fire({
              title: "Berhasil keluar!",
              text: "kamu baru saja keluar.",
              icon: "success",
            });
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${
        isHome ? navBg : "bg-white dark:bg-black backdrop-blur-xl"
      } ${
        isFixed ? "static" : "fixed"
      } top-0 transition-colors duration-500 ease-in-out w-full z-10`}
    >
      <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
        <div className="px-4 py-4 flex items-center justify-between">
          {/* LOGO AYO PINTAR */}
          <div
            onClick={() => navigate("/")}
            className="flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center"
          >
            <div className="dark:text-white">
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
            </div>
          </div>

          {/* MOBILE MENU ICONS */}
          <div className="md:hidden flex items-center">
            {/* COLOR TOGGLE MOBILE */}
            <ThemeProvider theme={theme}>
              <div className="flex flex-col justify-center items-center mr-2">
                <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                <h1 className="text-[7px]">Light/Dark</h1>
              </div>
            </ThemeProvider>
            {/* MENU ICON */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <FaBars className="h-8 w-8 hover:text-primary" />
            </button>
          </div>

          {/* NAVIGATIONAL LINKS */}
          <div className="hidden md:flex text-black dark:text-white justify-center items-center w-full">
            <div className="flex flex-1 justify-center">
              <ul className="flex space-x-7">
                {navLinks.map((Link) => (
                  <li key={Link.route}>
                    <NavLink
                      to={Link.route}
                      style={{ whiteSpace: "nowrap" }}
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300`
                      }
                    >
                      {Link.name}
                    </NavLink>
                  </li>
                ))}
                {user && (
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>

            {/* BASED ON USER */}
            <div className="flex items-center space-x-4">
              {user ? null : isLogin ? (
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `font-bold ${
                      isActive
                        ? "text-secondary"
                        : `${
                            navBg.includes("bg-transparent")
                              ? "text-white"
                              : "text-white dark:text-white"
                          }`
                    }  bg-secondary font-bold px-6 py-2 rounded-xl`
                  }
                >
                  Register
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `font-bold ${
                      isActive
                        ? "text-secondary"
                        : `${
                            navBg.includes("bg-transparent")
                              ? "text-secondary"
                              : "text-secondary dark:text-white"
                          }`
                    } hover:text-white hover:bg-secondary duration-300 
                    border border-secondary px-8 py-2 rounded-xl`
                  }
                >
                  Login
                </NavLink>
              )}

              {user && (
                <img
                  src={photoUrl}
                  alt="foto profile"
                  className="h-[40px] rounded-full w-[40px]"
                />
              )}

              {user && (
                <NavLink
                  onClick={handleLogout}
                  className={
                    "font-bold px-6 py-2 bg-secondary text-white rounded-xl"
                  }
                >
                  Log Out
                </NavLink>
              )}

              {/* COLOR TOGGLE */}
              <ThemeProvider theme={theme}>
                <div className="flex flex-col justify-center items-center">
                  <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                  <h1 className="text-[8px]">Light/Dark</h1>
                </div>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden mb-3">
          <ul
            className={`flex flex-col items-center space-y-2 px-4 py-2 ${navBg} text-black dark:text-white`}
          >
            {navLinks.map((Link) => (
              <li key={Link.route}>
                <NavLink
                  to={Link.route}
                  style={{ whiteSpace: "nowrap" }}
                  className={({ isActive }) =>
                    `block font-bold ${
                      isActive ? "text-secondary" : "text-black dark:text-white"
                    } hover:text-secondary duration-300`
                  }
                  onClick={toggleMobileMenu}
                >
                  {Link.name}
                </NavLink>
              </li>
            ))}
            {user && (
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block font-bold ${
                      isActive ? "text-secondary" : "text-black dark:text-white"
                    } hover:text-secondary duration-300 mb-3`
                  }
                  onClick={toggleMobileMenu}
                >
                  Dashboard
                </NavLink>
              </li>
            )}
            {user ? (
              <li className="flex items-center space-x-4">
                <img
                  src={photoUrl}
                  alt="foto profile"
                  className="h-[40px] rounded-full w-[40px]"
                />
                <NavLink
                  onClick={handleLogout}
                  className="block font-bold px-6 py-2 bg-secondary text-white rounded-xl"
                >
                  Log Out
                </NavLink>
              </li>
            ) : (
              <li>
                {isLogin ? (
                  <NavLink
                    to="/register"
                    className="block font-bold text-white bg-secondary px-6 py-2 rounded-xl"
                    onClick={toggleMobileMenu}
                  >
                    Register
                  </NavLink>
                ) : (
                  <NavLink
                    to="/login"
                    className="block font-bold text-secondary border border-secondary px-8 py-2 rounded-xl hover:text-white hover:bg-secondary duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </NavLink>
                )}
              </li>
            )}
          </ul>
        </div>
      )}
    </motion.nav>
  );
};

export default NavBar;
