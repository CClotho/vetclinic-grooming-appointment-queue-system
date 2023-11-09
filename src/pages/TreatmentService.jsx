
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthContext"
import { AdminTreatment } from "./admin/AdminTreatment"
import { ClientTreatment } from "./client/ClientTreatment"

export const TreatmentService = () => {
    // will conditionally render Admin or Client Service here
    
    
    const {user, isAuthenticated} = useAuth()
    

    if(user.role ==="client" && isAuthenticated) {
        
        return <ClientTreatment/>
        
    } 

    if(user.role ==="doctor" && isAuthenticated) {
        
        return <AdminTreatment/> 
    } 

   if(user.role === "undefined" && !isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
   }
}