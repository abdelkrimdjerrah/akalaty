import { Cookie, SlidersHorizontal } from "phosphor-react";
import ButtonSecondary from "../shared/ButtonSecondary";
import { useNavigate } from "react-router-dom";
import Select from "../shared/Select";
import { recipeFilterContext } from "../../context/recipeFilterContext";
import { useContext } from "react";

function AddRecipe() {

  const { optionSelectType, setOptionSelectType, optionOrderByRating, setOptionOrderByRating } = useContext(recipeFilterContext)

  const navigate = useNavigate();

  const optionsSelectBy = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'main', label: 'Main' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'drink', label: 'Drink' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'other', label: 'Other' },
    { value: 'none', label: 'None' }
  ]

  const optionsOrderBy = [
    { value: 'best_rating', label: 'Best rating' },
    { value: 'low_rating', label: 'Low rating' },
    { value: 'none', label: 'None' }
  ]

  return (
    <div className="w-full bg-white rounded-2xl relative p-5 py-6 flex gap-6">
      <div className="flex flex-col gap-3 min-w-fit">
        <div className="flex gap-1 w-full">
          <Cookie size={21} />
          <p className="text-sm font-medium">Add recipe</p>
        </div>

        <div className="flex gap-2 items-center">
          <ButtonSecondary
            onClick={() => navigate("/recipes/create")}
            color="gray"
          >
            Create now
          </ButtonSecondary>
        </div>
      </div>

      <div className=" w-[1px] bg-gray-200" />

      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-1 w-full">
          <SlidersHorizontal size={21} />
          <p className="text-sm font-medium">Settings</p>
        </div>

        <div className="flex gap-2 items-center">
            <Select placeholder="Select type" options={optionsSelectBy}/>
            <Select placeholder="Order by" options={optionsOrderBy}/>
        </div>
      </div>

    </div>
  );
}

export default AddRecipe;
