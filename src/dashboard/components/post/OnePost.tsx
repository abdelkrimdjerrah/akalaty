import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import useGetPost from "../../hooks/useGetPost";
import Post from "./Post";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../shared/Loader";

function OnePost() {
  const [postObj, setPostObj] = useState<Entities.IPost>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const axiosPrivate = useAxiosPrivate();


  const { id } = useParams();

  useEffect(() => {
    const getOnePost = async () => {
      try {
        setLoading(true);
        const { data } = await axiosPrivate.get(`/api/posts/${id}`);
        setLoading(false);
        if (data.success) {
          const result = data.post;
          setPostObj(result);
        } else {
          setError(true);
        }
      } catch (err) {

          setError(true);
      }
    };

    getOnePost();

  }, [id]);

  return (
    <>
      {postObj ? <Post postObj={postObj} /> : null}
      {error ? <p>Post not found</p> : null}
      {loading && (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      )}
    </>
  );
}

export default OnePost;
