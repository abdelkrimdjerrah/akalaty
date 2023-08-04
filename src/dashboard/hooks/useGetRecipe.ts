import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function useGetRecipe<RecipeType extends Entities.IRecipe | Entities.IRecipe[]>(
  recipeId?: string
) {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<RecipeType>();

  useEffect(() => {
    const controller = new AbortController();
    const fetchUser = async () => {
      try {
        const response = await axiosPrivate.get(
          recipeId ? `/api/recipes/${recipeId}` : "/api/recipes",
          {
            signal: controller.signal,
          }
        );

        const result = recipeId ? response.data.recipe : response.data.recipes;
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();

    return () => {
      controller.abort();
    };
  }, [axiosPrivate, recipeId, location, navigate]);

  return data;
}

export default useGetRecipe;
