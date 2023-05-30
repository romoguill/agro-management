import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  type FormValues = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormValues, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
    } catch (error) {}
  };

  const onError = (errors, e) => {};

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
            {...register('email', {
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
      </div>

      <Link className='text-xs text-red-600 font-semibold' to='/password-reset'>
        Forgot password?
      </Link>

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
