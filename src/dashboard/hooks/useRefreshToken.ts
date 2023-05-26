import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../redux/userSlice';
const useRefreshToken = () => {
    const dispatch = useDispatch();
    const refresh = async () => {
        console.log("useRefreshToken")
        try {
            const response = await axios.get('/api/auth/refresh', {
                withCredentials: true
            });
            console.log("h")
            dispatch(setAccessToken({type:'token', data:response.data.accessToken}));
            return response.data.accessToken;
            
        } catch (error) {
            console.log('error')
            console.log(error)
            console.log('error')
        }
    }
    return refresh;
};

export default useRefreshToken;