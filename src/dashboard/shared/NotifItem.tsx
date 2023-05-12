import { useState } from "react";
import { Heart, Star, ChatCircleText, ChatCenteredText, UserPlus } from "phosphor-react";
var Abdelkrim = require('../../assets/Abdelkrim.png');


interface NotifProps {
    id: number;
    type: string;
    username: string;
    time: string;
    isRead: boolean;
}

const notifType:any = {
  'like':{
    message:'Liked your post',
    color: 'red-500',
    icon: <Heart size={23}/>
  },
  'star':{
    message:'stars to your recipe',
    color: 'yellow-500',
    icon: <Star size={23}/>
  },
  'comment':{
    message:'Commented on your post',
    color: 'purple-500',
    icon: <ChatCircleText size={23}/>
  },
  'feedback':{
    message:'gave feedback to your recipe',
    color: 'brown-500',
    icon: <ChatCenteredText size={23}/>
  },
  'follow':{
    message:'Has started following you',
    color: 'green-500',
    icon: <UserPlus size={23}/>
  }
}

function NotifItem({id,username, type, time, isRead}: NotifProps) {
  let bgStyle = ' bg-' + notifType[type].color + ' '
  let txtStyle = ' text-' + notifType[type].color + ' '
  console.log(bgStyle)

    const [notifIsRead, setNotifIsRead] = useState(isRead);
    return (
      <div
        onClick={() => setNotifIsRead(true)}
        className="bg-gray-100 hover:bg-gray-200 w-full p-3 text-xs rounded-lg relative cursor-pointer">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 overflow-hidden">
              <div>
                  <img src={Abdelkrim} className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] rounded-full" alt="" />
              </div>
              <div>
                  <span>
                      <p className="text-xs font-medium">{username}</p>
                      <p className="text-xs ">{notifType[type].message}</p>
                  </span>
                  <p className="text-xs font-medium text-gray-400">{time}</p>
              </div>
          </div>
          <div className={txtStyle}>
            {notifType[type].icon}
          </div>
        </div>
        {!notifIsRead ? (
          <div className={'h-[6px] w-[6px] rounded-full absolute top-3 right-3' + bgStyle}></div>
        ) : null}
      </div>
    );
}

export default NotifItem