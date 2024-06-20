import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManageTutor = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    axiosFetch.get("/users")
      .then(res => {
        const allUsers = res.data;
        const tutors = allUsers.filter(user => user.role === 'tutor');
        const applicants = allUsers.filter(user => user.role === 'user' && user.isRequestingTutor);
        setUsers(tutors);
        setApplicants(applicants);
      })
      .catch(err => console.log(err));
  }, []);

  const handleUpdate = (user) => {
    setEditingUser(user);
  };

  const handleSaveUpdate = async (e) => {
    e.preventDefault();

    let updatedUser = { ...editingUser };

    axiosSecure.put(`/update-user/${editingUser._id}`, { role: updatedUser.role })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          setUsers(users.map(user => user._id === editingUser._id ? updatedUser : user));
          setEditingUser(null);
          Swal.fire('Updated!', 'Pengguna telah diperbarui.', 'success');
        }
      })
      .catch(err => console.log(err));
  };

  const getPhotoURL = (user) => {
    return user.photoURL || user.photoUrl || 'https://via.placeholder.com/150'; // Placeholder image URL
  };

  const renderUserCard = (user, isApplicant = false) => (
    <div key={user._id} className='flex items-center justify-between p-4'>
      <img src={getPhotoURL(user)} alt={user.name} className='w-10 h-10 rounded-full' />
      <h2 className="flex-1 mx-2">{user.name}</h2>
      <p className="flex-1 mx-2">{user.email}</p>
      {isApplicant && <p className="flex-1 mx-2">{user.experience}</p>}
      <button onClick={() => handleUpdate(user)} className='bg-blue-500 text-white py-1 px-2 rounded'>Edit</button>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className='text-center text-4xl font-bold my-7'>Kelola <span className='text-secondary'>Tutor</span></h1>
      
      <h2 className="text-2xl font-bold mb-4">Daftar Permintaan Tutor</h2>
      <div className="shadow-lg rounded-lg overflow-hidden mb-6">
        {applicants.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {applicants.map((user) => renderUserCard(user, true))}
          </div>
        ) : (
          <div className="p-4 text-center text-lg font-bold">Tidak ada permintaan tutor</div>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-4">Daftar Tutor</h2>
      <div className="shadow-lg rounded-lg overflow-hidden">
        {users.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {users.map((user) => renderUserCard(user))}
          </div>
        ) : (
          <div className="p-4 text-center text-lg font-bold">Tidak ada tutor</div>
        )}
      </div>

      {editingUser && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-4 rounded-lg shadow-lg w-full max-w-xl'>
            <h2 className='text-2xl mb-2'>Edit Peran</h2>
            <form onSubmit={handleSaveUpdate}>
              <div className='mb-2'>
                <label className='block mb-1'>Role</label>
                <select name='role' value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })} className='border p-1 w-full'>
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                  <option value='tutor'>Tutor</option>
                </select>
              </div>
              <div className='flex justify-between mt-4'>
                <button type='submit' className='bg-green-500 text-white py-1 px-3 rounded'>Save</button>
                <button type='button' onClick={() => setEditingUser(null)} className='bg-gray-500 text-white py-1 px-3 rounded'>Cancel</button>
              </div>
            </form> 
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageTutor;