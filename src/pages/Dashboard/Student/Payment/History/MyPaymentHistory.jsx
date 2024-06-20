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
    <div>
      <div className="text-center mt-6 mb-16">
        <p className="text-gray-400">Hai, <span className="text-secondary font-bold">{currentUser.name}</span> Selamat datang...!</p>
        <h1 className="text-4xl font-bold">Riwayat <span className="text-secondary">Pembayaranku</span></h1>
        <p className="text-gray-500 text-sm my-3">Kamu bisa melihat riwayat pembayaranmu disini</p>
      </div>

      {/* TABEL */}
      <div>
        <div>
          <p className="font-bold text-center">Total Transaksi: {payments.length} </p>
          <p className="font-bold text-center">Total Bayar: {formatCurrency(totalPaidAmount)}</p>
        </div>

        <div>
          <div>
            <table className="mt-3">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Jumlah</th>
                  <th>Mata Uang</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {
                  paginatedPayments.map((payment, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}.</td>
                      <td className="whitespace-nowrap px-6 py-4">{formatCurrency(payment.amount)}</td>
                      <td className="whitespace-nowrap px-6 py-4">{payment.currency}</td>
                      <td className="whitespace-nowrap px-6 py-4">{formatDate(payment.date)}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPaymentHistory;