import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";

const KEY = import.meta.env.VITE_IMG_TOKEN;

const AddClasses = () => {
  const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const [image, setImage] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // console.log(formData);
    const newData = Object.fromEntries(formData);
    formData.append("file", image);
    // console.log(newData);

    fetch(API_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success === true) {
          // console.log(data.data.display_url);
          newData.image = data.data.display_url;
          newData.tutorName = currentUser?.name;
          newData.tutorEmail = currentUser?.email;
          newData.status = "pending";
          newData.submitted = new Date();
          newData.totalEnrolled = 0;
          axiosSecure.post(`/new-class`, newData).then((res) => {
            Swal.fire({
              title: "Berhasil!",
              text: "Kelas berhasil ditambahkan",
              icon: "success",
              confirmButtonText: "OK",
            });
            // console.log(res.data);
          });
        }
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 mt-20 md:mt-6">
      <div className="my-10">
        <h1 className="text-center text-3xl font-bold">
          Tambahkan <span className="text-secondary">Kelas Anda</span>
        </h1>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="mx-auto p-6 bg-white rounded shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 items-center">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Nama Kelas
            </label>
            <input
              type="text"
              required
              placeholder="Nama Kelas Anda"
              name="name"
              id="name"
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-red-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="image"
            >
              Thumbnail Kelas
            </label>
            <input
              type="file"
              required
              name="image"
              onChange={handleImageChange}
              className="block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-red-500 focus:ring-red-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4"
            />
          </div>
        </div>
        <div>
          <h1 className="text-[12px] my-2 ml-2 text-secondary text-justify">
            Silahkan isi kolom dibawah ini sesuai dengan kemauan anda
          </h1>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="tutorName"
              >
                Nama
              </label>
              <input
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-red-500"
                type="text"
                value={currentUser?.name}
                readOnly
                disabled
                placeholder="Nama Tutor"
                name="tutorName"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="tutorEmail"
              >
                Email
              </label>
              <input
                title="Kamu tidak dapat merubah email"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-red-500"
                type="email"
                value={currentUser?.email}
                disabled
                readOnly
                name="tutorEmail"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 items-center">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="availableSeats"
            >
              Kuota Tersedia
            </label>
            <input
              className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-red-500"
              type="number"
              required
              placeholder="Berapa banyak kuota tersedianya?"
              name="availableSeats"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="price"
            >
              Harga
            </label>
            <input
              className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-red-500"
              type="number"
              required
              placeholder="Berapa harganya?"
              name="price"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="groupWaLink"
          >
            Whatsapp Link
          </label>
          <p className="text-[12px] my-2 mt-2 text-secondary text-justify">
            Grup Whatsapp untuk pembelajaran tutor dan murid, sebelum itu harap
            masukkan{" "}
            <span className="text-secondary font-bold underline">
              Admin +6285872893120{" "}
            </span>
            ke grup tersebut.
          </p>
          <input
            required
            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-red-500"
            type="text"
            placeholder="Cantumkan link Whatsapp Grup"
            name="groupWaLink"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Deskripsi Kelas
          </label>
          <textarea
            placeholder="Deskripsikan tentang kelas ini"
            name="description"
            className="resize-none border w-full p-4 rounded-lg border-secondary outline-none h-40"
          ></textarea>
        </div>

        <div className="text-center w-full">
          <button
            className="bg-secondary w-full hover:bg-red-500 duration-200 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Tambahkan Kelas Baru
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClasses;
