import { useEffect, useState } from "react";
import useAxiosFetch from "../../../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useUser from "../../../../../hooks/useUser";


// PAYMENTHISTORY
const MyPaymentHistory = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const {currentUser, email} = useUser();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedPayments, setPaginatedPayments] = useState([]);
  const totalItem = payments.length;
  const [page, setpage] = useState(1);
  let totalPage = Math.ceil(totalItem / 5);
  let itemsPerPage = 5;
  const handleChange = (event, value) => {
    setpage(value);
  }


  useEffect(() => {
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = payments.slice(firstIndex, lastIndex);
    setPaginatedPayments(currentItems);
  }, [page, payments])
    

  useEffect(() => {
    axiosFetch.get(`/payment-history/${currentUser?.email}`).then(res => {
      setPayments(res.data)
      setLoading(false)
    }).catch(err => console.log(err))
  }, [currentUser.email]);


  // TOTAL AMOUNT
  const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);


  if (loading) {
    return <p>Loading...</p>
  }


  // HISTORY PAYMENT
  return (
  <div>
    <div className="text-center mt-6 mb-16">
    <p className="text-gray-400">Hai, <span className="text-secondary font-bold">{currentUser.name}</span>Selamat datang...!</p>
    <h1 className="text-4xl font-bold">Riwayat <span className="text-secondary">Pembayaranku</span></h1>
    <p className="text-gray-500 text-sm my-3">Kamu bisa melihat riwayat pembayaranmu disini</p>
  </div>


  {/* TABEL */}
  <div>
    <div>
      <p className="font-bold">Total Transaki : {payments.length} </p>
      <p className="font-bold">Total Bayar : {totalPaidAmount}</p>
    </div>


    <div>
      <div>
        {
          paginatedPayments.map((payment, idx) => (
            <tr>
              <td>{idx + 1}</td>
              <td className="whitespace-nowrap px-6 py-4">{payment.amount}</td>
              <td className="whitespace-nowrap px-6 py-4">{payment.classesId}</td>
            </tr>
          ))
        }  
      </div>
    </div>
  </div>
  </div>
  )
};

export default MyPaymentHistory;