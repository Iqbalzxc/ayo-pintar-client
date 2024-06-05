import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineLockClosed, HiOutlineLockOpen, HiOutlinePhone, HiOutlineUserPlus } from "react-icons/hi2";
import { MdOutlineMailOutline, MdOutlinePictureInPicture } from "react-icons/md";
import { AiOutlinePicture, AiOutlineUser } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import GoogleLogin from "../../components/headers/Social/GoogleLogin";
import { AuthContext } from "../../utilities/providers/AuthProvider";
import axios from "axios";


// REGISTER PAGE
const Register = () => {
  const navigate = useNavigate();
  const { signUp, updateUser, setError } = useContext(AuthContext);
  const { register, handleSubmit, watch, formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setError("");

    signUp(data.email, data.password).then((result) => {
      const user = result.user;
      if (user) {
        return updateUser(data.name, data.photoUrl)
          .then(() => {
            const userImp = {
              name: user?.displayName,
              email: user?.email,
              photoUrl: user?.photoURL,
              role: "user",
              gender: data.gender,
              phone: data.phone,
              address: data.address,
            };

            if (user.email && user.displayName) {
              return axios
                .post("http://localhost:3000/new-user", userImp)
                .then(() => {
                  navigate("/");
                  setError();
                  return "Pendaftaran berhasil";
                })
                .catch((err) => {
                  throw new Error(err);
                });
            }
          })
          .catch((err) => {
            setError(err.code);
            throw new Error(err);
          });
      }
    });
  };

  const password = watch("password");
  return (
    <div className="flex justify-center items-center pt-14 bg-array-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Pendaftaran</h2>

        {/* FORM */}
        {/* {NAME} */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                <HiOutlineUserPlus className="inline-block mr-2 mb-1 text-lg" />
                Nama
              </label>
              <input
                type="text"
                placeholder="Masukkan nama anda"
                {...register("name", { required: true })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>


            {/* EMAIL */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                <MdOutlineMailOutline className="inline-block mr-2 mb-1 text-lg" />
                Email
              </label>
              <input
                type="email"
                placeholder="Masukkan email"
                {...register("email", { required: true })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                <HiOutlineLockClosed className="inline-block mr-2 mb-1 text-lg" />
                Password
              </label>
              <input
                type="password"
                placeholder="Masukkan password"
                {...register("password", { required: true })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />


              {/* CONFIRM PASSWORD */}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confimpassword"
                className="block text-gray-700 font-bold mb-2"
              >
                <HiOutlineLockClosed className="inline-block mr-2 mb-1 text-lg" />
                Konfirmasi Password
              </label>
              <input
                type="password"
                placeholder="Masukkan ulang password"
                {...register("confimPassword", {
                  required: true,
                  validate: (value) =>
                    value === "" ||
                    value === password ||
                    "Password, tidak sama, silahkan coba lagi!",
                })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>


          {/* NO TELEPON */}
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-bold mb-2"
              >
                <HiOutlinePhone className="inline-block mr-2 mb-1 text-lg" />
                Nomor Telepon
              </label>
              <input
                type="tel"
                placeholder="Input nomor telepon"
                {...register("phone", { required: true })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>


            {/* PHOTO */}
            <div className="mb-4">
              <label
                htmlFor="photoUrl"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlinePicture className="inline-block mr-2 mb-1 text-lg" />
                URL Foto
              </label>
              <input
                type="text"
                placeholder="Unggah foto"
                {...register("photoUrl")}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>


          {/* GENDER */}
          <div className="mb-4">
            <div>
              <label
                htmlFor="gender"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
                Jenis Kelamin
              </label>
              <select
                {...register("gender", { required: true })}
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="male">Laki-Laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>
          </div>


          {/* ADDRESS */}
          <div className="mb-4">
            <div>
              <label
                htmlFor="address"
                className="block text-gray-700 font-bold mb-2"
              >
                <HiOutlineLocationMarker className="inline-block mr-2 mb-1 text-lg" />
                Alamat
              </label>
              <textarea
                {...register("address", { required: true })}
                rows="3"
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Masukkan alamat anda"
              ></textarea>
            </div>
          </div>


          {/* BUTTON */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Daftar
            </button>


            {/* CHECK PASSWORD */}
            {errors.confimPassword &&
              errors.confimPassword.type !== "required" && (
                <div className="text-red-500 text-sm w-full mt-1">
                  <p>{errors.confimPassword.message}</p>
                </div>
              )}
          </div>


          {/* ALREADY HAVE ACCOUNT */}
        </form>
        <p className="text-center mt-4">
          Sudah punya akun?{" "}
          <Link to="/login" className="underline text-secondary ml-1">
            {" "}
            Login
          </Link>
        </p>


        {/* LOGIN GOOGLE */}
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Register;
