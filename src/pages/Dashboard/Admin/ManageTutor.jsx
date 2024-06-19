import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageTutor = () => {
  const [appliedTutors, setAppliedTutors] = useState([]);
  const [tutors, setTutors] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Fetch applied tutors
    axiosSecure.get("/applied-tutors")
      .then(res => setAppliedTutors(res.data))
      .catch(err => console.log(err));

    // Fetch users with tutor role
    axiosSecure.get("/users/tutors")
      .then(res => setTutors(res.data))
      .catch(err => console.log(err));
  }, [axiosSecure]);

  const handleRoleChange = (userId, newRole) => {
    axiosSecure.put(`/update-user/${userId}`, { role: newRole })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire('Updated!', 'Role has been updated.', 'success');
          setTutors(tutors.map(tutor => tutor._id === userId ? { ...tutor, role: newRole } : tutor));
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-center text-4xl font-bold my-7'>Kelola <span className='text-secondary'>Tutor</span></h1>

      <div className="shadow-lg rounded-lg overflow-hidden mb-8">
        <h2 className='text-2xl font-bold mb-4'>Mendaftar Tutor</h2>
        {appliedTutors.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {appliedTutors.map((tutor) => (
              <div key={tutor._id} className='flex items-center justify-between p-4'>
                <h2 className="flex-1 mx-2">{tutor.name}</h2>
                <p className="flex-1 mx-2">{tutor.email}</p>
                <p className="flex-1 mx-2">{tutor.experience}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-lg font-bold">Tidak ada tutor</div>
        )}
      </div>

      <div className="shadow-lg rounded-lg overflow-hidden">
        <h2 className='text-2xl font-bold mb-4'>Tutor</h2>
        {tutors.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {tutors.map((tutor) => (
              <div key={tutor._id} className='flex items-center justify-between p-4'>
                <img src={tutor.photoUrl} alt={tutor.name} className='w-10 h-10 rounded-full' />
                <h2 className="flex-1 mx-2">{tutor.name}</h2>
                <p className="flex-1 mx-2">{tutor.email}</p>
                <p className="flex-1 mx-2">{tutor.role}</p>
                <button onClick={() => handleRoleChange(tutor._id, 'user')} className='bg-red-500 text-white py-1 px-2 rounded'>Demote to User</button>
                <button onClick={() => handleRoleChange(tutor._id, 'admin')} className='bg-green-500 text-white py-1 px-2 rounded'>Promote to Admin</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-lg font-bold">Tidak ada tutor</div>
        )}
      </div>
    </div>
  );
}

export default ManageTutor;
