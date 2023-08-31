import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import useAuthContext from '@/hooks/useAuthContext';
import {
  EntityStatus,
  Product,
  Supplier,
  SupplierCategories,
} from '@/ts/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SpinnerCircularFixed } from 'spinners-react';
import { z } from 'zod';
import { Checkbox } from '../ui/checkbox';
import { useParams } from 'react-router-dom';
import AsyncSelect from 'react-select/async';

export const createProductFormSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required'),
  description: z.string().optional(),
  status: z.nativeEnum(EntityStatus, {
    required_error: 'Status is required',
  }),
  category: z.array(z.nativeEnum(SupplierCategories), {
    required_error: 'Category must be an array',
  }),
  suppliers: z
    .array(z.string(), { required_error: 'Supplier array is required' })
    .nonempty({ message: "Array of suppliers cant't be empty" }),
});

export type createProductFormSchema = z.infer<typeof createProductFormSchema>;

type UpdateFormProps = {
  mode: 'update' | 'view';
  toggleMode: () => void;
  data: Product;
};

type CreateFormProps = {
  mode: 'create';
  toggleMode?: never;
  data?: never;
};

type ProductFormProps = UpdateFormProps | CreateFormProps;

function ProductForm({ mode, toggleMode, data }: ProductFormProps) {
  const { auth } = useAuthContext();
  const { _id } = useParams();

  const queryClient = useQueryClient();

  const cachedData = queryClient.getQueriesData(['suppliers']);
  console.log(cachedData);

  const form = useForm<createProductFormSchema>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: data ?? {
      name: '',
      description: '',
      status: EntityStatus.ACTIVE,
      category: [],
      suppliers: [],
    },
    mode: 'onBlur',
  });

  const notifySuccess = (msg: string) =>
    toast.success(msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const addProduct = async (values: createProductFormSchema) => {
    const response = await axios.post('/api/products', values, {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    });

    return response.data;
  };

  const updateProduct = async (values: createProductFormSchema) => {
    const response = await axios.patch(`/api/products/${_id}`, values, {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    });

    return response.data;
  };

  const errorHandler = (error: unknown) => {
    if (error instanceof AxiosError) {
      form.setError('root', {
        type: String(error.response?.status),
        message:
          error.response?.data.error ?? 'There was a problem, try again later',
      });
    }
  };

  const createMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });

      notifySuccess('Product created!');

      form.reset();
      window.scrollTo({ top: 0 });
    },
    onError: errorHandler,
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });

      notifySuccess('Product updated!');

      toggleMode?.();

      window.scrollTo({ top: 0 });
    },
    onError: errorHandler,
  });

  const onSubmit = async (values: createProductFormSchema) => {
    if (mode === 'create') createMutation.mutate(values);
    if (mode === 'update') updateMutation.mutate(values);
  };

  const submitErrorMessage = form.formState.errors.root && (
    <p className='text-sm font-medium text-red-500 dark:text-red-900'>
      {form.formState.errors.root.message}
    </p>
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col h-full gap-3'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Name'
                  {...field}
                  disabled={mode === 'view'}
                />
              </FormControl>
              <FormMessage className='text-xs text-right pr-1' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={mode === 'view'}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(EntityStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className='text-xs text-right pr-1' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder='Description'
                  {...field}
                  disabled={mode === 'view'}
                />
              </FormControl>
              <FormMessage className='text-xs text-right pr-1' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='category'
          render={() => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormDescription className='!mt-0'>
                Select at least one of the following categories
              </FormDescription>
              <div className='flex flex-col md:grid grid-cols-2 gap-2'>
                {Object.values(SupplierCategories)
                  .sort()
                  .map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name='category'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item}
                            className='flex flex-row items-start space-x-3 space-y-0'
                          >
                            <FormControl>
                              <Checkbox
                                disabled={mode === 'view'}
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className='leading-none text-slate-700'>
                              {item}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
              </div>
              <FormMessage className='text-xs text-right pr-1' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='suppliers'
          render={() => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormDescription className='!mt-0'>
                Select at least one of the following categories
              </FormDescription>
              <div className='flex flex-col md:grid grid-cols-2 gap-2'>
                {Object.values(SupplierCategories)
                  .sort()
                  .map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name='category'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item}
                            className='flex flex-row items-start space-x-3 space-y-0'
                          >
                            <FormControl>
                              <AsyncSelect />
                            </FormControl>
                            <FormLabel className='leading-none text-slate-700'>
                              {item}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
              </div>
              <FormMessage className='text-xs text-right pr-1' />
            </FormItem>
          )}
        />

        {submitErrorMessage}

        {mode !== 'view' && (
          <Button type='submit' className='w-full mt-4'>
            {form.formState.isSubmitting ? (
              <SpinnerCircularFixed
                size={20}
                thickness={200}
                style={{
                  color: '#d1d5db',
                  textAlign: 'center',
                  display: 'inline',
                }}
              />
            ) : (
              mode.toUpperCase()
            )}
          </Button>
        )}
      </form>
    </Form>
  );
}

export default ProductForm;
