import { useEffect, useState } from "react";
import RecipeHeader from "./RecipeHeader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useGetUser from "../../hooks/useGetUser";
import RecipeImages from "./RecipeImages";

interface RecipeProps {
  recipeObj: any;
  ref?: any;
}

function Recipe({ recipeObj, ref }: RecipeProps) {
  const { _id, userId, text, type, rating, ingredients, duration, images, createdAt } = recipeObj;

  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");
  
  const [deleted, setDeleted] = useState(false);
  
  const response = useGetUser<Entities.UserEntity>(userId);


 

  useEffect(() => {
    
    const fetchUsername = () => {
      try {
        if (response?.username && response?.picture) {
          setUsername(response.username);
          setPicture(response.picture);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsername();

    return () => {};
  }, [response]);

  return (
    <div ref={ref} className="w-full bg-white rounded-2xl relative p-5 py-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {deleted ? (
            <h1>Recipe has been deleted !</h1>
          ) : (
            <>
              <RecipeHeader
                recipeId={_id}
                userId={userId}
                picture={picture}
                username={username}
                createdAt={createdAt}
                setDeleted={setDeleted}
              />
              {images?.length > 0 && <RecipeImages images={images} />}
              {/* <Text text={text} /> */}
              {/* <PostEngagement
                postId={_id}
                postLikes={likes}
              /> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recipe;
