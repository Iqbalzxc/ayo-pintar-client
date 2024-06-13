import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";

const AddClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const { image, setImage } = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    const newData = Object.fromEntries(formData);
    formData.append('file', image);
    console.log(newData);
    
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  if(isLoading) {
      return <div>Loading...</div>
  }

  return (
    <div>
      <div className="my-10">
        <h1 className="text-center text-3xl font-bold">Tambahkan Kelas Anda</h1>
      </div>

      <form onSubmit={handleFormSubmit} className="mx-auto p-6 bg-white rounded shadow">
        <div className="grid grid-cols-2 w-full gap-3 items-center">
          <div className="mb-6">
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
          <div className="mb-6">
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
          <h1 className="text-[12px] my-2 ml-2 text-secondary">
            Kamu tidak dapat merubah nama dan email anda
          </h1>
          <div className="grid gap-3 grid-cols-2">
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="tutorName"
              >
                Nama Tutor
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

            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="tutorEmail"
              >
                Email Tutor
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
        <div className="grid grid-cols-2 w-full gap-3 items-center">
          <div className="mb-6">
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

          <div className="mb-6">
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

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Whatsapp Link
          </label>
          <p className="text-[12px] my-2 mt-2 text-secondary">
            Grup Whatsapp untuk pembelajaran tutor dan murid
          </p>
          <input
            required
            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-red-500"
            type="text"
            placeholder="Cantumkan link Whatsapp Grup"
            name="groupWaLink"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Deskripsi Kelas
          </label>
          <textarea
            placeholder="Deskripsikan tentang kelas ini"
            name="description"
            className="resize-none border w-full p-2 rounded-lg border-secondary outline-none"
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
