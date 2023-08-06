import { useEffect, useState } from "react";
import RecipeHeader from "./RecipeHeader";
import { Clock, PencilSimple, Hamburger } from "phosphor-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useGetUser from "../../hooks/useGetUser";
import RecipeImages from "./RecipeImages";
import Text from "../shared/Text";
import Stars from "../shared/Stars";
import Button from "../shared/Button";
import useGetRecipe from "../../hooks/useGetRecipe";
import { useParams } from "react-router-dom";
import useGetPost from "../../hooks/useGetPost";

const recipeTypesColors: any = {
  Breakfast: { main: "#F5B657", second: "#FFF4E2" },
  Appetizer: { main: "#F557EF", second: "#FFE7FE" },
  Main: { main: "#7D82FA", second: "#E0E1FF" },
  Dessert: { main: "#FA7D7D", second: "#FEE7E7" },
  Drink: { main: "#AD4F4F", second: "#FFE7E7" },
  Vegan: { main: "#7AB675", second: "#F4FFF3" },
  Other: { main: "#404040", second: "#E8E8E8" },
};

function OneRecipe() {
  const { id } = useParams();
  const recipeId = id;

  const responseRecipe: Entities.IRecipe = useGetRecipe<Entities.IRecipe>(
    recipeId
  ) as Entities.IRecipe;

  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");

  const [deleted, setDeleted] = useState(false);
  const [countFeedbacks, setCountFeedbacks] = useState(26);
  const [feedbacks, setFeedbacks] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const responseUser = useGetUser<Entities.UserEntity>(responseRecipe?.userId);

  useEffect(() => {
    const fetchUsername = () => {
      try {
        if (responseUser?.username && responseUser?.picture) {
          setUsername(responseUser.username);
          setPicture(responseUser.picture);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsername();

    // const getCountFeedbacks = async() => {
    //   try {
    //     const { data } = await axiosPrivate.get(`api/recipes/${recipeId}/feedbacks/count`);

    //     const result = data.countFeedbacks
    //     setCountFeedbacks(result);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // getCountFeedbacks();
  }, [responseUser]);

  return (
    <div className="w-full bg-white rounded-2xl relative p-5 py-6">
      {deleted ? (
        <h1>Recipe has been deleted !</h1>
      ) : responseRecipe ? (
        <>
          <div className="flex flex-col gap-6">
            <div className="w-full flex gap-6">
              {responseRecipe?.images?.length > 0 && (
                <RecipeImages images={responseRecipe?.images} />
              )}

              <div className="flex flex-col gap-3 w-full ">
                <RecipeHeader
                  recipeId={responseRecipe?._id}
                  userId={responseRecipe?.userId}
                  picture={picture}
                  username={username}
                  createdAt={
                    responseRecipe?.createdAt ? responseRecipe?.createdAt : ""
                  }
                  setDeleted={setDeleted}
                />
                <div className="w-full gap-3 items-center">
                  <span className="text-2xl mt-[-3px]  whitespace-pre-wrap">
                    {responseRecipe?.title}
                  </span>
                  <span
                    style={{
                      backgroundColor:
                        recipeTypesColors[responseRecipe?.type].second,
                    }}
                    className="px-3 ml-3 py-1 rounded-full"
                  >
                    <span
                      style={{
                        color: recipeTypesColors[responseRecipe?.type].main,
                      }}
                      className="text-sm"
                    >
                      {responseRecipe?.type}
                    </span>
                  </span>
                </div>

                <Text text={responseRecipe?.description} hiddenMore />

                <div className="flex items-center gap-3 flex-wrap">
                  <Stars rating={responseRecipe?.rating} />
                  <div className="flex gap-3">
                    <div className="flex gap-[2px] items-center text-sm min-w-fit">
                      <PencilSimple size={20} />
                      <span>{countFeedbacks}</span>
                    </div>
                    <div className="flex gap-[2px] items-center text-sm min-w-fit">
                      <Clock size={20} />
                      <span>{responseRecipe?.duration} min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div className="flex flex-col gap-4">
              <div className="flex gap-1 w-full items-center">
                <Hamburger size={23} />
                <p className=" font-medium">Ingredients</p>
              </div>
              <div className="flex flex-col gap-3">
                {
                    responseRecipe?.ingredients?.map(({name, amount, unit}, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <span className="mt-[-4px]">{name}</span>
                            <div className="px-2 py-[2px] rounded-full bg-gray-200 text-xs flex gap-1">
                                <span>{amount}</span>
                                <span>{unit}</span>
                            </div>
                        </div>
                    ))
                }
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default OneRecipe;
