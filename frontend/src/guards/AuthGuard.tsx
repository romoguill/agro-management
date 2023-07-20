import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';

// TODO: Use roles prop to narrow down acces by role
interface AuthGuardProps {
  roles?: string[];
}

function AuthGuard({ roles }: AuthGuardProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      axios.post(
        '/api/auth/refresh',
        {},
        {
          withCredentials: true,
        }
      ),
    retry: false,
  });

  if (isLoading) return <SpinnerCircular />;

  console.log(data);
  console.log(isError);

  return isError ? <Navigate to={'/authenticate'} /> : <Outlet />;
}

export default AuthGuard;
