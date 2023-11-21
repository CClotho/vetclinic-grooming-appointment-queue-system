import { useAuth } from "../../hooks/AuthContext";
import { Link, NavLink, Outlet } from "react-router-dom";
import { LogoutButton } from "../logoutButton";
import styles from '../../assets/styles/style.module.css';
import { useState } from "react";


export const AdminSidebar = () => {
    const { user, isAuthenticated } = useAuth();
    console.log("USER ROLE: ", user.role)
    console.log("IS USER AUTHENTICATED?:", isAuthenticated)
    console.log("USER OBJECT: ", user.user);

    const [show, setShow] = useState(false);

    const toggleMenu = ()=> {
        setShow(!show);
    }

    return (
        
       
            <div className={styles.navigation}>
                
               <div className={styles.menu}>
               
                <div className={styles.menu_icon} onClick={toggleMenu}>
                        <img src="/src/assets/icons/menu.png" alt="menu-icon" className={styles.menu_icon} />
                    </div>

                        {/* Sidebar container */}
                    <nav className={`${styles.sidebar} ${show ? styles.show : ''}`}>
                        <img src="/src/assets/logo/Logo2.png" alt="logo"/>
                        <NavLink to="/" className={styles.styledLink} ><img src="/src/assets/icons/dashboard.png" alt="dashboard-icon"/><span> Dashboard</span></NavLink>
                        <NavLink to="/appointment" className={styles.styledLink}> <img src="/src/assets/icons/schedule.png" alt="appointment-icon"/><span>Appointments</span></NavLink>
                        <NavLink to="/service/treatment" className={styles.styledLink}><img src="/src/assets/icons/services.png" alt="service-icon"/> <span>Treatment</span></NavLink>
                        <NavLink to="/service/grooming" className={styles.styledLink}> <img src="/src/assets/icons/grooming.png" alt="grooming-icon"/> <span>Grooming</span></NavLink>
                        <NavLink to="/clients" className={styles.styledLink}> <img src="/src/assets/icons/people.png" alt="clients-icon"/><span>Clients</span></NavLink>
                        <NavLink to="/info" className={styles.styledLink}> <img src="/src/assets/icons/info.png" alt="info-icon"/><span>VetClinic Info</span></NavLink>
                        <NavLink to="/setting" className={styles.styledLink}> <img src="/src/assets/icons/settings.png" alt="setting-icon"/><span>Settings</span></NavLink>
                        
                        <div className={styles.styledLink}>
                        <LogoutButton />
                        </div>
                        
                    </nav>
                 
               </div>
               
              
                <div className={styles.content}>
                    
                    <Outlet/>
                </div>
              
            
     
            </div>

        
    );
}





