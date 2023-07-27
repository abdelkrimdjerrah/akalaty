import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/userSlice";
import useRefreshToken from "../hooks/useRefreshToken";

const BASE_URL = "http://localhost:27015";
// const BASE_URL = "https://akalaty-back.vercel.app";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: "true",
  },
  withCredentials: true,
});

const token: string | null = localStorage.getItem("token");

// const token = useSelector(selectToken);
// const refresh = useRefreshToken();

// Set up the interceptors for axios private
axiosPrivate.interceptors.request.use(
  (config) => {
    if (!config.headers["Authorization"] && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.resolve(error.response)
  }
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    // const prevRequest = error?.config;
    // if (error?.response?.status === 403 && !prevRequest?.sent) {
    //   prevRequest.sent = true;
    //   const newAccessToken = await refresh();
    //   prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
    //   return axiosPrivate(prevRequest);
    // }
    return Promise.resolve(error.response);
  }
);
