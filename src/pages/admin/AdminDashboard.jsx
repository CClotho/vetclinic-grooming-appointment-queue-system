
import { Link, Outlet } from 'react-router-dom';
import AppointmentForm from "../../component/Appointment/AdminAppointmentForm";
import { useEffect, useState } from 'react';
//import io from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { useFetchPendingAppointments, useFetchAppointmentsQueueToday } from '../../hooks/appointment/useAdminAppointment';
import axios from 'axios';
import styles from '../../assets/styles/style.module.css';
import AddPetForm from '../../component/Pet/AddPetForm';

//const socket = io("http://localhost:3000");

export const AdminDashboard = () => {
    const queryClient = useQueryClient();
    const { data: pendingAppointments } = useFetchPendingAppointments();
    const { data: appointments, isLoadingAppointments } = useFetchAppointmentsQueueToday();
    const [groomingSearchTerm, setGroomingSearchTerm] = useState('');
    const [treatmentSearchTerm, setTreatmentSearchTerm] = useState('');
/* 
    
    useEffect(() => {
        socket.on('newPendingAppointment', (appointment) => {
            queryClient.setQueryData(['pendingAppointments'], old => [...old, appointment]);
        });

        return () => {
            socket.off('newPendingAppointment');
        };
    }, [queryClient]); */

    // Function to handle updates to appointments
    const handleUpdate = async (appointmentId, updates) => {
        try {
            await axios.put(`/api/appointments/${appointmentId}`, updates); // Adjust as per your API
            // Re-fetch appointments or update local state
        } catch (error) {
            console.error('Error updating appointment', error);
        }
    };

    // Function to handle deletion of appointments
    const handleDelete = async (appointmentId) => {
        try {
            await axios.delete(`/api/appointments/${appointmentId}`); // Adjust as per your API
            // Re-fetch appointments or update local state
        } catch (error) {
            console.error('Error deleting appointment', error);
        }
    };

    // Function to render today's appointments queue
    const renderAppointments = () => {
        
   
        if (isLoadingAppointments) {
            return <div>Loading Appointments...</div>;
        }
        const filterAppointments = (appointments, searchTerm) => {
            if (!searchTerm) return appointments;
        
            return appointments.filter(appointment => {
                const searchTermLower = searchTerm.toLowerCase();
                const clientName = `${appointment.client.first_name} ${appointment.client.last_name}`.toLowerCase();
                const matchesClientName = clientName.includes(searchTermLower);
        
                const matchesServiceName = appointment.services.some(service => 
                    service.serviceId?.name.toLowerCase().includes(searchTermLower)
                );
        
                return matchesClientName || matchesServiceName;
            });
        };
        
        
        
        // Filter appointments based on the search term
        const grooming = appointments?.groomingAppointments.filter(appointment => appointment.service_type === 'grooming') || [];
        const treatment = appointments?.treatmentAppointments.filter(appointment => appointment.service_type === 'treatment') || [];
        
        
        const filteredGroomingAppointments = filterAppointments(grooming, groomingSearchTerm, 'grooming');
        const filteredTreatmentAppointments = filterAppointments(treatment, treatmentSearchTerm, 'treatment');

    
        return (
            <div className={styles.appointments}>
                
                
               <div>
               <div>
                    <input
                        type="text"
                        placeholder="Search Grooming Appointments..."
                        onChange={(e) => setGroomingSearchTerm(e.target.value)}
                    />
                </div>
    
                <h2>Grooming Appointments</h2>
                { filteredGroomingAppointments .length > 0 ? (
                     filteredGroomingAppointments.map(appointment => (
                        <div key={appointment._id}>
                            <p>Client: {appointment.client?.first_name} {appointment.client?.last_name}</p>
                            <p>Pet: {appointment.pet.pet_name}</p>
                            <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                            <p>Doctor: {appointment.doctor.first_name}</p>
                            <p>Service Type: {appointment.service_type}</p>
                            {appointment.services.map(service => (
                                <div key={service._id}>
                                    <p>Service Name: {service.serviceId?.name || 'N/A'}</p>
                                    <p>Size: {service.chosenSize?.size || 'N/A'}</p>
                                </div>
                            ))}
                            {/* Add more fields as needed */}
                            <button onClick={() => handleUpdate(appointment._id)}>Update</button>
                            <button onClick={() => handleUpdate(appointment._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>There are currently no grooming appointments.</p>
                )}
               </div>

               <div>    
                    <div>
                        <input
                            type="text"
                            placeholder="Search Treatment Appointments..."
                            onChange={(e) => setTreatmentSearchTerm(e.target.value)}
                            />
                    </div>
    
                    <h2>Treatment Appointments</h2>
                    { filteredTreatmentAppointments.length > 0 ? (
                        filteredTreatmentAppointments.map(appointment => (
                            <div key={appointment._id}>
                                <p>Client: {appointment.client.first_name} {appointment.client.last_name}</p>
                                <p>Pet: {appointment.pet.pet_name}</p>
                                <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                                <p>Doctor: {appointment.doctor.first_name}</p>
                                <p>Appointment: {appointment.service_type}</p>
                                {/* Additional treatment service details can be added here */}
                                <button onClick={() => handleDelete(appointment._id)}>Update</button>
                                <button onClick={() => handleDelete(appointment._id)}>Delete</button>

                            </div>
                        ))
                    ) : (
                        <p>There are currently no treatment appointments.</p>
                    )}
                
               </div>

           
                    
            </div>
        );
    };
    
    // Function to render pending appointments summary
    const renderPendingAppointmentsSummary = () => {
        const pendingCount = pendingAppointments?.length || 0;
        return (
            <div>
                <h2>Pending Appointments</h2>
                {pendingCount > 0 ? (
                    <div>
                        <p>{pendingCount} pending requests</p>
                        <Link to="/pending/appointments">View Pending Appointments</Link>
                    </div>
                ) : (
                    <p>No pending requests</p>
                )}
            </div>
        );
    };

    return (
        <div>
            <h1>ADMIN DASHBOARD</h1>
            {renderPendingAppointmentsSummary()}
            {renderAppointments()}
            <AppointmentForm/>
            <AddPetForm/>
            <Outlet/>
        </div>
    );
};