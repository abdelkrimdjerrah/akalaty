import useAxiosPrivate from './useAxiosPrivate';
import axios from '../api/axios';

// import useNeedAuth from './useNeedAuth';


export default async function useGetPost(id?:any) {
    const axiosPrivate = useAxiosPrivate();
    const controller = new AbortController();

  try {
    const response = await axios.get(id ? `/api/posts/${id}` : '/api/posts', {
        signal: controller.signal
    });
    return response.data
} catch (err) {
    console.error(err);
}
 
}
