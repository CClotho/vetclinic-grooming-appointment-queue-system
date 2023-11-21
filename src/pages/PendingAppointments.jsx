import {Outlet, Navigate} from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'
import AdminPending from './admin/AdminPending';
import ClientPending from './client/ClientPending';

export const ProtectedPending= () => {
    const { user, isAuthenticated } = useAuth();
   
      
    if(!isAuthenticated) {
       return <Navigate to="/login" replace={true} />;
    }
  

    if (isAuthenticated && user.role ==="doctor") {
      console.log(user)
      return  <AdminPending/>
    }

    else if(isAuthenticated && user.role ==="client") {
      console.log(user)
      return <ClientPending/>
    }


  

    
  
};