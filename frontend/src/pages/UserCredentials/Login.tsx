import imageLogin from '../../assets/images/loginImage.jpg';
import * as Tabs from '@radix-ui/react-tabs';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function Login() {
  return (
    <main className='flex justify-center items-center h-screen p-8 bg-gradient-to-r from-teal-200 to-lime-200'>
      <div className='bg-gray-50/40 rounded-md flex overflow-hidden'>
        <aside className='basis-[40%]'>
          <img
            className='h-[500px] object-cover'
            src={imageLogin}
            alt='farm sunset'
          />
        </aside>

        <Tabs.Root className='basis-[60%]'>
          <Tabs.List className='flex justify-between'>
            <Tabs.Trigger
              value='tab1'
              className='grow py-4 data-[state=inactive]:bg-teal-200/80'
            >
              Login
            </Tabs.Trigger>
            <Tabs.Trigger
              value='tab2'
              className='grow py-4 data-[state=inactive]:bg-gray-300'
            >
              SignUp
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value='tab1' className='p-5'>
            <LoginForm />
          </Tabs.Content>

          <Tabs.Content value='tab2' className='p-5'>
            <SignUpForm />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </main>
  );
}
export default Login;
