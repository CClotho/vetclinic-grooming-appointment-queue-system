import AppointmentForm from "../../component/Appointment/AdminAppointmentForm"
import AddPetForm from "../../component/Pet/AddPetForm"
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useFetchPendingAppointments, useFetchAppointmentsQueueToday } from '../../hooks/appointment/useAdminAppointment';
import styles from '../../assets/styles/dashboard.module.css'; // Import CSS module
import EditAppointmentForm from "../../component/Appointment/AdminAppointmentEdit";
import {  useUpdateAppointmentForm } from '../../hooks/appointment/useAdminAppointment';
//const socket = io("http://localhost:3000");

export const AdminAppointment= () => {
   
    const { data: pendingAppointments } = useFetchPendingAppointments();
    const { data: appointments, isLoadingAppointments } = useFetchAppointmentsQueueToday();
    const [groomingSearchTerm, setGroomingSearchTerm] = useState('');
    const [treatmentSearchTerm, setTreatmentSearchTerm] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const updateAppointment= useUpdateAppointmentForm();
  


   
 
  /*   useEffect(() => {
        socket.on('newPendingAppointment', (appointment) => {
            queryClient.setQueryData(['pendingAppointments'], old => [...old, appointment]);
        });

        return () => {
            socket.off('newPendingAppointment');
        };
    }, [queryClient]);  */



    // Function to render today's appointments queue

    
    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

   
    const handleUpdate = (appointmentId) => {
        // Toggle editing for the selected appointment
        if (selectedAppointment && selectedAppointment._id === appointmentId) {
            // If the same appointment is clicked again, close the editor
            setSelectedAppointment(null);
        } else {
            // Otherwise, find and set the new appointment to be edited
            let appointmentToEdit = appointments.groomingAppointments?.find(appointment => appointment._id === appointmentId) ||
                                    appointments.treatmentAppointments?.find(appointment => appointment._id === appointmentId);
            setSelectedAppointment(appointmentToEdit);
        }
    };
    
    const handleEditSubmit = (appointmentId, updatedValues) => {
         updateAppointment.mutate({ id: appointmentId, data: updatedValues });
        console.log(appointmentId, updatedValues)
        setSelectedAppointment(null);
      };

    // Newly added function
    const renderAppointmentCard = (appointment) => {
        if (selectedAppointment && selectedAppointment._id === appointment._id) {
            return <EditAppointmentForm key={appointment._id} appointment={appointment} onSubmit={handleEditSubmit} />;
        }
        return (
            <div key={appointment._id} className={styles.appointmentCard}>
                <div className={styles.appointmentHeader}>
                    <h3>Appointment Details</h3>
                        </div>
                            
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Client:</span>
                            <span className={styles.detailValue}>{appointment.client?.first_name} {appointment.client?.last_name}</span>
                        </div>
                            
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Pet:</span>
                            <span className={styles.detailValue}>{appointment.pet?.pet_name}</span>
                        </div>
                            
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Date:</span>
                            <span className={styles.detailValue}>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                            
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Doctor:</span>
                            <span className={styles.detailValue}>{appointment.doctor?.first_name}</span>
                        </div>
                            
                        <div className={styles.serviceType}>
                            <span className={styles.detailLabel}>Service Type:</span>
                            <span className={styles.detailValue}>{appointment.service_type}</span>
                        </div>
                            
                        <div className={styles.statusInfo}>
                            <span className={styles.detailLabel}>Status: {appointment.status} </span>
                        
                        </div>
                            
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Queue Position: {appointment.queuePosition} </span>
    
                        </div>
                            
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Arrival Time: {new Date(appointment.arrivalTime).toLocaleTimeString().substring(0,5)} </span>
                         
                                </div>
                                
                                <div className={styles.detailRow}>
                                <span className={styles.detailLabel}>Duration (mins):
                                {appointment.duration ? formatDuration(appointment.duration) 
                                : 
                                (appointment.status === 'started' ? 
                                formatDuration() : 'Not Started')}
                                </span>
                                
                                </div>
                                
                               {appointment.size && (
                                 <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>Pet Size: {appointment.size?.size} </span>
 
                                </div>
                               )}
                                
                                <div className={styles.servicesList}>
                                    <h4 className={styles.detailLabel}>Services:</h4>
                                    {appointment.services?.map(service => (
                                        <div className={styles.serviceItem} key={service._id}>
                                        <div>{service?.name} - {service?.description}</div>
                                        </div>
                                    ))}
                                </div>
                            
                            <div className={styles.appointmentActions}>
                                <button onClick={() => handleUpdate(appointment._id)} className={styles.updateButton}>Update</button>
                                <button onClick={() => handleDelete(appointment._id)} className={styles.deleteButton}>Delete</button>
                            </div>
                            
                        </div>               
        );
    };

    // newly added function
    const renderFilteredAppointments = (appointmentsArray, searchTerm) => {
        // Check if the appointments array is still loading or undefined
        if (!appointmentsArray) {
            return <p className={styles.noAppointments}>Loading appointments...</p>;
        }
    
        // Filtering logic combined within the same function
        const filteredAppointments = searchTerm
            ? appointmentsArray.filter(appointment => {
                const clientName = `${appointment.client?.first_name} ${appointment.client?.last_name}`.toLowerCase();
                const petName = appointment.pet?.pet_name.toLowerCase();
                return clientName.includes(searchTerm.toLowerCase()) || petName.includes(searchTerm.toLowerCase());
            })
            : appointmentsArray;
    
        // Render appointments or show a message if no appointments are found
        return filteredAppointments.length > 0 
            ? filteredAppointments.map(renderAppointmentCard)
            : <p className={styles.noAppointments}>No appointments found.</p>;
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

    const renderCancelledAppointmentsSummary = () => {
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
            <h1>Appointments</h1>
            {renderPendingAppointmentsSummary()}
            <div className={styles.appointments}>
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
                {renderFilteredAppointments(appointments?.groomingAppointments, groomingSearchTerm)}
            </div>
                 <div className={styles.appointments}>
            <div className={styles.searchBarContainer}>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Search Treatmen Appointments..."
                            onChange={(e) => setTreatmentSearchTerm(e.target.value)}
                        />
                        <span className={styles.searchIcon}>
                        <img src="/src/assets/icons/search.png" alt="Search"/>
                        </span>
                    </div>
                    <h2>Treatment Appointments</h2>
                {renderFilteredAppointments(appointments?.treatmentAppointments, treatmentSearchTerm)}
            <div>
                
            
                
            </div>
        </div>

            
            <AppointmentForm/>
            <AddPetForm/>
            <Outlet/>
        </div>
    );
};