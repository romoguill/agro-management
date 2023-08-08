import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SpinnerCircularFixed } from 'spinners-react';
import { z } from 'zod';
import useAuthContext from '../../hooks/useAuthContext';

const createSupplierFormSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required'),
  description: z.string().optional(),
  category: z.array(
    z.enum(['Seeds', 'Fertilizers', 'Herbicides', 'Labor'], {}),
    { required_error: 'Category must be an array' }
  ),
  phone: z
    .string({ required_error: 'Phone is required' })
    .min(1, 'Phone is required'),
  website: z.string().optional(),
  avatarUrl: z.string().optional(),
  cuit: z
    .string({ required_error: 'CUIT is required' })
    .length(10, 'CUIT is invalid (10 numbers, no space)'),
});

type createSupplierFormSchema = z.infer<typeof createSupplierFormSchema>;

function CreateSupplierForm() {
  const form = useForm<createSupplierFormSchema>({
    resolver: zodResolver(createSupplierFormSchema),
    defaultValues: {
      name: '',
      description: '',
      category: undefined,
      phone: '',
      website: '',
      avatarUrl: '',
      cuit: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (values: createSupplierFormSchema) => {
    try {
      console.log('submitted');
    } catch (error) {
      if (error instanceof AxiosError) {
        form.setError('root', {
          type: String(error.response?.status),
          message:
            error.response?.data.error ??
            'There was a problem, try again later',
        });
      }
    }
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder='Category' {...field} />
              </FormControl>
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

        <Button type='submit' className='w-full mt-auto'>
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
