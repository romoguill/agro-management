import { Link } from 'react-router-dom';

function SignUpForm() {
  return (
    <form className='flex flex-col gap-3 h-full'>
      <div>
        <label className='credentials-label' htmlFor=''>
          First Name
        </label>
        <input className='credentials-input' type='text' />
      </div>
      <div>
        <label className='credentials-label' htmlFor=''>
          Last Name
        </label>
        <input className='credentials-input' type='text' />
      </div>
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
      <div>
        <label className='credentials-label' htmlFor=''>
          Confirm Password
        </label>
        <input className='credentials-input' type='password' />
      </div>

      <button
        className='uppercase text-base font-semibold tracking-widest bg-primary py-3 mt-auto rounded-md'
        type='submit'
      >
        Sign Up
      </button>
    </form>
  );
}
export default SignUpForm;
