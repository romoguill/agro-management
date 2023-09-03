import { createSupplierFormSchema } from '@/components/MasterData/SupplierForm';
import useAuthContext from '@/hooks/useAuthContext';
import { SupplierWithId } from '@/ts/interfaces';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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

const getSupplierById = async (id: string | undefined, authToken: string) => {
  const response = await axios.get(`/api/suppliers/${id}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return response.data;
};

export function useSupplier(id: string | undefined) {
  const { auth } = useAuthContext();
  const queryClient = useQueryClient();

  return useQuery<SupplierWithId, AxiosError>({
    queryKey: ['suppliers', id, auth.accessToken],
    queryFn: () => getSupplierById(id, auth.accessToken || ''),
    initialData: () =>
      queryClient
        .getQueryData<SupplierWithId[]>(['suppliers', auth.accessToken])
        ?.find((supplier) => supplier._id === id),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(['suppliers', auth.accessToken])?.dataUpdatedAt,
  });
}

export const createSupplier = async (
  values: createSupplierFormSchema,
  authToken: string
) => {
  const response = await axios.post('/api/suppliers', values, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  return response.data;
};

export const updateSupplier = async (
  values: createSupplierFormSchema,
  id: string | undefined,
  authToken: string
) => {
  const response = await axios.patch(`/api/suppliers/${id}`, values, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  return response.data;
};
