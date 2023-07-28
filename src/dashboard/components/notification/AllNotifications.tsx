import { BellRinging } from "phosphor-react";
import NotifItem from "./NotifItem";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

function AllNotifications() {
  const [notifications, setNotifications] = useState<Entities.NotifEntity[]>();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const getNotifs = async () => {
      try {
        const { data } = await axiosPrivate.get(`/api/notifications`);
        setNotifications(data.notifications);
      } catch (err) {}
    };
    getNotifs();
  }, []);

  return (
    <div className="w-full bg-white rounded-2xl relative p-5 py-6 ">
      <div className="flex flex-col gap-3">
        <div className="flex gap-1 w-full">
          <BellRinging size={21} />
          <p className="text-sm font-medium">Notifications</p>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col w-full">
            <ul className="flex flex-col justify-end items-center gap-2">
              {notifications &&
                notifications
                  .map((notif: Entities.NotifEntity) => (
                    <div key={notif._id} className="w-full">
                      {/* Notification element */}
                      <NotifItem notif={notif} />
                    </div>
                  ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AllNotifications;
