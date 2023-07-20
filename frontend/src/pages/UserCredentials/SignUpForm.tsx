import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SpinnerCircularFixed, SpinnerDiamond } from 'spinners-react';
import { SignUpBody } from '../../apis/apiUsers';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpBody>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'all',
  });

  const onSubmit = async (
    data: SignUpBody,
    e: React.BaseSyntheticEvent | undefined
  ) => {
    e?.preventDefault();

    // try {
    //   const user = await signUp(data);
    // } catch (error) {
    //   if (error instanceof Error) {
    //     console.error(error);
    //     if (
    //       error.message === 'Email already in use. Please try another or login'
    //     ) {
    //       setError('root', {
    //         type: '409',
    //         message: 'Email already in use. Please try another or login',
    //       });
    //     } else if (error.message === "Passwords don't match") {
    //       setError('root', {
    //         type: '400',
    //         message: "Passwords don't match",
    //       });
    //     }
    //   } else {
    //     // Default error to show in UI
    //     setError('root', {
    //       message: 'An error ocurred, please try again later',
    //     });
    //   }
    // }
  };

  return (
    <form
      className='flex flex-col gap-3 h-full text-gray-700'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='form-control'>
        <label className='credentials-label' htmlFor='first-name'>
          First Name
        </label>
        <input
          id='first-name'
          className='credentials-input'
          type='text'
          {...register('firstName', {
            required: { value: true, message: 'Field required' },
          })}
        />
        {errors?.firstName && (
          <p className='input-error'>{errors.firstName.message}</p>
        )}
      </div>

      <div className='form-control'>
        <label className='credentials-label' htmlFor='last-name'>
          Last Name
        </label>
        <input
          id='last-name'
          className='credentials-input'
          type='text'
          {...register('lastName', {
            required: { value: true, message: 'Field required' },
          })}
        />
        {errors?.lastName && (
          <p className='input-error'>{errors.lastName.message}</p>
        )}
      </div>

      <div className='form-control'>
        <label className='credentials-label' htmlFor='email'>
          Email
        </label>
        <input
          id='email'
          className='credentials-input'
          type='email'
          {...register('email', {
            required: { value: true, message: 'Field required' },
          })}
        />
        {errors?.email && <p className='input-error'>{errors.email.message}</p>}
      </div>

      <div className='form-control'>
        <label className='credentials-label' htmlFor='password'>
          Password
        </label>
        <div className='relative'>
          <input
            id='password'
            className='credentials-input'
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: { value: true, message: 'Field required' },
            })}
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
        {errors?.password && (
          <p className='input-error'>{errors.password.message}</p>
        )}
      </div>

      <div className='form-control'>
        <label className='credentials-label' htmlFor='confirm-password'>
          Confirm Password
        </label>
        <div className='relative'>
          <input
            id='confirm-password'
            className='credentials-input'
            type={showPassword ? 'text' : 'password'}
            {...register('passwordConfirm', {
              required: { value: true, message: 'Field required' },
              validate: (passwordConfirm) =>
                passwordConfirm === watch('password'),
            })}
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
        {errors?.password && (
          <p className='input-error'>{errors.password.message}</p>
        )}
      </div>

      <Link
        className='text-xs text-amber-700 font-semibold'
        to='/password-reset'
      >
        Forgot password?
      </Link>

      {errors?.root && <p className='form-error'>{errors.root.message}</p>}

      <button
        className='uppercase text-base font-semibold text-center tracking-widest bg-primary py-3 mt-auto rounded-md disabled:opacity-50'
        type='submit'
        disabled={
          errors.email || errors.password || isSubmitting ? true : false
        }
      >
        {isSubmitting ? (
          <SpinnerCircularFixed
            size={20}
            thickness={200}
            style={{ color: '#d1d5db', textAlign: 'center', display: 'inline' }}
          />
        ) : (
          'SIGN UP'
        )}
      </button>
    </form>
  );
}
export default LoginForm;
