import { useState } from "react";
import { ChatCircleDots, Heart, PaperPlaneRight, X } from "phosphor-react";
import Input from "../../shared/Input";
import Modal from "../../shared/Modal";

function PostEngagement(postID:any) {
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
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

          <div className="flex gap-[2px] items-center" onClick={() => setShowModal(true)}>
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
      
      {showModal && (
        <Modal
          closeModal={() => {
            setShowModal(false);
          }}
        >
          <div onClick={(e) => e.stopPropagation()} className="max-w-[500px] bg-white min-w-[500px] h-fit p-5 rounded-2xl relative">
            {showModal && (
                <div onClick={() => setShowModal(false)}>
                  <X
                    size={21}
                    className="text-gray-400 cursor-pointer hover:text-black absolute right-5 top-5"
                  />
                </div>
              )}
            Hello world
          </div>
        </Modal>
      )}

    </div>
  );
}

export default PostEngagement;
