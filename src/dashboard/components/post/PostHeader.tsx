import { useState } from "react";
import UserItem from "../shared/UserItem";
import { DotsThree } from "phosphor-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { selectUserData } from "../../redux/userSlice";
import { useSelector } from "react-redux";

const Abdelkrim = require("../../../assets/Abdelkrim.png");

interface PostProps {
  postId: string;
  userId: any;
  picture: string;
  username: string;
  createdAt: Date;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

function PostHeader({ postId, username, picture, userId, createdAt, setDeleted }: PostProps) {
  const [bookmark, setBookmark] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const JWTuserData = useSelector(selectUserData)

  const axiosPrivate = useAxiosPrivate();

  const created = new Date(createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const handleDeletePost = async () => {
    try {
      setLoading(true);
      const { data } = await axiosPrivate.delete(`/api/posts/${postId}`);
      if (!data?.success) {
        console.log("error");
        return;
      } else {
        setDeleted(true);
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full justify-between">
      <UserItem name={username} text={created} picture={picture} />
      <div className="flex gap-1">
        {/* <div onClick={() => setBookmark(!bookmark)}>
          {bookmark ? (
            <BookmarkSimple size={21} weight="fill" />
          ) : (
            <BookmarkSimple size={21} />
          )}
        </div> */}
        {
          userId === JWTuserData?._id && (
            <div className="relative">
              <DotsThree size={21} onClick={() => setShowMenu(!showMenu)} />
              {showMenu && (
                <div className=" text-sm py-3 px-3 absolute right-0 top-7 z-10 flex flex-col items-center bg-gray-100 shadow-md gap-2">
                  {/* <p className="cursor-pointer">Edit</p> */}
                  <p
                    className="text-red-600 cursor-pointer"
                    onClick={handleDeletePost}
                  >
                    Delete
                  </p>
                </div>
              )}
            </div>
          )
        }
      </div>
    </div>
  );
}

export default PostHeader;
