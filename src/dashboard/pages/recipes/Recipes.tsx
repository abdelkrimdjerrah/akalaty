import { useState } from "react";
import useGetRecipe from "../../hooks/useGetRecipe";
import Recipe from "../../components/recipe/Recipe";
import AddRecipe from "../../components/recipe/AddRecipe";
import { recipeFilterContext } from "../../context/recipeFilterContext";


function Recipes() {

  const [optionSelectType, setOptionSelectType] = useState({label: '', value: ''});
  const [optionOrderByRating, setOptionOrderByRating] = useState({label: '', value: ''});

  //  Functions variables order : recipeId, type, rating
  const recipes = useGetRecipe<Entities.IRecipe[]>('',{ rating: optionOrderByRating.value, type: optionSelectType.value });

  return (
    <recipeFilterContext.Provider value={{ optionSelectType, setOptionSelectType, optionOrderByRating, setOptionOrderByRating }}>
    <div className="flex flex-col gap-3">
      <AddRecipe />
      <div className="flex flex-col gap-3">
        {recipes?.map((recipe) => (
          <div key={recipe._id}>
            <Recipe recipeObj={recipe} />
          </div>
        ))}
      </div>
    </div>
    </recipeFilterContext.Provider>
  );
}

export default Recipes;
