import { useEffect, useState } from "react";
import useAxiosPrivate from './useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";

function useGetUser(id?: any) {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState("");


  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const response = await axiosPrivate.get(
          id ? `/api/posts/${id}` : '/api/posts',
          {
            signal: controller.signal
          }
        );

        if (isMounted) {
          // Update state or perform any necessary actions with the fetched user data
          setData(response.data)
        }
      } catch (err) {
        console.error(err);
        navigate('/signin', { state: { from: location }, replace: true });
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
      controller.abort(); // Cancel the request if the component unmounts
    };
  }, [axiosPrivate, id, location, navigate]);

  return data

}

export default useGetUser;

