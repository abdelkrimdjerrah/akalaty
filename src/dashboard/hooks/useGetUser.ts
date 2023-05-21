import { useAxios } from './useAxios';
import React, {useEffect} from 'react';
import {loginUser, logoutUser} from '../redux/userSlice';
import {useDispatch} from 'react-redux';
// import useNeedAuth from './useNeedAuth';

export default function useGetUser(id?:any) {
  
    const { response, loading, error } = useAxios({
        method: "GET",
        url: id ? `/api/users/${id}` : `/api/users/`,
        headers: {
          accept: '*/*'
        }
      });
      

//   const dispatch = useDispatch();

//   const getUser = async () => {
//     try {
//       // fetching user data
//       const {data} = await axiosPrivate.get('/api/users');

//       if (data?.success === false) return dispatch(logoutUser());

//       // dispatch the user data to redux state
//       dispatch(loginUser({type: 'user', data}));
//     } catch (error) {}
//   };
  if(response){
   
    return response.data
  }else{
    return "nothing"
  }
 
}

export const useReGetUser = () => {
  const getUser = useGetUser();
  useEffect(() => {
     getUser();
  }, []);
};