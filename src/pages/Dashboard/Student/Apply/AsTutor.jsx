import React, { useEffect, useState } from "react";
import useUser from "../../../../hooks/useUser";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import { FiUser, FiMail, FiBriefcase, FiSend } from "react-icons/fi";
import Swal from "sweetalert2";

const AsTutor = () => {
  const { currentUser } = useUser();
  const [submittedData, setSubmittedData] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxiosFetch();

  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const experience = e.target.experience.value;
    const data = { name, email, experience };

    axiosFetch.post(`/ass-tutor`, data).then((res) => {
      console.log(res.data);
      Swal.fire({
        title: "Berhasil!",
        text: "Anda berhasil mendaftar sebagai tutor.",
        icon: "success",
        confirmButtonText: "OK"
      });
    });
  };

  useEffect(() => {
    if (currentUser?.email) {
      axiosFetch
        .get(`/applied-tutors/${currentUser.email}`)
        .then((res) => {
          console.log("Fetched applied tutor data:", res.data);
          setSubmittedData(res.data);
          setLoading(false);
        })
        .catch((err) => console.error("Error fetching applied tutor data:", err));
    }
  }, [currentUser, axiosFetch]);

  if (loading) {
    return <p className="flex h-screen items-center justify-center">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        {!submittedData?.name ? (
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="name">
                Nama
              </label>
              <div className="flex items-center mt-1">
                <FiUser className="text-gray-500" />
                <input
                  defaultValue={currentUser?.name}
                  disabled
                  readOnly
                  className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email
              </label>
              <div className="flex items-center mt-1">
                <FiMail className="text-gray-500" />
                <input
                  defaultValue={currentUser?.email}
                  disabled
                  readOnly
                  className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="experience">
                Pengalaman
              </label>
              <div className="flex items-center mt-1">
                <FiBriefcase className="text-gray-500" />
                <textarea
                  placeholder="Ceritakan pengalaman anda..."
                  className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
                  id="experience"
                  name="experience"
                ></textarea>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="flex items-center justify-center px-4 py-2 bg-secondary text-white rounded-md focus:outline-none hover:bg-secondary-dark transition duration-200"
              >
                <FiSend className="mr-2" />
                Kirim
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4 text-center">Data yang Dikirim</h2>
            <div className="text-left">
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ minWidth: '120px', fontWeight: 'bold' }}>Nama:</span>
                  <span style={{ textAlign: 'justify' }}>{submittedData.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ minWidth: '120px', fontWeight: 'bold' }}>Email:</span>
                  <span style={{ textAlign: 'justify' }}>{submittedData.email}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ minWidth: '120px', fontWeight: 'bold' }}>Pengalaman:</span>
                  <span style={{ textAlign: 'justify' }}>{submittedData.experience}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AsTutor;
