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
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { SpinnerCircularFixed } from 'spinners-react';
import { z } from 'zod';
import { User } from '../../contexts/AuthContext';

type SignUpResponseBody = {
  user: User;
  accessToken: string;
};

const signUpFormSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Email is invalid'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    passwordConfirmation: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

type signUpFormSchema = z.infer<typeof signUpFormSchema>;

type SignUpFormProps = {
  handleTabChange: (tabValue: string) => void;
};

function SignUpForm({ handleTabChange }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const notifyUserCreated = () =>
    toast.success('User signed up. Please use credentials to login', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  const form = useForm<signUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (values: signUpFormSchema) => {
    try {
      await axios.post<SignUpResponseBody>('/api/auth/register', values);

      notifyUserCreated();

      handleTabChange('tab1');
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
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder='First Name' {...field} />
              </FormControl>
              <FormMessage className='text-xs text-right pr-1' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder='Last Name' {...field} />
              </FormControl>
              <FormMessage className='text-xs text-right pr-1' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' {...field} />
              </FormControl>
              <FormMessage className='text-xs text-right pr-1' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder='Password'
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                  />

                  {showPassword ? (
                    <FaRegEyeSlash
                      className='cursor-pointer text-xl text-gray-500 absolute top-1/2 right-3 -translate-y-1/2'
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FaRegEye
                      className='cursor-pointer text-xl text-gray-500 absolute top-1/2 right-3 -translate-y-1/2'
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage className='text-xs text-right pr-1' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='passwordConfirmation'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='Confirm Password'
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                />
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
            'SIGNUP'
          )}
        </Button>
      </form>
    </Form>
  );
}
export default SignUpForm;
