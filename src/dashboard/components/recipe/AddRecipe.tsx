import { Cookie, SlidersHorizontal } from "phosphor-react";
import ButtonSecondary from "../shared/ButtonSecondary";
import { useNavigate } from "react-router-dom";
import Select from "../shared/Select";

function AddRecipe({filterStates}: any) {

  const {optionSelectType, setOptionSelectType, optionOrderByRating, setOptionOrderByRating} = filterStates

  const navigate = useNavigate();

  const optionsSelectBy = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'main', label: 'Main' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'drink', label: 'Drink' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'other', label: 'Other' },
    { value: '', label: 'None' }
  ]

  const optionsOrderBy = [
    { value: 'best', label: 'Best rating' },
    { value: 'low', label: 'Low rating' },
    { value: '', label: 'None' }
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

         <Select
          items={optionsSelectBy}
          placeholder="Select an option"
          defaultValue={optionSelectType}
          setSelectedOption={setOptionSelectType}
          selectedOption={optionSelectType}
         />

         <Select
          items={optionsOrderBy}
          placeholder="Order by"
          defaultValue={optionOrderByRating}
          setSelectedOption={setOptionOrderByRating}
          selectedOption={optionOrderByRating}
         />


        </div>
      </div>

    </div>
  );
}

export default AddRecipe;
