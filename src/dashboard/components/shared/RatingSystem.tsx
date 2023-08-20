import { Star } from "phosphor-react";
import { useState } from "react";

interface StarsProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  size: number;
}

const RatingSystem = ({ rating, setRating, size }: StarsProps) => {

  const[hoverRating, setHoverRating] = useState(0);
  const calc = ((rating ? rating : hoverRating) * 100) / 5 + "%";

  return (
    <div className=" w-fit relative" onMouseLeave={()=> setHoverRating(0)}>
      <div className="text-gray-300 flex gap-[2px] ">
        <div className="cursor-pointer"><Star size={size} weight="fill" onClick={() => setRating(1)} onMouseEnter={() => setHoverRating(1)}/></div>
        <div className="cursor-pointer"><Star size={size} weight="fill" onClick={() => setRating(2)} onMouseEnter={() => setHoverRating(2)}/></div>
        <div className="cursor-pointer"><Star size={size} weight="fill" onClick={() => setRating(3)} onMouseEnter={() => setHoverRating(3)}/></div>
        <div className="cursor-pointer"><Star size={size} weight="fill" onClick={() => setRating(4)} onMouseEnter={() => setHoverRating(4)}/></div>
        <div className="cursor-pointer"><Star size={size} weight="fill" onClick={() => setRating(5)} onMouseEnter={() => setHoverRating(5)}/></div>
      </div>

      <div
        className="text-yellow-400 absolute top-0 left-0 h-full inset-0"
        style={{ width: calc, overflow: "hidden" }}
      >
        <div className="flex gap-[2px] min-w-fit">
            <div className="cursor-pointer"><Star size={size} weight="fill" onClick={() => setRating(1)} onMouseEnter={() => setHoverRating(1)}/></div>
            <div className="cursor-pointer"><Star size={size} weight="fill" onClick={() => setRating(2)} onMouseEnter={() => setHoverRating(2)}/></div>
            <div className="cursor-pointer"><Star size={size} weight="fill" onClick={() => setRating(3)} onMouseEnter={() => setHoverRating(3)}/></div>
            <div className="cursor-pointer"><Star size={size} weight="fill" onClick={() => setRating(4)} onMouseEnter={() => setHoverRating(4)}/></div>
            <div className="cursor-pointer"><Star size={size} weight="fill" onClick={() => setRating(5)} onMouseEnter={() => setHoverRating(5)}/></div>
        </div>
      </div>
    </div>
  );
};

export default RatingSystem;
