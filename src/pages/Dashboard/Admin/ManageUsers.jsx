import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [image, setImage] = useState(null);

  const KEY = import.meta.env.VITE_IMG_TOKEN;
  const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;

  useEffect(() => {
    axiosFetch
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  // DELETE USER
  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Anda akan menghapus pengguna ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus saja!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete-user/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Terhapus!", "Pengguna telah dihapus.", "success");
              setUsers(users.filter((user) => user._id !== id));
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  // UPDATE USER
  const handleUpdate = (user) => {
    setEditingUser(user);
  };

  const handleSaveUpdate = async (e) => {
    e.preventDefault();

    let updatedUser = { ...editingUser };

    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      const res = await fetch(`${API_URL}${image.name}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      updatedUser.photoUrl = data.data.url;
    }

    axiosSecure
      .put(`/update-user/${editingUser._id}`, updatedUser)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setUsers(
            users.map((user) =>
              user._id === editingUser._id ? updatedUser : user
            )
          );
          setEditingUser(null);
          setImage(null);
          Swal.fire("Update!", "Pengguna telah diperbarui.", "success");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // CHECK APAKAH 5 MB
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Ukuran file terlalu besar",
        text: "Ukuran file tidak boleh melebihi 5 MB",
      });
    } else {
      setImage(file);
    }
  };

  const getPhotoURL = (user) => {
    return user.photoURL || user.photoUrl || "https://via.placeholder.com/150";
  };

  return (
    <div className="container mx-auto p-4 mt-20 md:mt-6">
      <h1 className="text-center text-4xl font-bold my-7">
        Manage <span className="text-secondary">Pengguna</span>
      </h1>
      <div className="shadow-lg rounded-lg overflow-hidden">
        {users.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex flex-col md:flex-row items-center justify-between p-4"
              >
                <img
                  src={getPhotoURL(user)}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="flex-1 mx-2 text-center md:text-left">
                  {user.name}
                </h2>
                <p className="flex-1 mx-2 text-center md:text-left">
                  {user.email}
                </p>
                <p className="flex-1 mx-2 text-center md:text-left">
                  {user.role}
                </p>
                <button
                  onClick={() => handleUpdate(user)}
                  className="bg-blue-500 text-white py-1 px-2 rounded my-1 md:my-0"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded my-1 md:my-0"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-lg font-bold">
            Tidak ada pengguna
          </div>
        )}
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start pt-16 md:pt-0 md:items-center p-5 md:p-0 overflow-auto">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-xl md:max-w-2xl mt-5">
            <h2 className="text-2xl mb-2">Edit Pengguna</h2>
            <form onSubmit={handleSaveUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="mb-2">
                  <label className="block mb-1">Nama</label>
                  <input
                    type="text"
                    name="name"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    className="border p-1 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                    className="border p-1 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Role</label>
                  <select
                    name="role"
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                    className="border p-1 w-full"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="tutor">Tutor</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Jenis Kelamin</label>
                  <input
                    type="text"
                    name="gender"
                    value={editingUser.gender}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, gender: e.target.value })
                    }
                    className="border p-1 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Alamat</label>
                  <input
                    type="text"
                    name="address"
                    value={editingUser.address}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        address: e.target.value,
                      })
                    }
                    className="border p-1 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Nomor HP</label>
                  <input
                    type="text"
                    name="phone"
                    value={editingUser.phone}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, phone: e.target.value })
                    }
                    className="border p-1 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Unggah Foto</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-red-500 focus:ring-red-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Deskripsikan Diri Anda</label>
                  <input
                    type="text"
                    name="about"
                    value={editingUser.about}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, about: e.target.value })
                    }
                    className="border p-1 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Gelar</label>
                  <input
                    type="text"
                    name="title"
                    value={editingUser.title}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, title: e.target.value })
                    }
                    className="border p-1 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Universitas</label>
                  <input
                    type="text"
                    name="university"
                    value={editingUser.university}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        university: e.target.value,
                      })
                    }
                    className="border p-1 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Keahlian</label>
                  <input
                    type="text"
                    name="skills"
                    value={editingUser.skills}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, skills: e.target.value })
                    }
                    className="border p-1 w-full"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-1 px-3 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="bg-gray-500 text-white py-1 px-3 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
