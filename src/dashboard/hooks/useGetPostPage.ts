import { useEffect, useState } from 'react';
import { axiosPrivate } from '../api/axios';

export const getPostPage  = async (pageNum = 1, options = {}) => {
  const response = await axiosPrivate.get(`/api/posts/pages/${pageNum}`, options);
  return response.data.postPage;
};

const useGetPostPage = (pageNum = 1) => {
  const [results, setResults] = useState<Entities.PostEntity[]>([]);
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
        const data = await getPostPage(pageNum, { signal });
        setResults((prev) => [...prev, ...data]);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      } catch (e:any) {
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
