import { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import { MdDelete, MdDeleteSweep } from "react-icons/md";
import { BiMoney } from "react-icons/bi";
import Swal from "sweetalert2";

const SelectedClass = () => {
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [page, setPage] = useState(1);
  const itemPerPage = 5;
  const totalPages = Math.ceil(classes.length / itemPerPage);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(
    () => {
      if (currentUser?.email) {
        axiosSecure
          .get(`/cart/${currentUser?.email}`)
          .then((res) => {
            setClasses(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    },
    { currentUser, axiosSecure }
  );


  // CALCULATE TOTAL PRICE
  const totalPrice = classes.reduce((acc, item) => {
    const price = parseFloat(item.price.toString().replace(/\./g, ''));
    return acc + price;
  }, 0);
  const price = totalPrice;


  // HANDLE PAY
  const handlePay = (id) => {
    // console.log(id);
    const item = classes.find((item) => item._id === id);
    const price = item.price;
    console.log(price);
    navigate('/dashboard/user/payment', { state : { price : price, itemId: id } })
  } 


  // HANDLE/MANAGE DELETE ALERT
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Anda akan menghapus kelas ini dari daftar pilihan kelas!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus saja!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete-cart-item/${id}`)
          .then((res) => {
            if (res.data && res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Kelas telah dihapus dari daftar pilihan kelas.",
                icon: "success",
              });
              const newClasses = classes.filter((item) => item._id !== id);
              setClasses(newClasses);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="my-6 text-center">
        <h1 className="text-4xl font-bold">
          Kelas <span className="text-secondary">Pilihan </span>Saya
        </h1>
      </div>

      <div className="h-screen py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Keranjang: </h2>
          <div className="flex flex-col md:flex-row gap-4">


            {/* LEFT */}
            <div className="md:w-3/4 ">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">#</th>
                      <th className="text-left font-semibold">Nama Kelas</th>
                      <th className="text-left font-semibold">Harga</th>
                      <th className="text-left font-semibold">Tanggal</th>
                      <th className="text-left font-semibold">Aksi</th>
                    </tr>
                  </thead>


                  {/* TABLE BODY */}
                  <tbody>
                    {classes.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center text-2xl font-bold"
                        >
                          Tidak ada kelas
                        </td>
                      </tr>
                    ) : (
                      classes.map((item, idx) => {
                        const letIdx = (page - 1) * itemPerPage + idx + 1;
                        return (
                          <tr key={item._id}>
                            <td className="py-4">{letIdx}</td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <img
                                  src={item.image}
                                  alt=""
                                  className="h-16 w-16 mr-4"
                                />
                                <span>{item.name}</span>
                              </div>
                            </td>
                            <td className="py-4">Rp{item.price}</td>
                            <td className="py-4">
                              <p className="text-green-700 text-sm">
                                {moment(item.submitted).format("DD MMMM YYYY")}
                              </p>
                            </td>
                            <td className="py-4 flex pt-8 gap-2">
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="px-3 py-1 cursor-pointer bg-red-500 rounded-3xl text-white font-bold"
                              >
                                <MdDeleteSweep />
                              </button>
                              <button onClick={() => handlePay(item._id)} className="px-3 py-1 cursor-pointer bg-green-500 rounded-3xl text-white font-bold">
                                <BiMoney className="mr-2" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>


            {/* RIGHT */}
            <div className="md:w-1/5 fixed right-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total Pembayaran</span>
                  <span className="font-semibold">Rp{price.toLocaleString('id-ID')}</span>
                </div>
                <button disabled={price <= 0 } onClick={() => navigate("/dashboard/user/payment", { state : { price: price, itemId: null }})} className="bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full">
                  Bayar disini
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedClass;
