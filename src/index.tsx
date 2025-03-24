import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ReactQueryDevtools } from 'react-query/devtools';
import { toast } from 'react-toastify';
import { getErrorDataByCode } from './interface/Error';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000,
      // staleTime: 2000,
      cacheTime: 900000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry:0,
      useErrorBoundary:true
    },
    
    mutations:{
      useErrorBoundary:false,
      onSuccess: ()=>{
        console.log("index.tsx mutations onSuccess");

        toast.success("성공!!",{
          position:"top-center"
        });
      },
      onError:(error:any) =>{
        console.log("index.tsx mutations onError");
        
        toast.error(getErrorDataByCode(error).content,{
          position:"top-center"
        });
      }
    }
  },
});


root.render(
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
);