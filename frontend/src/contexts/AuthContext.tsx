import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ReactNode, createContext, useEffect, useReducer } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
}

interface AuthAction {
  type: AuthActionTypes;
  payload: AuthState;
}

const initialAuthState = {
  user: null,
  accessToken: null,
};

export const AuthContext = createContext<{
  auth: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({ auth: initialAuthState, dispatch: () => null });

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case AuthActionTypes.LOGOUT:
      return { user: null, accessToken: null };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    console.log('hi');
  }, [state]);

  // Try to refresh access token to know if user has to login again
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['auth'],
    queryFn: () =>
      axios
        .post<AuthState>(
          '/api/auth/refresh',
          {},
          {
            withCredentials: true,
          }
        )
        .then((response) => response.data),
    retry: false,
    // enabled: !state.user ? true : false,
  });

  // If the refresh query is success it means the refresh token in httpOnly cookie was valid. Update user info in context
  if (isSuccess) {
    dispatch({ type: AuthActionTypes.LOGIN, payload: data });
  }

  return (
    <AuthContext.Provider value={{ auth: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
