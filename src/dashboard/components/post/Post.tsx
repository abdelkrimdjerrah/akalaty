import { useEffect, useState } from "react";
import PostHeader from "./PostHeader";
import PostEngagement from "./PostEngagement";
import PostSlider from "./PostSlider";
import PostText from "./PostText";
import useGetUser from "../../hooks/useGetUser";

interface PostProps {
  postObj: any;
}

function Post({ postObj }: PostProps) {
  const { _id, user, text, images, likes, comments, createdAt } = postObj;

  const [username, setUsername] = useState("");

  const response: any = useGetUser(user);

  useEffect(() => {
    let isMounted = true;

    const fetchUsername = () => {
      try {
        if (isMounted) {
          setUsername(response.username);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsername();

    return () => {
      isMounted = false;
    };
  }, [response]);


  return (
    <div className="w-full bg-white rounded-2xl relative p-5 py-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <PostHeader postID={_id} username={username} createdAt={createdAt} />
          <PostText text={text} />
          {images.length > 0 && <PostSlider images={images} />}
          <PostEngagement postID={_id}/>
        </div>
      </div>
    </div>
  );
}

export default Post;
