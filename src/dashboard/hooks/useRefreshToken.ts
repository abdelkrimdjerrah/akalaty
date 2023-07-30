import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../redux/userSlice";
import { useEffect, useState } from "react";
const useRefreshToken = () => {
  const dispatch = useDispatch();
  const [refreshToken, setRefreshToken] = useState<string>("");
  
  useEffect(()=>{
    const refresh = async () => {
      try {
        const { data } = await axios.get(`/api/auth/refresh`,{
          headers: {
            withCredentials: "true",
            credentials: 'include'
          },
          withCredentials: true,
        });
  
        dispatch(
          setAccessToken({ type: "token", data: data.accessToken })
        );
  
        setRefreshToken(data.accessToken);
      } catch (error) {}
    };

    refresh();

  })

  return refreshToken;
};

export default useRefreshToken;
