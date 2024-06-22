import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";
import { Navigate, useNavigate } from "react-router-dom";

const CheckoutPayment = ({ price, cartItm }) => {
  const URL = `https://ayo-pintar-server.onrender.com/payment-info?${
    cartItm && `classId=${cartItm}`
  }`;
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();
  const [succeeded, setSucceeded] = useState("");
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);
  const [proof, setProof] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.email) {
      axiosSecure
        .get(`/cart/${currentUser.email}`)
        .then((res) => {
          const classesId = res.data.map((item) => item._id);
          setCart(classesId);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser, axiosSecure]);

  const handleProofUpload = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", proof);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_TOKEN}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.success) {
        setUploadSuccess(true);
        const proofUrl = data.data.url;
        handleEnrollment(proofUrl);
      } else {
        setMessage("Upload bukti transfer gagal, silakan coba lagi.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Terjadi kesalahan saat mengunggah bukti transfer.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEnrollment = (proofUrl) => {
    const data = {
      transactionId: "TRANSFER_" + new Date().getTime(),
      paymentMethod: "bank_transfer",
      amount: price,
      currency: "IDR",
      paymentStatus: "succeeded",
      userName: currentUser?.name,
      userEmail: currentUser?.email,
      classesId: cartItm ? [cartItm] : cart,
      proofUrl,
      date: new Date(),
    };

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (
          res.deleteResult.deletedCount > 0 &&
          res.paymentResult.insertedId &&
          res.updatedResult.modifiedCount > 0
        ) {
          setSucceeded("Pembayaran berhasil, kamu dapat mengakses kelas ini");
          navigate("/dashboard/my-classes"); 
        } else {
          setSucceeded("Pembayaran gagal, silakan coba lagi");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Jumlah Pembayaran : <span className="text-secondary">Rp{price.toLocaleString('id-ID')}</span>
        </h1>
      </div>
      <div className="text-center mt-4">
        <div className="bg-orange-100 p-4 rounded">
          <p className="text-lg">Transfer langsung ke rekening berikut:</p>
          <p className="font-bold text-lg">BRI 0123456789</p>
          <p className="text-lg">Atas Nama: Ayo Pintar</p>
          <p className="text-lg mt-2">Jumlah Transfer: Rp{price.toLocaleString('id-ID')}</p>
          <p className="text-sm mt-2">Setelah melakukan transfer, unggah bukti transfer di bawah ini dan konfirmasi pembayaran.</p>
          <form onSubmit={handleProofUpload} className="mt-4">
            <input type="file" accept="image/*" onChange={(e) => setProof(e.target.files[0])} className="mb-4" required />
            <button type="submit" disabled={isUploading} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
              {isUploading ? 'Mengunggah...' : 'Unggah Bukti Transfer'}
            </button>
            {uploadSuccess && <p className="text-green-500 mt-2">Bukti transfer berhasil diunggah!</p>}
          </form>
        </div>
      </div>
      {message && <p className="text-red-500">{message}</p>}
      {succeeded && <p className="text-green-500">{succeeded}</p>}
    </>
  );
};

export default CheckoutPayment;