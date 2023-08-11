import { useEffect, useState, useRef } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import isEqual from "lodash/isEqual";

const recipeTypeValues = [
  "breakfast",
  "appetizer",
  "main",
  "dessert",
  "drink",
  "vegan",
  "other"
];

function useGetRecipe<RecipeType extends Entities.IRecipe | Entities.IRecipe[]>(
  recipeId?: string,
  filters?: { rating?: string | number; type?: string }
) {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<RecipeType>();
  const prevFilters = useRef<{ rating?: string | number; type?: string }>();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let url = "/api/recipes/filter";
        let queryParams = [];

        if (recipeId) {
          url = `/api/recipes/${recipeId}`;
        } else {
          if (filters?.rating) {
            if (filters.rating === "best") {
              queryParams.push("rating=best");
            } else if (filters.rating === "low") {
              queryParams.push("rating=low");
            }
          }
          if (filters?.type && recipeTypeValues.includes(filters.type)) {
            queryParams.push(`type=${filters.type}`);
          }
          if (queryParams.length > 0) {
            url += `?${queryParams.join("&")}`;
          }
        }

        const response = await axiosPrivate.get(url);

        const result = recipeId ? response.data.recipe : response.data.recipes;
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    // The infinite GET requests indicate that the useGetRecipe hook is being called repeatedly.
    //  This might be due to the fact that the filters prop is changing continuously, 
    //  causing the effect to trigger repeatedly.
    //  the current value of filters is compared with the previous value using the isEqual function 
    //  from the lodash library. If the values are equal, the effect will exit early without making 
    //  the API request. If the values are different, the API request is made and the prevFilters
    //   variable is updated with the new value.
    
    if (!isEqual(prevFilters.current, filters)) {
      fetchRecipes();
      prevFilters.current = filters;
    }
  }, [filters, recipeId, axiosPrivate]);

  return data;
}

export default useGetRecipe;