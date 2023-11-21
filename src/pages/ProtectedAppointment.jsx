
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthContext"

import { ClientAppointment } from "./client/ClientAppointment";
import { AdminAppointment } from "./admin/AdminAppointment";

export const ProtectedAppointment= () => {
    // will conditionally render Admin or Client Service here
    
    
    const {user, isAuthenticated} = useAuth()
    

    if(user.role ==="client" && isAuthenticated) {
        
        return <ClientAppointment/>
        
    } 

    if(user.role ==="doctor" && isAuthenticated) {
        
        return <AdminAppointment/> 
    } 

   if(user.role === "undefined" && !isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
   }
}