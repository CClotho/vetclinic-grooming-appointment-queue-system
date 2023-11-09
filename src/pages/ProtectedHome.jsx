import {Outlet, Navigate} from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'
import { Homepage } from './shared/Homepage';


// Render Homepage

export const ProtectedHome = () => {
    const { user, isAuthenticated } = useAuth();
   
      
    if(!isAuthenticated) {
       return <Navigate to="/login" replace={true} />;
    }
  

    if (isAuthenticated) {
      console.log(user)
      return  <Homepage/>
    }

    


  

    
  
};