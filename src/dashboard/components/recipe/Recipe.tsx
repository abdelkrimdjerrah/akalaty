import { useEffect, useState } from "react";
import RecipeHeader from "./RecipeHeader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useGetUser from "../../hooks/useGetUser";
import RecipeImages from "./RecipeImages";
import Text from "../shared/Text";

interface RecipeProps {
  recipeObj: any;
  ref?: any;
}

const recipeTypesColors: any = {
  Breakfast: { main: "#F5B657", second: "#FFF4E2" },
  Appetizer: { main: "#F557EF", second: "#FFE7FE" },
  Main: { main: "#7D82FA", second: "#E0E1FF" },
  Dessert: { main: "#FA7D7D", second: "#FEE7E7" },
  Drink: { main: "#AD4F4F", second: "#FFE7E7" },
  Vegan: { main: "#7AB675", second: "#F4FFF3" },
  Other: { main: "#404040", second: "#E8E8E8" },
};

function Recipe({ recipeObj, ref }: RecipeProps) {
  const {
    _id,
    userId,
    title,
    description,
    type,
    rating,
    ingredients,
    duration,
    images,
    createdAt,
  } = recipeObj;

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
      {deleted ? (
        <h1>Recipe has been deleted !</h1>
      ) : (
        <>
          <div className="w-full flex gap-6">
            {images?.length > 0 && <RecipeImages images={images} />}

            <div className="flex flex-col gap-3 w-full ">
              <RecipeHeader
                recipeId={_id}
                userId={userId}
                picture={picture}
                username={username}
                createdAt={createdAt}
                setDeleted={setDeleted}
              />
              <div className="w-full gap-3 items-center">
                  <span className="text-2xl mt-[-3px]  whitespace-pre-wrap">
                    {title}
                  </span>
                  <span
                    style={{ backgroundColor: recipeTypesColors[type].second }}
                    className="px-3 ml-3 py-1 rounded-full"
                  >
                    <span
                      style={{ color: recipeTypesColors[type].main }}
                      className="text-sm"
                    >
                      {type}
                    </span>
                  </span>
              </div>

              <div>
                <Text text={description} length={276} hiddenMore />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Recipe;
