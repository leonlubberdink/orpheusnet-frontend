import axios from '../services/axios';
import useAuth from './useAuth';

function useRefreshToken() {
  const { setAuth } = useAuth();

  async function refresh() {
    const res = await axios.get('/users/refreshToken', {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        user: res.data.data.user,
        accessToken: res.data.accessToken,
      };
    });
    return res.data.accessToken;
  }

  return refresh;
}

export default useRefreshToken;
