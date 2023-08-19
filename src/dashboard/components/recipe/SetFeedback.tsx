import { PaperPlaneRight, PencilSimple } from "phosphor-react";
import Input from "../shared/Input";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Textarea from "../shared/Textarea";


interface SetFeedbackProps {
    recipeId: string;
  }

const SetFeedback = ({recipeId}:SetFeedbackProps) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleSetFeedback = async () => {
    try {
      setLoading(true);
      if (!text) {
        return;
      } else {
        setText("");
      }
      const commentDetails = {
        recipeId,
        text,
        rating: 4,
      };
      const { data } = await axiosPrivate.post(
        `/api/recipes/${recipeId}/feedbacks`,
        commentDetails
      );

      if (!data?.success) {
        console.log("error");
        return;
      }

    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Textarea
        text="Write a feedback ..."
        widthFull
        onChange={(v) => setText(v)}
        value={text}
        className="py-2 text-xs w-[250px] pr-8"
        rows={5}
      />
      <div
        onClick={handleSetFeedback}
        className="cursor-pointer absolute bottom-2 right-2 text-gray-400"
      >
        <PaperPlaneRight size={19} />
      </div>
    </div>
  );
};

export default SetFeedback;
