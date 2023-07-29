import { BellRinging } from "phosphor-react";
import NotifItem from "./NotifItem";
import { useState } from "react";
import useGetNotificationPage from "../../hooks/useGetNotificationPage";

function AllNotifications() {

  const { isLoading, isError, error, notificationPage } = useGetNotificationPage(1,6)

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
              {notificationPage &&
                notificationPage
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
