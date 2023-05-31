import { useEffect, useState } from "react";
import useAxiosPrivate from './useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";

function useGetPost(postId?: any) {
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
          postId ? `/api/posts/${postId}` : '/api/posts',
          {
            signal: controller.signal
          }
        );

        if (isMounted) {
          // Update state or perform any necessary actions with the fetched user data
          const result = postId ? response.data.post : response.data.posts
          setData(result)
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
  }, [axiosPrivate, postId, location, navigate]);

  return data

}

export default useGetPost;

