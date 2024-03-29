import { useEffect, useState } from "react";
import PostHeader from "./PostHeader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PostEngagement from "./PostEngagement";
import PostSlider from "./PostSlider";
import Text from "../shared/Text";
import useGetUser from "../../hooks/useGetUser";

interface PostProps {
  postObj: any;
  ref?: any;
}

function Post({ postObj, ref }: PostProps) {
  const { _id, userId, text, images, likes, createdAt } = postObj;

  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");
  
  const [deleted, setDeleted] = useState(false);
  
  const response = useGetUser<Entities.UserEntity>(userId);


 

  useEffect(() => {
    
    const fetchUsername = () => {
      try {
        if (response?.username && response?.picture) {
          setUsername(response.username);
          setPicture(response.picture);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsername();

    return () => {};
  }, [response]);

  return (
    <div ref={ref} className="w-full bg-white rounded-2xl relative p-3 py-4 sm:p-5 sm:py-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {deleted ? (
            <h1>Post has been deleted !</h1>
          ) : (
            <>
              <PostHeader
                postId={_id}
                userId={userId}
                picture={picture}
                username={username}
                createdAt={createdAt}
                setDeleted={setDeleted}
              />
              <Text text={text} length={140}/>
              {images?.length > 0 && <PostSlider images={images} />}
              <PostEngagement
                postId={_id}
                postLikes={likes}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
