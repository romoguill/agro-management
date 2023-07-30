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
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { AuthActionTypes, User } from '../../contexts/AuthContext';
import useAuthContext from '../../hooks/useAuthContext';
import { SpinnerCircularFixed } from 'spinners-react';

type LoginResponseBody = {
  user: User;
  accessToken: string;
};

const loginFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Email is invalid'),
  password: z.string().min(1, 'Password is required'),
});

type loginFormSchema = z.infer<typeof loginFormSchema>;

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const form = useForm<loginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (values: loginFormSchema) => {
    try {
      const { data } = await axios.post<LoginResponseBody>(
        '/api/auth/login',
        values
      );
      dispatch({
        type: AuthActionTypes.LOGIN,
        payload: { user: data.user, accessToken: data.accessToken },
      });

      navigate('/');
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
            'LOGIN'
          )}
        </Button>
      </form>
    </Form>
  );
}
export default LoginForm;
