import { createSupplier, updateSupplier } from '@/apis/suppliers.api';
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useAuthContext from '@/hooks/useAuthContext';
import { EntityStatus, Supplier, SupplierCategories } from '@/ts/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SpinnerCircularFixed } from 'spinners-react';
import { z } from 'zod';
import { Checkbox } from '../ui/checkbox';

export const createSupplierFormSchema = z.object({
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
  phone: z
    .string({ required_error: 'Phone is required' })
    .min(1, 'Phone is required'),
  website: z.string().optional(),
  avatarUrl: z.string().optional(),
  cuit: z
    .string({ required_error: 'CUIT is required' })
    .length(10, 'CUIT is invalid (10 numbers, no space)'),
});

export type createSupplierFormSchema = z.infer<typeof createSupplierFormSchema>;

type UpdateFormProps = {
  mode: 'update' | 'view';
  toggleMode: () => void;
  data: Supplier;
};

type CreateFormProps = {
  mode: 'create';
  toggleMode?: never;
  data?: never;
};

type SupplierFormProps = UpdateFormProps | CreateFormProps;

function SupplierForm({ mode, toggleMode, data }: SupplierFormProps) {
  const { auth } = useAuthContext();
  const { _id } = useParams();

  const queryClient = useQueryClient();

  const form = useForm<createSupplierFormSchema>({
    resolver: zodResolver(createSupplierFormSchema),
    defaultValues: data ?? {
      name: '',
      description: '',
      status: EntityStatus.ACTIVE,
      category: [],
      phone: '',
      website: '',
      avatarUrl: '',
      cuit: '',
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

  const errorHandler = (error: unknown) => {
    if (error instanceof AxiosError) {
      form.setError('root', {
        type: String(error.response?.status),
        message:
          error.response?.data.error ?? 'There was a problem, try again later',
      });
    }
  };

  const createMutation = useMutation<
    createSupplierFormSchema,
    unknown,
    createSupplierFormSchema,
    unknown
  >({
    mutationFn: (values) => createSupplier(values, auth.accessToken || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });

      notifySuccess('Supplier created!');

      form.reset();
      window.scrollTo({ top: 0 });
    },
    onError: errorHandler,
  });

  const updateMutation = useMutation<
    createSupplierFormSchema,
    unknown,
    createSupplierFormSchema,
    unknown
  >({
    mutationFn: (values) => updateSupplier(values, _id, auth.accessToken || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });

      notifySuccess('Supplier updated!');

      toggleMode?.();

      window.scrollTo({ top: 0 });
    },
    onError: errorHandler,
  });

  const onSubmit = async (values: createSupplierFormSchema) => {
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
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder='Phone'
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
          name='website'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input
                  placeholder='Website'
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
          name='avatarUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>AvatarUrl</FormLabel>
              <FormControl>
                <Input
                  placeholder='AvatarUrl'
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
          name='cuit'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuit</FormLabel>
              <FormControl>
                <Input
                  placeholder='Cuit'
                  {...field}
                  disabled={mode === 'view'}
                />
              </FormControl>
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

export default SupplierForm;
