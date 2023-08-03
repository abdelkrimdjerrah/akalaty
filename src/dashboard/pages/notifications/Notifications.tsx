import { BellRinging } from "phosphor-react";
import NotifItem from "../../components/notification/NotifItem";
import { useEffect, useState } from "react";
import useGetNotificationPage from "../../hooks/useGetNotificationPage";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Input from "../../shared/Input";

function AllNotifications() {
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [notificationPage, setNotificationPage] = useState<Entities.NotifEntity[]>([]);
  const [showPerPage, setShowPerPage] = useState('6');
  const [currentPage, setCurrentPage] = useState(1);

  let pagesCount
  let pages 

  if(showPerPage && notificationsCount){
    const division = notificationsCount / Number(showPerPage)
    const mathCeil = Math.ceil(notificationsCount / Number(showPerPage));
    const mathRound = Math.round(notificationsCount / Number(showPerPage));

    console.log(division)
    console.log(mathRound)

    
    // mathCeil === mathRound means that the division is equal or greater than .5
    pagesCount = mathCeil === mathRound ? mathRound : mathCeil - 1;
    
    if(division === mathRound){
      pagesCount = division - 1
    }

    if(mathRound - division == 0.5){
      pagesCount = mathRound - 1
    }

    pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  }

  const axiosPrivate = useAxiosPrivate();

  const handleShowPerPage = (num: string) => {
      setShowPerPage(num);
      setCurrentPage(1);
  };

  useEffect(() => {
    const getNotificationCount = async () => {
      try {
        const { data } = await axiosPrivate.get(
          `/api/notifications/pages/count`
        );

        if (!data.success) {
          return;
        }

        setNotificationsCount(data.countNotifications);
      } catch (error) {}
    };
    getNotificationCount();

    const fetchNotificationPage = async (pageNum: number, limit: number) => {
      try {
        const encodedPageNum = encodeURIComponent(pageNum);
        const encodedLimit = encodeURIComponent(limit);

        const { data } = await axiosPrivate.get(
          `/api/notifications/pages?page=${encodedPageNum}&limit=${encodedLimit}`
        );

        if (!data.success) {
          return;
        }

        setNotificationPage(data.notifications);
      } catch (error) {}
    };

    if(showPerPage && currentPage)
    fetchNotificationPage(currentPage, Number(showPerPage));

  }, [currentPage, showPerPage]);

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
                notificationPage.map((notif: Entities.NotifEntity) => (
                  <div key={notif._id} className="w-full">
                    {/* Notification element */}
                    <NotifItem notif={notif} />
                  </div>
                ))}
            </ul>
          </div>
        </div>

        <div className="w-full flex justify-between gap-2">
          <div className="flex gap-2 text-sm h-fit mt-[4px]">
            <div className="mt-[-2px]">Pages: </div>
            <div className="flex gap-3 flex-wrap">
              {pages?.map((page) =>
                page === currentPage ? (
                  <div
                    key={page}
                    className="cursor-pointer text-xs font-medium  border-b-[1px] w-2 flex justify-center border-black"
                  >
                    {page}
                  </div>
                ) : (
                  <div
                    key={page}
                    className="cursor-pointer text-xs font-medium w-2 flex justify-center"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex gap-2 text-sm min-w-fit">
            <div className="mt-[2px]">Show per page: </div>
            <Input
              text="Show per page"
              type="text"
              className="py-1 w-[50px]"
              onChange={(v) => handleShowPerPage(v)}
              value={String(showPerPage)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllNotifications;
