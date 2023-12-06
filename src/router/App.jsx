import { Navigate,createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import Profile from "../pages/shared/Profile";
import { Path } from "./routes/paths/paths";
import { ProtectedHome } from "../pages/ProtectedSidebar";
import { TreatmentService } from "../pages/TreatmentService";
import { GroomingService } from "../pages/GroomingService";
import { AdminClientsPage } from "../pages/admin/AdminClientsPage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { ProtectedPending } from "../pages/PendingAppointments";
import { ClientProfile } from "../component/Client/ClientProfile";

import { ProtectedAppointment } from "../pages/ProtectedAppointment";
import { Info } from "../pages/shared/Info";

export const router = createBrowserRouter([
    // parent route component
      {
        path: "/",
        element: <ProtectedHome/>, // this is the app layout u can render the children with <outlet/>
        errorElement: <div> 404 Not Found</div>, //<Navigate to="/" replace={true} />, will aply later to all of the components rather here
          children: [
            { path: "/", element: <Navigate to="/dashboard" />  },  // Protected Route contains 2 component client and admin dashboard
            { path: "/dashboard",   element: <Dashboard /> },
            {path: "/appointment", element: <ProtectedAppointment/>},
            {path: "/profile/:id", element: <Profile/>},
            {path: "/clients", element: <AdminClientsPage/> },
            { path:"/service/treatment",  element: <TreatmentService/>},
            {path: "/service/grooming", element: <GroomingService/> },
            {path: "/info", element: <Info/> },
            {
              path: "/clients",
              element: <AdminClientsPage/>,
              children: [ 
                //render client profile component
                { path: ":clientId", element: <ClientProfile/>
                }
           
              ]
            },
            {path: "/register",element: <SignupPage/>},  // This should be just a form inside Clients page in admin
            { path: "/pending/appointments",element: <ProtectedPending/>}
            
        
          ],
          
      },
    
      {path: "/login", element: <LoginPage />}, // This should be  Login Page
      
     
     
     
        
])