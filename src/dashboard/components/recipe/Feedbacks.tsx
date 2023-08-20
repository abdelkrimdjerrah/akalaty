import { PencilSimple } from "phosphor-react";
import useGetFeedbacks from "../../hooks/useGetFeedbacks";
import FeedbackItem from "./FeedbackItem";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Pagination from "../shared/Pagination";
import FeedbackPanel from "./FeedbackPanel";

interface FeedbacksProps {
  recipeId: string;
}

const Feedbacks = ({ recipeId }: FeedbacksProps) => {
  const [feedbacksCount, setFeedbacksCount] = useState(0);
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


  const { feedbacks, isLoading, isError, error } = useGetFeedbacks(
    recipeId,
    currentPage,
    showPerPage.value
  );

  

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getFeedbacksCount = async () => {
      try {
        const { data } = await axiosPrivate.get(
          `/api/recipes/${recipeId}/feedbacks/count`
        );

        if (!data.success) {
          return;
        }

        setFeedbacksCount(data.countFeedbacks);
      } catch (error) {}
    };
    getFeedbacksCount();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1 w-full items-center">
        <PencilSimple size={26} />
        <p className=" font-medium text-lg">Feedbacks</p>
      </div>


    <FeedbackPanel filterStates={filterStates} recipeId={recipeId}/>


      <div className="flex flex-col gap-3">
        {feedbacks.map((feedback: Entities.IFeedback) => (
            <div key={feedback._id}>
            <FeedbackItem feedbackObj={feedback} />
          </div>
        ))}
      </div>

    <Pagination count={feedbacksCount} showPerPage={showPerPage} setShowPerPage={setShowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />

    </div>
  );
};

export default Feedbacks;
