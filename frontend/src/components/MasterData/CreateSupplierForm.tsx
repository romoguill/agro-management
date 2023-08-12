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
import { EntityStatus, SupplierCategories } from '@/ts/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
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

function CreateSupplierForm() {
  const { auth } = useAuthContext();
  const queryClient = useQueryClient();

  const form = useForm<createSupplierFormSchema>({
    resolver: zodResolver(createSupplierFormSchema),
    defaultValues: {
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

  const notifySupplierCreated = () =>
    toast.success('Supplier created!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const addSupplier = async (values: createSupplierFormSchema) => {
    const response = await axios.post('/api/suppliers', values, {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    });

    return response.data;
  };

  const mutation = useMutation({
    mutationFn: addSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });

      notifySupplierCreated();

      form.reset();
      window.scrollTo({ top: 0 });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        form.setError('root', {
          type: String(error.response?.status),
          message:
            error.response?.data.error ??
            'There was a problem, try again later',
        });
      }
    },
  });

  const onSubmit = async (values: createSupplierFormSchema) => {
    mutation.mutate(values);
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
                <Input placeholder='Name' {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(EntityStatus).map((status) => (
                    <SelectItem value={status}>{status}</SelectItem>
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
                <Input placeholder='Description' {...field} />
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
              <div className='md:grid grid-cols-2 gap-2'>
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
                <Input placeholder='Phone' {...field} />
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
                <Input placeholder='Website' {...field} />
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
                <Input placeholder='AvatarUrl' {...field} />
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
                <Input placeholder='Cuit' {...field} />
              </FormControl>
              <FormMessage className='text-xs text-right pr-1' />
            </FormItem>
          )}
        />

        {submitErrorMessage}

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
            'CREATE'
          )}
        </Button>
      </form>
    </Form>
  );
}

export default CreateSupplierForm;
