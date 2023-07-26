import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { SpinnerCircularFixed } from 'spinners-react';
import { LoginBody } from '../../apis/apiUsers';
import { AuthActionTypes, User } from '../../contexts/AuthContext';
import useAuthContext from '../../hooks/useAuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

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
      const response = await axios.post('/api/auth/login', values);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='email' {...field} />
              </FormControl>
              <FormMessage />
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
                <Input placeholder='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>LOGIN</Button>
      </form>
    </Form>
  );

  // const {
  //   register,
  //   handleSubmit,
  //   setError,
  //   formState: { errors, isSubmitting },
  // } = useForm<LoginBody>({
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //   },
  //   mode: 'all',
  // });

  // const mutation = useMutation({
  //   mutationFn: (
  //     credentials: LoginBody
  //   ): Promise<{ user: User; accessToken: string }> => {
  //     return axios
  //       .post('/api/auth/login', credentials)
  //       .then((response) => response.data);
  //   },
  // });

  // const onSubmit = async (
  //   formData: LoginBody,
  //   e: React.BaseSyntheticEvent | undefined
  // ) => {
  //   e?.preventDefault();

  //   try {
  //     const { user, accessToken } = await mutation.mutateAsync(formData);

  //     dispatch({
  //       type: AuthActionTypes.LOGIN,
  //       payload: { user, accessToken },
  //     });

  //     navigate('/');
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       setError('root', {
  //         type: String(error.response?.status),
  //         message: error.response?.data.error,
  //       });
  //     } else {
  //       setError('root', {
  //         type: '500',
  //         message: 'An error ocurred, please try again later',
  //       });
  //     }
  //   }
  // };

  // return (
  //   <form
  //     className='flex flex-col gap-3 h-full text-gray-700'
  //     onSubmit={handleSubmit(onSubmit)}
  //   >
  //     <div className='form-control'>
  //       <label className='credentials-label' htmlFor='email'>
  //         Email
  //       </label>
  //       <input
  //         id='email'
  //         className='credentials-input'
  //         type='email'
  //         {...register('email', {
  //           required: { value: true, message: 'Field required' },
  //         })}
  //       />
  //       {errors?.email && <p className='input-error'>{errors.email.message}</p>}
  //     </div>

  //     <div className='form-control'>
  //       <label className='credentials-label' htmlFor='password'>
  //         Password
  //       </label>
  //       <div className='relative'>
  //         <input
  //           id='password'
  //           className='credentials-input'
  //           type={showPassword ? 'text' : 'password'}
  //           {...register('password', {
  //             required: { value: true, message: 'Field required' },
  //           })}
  //         />

  //         {showPassword ? (
  //           <FaRegEyeSlash
  //             className='cursor-pointer text-xl text-gray-500 absolute top-1/2 right-3 -translate-y-1/2'
  //             onClick={() => setShowPassword(false)}
  //           />
  //         ) : (
  //           <FaRegEye
  //             className='cursor-pointer text-xl text-gray-500 absolute top-1/2 right-3 -translate-y-1/2'
  //             onClick={() => setShowPassword(true)}
  //           />
  //         )}
  //       </div>
  //       {errors?.password && (
  //         <p className='input-error'>{errors.password.message}</p>
  //       )}
  //     </div>

  //     <Link
  //       className='text-xs text-amber-700 font-semibold'
  //       to='/password-reset'
  //     >
  //       Forgot password?
  //     </Link>

  //     {errors?.root && <p className='form-error'>{errors.root.message}</p>}

  //     <button
  //       className='uppercase text-base font-semibold text-center tracking-widest bg-primary py-3 mt-auto rounded-md disabled:opacity-50'
  //       type='submit'
  //       disabled={
  //         errors.email || errors.password || isSubmitting ? true : false
  //       }
  //     >
  //       {isSubmitting ? (
  //         <SpinnerCircularFixed
  //           size={20}
  //           thickness={200}
  //           style={{ color: '#d1d5db', textAlign: 'center', display: 'inline' }}
  //         />
  //       ) : (
  //         'LOGIN'
  //       )}
  //     </button>
  //   </form>
  // );
}
export default LoginForm;
