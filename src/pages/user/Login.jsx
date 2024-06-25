import React, { useState } from "react";
import { MdOutlineAlternateEmail, MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/headers/Social/GoogleLogin";
import useAuth from "../../hooks/useAuth";

// LOGIN PAGE
const Login = () => {
  const [showPassword, setshowPassword] = useState(false);
  const location = useLocation();
  const { login, error, setError, loader, setLoader } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();

    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);
    // SET LOADER TO TRUE WHEN LOGIN ATTEMPT STARTS
    setLoader(true);
    login(formData.email, formData.password)
      .then(() => {
        alert("Login berhasil");
        navigate(location.state?.from || "/dashboard");
      })
      .catch((err) => {
        // SET A USER-FRIENDLY ERROR MESSAGE
        setError("Email atau password salah");
        setLoader(false);
      });
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 dark:text-white">

      <div className="mx-auto max-w-lg mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 dark:bg-zinc-800">
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-center text-red-400 text-lg font-mono dark:text-white">
            Silahkan Input Email & Password
          </p>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Masukkan email"
                className="w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <MdOutlineAlternateEmail className="h-4 w-4 text-gray-400 dark:text-gray-300" />
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Masukkan password"
                className="w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              />
              <span
                onClick={() => setshowPassword(!showPassword)}
                className="cursor-pointer absolute inset-y-0 end-0 grid place-content-center px-4"
              >
                <MdOutlineRemoveRedEye className="h-4 w-4 text-gray-400 dark:text-gray-300" />
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loader}
          >
            {loader ? "Logging in..." : "Login"}
          </button>
          {error && (
            <p className="text-center text-red-500 dark:text-red-400">
              {error}
            </p>
          )}
          <p className="text-center text-sm text-gray-500 dark:text-gray-300">
            Belum punya akun?{" "}
            <Link className="underline" to="/register">
              Daftar disini
            </Link>
          </p>
        </form>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
