import { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';
import { baseURL } from './users/useLogin';

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [isAuthenticated, setAuthenticated] = useState(false)
    

    useEffect(() => {
        // Check user authentication status upon initial load
        const checkAuthStatus = async () => {
            setLoading(true);
            if(document.cookie.includes('loggedIn=true')) {
                try {
                    const response = await baseURL.get('/user/me', { withCredentials: true }); // Make sure you send the credentials (cookies)
                    
                    if (response.status === 200) {
                        setUser(response.data); // includes user.client
                        setAuthenticated(true) // assuming your backend sends user data under 'user' key this is safe
                    }
                } catch (error) {
                    console.log(error)
                    setError(error)
                } finally {
                    setLoading(false);  // No matter what, we set loading to false after the check
                }
            }
            else if(!document.cookie.includes('loggedIn=true')) {
                setLoading(false)
            }
        
        };

        checkAuthStatus();
    }, [isAuthenticated]);  // The empty dependency array ensures this useEffect runs once when the component mounts

    const contextValue = {
        user,
        loading,
        error,
        setUser,
        setAuthenticated,
        isAuthenticated,
        role,
        setRole,
    };

    return (
        <AuthContext.Provider value={contextValue}>
             {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};







/* import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios'; // assuming you're using axios for HTTP requests

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    

    const contextValue = {
        user,
        loading,
        setUser
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
 */