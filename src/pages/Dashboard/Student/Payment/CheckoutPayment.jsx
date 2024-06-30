import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const CheckoutPayment = ({ price, cartItm }) => {
  const URL = `https://ayo-pintar-server.onrender.com/payment-info?${
    cartItm ? `classId=${cartItm}` : ""
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

  // BUKTI PEMBAYARAN
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
        // console.log(res);
        if (
          res.deleteResult.deletedCount > 0 &&
          res.paymentResult.insertedId &&
          res.updatedResult.modifiedCount > 0
        ) {
          setSucceeded("Pembayaran berhasil, kamu dapat mengakses kelas ini");
          navigate("/dashboard/user/payment");
        } else {
          setSucceeded("Pembayaran gagal, silakan coba lagi");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Jumlah Pembayaran :{" "}
          <span className="text-secondary">Rp{price.toLocaleString("id-ID")}</span>
        </h1>
      </div>
      <div className="text-center mt-4">
        <div className="bg-secondary p-4 rounded text-white">
          <p className="text-lg">Transfer langsung ke rekening berikut:</p>
          <p className="font-bold text-lg">BRI 4190 0101 4378 533</p>
          <p className="text-lg">Atas Nama: Muhammad Iqbal Nugraha</p>
          <p className="text-lg mt-2">Jumlah Transfer: <span className="font-bold border border-black p-1 bg-black text-white">Rp{price.toLocaleString("id-ID")}</span></p>
          <p className="text-sm mt-2">
            Setelah melakukan transfer, unggah bukti transfer di bawah ini dan
            konfirmasi pembayaran ke{" "}
            <a
              href="https://wa.me/+6285872893120"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-extrabold underline"
            >
              Admin
            </a>.
          </p>
          <form onSubmit={handleProofUpload} className="mt-4 flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProof(e.target.files[0])}
              className="block w-full mb-4 text-white"
              required
            />
            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              {isUploading ? "Mengunggah..." : "Unggah Bukti Transfer"}
            </button>
            {uploadSuccess && (
              <p className="text-green-500 mt-2">Bukti transfer berhasil diunggah!</p>
            )}
          </form>
        </div>
      </div>
      {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
      {succeeded && <p className="text-green-500 mt-4 text-center">{succeeded}</p>}
    </div>
  );
};

export default CheckoutPayment;