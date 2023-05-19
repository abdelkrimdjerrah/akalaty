import PostHeader from "./PostHeader";
import PostEngagement from "./PostEngagement";
import PostSlider from "./PostSlider";
import PostText from "./PostText";
import { useGetPostsQuery } from "../../../redux/postsSlice";
import { useGetUsersQuery } from "../../../redux/usersSlice";

const img1 = require("../../../assets/img1.jpeg");
const img2 = require("../../../assets/img2.jpeg");
const img3 = require("../../../assets/img3.jpeg");
const img4 = require("../../../assets/img4.jpeg");
const images: string[] = [img1, img2, img3, img4,'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'];

interface PostProps {
  postID: string; 
}

function Post({ postID } : PostProps) {

  const {
    data: posts,
  } = useGetPostsQuery();

  const {
    data: users
  } = useGetUsersQuery();
  

  const { user , text , images , likes , comments } = posts.entities[postID]
  const createdAt = posts?.entities[postID]?.createdAt
  const username = users?.entities[user]?.username

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
