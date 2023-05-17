import { useState } from "react";
import { ChatCircleDots, Heart, PaperPlaneRight } from "phosphor-react";
import Input from "../../shared/Input";

function PostEngagement() {
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm items-center flex gap-3">
        <div className="flex gap-[2px] items-center">
          <div onClick={() => setLike(!like)}>
            {like ? (
              <Heart size={21} weight="fill" className="text-red-500" />
            ) : (
              <Heart size={21} />
            )}
          </div>
          <div className="flex gap-1">
            <p className="font-medium text-xs">650</p>
          </div>
        </div>

        <div className="flex gap-[2px] items-center">
          <ChatCircleDots size={21} />
          <div className="flex gap-1">
            <p className="font-medium text-xs">650</p>
          </div>
        </div>
      </div>
      <div>
        <Input
          text="Write a comment ..."
          type="text"
          Icon={PaperPlaneRight}
          widthFull
          onChange={(v) => setComment(v)}
          value={comment}
          className="py-2 text-xs w-[250px]"
        />
      </div>
    </div>
  );
}

export default PostEngagement;
