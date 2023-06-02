import Post from "../../components/post/Post";
import { House } from "phosphor-react";
import { selectToken } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import useGetPost from "../../hooks/useGetPost";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AddPost from "../../components/post/AddPost";

function Home() {
  const [posts, setPosts] = useState<Entities.PostEntity[]>();
  const response:Entities.PostEntity[] = useGetPost() as Entities.PostEntity[];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (response) {
          setPosts(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();

    return () => {};
  }, [response]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <AddPost />
        <div className="flex flex-col gap-5">
          {posts &&
            posts.map((post: any) => (
              <div key={post._id}>
                <Post postObj={post} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
