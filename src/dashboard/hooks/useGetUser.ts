import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function useGetUser<UserType extends Entities.UserEntity | Entities.UserEntity[]>(
  id?: string
) {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<UserType>();

  const controller = new AbortController();
    const { signal } = controller;

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        const response = await axiosPrivate.get(
          id ? `/api/users/${id}` : "/api/users",
          { signal }
        );

        setData(response.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();

    return () => {
      controller.abort();
    };
  }, [axiosPrivate, id, location, navigate]);

  return data;
}

export default useGetUser;
