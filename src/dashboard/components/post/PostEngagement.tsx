import { useEffect, useState } from "react";
import { ChatCircleDots, Heart, PaperPlaneRight, X } from "phosphor-react";
import Input from "../../shared/Input";
import Modal from "../../shared/Modal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface postIdInterface {
  postId: string;
  postComments: [any]
  postLikes: [string]
}

function PostEngagement({ postId, postComments, postLikes }: postIdInterface) {
  const [postComment, setPostComment] = useState("");
  const [comments, setComments] = useState(postComments);
  const [commentsNum, setCommentsNum] = useState<number>(postComments.length);

  const [likes, setLikes] = useState(postLikes);
  const [likesNum, setLikesNum] = useState<number>(postLikes.length);
  const [isLike, setIsLike] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleSetPostComment= async () => {
    try {
      setLoading(true);
      if(!postComment){
        return;
      }
      else{
        setPostComment('')
      }
      const commentDetails = {
        postId,
        postComment,
      };
      const { data } = await axiosPrivate.patch(
        `/api/posts/${postId}/comments`,
        commentDetails
      );

      if (!data?.success) {
        console.log("error");
        return;
      }

      setCommentsNum(() => commentsNum + 1)
      
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  const handleSetPostLike = async () => {
    try {
      if(isLike){
        setLikesNum(()=> likesNum - 1)
      }
      else{
        setLikesNum(()=> likesNum + 1)
      }
      setIsLike(()=>!isLike);
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
        if(response.data.success){
          const result = response.data.hasLikedPost; // returns either True or False
          setIsLike(result);
        }
      } catch (err) {}
    };

    checkPostLike();

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
              <p className="font-medium text-xs">
                {
                  likesNum
                }
              </p>
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
          <p onClick={() => setShowModal(true)} className="text-xs cursor-pointer w-fit font-medium">View comments</p>
        </div>
        <div className="relative">
          <Input
            text="Write a comment ..."
            type="text"
            widthFull
            onChange={(v) => setPostComment(v)}
            value={postComment}
            className="py-2 text-xs w-[250px]"
          />
          <div onClick={handleSetPostComment} className="cursor-pointer absolute top-0 right-0 h-full flex items-center mr-2 text-gray-400">
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
