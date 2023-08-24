import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetFeedbacks = ( page?:number ,limit?:number, filters?:{type?:Types.IRecipeType, rating?:string|number}) => {
  const axiosPrivate = useAxiosPrivate();

  const [recipes, setRecipes] = useState<Entities.IRecipe[]>([]);
  const [countAllRecipes, setCountAllRecipes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});


  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const fetchData = async () => {
      try {

          let url = `/api/recipes/pages`;
        let queryParams = {};
        queryParams = { page, limit };
      
        if(filters?.type) queryParams = {...queryParams, type: filters.type};
        if(filters?.rating) queryParams = {...queryParams, rating: filters.rating};


        const { data } = await axiosPrivate.get(url, { params: queryParams });


        if (!data.success) {
            setIsError(true);
            return;
        }

        setRecipes(data.recipesPage);
        setCountAllRecipes(data.countAllRecipes);
        setIsLoading(false);
        
      } catch (e: any) {
        setIsError(true);
        setError({ message: e.message });
      }
    };

    fetchData();

  }, [page, limit, filters?.type, filters?.rating]);

  return {recipes, countAllRecipes, isLoading, isError, error};
};

export default useGetFeedbacks;
