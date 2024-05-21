import React from "react";
import useUser from "../../hooks/useUser";
import { CircleLoader } from "react-spinners";
import DashboardNavigate from "../../routes/DashboardNavigate";

const Dashboard = () => {
  const { currentUser, isLoading } = useUser();
  const role = currentUser?.role;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* <CircleLoader color="#F97777" size={50} /> */}
      </div>
    );
  }
  return <DashboardNavigate />;
};

export default Dashboard;
