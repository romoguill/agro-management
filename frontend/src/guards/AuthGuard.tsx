import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import jwtDecode from 'jwt-decode';
import { AuthActionTypes } from '../contexts/AuthContext';
import { JwtPayload } from '../ts/interfaces';
import { isExpired } from '../utils/jwtExpiration';

// TODO: Use roles prop to narrow down acces by role
interface AuthGuardProps {
  roles?: string[];
}

function AuthGuard({ roles }: AuthGuardProps) {
  const { auth, dispatch } = useAuthContext();

  if (!auth.user || !auth.accessToken) return <Navigate to={'/authenticate'} />;

  const isJwtExpired = isExpired(auth.accessToken);

  if (isJwtExpired) {
    dispatch({ type: AuthActionTypes.LOGOUT });
    return <Navigate to={'/authenticate'} />;
  }

  return <Outlet />;
}

export default AuthGuard;
