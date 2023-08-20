import { useState } from "react";
import UserItem from "../shared/UserItem";
import { DotsThree } from "phosphor-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { selectUserData } from "../../redux/userSlice";
import { useSelector } from "react-redux";

const Abdelkrim = require("../../../assets/Abdelkrim.png");

interface RecipeProps {
  recipeId: string;
  userId: string;
  picture: string;
  username: string;
  createdAt?: Date;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

function RecipeHeader({ recipeId, username, picture, userId, createdAt, setDeleted }: RecipeProps) {
  const [bookmark, setBookmark] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const JWTuserData = useSelector(selectUserData)

  const axiosPrivate = useAxiosPrivate();

  let created

  console.log(createdAt)
  if(createdAt){
    created = new Date(createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  }

  const handleDeleteRecipe = async () => {
    try {
      setLoading(true);
      const { data } = await axiosPrivate.delete(`/api/recipes/${recipeId}`);
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
                <div className=" bg-white shadow-sm border border-gray-200 text-sm absolute right-0 top-5 z-10 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md">
                  {/* <p className="cursor-pointer">Edit</p> */}
                  <p
                    className="text-red-600 cursor-pointer"
                    onClick={handleDeleteRecipe}
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

export default RecipeHeader;
