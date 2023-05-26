import { Link } from 'react-router-dom';
import imageLogin from '../assets/images/loginImage.jpg';

function Login() {
  return (
    <main className='flex justify-center items-center h-screen p-8 bg-gradient-to-r from-teal-200 to-lime-200'>
      <div className='bg-gray-50/40 rounded-md flex items-center overflow-hidden'>
        <aside className='basis-[40%]'>
          <img
            className='h-[500px] object-cover'
            src={imageLogin}
            alt='farm sunset'
          />
        </aside>

        <section className='p-5 grow self-stretch flex flex-col justify-between'>
          <h1 className='text-3xl font-semibold text-center mb-16 text-cyan-500'>
            Login
          </h1>
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
            <Link
              className='text-xs text-red-600 font-semibold'
              to='/password-reset'
            >
              Forgot password?
            </Link>

            <button
              className='uppercase text-base font-semibold tracking-widest bg-teal-400 py-3'
              type='submit'
            >
              Login
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
export default Login;
