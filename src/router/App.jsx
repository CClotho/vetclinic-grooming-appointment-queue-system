import { Navigate,createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import Profile from "../pages/shared/Profile";
import { Path } from "./routes/paths/paths";
import { ProtectedHome } from "../pages/ProtectedHome";
import { TreatmentService } from "../pages/TreatmentService";
import { GroomingService } from "../pages/GroomingService";
import { ClientPage } from "../pages/admin/Clients";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";


export const router = createBrowserRouter([
    // parent route component
      {
        path: Path.HOME,
        element: <ProtectedHome/>, // this is the app layout u can render the children with <outlet/>
        errorElement: <Navigate to="/" replace={true} />,
          children: [
            {
              path: "/dashboard",
              element: <Dashboard />,  // Protected Route contains 2 component client and admin dashboard
              children:[
                
                

                   
                    
              ],
            }, 

            {
              path: "/profile/:id",
              element: <Profile/>,
            },

            {
              path:"/service/treatment",
              element: <TreatmentService/>
            },

            {
              path: "/service/grooming",
              element: <GroomingService/>
            },

             //Client Page --> has children
            {
              path: "/clients",
              element: <ClientPage/>,
              children: [ 
           
              ]
            },
            {
              path: "/register",
              element: <SignupPage/>, // This should be just a form inside Clients page in admin
            }
        
          ],
          
      },
    
      {
        path: Path.LOGIN,
        element: <LoginPage />, // This should be  Login Page
      },
       // Maybe add a layout for this too then make the routes below as child routes of this layout so there would be a navigation links then outlet 
       // and when user tried to access/login in url when they're already logged in loginpage navigate them to dashboard
     
     
        
])