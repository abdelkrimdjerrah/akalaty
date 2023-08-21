import { PencilSimple } from "phosphor-react";
import useGetFeedbacks from "../../../hooks/useGetFeedbacks";
import FeedbackItem from "./FeedbackItem";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Pagination from "../../shared/Pagination";
import FeedbackPanel from "./FeedbackPanel";
import reviewsAnimation from './reviewsAnimation.json'
import Lottie from "lottie-react";

interface FeedbacksProps {
  recipeId: string;
}

const Feedbacks = ({ recipeId }: FeedbacksProps) => {
  const [showPerPage, setShowPerPage] = useState({ value: 5, label: '5'});
  const [currentPage, setCurrentPage] = useState(1);

  const [optionHasImages, setOptionHasImages] = useState({label: '', value: ''});
  const [optionOrderByRating, setOptionOrderByRating] = useState({label: '', value: ''});

  const filterStates = {
    optionHasImages,
    setOptionHasImages,
    optionOrderByRating,
    setOptionOrderByRating
  }


  const { feedbacks,countAllFeedbacks, isLoading, isError, error } = useGetFeedbacks(
    recipeId,
    currentPage,
    showPerPage.value,
    { images:optionHasImages.value, rating:optionOrderByRating.value}
  );


  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 w-full items-center">
        <PencilSimple size={26} />
        <p className=" font-medium text-lg">Feedbacks</p>
      </div>


    <FeedbackPanel filterStates={filterStates} recipeId={recipeId}/>

    {
      feedbacks.length ? (
        <>
          <div className="flex flex-col gap-3">
            {feedbacks.map((feedback: Entities.IFeedback) => (
                <div key={feedback._id}>
                <FeedbackItem feedbackObj={feedback} />
              </div>
            ))}
          </div>
    
          <Pagination count={countAllFeedbacks} showPerPage={showPerPage} setShowPerPage={setShowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>

      ):(
        <div className="flex flex-col justify-center items-center py-2">
          <Lottie animationData={reviewsAnimation} style={{width: 200, height: 200}}/>
          <p className=" font-medium">Be the first who review!</p>
        </div>
      )
    }


    </div>
  );
};

export default Feedbacks;
