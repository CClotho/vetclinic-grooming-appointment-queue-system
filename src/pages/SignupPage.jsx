import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import styles from  './../assets/styles/form.module.css';
import logo from './../assets/logo/Manaog.jpg';
import SignupForm from "./signup-form";

export const SignupPage = ()=> {

    const {user, isAuthenticated} = useAuth()

    if(!isAuthenticated || (isAuthenticated && user.role !== "doctor")) {
        return <Navigate to="/dashboard" replace={true} />;
    }


    return(
        <div className={styles.formBackground}>
        <div className={styles.logoContainer}>
            <div className={styles.frame}>
                <img src={logo} alt="logo-icon" className={styles.logo}/>
            </div>
        </div>
        <br/>
      
        <div>
            <SignupForm/>
        </div>
       
    </div>
    )
}