import { Cookie, SlidersHorizontal } from "phosphor-react";
import ButtonSecondary from "../shared/ButtonSecondary";
import { useNavigate } from "react-router-dom";
import Select from "../shared/Select";

function FeedbackPanel({filterStates}: any) {

  const {optionHasImages, setOptionHasImages, optionOrderByRating, setOptionOrderByRating} = filterStates

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
    { value: 'relevant', label: 'Most relevant' },
    { value: 'oldest', label: 'Oldest' },
    { value: '', label: 'None' }
  ]

  return (
    <div className="w-full bg-white rounded-2xl relative px-3 py-4 sm:p-5 sm:py-6 flex flex-col xs:flex-row gap-2 xs:gap-6">
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
          <p className="text-sm font-medium">Filters</p>
        </div>

        <div className="flex gap-2 items-center flex-wrap">

         <Select
          items={optionsSelectBy}
          placeholder="Select an option"
          defaultValue={optionHasImages}
          setSelectedOption={setOptionHasImages}
          selectedOption={optionHasImages}
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

export default FeedbackPanel;
