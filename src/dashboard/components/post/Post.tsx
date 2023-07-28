import { useEffect, useState } from "react";
import PostHeader from "./PostHeader";
import PostEngagement from "./PostEngagement";
import PostSlider from "./PostSlider";
import Text from "./Text";
import useGetUser from "../../hooks/useGetUser";

interface PostProps {
  postObj: any;
  ref?: any;
}

function Post({ postObj, ref }: PostProps) {
  const { _id, userId, text, images, likes, comments, createdAt } = postObj;

  console.log(text)
  console.log(images)
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
    <div ref={ref} className="w-full bg-white rounded-2xl relative p-5 py-6">
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
              <Text text={text} />
              {images?.length > 0 && <PostSlider images={images} />}
              <PostEngagement
                postId={_id}
                postComments={comments}
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
