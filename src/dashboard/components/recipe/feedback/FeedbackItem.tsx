import { useState } from "react";
import useGetUser from "../../../hooks/useGetUser";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../redux/userSlice";
import moment from "moment";
import Text from "../../shared/Text";
import { DotsThree } from "phosphor-react";
import Stars from "../../shared/Stars";

interface FeedbackItemProps {
  feedbackObj: Entities.IFeedback;
}

const FeedbackItem = ({ feedbackObj }: FeedbackItemProps) => {
  const { recipeId, _id, userId, text, rating, createdAt } = feedbackObj;
  const feedbackId = _id;

  const [showMenu, setShowMenu] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const userData = useGetUser<Entities.UserEntity>(userId);

  const JWTuserData = useSelector(selectUserData);

  const handleDeleteFeedback = async () => {
    try {
      const { data } = await axiosPrivate.delete(
        `/api/recipes/${recipeId}/feedbacks/${feedbackId}`
      );

      if (!data?.success) {
        console.log("error");
        return;
      } else {
        setDeleted(true);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const FeedbackComponent = (
    <div>
      <div className=" bg-gray-100 w-full p-3 rounded-lg">
        <div className="flex gap-2 w-full relative">
          <img
            src={userData?.picture}
            alt=""
            className="w-11 h-11 absolute object-cover rounded-full"
          />
          <div className="pl-14 flex flex-col gap-[2px] text-sm w-full">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{userData?.username}</p>
                  <Stars rating={rating} size={15} />
                </div>
                <p className="text-xs text-gray-400">
                  {moment(createdAt?.toLocaleString()).fromNow()}
                </p>
              </div>

              <div className="flex gap-1 items-center">
                {userId === JWTuserData?._id ? (
                  <div className="relative">
                    <DotsThree
                      size={21}
                      onClick={() => setShowMenu(!showMenu)}
                    />
                    {showMenu && (
                      <div className="bg-white shadow-sm border border-gray-200 text-sm absolute right-0 top-5 z-10 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md">
                        <p
                          className="text-red-600 cursor-pointer"
                          onClick={handleDeleteFeedback}
                        >
                          Delete
                        </p>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>

            <Text text={text} length={0} />
          </div>
        </div>
      </div>
    </div>
  );

  const deletedFeedback = <p>Feedback has been deleted</p>;

  return <div>{deleted ? deletedFeedback : FeedbackComponent}</div>;
};

export default FeedbackItem;
