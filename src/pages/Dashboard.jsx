import { useAuth } from "../hooks/AuthContext"
import {AdminDashboard} from "./admin/AdminDashboard"
import { ClientDashboard } from "./client/ClientDashboard"
import { Navigate } from "react-router-dom"

// IT WORKS SO I CAN JUST RENDER IT LIKE  <Route path="/client/dashboard" element={<ClientDashboard />} /> BUT THE CONTENT is TESTPAGE 
// With this protected route in Dashboard the user will never able to access adminDashboard
export const Dashboard = () => {
    const {user, isAuthenticated} = useAuth()
    

    if(user.role ==="client" && isAuthenticated) {
        
        return <ClientDashboard/>
        
    } 

    if(user.role ==="doctor" && isAuthenticated) {
        
        return <AdminDashboard/> 
    } 

   if(user.role === "undefined" && !isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
   }

}