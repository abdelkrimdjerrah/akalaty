import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetPostPage = (pageNum = 1) => {
  const axiosPrivate = useAxiosPrivate();

  const [results, setResults] = useState<Entities.IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const { data } = await axiosPrivate.get(
          `/api/posts/pages/${pageNum}`,
          { signal }
        );

        if (!data.success) {
          setHasNextPage(false);
          return;
        }
        setResults((prev) => [...prev, ...data.postPage]);
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

  return { isLoading, isError, error, results, hasNextPage };
};

export default useGetPostPage;
