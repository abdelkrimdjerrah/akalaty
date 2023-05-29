import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../redux/userSlice';
const useRefreshToken = () => {
    const dispatch = useDispatch();
    const refresh = async () => {

        try {
            const response = await axios.get('/api/auth/refresh', {
                withCredentials: true,
            });
          
            dispatch(setAccessToken({type:'token', data:response.data.accessToken}));
           
            return response.data.accessToken;
            
        } catch (error) {
      
        }
    }
    return refresh;
};

export default useRefreshToken;