import { Outlet } from "react-router-dom";
import NavBar from "../components/headers/NavBar";
import Footer from "../components/headers/Footer";

const MainLayout = () => {
  return (
    <main className="dark:bg-black overflow-hidden">
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
