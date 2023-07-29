import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetPostPage = (pageNum:number ,limit:number) => {
  const axiosPrivate = useAxiosPrivate();

  const [postPage, setPostPage] = useState<Entities.IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

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
          `/api/posts/pages?page=${encodedPageNum}&limit=${encodedLimit}`,
          { signal }
        );

        if (!data.success) {
          setHasNextPage(false);
          return;
        }
        setPostPage((prev) => [...prev, ...data.postPage]);
        setHasNextPage(Boolean(data.postPage.length));
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

  return { isLoading, isError, error, postPage, hasNextPage };
};

export default useGetPostPage;
