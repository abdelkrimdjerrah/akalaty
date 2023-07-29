import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetNotificationPage = (pageNum:number ,limit:number) => {
  const axiosPrivate = useAxiosPrivate();

  const [notificationPage, setNotificationPage] = useState<Entities.NotifEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const encodedPageNum = encodeURIComponent(pageNum);
    const encodedLimit = encodeURIComponent(limit);

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const { data } = await axiosPrivate.get(
          `/api/notifications/pages?page=${encodedPageNum}&limit=${encodedLimit}`,
          { signal }
        );

        if (!data.success) {
            setIsError(true);
            return;
        }
        setNotificationPage(data.notifications);
        setIsLoading(false);
      } catch (e: any) {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      }
    };

    fetchData();

    return () => controller.abort();
  }, [pageNum]);

  return { isLoading, isError, error, notificationPage };
};

export default useGetNotificationPage;
