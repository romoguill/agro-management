import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ReactNode, createContext, useEffect, useReducer } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  REFRESH_ACCESS_TOKEN = 'REFRESH_ACCESS_TOKEN',
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

const initialAuthState: AuthState = {
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
    case AuthActionTypes.REFRESH_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload.accessToken };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Try to refresh access token to know if user has to login again
  useEffect(() => {
    const fetchAuth = async () => {
      axios
        .post<AuthState>(
          '/api/auth/refresh',
          {},
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          dispatch({ type: AuthActionTypes.LOGIN, payload: response.data });
        });
    };

    fetchAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
