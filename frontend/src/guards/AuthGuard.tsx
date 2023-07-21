import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import useAuthContext from '../hooks/useAuthContext';

// TODO: Use roles prop to narrow down acces by role
interface AuthGuardProps {
  roles?: string[];
}

function AuthGuard({ roles }: AuthGuardProps) {
  const { auth } = useAuthContext();
  console.log(auth);

  return auth ? <Outlet /> : <Navigate to={'/authenticate'} />;
}

export default AuthGuard;
