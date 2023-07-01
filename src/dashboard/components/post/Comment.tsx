import React, { useEffect, useState } from "react";
import useGetUser from "../../hooks/useGetUser";
import {
  ChatCircleDots,
  DotsThree,
  Heart,
  PaperPlaneRight,
  X,
} from "phosphor-react";
import Input from "../../shared/Input";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import moment from "moment";
import Reply from "./Reply";
import Text from "./Text";
import { selectUserData } from "../../redux/userSlice";
import { useSelector } from "react-redux";

interface ICommentProps {
  comment: Entities.IComment;
  postId: string;
}

function Comment({ comment, postId }: ICommentProps) {
  const commentId = comment._id;

  const [text, setText] = useState("");
  const [replies, setReplies] = useState<Entities.IReply[]>();
  const [repliesNum, setRepliesNum] = useState<number>(0);
  const [wantReply, setWantReply] = useState(false);

  const [likes, setLikes] = useState<any>();
  const [likesNum, setLikesNum] = useState<number>(0);
  const [isLike, setIsLike] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const userData = useGetUser<Entities.UserEntity>(comment.userId);
  const JWTuserData = useSelector(selectUserData);

  useEffect(() => {
    if (comment.replies) {
      setReplies(comment.replies);
      setRepliesNum(comment.replies.length);
    }
    if (comment.likes) {
      setLikes(comment.likes);
      setLikesNum(comment.likes.length);
    }

    const controller = new AbortController();

    const checkCommentLike = async () => {
      try {
        const { data } = await axiosPrivate.get(
          `/api/posts/${postId}/comments/${commentId}/likes/check`
        );

        if (data.success) {
          const result = data.hasLikedPost; // returns either True or False
          setIsLike(result);
        }
      } catch (err) {}
    };

    checkCommentLike();

    return () => {
      controller.abort(); // Cancel the request if the component unmounts
    };
  }, []);

  const handleSetLike = async () => {
    try {
      if (isLike) {
        setLikesNum(() => likesNum - 1);
      } else {
        setLikesNum(() => likesNum + 1);
      }
      setIsLike(() => !isLike);
      setLoading(true);

      const commentDetails = {
        postId,
        commentId,
      };
      const { data } = await axiosPrivate.patch(
        `/api/posts/${postId}/comments/${commentId}/likes`,
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

  const handleSetReply = async () => {
    try {
      setLoading(true);
      if (!text) {
        return;
      } else {
        setText("");
      }
      const commentDetails = {
        postId,
        commentId,
        text,
      };
      const { data } = await axiosPrivate.patch(
        `/api/posts/${postId}/comments/${commentId}/replies`,
        commentDetails
      );

      if (!data?.success) {
        console.log("error");
        return;
      }

      setRepliesNum(() => repliesNum + 1);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async () => {
    try {
      setLoading(true);
      const { data } = await axiosPrivate.delete(
        `/api/posts/${postId}/comments/${commentId}`
      );

      if (!data?.success) {
        console.log("error");
        return;
      } else {
        setDeleted(true);
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  const CommentComponent = (
    <div>
      <div className=" bg-gray-100 w-full p-3 rounded-lg">
        <div className="flex gap-2 w-full">
          <img
            src={userData?.picture}
            alt=""
            className="w-11 h-11 fixed object-cover rounded-full"
          />
          <div className="pl-14 flex flex-col gap-[2px] text-sm w-full">
            <div className="flex justify-between items-center">
              <p className="font-medium">{userData?.username}</p>
              <div className="flex gap-1">
                <p className="text-xs text-gray-400">
                  {moment(comment?.createdAt?.toLocaleString()).fromNow()}
                </p>
                {comment.userId === JWTuserData?._id ? (
                  <div className="relative">
                    <DotsThree
                      size={21}
                      onClick={() => setShowMenu(!showMenu)}
                    />
                    {showMenu && (
                      <div className=" text-sm py-3 px-3 absolute right-0 top-7 z-10 flex flex-col items-center bg-gray-100 shadow-md gap-2">
                        <p className="cursor-pointer">Edit</p>
                        <p
                          className="text-red-600 cursor-pointer"
                          onClick={handleDeleteComment}
                        >
                          Delete
                        </p>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
            <Text text={comment.text} />

            {comment.replies?.length ? (
              <div className="flex justify-between w-full">
                <div className="flex gap-1 items-center">
                  <div className="h-[1px] w-6 bg-gray-400"></div>
                  <p
                    onClick={() => setShowReplies(!showReplies)}
                    className="text-xs text-gray-400 font-medium cursor-pointer"
                  >
                    {showReplies
                      ? `Hide replies (${repliesNum})`
                      : `View replies (${repliesNum})`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p
                    onClick={() => setWantReply(true)}
                    className="text-xs font-medium cursor-pointer w-fit"
                  >{`Reply`}</p>
                  {isLike ? (
                    <p
                      onClick={handleSetLike}
                      className="text-xs text-red-500 font-medium cursor-pointer w-fit"
                    >{`Liked (${likesNum})`}</p>
                  ) : (
                    <p
                      onClick={handleSetLike}
                      className="text-xs font-medium cursor-pointer w-fit"
                    >{`Like (${likesNum})`}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full flex gap-2 justify-end">
                <p
                  onClick={() => setWantReply(true)}
                  className="text-xs font-medium cursor-pointer w-fit"
                >{`Reply`}</p>
                {isLike ? (
                  <p
                    onClick={handleSetLike}
                    className="text-xs text-red-500 font-medium cursor-pointer w-fit"
                  >{`Liked (${likesNum})`}</p>
                ) : (
                  <p
                    onClick={handleSetLike}
                    className="text-xs font-medium cursor-pointer w-fit"
                  >{`Like (${likesNum})`}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {wantReply && (
          <div className="relative mt-2">
            <Input
              text="Write a comment ..."
              type="text"
              widthFull
              onChange={(v) => setText(v)}
              value={text}
              className="py-2 text-xs w-[250px] bg-white"
            />
            <div
              onClick={handleSetReply}
              className="cursor-pointer absolute top-0 right-0 h-full flex items-center mr-2 text-gray-400"
            >
              <PaperPlaneRight size={19} />
            </div>
          </div>
        )}
      </div>
      {showReplies &&
        comment.replies?.map((reply, index) => (
          <div key={reply._id}>
            {comment.replies?.length == index + 1 ? (
              <Reply
                reply={reply}
                commentId={commentId}
                postId={postId}
                last={true}
              />
            ) : (
              <Reply reply={reply} commentId={commentId} postId={postId} />
            )}
          </div>
        ))}
    </div>
  );

  const deletedComment = <p>Comment has been deleted</p>;

  return <div>{deleted ? deletedComment : CommentComponent}</div>;
}

export default Comment;
