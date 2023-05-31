import imageLogin from '../../assets/images/loginImage.jpg';
import * as Tabs from '@radix-ui/react-tabs';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function Login() {
  return (
    <main className='flex justify-center items-center h-screen p-8 bg-gradient-to-r from-teal-200 to-lime-200'>
      <div className='rounded-md flex overflow-hidden'>
        <aside className='basis-[40%] hidden sm:block'>
          <img
            className='h-[650px] object-cover'
            src={imageLogin}
            alt='farm sunset'
          />
        </aside>

        <Tabs.Root
          className='basis-[60%] flex flex-col grow max-w-[400px]'
          defaultValue='tab1'
        >
          <Tabs.List className='flex justify-between'>
            <Tabs.Trigger
              value='tab1'
              className='grow py-4 bg-gray-50/40 font-semibold text-xl data-[state=inactive]:opacity-50'
            >
              Login
            </Tabs.Trigger>
            <Tabs.Trigger
              value='tab2'
              className='grow py-4 bg-gray-50/40 font-semibold text-xl data-[state=inactive]:opacity-50'
            >
              SignUp
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content
            value='tab1'
            className='p-5 bg-gray-50/40 grow min-w-[300px]'
          >
            <LoginForm />
          </Tabs.Content>

          <Tabs.Content
            value='tab2'
            className='p-5 bg-gray-50/40 grow min-w-[300px]'
          >
            <SignUpForm />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </main>
  );
}
export default Login;
