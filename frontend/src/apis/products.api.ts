import { createProductFormSchema } from '@/components/MasterData/ProductForm';
import useAuthContext from '@/hooks/useAuthContext';
import { ProductWithId } from '@/ts/interfaces';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

const getProductById = async (id: string | undefined, authToken: string) => {
  const response = await axios.get(`/api/products/${id}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return response.data;
};

export function useProduct(id: string | undefined) {
  const { auth } = useAuthContext();
  const queryClient = useQueryClient();

  return useQuery<ProductWithId, AxiosError>({
    queryKey: ['products', id, auth.accessToken],
    queryFn: () => getProductById(id, auth.accessToken || ''),
    initialData: () =>
      queryClient
        .getQueryData<ProductWithId[]>(['products', auth.accessToken])
        ?.find((product) => product._id === id),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(['products', auth.accessToken])?.dataUpdatedAt,
  });
}

export const createProduct = async (
  values: createProductFormSchema,
  authToken: string
) => {
  const response = await axios.post('/api/products', values, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  return response.data;
};

export const updateProduct = async (
  values: createProductFormSchema,
  id: string | undefined,
  authToken: string
) => {
  const response = await axios.patch(`/api/products/${id}`, values, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  return response.data;
};
