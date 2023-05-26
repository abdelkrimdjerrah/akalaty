import Post from "../../components/post/Post";
import { HouseSimple } from "phosphor-react";
import { selectToken } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import useGetPost from "../../hooks/useGetPost";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


function Home() {
 
  const [posts, setPosts] = useState([]);
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        const response = await axiosPrivate.get("/api/posts", {
          signal: controller.signal,
        });
        if (isMounted) {
          setPosts(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  
  return (
    <div>
        <div className="flex flex-col gap-4">
          {/* <div className='flex gap-1 w-full'>
              <HouseSimple size={21}/>
              <p className='text-sm font-medium'>Home</p>
          </div> */}

          <div className="flex flex-col gap-5">
            {
              // posts && (    
              //   posts.ids.map((postID:string) => (
              //     <div key={postID}> <Post postID = {postID}/> </div>
              //   ))           
              // )
            }
          </div>
        </div>
      
    </div>
  );
}

export default Home;
