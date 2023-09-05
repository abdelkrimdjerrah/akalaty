import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useGetUser from "../../hooks/useGetUser";
import useGetRecipe from "../../hooks/useGetRecipe";
import { useParams } from "react-router-dom";
import Ingredients from "./Ingredients";
import Recipe from "./Recipe";
import Feedbacks from "./feedback/Feedbacks";


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
            <Recipe recipeObj={responseRecipe} textFull noBtn />
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
