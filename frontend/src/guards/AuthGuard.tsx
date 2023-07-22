import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import jwtDecode from 'jwt-decode';
import { AuthActionTypes } from '../contexts/AuthContext';
import { JwtPayload } from '../ts/interfaces';
import { isExpired } from '../utils/jwtExpiration';
import { useEffect } from 'react';
import { refreshAccessToken } from '../apis/auth.api';
import { SpinnerCircular } from 'spinners-react';

// TODO: Use roles prop to narrow down acces by role
interface AuthGuardProps {
  roles?: string[];
}

function AuthGuard({ roles }: AuthGuardProps) {
  const { auth, dispatch, isLoadingAuth } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoadingAuth) return;

    if (!(auth.accessToken && auth.user)) return navigate('/authenticate');

    const isJwtExpired = isExpired(auth.accessToken);

    const updateAuthAccessToken = async () => {
      try {
        const newAccessToken = await refreshAccessToken();
        dispatch({
          type: AuthActionTypes.REFRESH_ACCESS_TOKEN,
          payload: { user: auth.user, accessToken: newAccessToken },
        });
      } catch (error) {
        dispatch({
          type: AuthActionTypes.LOGOUT,
          payload: { user: auth.user, accessToken: auth.accessToken },
        });
        return navigate('/authenticate');
      }
    };

    if (isJwtExpired) {
      updateAuthAccessToken();
    }
  }, [location, auth, isLoadingAuth, dispatch, navigate]);

  return isLoadingAuth ? (
    <SpinnerCircular
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  ) : (
    <Outlet />
  );
}

export default AuthGuard;
