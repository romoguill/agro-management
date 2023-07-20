import { ReactNode, createContext, useReducer } from 'react';

export const AuthContext = createContext<{
  user: User | null;
  dispatch: React.Dispatch<AuthAction>;
}>({ user: null, dispatch: () => null });

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
  accessToken?: string;
}

interface AuthAction {
  type: AuthActionTypes;
  payload: User;
}

interface AuthState {
  user: User | null;
}

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { user: action.payload };
    case AuthActionTypes.LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
