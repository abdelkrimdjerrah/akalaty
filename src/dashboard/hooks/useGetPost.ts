import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function useGetPost<T extends Entities.PostEntity | Entities.PostEntity[]>(
  postId?: string
) {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<Entities.PostEntity[]>();

  useEffect(() => {
    const controller = new AbortController();
    const fetchUser = async () => {
      try {
        const response = await axiosPrivate.get(
          postId ? `/api/posts/${postId}` : "/api/posts",
          {
            signal: controller.signal,
          }
        );

        const result = postId ? response.data.post : response.data.posts;
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();

    return () => {
      controller.abort();
    };
  }, [axiosPrivate, postId, location, navigate]);

  return data as T;
}

export default useGetPost;
