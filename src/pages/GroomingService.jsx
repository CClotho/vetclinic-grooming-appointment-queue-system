import { ClientGrooming } from "./client/ClientGrooming"
import { AdminGrooming } from "./admin/AdminGrooming"
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthContext"
export const GroomingService = () => {
    // will conditionally render Admin or Client Service here
    const {user, isAuthenticated} = useAuth()
    

    if(user.role ==="client" && isAuthenticated) {
        
        return <ClientGrooming/>
        
    } 

    if(user.role ==="doctor" && isAuthenticated) {
        
        return <AdminGrooming/> 
    } 

   if(user.role === "undefined" && !isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
   }
}