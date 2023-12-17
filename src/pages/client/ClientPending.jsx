// Import the API function

import { useFetchClientPendingAppointments} from '../../hooks/appointment/useClientAppointment';
import styles from '../../assets/styles/pending.module.css'; // Import CSS module
import { useAuth } from '../../hooks/AuthContext';
import { useEffect } from 'react';


const ClientPending = () => {
    

    const {data: pendingClientAppointments} = useFetchClientPendingAppointments();
    const {user} = useAuth();
    

    useEffect(() => {
        
        
       
    }, [pendingClientAppointments]);

    const handleUpdateStatus = (appointmentId, newStatus) => {
        console.log({appointmentId, newStatus})
      mutate( {appointmentId, newStatus });
    };

    const renderServiceDetails = (service, serviceType) => {
        if (serviceType === 'grooming') {
           // Assuming this is an object with service details
            
            return  (
                <div>
                    <p>Service Name: {service?.name}</p>
                    <p>Price: {service?.price}</p>
                    <p>Details: {service?.description}</p>
                </div>
            )
        } else if (serviceType === 'treatment') {
            return (
                <div>
                    <p>Appointment: {service?.name}</p>
                    <p>Price: {service?.price}</p>
                    <p>Description: {service?.description}</p>
                </div>
            );
        }
    };
    
    
    
    

    const renderServices = (services, serviceType, appointmentId) => {
        if (Array.isArray(services)) {
            return services.map((service, index) => {
                // Using a combination of appointmentId and service unique identifier
                const serviceKey = service._id ? `${appointmentId}-${service._id}` : `${appointmentId}-missing-${index}`;
    
                return (
                    <li key={serviceKey}>
                        {service?.name}
                        {renderServiceDetails(service, serviceType)}
                    </li>
                );
            });
        }
       
        return null;
    };

   

    

    return (
        <div>
            <h1>Pending Appointments</h1>
            {pendingClientAppointments?.length > 0 ? (
                pendingClientAppointments.map(appointment => (
                    <div key={appointment._id} className={styles.appointmentCard}>
                       <div className={styles.appointmentHeader}>
                        <p>Appointment ID: {appointment._id}</p>
                            <p>Client: {appointment.client?.first_name} {appointment.client?.last_name} </p>
                            <p>Pet: {appointment.pet?.pet_name}  </p>
                            <span className={styles.detailLabel}>Date:</span>
                            <span className={styles.detailValue}> {new Date(appointment.date).toDateString()}</span>
               
                            
                            <p>Service Type: {appointment.service_type}</p>
                            {appointment.size && (
                                       <p> Pet Size: {appointment.size.size} </p>
                                    )}
                            <p>Services:</p>
                            <div className={styles.serviceList}>
                                <ul>
                                    {renderServices(appointment.services, appointment.service_type, appointment._id)}
                                    
                                </ul>
                            </div>
                          
                        </div>
                    </div>
                ))
            ) : (
                <p>No pending appointments</p>
            )}
        </div>
    );
};

export default ClientPending;
