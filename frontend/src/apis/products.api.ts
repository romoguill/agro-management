import useAuthContext from '@/hooks/useAuthContext';
import { ProductWithId } from '@/ts/interfaces';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

const getProducts = async (authToken: string) => {
  const response = await axios.get('/api/products', {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return response.data;
};

export function useProducts() {
  const { auth } = useAuthContext();
  return useQuery<ProductWithId[], AxiosError>({
    queryKey: ['products', auth.accessToken],
    queryFn: () => getProducts(auth.accessToken || ''),
  });
}
