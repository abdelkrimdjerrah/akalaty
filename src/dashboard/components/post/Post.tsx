import PostHeader from "./PostHeader";
import PostEngagement from "./PostEngagement";
import PostSlider from "./PostSlider";
import PostText from "./PostText";
import { useGetPostsQuery } from "../../../redux/postsSlice";
import { useGetOneUserQuery } from "../../../redux/usersSlice";
import { selectUserById } from "../../../redux/usersSlice";
import { useSelector } from "react-redux";

interface PostProps {
  postID: string; 
}

function Post({ postID } : PostProps) {

  
  const {
    data: posts,
    isSuccess,
  } = useGetPostsQuery(); 
  
  const { user , text , images , likes , comments } = posts.entities[postID]
  
  const {
    data: USER
  } = useGetOneUserQuery(user);

    const createdAt = posts?.entities[postID]?.createdAt
    const username = USER?.entities[user]?.username
  

  return (
    <div className="w-full bg-white rounded-2xl relative p-5 py-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <PostHeader postID={postID} username={username} createdAt={createdAt} />
          <PostText text={text}/>
          {images.length && <PostSlider images={images} />}
          <PostEngagement />
        </div>
      </div>
    </div>
  );
}

export default Post;
