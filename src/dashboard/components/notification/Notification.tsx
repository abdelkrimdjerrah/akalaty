import { BellRinging } from "phosphor-react";
import NotifItem from "./NotifItem";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Notification() {
  const [notifications, setNotifications] = useState<Entities.NotifEntity[]>();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getNotifs = async () => {
      try {
        const { data } = await axiosPrivate.get(`/api/notifications`);
        setNotifications(data.notifications);
      } catch (err) {}
    };
    getNotifs();
  }, []);

  function handleAddNotification() {}

  return (
    <div className="bg-white w-[280px] h-fit p-5 rounded-2xl">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-1 w-full">
          <BellRinging size={21} />
          <p className="text-sm font-medium">Notification</p>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col w-full">
            <ul className="flex flex-col justify-end items-center max-h-[230px] gap-2">
              <AnimatePresence initial={false}>
                {notifications &&
                  notifications
                    ?.slice(Math.max(notifications.length - 3, 0))
                    .reverse()
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
          onClick={() => handleAddNotification()}
        >
          View all
        </div>
      </div>
    </div>
  );
}

export default Notification;
