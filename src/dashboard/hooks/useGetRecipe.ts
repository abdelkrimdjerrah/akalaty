import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";


//Get all recipes or a specific recipe
function useGetRecipe<RecipeType extends Entities.IRecipe | Entities.IRecipe[]>(
  recipeId?: string 
) {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<RecipeType | undefined>();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let url = recipeId ? `/api/recipes/${recipeId}` : "/api/recipes";
        const response = await axiosPrivate.get(url);
        const result = recipeId ? response.data.recipe : response.data.recipes;
        setData(result);
      } catch (err) {
        console.error(err);      }
    };

    fetchRecipes();
  }, 
      [recipeId]
  );

  return data;
}

export default useGetRecipe;