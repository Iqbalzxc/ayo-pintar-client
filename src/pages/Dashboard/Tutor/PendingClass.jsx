import React, { useEffect, useState } from 'react';
import useUser from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';

const PendingClass = () => {
  const [classes, setClasses] = useState([]);
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!isLoading) {
      axiosSecure.get(`/classes/${currentUser?.email}`)
        .then(res => {
          // Filter status "pending"
          const pendingClasses = res.data.filter(cls => cls.status === 'pending');
          setClasses(pendingClasses);
        })
        .catch(err => console.log(err));
    }
  }, [isLoading, currentUser, axiosSecure]);

  return (
    <div>
      <div className='my-9'>
        <h1 className='text-4xl font-bold text-center'>Kelas <span className='text-secondary'>Pending</span></h1>
        <div>
          <p className='text-[12px] text-center my-2'>Kamu bisa melihat semua kelas yang pending disini</p>
        </div>
      </div>

      <div>
        {classes.length === 0 ? (
          <div className='text-center text-2xl font-bold mt-10'>Tidak ada kelas pending</div>
        ) : (
          <div>
            {classes.map((cls, index) => (
              <div key={index} className='mb-5 hover:ring ring-secondary duration-200 focus:ring rounded-lg'>
                <div className='bg-white flex rounded-lg gap-8 shadow p-4'>
                  <div>
                    <img src={cls.image} alt="Gambar.jpg" className='max-h-[200px] max-w-[300px]'/>
                  </div>
                  <div className='w-full'>
                    <h2 className='text-[21px] font-bold text-secondary border-b pb-2 mb-2'>{cls.name}</h2>
                    <div>
                      <div>
                        <h1 className='font-bold mb-3'>Info : </h1>
                        <h1 className='text-secondary my-2'>
                          <span className='text-black'>Total Murid</span> :{""}
                          {cls.totalEnrolled ? cls.totalEnrolled : 0}
                        </h1>
                        <h1 className='text-secondary'>
                          <span className='text-black'>Kuota Tersedia</span> :{""}
                          {cls.availableSeats}
                        </h1>
                        <h1 className='text-secondary my-2'> 
                          <span className='text-black '>Status</span> :{" "}
                          <span className={`font-bold ${cls.status === "pending" ? "text-orange-400" : "text-red-600"}`}>
                            {cls.status}
                          </span>
                        </h1>
                      </div>
                      <div className=''>
                        <h1 className='font-bold mb-3'>....</h1>
                        <h1 className='text-secondary my-2'><span className='text-black'>Harga</span> : Rp{cls.price}</h1>
                        <h1 className='text-secondary my-2'><span className='text-black'>Submit</span> : <span className=''>{cls.submitted ? moment(cls.submitted).format('Do MMMM YYYY') : "Tidak ada data"}</span></h1>
                      </div>
                      <div className='w-1/3'>
                        <h1 className='font-bold mb-3'>Aksi : </h1>
                        <button onClick={() => navigate(`/dashboard/feedback/${cls._id}`)} className='px-3 bg-orange-400 font-bold py-1 text-white w-full rounded-lg'>Lihat Feedback</button>
                        <button className='px-3 bg-green-500 font-bold py-1 text-white w-full my-3 rounded-lg'>Lihat Detail</button>
                        <button className='px-3 bg-secondary font-bold py-1 text-white w-full rounded-lg' onClick={() => navigate(`/dashboard/update/${cls._id}`)}>Update</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingClass;
