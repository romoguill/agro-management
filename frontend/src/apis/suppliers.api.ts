import useAuthContext from '@/hooks/useAuthContext';
import { SupplierWithId } from '@/ts/interfaces';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

const getSuppliers = async (authToken: string) => {
  const response = await axios.get('/api/suppliers', {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return response.data;
};

export function useSuppliers() {
  const { auth } = useAuthContext();
  return useQuery<SupplierWithId[], AxiosError>({
    queryKey: ['suppliers', auth.accessToken],
    queryFn: () => getSuppliers(auth.accessToken || ''),
  });
}
