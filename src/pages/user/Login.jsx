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
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-secondary sm:text-secondary sm:text-3xl text-center">
        Login
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, laborum
        numquam molestias a repudiandae nam!
      </p>

      <div className="mx-auto max-w-lg mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-center text-red-400 text-lg font-medium">
            Masuk ke akun
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
                className="w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <MdOutlineAlternateEmail className="h-4 w-4 text-gray-400" />
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
                className="w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
              <span
                onClick={() => setshowPassword(!showPassword)}
                className="cursor-pointer absolute inset-y-0 end-0 grid place-content-center px-4"
              >
                <MdOutlineRemoveRedEye className="h-4 w-4 text-gray-400" />
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
          {error && <p className="text-center text-red-500">{error}</p>}{" "}
          {/* DISPLAY ERROR MESSAGE BELOW THE LOGIN BUTTON */}
          <p className="text-center text-sm text-gray-500">
            Tidak punya akun?{" "}
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
