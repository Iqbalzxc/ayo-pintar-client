import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Swal from "sweetalert2";

const ManageClasses = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [feedbackClass, setFeedbackClass] = useState(null);
  const [reason, setReason] = useState('');
  const itemPerPage = 5;
  const totalPage = Math.ceil(classes.length / itemPerPage);

  useEffect(() => {
    axiosFetch.get('/classes-manage')
      .then(res => setClasses(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const lastIndex = Math.min(page * itemPerPage, classes.length);
    const firstIndex = lastIndex - itemPerPage;
    const currentData = classes.slice(firstIndex, lastIndex);
    setPaginatedData(currentData);
  }, [page, classes]);

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/change-status/${id}`, { status: 'approved' });
      console.log(res.data);
      alert('Berhasil disetujui');
      const updateClasses = classes.map(cls => cls._id === id ? { ...cls, status: 'approved' } : cls);
      setClasses(updateClasses);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Apakah kamu yakin?',
        text: 'Anda akan menolak kelas ini!',
        icon: 'warning',
        input: 'text',
        inputPlaceholder: 'Berikan alasan penolakan...',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, tolak saja!'
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/change-status/${id}`, { status: 'rejected', reason: result.value });
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: 'Tolak saja',
            text: 'Berhasil ditolak',
            icon: 'success',
          });
          const updateClasses = classes.map(cls => cls._id === id ? { ...cls, status: 'rejected', reason: result.value } : cls);
          setClasses(updateClasses);
          console.log(res.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFeedback = (cls) => {
    setFeedbackClass(cls);
    setReason(cls.reason || '');
  };

  const handleSaveFeedback = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(`/change-status/${feedbackClass._id}`, { status: feedbackClass.status, reason });
      if (res.data.modifiedCount > 0) {
        setClasses(classes.map(cls => cls._id === feedbackClass._id ? { ...cls, reason } : cls));
        setFeedbackClass(null);
        Swal.fire('Umpan Balik Disimpan!', 'Umpan balik telah disimpan.', 'success');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <h1 className="text-4xl text-secondary font-bold text-center my-10">
        Kelola <span className="text-black">Kelas</span>
      </h1>
      <div className="">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">FOTO</th>
                      <th scope="col" className="px-6 py-4">NAMA KELAS</th>
                      <th scope="col" className="px-6 py-4">NAMA TUTOR</th>
                      <th scope="col" className="px-6 py-4">STATUS</th>
                      <th scope="col" className="px-6 py-4">DETAIL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-2xl font-bold">Tidak ada kelas</td>
                      </tr>
                    ) : (
                      paginatedData.map((cls) => (
                        <tr key={cls._id} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                          <td className="whitespace-nowrap px-6 py-4">
                            <img src={cls.image} className="h-[35px] w-[35px]" alt="" />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">{cls.name}</td>
                          <td className="whitespace-nowrap px-6 py-4">{cls.tutorName}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span className={`font-bold ${cls.status === "pending" ? "bg-orange-400" : cls.status === "checking" ? "bg-yellow-500" : cls.status === "approved" ? "bg-green-600" : "bg-red-600"} px-2 py-1 uppercase text-white rounded-xl`}>
                              {cls.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex gap-2">
                              <button onClick={() => handleApprove(cls._id)} className="text-[12px] cursor-pointer disabled:bg-green-700 bg-green-500 py-1 rounded-md px-2 text-white" disabled={cls.status === 'approved'}>
                                Setujui
                              </button>
                              <button onClick={() => handleReject(cls._id)} className="cursor-pointer bg-red-600 py-1 rounded-md px-2 text-white"> Tolak </button>
                              <button onClick={() => handleFeedback(cls)} className="cursor-pointer bg-red-600 py-1 rounded-md px-2 text-white">
                                Umpan Balik
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Stack spacing={2} className="flex justify-center mt-4">
        <Pagination count={totalPage} page={page} onChange={handlePageChange} color="primary" />
      </Stack>

      {feedbackClass && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-4 rounded-lg shadow-lg w-full max-w-xl'>
            <h2 className='text-2xl mb-2'>Umpan Balik untuk {feedbackClass.name}</h2>
            <form onSubmit={handleSaveFeedback}>
              <div className='mb-4'>
                <label className='block mb-1'>Alasan / Umpan Balik</label>
                <textarea
                  name='reason'
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className='border p-2 w-full'
                  rows='4'
                />
              </div>
              <div className='flex justify-between mt-4'>
                <button type='submit' className='bg-green-500 text-white py-1 px-3 rounded'>Save</button>
                <button type='button' onClick={() => setFeedbackClass(null)} className='bg-gray-500 text-white py-1 px-3 rounded'>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
