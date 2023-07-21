import jwtDecode from 'jwt-decode';
import { JwtPayload } from '../ts/interfaces';

export const isExpired = (token: string) => {
  const decoded = jwtDecode<JwtPayload>(token);

  return decoded.exp * 1000 <= Date.now();
};
