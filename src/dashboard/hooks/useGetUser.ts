import { useEffect, useState } from "react";
import useAxiosPrivate from './useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";

function useGetUser(id?: string) {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const dispatch = useDispatch()


  useEffect(() => {
    const controller = new AbortController();


    const fetchUser = async () => {
      try {
        const response = await axiosPrivate.get(
          id ? `/api/users/${id}` : '/api/users',
          {
            signal: controller.signal
          }
        );

     
          // Update state or perform any necessary actions with the fetched user data
          setData(response.data)
    
      } catch (err) {
        console.error(err);
        // dispatch(logoutUser())
        // navigate('/signin', { state: { from: location }, replace: true });
      }
    };

    fetchUser();

    return () => {
 
      controller.abort(); // Cancel the request if the component unmounts
    };
  }, [axiosPrivate, id, location, navigate]);

  return data

}

export default useGetUser;
