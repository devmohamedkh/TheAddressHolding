import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthURLs } from "./apiUrls";


const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, 
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response, 
  async (error: any) => {

    if (error.response ) {
      const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;

    if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== AuthURLs.refreshToken) {
        originalRequest._retry = true;

        try {
         await axiosInstance.post(AuthURLs.refreshToken, {});

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          originalRequest._retry = false; 
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
