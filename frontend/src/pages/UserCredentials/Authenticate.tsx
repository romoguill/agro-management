import imageLogin from '../../assets/images/loginImage.jpg';
import * as Tabs from '@radix-ui/react-tabs';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import useAuthContext from '../../hooks/useAuthContext';
import { redirect } from 'react-router-dom';
import { useState } from 'react';

function Auth() {
  const { auth } = useAuthContext();

  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  if (auth.user) redirect('/');

  return (
    <main className='flex justify-center items-center h-screen p-8 bg-gradient-to-r from-teal-200 to-lime-200'>
      <div className='rounded-md flex overflow-hidden min-h-[650px]'>
        <aside className='basis-[40%] hidden sm:block'>
          <img
            className='object-cover h-full'
            src={imageLogin}
            alt='farm sunset'
          />
        </aside>

        <Tabs.Root
          className='basis-[60%] flex flex-col grow max-w-[400px]'
          defaultValue='tab1'
          value={activeTab}
          onValueChange={handleTabChange}
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
            <SignUpForm handleTabChange={handleTabChange} />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </main>
  );
}

export default Auth;
