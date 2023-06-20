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
  const { _id, userId, text, images, likes, comments, createdAt } = postObj;
  console.log(postObj)
  const [username, setUsername] = useState("");

  const [deleted, setDeleted] = useState(false);

  const response = useGetUser<Entities.UserEntity>(userId);

  useEffect(() => {
    const fetchUsername = () => {
      try {
        if(response){
          setUsername(response.username);
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
          {
            deleted ? <h1>Post has been deleted !</h1> 
            :
            <>
              <PostHeader postId={_id} username={username} createdAt={createdAt} setDeleted={setDeleted}/>
              <PostText text={text} />
              {images?.length > 0 && <PostSlider images={images} />}
              <PostEngagement postId={_id} postComments={comments} postLikes={likes} />
            </>
          }
         
        </div>
      </div>
    </div>
  );
}

export default Post;
