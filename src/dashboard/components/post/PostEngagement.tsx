import { useEffect, useState } from "react";
import { ChatCircleDots, Heart, PaperPlaneRight, X } from "phosphor-react";
import Input from "../../shared/Input";
import Modal from "../../shared/Modal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Comment from "./Comment";

interface postIdInterface {
  postId: string;
  postComments: any;
  postLikes: any;
}

function PostEngagement({ postId, postComments, postLikes }: postIdInterface) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState<Entities.IComment[]>(postComments);
  const [commentsNum, setCommentsNum] = useState<number>(0);

  const [likes, setLikes] = useState<string>(postLikes);
  const [likesNum, setLikesNum] = useState<number>(postLikes.length);
  const [isLike, setIsLike] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleSetPostComment = async () => {
    try {
      setLoading(true);
      if (!text) {
        return;
      } else {
        setText("");
      }
      const commentDetails = {
        postId,
        text,
      };
      const { data } = await axiosPrivate.patch(
        `/api/posts/${postId}/comments`,
        commentDetails
      );

      if (!data?.success) {
        console.log("error");
        return;
      }

      setCommentsNum(() => commentsNum + 1);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  const handleSetPostLike = async () => {
    try {
      if (isLike) {
        setLikesNum(() => likesNum - 1);
      } else {
        setLikesNum(() => likesNum + 1);
      }
      setIsLike(() => !isLike);
      setLoading(true);
      const postDetails = {
        postId,
      };
      const { data } = await axiosPrivate.patch(
        `/api/posts/${postId}/likes`,
        postDetails
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

  useEffect(() => {
    const controller = new AbortController();

    const checkPostLike = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/posts/${postId}/likes/check`,
          {
            signal: controller.signal,
          }
        );
        if (response.data.success) {
          const result = response.data.hasLikedPost; // returns either True or False
          setIsLike(result);
        }
      } catch (err) {}
    };

    checkPostLike();

    const getCountComments = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/posts/${postId}/comments/count`,
          {
            signal: controller.signal,
          }
        );
        if (response.data.success) {
          const result = response.data.count; // returns either True or False
          setCommentsNum(result);
        }
      } catch (err) {}
    };

    getCountComments();

    return () => {
      controller.abort(); // Cancel the request if the component unmounts
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="text-sm items-center flex gap-3">
          <div className="flex gap-[2px] items-center">
            <div
              onClick={() => {
                handleSetPostLike();
              }}
            >
              {isLike ? (
                <Heart size={21} weight="fill" className="text-red-500" />
              ) : (
                <Heart size={21} />
              )}
            </div>
            <div className="flex gap-1">
              <p className="font-medium text-xs">{likesNum}</p>
            </div>
          </div>

          <div
            className="flex gap-[2px] items-center"
            onClick={() => setShowModal(true)}
          >
            <ChatCircleDots size={21} />
            <div className="flex gap-1">
              <p className="font-medium text-xs">{commentsNum}</p>
            </div>
          </div>
        </div>
        <div>
          {comments.length ? (
            <p
              onClick={() => setShowModal(true)}
              className="text-xs cursor-pointer w-fit font-medium"
            >
              View comments
            </p>
          ) : null }
        </div>
        <div className="relative">
          <Input
            text="Write a comment ..."
            type="text"
            widthFull
            onChange={(v) => setText(v)}
            value={text}
            className="py-2 text-xs w-[250px]"
          />
          <div
            onClick={handleSetPostComment}
            className="cursor-pointer absolute top-0 right-0 h-full flex items-center mr-2 text-gray-400"
          >
            <PaperPlaneRight size={19} />
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          closeModal={() => {
            setShowModal(false);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-[500px] bg-white min-w-[500px] h-fit p-5 rounded-2xl relative"
          >
            <div onClick={() => setShowModal(false)}>
              <X
                size={21}
                className="text-gray-400 cursor-pointer hover:text-black absolute right-5 top-5"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 w-full">
                <ChatCircleDots size={21} />
                <p className="text-sm font-medium">Comments</p>
              </div>
              <div>
                <div className="flex flex-col gap-2">
                  {comments.map((comment: Entities.IComment) => (
                    <div key={comment._id}>
                      <Comment postId={postId} comment={comment} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default PostEngagement;
