import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const price = location?.state?.price;
  const [isPaid, setIsPaid] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false); 

  const handleReceiptUpload = (event) => {
    setReceipt(event.target.files[0]);
  };

  const handleConfirm = async () => {
    if (!receipt) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', receipt);
    formData.append('upload_preset', 'tmsbkop3');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/djkhs5zig/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }); 
      const imageUrl = response.data.secure_url;

      const phoneNumber = '6285314279164';
      const message = `Halo, saya ingin mengkonfirmasi pembayaran sebesar Rp${price?.toLocaleString('id-ID')}. Berikut adalah bukti pembayaran saya: ${imageUrl}`;
      const whatsappUrl = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(message)}&source=&data=${encodeURIComponent(imageUrl)}`;

      window.open(whatsappUrl, '_blank');
      setUploading(false);
      setIsConfirmed(true);
    } catch (error) {
      console.error('Error uploading the receipt:', error);
      setUploading(false);
    }
  };

  const handlePaid = () => {
    setIsPaid(true);
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>
        <p className="text-lg mb-2">Pembayaran Anda dengan nominal:</p>
        <p className="text-3xl font-semibold mb-4">Rp{price?.toLocaleString('id-ID')}</p>
        <p className="text-lg mb-2">
          Dapat dilakukan melalui transfer ke Bank BRI atas nama:
        </p>
        <p className="text-lg font-semibold mb-4">Muhammad Iqbal Nugraha</p>
        <div className="mb-4">
          <label htmlFor="receipt" className="block text-lg mb-2">Unggah Bukti Pembayaran:</label>
          <input type="file" id="receipt" onChange={handleReceiptUpload} className="block w-full text-lg"/>
        </div>
        {!isPaid ? (
          <div>
            <button
              onClick={handleConfirm}
              className={`bg-green-500 text-white py-2 px-4 rounded-lg mt-4 mr-2 ${(!receipt || uploading) && 'opacity-50 cursor-not-allowed'}`}
              disabled={!receipt || uploading || isConfirmed}
            >
              {uploading ? 'Mengunggah...' : 'Konfirmasi Pembayaran'}
            </button>
            <button
              onClick={handlePaid}
              className={`bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 ${(!receipt || uploading || !isConfirmed) && 'opacity-50 cursor-not-allowed'}`}
              disabled={!receipt || uploading || !isConfirmed}
            >
              Sudah Bayar
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-4"
          >
            <h2 className="text-2xl font-bold text-green-500">Terima Kasih!</h2>
            <p className="text-lg">Pembayaran Anda telah dikonfirmasi.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Payment;
