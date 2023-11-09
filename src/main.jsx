import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './hooks/AuthContextProvider.jsx'

import { RouterProvider } from 'react-router-dom'
import { router } from './router/App.jsx'
import { QueryClientProvider , QueryClient} from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
      
      {/* <Test/>  */}
      {/* <App/> */}
      <RouterProvider router={router}/>

    </AuthContextProvider>

    </QueryClientProvider>
   
 
  </React.StrictMode>,
)
