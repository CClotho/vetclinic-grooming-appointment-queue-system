import {Outlet, Navigate} from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'
import { ClientSidebar } from './client/ClientSidebar';
import { AdminSidebar } from './admin/AdminSidebar';

// Render Homepage

export const ProtectedHome = () => {
    const { user, isAuthenticated } = useAuth();
   
      
    if(!isAuthenticated) {
       return <Navigate to="/login" replace={true} />;
    }
  

    if (isAuthenticated && user.role ==="doctor") {
      console.log(user)
      return  <AdminSidebar/>
    }

    else if(isAuthenticated && user.role ==="client") {
      console.log(user)
      return < ClientSidebar/>
    }


  

    
  
};