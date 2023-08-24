import { useState } from "react";
import useGetRecipePage from "../../hooks/useGetRecipePage";
import Recipe from "../../components/recipe/Recipe";
import RecipePanel from "../../components/recipe/RecipePanel";
import Pagination from "../../components/shared/Pagination";


function Recipes() {

  const [showPerPage, setShowPerPage] = useState({ value: 5, label: '5'});
  const [currentPage, setCurrentPage] = useState(1);
  const [optionSelectType, setOptionSelectType] = useState<{label:string,value:Types.IRecipeType}>({label: '', value: ''});
  const [optionOrderByRating, setOptionOrderByRating] = useState({label: '', value: ''});



  const { recipes,countAllRecipes, isLoading, isError, error } = useGetRecipePage(
    currentPage,
    showPerPage.value,
    { rating: optionOrderByRating.value, type: optionSelectType.value}
  );


  const filterStates = {
    optionSelectType,
    setOptionSelectType,
    optionOrderByRating,
    setOptionOrderByRating
  }

  return (
    <div className="flex flex-col gap-5">
      <RecipePanel filterStates={filterStates}/>
      <div className="flex flex-col gap-5">
        {recipes?.map((recipe) => (
          <div key={recipe._id}>
            <Recipe recipeObj={recipe} />
          </div>
        ))}
        <div className="w-full bg-white rounded-2xl relative px-3 py-4 sm:p-5 sm:py-6">
          <Pagination count={countAllRecipes} showPerPage={showPerPage} setShowPerPage={setShowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}

export default Recipes;
