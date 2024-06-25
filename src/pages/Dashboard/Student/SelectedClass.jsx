import { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import { MdDeleteSweep } from "react-icons/md";
import { BiMoney } from "react-icons/bi";
import Swal from "sweetalert2";

const SelectedClass = () => {
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (currentUser?.email) {
      axiosSecure.get(`/cart/${currentUser?.email}`)
        .then((res) => {
          setClasses(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, {currentUser, axiosSecure});

  // CALCULATE TOTAL PRICE
  const totalPrice = classes.reduce((acc, item) => {
    const price = parseFloat(item.price.toString().replace(/\./g, ''));
    return acc + price;
  }, 0);

  // HANDLE PAY
  const handlePay = (id) => {
    const item = classes.find((item) => item._id === id);
    const price = item.price;
    navigate('/dashboard/user/payment', { state: { price: price, itemId: id } });
  };

  // HANDLE DELETE
  const handleDelete = (id) => {
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
        axiosSecure.delete(`/delete-cart-item/${id}`)
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
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="my-6 text-center">
        <h1 className="text-2xl md:text-4xl font-bold">
          Kelas <span className="text-secondary">Pilihan </span>Saya
        </h1>
      </div>

      <div className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Keranjang :</h2>
          <div className="flex flex-col lg:flex-row gap-8">

            {/* LEFT */}
            <div className="w-full">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4 overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b text-white bg-secondary">
                      <th className="text-left font-semibold p-4 w-12">No.</th>
                      <th className="text-left font-semibold p-4 w-2/5">Nama Kelas</th>
                      <th className="text-left font-semibold p-4 w-1/5">Harga</th>
                      <th className="text-left font-semibold p-4 w-1/5">Tanggal</th>
                      <th className="text-left font-semibold p-4 w-1/5">Aksi</th>
                    </tr>
                  </thead>

                  {/* BODY */}
                  <tbody>
                    {classes.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-2xl font-bold py-4">
                          Tidak ada kelas
                        </td>
                      </tr>
                    ) : (
                      classes.map((item, idx) => {
                        return (
                          <tr key={item._id} className="border-b">
                            <td className="py-4 px-4">{idx + 1}</td>
                            <td className="py-4 px-4 break-all">
                              <div className="flex items-center">
                                <img src={item.image} alt={item.name} className="h-16 w-16 mr-4 object-cover rounded-lg" />
                                <span className="truncate w-full">{item.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">Rp{item.price}</td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <p className="text-green-700 text-sm">
                                {moment(item.submitted).format("DD MMMM YYYY")}
                              </p>
                            </td>
                            <td className="py-4 px-4 flex gap-2">
                              <button onClick={() => handleDelete(item._id)} className="px-3 py-1 cursor-pointer bg-red-500 rounded-3xl text-white font-bold flex items-center justify-center">
                                <MdDeleteSweep className="mr-1" />
                                Hapus
                              </button>
                              <button onClick={() => handlePay(item._id)} className="px-3 py-1 cursor-pointer bg-green-500 rounded-3xl text-white font-bold flex items-center justify-center">
                                <BiMoney className="mr-1" />
                                Bayar
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
            {/* Commented out total payment section */}
            {/* <div className="lg:w-1/4 w-full lg:relative lg:right-0 lg:top-0">
              <div className="bg-white rounded-lg shadow-md p-6 mt-8 lg:mt-0">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total Pembayaran</span>
                  <span className="font-semibold">Rp{totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <button onClick={() => navigate("/dashboard/user/payment", { state: { price: totalPrice, itemId: null } })} className="bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full">
                  Bayar disini
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedClass;