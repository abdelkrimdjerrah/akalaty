import { useState } from "react";
import {
  Heart,
  Star,
  ChatCircleText,
  ChatCenteredText,
  UserPlus,
} from "phosphor-react";
import useGetUser from "../../hooks/useGetUser";
import moment from "moment";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const notifType: any = {
  "postLiked" : {
    message: "liked your post",
    color: "#ef4444",
    icon: <Heart size={21} weight="fill" />,
  },
  "commentLiked" : {
    message: "liked your comment in post",
    color: "#ef4444",
    icon: <Heart size={21} weight="fill" />,
  },
  "replyLiked" : {
    message: "liked your reply in comment",
    color: "#ef4444",
    icon: <Heart size={21} weight="fill" />,
  },
  "feedbackLiked" : {
    message: "liked your feedback in receipe",
    color: "#ef4444",
    icon: <Heart size={21} weight="fill" />,
  },
  "starredRecipe": {
    message: "stars to your recipe",
    color: "#eab308",
    icon: <Star size={21} weight="fill" />,
  },
  "commentCreated": {
    message: "commented on your post",
    color: "#8b5cf6",
    icon: <ChatCircleText size={21} weight="fill" />,
  },
  "replyCreated": {
    message: "replied to your comment",
    color: "#8b5cf6",
    icon: <ChatCircleText size={21} weight="fill" />,
  },
  "feedbackCreated": {
    message: "gave feedback to your recipe",
    color: "#0ea5e9",
    icon: <ChatCenteredText size={21} weight="fill" />,
  },
  "followed": {
    message: "started following you",
    color: "#10b981",
    icon: <UserPlus size={21} weight="fill" />,
  },
};

interface INotifItem {
  notif : Entities.NotifEntity
}
function NotifItem( {notif} : INotifItem) {
  const { _id, toUserId, byUserId, type, text, isRead, createdAt,url, updatedAt } = notif
  const [notifIsRead, setNotifIsRead] = useState(isRead);
  const senderUserData = useGetUser<Entities.UserEntity>(byUserId)

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate()

  const handleClickNotif = async () => {
    try {
      if(!notifIsRead){
        setNotifIsRead(true)
        const {data} = await axiosPrivate.patch(`api/notifications/${_id}`)
        if(!data.success){
          console.log(data.message)
        }
      }
      navigate(url)

    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div
      onClick={() => handleClickNotif()}
      className="bg-gray-100 hover:bg-gray-200 w-full p-3 text-xs rounded-lg relative cursor-pointer"
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2 overflow-hidden">
          <div>
            <img
              src={senderUserData?.picture}
              className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] object-cover rounded-full"
              alt=""
            />
          </div>
          <div>
            <span className="text-xs font-medium">{senderUserData?.username} </span>
            {String(type) === "starredRecipe" ? (
              <span>
                <span className="text-xs ">{notifType[type].message}</span>
                <span className="font-medium">{5 + " stars"}</span>
              </span>
            ) : (
              <span className="text-xs ">{notifType[type].message + ` "${text}"`}</span>
            )}
            <p className="text-xs font-medium text-gray-400">{moment(createdAt?.toLocaleString()).fromNow()}</p>
          </div>
        </div>
        <div style={{ color: notifType[type].color }}>
          {notifType[type].icon}
        </div>
      </div>
      {!notifIsRead ? (
        <div
          className={"h-[6px] w-[6px] rounded-full absolute top-3 right-3"}
          style={{ backgroundColor: notifType[type].color }}
        ></div>
      ) : null}
    </div>
  );
}

export default NotifItem;
