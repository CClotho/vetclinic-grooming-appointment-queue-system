import { logout } from "../hooks/users/useLogout";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from '../assets/styles/style.module.css';

// Logout Button
export const LogoutButton = () => {
    const {setUser, setAuthenticated} = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            // Send a logout request to the server
            const response = await logout();

            if (response.status === 200) {
                console.log('Logged out successfully!');
                setUser('null')
                setAuthenticated(false) 
                navigate("/")
             
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <button className={styles.logout }onClick={handleLogout}>Logout</button>
    );
};

