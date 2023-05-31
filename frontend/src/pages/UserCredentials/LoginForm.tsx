import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { LoginCredentials, login } from '../../apis/apiUsers';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (
    data: LoginCredentials,
    e: React.BaseSyntheticEvent | undefined
  ) => {
    e?.preventDefault();

    try {
      console.log(data);
      const user = await login(data);
      console.log(user);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        if (error.message === 'Invalid credentials') {
          setError('root', {
            type: '401',
            message: 'Invalid credentails',
          });
        }
      } else {
        // Default error to show in UI
        setError('root', {
          message: 'An error ocurred, please try again later',
        });
      }
    }
  };

  const onError = (errors, e) => {
    console.log(errors);
  };

  return (
    <form
      className='flex flex-col gap-3 h-full text-gray-700'
      onSubmit={handleSubmit(onSubmit, onError)}
    >
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

          {errors?.password && (
            <p className='input-error'>{errors.password.message}</p>
          )}
        </div>
      </div>

      <Link className='text-xs text-red-600 font-semibold' to='/password-reset'>
        Forgot password?
      </Link>

      {errors?.root && <p className='form-error'>{errors.root.message}</p>}

      <button
        className='uppercase text-base font-semibold tracking-widest bg-primary py-3 mt-auto rounded-md'
        type='submit'
      >
        Login
      </button>
    </form>
  );
}
export default LoginForm;
