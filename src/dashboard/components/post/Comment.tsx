import React, { useEffect, useState } from 'react';
import useGetUser from '../../hooks/useGetUser';

interface ICommentProps {
  comment: Entities.IComment;
}

function Comment({ comment }: ICommentProps) {

  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState<Entities.IReply[]>();

  const [likes, setLikes] = useState<Entities.ILike[]>();
  const [isLike, setIsLike] = useState(false);

  const [loading, setLoading] = useState(false);

  const userData = useGetUser<Entities.UserEntity>(comment.userId);

  return (
    <div className='flex gap-2 items-center bg-gray-100 w-full p-3 rounded-lg'>
        <img src={userData?.picture} alt="" className='w-10 h-10 object-cover rounded-full'/>
        <div className='flex flex-col gap-[2px] text-sm w-full'>
            <div className='flex w-full justify-between items-center'>
                <p className='font-medium'>{userData?.username}</p> {/* Assuming user data contains a 'name' property */}
                <p className='text-xs text-gray-400'>{comment?.createdAt?.toLocaleString()}</p>
            </div>
             <p>{comment.text}</p>
        </div>
    </div>
  );
}

export default Comment