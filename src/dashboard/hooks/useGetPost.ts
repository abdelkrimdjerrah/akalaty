import useAxiosPrivate from './useAxiosPrivate';


export default async function useGetPost(id?:any) {
    const axiosPrivate = useAxiosPrivate();
    const controller = new AbortController();

  try {
    const response = await axiosPrivate.get(id ? `/api/posts/${id}` : '/api/posts', {
        signal: controller.signal
    });
    return response.data
} catch (err) {
    console.error(err);
}
 
}
