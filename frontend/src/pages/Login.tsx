import { Link } from 'react-router-dom';

function Login() {
  return (
    <main className='flex justify-center items-center h-screen bg-gradient-to-r from-teal-200 to-lime-200'>
      <div className='bg-gray-50/40 p-6 rounded-sm'>
        <h1 className='text-3xl font-semibold text-center mb-16 text-cyan-500'>
          Login
        </h1>
        <form className='flex flex-col gap-6'>
          <div>
            <label className='block text-sm font-semibold mb-1' htmlFor=''>
              Email
            </label>
            <input
              className='p-2 w-64 border border-gray-300 rounded-md bg-transparent shadow-sm'
              type='text'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold mb-1' htmlFor=''>
              Password
            </label>
            <input
              className='p-2 w-64 border border-gray-300 rounded-md bg-transparent'
              type='text'
            />
          </div>
          <Link
            className='text-xs text-red-600 font-semibold'
            to='/password-reset'
          >
            Forgot password?
          </Link>

          <button
            className='uppercase text-base font-semibold tracking-widest bg-teal-500 py-3'
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
export default Login;
