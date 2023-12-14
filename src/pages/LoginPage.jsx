import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import LoginForm from "./login-form";
import styled from  './../assets/styles/form.module.css';
import logo from './../assets/logo/Manaog.jpg';

export const LoginPage = () => {

    const {isAuthenticated} = useAuth();
    const [loginType, setLoginType] = useState(false);
   


    
    if (isAuthenticated ) {
        return <Navigate to="/dashboard" replace={true} />;
    }
    
    const handleLoginClick = (e, type) => {
        e.preventDefault();
        setLoginType(type); // Set the type to 'Admin' or 'Client'
    }

    if(loginType) {
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

    return(

        <div className={styled.formBackground}>
            <div className={styled.logoContainer}>
                <div className={styled.frame}>
                    <img src={logo} alt="logo-icon" className={styled.logo}/>
                </div>
            </div>
            <br/>

            <div className={styled.loginForm}>
                <button className={styled.checkType} onClick={(e)=> handleLoginClick(e, 'Admin')}>
                    Login as Admin
                </button>
                <button className={styled.checkType} onClick={(e)=> handleLoginClick(e, 'Client')}>
                    Login as Client
                </button>
            </div>
          
          
           
        </div>
        
    )

}
