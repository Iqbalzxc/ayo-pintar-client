import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineLockClosed,
  HiOutlinePhone,
  HiOutlineUserPlus,
} from "react-icons/hi2";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlinePicture, AiOutlineUser } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import GoogleLogin from "../../components/headers/Social/GoogleLogin";
import { AuthContext } from "../../utilities/providers/AuthProvider";
import axios from "axios";

const KEY = import.meta.env.VITE_IMG_TOKEN;

// mengunggah gambar
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  // const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_TOKEN}`;
  const url = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;

  try {
    const response = await axios.post(url, formData);
    return response.data.data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// REGISTER PAGE
const Register = () => {
  const navigate = useNavigate();
  const { signUp, updateUser, setError } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  const onSubmit = async (data) => {
    setError("");

    try {
      let photoUrl = "";
      if (data.photo[0]) {
        photoUrl = await uploadImage(data.photo[0]);
      }

      const result = await signUp(data.email, data.password);
      const user = result.user;
      
      if (user) {
        await updateUser(data.name, photoUrl);
        
        const userImp = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "user",
          gender: data.gender,
          phone: data.phone,
          address: data.address,
        };

        if (user.email && user.displayName) {
          await axios.post("https://ayo-pintar-server.onrender.com/new-user", userImp);
          navigate("/");
          setError();
          return "Pendaftaran berhasil";
        }
      }
    } catch (err) {
      setError(err.code);
      console.error(err);
    }
  };

  const password = watch("password");

  return (
    <div className="flex justify-center items-center pt-14 bg-array-100">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-secondary dark:text-white font-serif">
          PENDAFTARAN
        </h2>

        {/* FORM */}
        {/* {NAME} */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-5">
            <div className="mb-4 w-full">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2 dark:text-gray-300"
              >
                <HiOutlineUserPlus className="inline-block mr-2 mb-1 text-lg" />
                Nama
              </label>
              <input
                type="text"
                placeholder="Masukkan nama anda"
                {...register("name", { required: true })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              />
            </div>

            {/* EMAIL */}
            <div className="mb-4 w-full">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2 dark:text-gray-300"
              >
                <MdOutlineMailOutline className="inline-block mr-2 mb-1 text-lg" />
                Email
              </label>
              <input
                type="email"
                placeholder="Masukkan email"
                {...register("email", { required: true })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="flex items-center gap-5">
            <div className="mb-4 w-full">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2 dark:text-gray-300"
              >
                <HiOutlineLockClosed className="inline-block mr-2 mb-1 text-lg" />
                Password
              </label>
              <input
                type="password"
                placeholder="Masukkan password"
                {...register("password", { required: true })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              />

              {/* CONFIRM PASSWORD */}
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="confimpassword"
                className="block text-gray-700 font-bold mb-2 dark:text-gray-300"
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
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              />
            </div>
          </div>

          {/* NO TELEPON */}
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-bold mb-2 dark:text-gray-300"
              >
                <HiOutlinePhone className="inline-block mr-2 mb-1 text-lg" />
                Nomor Telepon
              </label>
              <input
                type="tel"
                placeholder="Input nomor telepon"
                {...register("phone", { required: true })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              />
            </div>

            {/* PHOTO */}
            <div className="mb-4">
              <label
                htmlFor="photoUrl"
                className="block text-gray-700 font-bold mb-2 dark:text-gray-300"
              >
                <AiOutlinePicture className="inline-block mr-2 mb-1 text-lg" />
                Foto
              </label>
              <input
                type="file"
                {...register("photo")}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              />
            </div>
          </div>

          {/* GENDER */}
          <div className="mb-4">
            <div>
              <label
                htmlFor="gender"
                className="block text-gray-700 font-bold mb-2 dark:text-gray-300"
              >
                <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
                Jenis Kelamin
              </label>
              <select
                {...register("gender", { required: true })}
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
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
                className="block text-gray-700 font-bold mb-2 dark:text-gray-300"
              >
                <HiOutlineLocationMarker className="inline-block mr-2 mb-1 text-lg" />
                Alamat
              </label>
              <textarea
                {...register("address", { required: true })}
                rows="3"
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
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
        <p className="text-center mt-4 dark:text-gray-300">
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