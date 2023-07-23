import axios from 'axios';
import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

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

type AuthAction =
  | {
      type: AuthActionTypes.LOGIN;
      payload: { user: User; accessToken: string };
    }
  | { type: AuthActionTypes.LOGOUT }
  | {
      type: AuthActionTypes.REFRESH_ACCESS_TOKEN;
      payload: { accessToken: string };
    };

const initialAuthState: AuthState = {
  user: null,
  accessToken: null,
};

export const AuthContext = createContext<{
  auth: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  isLoadingAuth: boolean;
}>({ auth: initialAuthState, dispatch: () => null, isLoadingAuth: true });

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
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Try to refresh access token to know if user has to login again
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await axios.post<{ user: User; accessToken: string }>(
          '/api/auth/refresh',
          {},
          {
            withCredentials: true,
          }
        );
        dispatch({ type: AuthActionTypes.LOGIN, payload: response.data });
      } finally {
        setIsLoadingAuth(false);
      }
    };

    fetchAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth: state, dispatch, isLoadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
