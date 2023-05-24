import useAxiosPrivate from './useAxiosPrivate';
import React, {useEffect} from 'react';
import {loginUser, logoutUser} from '../redux/userSlice';
import {useDispatch} from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

// import useNeedAuth from './useNeedAuth';



export default async function useGetUser(id?:any) {
    
    const axiosPrivate = useAxiosPrivate();
    const controller = new AbortController();
    const location = useLocation();
    const navigate = useNavigate()
    
  try {
    const response = await axiosPrivate.get(id ? `/api/users/${id}` : '/api/users', {
        signal: controller.signal
    });
    return response.data
} catch (err) {
    console.error("err");
    navigate('/signin', { state: { from: location }, replace: true });
}
 
}
