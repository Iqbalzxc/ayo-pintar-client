import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // CONSOLE LOG UNTUK MEMASTIKAN USER DARI USEAUTH
  // CONSOLE.LOG("USER FROM USEAUTH:", USER);

  const {
    data: currentUser,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return null; 
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email && !!localStorage.getItem("token"),
  });

  // CONSOLE LOG UNTUK MEMASTIKAN DATA YANG DIAMBIL DARI API
  // CONSOLE.LOG("CURRENT USER FROM API:", CURRENTUSER);

  // MENGUBAH RETURN VALUE MENJADI OBJECT
  return { currentUser, isLoading, refetch }; 
};

export default useUser;
