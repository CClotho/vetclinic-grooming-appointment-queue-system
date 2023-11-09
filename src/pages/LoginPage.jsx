import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import LoginForm from "./login-form";
import styled from  './../assets/styles/form.module.css';
import logo from './../assets/logo/Manaog.jpg';

export const LoginPage = () => {

    const {isAuthenticated} = useAuth();


    
    if (isAuthenticated ) {
        return <Navigate to="/dashboard" replace={true} />;
    }

    return(

        <div className={styled.formBackground}>
            <div className={styled.logoContainer}>
                <div className={styled.frame}>
                    <img src={logo} alt="logo-icon" className={styled.logo}/>
                </div>
            </div>
            <br/>
          
            <div className={styled.loginForm}>
                <LoginForm/>
            </div>
           
        </div>
        
    )

}
