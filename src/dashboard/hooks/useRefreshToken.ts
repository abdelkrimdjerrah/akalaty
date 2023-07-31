import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../redux/userSlice";
const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    axios.defaults.withCredentials = true;
    const { data } = await axios.get("/api/auth/refresh", {
      withCredentials: true,
    });

    dispatch(setAccessToken({ type: "token", data: data.accessToken }));

    return data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
