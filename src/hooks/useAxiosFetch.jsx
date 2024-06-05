import { useEffect } from "react";
import axios from "axios";

const useAxiosFetch = () => {
  const axiosInstance = axios.create({
    baseURL: "https://ayo-pintar-server.onrender.com",
  });

  // INTERCEPTORS
  useEffect(() => {
    // REQUEST INTERCEPTOR
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // DO SOMETHING BEFORE REQUEST IS SENT
        return config;
      },
      function (error) {
        // DO SOMETHING WITH REQUEST ERROR
        return Promise.reject(error);
      }
    );

    //  RESPONSE INTERCEPTOR
    // ADD A RESPONSE INTERCEPTOR
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        // ANY STATUS CODE THAT LIE WITHIN THE RANGE OF 2XX CAUSE THIS FUNCTION TO TRIGGER
        // DO SOMETHING WITH RESPONSE DATA
        return response;
      },
      function (error) {
        // ANY STATUS CODES THAT FALLS OUTSIDE THE RANGE OF 2XX CAUSE THIS FUNCTION TO TRIGGER
        // DO SOMETHING WITH RESPONSE ERROR
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance]);
  return axiosInstance;
};

export default useAxiosFetch;
