import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import { profile } from '../../hooks/users/useProfile';



// Client Profile, render the pets  as list on left side and clickable by link and render the info on the right side

const ClientProfile = () => {
    const { user } = useAuth();
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
            {profileDetails && (
                <>
                    <h1>Hello, {profileDetails.first_name} {profileDetails.last_name}!</h1>
                    <p>Email: {profileDetails.email}</p>
                </>
            )}

            {!profileDetails && <div>Error loading profile details.</div>}
        </div>
    );
};

export default ClientProfile;
