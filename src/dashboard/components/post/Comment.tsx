import React, { useEffect, useState } from 'react';
import useGetUser from '../../hooks/useGetUser';
import { ChatCircleDots, Heart, PaperPlaneRight, X } from "phosphor-react";
import Input from "../../shared/Input";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface ICommentProps {
  comment: Entities.IComment,
  postId: string
}

function Comment({ comment, postId }: ICommentProps) {

  const commentId = comment._id

  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState<Entities.IReply[]>();
  const [repliesNum, setRepliesNum] = useState<number>(0);
  const [wantReply, setWantReply] = useState(false);

  const [likes, setLikes] = useState<any>();
  const [likesNum, setLikesNum] = useState<number>(0);
  const [isLike, setIsLike] = useState(false);

  const [loading, setLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const userData = useGetUser<Entities.UserEntity>(comment.userId);

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
          `/api/posts/${postId}/comments/${commentId}/likes/check`,
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
      if (!reply) {
        return;
      } else {
        setReply("");
      }
      const commentDetails = {
        postId,
        commentId,
        reply,
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


  return (
    <div className=' bg-gray-100 w-full p-3 rounded-lg'>
        <div className='flex gap-2 items-center'>
            <img src={userData?.picture} alt="" className='w-11 h-10 object-cover rounded-full'/>
            <div className='flex flex-col gap-[2px] text-sm w-full'>
                <div className='flex w-full justify-between items-center'>
                    <p className='font-medium'>{userData?.username}</p>
                    <p className='text-xs text-gray-400'>{comment?.createdAt?.toLocaleString()}</p>
                </div>
                <p className=''>{comment.text}</p>
                {
                  comment.replies?.length ? 
                  <div className='flex justify-between w-full'>
                    <div className='flex gap-1 items-center'>
                      <div className='h-[1px] w-6 bg-gray-400'></div>
                      <p className='text-xs text-gray-400 font-medium cursor-pointer'>{`View replies (${repliesNum})`}</p>
                    </div>
                    <div className='flex gap-2'>
                      <p onClick={() => setWantReply(true)} className='text-xs font-medium cursor-pointer w-fit'>{`Reply`}</p>
                      {
                        isLike ?
                           <p onClick={handleSetLike} className='text-xs text-red-500 font-medium cursor-pointer w-fit'>{`Liked (${likesNum})`}</p>
                         : <p onClick={handleSetLike} className='text-xs font-medium cursor-pointer w-fit'>{`Like (${likesNum})`}</p>
                      }
                    </div>
                  </div>

                  :   <div className='w-full flex gap-2 justify-end'>
                        <p onClick={() => setWantReply(true)} className='text-xs font-medium cursor-pointer w-fit'>{`Reply`}</p>
                        {
                        isLike ?
                           <p onClick={handleSetLike} className='text-xs text-red-500 font-medium cursor-pointer w-fit'>{`Liked (${likesNum})`}</p>
                         : <p onClick={handleSetLike} className='text-xs font-medium cursor-pointer w-fit'>{`Like (${likesNum})`}</p>
                        }
                      </div>
                }
          
            </div>
        </div>
        {
          wantReply && (
            <div className="relative mt-2">
              <Input
                text="Write a comment ..."
                type="text"
                widthFull
                onChange={(v) => setReply(v)}
                value={reply}
                className="py-2 text-xs w-[250px] bg-white"
              />
              <div
                onClick={handleSetReply}
                className="cursor-pointer absolute top-0 right-0 h-full flex items-center mr-2 text-gray-400"
              >
                <PaperPlaneRight size={19} />
              </div>
            </div>
          )
        }

    </div>
  );
}

export default Comment