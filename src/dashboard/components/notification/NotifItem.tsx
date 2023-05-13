import { useState } from "react";
import { Heart, Star, ChatCircleText, ChatCenteredText, UserPlus } from "phosphor-react";
var Abdelkrim = require('../../../assets/Abdelkrim.png');


interface NotifProps {
    id: number;
    type: string;
    username: string;
    rating: number
    time: string;
    isRead: boolean;
}

const notifType:any = {
  'like':{
    message:'Liked your post',
    color: '#ef4444',
    icon: <Heart size={21} weight="fill"/>
  },
  'star':{
    message:'Rated your recipe by ',
    color: '#eab308',
    icon: <Star size={21} weight="fill"/>
  },
  'comment':{
    message:'Commented on your post',
    color: '#8b5cf6',
    icon: <ChatCircleText size={21} weight="fill"/>
  },
  'feedback':{
    message:'gave feedback to your recipe',
    color: '#0ea5e9',
    icon: <ChatCenteredText size={21} weight="fill"/>
  },
  'follow':{
    message:'Has started following you',
    color: '#10b981',
    icon: <UserPlus size={21} weight="fill"/>
  }
}

function NotifItem({id,username, type, time, rating, isRead}: NotifProps) {
 
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
                      <p className="text-xs font-medium">{username}</p>
                      {type === 'star' ? 
                      <span>
                        <span className="text-xs ">{notifType[type].message}</span>
                        <span className="font-medium">{rating + " stars"}</span>
                      </span>
                      :
                        <p className="text-xs ">{notifType[type].message}</p>
                      }
                  <p className="text-xs font-medium text-gray-400">{time}</p>
              </div>
          </div>
          <div style={{color:notifType[type].color}}>
            {notifType[type].icon}
          </div>
        </div>
        {!notifIsRead ? (
          <div className={'h-[6px] w-[6px] rounded-full absolute top-3 right-3'} style={{backgroundColor:notifType[type].color}}></div>
        ) : null}
      </div>
    );
}

export default NotifItem