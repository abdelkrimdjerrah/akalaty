import Post from "../../components/post/Post";
import { HouseSimple } from "phosphor-react";
import { selectToken } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import useGetPost from "../../hooks/useGetPost";


function Home() {

  const postsData = useGetPost() 

  console.log("posts")
  console.log(postsData)
  console.log("posts")
  
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
