import { useContext, useEffect } from "react";
import { AuthContext } from "../utilities/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAxiosSecure = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "https://ayo-pintar-server.onrender.com",
  });
  useEffect(() => {
    // ADD A REQUEST INTERCEPTOR
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        // DO SOMETHING BEFORE REQUEST IS SENT
        const token = localStorage.getItem("token");
        // CONSOLE.LOG('TOKEN:', TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.eject(error)
    );

    // ADD A RESPONSE INTERCEPTOR
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logout();
          navigate("/login");
          throw error;
        }

        throw error;
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.request.eject(responseInterceptor);
    };
  }, [logout, navigate, axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
