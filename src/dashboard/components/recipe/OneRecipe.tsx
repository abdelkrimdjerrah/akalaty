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
import Ingredients from "./Ingredients";
import Recipe from "./Recipe";
import Feedbacks from "./Feedbacks";

const recipeTypesColors: any = {
  breakfast: { main: "#F5B657", second: "#FFF4E2" },
  appetizer: { main: "#F557EF", second: "#FFE7FE" },
  main: { main: "#7D82FA", second: "#E0E1FF" },
  dessert: { main: "#FA7D7D", second: "#FEE7E7" },
  drink: { main: "#AD4F4F", second: "#FFE7E7" },
  vegan: { main: "#7AB675", second: "#F4FFF3" },
  other: { main: "#404040", second: "#E8E8E8" },
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
    <div className="w-full bg-white rounded-2xl relative">
      {deleted ? (
        <h1>Recipe has been deleted !</h1>
      ) : responseRecipe ? (
        <>
          <div className="flex flex-col">
            <Recipe recipeObj={responseRecipe} textFull />
            <div className="p-3 sm:p-5 flex flex-col gap-5">
              <hr />
              <Ingredients ingredients={responseRecipe.ingredients} />
              <hr />
              <Feedbacks recipeId={responseRecipe._id}/>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default OneRecipe;
