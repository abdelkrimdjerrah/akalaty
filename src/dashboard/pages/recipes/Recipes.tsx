import { useState } from "react";
import useGetRecipe from "../../hooks/useGetRecipe";
import Recipe from "../../components/recipe/Recipe";
import AddRecipe from "../../components/recipe/AddRecipe";

function Recipes() {

  const recipes = useGetRecipe<Entities.IRecipe[]>();

  return (
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
  );
}

export default Recipes;
