import { useState } from "react";
import useGetRecipe from "../../hooks/useGetRecipe";
import Recipe from "../../components/recipe/Recipe";

function Recipes() {
  const recipes = useGetRecipe<Entities.IRecipe[]>();
  console.log(recipes)
  return (
    <div className="flex flex-col gap-3">
      {recipes?.map((recipe) => (
        <div key={recipe._id}>
          <Recipe recipeObj={recipe} />
        </div>
      ))}
    </div>
  );
}

export default Recipes;
