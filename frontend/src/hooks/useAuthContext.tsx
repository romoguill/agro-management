import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function useAuthContext() {
  const context = useContext(AuthContext);

  return context;
}

export default useAuthContext;
