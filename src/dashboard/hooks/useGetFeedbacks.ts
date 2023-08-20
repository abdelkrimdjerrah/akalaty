import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetFeedbacks = (recipeId:string, page?:number ,limit?:number, filters?:{images?:string, rating?:string|number}) => {
  const axiosPrivate = useAxiosPrivate();

  const [feedbacks, setFeedbacks] = useState<Entities.IFeedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});


  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const fetchData = async () => {
      try {

        let queryParams = {};
        let url = `/api/recipes/${recipeId}/feedbacks`;
        if (page && limit) {
          queryParams = { page, limit };
          url = `/api/recipes/${recipeId}/feedbacks/pages`;
        }
        if(filters?.images) queryParams = {...queryParams, images: filters.images};
        if(filters?.rating) queryParams = {...queryParams, rating: filters.rating};


        const { data } = await axiosPrivate.get(url, { params: queryParams });


        if (!data.success) {
            setIsError(true);
            return;
        }
        setFeedbacks(data.feedbacksPage);
        setIsLoading(false);
        
      } catch (e: any) {
        setIsError(true);
        setError({ message: e.message });
      }
    };

    fetchData();

  }, [page, limit, filters?.images, filters?.rating]);

  return {feedbacks, isLoading, isError, error};
};

export default useGetFeedbacks;
