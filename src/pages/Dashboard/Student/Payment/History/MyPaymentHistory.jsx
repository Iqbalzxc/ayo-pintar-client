import { useEffect, useState } from "react";
import useAxiosFetch from "../../../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useUser from "../../../../../hooks/useUser";

// PAYMENTHISTORY
const MyPaymentHistory = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const { currentUser, email } = useUser();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedPayments, setPaginatedPayments] = useState([]);
  const totalItem = payments.length;
  const [page, setpage] = useState(1);
  let totalPage = Math.ceil(totalItem / 5);
  let itemsPerPage = 5;
  const handleChange = (event, value) => {
    setpage(value);
  };

  useEffect(() => {
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = payments.slice(firstIndex, lastIndex);
    setPaginatedPayments(currentItems);
  }, [page, payments]);

  useEffect(() => {
    axiosFetch.get(`/payment-history/${currentUser?.email}`).then(res => {
      setPayments(res.data);
      setLoading(false);
      console.log(res.data);
    }).catch(err => console.log(err));
  }, [currentUser.email]);

  // TOTAL AMOUNT
  const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);

  if (loading) {
    return <p className="flex h-screen items-center justify-center">Loading...</p>;
  }

  // FORMAT DATE
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // FORMAT CURRENCY / MATA UANG KE IDR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  // HISTORY PAYMENT
  return (
    <div className="p-4">
      <div className="text-center mt-6 mb-16">
        <h1 className="text-4xl font-bold">Riwayat <span className="text-secondary">Pembayaranku</span></h1>
        <p className="text-gray-500 text-sm my-3">Hai, <span className="text-secondary font-bold">{currentUser.name}</span> kamu bisa melihat riwayat pembayaran disini</p>
      </div>

      {/* TABEL */}
      <div className="overflow-x-auto">
        <div className="mb-4">
          <p className="font-bold text-center">Total Transaksi: {payments.length}</p>
          <p className="font-bold text-center">Total Bayar: {formatCurrency(totalPaidAmount)}</p>
        </div>

        <div>
          <table className="w-full border-secondary">
            <thead className="bg-secondary">
              <tr>
                <th className="p-2 border text-white">No</th>
                <th className="p-2 border text-white">Jumlah</th>
                <th className="p-2 border text-white">Mata Uang</th>
                <th className="p-2 border text-white">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {
                paginatedPayments.length > 0 ? (
                  paginatedPayments.map((payment, idx) => (
                    <tr key={idx} className="text-center">
                      <td className="p-2 border">{(page - 1) * itemsPerPage + idx + 1}</td>
                      <td className="p-2 border">{formatCurrency(payment.amount)}</td>
                      <td className="p-2 border">{payment.currency}</td>
                      <td className="p-2 border">{formatDate(payment.date)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center">Tidak ada transaksi</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPaymentHistory;