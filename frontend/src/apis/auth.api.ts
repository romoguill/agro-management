import axios from 'axios';
import { User } from '../contexts/AuthContext';

interface ResponseRefreshToken {
  user: User;
  accessToken: string;
}

export const refreshAccessToken = async () => {
  const response = await axios.post<ResponseRefreshToken>(
    '/api/auth/refresh',
    {},
    {
      withCredentials: true,
    }
  );

  return response.data.accessToken;
};
