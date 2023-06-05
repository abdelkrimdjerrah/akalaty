import { useEffect, useState } from "react";
import PostHeader from "./PostHeader";
import PostEngagement from "./PostEngagement";
import PostSlider from "./PostSlider";
import PostText from "./PostText";
import useGetUser from "../../hooks/useGetUser";

interface PostProps {
  postObj: any;
  ref?: any;
}

function Post({ postObj, ref }: PostProps) {
  const { _id, user, text, images, likes, comments, createdAt } = postObj;

  const [username, setUsername] = useState("");

  const response = useGetUser<Entities.UserEntity>(user);

  useEffect(() => {
    const fetchUsername = () => {
      try {
        setUsername(response?.username);
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
          <PostHeader postId={_id} username={username} createdAt={createdAt} />
          <PostText text={text} />
          {images.length > 0 && <PostSlider images={images} />}
          <PostEngagement postId={_id} />
        </div>
      </div>
    </div>
  );
}

export default Post;
