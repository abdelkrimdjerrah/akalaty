import { useEffect, useState } from "react";
import RecipeHeader from "./RecipeHeader";
import { Clock, PencilSimple } from "phosphor-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useGetUser from "../../hooks/useGetUser";
import RecipeImages from "./RecipeImages";
import Text from "../shared/Text";
import Stars from "../shared/Stars";
import Button from "../shared/Button";
import { useNavigate
 } from "react-router-dom";
import { create } from "lodash";
interface RecipeProps {
  recipeObj: Entities.IRecipe;
  ref?: any;
  textFull?: boolean;
  noBtn?: boolean;
}

const recipeTypesColors: any = {
  breakfast: { main: "#F5B657", second: "#FFF4E2" },
  appetizer: { main: "#F557EF", second: "#FFE7FE" },
  main: { main: "#7D82FA", second: "#E0E1FF" },
  dessert: { main: "#FA7D7D", second: "#FEE7E7" },
  drink: { main: "#AD4F4F", second: "#FFE7E7" },
  vegan: { main: "#7AB675", second: "#F4FFF3" },
  other: { main: "#404040", second: "#E8E8E8" },
};

function Recipe({ recipeObj, ref, textFull, noBtn }: RecipeProps) {
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


  const recipeId = _id;

  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");

  const [deleted, setDeleted] = useState(false);
  const [countFeedbacks, setCountFeedbacks] = useState(26);
  const [feedbacks, setFeedbacks] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

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

   

  }, [response]);


  return (
    <div ref={ref} className="w-full bg-white rounded-2xl relative p-3 py-4 sm:p-5 sm:py-6">
      {deleted ? (
        <h1>Recipe has been deleted !</h1>
      ) : (
        <>
          <div className="w-full  flex sm:flex-row flex-col gap-4 sm:gap-6">
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


                <span className="text-2xl mt-[-3px] whitespace-pre-wrap">
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
              {
                textFull ?
                <Text text={description} length={0} hiddenMore />
                :
                <Text text={description} length={230} hiddenMore />
              }

              <div className="flex items-center gap-3 flex-wrap">
                <Stars rating={rating} size={20}/>
                <div className="flex gap-3">
                  <div className="flex gap-[2px] items-center text-sm min-w-fit">
                    <PencilSimple size={20} />
                    <span>{countFeedbacks}</span>
                  </div>
                  <div className="flex gap-[2px] items-center text-sm min-w-fit">
                    <Clock size={20} />
                    <span>{duration} min</span>
                  </div>
                </div>
              </div>

              {
                !noBtn && (
                    <Button className="mt-2 w-full sm:w-fit" outlined color={recipeTypesColors[type].main} onClick={()=>{navigate(`/recipes/${recipeId}`)}}>
                      <div>View recipe</div>
                    </Button>
                )
              }

            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Recipe;
