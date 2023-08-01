import axios from "axios";

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
