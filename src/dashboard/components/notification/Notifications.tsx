import { BellRinging } from "phosphor-react";
import NotifItem from "./NotifItem";
import { useNavigate } from "react-router-dom";
import useGetNotificationPage from "../../hooks/useGetNotificationPage";


function Notifications() {

  const { isLoading, isError, error, notificationPage } = useGetNotificationPage(1,3)
  
  const navigate = useNavigate()


  return (
    <div className='lg:w-[293px] lg:p-5 bg-white h-fit rounded-2xl'>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-1 w-full">
          <BellRinging size={21} />
          <p className="text-sm font-medium">Notifications</p>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col w-full">
            <ul className="flex flex-col justify-end items-center gap-2">
                {notificationPage &&
                  notificationPage
                    ?.slice(Math.max(notificationPage.length - 3, 0))
                    .map((notif: Entities.NotifEntity) => (
                      <div
                        key={notif._id}
                        className="w-full"
                      >
                        {/* Notification element */}
                        <NotifItem notif={notif} />
                      </div>
                    ))}
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
