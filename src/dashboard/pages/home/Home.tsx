import Post from "../../components/post/Post";
import { HouseSimple } from "phosphor-react";
import { useGetPostsQuery } from "../../../redux/postsSlice";

function Home() {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  return (
    <div>
      {
        isLoading ? 
          <div className="w-full bg-white rounded-2xl relative p-5 py-6">Loading ...</div>
        : null
      }
      { isSuccess &&
        <div className="flex flex-col gap-4">
          {/* <div className='flex gap-1 w-full'>
              <HouseSimple size={21}/>
              <p className='text-sm font-medium'>Home</p>
          </div> */}

          <div className="flex flex-col gap-5">
            {
              posts && (    
                posts.ids.map((postID:string) => (
                  <div key={postID}> <Post postID = {postID}/> </div>
                ))           
              )
            }
          </div>
        </div>
      }
    </div>
  );
}

export default Home;
