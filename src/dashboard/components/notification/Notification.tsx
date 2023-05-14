import { BellRinging } from 'phosphor-react'
import NotifItem from './NotifItem'
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, ChatCircleText, ChatCenteredText, UserPlus } from "phosphor-react";
import { useState } from 'react';


const initialNotifications = [
    {
      id: 0,
      username: "Ahmed",
      type: "like",
      rating: -1,
      time: "10:30 AM",
      isRead: true
    },
    {
      id: 1,
      username: "Akram",
      type: "comment",
      rating: -1,
      time: "2:00 PM",
      isRead: true
    }
  ];



  const notifType:any = {
    'like':{
      message:'Liked your post',
      color: 'red-500',
      icon: <Heart />
    },
    'star':{
      message:'Rated your recipe by ',
      color: 'yellow-500',
      icon: <Star />
    },
    'comment':{
      message:'Commented on your post',
      color: 'purple-500',
      icon: <ChatCircleText />
    },
    'feedback':{
      message:'gave feedback to your recipe',
      color: 'brown-500',
      icon: <ChatCenteredText />
    },
    'follow':{
      message:'Has started following you',
      color: 'green-500',
      icon: <UserPlus />
    }
  }


function Notification() {

  const [notifications, setNotifications] = useState(initialNotifications)

  function handleAddNotification() {

    const keys = Object.keys(notifType); // Get all the keys from the notifType object
    const randomIndex = Math.floor(Math.random() * keys.length); // Generate a random index between 0 and the number of keys in the notifType object
    const randomKey = keys[randomIndex]; // Get the random key using the random index

    const newNotification = {
      id: notifications.length + 1,
      username: "Amjad",
      type: randomKey,
      rating: (randomKey === 'star' ? 5 : -1),
      time: new Date().toLocaleString(),
      isRead: false
    };

    // Add the new notification to the array of notifications after a delay
    setTimeout(() => {
      setNotifications([...notifications, newNotification])
    }, 200);
  }


  return (
    <div className="bg-white w-[300px] h-fit p-5 rounded-2xl">
        <div className="flex flex-col gap-4 items-center">

            <div className='flex gap-1 w-full'>
                <BellRinging size={21}/>
                <p className='text-sm font-medium'>Notification</p>
            </div>

            <div className='flex justify-between items-center w-full'>
                <div className="flex flex-col w-full">
                    <ul className='flex flex-col justify-end items-center max-h-[230px] gap-2'>
                    <AnimatePresence initial={false}>
                        {notifications.slice(Math.max(notifications.length - 3, 0)).reverse().map((notif) => (
                        <motion.li
                            key={notif.id}
                            initial={{ opacity: 0, y: 50, scale: 0.2 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="w-full"
                        >
                            {/* Notification element */}
                            <NotifItem id={notif.id} username={notif.username} type={notif.type} rating={notif.rating} time={notif.time} isRead={notif.isRead} />
                        </motion.li>
                        ))}
                    </AnimatePresence>
                    </ul>
                </div>

                <div>

                </div>

            </div>
            
            <div 
                className='cursor-pointer text-xs font-medium'
                onClick={() => handleAddNotification()}
            >
                View all
            </div>
                
        </div>
    </div>
  )
}

export default Notification