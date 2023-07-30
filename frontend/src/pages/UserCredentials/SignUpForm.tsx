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
import { toast } from 'react-toastify';

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
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

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
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
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

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { SpinnerCircularFixed, SpinnerDiamond } from 'spinners-react';
// import { SignUpBody } from '../../apis/apiUsers';

// function LoginForm() {
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setError,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<SignUpBody>({
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       passwordConfirm: '',
//     },
//     mode: 'all',
//   });

//   const onSubmit = async (
//     data: SignUpBody,
//     e: React.BaseSyntheticEvent | undefined
//   ) => {
//     e?.preventDefault();

//     // try {
//     //   const user = await signUp(data);
//     // } catch (error) {
//     //   if (error instanceof Error) {
//     //     console.error(error);
//     //     if (
//     //       error.message === 'Email already in use. Please try another or login'
//     //     ) {
//     //       setError('root', {
//     //         type: '409',
//     //         message: 'Email already in use. Please try another or login',
//     //       });
//     //     } else if (error.message === "Passwords don't match") {
//     //       setError('root', {
//     //         type: '400',
//     //         message: "Passwords don't match",
//     //       });
//     //     }
//     //   } else {
//     //     // Default error to show in UI
//     //     setError('root', {
//     //       message: 'An error ocurred, please try again later',
//     //     });
//     //   }
//     // }
//   };

//   return (
//     <form
//       className='flex flex-col gap-3 h-full text-gray-700'
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <div className='form-control'>
//         <label className='credentials-label' htmlFor='first-name'>
//           First Name
//         </label>
//         <input
//           id='first-name'
//           className='credentials-input'
//           type='text'
//           {...register('firstName', {
//             required: { value: true, message: 'Field required' },
//           })}
//         />
//         {errors?.firstName && (
//           <p className='input-error'>{errors.firstName.message}</p>
//         )}
//       </div>

//       <div className='form-control'>
//         <label className='credentials-label' htmlFor='last-name'>
//           Last Name
//         </label>
//         <input
//           id='last-name'
//           className='credentials-input'
//           type='text'
//           {...register('lastName', {
//             required: { value: true, message: 'Field required' },
//           })}
//         />
//         {errors?.lastName && (
//           <p className='input-error'>{errors.lastName.message}</p>
//         )}
//       </div>

//       <div className='form-control'>
//         <label className='credentials-label' htmlFor='email'>
//           Email
//         </label>
//         <input
//           id='email'
//           className='credentials-input'
//           type='email'
//           {...register('email', {
//             required: { value: true, message: 'Field required' },
//           })}
//         />
//         {errors?.email && <p className='input-error'>{errors.email.message}</p>}
//       </div>

//       <div className='form-control'>
//         <label className='credentials-label' htmlFor='password'>
//           Password
//         </label>
//         <div className='relative'>
//           <input
//             id='password'
//             className='credentials-input'
//             type={showPassword ? 'text' : 'password'}
//             {...register('password', {
//               required: { value: true, message: 'Field required' },
//             })}
//           />

//           {showPassword ? (
//             <FaRegEyeSlash
//               className='cursor-pointer text-xl text-gray-500 absolute top-1/2 right-3 -translate-y-1/2'
//               onClick={() => setShowPassword(false)}
//             />
//           ) : (
//             <FaRegEye
//               className='cursor-pointer text-xl text-gray-500 absolute top-1/2 right-3 -translate-y-1/2'
//               onClick={() => setShowPassword(true)}
//             />
//           )}
//         </div>
//         {errors?.password && (
//           <p className='input-error'>{errors.password.message}</p>
//         )}
//       </div>

//       <div className='form-control'>
//         <label className='credentials-label' htmlFor='confirm-password'>
//           Confirm Password
//         </label>
//         <div className='relative'>
//           <input
//             id='confirm-password'
//             className='credentials-input'
//             type={showPassword ? 'text' : 'password'}
//             {...register('passwordConfirm', {
//               required: { value: true, message: 'Field required' },
//               validate: (passwordConfirm) =>
//                 passwordConfirm === watch('password'),
//             })}
//           />

//           {showPassword ? (
//             <FaRegEyeSlash
//               className='cursor-pointer text-xl text-gray-500 absolute top-1/2 right-3 -translate-y-1/2'
//               onClick={() => setShowPassword(false)}
//             />
//           ) : (
//             <FaRegEye
//               className='cursor-pointer text-xl text-gray-500 absolute top-1/2 right-3 -translate-y-1/2'
//               onClick={() => setShowPassword(true)}
//             />
//           )}
//         </div>
//         {errors?.password && (
//           <p className='input-error'>{errors.password.message}</p>
//         )}
//       </div>

//       <Link
//         className='text-xs text-amber-700 font-semibold'
//         to='/password-reset'
//       >
//         Forgot password?
//       </Link>

//       {errors?.root && <p className='form-error'>{errors.root.message}</p>}

//       <button
//         className='uppercase text-base font-semibold text-center tracking-widest bg-primary py-3 mt-auto rounded-md disabled:opacity-50'
//         type='submit'
//         disabled={
//           errors.email || errors.password || isSubmitting ? true : false
//         }
//       >
//         {isSubmitting ? (
//           <SpinnerCircularFixed
//             size={20}
//             thickness={200}
//             style={{ color: '#d1d5db', textAlign: 'center', display: 'inline' }}
//           />
//         ) : (
//           'SIGN UP'
//         )}
//       </button>
//     </form>
//   );
// }
// export default LoginForm;
