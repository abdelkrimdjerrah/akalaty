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

interface IReplyProps {
  reply: Entities.IReply  
  commentId: string;
  postId: string;
}

function Reply({ reply, commentId, postId }: IReplyProps) {
  const replyId = reply._id;

//   const [replyText, setReplyText] = useState("");
  const [wantReply, setWantReply] = useState(false);

  const [likes, setLikes] = useState<any>();
  const [likesNum, setLikesNum] = useState<number>(0);
  const [isLike, setIsLike] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const userData = useGetUser<Entities.UserEntity>(reply.userId);

  useEffect(() => {
    if (reply.likes) {
      setLikes(reply.likes);
      setLikesNum(reply.likes.length);
    }

    const controller = new AbortController();

    const checkReplyLike = async () => {
      try {
        const { data } = await axiosPrivate.get(
          `/api/posts/${postId}/comments/${commentId}/replies/${replyId}/likes/check`
        );

        if (data.success) {
          const result = data.hasLikedPost; // returns either True or False
          setIsLike(result);
        }
      } catch (err) {}
    };

    checkReplyLike();

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

      const replyDetails = {
        postId,
        commentId,
        replyId,
      };
      const { data } = await axiosPrivate.patch(
        `/api/posts/${postId}/comments/${commentId}/replies/${replyId}/likes`,
        replyDetails
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

//   const handleSetReply = async () => {
//     try {
//       setLoading(true);
//       if (!reply) {
//         return;
//       } else {
//         setReplyText("");
//       }
//       const commentDetails = {
//         postId,
//         commentId,
//         reply,
//       };
//       const { data } = await axiosPrivate.patch(
//         `/api/posts/${postId}/comments/${commentId}/replies`,
//         commentDetails
//       );

//       if (!data?.success) {
//         console.log("error");
//         return;
//       }

//     } catch (error) {
//       console.log("error");
//     } finally {
//       setLoading(false);
//     }
//   };

  const handleDeleteReply = async () => {
    try {
      setLoading(true);
      const { data } = await axiosPrivate.delete(
        `/api/posts/${postId}/comments/${commentId}/replies/${replyId}`
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

  const ReplyComponent = (
    <>
      <div className="flex gap-2 items-center">
        <img
          src={userData?.picture}
          alt=""
          className="w-11 h-10 object-cover rounded-full"
        />
        <div className="flex flex-col gap-[2px] text-sm w-full">
          <div className="flex w-full justify-between items-center">
            <p className="font-medium">{userData?.username}</p>
            <div className="flex gap-1">
              <p className="text-xs text-gray-400">
                {moment(reply?.createdAt?.toLocaleString()).fromNow()}
              </p>
              <div className="relative">
                <DotsThree size={21} onClick={() => setShowMenu(!showMenu)} />
                {showMenu && (
                  <div className=" text-sm py-3 px-3 absolute right-0 top-7 z-10 flex flex-col items-center bg-gray-100 shadow-md gap-2">
                    <p className="cursor-pointer">Edit</p>
                    <p
                      className="text-red-600 cursor-pointer"
                      onClick={handleDeleteReply}
                    >
                      Delete
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="">{reply.text}</p>
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
        </div>
      </div>

      {/* {wantReply && (
        <div className="relative mt-2">
          <Input
            text="Write a comment ..."
            type="text"
            widthFull
            onChange={(v) => setReplyText(v)}
            value={replyText}
            className="py-2 text-xs w-[250px] bg-white"
          />
          <div
            onClick={handleSetReply}
            className="cursor-pointer absolute top-0 right-0 h-full flex items-center mr-2 text-gray-400"
          >
            <PaperPlaneRight size={19} />
          </div>
        </div>
      )} */}

    </>
  );

  const deletedReply = <p>Reply has been deleted</p>;

  return (
    <div className=" bg-gray-100 w-full p-3 rounded-lg">
      {deleted ? deletedReply : ReplyComponent}
    </div>
  );
}

export default Reply;