import Post from "./Post"
import { HouseSimple } from "phosphor-react"


function Home() {
  return (
    <div>
      <div className="flex flex-col gap-4">

        {/* <div className='flex gap-1 w-full'>
            <HouseSimple size={21}/>
            <p className='text-sm font-medium'>Home</p>
        </div> */}

        <div className="flex flex-col gap-5">
          <Post with/>
          <Post with/>
          <Post />
        </div>

      </div>
      
    </div>
  )
}

export default Home