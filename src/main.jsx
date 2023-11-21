import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './hooks/AuthContextProvider.jsx'

import { RouterProvider } from 'react-router-dom'
import { router } from './router/App.jsx'
import { QueryClientProvider , QueryClient} from '@tanstack/react-query'
import { AppointmentProvider } from './hooks/AppointmentContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
        <AppointmentProvider>
        {/* <Test/>  */}
        {/* <App/> */}
        <RouterProvider router={router}/>

     
        </AppointmentProvider>
      </AuthContextProvider>

    </QueryClientProvider>
   
 
  </React.StrictMode>,
)
