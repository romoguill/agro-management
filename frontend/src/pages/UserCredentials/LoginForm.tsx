import { Link } from 'react-router-dom';

function LoginForm() {
  return (
    <form className='flex flex-col gap-3 h-full'>
      <div>
        <label className='credentials-label' htmlFor=''>
          Email
        </label>
        <input className='credentials-input' type='text' />
      </div>
      <div>
        <label className='credentials-label' htmlFor=''>
          Password
        </label>
        <input className='credentials-input' type='password' />
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
