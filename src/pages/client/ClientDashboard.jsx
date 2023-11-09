import { useState, useEffect } from 'react';
import { profile } from '../../hooks/users/useProfile';
import { useAuth } from '../../hooks/AuthContext';

export const ClientDashboard= () => {
 
    const [profileDetails, setProfileDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
                const response = await profile();
                if (response.status === 200) {
                    setProfileDetails(response.data);
                    console.log(response.data)
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
       
         fetchProfileDetails();
        
       
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }



    return (
        <div>
            <h1> CLIENT DASHBOARD {profileDetails.first_name} </h1>
            {profileDetails && (
                <>
                    <h1>Hello, {profileDetails.first_name} {profileDetails.last_name}!</h1>
                    <p>Email: {profileDetails.email}</p>
                </>
            )}

        </div>
    ); 
};


