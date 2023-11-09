import { useState, useEffect } from 'react';
import { profile } from '../../hooks/users/useProfile';
import { useAuth } from '../../hooks/AuthContext';
import { Link, Outlet } from 'react-router-dom';
import AppointmentForm from "../../component/Appointment/AppointmentForm";
import GroomingForm from '../../component/Grooming/AddGroomingForm';
import TreatmentForm from '../../component/Treatment/AddTreatmentForm';
import Modal from '../../component/Modal';
import TreatmentList from '../../component/Treatment/TreatmentList';
import io from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

export const AdminDashboard= () => {
    const [isGroomingModalOpen, setGroomingModalOpen] = useState(false);
    const [isTreatmentModalOpen, setTreatmentModalOpen] = useState(false);

    const [profileDetails, setProfileDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const queryClient = useQueryClient();

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
            <h1> ADMIN DASHBOARD </h1>
            {profileDetails && (
                <>
                    <h1>Hello, {profileDetails.first_name} {profileDetails.last_name}!</h1>
                    <p>Email: {profileDetails.email}</p>
                </>
            )}
        
        {/* <AppointmentForm/> */}
       

        <div className="container mx-auto mt-10">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setGroomingModalOpen(true)}>
                Open Grooming Form
            </button>

            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={() => setTreatmentModalOpen(true)}>
                Open Treatment Form
            </button>

            <Modal isOpen={isGroomingModalOpen} onClose={() => setGroomingModalOpen(false)} title="Grooming Service">
                <GroomingForm />
            </Modal>

            <Modal isOpen={isTreatmentModalOpen} onClose={() => setTreatmentModalOpen(false)} title="Treatment Service">
                <TreatmentForm />
            </Modal>

            <TreatmentList/>
            <AppointmentForm/>
        </div>
        <Outlet/>
        </div>
    ); 
};

