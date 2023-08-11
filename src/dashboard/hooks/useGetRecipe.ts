import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";


// if params == string means that we sent a recipe id, so we fetch only one recipe
// if params == object means that we sent a query params, so we fetch a list of recipes with sepcific filters
// if params == undefined means that we fetch all recipes
function useGetRecipe<RecipeType extends Entities.IRecipe | Entities.IRecipe[]>(
  params?: string | { rating?: string | number; type?: string }
) {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<RecipeType | undefined>();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let url = "/api/recipes/filter";
        let queryParams = {};
        
        if (typeof params === "string") {
          url = `/api/recipes/${params}`;
        } else if (typeof params === "object") {
          if(params?.rating || params?.type){
            queryParams = { ...params };
          }
        }
        
        const response = await axiosPrivate.get(url, { params: queryParams });

        const result = typeof params === "string"
          ? response.data.recipe
          : response.data.recipes;
        setData(result);
      } catch (err) {
        console.error(err);      }
    };

    fetchRecipes();
  }, 
      //useEffect will be called when one param of this array of condition is changed
      [
        (typeof params === "object" && params?.rating),
        (typeof params === "object" && params?.type)
      ]
  );

  return data;
}

export default useGetRecipe;