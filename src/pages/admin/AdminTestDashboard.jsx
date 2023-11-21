
import { Link, Outlet } from 'react-router-dom';
import AppointmentForm from "../../component/Appointment/AdminAppointmentForm";
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { useFetchPendingAppointments, useFetchAppointmentsQueueToday, useUpdateAppointmentsQueueToday, useDeleteQueueAppointment } from '../../hooks/appointment/useAdminAppointment';
import axios from 'axios';
import AddPetForm from '../../component/Pet/AddPetForm';
import styles from '../../assets/styles/dashboard.module.css'; // Import CSS module
import AppointmentCard from '../../component/Appointment/EditAdminQueue';

//const socket = io("http://localhost:3000");

export const AdminTestDashboard = () => {
    
    const { data: pendingAppointments } = useFetchPendingAppointments();
    const { data: appointments, isLoadingAppointments } = useFetchAppointmentsQueueToday();
    const updateAppointment = useUpdateAppointmentsQueueToday();
    const deleteAppointment = useDeleteQueueAppointment();
    const [groomingSearchTerm, setGroomingSearchTerm] = useState('');
    const [treatmentSearchTerm, setTreatmentSearchTerm] = useState('');
 
  /*   useEffect(() => {
        socket.on('newPendingAppointment', (appointment) => {
            queryClient.setQueryData(['pendingAppointments'], old => [...old, appointment]);
        });

        return () => {
            socket.off('newPendingAppointment');
        };
    }, [queryClient]);  */

    // Function to handle updates to appointments
    const handleUpdate = async (appointmentId, updates) => {
        const dataToUpdate = {
            id: appointmentId,
            ...updates
        };
    
        updateAppointment.mutate(dataToUpdate);
    };
    
    // Function to handle deletion of appointments
    const handleDelete = async (appointmentId) => {
        const dataToDelete = {id: appointmentId}
        deleteAppointment.mutate(dataToDelete)
       
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
                const clientName = `${appointment.client?.first_name} ${appointment.client?.last_name}`.toLowerCase();
                const petName = `${appointment.pet?.pet_name}`.toLowerCase();
                const matchesPetName = petName.includes(searchTermLower);

                const matchesClientName = clientName.includes(searchTermLower);
        
                const matchesServiceName = appointment.services?.some(service => 
                    service.serviceId?.name?.toLowerCase().includes(searchTermLower)
                );
        
                return matchesClientName || matchesServiceName ||   matchesPetName ;
            });
        };
        
        
        
        // Filter appointments based on the search term
        const grooming = appointments?.groomingAppointments.filter(appointment => appointment.service_type === 'grooming') || [];
        const treatment = appointments?.treatmentAppointments.filter(appointment => appointment.service_type === 'treatment') || [];
        
        
        const filteredGroomingAppointments = filterAppointments(grooming, groomingSearchTerm, 'grooming');
        const filteredTreatmentAppointments = filterAppointments(treatment, treatmentSearchTerm, 'treatment');
              // Log the appointments data to see what's actually being fetched
        console.log('Appointments Data:', appointments);

        // Your existing filter logic...
        // ...

        // Log the filtered appointments to see what's being rendered
        console.log('Filtered Grooming Appointments:', filteredGroomingAppointments);
        console.log('Filtered Treatment Appointments:', filteredTreatmentAppointments);
    
        return (
            <div className={styles.appointments}>
                
                
               <div>
                    <div className={styles.searchBarContainer}>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Search Grooming Appointments..."
                            onChange={(e) => setGroomingSearchTerm(e.target.value)}
                        />
                        <span className={styles.searchIcon}>
                        <img src="/src/assets/icons/search.png" alt="Search"/>
                        </span>
                    </div>

        
    
                <h2>Grooming Appointments</h2>
                {
                filteredGroomingAppointments.length > 0 ? (
                    filteredGroomingAppointments.map((appointment, index) => (
                        <AppointmentCard
                        key={appointment._id}
                        appointment={appointment}
                        onUpdate={handleUpdate} // handleUpdate is a function to update the appointment
                        onDelete={handleDelete} // handleDelete is a function to delete the appointment
                    />
                    ))
                ) : (
                    <p className={styles.noAppointments}>There are currently no grooming appointments.</p>
                )
                }

               </div>

               <div>                
                    <div className={styles.searchBarContainer}>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Search Treatment Appointments..."
                            onChange={(e) => setTreatmentSearchTerm(e.target.value)}
                            />
                            <span className={styles.searchIcon}>
                        <img src="/src/assets/icons/search.png" alt="Search"/>
                        </span>
                    </div>
    
                    <h2>Treatment Appointments</h2>
                    {
                    filteredTreatmentAppointments.length > 0 ? (
                        filteredTreatmentAppointments.map((appointment, index) => (
                            <AppointmentCard
                            key={appointment._id}
                            appointment={appointment}
                            onUpdate={handleUpdate} // handleUpdate is a function to update the appointment
                            onDelete={handleDelete} // handleDelete is a function to delete the appointment
                        />
                        ))
                    ) : (
                        <p className={styles.noAppointments}>There are currently no treatment appointments.</p>
                    )
                    }

                
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
        
            <Outlet/>
        </div>
    );
};