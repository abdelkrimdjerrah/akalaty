import { useState } from "react";
import useGetRecipe from "../../hooks/useGetRecipe";
import Recipe from "../../components/recipe/Recipe";
import AddRecipe from "../../components/recipe/AddRecipe";


function Recipes() {

  const [optionSelectType, setOptionSelectType] = useState({label: '', value: ''});
  const [optionOrderByRating, setOptionOrderByRating] = useState({label: '', value: ''});


  //  Functions variables order : recipeId, filters
  const recipes = useGetRecipe<Entities.IRecipe[]>({ rating: optionOrderByRating.value, type: optionSelectType.value });

  const filterStates = {
    optionSelectType,
    setOptionSelectType,
    optionOrderByRating,
    setOptionOrderByRating
  }

  return (
    <div className="flex flex-col gap-3">
      <AddRecipe filterStates={filterStates}/>
      <div className="flex flex-col gap-3">
        {recipes?.map((recipe) => (
          <div key={recipe._id}>
            <Recipe recipeObj={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
