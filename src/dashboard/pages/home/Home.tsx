import Post from "../../components/post/Post";
import { HouseSimple } from "phosphor-react";
import useGetUser from "../../hooks/useGetUser";
import { loginUser, selectUser } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  
  const getUser = useGetUser();

  const dispatch = useDispatch();
  dispatch(loginUser({type: 'user', ...getUser}))
  
  const loggedInUser = useSelector(selectUser);
  console.log(getUser)
  
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
