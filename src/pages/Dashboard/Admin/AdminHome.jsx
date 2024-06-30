import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import AdminStats from "./AdminStats";

const AdminHome = () => {
  const { currentUser } = useUser();
  const axiosFetch = useAxiosFetch();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosFetch
      .get("/users")
      .then((res) => {
        setUsers(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto px-4 mt-24 md:mt-6">
      <div className="my-7">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          Selamat Datang,{" "}
          <span className="text-secondary">{currentUser?.name}</span>
        </h1>
      </div>
      <div className="my-4">
        <AdminStats users={users} />
      </div>
    </div>
  );
};

export default AdminHome;
