import { BellRinging } from "phosphor-react";
import NotifItem from "./NotifItem";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useGetNotificationPage from "../../hooks/useGetNotificationPage";


interface INotifProps{
  widthfull?: boolean
}

function Notifications({widthfull}: INotifProps) {

  const { isLoading, isError, error, notificationPage } = useGetNotificationPage(1,3)
  
  const navigate = useNavigate()

  console.log(widthfull)
  const classname = widthfull ? ' w-full bg-white h-fit rounded-2xl ' : ' w-[280px] bg-white h-fit p-5 rounded-2xl '
  return (
    <div className={classname}>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-1 w-full">
          <BellRinging size={21} />
          <p className="text-sm font-medium">Notifications</p>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col w-full">
            <ul className="flex flex-col justify-end items-center max-h-[230px] gap-2">
              <AnimatePresence initial={false}>
                {notificationPage &&
                  notificationPage
                    ?.slice(Math.max(notificationPage.length - 3, 0))
                    .map((notif: Entities.NotifEntity) => (
                      <motion.li
                        key={notif._id}
                        initial={{ opacity: 0, y: 50, scale: 0.2 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="w-full"
                      >
                        {/* Notification element */}
                        <NotifItem notif={notif} />
                      </motion.li>
                    ))}
              </AnimatePresence>
            </ul>
          </div>

          <div></div>
        </div>

        <div
          className="cursor-pointer text-xs font-medium"
          onClick={() => navigate('/notifications')}
        >
          View all
        </div>
      </div>
    </div>
  );
}

export default Notifications;
