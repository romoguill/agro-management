import { Link } from 'react-router-dom';

function LoginForm() {
  return (
    <form className='flex flex-col gap-6'>
      <div>
        <label className='block text-sm font-semibold mb-1' htmlFor=''>
          Email
        </label>
        <input
          className='p-2 w-full border border-gray-300 rounded-md bg-transparent shadow-sm'
          type='text'
        />
      </div>
      <div>
        <label className='block text-sm font-semibold mb-1' htmlFor=''>
          Password
        </label>
        <input
          className='p-2 w-full border border-gray-300 rounded-md bg-transparent'
          type='text'
        />
      </div>
      <Link className='text-xs text-red-600 font-semibold' to='/password-reset'>
        Forgot password?
      </Link>

      <button
        className='uppercase text-base font-semibold tracking-widest bg-teal-400 py-3'
        type='submit'
      >
        Login
      </button>
    </form>
  );
}
export default LoginForm;
