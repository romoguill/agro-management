import React, { Profiler } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Profiler id='app' onRender={() => null}>
        <App />
      </Profiler>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
