import { PlusCircle, SlidersHorizontal } from "phosphor-react";
import ButtonSecondary from "../../shared/ButtonSecondary";
import { useNavigate } from "react-router-dom";
import Select from "../../shared/Select";
import { useState } from "react";
import CreateFeedbackModal from "./CreateFeedbackModal";

interface FeedbackPanelProps {
  filterStates: {
    optionHasImages: { value: string; label: string };
    setOptionHasImages: React.Dispatch<React.SetStateAction<{ value: string; label: string }>>;
    optionOrderByRating: { value: string; label: string };
    setOptionOrderByRating: React.Dispatch<React.SetStateAction<{ value: string; label: string }>>;
  };
  recipeId: string;
}
function FeedbackPanel({filterStates, recipeId}: FeedbackPanelProps) {

  const {optionHasImages, setOptionHasImages, optionOrderByRating, setOptionOrderByRating} = filterStates
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const optionsSelectBy = [
    { value: 'with_images', label: 'With images' },
    { value: 'without_images', label: 'Without images' },
    { value: '', label: 'All' }
  ]

  const optionsOrderBy = [
    { value: 'best', label: 'Best rating' },
    { value: 'low', label: 'Low rating' },
    { value: 'relevant', label: 'Most relevant' },
    { value: 'oldest', label: 'Oldest' },
    { value: '', label: 'None' }
  ]

  return (
    <div className="w-full bg-white rounded-2xl relative flex flex-col xs:flex-row gap-2 xs:gap-6">
      <div className="flex flex-col gap-3 min-w-fit">
        <div className="flex gap-1 w-full">
          <PlusCircle size={21} />
          <p className="text-sm font-medium">Add feedback</p>
        </div>

        <div className="flex gap-2 items-center">
          <ButtonSecondary
            onClick={() => setShowModal(true)}
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

      {showModal && (
        <CreateFeedbackModal closeModal={() => setShowModal(false)} recipeId={recipeId} />
      )}

    </div>
  );
}

export default FeedbackPanel;
