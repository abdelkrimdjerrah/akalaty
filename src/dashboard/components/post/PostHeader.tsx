import { useState } from "react";
import UserItem from "../../shared/UserItem";
import { DotsThree, BookmarkSimple } from "phosphor-react";

const Abdelkrim = require("../../../assets/Abdelkrim.png");

interface PostProps {
  postId: string;
  username: string;
  createdAt: Date;
}

function PostHeader({ postId, username, createdAt }: PostProps) {
  const created = new Date(createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const [bookmark, setBookmark] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  return (
    <div className="flex w-full justify-between">
      <UserItem name={username} text={created} picture={Abdelkrim} />
      <div className="flex gap-1">
        <div onClick={() => setBookmark(!bookmark)}>
          {bookmark ? (
            <BookmarkSimple size={21} weight="fill" />
          ) : (
            <BookmarkSimple size={21} />
          )}
        </div>
        <div className="relative">
          <DotsThree size={21} onClick={()=> setShowMenu(!showMenu)}/>
          {
            showMenu && (
              <div className=" text-sm py-3 px-3 absolute right-0 top-7 z-10 flex flex-col items-center bg-gray-100 shadow-md gap-2">
                <p>Edit</p> 
                <div className="h-[1px] w-full bg-gray-300" />
                <p className="text-red-600">Delete</p> 
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
